/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://erdemprefabrik.com',
  trailingSlash: true,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
    } else if (['/konteyner/', '/moduler/', '/prefabrik-celik/', '/projeler/'].includes(path)) {
      priority = 0.9;
    } else if (['/hakkimizda/', '/iletisim/'].includes(path)) {
      priority = 0.8;
    } else if (['/gizlilik/', '/kullanim-kosullari/'].includes(path)) {
      priority = 0.4;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
}
