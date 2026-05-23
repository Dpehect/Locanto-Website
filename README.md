# Locanto Services

Website: [https://www.locanto.com/g/Services/S/1/](https://www.locanto.com/g/Services/S/1/)

Locanto Services is a full-stack classifieds services platform built with Next.js, React, TypeScript, and Node.js API routes. The application delivers a complete services marketplace experience with searchable listings, city-based discovery, category filtering, saved ads, listing creation, responsive layouts, and server-powered data endpoints.

## Project Overview

This project focuses on the Services section of a classifieds platform. It is designed as a production-style marketplace interface where users can browse local service providers, filter by category and city, switch listing views, save useful ads, and publish new service listings through an interactive form.

The system is structured around a large services database model. The current dataset represents a high-volume classifieds environment with tens of thousands of indexed service entries across categories such as Home Services, Cleaning Services, Automotive Services, Web Services, Digital Marketing Services, Real Estate Services, Moving Services, Pet Services, Tutoring, Financial Services, and more. Category totals, city segmentation, listing metadata, badges, photo counts, and provider descriptions are modeled so the interface behaves like a large real-world classifieds directory rather than a small static page.

## Technology Stack

- Next.js App Router for routing, layouts, metadata, server rendering, and API routes.
- React 19 for the interactive client-side marketplace interface.
- TypeScript for typed data models, component props, API payloads, and safer refactoring.
- Node.js runtime through Next.js route handlers for listing search, listing creation, and saved ad state.
- Tailwind CSS build pipeline with custom global CSS for a dense classifieds UI.
- Next Image optimization for remote listing photos from Unsplash.
- ESLint and TypeScript compiler checks for code quality and type safety.

## Core Features

- Service listing search by title, description, category, city, and provider-related text.
- Category filters with large marketplace counts.
- City selection for localized discovery.
- Radius controls that mirror a classifieds search workflow.
- Popular search chips for fast query entry.
- Detailed, simple, and no-image listing display modes.
- Image-only filtering.
- Saved ad interaction backed by a Node.js API route.
- Service ad publishing form backed by a Node.js API route.
- Premium, verified, new, local, hiring, and business badges.
- Responsive desktop, tablet, and mobile layouts.
- Sticky header, category navigation, side filters, right-side trust panels, pagination, and informational content sections.
- SEO metadata through the Next.js layout system.

## Database And Data Model

The application is built around a large classifieds database concept. The data layer models both aggregate marketplace data and individual service listings.

The aggregate category dataset stores service category names and total marketplace counts. These counts represent a large indexed services database and are used across the UI to communicate marketplace scale.

The listing dataset stores individual service ads with fields for:

- `id`: stable listing identifier.
- `title`: searchable ad title.
- `category`: service category relationship.
- `city`: primary city used for local filtering.
- `state`: optional state abbreviation.
- `description`: searchable service description.
- `images`: remote image URLs used by Next Image.
- `photoCount`: number of photos attached to the ad.
- `posted`: relative posting timestamp.
- `premium`: promoted listing flag.
- `verified`: trust signal flag.
- `tag`: badge label such as Business, Hiring, Local, Popular, or New.

The structure is intentionally simple to migrate into a real database later. The same model can be mapped to PostgreSQL, MySQL, MongoDB, Prisma, Drizzle, Supabase, Firebase, or another production data layer without changing the main UI contract.

## API Architecture

The backend layer uses Next.js route handlers running on the Node.js runtime.

### `GET /api/listings`

Returns filtered service listings.

Supported query parameters:

- `query`: searches listing title, description, category, and city.
- `category`: filters listings by service category.
- `city`: filters listings by selected city.
- `imagesOnly`: returns only listings that include image data.

Response shape:

```json
{
  "total": 12,
  "results": [],
  "generatedAt": "2026-05-23T00:00:00.000Z"
}
```

### `POST /api/listings`

Creates a new service listing from the ad publishing form.

Required body fields:

- `title`
- `category`
- `city`
- `description`

The endpoint validates required fields, creates a unique listing ID, adds default image data, marks the listing as newly posted, and inserts it at the top of the server-side listing collection.

### `GET /api/saved`

Returns saved listing IDs.

### `POST /api/saved`

Adds or removes a listing ID from the saved ads collection.

Request body:

```json
{
  "id": "listing-id",
  "saved": true
}
```

## Frontend Architecture

The main interface lives in `components/classifieds-app.tsx`. It is a client component because the marketplace experience needs live state for search, filters, view modes, saved ads, mobile navigation, loading states, and the listing creation form.

Important state areas:

- Search query state.
- Selected city state.
- Active category state.
- Radius selection state.
- View mode state.
- Image-only filter state.
- Saved listing IDs.
- Loading status for API-backed filtering.
- Listing creation form draft.
- Mobile navigation visibility.
- User-facing status notice.

The component fetches `/api/listings` whenever the user changes search-related filters. A short debounce prevents excessive requests while typing. Saved ads are loaded from `/api/saved` on mount and synchronized whenever a user favorites or unfavorites a listing.

## Styling And Responsive Design

The styling is implemented in `app/globals.css`. The design follows a practical classifieds interface pattern with compact controls, readable listing cards, category rails, toolbar actions, and mobile-first stacking behavior.

Key layout details:

- Desktop uses a three-column grid with left filters, central results, and right informational panels.
- Medium screens collapse the right rail to keep listing content readable.
- Mobile screens collapse search fields, toolbars, post form, listings, and category panels into a single-column layout.
- Fixed-size icon buttons, stable listing media dimensions, and responsive grid constraints reduce layout shift.
- The color palette uses warm marketplace yellows, neutral surfaces, dark text, green trust signals, blue listing links, and red saved-ad feedback.

## Image Handling

Remote listing images are rendered with `next/image`. The project config allows optimized images from `images.unsplash.com` through `next.config.ts`.

This provides:

- Better image sizing.
- Modern image formats where supported.
- Lazy loading for listing images.
- Safer production behavior than raw image tags.

## Validation And Quality Checks

The project includes the following scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

The implementation has been validated with:

- TypeScript type checking.
- ESLint.
- Production build through `next build`.
- Desktop browser verification.
- Mobile browser verification.
- Hydration mismatch check and fix for deterministic number formatting.
- Responsive overflow checks.
- Listing image rendering checks.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Deployment Notes

The project is ready for deployment on platforms that support Next.js, such as Vercel, Netlify, Railway, Render, or a Node.js server. The API routes currently use in-memory server collections, which are suitable for local development and demonstration. For production persistence, the listing and saved-ad endpoints should be connected to a database.

Recommended production database options:

- PostgreSQL with Prisma or Drizzle.
- Supabase Postgres.
- MySQL or PlanetScale.
- MongoDB Atlas.
- Firebase or Firestore.

## Repository

GitHub repository:

[https://github.com/Dpehect/Locanto-Website.git](https://github.com/Dpehect/Locanto-Website.git)
