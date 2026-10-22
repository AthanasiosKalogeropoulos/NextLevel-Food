# NextLevel-Food

A recipe-sharing web app. Browse meals shared by the community, open a recipe for the full instructions, and share your own with an image upload.

**Live demo:** https://next-level-food-omega.vercel.app/

## Features

- Meals list and a detail page for every recipe (`/meals/[slug]`)
- "Share a meal" form with server-side validation and image upload
- Slugs generated from the recipe title
- User-provided instructions are sanitized before being rendered as HTML
- Loading and not-found states

## Tech stack

- **Next.js** (App Router) with **Server Components** and **Server Actions**
- **React**
- **Turso** (hosted SQLite / libSQL) via `@libsql/client`
- **Vercel Blob** for uploaded images
- **CSS Modules**
- `slugify` and `xss` for slugs and input sanitizing

## How it works

- Pages are Server Components that read meals directly from Turso through the libSQL client (`lib/meals.js`).
- The share form submits to a Server Action (`lib/actions.js`) that validates the input, then calls `saveMeal`.
- `saveMeal` sanitizes the instructions, builds a slug, uploads the image to Vercel Blob, and inserts the row into the database.
- After saving, the meals pages are revalidated and the user is redirected to the list.

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- A free [Turso](https://turso.tech) database
- A [Vercel](https://vercel.com) Blob store (public) for image uploads

### 1. Install

```bash
git clone https://github.com/AthanasiosKalogeropoulos/NextLevel-Food.git
cd NextLevel-Food
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root:

```bash
TURSO_DATABASE_URL=libsql://your-database-your-org.turso.io
TURSO_AUTH_TOKEN=your-turso-token
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### 3. Database schema

Create this table in your Turso database:

```sql
CREATE TABLE meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  summary TEXT NOT NULL,
  instructions TEXT NOT NULL,
  creator TEXT NOT NULL,
  creator_email TEXT NOT NULL
);
```

### 4. Run

```bash
npm run dev
```

Open <http://localhost:3000>.

## Deployment

The app is deployed on Vercel. Set the three environment variables above in the Vercel project settings and connect a **public** Blob store to the project.

## Ideas for improvement

- Validate image type and size on upload
- Handle duplicate recipe titles (the slug is unique)
- Rate limiting and moderation for the public demo
- Authentication, so recipes belong to real accounts
- Automated tests
