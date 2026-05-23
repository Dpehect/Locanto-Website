# Locanto Services

Website: [https://www.locanto.com/g/Services/S/1/](https://www.locanto.com/g/Services/S/1/)

Locanto Services is a full-stack classifieds services platform built with Next.js, React, TypeScript, and Node.js API routes. The application delivers a complete services marketplace experience with searchable listings, city-based discovery, category filtering, saved ads, listing creation, responsive layouts, and server-powered data endpoints.

## Project Overview

This project focuses on the Services section of a classifieds platform. It is designed as a production-style marketplace interface where users can browse local service providers, filter by category and city, switch listing views, save useful ads, and publish new service listings through an interactive form.

The system is structured around a large services database model. The current dataset represents a high-volume classifieds environment with tens of thousands of indexed service entries across categories such as Home Services, Cleaning Services, Automotive Services, Web Services, Digital Marketing Services, Real Estate Services, Moving Services, Pet Services, Tutoring, Financial Services, and more. Category totals, city segmentation, listing metadata, badges, photo counts, and provider descriptions are modeled so the interface behaves like a large real-world classifieds directory rather than a small static page.

## Technology Stack

- Next.js App Router for routing, layouts, metadata, server rendering, API routes, and optimized production builds.
- React 19 for the interactive client-side marketplace interface.
- TypeScript for typed data models, component props, API payloads, and safer refactoring.
- Node.js runtime through Next.js route handlers for listing search, listing creation, and saved ad state.
- Tailwind CSS with PostCSS and Autoprefixer for a modern utility-first styling pipeline.
- Custom CSS architecture for dense classifieds layouts, responsive grids, listing cards, filter rails, and mobile navigation.
- Next Image optimization for remote listing photos from Unsplash.
- Docker multi-stage builds for production-ready container images.
- Docker Compose for local full-stack orchestration with the web app, PostgreSQL, and Redis.
- Kubernetes manifests for namespace, config, secrets, deployment, service, ingress, health probes, resource limits, and horizontal autoscaling.
- ESLint and TypeScript compiler checks for code quality and type safety.

## Full-Stack Technical Architecture

The application is structured as a complete full-stack services marketplace. The frontend, backend, API layer, data model, deployment configuration, and infrastructure files live in the same repository so the project can be developed locally, containerized, and deployed into a cloud-native environment.

### Frontend Layer

- Next.js App Router handles page composition, layout metadata, static rendering, dynamic API integration, and production bundling.
- React client components power search, filtering, saved listings, form state, loading states, mobile navigation, and view mode switching.
- TypeScript defines the main listing, category, and API payload contracts.
- Tailwind CSS provides the modern styling pipeline, while `app/globals.css` contains carefully scoped marketplace UI rules for compact forms, category rails, ad cards, responsive columns, and mobile-first behavior.
- `next/image` is used for optimized remote listing images with AVIF and WebP support.
- The UI is responsive across desktop, tablet, and mobile breakpoints with explicit grid behavior to prevent horizontal overflow and layout shift.

### Backend Layer

- Node.js API routes are implemented with Next.js route handlers under `app/api`.
- `/api/listings` supports search, category filtering, city filtering, image-only filtering, and new listing creation.
- `/api/saved` supports saved ad retrieval and favorite/unfavorite updates.
- Input validation is handled in the API layer before data is accepted.
- API responses use JSON payloads with predictable shapes for easy frontend consumption.
- The backend is ready to connect to a persistent production database by replacing the in-memory collection with a repository/service layer.

### Data And Persistence Layer

- The project models a large services database with marketplace-scale category counts and listing metadata.
- The current data structure is intentionally close to a real database schema: each listing includes identifiers, category relationships, city fields, state fields, descriptions, images, trust flags, promotion flags, and timestamps.
- The Docker Compose stack includes PostgreSQL for relational persistence and Redis for caching, session state, rate limiting, or frequently requested listing queries.
- Environment variables such as `DATABASE_URL` and `REDIS_URL` are included in the container and Kubernetes configuration so the project can be connected to a real persistence layer without changing deployment structure.
- Recommended production schema extensions include users, accounts, listings, listing images, categories, cities, saved listings, reports, payments, promoted ads, audit logs, and search indexes.

### Infrastructure Layer

- `Dockerfile` uses a multi-stage production build with dependency, builder, and runner stages.
- `next.config.ts` enables Next.js standalone output for smaller production containers.
- `.dockerignore` keeps build output, dependencies, logs, environment files, and local artifacts out of the Docker context.
- `docker-compose.yml` runs the Next.js application with PostgreSQL and Redis as a local full-stack environment.
- `k8s/locanto-services.yaml` defines a Kubernetes-ready deployment with replicas, probes, resource limits, autoscaling, service discovery, ingress routing, ConfigMap, and Secret objects.

### Production Concerns

- Health checks are defined through Kubernetes readiness and liveness probes.
- Resource requests and limits are configured for predictable container scheduling.
- Horizontal Pod Autoscaling is prepared for traffic spikes.
- Configuration is separated from application code through environment variables, ConfigMaps, and Secrets.
- The container image is designed for immutable production deployments.
- The architecture supports future CI/CD pipelines, image registry publishing, database migrations, and blue-green or rolling deployments.

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

## Suggested Production Database Schema

A production version can use a relational schema similar to the following:

- `users`: customer and provider accounts.
- `profiles`: public provider details, business names, profile photos, and verification status.
- `categories`: service categories and nested category relationships.
- `cities`: searchable city and region records.
- `listings`: main service ads with title, description, city, status, category, and owner references.
- `listing_images`: multiple listing images with ordering and alt metadata.
- `saved_listings`: user-to-listing favorites.
- `listing_views`: analytics events for impressions and detail views.
- `search_queries`: popular search terms and search analytics.
- `promotions`: premium ad packages, expiry dates, and placement configuration.
- `reports`: moderation reports and safety review status.
- `audit_logs`: administrative changes and security tracking.

For high-volume search, the listing table can be supported by PostgreSQL full-text search, trigram indexes, Elasticsearch, Meilisearch, Typesense, or OpenSearch. Frequently requested category totals and popular search data can be cached in Redis.

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

The styling uses a modern Tailwind CSS toolchain with PostCSS, Autoprefixer, and custom global CSS. The design follows a practical classifieds interface pattern with compact controls, readable listing cards, category rails, toolbar actions, and mobile-first stacking behavior.

Key layout details:

- Desktop uses a three-column grid with left filters, central results, and right informational panels.
- Medium screens collapse the right rail to keep listing content readable.
- Mobile screens collapse search fields, toolbars, post form, listings, and category panels into a single-column layout.
- Fixed-size icon buttons, stable listing media dimensions, and responsive grid constraints reduce layout shift.
- The color palette uses warm marketplace yellows, neutral surfaces, dark text, green trust signals, blue listing links, and red saved-ad feedback.
- CSS variables are used for core color tokens, borders, shadows, and reusable UI values.
- Stable component dimensions reduce layout shifts when listing data, badges, icons, or loading states change.
- Mobile layout rules keep filters, buttons, search inputs, and listing cards readable on narrow screens.

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

## Docker

The repository includes a production-ready multi-stage Dockerfile.

Build the image:

```bash
docker build -t locanto-services .
```

Run the container:

```bash
docker run --rm -p 3000:3000 locanto-services
```

Run the full local stack with the app, PostgreSQL, and Redis:

```bash
docker compose up --build
```

The Compose stack exposes:

- Web application on `http://localhost:3000`.
- PostgreSQL on `localhost:5432`.
- Redis on `localhost:6379`.

## Kubernetes

Kubernetes deployment configuration is available in `k8s/locanto-services.yaml`.

Apply the manifests:

```bash
kubectl apply -f k8s/locanto-services.yaml
```

The Kubernetes configuration includes:

- Dedicated namespace.
- ConfigMap for non-sensitive runtime configuration.
- Secret for database and cache connection strings.
- Deployment with three replicas.
- Container health checks through readiness and liveness probes.
- CPU and memory requests and limits.
- ClusterIP service for internal networking.
- HorizontalPodAutoscaler for scaling from 3 to 10 pods.
- NGINX-style ingress configuration for external HTTP routing.

Before production use, update the image reference, domain name, registry credentials, TLS settings, and secret values.

## DevOps And CI/CD Readiness

The project is prepared for a modern full-stack delivery workflow:

- Install dependencies with `npm ci`.
- Validate types with `npm run typecheck`.
- Run linting with `npm run lint`.
- Build the production bundle with `npm run build`.
- Build and publish Docker images to a registry such as GitHub Container Registry, Docker Hub, AWS ECR, Google Artifact Registry, or Azure Container Registry.
- Deploy the image to Kubernetes with rolling updates.
- Store database URLs, Redis URLs, API keys, and secrets outside the codebase.
- Run database migrations before deployment when a persistent ORM layer is added.
- Use logs, metrics, tracing, and health checks for operational visibility.

## Security And Performance

- TypeScript reduces runtime errors by enforcing listing and API contracts.
- API route validation rejects incomplete listing creation requests.
- Secrets are kept out of source code and represented through environment variables and Kubernetes Secret objects.
- Next.js standalone output reduces container size and production runtime surface area.
- Next Image improves image delivery performance and prevents raw oversized image usage.
- Debounced client search prevents unnecessary request bursts while typing.
- Kubernetes probes make unhealthy pods replaceable.
- Resource limits protect the cluster from runaway container usage.
- Redis can be used for caching, rate limiting, session storage, and hot query acceleration.
- PostgreSQL indexing or a dedicated search engine can be added for large-scale marketplace search.

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

The project is ready for deployment on platforms that support Next.js, such as Vercel, Netlify, Railway, Render, or a Node.js server. It can also be deployed through Docker and Kubernetes for cloud-native infrastructure.

The API routes currently use server collections for local development behavior. The repository also includes PostgreSQL and Redis deployment wiring so the same application can be extended into a persistent full-stack production system.

Recommended production database options:

- PostgreSQL with Prisma or Drizzle.
- Supabase Postgres.
- MySQL or PlanetScale.
- MongoDB Atlas.
- Firebase or Firestore.

## Repository

GitHub repository:

[https://github.com/Dpehect/Locanto-Website.git](https://github.com/Dpehect/Locanto-Website.git)
