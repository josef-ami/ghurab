export const url = process.env.URL || 'http://localhost:8080';
// Extract domain from `url`
export const domain = new URL(url).hostname;
export const siteName = 'Ghurab';
// Present-tense claims describe the competition team; long-term ambitions
// ("autonomous systems") stay framed as trajectory, per spec S2.
export const siteDescription =
  'Ghurab is a robotics, hackathon, and CTF competition team building toward autonomous systems, industrial robotics, and cybersecurity.';
export const siteType = 'Organization'; // schema -- Ghurab is a team/brand, not a person
// Stored in title case; the Home hero uppercases it via CSS (.hero-motto),
// the footer renders it as-is.
export const motto = 'Mens Agitat Molem';
export const mottoTranslation = 'Intellect governs power';
// Form backend: Web3Forms (https://web3forms.com).
// GitHub Pages serves static files only and runs no server, so every form must
// POST to a third-party endpoint. Web3Forms uses an "access key" (a UUID)
// rather than a per-form URL: all forms post to the same endpoint and identify
// themselves by this key.
//
// The access key is NOT a secret. It only authorises delivery to the email
// address that registered it, and it is designed to ship in the public HTML of
// static sites. Safe to commit to a public repo.
//
// TODO: paste the access key Web3Forms emails you. While this is empty, the
// sponsor form renders visibly disabled instead of silently swallowing
// submissions.
export const web3formsKey = '7370fa3e-1a45-402e-babb-d16831304d53';
export const web3formsEndpoint = 'https://api.web3forms.com/submit';

export const locale = 'en_EN';
export const lang = 'en';
export const skipContent = 'Skip to content';
// for the site content author, used in <head> meta and post h-card microformat
// TODO (spec open item): founder/team names, whether to feature by name -- placeholder
// left at team level ("Ghurab") until that call is made. Do not fill with fictional names.
export const author = {
  name: 'Ghurab',
  avatar: '/icon-512x512.png', // placeholder until the real mark/favicon set exists
  fediverse: '', // no team social presence yet
  me: []
};
// for the site developer, used for footer credits and humans.txt info
export const creator = {
  name: 'Ghurab',
  email: '', // TODO: set once a contact address exists
  website: url,
  social: ''
};
export const pathToSvgLogo = 'src/assets/svg/misc/logo.svg'; // placeholder mark -- swap for the real crow/jet/warship SVG (spec S1) when ready
export const themeColor = '#3ee6f0'; // cyan accent -- manifest/PWA primary color
export const themeLight = '#0a0a0a'; // Ghurab is single-theme (near-black); both light/dark meta values point at the same surface
export const themeDark = '#0a0a0a';
export const opengraph_default = '/assets/images/template/opengraph-default.jpg'; // TODO: replace with a real Ghurab OG image once the mark/hero art exists
export const opengraph_default_alt = 'Ghurab -- robotics, autonomous systems, and cybersecurity.';
export const blog = {
  // RSS feed
  name: 'Ghurab / Build Log',
  description: 'Technical progress logs and competitive-experience writeups from the Ghurab team.',
  // feed links are looped over in the head. You may add more to the array.
  feedLinks: [
    {
      title: 'Atom Feed',
      url: '/feed.xml',
      type: 'application/atom+xml'
    },
    {
      title: 'JSON Feed',
      url: '/feed.json',
      type: 'application/json'
    }
  ],
  // Tags
  tagSingle: 'Tag',
  tagPlural: 'Tags',
  tagMore: 'More tags:',
  // pagination
  paginationLabel: 'Blog',
  paginationPage: 'Page',
  paginationPrevious: 'Previous',
  paginationNext: 'Next',
  paginationNumbers: true
};
export const projects = {
  paginationLabel: 'Projects',
  paginationPage: 'Page',
  paginationPrevious: 'Previous',
  paginationNext: 'Next',
  paginationNumbers: true
};
export const details = {
  aria: 'section controls',
  expand: 'expand all',
  collapse: 'collapse all'
};
export const dialog = {
  close: 'Close',
  next: 'Next',
  previous: 'Previous'
};
export const navigation = {
  navLabel: 'Menu',
  ariaTop: 'Main',
  ariaBottom: 'Complementary',
  ariaPlatforms: 'Platforms',
  drawerNav: false,
  subMenu: false
};
export const themeSwitch = {
  title: 'Theme',
  light: 'light',
  dark: 'dark'
};
export const greenweb = {
  // https://carbontxt.org/
  disclosures: [
    {
      docType: 'sustainability-page',
      url: `${url}/sustainability/`,
      domain: domain
    }
  ],
  services: [{domain: 'github.com', serviceType: 'cdn'}]
};
export const tests = {
  pa11y: {
    // keep customPaths empty if you want to test all pages
    customPaths: ['/', '/about/', '/blog/', '/projects/', '/services/', '/contact/', '/404.html'],
    globalIgnore: []
  }
};
// "View this page on GitHub" link under each post. Disabled: it builds its URL
// from package.json's `repository`, which still pointed at the upstream starter
// repo -- so every post linked visitors to someone else's project. Set allow to
// true once package.json `repository` names the real Ghurab repo, and add a
// `githubEdit` string (the partial reads meta[page.lang].blog.githubEdit, which
// is currently undefined and renders as an empty label).
export const viewRepo = {
  allow: false,
  infoText: 'View this page on GitHub'
};
export const easteregg = true;
