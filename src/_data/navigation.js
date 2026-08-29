export default {
  top: [
    {
      text: 'Blog',
      url: '/blog/'
    },
    {
      text: 'Projects',
      url: '/projects/'
    },
    {
      text: 'Services',
      url: '/services/'
    },
    {
      text: 'Contact',
      url: '/contact/'
    }
  ],
  // Ghurab's footer is a single motto + optional disclosure line (spec S8),
  // not a second nav row -- see the rewritten footer.njk. Left empty rather
  // than removed so any page that still loops meta.navigation.bottom (none,
  // currently) doesn't error.
  bottom: []
};
