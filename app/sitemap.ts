import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tahirsalami.com';
  const routes = [
    '/ar','/en','/fr',
    '/ar/music','/en/music','/fr/music',
    '/ar/epk','/en/epk','/fr/epk',
    '/ar/contact','/en/contact','/fr/contact'
  ];
  const tracks = ["enty-denia", "galbi-khtarek"];
  const locales = ['ar','en','fr'];
  const trackRoutes = locales.flatMap(l => tracks.map(s => `/${l}/music/${s}`));
  const all = [...routes, ...trackRoutes];
  const now = new Date().toISOString();
  return all.map((p) => ({ url: base + p, lastModified: now, changeFrequency: 'weekly', priority: p==='/ar'||p==='/en'||p==='/fr'?1:0.7 }));
}
