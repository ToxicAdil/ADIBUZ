import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { SEO } from '@/components/SEO';
import { FadeInUp } from '@/lib/animations';
import { Shield, Lock, Eye, Users, Mail, Globe, Bell, RefreshCw } from 'lucide-react';

const EFFECTIVE_DATE = 'May 15, 2026';
const CONTACT_EMAIL = 'hello@adibuz.com';
const SITE_URL = 'https://adibuz.com';

// ─── Section wrapper ──────────────────────────────────────────────────────────
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

// ─── Table of Contents ────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'information-collected', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Information' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'third-party', label: 'Analytics & Third Parties' },
  { id: 'security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'international', label: 'International Transfers' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'marketing', label: 'Marketing Communications' },
  { id: 'ai-transparency', label: 'AI & Automation' },
  { id: 'gdpr-ccpa', label: 'GDPR / CCPA Rights' },
  { id: 'updates', label: 'Policy Updates' },
  { id: 'contact', label: 'Contact Us' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-[#fdfaff] selection:bg-primary selection:text-white">
    <SEO
      title="Privacy Policy | Adibuz"
      description="Learn how Adibuz collects, uses, and protects your personal data. We are committed to transparency, privacy, and GDPR/CCPA compliance."
      canonical={`${SITE_URL}/privacy-policy`}
    />
    <SimpleHeader />

    {/* ── Hero ── */}
    <header className="relative overflow-hidden pt-32 pb-16 md:pb-24 text-center px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.10), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-[12px] font-semibold text-primary uppercase tracking-widest mb-6">
          <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Legal
        </div>
        <h1 className="adibuz-gradient-text text-4xl md:text-6xl font-[900] tracking-tight leading-[1.05] mb-5">
          Privacy Policy
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto mb-6">
          We believe privacy is a right, not a checkbox. Here's exactly how we handle your data — in plain English.
        </p>
        <p className="text-sm text-slate-400 font-medium">
          Effective Date: <strong className="text-slate-600">{EFFECTIVE_DATE}</strong>
          {' · '}Last Updated: <strong className="text-slate-600">{EFFECTIVE_DATE}</strong>
        </p>
      </div>
    </header>

    {/* ── Layout ── */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* ── Sticky TOC ── */}
        <aside className="lg:w-64 flex-shrink-0" aria-label="Table of contents">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm p-5 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">On This Page</p>
            <nav aria-label="Privacy policy sections">
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

        {/* ── Content ── */}
        <main className="flex-1 min-w-0 space-y-6" id="privacy-content" aria-label="Privacy policy content">

          {/* Who We Are */}
          <Section id="who-we-are" icon={Users} title="Who We Are">
            <P>Adibuz is an AI-powered digital marketing and branding agency based in India, serving clients globally. We help businesses grow through SEO, web development, AI automation, performance marketing, content strategy, social media marketing, lead generation, and data analytics.</P>
            <P>This Privacy Policy applies to all information collected through our website (<a href={SITE_URL} className="text-primary font-medium hover:underline" target="_blank" rel="noopener noreferrer">adibuz.com</a>), our services, client communications, marketing tools, and any related platforms.</P>
            <P>For privacy inquiries, you can always reach us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a>.</P>
          </Section>

          {/* Information We Collect */}
          <Section id="information-collected" icon={Eye} title="Information We Collect">
            <H3>Information You Provide Directly</H3>
            <Ul items={[
              'Name and email address when you contact us or submit a form',
              'Business name, phone number, and project details via consultation requests',
              'Email address when you subscribe to our newsletter',
              'Messages and attachments you send us via email or chat',
            ]} />
            <H3>Information Collected Automatically</H3>
            <Ul items={[
              'IP address, browser type, device type, and operating system',
              'Pages visited, time spent on pages, and navigation paths',
              'Referring URLs and search terms used to find us',
              'Cookie identifiers and session data',
              'Approximate geographic location (country/city level)',
            ]} />
            <H3>Information from Third Parties</H3>
            <Ul items={[
              'Analytics data from Google Analytics and similar tools',
              'Social media interaction data if you engage with our profiles',
              'CRM data from tools we use to manage client relationships',
            ]} />
          </Section>

          {/* How We Use */}
          <Section id="how-we-use" icon={RefreshCw} title="How We Use Information">
            <P>We use the information we collect to:</P>
            <Ul items={[
              'Respond to your inquiries and provide services',
              'Send service updates, project communications, and proposals',
              'Send marketing emails and newsletters (only with your consent)',
              'Improve our website, services, and user experience',
              'Analyse website traffic and user behaviour using aggregated, anonymised data',
              'Comply with legal obligations and enforce our agreements',
              'Prevent fraud, abuse, and security threats',
              'Personalise content and recommendations',
            ]} />
            <P>We rely on the following lawful bases under GDPR: <strong>Consent</strong> (for marketing), <strong>Legitimate Interests</strong> (for analytics and service improvement), and <strong>Contract Performance</strong> (for delivering services to clients).</P>
          </Section>

          {/* Cookies */}
          <Section id="cookies" icon={Globe} title="Cookies & Tracking Technologies">
            <P>We use cookies and similar tracking technologies to enhance your experience on our website. Here is a breakdown:</P>
            <H3>Essential Cookies</H3>
            <P>These are required for the website to function and cannot be disabled. They include session management and security tokens.</P>
            <H3>Analytics Cookies</H3>
            <P>We use Google Analytics (and similar tools) to understand how visitors interact with our website. These cookies collect anonymised usage data such as page views, time on site, and navigation paths. No personally identifiable information is collected through these cookies.</P>
            <H3>Marketing & Retargeting Cookies</H3>
            <P>If you interact with our ads on Google, Meta (Facebook/Instagram), or LinkedIn, those platforms may set cookies to measure ad performance and serve relevant ads. We do not control these third-party cookies directly.</P>
            <H3>Your Cookie Choices</H3>
            <P>You can manage or disable cookies through your browser settings at any time. Disabling cookies may affect some functionality of the website. You can also opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Google Analytics Opt-out Browser Add-on</a>.</P>
          </Section>

          {/* Third Party */}
          <Section id="third-party" icon={Globe} title="Analytics & Third-Party Services">
            <P>We use the following third-party services that may collect or process data on our behalf:</P>
            <Ul items={[
              'Google Analytics — website traffic analysis',
              'Google Search Console — SEO and search performance monitoring',
              'Meta Pixel — ad conversion tracking (if applicable)',
              'LinkedIn Insight Tag — professional audience analytics',
              'Cloudinary — media hosting and delivery',
              'Supabase — secure backend database for blog content',
              'Vercel — website hosting and CDN delivery',
              'Email service providers — for transactional and marketing emails',
              'CRM tools — for managing client relationships and projects',
            ]} />
            <P>These third parties have their own privacy policies and we encourage you to review them. We do not sell your data to any third party.</P>
          </Section>

          {/* Security */}
          <Section id="security" icon={Lock} title="Data Security">
            <P>We take the security of your personal data seriously. We implement the following measures:</P>
            <Ul items={[
              'HTTPS encryption across our entire website',
              'Secure, access-controlled database storage via Supabase with Row Level Security (RLS)',
              'Limited data access — only authorised team members can access client data',
              'Regular security audits and best-practice code reviews',
              'No storage of sensitive payment details on our servers',
            ]} />
            <P>While we implement strong security practices, no system is 100% immune to breaches. In the unlikely event of a data breach affecting your rights, we will notify you as required by applicable law.</P>
          </Section>

          {/* Your Rights */}
          <Section id="your-rights" icon={Shield} title="Your Rights">
            <P>You have the following rights regarding your personal data:</P>
            <Ul items={[
              'Right to Access — request a copy of the data we hold about you',
              'Right to Rectification — correct inaccurate or incomplete data',
              'Right to Erasure — request deletion of your data ("right to be forgotten")',
              'Right to Restriction — limit how we process your data',
              'Right to Portability — receive your data in a portable format',
              'Right to Object — object to processing based on legitimate interests',
              'Right to Withdraw Consent — at any time, for marketing communications',
            ]} />
            <P>To exercise any of these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a>. We will respond within 30 days.</P>
          </Section>

          {/* Data Retention */}
          <Section id="data-retention" icon={RefreshCw} title="Data Retention">
            <P>We retain personal data only for as long as necessary to fulfil the purposes described in this policy:</P>
            <Ul items={[
              'Contact form submissions — retained for up to 12 months or until resolved',
              'Client project data — retained for the duration of the engagement plus 3 years',
              'Newsletter subscribers — until you unsubscribe',
              'Analytics data — typically 26 months (Google Analytics default)',
              'Legal and financial records — as required by applicable law (typically 7 years)',
            ]} />
            <P>When data is no longer needed, we securely delete or anonymise it.</P>
          </Section>

          {/* International */}
          <Section id="international" icon={Globe} title="International Data Transfers">
            <P>Adibuz is based in India and serves clients globally. When you use our website or services, your data may be processed in countries outside your own, including India, the United States, and the European Union.</P>
            <P>We rely on our third-party service providers (such as Vercel, Supabase, Google) who maintain appropriate data transfer mechanisms such as Standard Contractual Clauses (SCCs) for transfers from the EEA/UK to other countries.</P>
            <P>If you are located in the EU or UK and have concerns about international transfers, please contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a>.</P>
          </Section>

          {/* Children */}
          <Section id="children" icon={Users} title="Children's Privacy">
            <P>Our website and services are not directed at individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a minor, please contact us immediately at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a> and we will promptly delete it.</P>
          </Section>

          {/* Marketing */}
          <Section id="marketing" icon={Bell} title="Marketing Communications">
            <P>We may send you marketing emails or newsletters if you have:</P>
            <Ul items={[
              'Subscribed to our newsletter through our website',
              'Requested information about our services',
              'Given explicit consent during a consultation or sign-up',
            ]} />
            <P>Every marketing email includes a clear and easy <strong>unsubscribe link</strong>. You can also opt out at any time by emailing <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a> with the subject line "Unsubscribe".</P>
            <P>We do not send spam. We do not sell your email address to third parties.</P>
          </Section>

          {/* AI Transparency */}
          <Section id="ai-transparency" icon={Zap} title="AI & Automation Transparency">
            <P>As an AI-powered agency, we use artificial intelligence and automation tools internally to improve our service delivery. Here is how we use AI transparently:</P>
            <Ul items={[
              'AI tools may assist in generating content drafts, ad copy, or marketing strategies for review by our human team',
              'Automation tools may be used to send scheduled emails or follow-ups on behalf of clients',
              'AI analytics tools may process aggregated, anonymised data to surface insights',
              'No fully automated decisions with legal or significant personal effects are made without human oversight',
            ]} />
            <P>We are committed to ethical AI use. Your data is never used to train third-party AI models without your explicit consent.</P>
          </Section>

          {/* GDPR / CCPA */}
          <Section id="gdpr-ccpa" icon={Shield} title="GDPR & CCPA Rights">
            <H3>For EEA / UK Residents (GDPR)</H3>
            <P>Under the General Data Protection Regulation, you have the rights listed in the "Your Rights" section above. Our lawful bases for processing are Consent, Legitimate Interests, and Contract Performance. You have the right to lodge a complaint with your local Data Protection Authority.</P>
            <H3>For California Residents (CCPA / CPRA)</H3>
            <P>Under the California Consumer Privacy Act (as amended by the CPRA), California residents have the right to:</P>
            <Ul items={[
              'Know what personal information we collect, use, disclose, or sell',
              'Delete personal information we hold about you',
              'Opt out of the "sale" or "sharing" of your personal information',
              'Non-discrimination for exercising your privacy rights',
              'Limit the use of sensitive personal information',
            ]} />
            <P><strong>We do not sell your personal information.</strong> To submit a CCPA request, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a>.</P>
          </Section>

          {/* Updates */}
          <Section id="updates" icon={RefreshCw} title="Policy Updates">
            <P>We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable laws. When we make significant changes, we will:</P>
            <Ul items={[
              'Update the "Effective Date" at the top of this page',
              'Post a notice on our website if the changes are material',
              'Notify active subscribers by email if required',
            ]} />
            <P>We encourage you to review this page periodically. Your continued use of our website after changes constitutes acceptance of the updated policy.</P>
          </Section>

          {/* Contact */}
          <Section id="contact" icon={Mail} title="Contact Information">
            <P>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</P>
            <div className="mt-4 rounded-xl bg-primary/5 border border-primary/10 p-5 space-y-2">
              <p className="font-bold text-slate-800 text-base">Adibuz Digital Agency</p>
              <p className="text-slate-600 text-[15px]">📧 <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a></p>
              <p className="text-slate-600 text-[15px]">🌐 <a href={SITE_URL} className="text-primary font-medium hover:underline" target="_blank" rel="noopener noreferrer">{SITE_URL}</a></p>
              <p className="text-slate-600 text-[15px]">📍 India (serving clients globally)</p>
            </div>
            <P>We aim to respond to all privacy-related enquiries within <strong>5–10 business days</strong>.</P>
          </Section>

          {/* Back to home */}
          <div className="text-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-75 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              ← Back to Home
            </Link>
            <p className="text-xs text-slate-400 mt-3">
              Also see our <Link to="/terms" className="text-primary hover:underline font-medium">Terms of Use</Link>
            </p>
          </div>

        </main>
      </div>
    </div>

    <Footer />
  </div>
);

// Lucide icon import used inline above
function Zap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export default PrivacyPolicyPage;
