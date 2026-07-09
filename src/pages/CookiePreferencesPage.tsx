import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { SEO } from '@/components/SEO';
import { FadeInUp } from '@/lib/animations';
import { Globe, Shield, Settings, Mail, RefreshCw, Eye, Lock } from 'lucide-react';

const EFFECTIVE_DATE = 'July 9, 2026';
const CONTACT_EMAIL = 'hello@adibuz.com';
const SITE_URL = 'https://adibuz.com';

const Section = memo(({ id, icon: Icon, title, children }: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) => (
  <FadeInUp>
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-sm p-6 md:p-10 shadow-sm"
      aria-labelledby={`${id}-heading`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden="true">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 id={`${id}-heading`} className="adibuz-gradient-text text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h2>
      </div>
      <div className="prose-custom">{children}</div>
    </section>
  </FadeInUp>
));
Section.displayName = 'Section';

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-600 leading-[1.8] text-[15px] md:text-base mb-4 last:mb-0">{children}</p>
);

const Ul = ({ items }: { items: string[] }) => (
  <ul className="mt-3 mb-4 space-y-2" role="list">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-slate-600 text-[15px] md:text-base leading-relaxed">
        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />
        {item}
      </li>
    ))}
  </ul>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base md:text-lg font-semibold text-slate-800 mt-6 mb-2">{children}</h3>
);

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'cookie-types', label: 'Cookie Types' },
  { id: 'how-used', label: 'How We Use Cookies' },
  { id: 'manage', label: 'Manage Your Choices' },
  { id: 'third-party', label: 'Third-Party Cookies' },
  { id: 'updates', label: 'Updates' },
  { id: 'contact', label: 'Contact Us' },
];

const CookiePreferencesPage = () => (
  <div className="min-h-screen bg-[#fdfaff] selection:bg-primary selection:text-white">
    <SEO
      title="Cookie Preferences | Adibuz"
      description="Review how Adibuz uses essential, analytics, and marketing cookies, and manage your cookie preferences."
      canonical={`${SITE_URL}/cookie-preferences`}
    />
    <SimpleHeader />

    <header className="relative overflow-hidden pt-32 pb-16 md:pb-24 text-center px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-[12px] font-semibold text-primary uppercase tracking-widest mb-6">
          <Settings className="w-3.5 h-3.5" aria-hidden="true" /> Privacy Controls
        </div>
        <h1 className="adibuz-gradient-text text-4xl md:text-6xl font-[900] tracking-tight leading-[1.05] mb-5">
          Cookie Preferences
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-6">
          Here is how Adibuz uses cookies on adibuz.com and how you can manage them in a way that keeps the site usable, measurable, and secure.
        </p>
        <p className="text-sm text-slate-400 font-medium">
          Effective Date: <strong className="text-slate-600">{EFFECTIVE_DATE}</strong>
          {' · '}Last Updated: <strong className="text-slate-600">{EFFECTIVE_DATE}</strong>
        </p>
      </div>
    </header>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <aside className="lg:w-64 flex-shrink-0" aria-label="Table of contents">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm p-5 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">On This Page</p>
            <nav aria-label="Cookie preferences sections">
              <ul className="space-y-1" role="list">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-[13px] text-slate-500 hover:text-primary font-medium py-1 px-2 rounded-lg hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0 space-y-6" aria-label="Cookie preferences content">
          <Section id="overview" icon={Shield} title="Overview">
            <P>Adibuz uses cookies to keep the website functional, understand traffic, and support relevant marketing measurement. We keep the categories simple so users can make a clear choice without unnecessary noise.</P>
            <P>Your preferences apply across the site and can be changed again whenever you need to.</P>
          </Section>

          <Section id="cookie-types" icon={Eye} title="Cookie Types We Use">
            <H3>Essential Cookies</H3>
            <P>These cookies are required for the site to work properly. They support core functions such as navigation, security, and remembering your cookie settings.</P>
            <H3>Analytics Cookies</H3>
            <P>These cookies help us understand which pages are used, how visitors move through the site, and where the experience can be improved. The data is used in aggregate to guide performance decisions.</P>
            <H3>Marketing Cookies</H3>
            <P>These cookies help us measure campaign performance and show relevant ads on platforms such as Google, Meta, and LinkedIn. They support conversion tracking and remarketing where enabled.</P>
          </Section>

          <Section id="how-used" icon={Globe} title="How We Use Cookies">
            <P>We use cookie data to:</P>
            <Ul items={[
              'Keep the site secure and stable',
              'Measure traffic and page performance',
              'Understand which content and services are most useful',
              'Improve marketing relevance and reporting',
              'Remember your preferences across visits',
            ]} />
            <P>We do not use cookies to collect more data than is needed for those purposes.</P>
          </Section>

          <Section id="manage" icon={Settings} title="Manage Your Choices">
            <P>You can manage cookies in three ways:</P>
            <Ul items={[
              'Use the cookie preferences control available in the footer',
              'Adjust browser settings to block or delete cookies',
              'Clear site data if you want to reset your preferences',
            ]} />
            <P>Blocking essential cookies may affect how parts of the website function.</P>
          </Section>

          <Section id="third-party" icon={Lock} title="Third-Party Cookies">
            <P>Some cookies may be set by trusted third parties that help us operate and measure the website. These may include analytics, advertising, hosting, and media delivery providers.</P>
            <P>Each third party has its own privacy and cookie policy. If you want to review the broader data practices behind Adibuz, also see our <Link to="/privacy-policy" className="text-primary font-medium hover:underline">Privacy Policy</Link>.</P>
          </Section>

          <Section id="updates" icon={RefreshCw} title="Updates">
            <P>We may update this page if our tools, tracking methods, or legal obligations change. When that happens, we will update the date shown above and keep the wording aligned with the live site.</P>
          </Section>

          <Section id="contact" icon={Mail} title="Contact Us">
            <P>If you have questions about cookie usage or how your preferences work, contact us directly:</P>
            <div className="mt-4 rounded-xl bg-primary/5 border border-primary/10 p-5 space-y-2">
              <p className="font-bold text-slate-800 text-base">Adibuz Digital Agency</p>
              <p className="text-slate-600 text-[15px]">Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a></p>
              <p className="text-slate-600 text-[15px]">Website: <a href={SITE_URL} className="text-primary font-medium hover:underline" target="_blank" rel="noopener noreferrer">{SITE_URL}</a></p>
            </div>
          </Section>

          <div className="text-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-75 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>

    <Footer />
  </div>
);

export default CookiePreferencesPage;
