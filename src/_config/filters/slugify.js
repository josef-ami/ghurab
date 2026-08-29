import slugify from 'slugify';

/** Converts string to a slug form. */
export const slugifyString = str => {
  return slugify(str, {
    replacement: '-',
    // Added [ ] — – to the strip set: Ghurab titles routinely use em-dashes
    // (house style, see spec/roadmap docs) and this collection uses bracket
    // placeholders. Without stripping them, slugify left a literal em-dash
    // character sitting in generated URLs (e.g. /blog/foo-—-bar/).
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}[\]—–]/g,
    lower: true
  });
};
