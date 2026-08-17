# manicloverboy-web

Website for **MANIC/LOVERBOY**, out in early alpha now!

- Download: <https://lillithartstuffs.itch.io/manicloverboy>
- Discord: <https://discord.gg/mgnAJp67S7>

## Running it

It's a static site with no build step or dependencies. Open `index.html` in a
browser, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Layout

```
index.html            all page content
assets/css/style.css  all styling
assets/js/main.js     screenshot fallbacks + lightbox
assets/img/           drop screenshots + social card here (see its README)
```

## Re-theming

Every colour, font and effect is a custom property in the `:root` block at the
top of `assets/css/style.css`. Change them there and the whole site follows —
nothing else hardcodes a colour.

```css
--ink:   #07040b;  /* page background     */
--hot:   #ff2d6f;  /* primary accent      */
--cool:  #35f0e8;  /* secondary accent    */
--bone:  #f6ecf3;  /* body text           */
--warn:  #ffd84d;  /* content-warning box */
```

Two effect knobs are in the same block: set `--scan-opacity` and
`--grain-opacity` to `0` for a flat look without the CRT scanlines and film
grain.

## Still to fill in

Placeholder copy is marked with `PLACEHOLDER` comments in `index.html`:

- the hero tagline
- the About synopsis
- the content-warning list (or delete the `#warnings` section if it isn't needed)
- screenshots and the social card in `assets/img/`
