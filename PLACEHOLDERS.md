# Ghurab — Placeholder Inventory

Everything on this site that is not yet real. Nothing in this list was invented:
where a fact was missing it was left as a marked placeholder rather than filled
with plausible-looking content, because the audience in spec S3 (generals, VCs,
journalists) will check.

Grouped by what unblocks them. **Blockers** must be resolved before launch —
each is either visibly broken or actively misleading.

---

## 1. BLOCKERS — the site should not go live with these

### 1.1 Web3Forms access key
- **File:** `src/_data/meta.js` → `web3formsKey`
- **Now:** empty string. All three forms (Home sponsor, Services client,
  Contact) render **visibly disabled** with a "not yet connected" notice.
- **Need:** access key from web3forms.com (see setup steps previously given).
- **Why blocking:** without it there is no way to contact the team at all.

### 1.2 Contact email address
- **Files:** `src/_data/personal.yaml` → `email`; `src/_data/meta.js` → `creator.email`
- **Now:** `hello@ghurab.example` — a deliberately non-resolving RFC 2606 domain.
- **Used by:** Contact page direct-email fallback, legal notice, `humans.txt`.
- **Why blocking:** press and government contacts often will not use a web form.

### 1.3 Repository URL
- **File:** `package.json` → `repository.url`
- **Now:** `https://github.com/PLACEHOLDER-org/PLACEHOLDER-repo.git`
- **Also:** `src/_data/meta.js` → `viewRepo.allow` is `false`. Set to `true`
  after fixing the URL, and add a `githubEdit` label string (the partial reads
  `meta[page.lang].blog.githubEdit`, currently undefined).
- **Why blocking:** previously pointed every blog post at the upstream
  starter's repo.

### 1.4 Live domain
- **File:** `src/common/og-images.njk` → `siteUrl` (`ghurab.example`)
- **Also:** `URL` env var (`.env`), which drives canonical URLs, OG tags,
  sitemap, and RSS. Currently falls back to `http://localhost:8080`.
- **Why blocking:** every canonical/OG/feed URL is wrong until set.

### 1.5 Path prefix vs custom domain
- **File:** `package.json` → `build-ghpages` uses `--pathprefix=/ghurab`
- Correct for a project page (`<user>.github.io/ghurab`). **If you point a
  custom domain at this, the prefix must be removed** or every path breaks.

### 1.6 Privacy policy — needs legal review
- **File:** `src/pages/privacy.md`
- Rewritten to honestly describe Web3Forms + GitHub Pages data flow. Still
  needs: jurisdiction (Bangladesh; GDPR if EU visitors in scope), named data
  controller, retention period.

---

## 2. CONTENT YOU SAID YOU'D SUPPLY

### 2.1 Track record — Home page
- **File:** `src/pages/index.njk` (four `.track-record-card` entries)
- **Need:** `[Competition name] — [result] — [date]` ×2,
  `[Hackathon name] — [result] — [date]`, `[CTF name] — [placement] — [date]`
- Dashed borders mark these as unfilled; restyle once real.
- Card count is arbitrary — add or remove freely.

### 2.2 Blog seed posts (4 placeholder files)
- `src/posts/2026/2026-01-15-build-log-placeholder.md`
- `src/posts/2026/2026-03-22-competition-placeholder.md`
- `src/posts/2026/2026-05-08-ctf-placeholder.md`
- `src/posts/2026/2026-07-30-general-placeholder.md`
- Each needs real title, description, date, tags, body. **Dates are fabricated**
  and drive sort order and the RSS feed.
- Tags in use: `build-log`, `competition`, `ctf`, `general`.
- Note: OG preview images are generated from post titles, so stale titles leave
  stale files in `src/assets/og-images/` — delete those when renaming.

### 2.3 Project entries (3 placeholder files)
- `src/projects/2026-03-01-project-alpha.md` — Autonomous Ground Platform
- `src/projects/2026-05-10-project-bravo.md` — Manipulator Arm (**flagship**)
- `src/projects/2026-07-20-project-charlie.md` — CTF Toolkit
- Each needs: `title`, `summary`, `date`, body, and any of
  `whitepaperUrl` / `repoUrl` / `cadUrl`. Empty link fields simply don't render.
- `repoUrl`/`cadUrl` currently point at `github.com/ghurab/PLACEHOLDER-repo-*`.
- `whitepaperUrl` on alpha points at `/assets/placeholder/whitepaper-alpha.pdf`
  — **this file does not exist**; the link 404s until a real PDF is added.

### 2.4 Flagship 3D model
- **File:** `src/projects/2026-05-10-project-bravo.md` → `modelUrl`
- **Need:** a glTF/GLB export. Until set, the viewer area shows an explicit
  "no model yet" note rather than an empty box.
- Spec calls for 2–3 flagship projects; only one is flagged so far.

