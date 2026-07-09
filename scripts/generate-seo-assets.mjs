import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const CANONICAL_BASE = 'https://adibuz.com';

function parseDotEnv(contents) {
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

async function loadLocalEnv() {
  const envPath = path.resolve('.env');
  try {
    const contents = await fs.readFile(envPath, 'utf8');
    parseDotEnv(contents);
  } catch {
    // Ignore missing local env files. Vercel build env vars are enough.
  }
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const staticRoutes = [
  { path: '/', lastmod: '2026-05-16', changefreq: 'weekly', priority: '1.00' },
  { path: '/about', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.90' },
  { path: '/work', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.90' },
  { path: '/insights', lastmod: '2026-05-16', changefreq: 'weekly', priority: '0.95' },
  { path: '/contact', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.85' },
  { path: '/assistant', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.10', noindex: true },
  { path: '/privacy-policy', lastmod: '2026-05-16', changefreq: 'yearly', priority: '0.30' },
  { path: '/terms', lastmod: '2026-05-16', changefreq: 'yearly', priority: '0.30' },
  { path: '/cookie-preferences', lastmod: '2026-07-10', changefreq: 'yearly', priority: '0.30' },
  { path: '/services/strategic-marketing', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.85' },
  { path: '/services/social-media', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.85' },
  { path: '/services/automation', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.85' },
  { path: '/services/web-development', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.85' },
  { path: '/services/seo', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.85' },
  { path: '/services/visual-branding', lastmod: '2026-05-16', changefreq: 'monthly', priority: '0.85' },
];

const fallbackInsights = [
  {
    slug: 'ai-powered-marketing-systems',
    title: 'AI-Powered Marketing Systems',
    excerpt: 'How AI-driven workflows improve speed, relevance, and conversion performance.',
    seo_title: null,
    seo_description: null,
    featured_image: `${CANONICAL_BASE}/og-image.png`,
    updated_at: '2026-05-07',
    created_at: '2026-05-07',
  },
  {
    slug: 'why-agency-websites-fail',
    title: 'Why Agency Websites Fail',
    excerpt: 'The common mistakes that keep agency websites from converting visitors into leads.',
    seo_title: null,
    seo_description: null,
    featured_image: `${CANONICAL_BASE}/og-image.png`,
    updated_at: '2026-05-07',
    created_at: '2026-05-07',
  },
  {
    slug: 'future-of-seo-ai-era',
    title: 'Future of SEO in the AI Era',
    excerpt: 'A practical look at how search strategy changes as AI becomes part of discovery.',
    seo_title: null,
    seo_description: null,
    featured_image: `${CANONICAL_BASE}/og-image.png`,
    updated_at: '2026-05-07',
    created_at: '2026-05-07',
  },
  {
    slug: 'automation-changing-digital-marketing',
    title: 'How Automation Is Changing Digital Marketing',
    excerpt: 'Automation patterns that improve consistency, personalization, and efficiency.',
    seo_title: null,
    seo_description: null,
    featured_image: `${CANONICAL_BASE}/og-image.png`,
    updated_at: '2026-05-07',
    created_at: '2026-05-07',
  },
  {
    slug: 'building-premium-brand-identity',
    title: 'Building a Premium Brand Identity',
    excerpt: 'How strong positioning and design create a more credible brand experience.',
    seo_title: null,
    seo_description: null,
    featured_image: `${CANONICAL_BASE}/og-image.png`,
    updated_at: '2026-05-07',
    created_at: '2026-05-07',
  },
  {
    slug: 'scaling-paid-ads-machine-learning',
    title: 'Scaling Paid Ads with Machine Learning',
    excerpt: 'How machine learning can improve campaign targeting and budget efficiency.',
    seo_title: null,
    seo_description: null,
    featured_image: `${CANONICAL_BASE}/og-image.png`,
    updated_at: '2026-05-07',
    created_at: '2026-05-07',
  },
  {
    slug: 'growth-system-framework-saas',
    title: 'Growth System Framework for SaaS',
    excerpt: 'A repeatable framework for turning SaaS traffic into predictable growth.',
    seo_title: null,
    seo_description: null,
    featured_image: `${CANONICAL_BASE}/og-image.png`,
    updated_at: '2026-05-07',
    created_at: '2026-05-07',
  },
  {
    slug: 'digital-strategy-for-agencies',
    title: 'Digital Strategy for Agencies',
    excerpt: 'A clearer operating model for agencies that want better lead quality and scale.',
    seo_title: null,
    seo_description: null,
    featured_image: `${CANONICAL_BASE}/og-image.png`,
    updated_at: '2026-05-07',
    created_at: '2026-05-07',
  },
];

function formatDate(value) {
  if (!value) return '2026-05-16';
  return String(value).slice(0, 10);
}

async function fetchPublishedInsights() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[generate-seo-assets] Supabase env vars not found. Using fallback insight URLs.');
    return fallbackInsights;
  }

  const endpoint =
    `${supabaseUrl}/rest/v1/insights` +
    '?select=slug,title,excerpt,seo_title,seo_description,featured_image,published,created_at,updated_at' +
    '&published=eq.true';

  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase insight fetch failed with ${response.status}`);
  }

  const insights = await response.json();
  return Array.isArray(insights) && insights.length > 0 ? insights : fallbackInsights;
}

function buildSitemapXml(insights) {
  const urlBlocks = [
    ...staticRoutes.map(({ path: routePath, lastmod, changefreq, priority, noindex }) => {
      if (noindex) return '';
      const loc = `${CANONICAL_BASE}${routePath === '/' ? '/' : routePath}`;
      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
        `    <changefreq>${escapeXml(changefreq)}</changefreq>`,
        `    <priority>${escapeXml(priority)}</priority>`,
        '  </url>',
      ].join('\n');
    }),
    ...insights
      .filter((insight) => insight?.slug)
      .map((insight) => {
        const title = insight.seo_title || insight.title || 'Adibuz Insights';
        const description = insight.seo_description || insight.excerpt || title;
        const lastmod = formatDate(insight.updated_at || insight.created_at);

        return [
          '  <url>',
          `    <loc>${escapeXml(`${CANONICAL_BASE}/insights/${insight.slug}`)}</loc>`,
          `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
          '    <changefreq>monthly</changefreq>',
          '    <priority>0.80</priority>',
          '  </url>',
        ].join('\n');
      }),
  ].filter(Boolean);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlBlocks,
    '</urlset>',
    '',
  ].join('\n');
}

function buildRobotsTxt() {
  return [
    '# robots.txt for Adibuz',
    '# Canonical domain: https://adibuz.com',
    '',
    'User-agent: *',
    'Allow: /',
    'Allow: /about',
    'Allow: /work',
    'Allow: /insights',
    'Allow: /insights/',
    'Allow: /privacy-policy',
    'Allow: /terms',
    'Allow: /cookie-preferences',
    'Disallow: /assistant',
    'Disallow: /admin/',
    'Disallow: /admin',
    'Disallow: /dashboard/',
    'Disallow: /dashboard',
    'Disallow: /api/',
    'Disallow: /api',
    'Disallow: /private/',
    'Disallow: /private',
    'Disallow: /tmp/',
    'Disallow: /tmp',
    'Disallow: /test/',
    'Disallow: /test',
    'Disallow: /staging/',
    'Disallow: /staging',
    'Disallow: /draft/',
    'Disallow: /draft',
    'Disallow: /preview/',
    'Disallow: /preview',
    'Disallow: /internal/',
    'Disallow: /internal',
    'Disallow: /debug/',
    'Disallow: /debug',
    'Disallow: /_next/',
    'Disallow: /.well-known/',
    'Disallow: /cdn-cgi/',
    'Disallow: /*?*utm_',
    'Disallow: /*?*ref=',
    'Disallow: /*?*fbclid=',
    'Disallow: /*?*gclid=',
    'Disallow: /*?*sessionid=',
    'Disallow: /*?*token=',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    'Disallow: /assistant',
    '',
    'User-agent: Googlebot-Image',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    'Disallow: /assistant',
    'Crawl-delay: 5',
    '',
    'User-agent: GPTBot',
    'Disallow: /',
    '',
    'User-agent: ChatGPT-User',
    'Disallow: /',
    '',
    'User-agent: CCBot',
    'Disallow: /',
    '',
    'User-agent: anthropic-ai',
    'Disallow: /',
    '',
    'User-agent: Claude-Web',
    'Disallow: /',
    '',
    'User-agent: Omgilibot',
    'Disallow: /',
    '',
    'User-agent: FacebookBot',
    'Disallow: /',
    '',
    'User-agent: AhrefsBot',
    'Disallow: /',
    '',
    'User-agent: SemrushBot',
    'Disallow: /',
    '',
    'User-agent: MJ12bot',
    'Disallow: /',
    '',
    'User-agent: DotBot',
    'Disallow: /',
    '',
    'User-agent: BLEXBot',
    'Disallow: /',
    '',
    'Sitemap: https://adibuz.com/sitemap.xml',
    '',
  ].join('\n');
}

async function main() {
  await loadLocalEnv();
  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  const insights = await fetchPublishedInsights();
  const sitemapXml = buildSitemapXml(insights);
  const robotsTxt = buildRobotsTxt();

  await Promise.all([
    fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8'),
    fs.writeFile(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8'),
  ]);

  console.log(`[generate-seo-assets] Wrote sitemap with ${staticRoutes.filter((route) => !route.noindex).length + insights.length} URLs.`);
}

main().catch((error) => {
  console.error('[generate-seo-assets] Failed:', error);
  process.exit(1);
});
