# PawpawDecors — audit and changes

## Fixed

- Fixed `pageSize is not defined` in all four paginated Astro routes by declaring the value inside each `getStaticPaths()` function.
- Removed the unused `keywords` prop from the category page layout call.
- Explicitly prerendered the RSS endpoint for the static Astro build.
- Added a contact form and a server-side `/api/contact` Worker endpoint. The Worker validates fields, rejects cross-origin requests, limits request size, uses a honeypot and rate limit, and sends plain-text email to `talharaziq@outlook.com`.
- Added Cloudflare Workers static asset configuration and pinned Wrangler in the project dependencies.
- Updated CMS and deployment instructions for Workers Builds and custom-domain migration.
- Added Wrangler development and local-secret folders to `.gitignore`.
- Updated compact article cards so both titles and excerpts can use up to three lines.

## Checks run

- Worker TypeScript check: passed.
- Worker endpoint tests with mocked email and rate-limit bindings: passed. Tests covered valid delivery payload, invalid fields, honeypot, rate limit, origin check, method handling and oversized requests.
- JSON, Wrangler configuration and YAML/frontmatter parsing: passed.

## Still required in Cloudflare

- Run `npm run check` and `npm run build` on Node.js 22.23.4 or newer after applying this ZIP. A full Astro build was not run in the preparation environment because the project dependencies were not installed there and its Node.js version was below the project's declared minimum.
- Onboard `pawpawdecors.com` in Cloudflare Email Service and confirm the destination inbox before testing the form. Email Service is currently a beta feature and requires Cloudflare DNS.
- Deploy and test the Worker on its `workers.dev` address before moving the production domain away from Pages.
- Delete the two unused legacy image files listed in `DELETE-FROM-REPO.txt`. ZIP uploads do not delete existing files automatically.
