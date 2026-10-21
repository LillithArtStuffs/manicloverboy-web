# manicloverboy-web

lillith's portfolio, at manicloverboy.com.

- `src/worker.js` renders the page. it reads KV `portfolio` and `pfimg:<key>` from the namespace it shares with 3STARSWIRL, and never writes to it.
- you edit it in the 3STARSWIRL panel, under behind the scenes → portfolio (owner only). saving there updates this site within about a minute.
- `wrangler.jsonc` holds the KV binding and the manicloverboy.com custom domain. pushing to main deploys.

**offline right now:** `OFFLINE` is `"1"` in `wrangler.jsonc`, so every page shows 3STARSWIRL's 404 (copied into `public/`; re-copy it if that one changes). set it to `"0"` to bring the portfolio back.
