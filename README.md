# inat.dev

Personal site for **Adis Bacic** — bookkeeping, fintech and open banking, from Stockholm.

Live at **https://inat.dev**.

## inat

> **inat** /ǐnaːt/ — *noun, Bosnian.* Stubbornness with a spine. Doing the thing
> precisely because you were told it could not be done.

## Stack

Hand-written HTML, CSS and JavaScript. No framework, no build step, no
dependencies, no tracking. Served by GitHub Pages.

```
index.html      markup + English copy
styles.css      design tokens, dark/light themes
script.js       i18n (EN/SV), theme, form → mailto, the stubborn switch
og.png          generated, see tools/
tools/          zero-dependency PNG generator for the social card
CNAME           inat.dev
```

English lives in the HTML so the page stays readable with JavaScript disabled;
Swedish is an overlay applied by `script.js`. Nothing on the page depends on JS
to be legible — the scroll reveals only hide themselves once JS has confirmed it
is running.

## Local

```bash
python3 -m http.server 4321
```

## Regenerating the social card

```bash
node tools/generate-og.mjs
```

## DNS

Apex and `www` point at GitHub Pages from Cloudflare, **DNS only** (grey cloud)
so GitHub can issue and renew its own certificate. The Zoho mail records on the
apex (MX, SPF, DKIM, DMARC) are untouched by any of this.
