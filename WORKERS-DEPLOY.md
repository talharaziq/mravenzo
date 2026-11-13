# PawpawDecors — Cloudflare Workers deployment

This project keeps Astro's static output for the pages and uses a small Cloudflare Worker for the contact-form endpoint. It does not need the Astro SSR adapter: the articles, category pages, legal pages, sitemap and RSS feed are generated at build time.

## 1. Install and check the project

Use Node.js 22.23.4 or newer.

```sh
npm install
npm run check
npm run build
```

The static site is written to `dist/`. The Worker configuration in `wrangler.jsonc` publishes that directory and sends only `/api/*` requests through `worker/index.ts`.

## 2. Test the Worker locally

```sh
npm run dev:worker
```

This command builds the site and starts Wrangler on `http://localhost:8787`. The email binding is configured as a remote binding, so it uses Cloudflare Email Service rather than a local mail server. Email delivery still requires the domain and destination setup in the next section.

## 3. Set up Cloudflare Email Service

The contact form sends messages to `talharaziq@outlook.com`. It sends from `contact@pawpawdecors.com`, with the visitor's address set as Reply-To.

1. In the Cloudflare dashboard, open **Compute → Email Service → Email Sending**.
2. Choose **Onboard Domain** and select `pawpawdecors.com`.
3. Let Cloudflare add or show the DNS records it needs for SPF, DKIM, DMARC and bounce handling. Confirm the records in DNS and wait until Cloudflare marks the domain as ready.
4. Confirm that `talharaziq@outlook.com` is accepted as the destination address in your Email Service account. Verify it if Cloudflare asks you to.
5. Keep the sender address in `wrangler.jsonc` as `contact@pawpawdecors.com`, or change it there to another address on the onboarded domain. The sender must belong to a domain onboarded for Email Sending.

Cloudflare Email Service is currently in beta and requires Cloudflare DNS for the domain. The email binding is restricted to the one destination inbox and the one sender address in `wrangler.jsonc`; the browser cannot choose another recipient.

## 4. Deploy the Worker

Authenticate Wrangler with your Cloudflare account, then run:

```sh
npx wrangler login
npm run deploy
```

Wrangler builds the site first and then deploys the Worker plus the `dist/` assets. Check the resulting `*.workers.dev` URL. Test the homepage, an article, a category page, `/sitemap-index.xml`, `/rss.xml`, the 404 page, and the contact form.

For a Git-connected deployment, create a Worker named **`pawpawdecors`**, then connect **`talharaziq/pawpawdecors`** to **Workers Builds** on the `main` branch. The Worker name must match the `name` in `wrangler.jsonc`. Set Node.js to 22.23.4 or newer, use `npm install` as the install command, `npm run build` as the build command, and `wrangler deploy` as the deploy command. Workers Builds runs the build and deploy commands as separate steps, so do not use the local `npm run deploy` script as the deploy command there; that script also runs the build. Leave the root directory at the repository root. Do not connect the old `talharaziq/mravenzo` repository. The deployment log supplied for the Pages project showed that older repository name, even though it was building the same commit SHA.

## 5. Move the custom domain from Pages to Workers

First test the Worker on its `workers.dev` address. Then:

1. In Cloudflare, open **Workers & Pages → pawpawdecors → Settings → Domains & Routes**.
2. Add `pawpawdecors.com` as a **Custom Domain**. The domain's nameservers must be managed by Cloudflare.
3. If Cloudflare reports that a DNS CNAME from the old Pages project already occupies the hostname, remove the old Pages custom-domain assignment and conflicting CNAME before adding the Worker custom domain. Do this only after the Worker test succeeds.
4. Add `www.pawpawdecors.com` as another Custom Domain only if you use that hostname. Set a Cloudflare Redirect Rule to send `www` visitors to `https://pawpawdecors.com` so the canonical host remains consistent.
5. Test the live domain and the contact form again. Once traffic is working on Workers, disable automatic Pages deployments. Keep the Pages project until you are satisfied with the Worker deployment; you can delete the old Pages project afterwards.

The repository does not declare the custom domain in `wrangler.jsonc` on purpose. That lets you deploy and test on `workers.dev` before changing production DNS or the Pages domain assignment.

## 6. Contact-form behavior and protection

The endpoint validates the name, email address, subject and message on the server. It rejects cross-origin requests, oversized payloads and invalid fields. It also uses a hidden honeypot and a Cloudflare rate-limit binding set to five submissions per minute per IP at each Cloudflare location. Cloudflare's rate limiter is approximate, not a strict global quota.

If email delivery is unavailable, the form displays an error and the contact page still provides the direct `mailto:` address. Do not put email credentials, API tokens or private keys in browser code or in the repository.

## 7. CMS editing

The `.pages.yml` file is for Pages CMS, the Git-based content editor. It is independent of Cloudflare Pages hosting, so it can stay in the repository when hosting moves to Workers.
