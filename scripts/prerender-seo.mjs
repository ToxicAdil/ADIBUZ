import fs from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const CANONICAL_BASE = 'https://adibuz.com';
const DEFAULT_OG_IMAGE = `${CANONICAL_BASE}/og-image.png`;

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
    // Ignore missing .env files. Vercel build env vars are enough.
  }
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function upsertMetaTag(html, attribute, key, content) {
  const escapedContent = escapeAttr(content);
  const regex = new RegExp(`<meta\\s+${attribute}=["']${key}["'][^>]*content=["'][^"']*["'][^>]*>`, 'i');
  const alternateRegex = new RegExp(`<meta\\s+content=["'][^"']*["'][^>]*${attribute}=["']${key}["'][^>]*>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapedContent}" />`;

  if (regex.test(html)) return html.replace(regex, tag);
  if (alternateRegex.test(html)) return html.replace(alternateRegex, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function upsertLinkCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeAttr(href)}" />`;
  const regex = /<link\s+rel=["']canonical["'][^>]*href=["'][^"']*["'][^>]*\/?>/i;
  if (regex.test(html)) return html.replace(regex, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function upsertTitle(html, title) {
  const tag = `<title>${escapeAttr(title)}</title>`;
  if (/<title>.*?<\/title>/is.test(html)) {
    return html.replace(/<title>.*?<\/title>/is, tag);
  }
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function upsertRobots(html, robots) {
  if (!robots) return html;
  return upsertMetaTag(html, 'name', 'robots', robots);
}

function withSeoTags(template, meta) {
  const canonical = meta.canonical ?? `${CANONICAL_BASE}${meta.path === '/' ? '/' : meta.path}`;
  const ogImage = meta.ogImage ?? DEFAULT_OG_IMAGE;
  const ogType = meta.ogType ?? 'website';

  let html = template;
  html = upsertTitle(html, meta.title);
  html = upsertMetaTag(html, 'name', 'description', meta.description);
  html = upsertLinkCanonical(html, canonical);
  html = upsertMetaTag(html, 'property', 'og:type', ogType);
  html = upsertMetaTag(html, 'property', 'og:url', canonical);
  html = upsertMetaTag(html, 'property', 'og:title', meta.title);
  html = upsertMetaTag(html, 'property', 'og:description', meta.description);
  html = upsertMetaTag(html, 'property', 'og:image', ogImage);
  html = upsertMetaTag(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMetaTag(html, 'name', 'twitter:url', canonical);
  html = upsertMetaTag(html, 'name', 'twitter:title', meta.title);
  html = upsertMetaTag(html, 'name', 'twitter:description', meta.description);
  html = upsertMetaTag(html, 'name', 'twitter:image', ogImage);
  html = upsertRobots(html, meta.robots);
  return html;
}

function outputFileForRoute(routePath) {
  if (routePath === '/') return TEMPLATE_PATH;
  const relativePath = routePath.replace(/^\//, '');
  return path.join(DIST_DIR, relativePath, 'index.html');
}

async function writeRouteHtml(template, meta) {
  const outputPath = outputFileForRoute(meta.path);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, withSeoTags(template, meta), 'utf8');
}

const staticRouteMeta = [
  {
    path: '/',
    title: 'Adibuz - Strategic AI & Digital Marketing Agency',
    description:
      'Transform your business with Adibuz. We combine artificial intelligence with premium design and data-driven marketing to scale brands globally.',
  },
  {
    path: '/about',
    title: 'About Adibuz | Our Mission & Team',
    description:
      'Learn about the team behind Adibuz. We are a premium digital marketing agency focused on strategic AI automation, creative design, and data-driven growth.',
  },
  {
    path: '/work',
    title: 'Our Work & Case Studies | Adibuz',
    description:
      'Explore performance-focused case studies, website samples, and digital growth systems built by Adibuz.',
  },
  {
    path: '/insights',
    title: 'Insights & Strategies | Adibuz',
    description:
      'Premium insights on AI marketing, SEO, web development, automation, and digital growth systems from the Adibuz team.',
  },
  {
    path: '/contact',
    title: 'Contact Our Digital Marketing Agency | Adibuz',
    description:
      'Get in touch with Adibuz to scale your business with data-driven AI marketing, web development, and SEO. Response within 24 hours.',
  },
  {
    path: '/assistant',
    title: "Adibuz AI Assistant | Let's Talk Strategy",
    description:
      'Interact with the Adibuz AI Assistant to find the right digital marketing and automation solutions for your business.',
    robots: 'noindex, nofollow',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Adibuz',
    description:
      'Learn how Adibuz collects, uses, and protects your personal data. We are committed to transparency, privacy, and GDPR/CCPA compliance.',
  },
  {
    path: '/terms',
    title: 'Terms of Use | Adibuz',
    description:
      'Read the Terms of Use for Adibuz - an AI-powered digital marketing agency. Understand our service terms, client responsibilities, IP rights, and legal policies.',
  },
];

const serviceRouteMeta = [
  {
    path: '/services/strategic-marketing',
    title: 'Professional Strategic Marketing & Advertising Services | Adibuz',
    description:
      'Ready to scale your brand with data-driven advertising? We craft high-performing campaigns across platforms that maximize ROI and drive consistent growth.',
  },
  {
    path: '/services/social-media',
    title: 'Expert Social Media Management & Growth Services | Adibuz',
    description:
      'Build a strong online presence with high-performing social media strategies that engage your audience and drive real business growth.',
  },
  {
    path: '/services/automation',
    title: 'AI Workflow Automation & Business Efficiency Solutions | Adibuz',
    description:
      'Automate repetitive tasks, streamline workflows, and scale your operations efficiently while focusing on what truly matters.',
  },
  {
    path: '/services/web-development',
    title: 'High-Performance Website Development & Web Design | Adibuz',
    description:
      'Build fast, scalable, and high-converting websites that deliver seamless user experiences and drive real business growth.',
  },
  {
    path: '/services/seo',
    title: 'Advanced Search Engine Optimization (SEO) Agency Services | Adibuz',
    description:
      'Elevate your online presence with data-driven SEO strategies, optimized content, and scalable workflows that drive long-term organic growth.',
  },
  {
    path: '/services/visual-branding',
    title: 'Premium Visual Branding & Brand Identity Design | Adibuz',
    description:
      'We craft visually stunning designs that connect with your audience, elevate your brand identity, and drive meaningful engagement.',
  },
];

async function fetchInsightRouteMeta() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[prerender-seo] Supabase env vars not found. Skipping insight detail prerender.');
    return [];
  }

  const endpoint =
    `${supabaseUrl}/rest/v1/insights` +
    '?select=slug,title,excerpt,seo_title,seo_description,featured_image,published' +
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
  return insights.map((insight) => ({
    path: `/insights/${insight.slug}`,
    title: `${insight.seo_title || insight.title} | Adibuz Insights`,
    description: insight.seo_description || insight.excerpt,
    ogImage: insight.featured_image || DEFAULT_OG_IMAGE,
    ogType: 'article',
  }));
}

async function main() {
  await loadLocalEnv();
  const template = await fs.readFile(TEMPLATE_PATH, 'utf8');

  const routes = [...staticRouteMeta, ...serviceRouteMeta];
  for (const meta of routes) {
    await writeRouteHtml(template, {
      ...meta,
      canonical: `${CANONICAL_BASE}${meta.path === '/' ? '/' : meta.path}`,
    });
  }

  try {
    const insightRoutes = await fetchInsightRouteMeta();
    for (const meta of insightRoutes) {
      await writeRouteHtml(template, {
        ...meta,
        canonical: `${CANONICAL_BASE}${meta.path}`,
      });
    }
    console.log(`[prerender-seo] Wrote ${routes.length + insightRoutes.length} route HTML files.`);
  } catch (error) {
    console.warn(`[prerender-seo] Insight detail prerender skipped: ${error.message}`);
    console.log(`[prerender-seo] Wrote ${routes.length} static route HTML files.`);
  }
}

main().catch((error) => {
  console.error('[prerender-seo] Failed:', error);
  process.exit(1);
});
