import { createClient } from "@libsql/client";
import { put } from "@vercel/blob";
import slugify from "slugify";
import xss from "xss";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = await db.execute("SELECT * FROM meals");
  return result.rows.map((row) => ({ ...row }));
}

export async function getMeal(slug) {
  const result = await db.execute({
    sql: "SELECT * FROM meals WHERE slug = ?",
    args: [slug],
  });
  const row = result.rows[0];
  return row ? { ...row } : undefined;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title.trim(), { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const blob = await put(`meals/${meal.slug}.${extension}`, meal.image, {
    access: "public",
    addRandomSuffix: true,
  });
  meal.image = blob.url;

  await db.execute({
    sql: `INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (:title, :summary, :instructions, :creator, :creator_email, :image, :slug)`,
    args: {
      title: meal.title,
      summary: meal.summary,
      instructions: meal.instructions,
      creator: meal.creator,
      creator_email: meal.creator_email,
      image: meal.image,
      slug: meal.slug,
    },
  });
}