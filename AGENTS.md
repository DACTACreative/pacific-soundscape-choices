# Project rules

- Keep page search metadata in `src/lib/siteMetadata.ts` and apply it through `PageMetadata` inside the existing router; navigation must update metadata without changing game state.
- Keep the sitemap's public paths aligned with the metadata map; search engines need a consistent list of canonical pages.
- Use Vercel's Vite build and filesystem-first SPA rewrite in `vercel.json`; direct links must load without breaking static image, data or audio assets.