import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// Canonical base — always www-prefixed to avoid duplicate content signals
const CANONICAL_BASE = 'https://adibuz.com';
const OG_IMAGE_DEFAULT = 'https://adibuz.com/og-image.png';

interface SEOProps {
  title?: string;
  description?: string;
  /**
   * Override the auto-generated canonical URL.
   * Pass a full URL (https://adibuz.com/page).
   * If omitted, the canonical is derived from the current pathname.
   */
  canonical?: string;
  ogImage?: string;
  /** Set to 'article' for blog post pages */
  ogType?: 'website' | 'article';
  /** ISO 8601 date string — for article published_time */
  articlePublishedTime?: string;
  /** ISO 8601 date string — for article modified_time */
  articleModifiedTime?: string;
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

  // Auto-generate canonical from current path if not explicitly provided.
  // Always strips trailing slash (except root) for consistency.
  const resolvedCanonical =
    canonical ??
    `${CANONICAL_BASE}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;

  const siteTitle = title.includes('Adibuz') ? title : `${title} | Adibuz`;

  return (
    <Helmet>
      {/* ── Basic Metadata ─────────────────────────────── */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* ── Canonical Link ─────────────────────────────── */}
      <link rel="canonical" href={resolvedCanonical} />

      {/* ── Open Graph ─────────────────────────────────── */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:url"         content={resolvedCanonical} />
      <meta property="og:title"       content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name"   content="Adibuz" />
      <meta property="og:locale"      content="en_US" />

      {/* ── Article metadata (blog posts only) ─────────── */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}

      {/* ── Twitter Card ───────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@Adibuz_agency" />
      <meta name="twitter:creator"     content="@Adibuz_agency" />
      <meta name="twitter:title"       content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* ── JSON-LD Structured Data ────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Adibuz",
          "url": CANONICAL_BASE,
          "logo": "https://adibuz.com/adibuz-logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-93415-86751",
            "contactType": "customer service",
            "email": "hello@adibuz.com",
            "availableLanguage": "en"
          },
          "sameAs": [
            "https://www.instagram.com/adibuz_agency/",
            "https://x.com/Adibuz_agency"
          ]
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Adibuz",
          "image": OG_IMAGE_DEFAULT,
          "url": CANONICAL_BASE,
          "telephone": "+91-93415-86751",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "addressCountry": "IN"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          }
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Adibuz",
          "url": CANONICAL_BASE,
          "description": "AI-powered digital marketing, SEO, automation, and growth agency based in India.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${CANONICAL_BASE}/insights?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
}
