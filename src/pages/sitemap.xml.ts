import { getCollection } from 'astro:content';

const SITE = 'https://ohrkawk-ojs.github.io';

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getCollection('posts');
  const urls = [
    { loc: `${SITE}/`, priority: '1.0' },
    { loc: `${SITE}/about/`, priority: '0.7' },
    ...posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        loc: `${SITE}/posts/${post.id}/`,
        lastmod: post.data.date.toISOString().slice(0, 10),
        priority: '0.8',
      })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${xmlEscape(url.loc)}</loc>${'lastmod' in url ? `
    <lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>daily</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