### 2.5 Team / About
- **File:** `src/pages/about.md` — in-brand stub; team section marked
  `[Team details to be added.]`
- **File:** `src/_data/meta.js` → `author.name` is `'Ghurab'` (team-level).
- **Open spec item (S11):** whether to feature founders by name.

### 2.6 Social / platform links
- **File:** `src/_data/personal.yaml` → `platforms: {}` (empty)
- **File:** `src/_data/meta.js` → `author.fediverse`, `author.me`, `creator.social`
- Footer renders no social row while empty.

### 2.7 Physical address
- **File:** `src/_data/personal.yaml` → `address` = "Ghurab / Dhaka, Bangladesh"
- Generic. Refine if the legal notice needs a real registered address.

---

## 3. BRAND ASSETS STILL MISSING

### 3.1 Vector logo — highest-value asset gap
- **Now:** the mark exists **only** as a 501×229 raster
  (`src/assets/images/brand/ghurab-mark.png`).
- **Consequences today:**
  - The home cold-open animates 24 CSS clip-path shards over the raster
    instead of true vector paths.
  - Favicons are generated by cropping/inverting that raster.
  - There is **no `favicon.svg`** and no SVG `<link>` — wrapping a PNG in an
    `<svg>` would be a vector in name only.
  - The header logo is a PNG, not an inline SVG.
- **Supply an SVG and:** re-add the favicon.svg link in
  `src/_includes/head/meta-info.njk`, switch the header back to the `{% svg %}`
  shortcode, and the cold-open can animate real paths.
- `src/_data/meta.js` → `pathToSvgLogo` still points at
  `src/assets/svg/misc/logo.svg`, which is **the starter's leftover star icon**,
  now unused by the favicon pipeline.

### 3.2 Open Graph share image
- **File:** `src/_data/meta.js` → `opengraph_default`
- **Now:** `/assets/images/template/opengraph-default.jpg` — **the starter's
  stock image**. This is what appears when anyone shares a non-post page.
- Journalists are an explicit audience (S3), so this matters more than usual.
- Blog posts auto-generate their own OG images and are fine.

### 3.3 Author avatar
- **File:** `src/_data/meta.js` → `author.avatar` = `/icon-512x512.png`
- Now the real favicon tile, so acceptable — upgrade if a proper team avatar exists.

---

## 4. COPY THAT IS MINE, NOT YOURS — REVIEW AND REPLACE

I wrote these to spec. They are placeholders in the sense that no one has
approved them.

- **Hero line** — "Intellect governs power" (your instruction; motto translation).
- **Three pillar taglines** — Home.
- **All Services page copy** — `src/pages/services.njk`: three service-line
  descriptions, four cybersecurity sub-cards, capability tags, and the
  "Start a Conversation" CTA. Written from spec S6 only.
- **Contact page copy** — three audience cards + intro.
- **404 copy** — "Signal Lost" / "The crow didn't see this one coming either."
- **Blog index intro** and **Projects index intro**.
- **Accessibility statement** — deliberately says "aims to conform", not
  "conforms". Upgrade only after a real audit (see 5.1).
- **Footer disclosure line** — "This site contains no classified or controlled
  technical data." Spec S8 flags this as your call; currently ON.

---

## 5. VERIFICATION NOT YET DONE

### 5.1 Accessibility audit
- `npm run test:a11y` **could not be run** in my environment (no Chrome
  available). It is wired up and the new pages are in
  `meta.tests.pa11y.customPaths` — **please run it locally.**
- What I *did* verify statically: single `<h1>` per page, no heading-level
  jumps, no duplicate IDs, every form control labelled, contrast ratios
  computed by hand.
- Not verified: keyboard traversal, screen-reader output, focus visibility.

### 5.2 Visual / browser check
- No page has been **visually rendered** — no browser in my environment.
- Roadmap Phase 9 still wants: cross-browser check (**Safari especially**, for
  the cold-open animation), real-device responsive checks, Lighthouse.

### 5.3 Carbon figure
- **File:** `src/pages/sustainability.md` — starter's false "A+ / 0.02g" claim
  removed. Re-measure against the live URL after launch.

---

## 6. REMAINING STARTER LEFTOVERS (low priority)

- `src/pages/styleguide.njk` — internal design-token reference. Publicly
  reachable and in the sitemap. Keep as an internal tool or delete before launch.
- `src/assets/images/screenshots/` — ~32 screenshots of **other people's
  websites** from the starter's "built with" page. That page was deleted; these
  are unused, ship nothing, but bloat the repo. Safe to delete.
- `src/assets/svg/misc/logo.svg` — starter's star icon, now unused.
- `src/assets/images/gallery/asturias-*.jpg` — starter demo photos, used only
  by demo posts.
- Demo blog posts from the starter (gallery/video/markdown/redirects examples)
  were already removed; `redirectFrom` front matter no longer has a consumer
  since `_redirects.njk` was deleted with the Netlify migration.
