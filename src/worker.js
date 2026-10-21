// manicloverboy.com: lillith's portfolio.
// everything on the page comes from KV "portfolio" (edited in the 3STARSWIRL panel → portfolio). this worker only reads.
//   /            the page (rendered here, so it works without javascript and search engines can read it)
//   /img/<key>   a picture uploaded in the panel (KV "pfimg:<key>")
//   anything else  a real 404

const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const HEX = /^#[0-9a-f]{6}$/i;
const okUrl = u => /^(https?:\/\/|mailto:)[^\s"'<>]+$/i.test(u || "");

function imageType(b) {
  const at = (i, ...xs) => xs.every((x, k) => b[i + k] === x);
  if (at(0, 0x89, 0x50, 0x4e, 0x47)) return "image/png";
  if (at(0, 0x47, 0x49, 0x46, 0x38)) return "image/gif";
  if (at(0, 0x52, 0x49, 0x46, 0x46) && at(8, 0x57, 0x45, 0x42, 0x50)) return "image/webp";
  if (at(0, 0xff, 0xd8, 0xff)) return "image/jpeg";
  return null;
}

const CSP = "default-src 'none'; img-src 'self' https://i.ytimg.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; " +
  "script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";
const headers = (type, extra = {}) => ({ "content-type": type, "x-content-type-options": "nosniff", "referrer-policy": "strict-origin-when-cross-origin",
  "strict-transport-security": "max-age=31536000", "content-security-policy": CSP, "x-frame-options": "DENY", ...extra });

function page(d) {
  const accent = HEX.test(d.accent || "") ? d.accent : "#e0218a", name = d.name || "lillith";
  const sections = (d.sections || []).filter(s => s.items && s.items.length);
  const piece = it => {
    const media = it.img ? `<img src="/img/${esc(it.img)}" alt="${esc(it.title)}" loading="lazy" data-full="/img/${esc(it.img)}">`
      : it.yt ? `<a class="vid" href="https://youtu.be/${esc(it.yt)}" target="_blank" rel="noopener"><img src="https://i.ytimg.com/vi/${esc(it.yt)}/hqdefault.jpg" alt="${esc(it.title)}" loading="lazy"><span class="play" aria-hidden="true">▶</span></a>` : "";
    const title = it.url && okUrl(it.url) ? `<a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.title)} <span aria-hidden="true">↗</span></a>` : esc(it.title);
    return `<article class="piece${it.big ? " big" : ""}${media ? "" : " bare"}">${media ? `<div class="media">${media}${it.yt && it.img ? `<a class="vidtag" href="https://youtu.be/${esc(it.yt)}" target="_blank" rel="noopener">▶ watch</a>` : ""}</div>` : ""}
      <div class="cap"><h3>${title}</h3>${it.year ? `<span class="yr">${esc(it.year)}</span>` : ""}</div>${it.blurb ? `<p>${esc(it.blurb)}</p>` : ""}</article>`;
  };
  const nav = sections.map((s, i) => `<a href="#${esc(s.id)}"><span>${String(i + 1).padStart(2, "0")}</span>${esc(s.title)}</a>`).join("");
  const body = sections.length ? sections.map((s, i) => `<section id="${esc(s.id)}"><h2><span class="n">${String(i + 1).padStart(2, "0")}</span>${esc(s.title)}<span class="ct">${s.items.length}</span></h2>
    <div class="grid">${s.items.map(piece).join("")}</div></section>`).join("") : `<p class="empty">work's going up soon.</p>`;
  const links = (d.links || []).filter(l => okUrl(l.url)).map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.name)}</a>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(name)}${d.tag ? " · " + esc(d.tag) : ""}</title><meta name="description" content="${esc(d.tag || d.about || name + "'s portfolio")}">
