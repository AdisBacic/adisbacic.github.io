# inat.dev

Personal site for **Adis Bacic** — Stockholm. Built around four shipped projects:
[Garnballer](https://garnballer.inat.dev), [DocLinguo](https://doclinguo.com),
[Ideal Clinic](https://idealclinic.se) and [Summit](https://summit.elyfe.dev) (invite only).

Live at **https://inat.dev**.

## inat

> **inat** /ǐnaːt/ — *noun, Bosnian.* Stubbornness with a spine. Doing the thing
> precisely because you were told it could not be done.

## Stack

Hand-written HTML, CSS and JavaScript. No framework, no build step, no
dependencies, no tracking. Served by GitHub Pages.

```
index.html      landing: markup + English copy
inat/index.html the word's own page: the entry, the story, the stubborn switch
styles.css      design tokens, dark/light themes
script.js       i18n (EN/SV), theme, typewriter, form → mailto, the stubborn switch
work/           each app's landing page, for the work cards (1280×560 WebP)
og.png          generated, see tools/
tools/          zero-dependency PNG generator for the social card
CNAME           inat.dev
```

English lives in the HTML so the page stays readable with JavaScript disabled;
Swedish is an overlay applied by `script.js`, and the default — a first visit
gets Swedish, and the choice is remembered. Nothing on the page depends on JS
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

DNS lives in Cloudflare. Apex and `www` point at GitHub Pages:

| Type | Name | Content | Proxy |
| :--- | :--- | :--- | :--- |
| A | `inat.dev` | `185.199.108.153` … `.111.153` (4 records) | **DNS only** |
| AAAA | `inat.dev` | `2606:50c0:8000::153` … `8003::153` (4 records) | **DNS only** |
| CNAME | `www` | `adisbacic.github.io` | **DNS only** |

**Keep these grey-clouded.** Proxying them through Cloudflare stops GitHub from
completing its own ACME challenge, so the certificate silently fails to renew —
the site keeps working until it expires, then stops. Cloudflare's dashboard will
nag that "Proxying is required for most security and performance features";
ignore it.

`.dev` is on the HSTS preload list, so browsers will only ever try HTTPS here.
There is no HTTP fallback to limp along on if the certificate lapses.

The Zoho mail records on the apex (3× MX, SPF, DKIM at `zoho._domainkey`, DMARC
at `_dmarc`, and the `zoho-verification` TXT) are untouched by any of this, and
were verified intact with `dig` afterwards. `garnballer.inat.dev` is a separate
CNAME to Firebase Hosting and is likewise unaffected.

## Why a site on the apex at all

Two reasons. Cloudflare was flagging that neither `inat.dev` nor `www.inat.dev`
resolved to anything, and a sending domain with no website behind it is a weak
signal to spam filters — which matters because mail from this domain goes
through Zoho and its deliverability score is the thing being defended.
