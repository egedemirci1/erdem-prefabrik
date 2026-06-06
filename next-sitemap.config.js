/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.SITE_URL || 'https://erdemprefabrik.com';

const routePairs = [
  { tr: '/', en: '/en/' },
  { tr: '/hakkimizda/', en: '/en/about/' },
  { tr: '/iletisim/', en: '/en/contact/' },
  { tr: '/projeler/', en: '/en/projects/' },
  { tr: '/gizlilik/', en: '/en/privacy/' },
  { tr: '/kullanim-kosullari/', en: '/en/terms/' },
  { tr: '/konteyner/', en: '/en/container/' },
  { tr: '/konteyner/ev/', en: '/en/container/home/' },
  { tr: '/konteyner/ofis/', en: '/en/container/office/' },
  { tr: '/konteyner/guvenlik-kulubesi/', en: '/en/container/security-booth/' },
  { tr: '/konteyner/wc-dus-kabini/', en: '/en/container/wc-shower/' },
  { tr: '/moduler/', en: '/en/modular/' },
  { tr: '/moduler/bungalow/', en: '/en/modular/bungalow/' },
  { tr: '/moduler/ofis/', en: '/en/modular/office/' },
  { tr: '/moduler/tiny-house/', en: '/en/modular/tiny-house/' },
  { tr: '/moduler/moduler-ev/', en: '/en/modular/modular-home/' },
  { tr: '/moduler/sifir-atik/', en: '/en/modular/zero-waste/' },
  { tr: '/prefabrik-celik/', en: '/en/prefab-steel/' },
  { tr: '/prefabrik-celik/prefabrik-ev-villa/', en: '/en/prefab-steel/prefab-home-villa/' },
  { tr: '/prefabrik-celik/santiye-ozel-kullanim/', en: '/en/prefab-steel/construction-special/' },
  { tr: '/prefabrik-celik/celik-ev-villa/', en: '/en/prefab-steel/steel-home-villa/' },
  { tr: '/prefabrik-celik/prefabrik-santiye-yapilari/', en: '/en/prefab-steel/construction-buildings/' },
];

module.exports = {
  siteUrl: SITE_URL,
  trailingSlash: true,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  exclude: ['/admin/*', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/' || path === '/en/') {
      priority = 1.0;
    } else if (
      ['/konteyner/', '/moduler/', '/prefabrik-celik/', '/projeler/', '/en/container/', '/en/modular/', '/en/prefab-steel/', '/en/projects/'].includes(path)
    ) {
      priority = 0.9;
    } else if (['/hakkimizda/', '/iletisim/', '/en/about/', '/en/contact/'].includes(path)) {
      priority = 0.8;
    } else if (['/gizlilik/', '/kullanim-kosullari/', '/en/privacy/', '/en/terms/'].includes(path)) {
      priority = 0.4;
      changefreq = 'monthly';
    }

    const pair = routePairs.find((r) => r.tr === path || r.en === path);
    const alternateRefs = pair
      ? [
          { href: `${SITE_URL}${pair.tr}`, hreflang: 'tr' },
          { href: `${SITE_URL}${pair.en}`, hreflang: 'en' },
          { href: `${SITE_URL}${pair.tr}`, hreflang: 'x-default' },
        ]
      : undefined;

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs,
    };
  },
};
