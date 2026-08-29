/**
 * Favicon + app-icon generator.
 *
 * The upstream starter generated icons from an SVG logo. Ghurab's mark exists
 * only as a raster (src/assets/images/brand/ghurab-mark.png), so this works
 * from that instead. Consequences worth knowing:
 *
 *  - No favicon.svg is produced, and meta-info.njk no longer links one.
 *    Wrapping a PNG in an <svg> would be a vector in name only.
 *  - Source art is near-black on transparent. Left as-is it would be invisible
 *    against dark browser chrome, so the mark is inverted to a light silhouette
 *    on a near-black brand tile, which reads on both light and dark UI.
 *  - The full lockup (crow + jet + warship, 501x229) is unreadable at 16px, so
 *    only the crow head is used. HEAD_BOX is that crop, in source pixels.
 *  - The cyan eye is not baked into the source art -- the site draws it at
 *    render time (see .cold-open__eye in css/local/home.css). It is drawn here
 *    at the same relative position so favicon and hero agree.
 *
 * Run with: npm run favicons
 */

import fs from 'node:fs';
import sharp from 'sharp';
import {sharpsToIco} from 'sharp-ico';

const SRC = 'src/assets/images/brand/ghurab-mark.png';
const OUT = 'src/assets/images/favicon';
const BRAND_OUT = 'src/assets/images/brand/ghurab-head-light.png';

// Crow-head crop from the full lockup, in source pixels.
const HEAD_BOX = {left: 195, top: 0, width: 190, height: 190};

// Eye position, mirroring .cold-open__eye: 57.5% / 21.6% of the full lockup,
// diameter 9% of its width. Expressed in source pixels here.
const LOCKUP_W = 501;
const LOCKUP_H = 229;
const EYE = {x: 0.575 * LOCKUP_W, y: 0.216 * LOCKUP_H, r: (0.09 * LOCKUP_W) / 2};

const TILE = {r: 10, g: 10, b: 10}; // #0a0a0a page background
const INK = 234; // #eaeaea light silhouette
const CYAN = '#3ee6f0';

/**
 * Builds one square icon.
 * @param {number} size     output edge length in px
 * @param {number} pad      fraction of `size` reserved as margin on each edge
 * @param {boolean} tiled   true for a filled brand tile, false for transparency
 * @param {number} eyeScale shrink factor for the eye, for optical balance
 */
async function buildIcon(size, pad, tiled = true, eyeScale = 0.8) {
  const inner = Math.round(size * (1 - 2 * pad));
  const offset = Math.round(size * pad);

  // Take the alpha channel of the cropped head and use it as a stencil: the
  // artwork becomes flat light ink, and the transparent seams between facets
  // stay open so the tile shows through as facet lines.
  const mask = await sharp(SRC)
    .extract(HEAD_BOX)
    .resize(inner, inner)
    .ensureAlpha()
    .extractChannel('alpha')
    .toBuffer();

  const silhouette = await sharp({
    create: {width: inner, height: inner, channels: 3, background: {r: INK, g: INK, b: INK}}
  })
    .joinChannel(mask)
    .png()
    .toBuffer();

  const scale = inner / HEAD_BOX.width;
  const ex = offset + (EYE.x - HEAD_BOX.left) * scale;
  const ey = offset + (EYE.y - HEAD_BOX.top) * (inner / HEAD_BOX.height);
  const er = EYE.r * scale * eyeScale;
  const eye = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <circle cx="${ex}" cy="${ey}" r="${er}" fill="${CYAN}"/>
     </svg>`
  );

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: tiled ? {...TILE, alpha: 1} : {r: 0, g: 0, b: 0, alpha: 0}
    }
  })
    .composite([
      {input: silhouette, left: offset, top: offset},
      {input: eye, left: 0, top: 0}
    ])
    .png()
    .toBuffer();
}

async function createFavicons() {
  fs.mkdirSync(OUT, {recursive: true});

  fs.writeFileSync(`${OUT}/icon-512x512.png`, await buildIcon(512, 0.1));
  fs.writeFileSync(`${OUT}/icon-192x192.png`, await buildIcon(192, 0.1));
  fs.writeFileSync(`${OUT}/apple-touch-icon.png`, await buildIcon(180, 0.1));

  // Maskable icons get cropped to a circle/squircle by the OS, so the mark has
  // to sit inside a safe zone -- hence the heavier padding.
  fs.writeFileSync(`${OUT}/maskable-icon.png`, await buildIcon(512, 0.2));

  await sharpsToIco([sharp(await buildIcon(64, 0.08))], `${OUT}/favicon.ico`, {
    sizes: [16, 32, 48]
  });

  // Transparent, light-on-nothing version used as the header lockup mark.
  fs.writeFileSync(BRAND_OUT, await buildIcon(256, 0.02, false));

  console.log('Favicons + header mark generated from', SRC);
}

createFavicons();
