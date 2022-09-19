const i18nRoutes = {
  '/search': [
    { source: '/haku', locale: 'fi' },
    { source: '/sok', locale: 'sv' },
  ],
  '/courses/:eventId': [
    { source: '/kurssit/:eventId', locale: 'fi' },
    { source: '/kurser/:eventId', locale: 'sv' },
  ],
  '/articles': [
    { source: '/artikkelit', locale: 'fi' },
    { source: '/artiklar', locale: 'sv' },
  ],
  '/articles/:slug*': [
    { source: '/artikkelit/:slug*', locale: 'fi' },
    { source: '/artiklar/:slug*', locale: 'sv' },
  ],
  '/pages/:slug*': [
    { source: '/sivut/:slug*', locale: 'fi' },
    { source: '/sidor/:slug*', locale: 'sv' },
  ],
  '/accessibility': [
    { source: '/saavutetavuusseloste', locale: 'fi' },
    { source: '/tillgäntglighetsutlåtande', locale: 'sv' },
  ],
  '/about': [
    { source: '/tietoa', locale: 'fi' },
    { source: '/kunskap', locale: 'sv' },
  ],
};

module.exports = i18nRoutes;
