# Insighta Web Portal

Insighta Web Portal is a React + Vite application for authenticated profile analytics. It provides secure login, profile browsing, search, account management, and a dashboard overview of profiles.

## Features

- GitHub OAuth login flow via backend authentication
- Protected routes for authenticated users
- Dashboard with summary stats and recent profiles
- Profile list and profile detail pages
- Search page for finding profiles
- Account page for user settings and logout
- Backend API integration with CSRF and session handling

## Project Structure

- `src/App.jsx` — application routes and authentication wrapper
- `src/pages/LoginPage.jsx` — login screen with email input and GitHub OAuth button
- `src/pages/Dashboard.jsx` — overview dashboard with profile stats
- `src/pages/ProfilesList.jsx` — profile list view
- `src/pages/ProfileDetails.jsx` — profile detail view
- `src/pages/SearchPage.jsx` — search interface
- `src/pages/AccountPage.jsx` — account settings and logout
- `src/contexts/AuthContext.jsx` — user session state and auth helpers
- `src/utils/api.js` — API client with backend URL config and CSRF handling
- `src/components/Navbar.jsx` — navigation for authenticated pages
- `src/components/ProtectedRoute.jsx` — route guard for logged-in users

## Getting Started

### Install dependencies

```bash
npm install
```

### Local development

```bash
npm run dev
```

The app runs on `http://localhost:5173` by default.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the project root if needed and set the backend API URL:

```env
VITE_BACKEND_URL=http://localhost:3000
```

> In production, the app uses `import.meta.env.PROD` and expects the backend URL from `VITE_BACKEND_URL`.

## Routes

- `/login` — login page
- `/` or `/dashboard` — main dashboard (requires authentication)
- `/profiles` — profiles listing
- `/profiles/:id` — profile details
- `/search` — search by profiles
- `/account` — account settings and logout

## Notes

- The portal uses cookie-based authentication with `credentials: 'include'` for API requests.
- API requests are forwarded to the backend URL configured by `VITE_BACKEND_URL`.
- If the session expires, the app redirects users to `/login`.

## License

This project is currently private.
