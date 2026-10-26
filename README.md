This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

Route files stay in `app/`; feature UI and reusable components live outside the route tree:

```text
app/                         Next.js routes and root layout
  api/auth/                  NextAuth API route
  auth/                      Login and signup route pages
  product/[id]/              Product detail route
  shop/                      Shop route page
components/
  auth/                      Login and signup forms
  cart/                      Cart UI
  common/                    Shared UI such as breadcrumbs and banners
  home/                      Home page sections
  layout/                    Site header, footer, and page transition
  product/                   Product grid and cards
  shop/                      Shop catalog, filters, and pagination
lib/
  services/                  Product data access
  store/                     Redux store, hooks, and feature slices
types/
  globals.d.ts               Shared global declarations
  next-auth.d.ts             NextAuth type extensions
  auth.ts                    Auth form contract
  cart.ts                    Cart item contract
  product.ts                 Product contract
  index.ts                   Type exports
public/images/               Static image assets
```

The intended flow is: route pages compose feature components; components call services or dispatch store actions; services and slices use the shared types from `types/`. Product data is currently local mock data in `lib/services/productService.ts`, so that service is the place to connect a product API later. Checkout, orders, and a user profile are not implemented yet, so their folders are intentionally not created.

The `/product/[id]` route renders a selected product’s gallery, sample variants, cart controls, description, and related items. Ratings, variants, and secondary gallery imagery are demo values in the local catalog and should be replaced with API-backed product data before production.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
