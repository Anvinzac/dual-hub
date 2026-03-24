# Dual Hub

Dual Hub is a Vite + React + TypeScript landing experience that presents two product ecosystems in one interface:

- `Bạn khách`: a consumer-facing discovery hub
- `Bạn quán`: a business-facing solutions hub

The app is currently a polished frontend prototype with animated transitions, curated app cards, and a split-screen entry flow.

## Stack

- React 18
- Vite 5
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/Radix UI primitives
- Vitest + Testing Library

## Scripts

- `npm install`: install dependencies and refresh the lockfile
- `npm run dev`: start the local dev server
- `npm run build`: create a production build
- `npm run lint`: run ESLint
- `npm test`: run the Vitest suite

## Project Structure

- [`src/pages/Index.tsx`](/Users/dongm1/Documents/New%20project/dual-hub/src/pages/Index.tsx): entry screen and panel transition orchestration
- [`src/components`](/Users/dongm1/Documents/New%20project/dual-hub/src/components): page-level presentation components and cards
- [`src/features/hub/data.ts`](/Users/dongm1/Documents/New%20project/dual-hub/src/features/hub/data.ts): shared hub content, categories, and display metadata
- [`src/features/hub/types.ts`](/Users/dongm1/Documents/New%20project/dual-hub/src/features/hub/types.ts): feature-level model types
- [`src/features/hub/components`](/Users/dongm1/Documents/New%20project/dual-hub/src/features/hub/components): reusable feature UI building blocks
- [`src/test`](/Users/dongm1/Documents/New%20project/dual-hub/src/test): app tests and test setup

## Maintenance Notes

- Keep product copy, category definitions, and card metadata in `src/features/hub/data.ts` rather than embedding them directly in page components.
- Prefer small feature components for repeated patterns such as search bars, section headers, and stat cards.
- Run `npm run lint && npm test && npm run build` before shipping changes.
- If dependencies change, commit the updated `package-lock.json` so `npm ci` remains reliable in CI.
