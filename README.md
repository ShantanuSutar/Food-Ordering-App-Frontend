# DineHub Frontend

DineHub is a responsive food-ordering application for customers and restaurant owners. This repository contains the React client, including public restaurant discovery, global food search, cart and checkout, Stripe payment completion, customer profiles, and the restaurant-owner portal.

## Live application

- Frontend: [dinehub-good-food-delivered.vercel.app](https://dinehub-good-food-delivered.vercel.app)
- Backend API: [food-ordering-app-e13n.onrender.com](https://food-ordering-app-e13n.onrender.com)
- Backend repository: [Food-Ordering-App](https://github.com/ShantanuSutar/Food-Ordering-App)

The Render service may need a short cold-start period before the first API request completes.

## Features

### Customer experience

- Browse real restaurants and available menu items without signing in
- Dynamic Top Meals carousel backed by the API
- Global debounced food and category search
- Restaurant menu filtering by food type and category
- Authentication-aware cart with quantity controls and price breakdown
- Saved delivery-address creation, editing, deletion, and checkout selection
- Stripe Checkout with server-side payment verification
- Payment success and cancellation states
- Order history, order details, and eligible order cancellation
- Live payment history
- Restaurant favourites with current availability and location information
- Responsive profile navigation and mobile drawers
- Consistent loading, empty, error, and toast feedback

### Restaurant-owner portal

- Restaurant onboarding and profile editing
- Open/closed availability control
- Dashboard metrics calculated from real menu and order data
- Menu-item creation, editing, availability toggling, and archival
- Food-category management
- Ingredient categories, ingredients, and stock availability
- Paid-order visibility and validated order-status transitions
- Responsive desktop sidebar and mobile navigation

## Technology

- React 19 and Vite 8
- React Router
- Redux with Redux Thunk
- Material UI and Tailwind CSS
- Formik and Yup
- Axios
- Stripe Checkout redirects
- Embla Carousel
- React Hot Toast
- Cloudinary unsigned uploads for restaurant/menu images

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm
- A running DineHub backend
- Optional Cloudinary account for owner image uploads

### Installation

```bash
git clone https://github.com/ShantanuSutar/Food-Ordering-App-Frontend.git
cd Food-Ordering-App-Frontend
npm install
```

Copy the environment template:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure `.env`:

```dotenv
VITE_API_URL=http://localhost:9090
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_CLOUDINARY_CLOUD_NAME=
```

- `VITE_API_URL` is the backend origin without a trailing API path.
- The Cloudinary variables are required only for uploading images from the owner portal.
- Vite variables are included in the browser bundle. Never place backend, JWT, database, or Stripe secrets in them.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Available commands

```bash
npm run dev      # Start the Vite development server
npm run lint     # Run ESLint
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```

## Main routes

Customer routes:

- `/` — home, Top Meals, and restaurants
- `/restaurant/:city/:title/:id` — restaurant menu and filters
- `/cart` — cart, saved addresses, and checkout
- `/search` — food search results
- `/my-profile` — account profile
- `/my-profile/orders` — order history
- `/my-profile/orders/:orderId` — order details
- `/my-profile/address` — saved-address management
- `/my-profile/favourites` — favourite restaurants
- `/my-profile/payments` — payment history
- `/payment/success/:id` — verified Stripe return flow
- `/payment/fail` — cancelled or failed checkout

Restaurant-owner routes are nested under `/admin/restaurant`:

- `/admin/restaurant` — dashboard
- `/admin/restaurant/orders` — restaurant orders
- `/admin/restaurant/menu` — menu management
- `/admin/restaurant/add-menu` — create menu item
- `/admin/restaurant/menu/:foodId/edit` — edit menu item
- `/admin/restaurant/category` — food categories
- `/admin/restaurant/ingredients` — ingredients and stock
- `/admin/restaurant/details` — restaurant settings

## Application structure

```text
src/
├── adminComponents/       Restaurant-owner pages and forms
├── components/            Customer pages and shared UI
├── routers/               Customer and owner route trees
├── State/                 Redux actions, reducers, and store
├── assets/                Local visual assets
├── App.jsx                Global data loading, theme, and toaster
└── main.jsx               React, Router, and Redux providers
```

Redux is divided by domain: authentication/profile, restaurants, menu/search, cart, customer orders, restaurant orders, and ingredients. API requests use the shared Axios client in `src/components/config/api.js`.

## Payment flow

1. Checkout sends the selected delivery address to the backend.
2. The backend creates a pending order and Stripe Checkout Session.
3. Stripe redirects back with the Checkout Session ID.
4. The success page asks the authenticated backend to verify the session.
5. Only a verified `PAID` response is shown as successful.
6. The frontend refetches the backend cart so the Navbar badge immediately reflects the cleared cart.

Visiting a success URL manually does not mark an order as paid.

## Deployment on Vercel

Use these project settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://your-api.example.com`

`vercel.json` rewrites application routes to `index.html`. This is required for direct navigation and page refreshes on React Router routes such as `/my-profile/favourites`.

The backend must also include the exact Vercel origin in `FRONTEND_URL` or `CORS_ALLOWED_ORIGINS`.

## Validation before deployment

```bash
npm run lint
npm run build
```

## Related repository

The Spring Boot API, Docker deployment, PostgreSQL schema, Stripe integration, tests, and demo seed data are maintained in [Food-Ordering-App](https://github.com/ShantanuSutar/Food-Ordering-App).
