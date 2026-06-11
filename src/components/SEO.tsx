import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const CANONICAL_BASE = 'https://www.adibuz.com';
const OG_IMAGE_DEFAULT = 'https://www.adibuz.com/og-image.png';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articlePublishedTime?: string;
  articleModifiedTime?: string;
}

interface JsonLdProps {
  id: string;
  data: Record<string, unknown>;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const existing = Array.from(document.head.querySelectorAll('meta')).find(
    (meta) => meta.getAttribute(attribute) === key,
  );
  const meta = existing ?? document.createElement('meta');
  meta.setAttribute(attribute, key);
  meta.setAttribute('content', content);

  if (!existing) {
    meta.setAttribute('data-adibuz-head', 'true');
    document.head.appendChild(meta);
  }
}

function upsertCanonical(href: string) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const link = existing ?? document.createElement('link');
  link.rel = 'canonical';
  link.href = href;

  if (!existing) {
    link.setAttribute('data-adibuz-head', 'true');
    document.head.appendChild(link);
  }
}

function upsertJsonLd(id: string, json: string) {
  const scriptId = `adibuz-jsonld-${id}`;
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
  const script = existing ?? document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';
  script.textContent = json;

  if (!existing) {
    script.setAttribute('data-adibuz-head', 'true');
    document.head.appendChild(script);
  }
}

function injectPreloadLink(href: string, as: string, type?: string, crossOrigin?: string) {
  const id = `adibuz-preload-${href}`;
  if (document.querySelector(`link[data-preload-id="${id}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.setAttribute('as', as);
  link.setAttribute('data-preload-id', id);
  if (type) link.setAttribute('type', type);
  if (crossOrigin) link.crossOrigin = crossOrigin;
  document.head.appendChild(link);
  return () => { link.parentNode?.removeChild(link); };
}

export function JsonLd({ id, data }: JsonLdProps) {
  const json = useMemo(() => JSON.stringify(data), [data]);

  useEffect(() => {
    upsertJsonLd(id, json);
  }, [id, json]);

  return null;
}

interface PreloadLinkProps {
  href: string;
  as: string;
  type?: string;
  crossOrigin?: string;
}

/** Injects a <link rel="preload"> into <head> and cleans it up on unmount. */
export function PreloadLink({ href, as, type, crossOrigin }: PreloadLinkProps) {
  useEffect(() => {
    const cleanup = injectPreloadLink(href, as, type, crossOrigin);
    return cleanup;
  }, [href, as, type, crossOrigin]);
  return null;
}

export function SEO({
  title = 'Adibuz - Strategic AI & Digital Marketing Agency',
  description = 'Transform your business with Adibuz. We combine artificial intelligence with premium design and data-driven marketing to scale brands globally.',
  canonical,
  ogImage = OG_IMAGE_DEFAULT,
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
}: SEOProps) {
  const { pathname } = useLocation();
  const resolvedCanonical =
    canonical ?? `${CANONICAL_BASE}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
  const siteTitle = title.includes('Adibuz') ? title : `${title} | Adibuz`;

  useEffect(() => {
    document.title = siteTitle;
    upsertMeta('name', 'description', description);
    upsertCanonical(resolvedCanonical);

    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:url', resolvedCanonical);
    upsertMeta('property', 'og:title', siteTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:site_name', 'Adibuz');
    upsertMeta('property', 'og:locale', 'en_US');

    if (ogType === 'article' && articlePublishedTime) {
      upsertMeta('property', 'article:published_time', articlePublishedTime);
    }
    if (ogType === 'article' && articleModifiedTime) {
      upsertMeta('property', 'article:modified_time', articleModifiedTime);
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', '@Adibuz_agency');
    upsertMeta('name', 'twitter:creator', '@Adibuz_agency');
    upsertMeta('name', 'twitter:title', siteTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
  }, [articleModifiedTime, articlePublishedTime, description, ogImage, ogType, resolvedCanonical, siteTitle]);

  return (
    <>
      <JsonLd
        id="organization"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Adibuz',
          url: CANONICAL_BASE,
          logo: 'https://www.adibuz.com/adibuz-logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-93415-86751',
            contactType: 'customer service',
            email: 'hello@adibuz.com',
            availableLanguage: 'en',
          },
          sameAs: ['https://www.instagram.com/adibuz_agency/', 'https://x.com/Adibuz_agency'],
        }}
      />
      <JsonLd
        id="professional-service"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Adibuz',
          image: OG_IMAGE_DEFAULT,
          url: CANONICAL_BASE,
          telephone: '+91-93415-86751',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bhopal',
            addressRegion: 'Madhya Pradesh',
            addressCountry: 'IN',
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        }}
      />
      <JsonLd
        id="website"
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Adibuz',
          url: CANONICAL_BASE,
          description: 'AI-powered digital marketing, SEO, automation, and growth agency based in India.',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${CANONICAL_BASE}/insights?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }}
      />
    </>
  );
}
