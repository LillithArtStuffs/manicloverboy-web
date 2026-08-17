# manicloverboy-web

Website for **MANIC/LOVERBOY**, out in early alpha now!

- Download: <https://lillithartstuffs.itch.io/manicloverboy>
- Discord: <https://discord.gg/mgnAJp67S7>

## Running it

It's a static site with no build step or dependencies. Serve the `public`
folder:

```sh
cd public && python3 -m http.server 8000
```

Then visit <http://localhost:8000>. Opening `public/index.html` directly in a
browser works too.

## Layout

```
public/                    everything that gets published
  index.html               all page content
  assets/css/style.css     all styling
  assets/js/main.js        screenshot fallbacks + lightbox
  assets/img/              drop screenshots + social card here
wrangler.jsonc             Cloudflare Workers deploy config
```

Only `public/` is deployed — that's what keeps the repo's own files (and `.git`)
out of the published site.

## Images

Drop files in `public/assets/img/` with these exact names and the site picks
them up automatically:

| File | Used for | Suggested size |
| --- | --- | --- |
| `shot-01.png` … `shot-06.png` | Screenshot gallery | 1920×1080 (16:9) |
| `social-card.png` | Link preview on Discord / socials | 1200×630 |

Any slot without a file shows a hatched "SHOT 01" placeholder instead of a
broken image, so the page stays presentable while art is still in progress.
`.jpg` works too — just update the `src` in `index.html` to match.

## Deploying

Cloudflare Workers builds and deploys on push. `wrangler.jsonc` points at
`public/` as a static-assets directory; there's no Worker script because the
site needs no server-side code.

To check a deploy locally before pushing:

```sh
npx wrangler deploy --dry-run
```

## Re-theming

Every colour, font and effect is a custom property in the `:root` block at the
top of `public/assets/css/style.css`. Change them there and the whole site
follows — nothing else hardcodes a colour.

```css
--ink:   #07040b;  /* page background     */
--hot:   #ff2d6f;  /* primary accent      */
--cool:  #35f0e8;  /* secondary accent    */
--bone:  #f6ecf3;  /* body text           */
--warn:  #ffd84d;  /* content-warning box */
```

Two effect knobs live in the same block: set `--scan-opacity` and
`--grain-opacity` to `0` for a flat look without the CRT scanlines and film
grain.

## Still to fill in

Placeholder copy is marked with `PLACEHOLDER` comments in `public/index.html`:

- the hero tagline
- the About synopsis
- the content-warning list (or delete the `#warnings` section if it isn't needed)
- screenshots and the social card in `public/assets/img/`
