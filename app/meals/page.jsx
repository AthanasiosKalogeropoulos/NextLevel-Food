import Link from "next/link";
import styles from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community!",
};

// Error handling component
async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
export const dynamic = "force-dynamic";

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun
        </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        {/* Native React error handling <Suspense> component */}
        <Suspense fallback={<p className={styles.loading}>Fetching meal</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
