# Pillar Gold And Onyx

https://pillargroup-eg.com/ عاوز زي الويب سايت دا بالظبط

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pillar-gold-and-onyx.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/205aa199-6d8c-466e-8d18-e7b06bff8310).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Administration dashboard and SQLite CMS

The existing website layout and routes are preserved. The separate dashboard is available at `/admin` (or `/admin.html`). For local development, install with `npm install`, then run `ADMIN_PASSWORD='choose-a-strong-password' npm run dev`. This starts the Vite site and the Node API together. Visit `http://localhost:5173/admin`. Node.js 22.13+ is required; the API uses the built-in `node:sqlite` module. If no password is supplied, the development-only fallback is `change-this-admin-password`; set a strong `ADMIN_PASSWORD` before exposing the service.

Site settings, page content, links, and media metadata are persisted in `data/pillar.sqlite` (SQLite WAL mode). Uploaded files are stored in `public/uploads/` with a 25 MB per-file limit. Back up both locations. The CMS runtime reads content and applies supported page/settings changes without changing the current design; rich page blocks can be edited as JSON, and image blocks may use uploaded `/uploads/...` paths.

The API needs a persistent Node.js host and persistent filesystem. Static-only or ephemeral serverless hosting cannot retain this SQLite database or upload directory. In production route `/api/*` and `/uploads/*` to `server/api.mjs` and persist `data/` and `public/uploads/`. Never expose the default development password.
