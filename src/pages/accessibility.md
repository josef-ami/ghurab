---
title: 'Accessibility Statement'
description: 'Ghurab’s commitment to digital accessibility and how to report barriers.'
date: "Last Modified"
permalink: /accessibility/index.html
layout: page
---

<!-- Rewritten from the starter's version, which was in first-person voice,
     claimed conformance on behalf of "Eleventy Excellent" rather than this
     site, and linked to /get-started/ — a starter docs page that was deleted,
     so the link 404'd.

     Deliberately claims "aims to conform" rather than "conforms": no full
     audit has been run against this build yet. Upgrade the wording once
     `npm run test:a11y` passes across every page and a manual keyboard and
     screen-reader pass is done. -->

Accessibility is about removing barriers so everyone can use this site. We treat
it as a build requirement, not a finishing touch.

## Conformance status

This site **aims to conform** with
[WCAG 2.1 Level AA](https://www.w3.org/WAI/standards-guidelines/wcag/). A full
audit has not yet been completed, so we do not claim conformance.

Known work in progress:

- Automated checks run against the main pages; full-site coverage is not yet complete.
- A manual keyboard and screen-reader pass is still outstanding.

## Testing

Automated tests use [pa11y-ci](https://github.com/pa11y/pa11y-ci), run with
`npm run test:a11y`.

The site is single-theme by design (near-black background, cyan accent) and
respects `prefers-reduced-motion`: the home page cold-open animation resolves
immediately rather than playing out for visitors who ask for reduced motion.

## Feedback

If you hit a barrier on this site, tell us — it's treated as a bug. Reach us via
the [contact page](/contact/).