<meta property="og:title" content="${esc(name)}"><meta property="og:description" content="${esc(d.tag || "")}"><meta name="theme-color" content="#0b0a0d">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
:root { --bg:#0b0a0d; --fg:#ece6ee; --dim:#8a8290; --line:#2a2630; --card:#141218; --ac:${accent}; }
* { box-sizing:border-box; } html { scroll-behavior:smooth; }
body { margin:0; background:var(--bg); color:var(--fg); font:15px/1.6 "JetBrains Mono", ui-monospace, monospace; -webkit-font-smoothing:antialiased; }
body::before { content:""; position:fixed; inset:0; pointer-events:none; z-index:50; opacity:.05;
  background:repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px); mix-blend-mode:overlay; }
a { color:inherit; } ::selection { background:var(--ac); color:#000; }
.wrap { max-width:1180px; margin:0 auto; padding:0 20px; }
header { padding:72px 0 36px; border-bottom:1px solid var(--line); }
.hi { font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--dim); }
.hi b { color:var(--ac); font-weight:600; }
h1 { font:italic 400 clamp(64px, 15vw, 190px)/.86 "Instrument Serif", Georgia, serif; margin:14px 0 18px; letter-spacing:-.02em; }
h1 .dot { color:var(--ac); font-style:normal; }
.tag { font-size:clamp(15px, 2vw, 19px); max-width:720px; margin:0; }
.about { color:#c9c1cc; max-width:680px; white-space:pre-line; margin:22px 0 0; }
.links { display:flex; flex-wrap:wrap; gap:8px; margin-top:26px; }
.links a { text-decoration:none; border:1px solid var(--line); padding:6px 12px; font-size:13px; transition:.15s; }
.links a:hover { border-color:var(--ac); color:var(--ac); }
nav.toc { position:sticky; top:0; z-index:10; background:color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter:blur(8px); border-bottom:1px solid var(--line); }
nav.toc .wrap { display:flex; gap:22px; overflow-x:auto; padding-top:12px; padding-bottom:12px; scrollbar-width:none; }
nav.toc a { text-decoration:none; font-size:13px; white-space:nowrap; color:var(--dim); } nav.toc a:hover { color:var(--fg); }
nav.toc span { color:var(--ac); margin-right:6px; }
section { padding:56px 0 8px; scroll-margin-top:50px; }
h2 { font:400 clamp(38px, 6vw, 64px)/1 "Instrument Serif", Georgia, serif; margin:0 0 26px; display:flex; align-items:baseline; gap:14px; }
h2 .n { font:600 13px "JetBrains Mono", monospace; color:var(--ac); }
h2 .ct { font:12px "JetBrains Mono", monospace; color:var(--dim); margin-left:auto; }
.grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:18px; }
.piece { background:var(--card); border:1px solid var(--line); display:flex; flex-direction:column; transition:border-color .2s, transform .2s; }
.piece:hover { border-color:color-mix(in srgb, var(--ac) 60%, var(--line)); }
.piece.big { grid-column:1 / -1; }
.media { position:relative; background:#000; overflow:hidden; }
.media img { display:block; width:100%; height:auto; max-height:560px; object-fit:cover; cursor:zoom-in; transition:transform .5s; }
.piece.big .media img { max-height:none; }
.piece:hover .media img { transform:scale(1.015); }
.vid { display:block; position:relative; aspect-ratio:16/9; background:#000; } .vid img { cursor:pointer; width:100%; height:100%; max-height:none; object-fit:cover; }
.play { position:absolute; inset:0; display:grid; place-items:center; font-size:38px; color:#fff; text-shadow:0 2px 18px #000; }
.vidtag { position:absolute; right:10px; bottom:10px; background:#000c; text-decoration:none; padding:3px 9px; font-size:12px; }
.cap { display:flex; gap:10px; align-items:baseline; padding:12px 14px 0; }
.cap h3 { font-size:15px; font-weight:600; margin:0; flex:1; } .cap h3 a { text-decoration:none; } .cap h3 a:hover { color:var(--ac); }
.yr { font-size:12px; color:var(--dim); }
.piece p { margin:6px 14px 14px; color:#b9b1bd; font-size:13.5px; white-space:pre-line; }
.piece:not(:has(p)) .cap { padding-bottom:12px; }
.piece.bare { padding-top:4px; }
.empty { padding:80px 0; color:var(--dim); }
footer { margin-top:70px; border-top:1px solid var(--line); padding:26px 0 40px; font-size:12px; color:var(--dim); display:flex; flex-wrap:wrap; gap:10px; justify-content:space-between; }
footer a { color:var(--dim); } footer a:hover { color:var(--ac); }
.lb { position:fixed; inset:0; z-index:100; background:#000e; display:none; place-items:center; padding:20px; cursor:zoom-out; }
.lb.on { display:grid; } .lb img { max-width:100%; max-height:100%; object-fit:contain; box-shadow:0 10px 60px #000; }
@media (max-width:600px) { header { padding-top:44px; } .grid { grid-template-columns:1fr; } section { padding-top:40px; } }
@media (prefers-reduced-motion:reduce) { * { transition:none !important; } html { scroll-behavior:auto; } }
</style></head><body>
<header><div class="wrap"><div class="hi">portfolio <b>//</b> ${new Date().getFullYear()}</div>
<h1>${esc(name)}<span class="dot">.</span></h1>${d.tag ? `<p class="tag">${esc(d.tag)}</p>` : ""}${d.about ? `<p class="about">${esc(d.about)}</p>` : ""}
${links ? `<div class="links">${links}</div>` : ""}</div></header>
${sections.length > 1 ? `<nav class="toc" aria-label="sections"><div class="wrap">${nav}</div></nav>` : ""}
<main class="wrap">${body}</main>
<footer class="wrap"><span>© ${new Date().getFullYear()} ${esc(name)}</span><a href="https://3starswirl.com">part of 3STARSWIRL ↗</a></footer>
<div class="lb" role="dialog" aria-label="picture"><img alt=""></div>
<script>
(() => { const lb = document.querySelector(".lb"), im = lb.querySelector("img");
  document.addEventListener("click", e => { const t = e.target.closest("img[data-full]"); if (t) { im.src = t.dataset.full; im.alt = t.alt; lb.classList.add("on"); } else if (e.target.closest(".lb")) lb.classList.remove("on"); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("on"); }); })();
</script></body></html>`;
}

const notFound = () => new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>not here</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0a0d;color:#8a8290;font:14px ui-monospace,monospace}a{color:#ece6ee}</style>
<p>nothing here. <a href="/">go back</a></p>`, { status: 404, headers: headers("text/html; charset=utf-8", { "x-robots-tag": "noindex" }) });

export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (env.OFFLINE !== "0") {   // taken down: everything is the 404 room (its font lives at /a/)
      if (u.pathname.startsWith("/a/")) return env.ASSETS.fetch(req);
      const r = await env.ASSETS.fetch(new Request(new URL("/404.html", req.url)));
      return new Response(req.method === "HEAD" ? null : r.body, { status: 404, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
    }
    if (u.hostname.startsWith("www.")) return Response.redirect("https://" + u.hostname.slice(4) + u.pathname + u.search, 301);
    if (req.method !== "GET" && req.method !== "HEAD") return new Response("", { status: 405, headers: { allow: "GET, HEAD" } });
    const p = u.pathname;
    if (p === "/" || p === "/index.html") {
      let d = {}; try { d = (await env.PEOPLE.get("portfolio", "json")) || {}; } catch (e) {}
      return new Response(req.method === "HEAD" ? null : page(d), { headers: headers("text/html; charset=utf-8", { "cache-control": "public, max-age=60" }) });
    }
    const m = /^\/img\/([0-9a-f]{16})$/.exec(p);
    if (m) {
      const d = (await env.PEOPLE.get("portfolio", "json").catch(() => null)) || {};
      if (!(d.pool || []).includes(m[1])) return notFound();   // only pictures the portfolio actually uses
      const v = await env.PEOPLE.get("pfimg:" + m[1], { type: "arrayBuffer" }); const t = v && imageType(new Uint8Array(v));
      if (!t) return notFound();
      return new Response(req.method === "HEAD" ? null : v, { headers: headers(t, { "cache-control": "public, max-age=86400" }) });
    }
    if (p === "/robots.txt") return new Response("User-agent: *\nAllow: /\n", { headers: headers("text/plain; charset=utf-8") });
    return notFound();
  }
};
