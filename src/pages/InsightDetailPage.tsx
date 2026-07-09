import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Twitter, Linkedin } from 'lucide-react';
import { useInsightDetail } from '../hooks/useInsights';
import { ReadingProgress } from '../components/insights/ReadingProgress';
import { RelatedInsights } from '../components/insights/RelatedInsights';
import { NewsletterCTA } from '../components/insights/NewsletterCTA';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import CustomCursor from '../components/CustomCursor';
import { ArrowRight } from 'lucide-react';
import { JsonLd, SEO } from '@/components/SEO';
import { InsightArticleHero } from '@/components/insights/InsightArticleHero';
import { InsightArticleRenderer } from '@/components/insights/InsightArticleRenderer';

const SERVICE_LINKS: Record<string, { slug: string, title: string, cta: string }> = {
  'marketing': { slug: 'strategic-marketing', title: 'Strategic Marketing', cta: 'Ready to launch data-driven marketing campaigns?' },
  'social': { slug: 'social-media', title: 'Social Media Management', cta: 'Want to grow your social community?' },
  'automation': { slug: 'automation', title: 'AI Automation', cta: 'Need to automate your business workflows?' },
  'development': { slug: 'web-development', title: 'Web Development', cta: 'Looking for a high-performance website?' },
  'seo': { slug: 'seo', title: 'Robust SEO', cta: 'Ready to dominate search engine rankings?' },
  'design': { slug: 'visual-branding', title: 'Visual Branding', cta: 'Want to elevate your brand identity?' },
  'branding': { slug: 'visual-branding', title: 'Visual Branding', cta: 'Want to elevate your brand identity?' },
};

function getServiceCTA(categoryName?: string) {
  const cat = (categoryName || '').toLowerCase();
  for (const [key, data] of Object.entries(SERVICE_LINKS)) {
    if (cat.includes(key)) return data;
  }
  return { slug: 'strategic-marketing', title: 'Strategic Marketing', cta: 'Ready to scale your business?' }; // default
}

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { insight, related, loading, error } = useInsightDetail(slug || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center pt-24">
        <div className="w-10 h-10 border-4 border-[#3A0F63]/20 border-t-[#3A0F63] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center pt-24 px-4 text-center">
        <h1 className="adibuz-gradient-text text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-slate-600 mb-8">The insight you're looking for doesn't exist or has been removed.</p>
        <Link to="/insights" className="text-[#3A0F63] font-semibold flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(insight.created_at));

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-[#fdfaff] selection:bg-primary selection:text-white relative">
      {/* Background Gradients to match the home page */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 15% 50%, rgba(167, 139, 250, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(109, 40, 217, 0.08) 0%, transparent 50%)`,
        backgroundAttachment: 'fixed'
      }} />

      <CustomCursor />
      <SimpleHeader dark={false} />
      
      <SEO 
        title={`${insight.seo_title || insight.title} | Adibuz Insights`}
        description={insight.seo_description || insight.excerpt}
        ogImage={insight.featured_image}
        ogType="article"
        articlePublishedTime={insight.created_at}
        articleModifiedTime={insight.updated_at}
      />

      <JsonLd
        id={`blog-${insight.slug}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: insight.seo_title || insight.title,
          description: insight.seo_description || insight.excerpt,
          image: insight.featured_image,
          url: `https://adibuz.com/insights/${insight.slug}`,
          datePublished: insight.created_at,
          dateModified: insight.updated_at,
          author: {
            '@type': 'Person',
            name: insight.author_name,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Adibuz',
            logo: {
              '@type': 'ImageObject',
              url: 'https://adibuz.com/adibuz-logo.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://adibuz.com/insights/${insight.slug}`,
          },
          articleSection: insight.category?.name,
          keywords: insight.tags?.join(', '),
        }}
      />

      <div className="relative z-10">
        <ReadingProgress />
        <InsightArticleHero insight={insight} formattedDate={formattedDate} />

        <div className="container-custom max-w-4xl pb-16">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-[28px] border border-[rgba(58,15,99,0.10)] bg-white/84 p-6 shadow-[0_16px_45px_rgba(22,8,43,0.05)] backdrop-blur-xl md:p-8 lg:p-10"
          >
            <InsightArticleRenderer content={insight.content} />

            {insight.tags?.length > 0 && (
              <div className="mt-12 border-t border-[rgba(58,15,99,0.08)] pt-6">
                <div className="flex flex-wrap gap-2">
                  {insight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-[rgba(58,15,99,0.10)] bg-[#f8f3ff] px-3 py-1 text-xs font-bold text-[#5f6f88]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#fcfaff] border border-slate-200/60 rounded-2xl p-6 md:p-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{getServiceCTA(insight.category?.name).cta}</h3>
                <p className="text-slate-500">Discover how our {getServiceCTA(insight.category?.name).title} services can accelerate your growth.</p>
              </div>
              <Link
                to={`/services/${getServiceCTA(insight.category?.name).slug}`}
                className="shrink-0 inline-flex items-center gap-2 bg-[#3A0F63] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2A0A4A] transition-colors shadow-md hover:shadow-lg"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6 lg:hidden">
              <span className="font-semibold text-slate-900 flex items-center gap-2"><Share2 className="w-4 h-4" /> Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(insight.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#1DA1F2] p-2">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(insight.title)}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#0A66C2] p-2">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.article>
        </div>

        <RelatedInsights insights={related} />
        <NewsletterCTA />
        </div>
        
        <React.Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </React.Suspense>
    </div>
  );
}

