# Online Tools Website (Next.js 15)

A modern, SEO-friendly, dark-first Next.js 15 app (app directory, Typescript, SCSS, Monaco, Fortawesome, MongoDB/Mongoose) providing a suite of online tools.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   # or
   pnpm install
   ```

2. Copy `.env.example` to `.env` and set your MongoDB URI if needed.

3. Run the development server:
   ```sh
   npm run dev
   # or
   pnpm dev
   ```

4. Visit http://localhost:3000

## Features
- Next.js 15 (app directory, Typescript)
- SCSS styling
- Fortawesome icons
- Monaco Editor for code tools
- Day/Night mode (default: Night)
- SEO optimized
- MongoDB/Mongoose integration

## Adding Tools
Each tool is a page in `/app/tools/<tool-name>/page.tsx`.
