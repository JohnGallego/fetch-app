# Pawfect Match - Finding Your Furry Soulmate

## Getting Started

To run the Pawfect Match application locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/JohnGallego/fetch-app.git](https://github.com/JohnGallego/fetch-app.git)
    cd fetch-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    - Create a `.env.local` file in the root of your project.
    - Add the following environment variables:

      ```
      NEXT_PUBLIC_BASE_URL=http://localhost:3000
      NEXT_PUBLIC_API_BASE_URL=https://frontend-take-home-service.fetch.com
      ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Open in your browser:**
    - Visit [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

## Tech Stack

This application is built using the following technologies:

- **Frontend Framework:** [Next.js](https://nextjs.org) v15
- **Data Fetching:** [React Query](https://tanstack.com/query/latest)
- **State Management:** [Zustand](https://zustand-js.netlify.app/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Icons:** [Lucide React](https://lucide.dev/icons) and [Font Awesome](https://fontawesome.com)
- **Validation:** [Zod](https://zod.dev)
- **Form Handling:** [react-hook-form](https://react-hook-form.com)
- **Persistence:** Zustand `persist` middleware

## Architecture Overview

The project is structured as a Next.js v15 application using the `app` directory structure. Here's an overview of the key architectural aspects:

**Key Directories & Functionality:**

- **`app/`:** Next.js application routes and pages.
  - `app/page.tsx`: Home page.
  - `app/search/page.tsx`: Search page with filter and results.
  - `app/auth/login/page.tsx` & `app/auth/logout/page.tsx`: Authentication pages.
  - `app/layout.tsx`: Root layout, initializes Zustand.
- **`components/`:** Reusable React components. Organized by feature and UI element. Contains UI components, form elements, dog display components, and layout components like the navbar.
- **`constants/`:** Configuration constants, including API endpoints and search defaults.
- **`lib/`:** Core application logic.
  - **`lib/api.ts`:** `fetchAPI` utility for making requests to the Fetch Pet API.
  - **`lib/queries.ts`:** React Query functions for fetching dog data, breeds, and locations, optimized for caching and server-side rendering.
  - **`lib/store.ts`:** Zustand store (`useFavoriteDogsStore`) managing the global state for favorite dog IDs, including persistence to local storage.
  - `lib/local-storage-favorites.ts`: (Legacy - largely replaced by Zustand persist) Initial local storage access for favorites (for store initialization - now redundant, but file kept for utility functions).
  - `lib/utils.ts`: Utility functions for class merging, query parameter manipulation (encoding/decoding breed arrays for API compatibility).
- **`actions/`:** Next.js Server Actions for backend operations.
  - **`actions/auth.actions.ts`:** Server Actions (`loginUser`, `logoutUser`, `checkLoginStatus`) handling authentication workflows and secure cookie management.
- **`schemas/`:** Zod schemas for data validation of forms and API interactions.
- **`types/`:** TypeScript type definitions for API responses and application data.

**State Management and Data Fetching Architecture:**

- **Component-Level State:** `useState` and `useReducer` for local UI concerns within components.
- **React Query for Data Fetching:** `useQuery` and `useInfiniteQuery` in `lib/queries.ts` for efficient API data fetching, server-side rendering, caching, and background updates. Data is fetched in server components for optimal performance.
- **Zustand for Global Favorites State:** `useFavoriteDogsStore` in `lib/store.ts` manages the application-wide state for user's favorite dogs.

**Authentication Flow:**

- **Server Actions in `actions/auth.actions.ts`:** `loginUser` and `logoutUser` are Server Actions that handle communication with the API for login and logout, and securely set/clear HTTP-only cookies (`fetch-access-token`). `checkLoginStatus` verifies login state by checking for the presence of the access token cookie on the server.
- **Login and Logout Pages (`app/auth/login/page.tsx`, `app/auth/logout/page.tsx`):** Client components providing login forms and logout triggers, invoking the corresponding Server Actions.
