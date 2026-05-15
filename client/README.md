# Modern Courses Client

React + TypeScript client for the courses API.

## What changed

The app was converted from JavaScript/JSX to TypeScript/TSX and reorganized into a clean-ish structure:

```text
src/
  domain/
    models/            Core app types such as User and Course
    repositories/      Interfaces for auth and course data access
  data/
    config/            App configuration
    http/              Generic API client and response helpers
    repositories/      API-backed repository implementations
  presentation/
    auth/              Auth context and auth screens
    components/        Shared UI components
    courses/           Course list, detail, create, and update screens
    layout/            Header and app layout pieces
    pages/             Error, forbidden, and not found pages
    routing/           Private route guard
```

## Architecture notes

The code follows a practical clean architecture approach without overengineering:

- `domain` contains the app contracts and business models.
- `data` knows how to talk to the API.
- `presentation` contains React components, hooks, routing, and UI state.
- Components depend on repository interfaces through context instead of directly calling `fetch`.
- API logic is isolated in `ApiClient` and repository classes.

## SOLID-related improvements

- Single Responsibility: API fetching, auth state, routing, and UI rendering are separated.
- Dependency Inversion: UI talks to repository contracts instead of raw API code.
- Interface Segregation: auth and course responsibilities are split into separate repository interfaces.
- Open/Closed: another data source can be added later by implementing the same repository interfaces.

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment variables

Create `.env` from `.env.example` if needed:

```bash
VITE_API_BASE_URL=http://localhost:5001/api
```
