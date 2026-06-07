import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { SEO } from '@/components/SEO';
import { FadeInUp } from '@/lib/animations';
import { FileText, Shield, AlertTriangle, Globe, Mail, CreditCard, Users, Zap, Lock } from 'lucide-react';

const EFFECTIVE_DATE = 'May 15, 2026';
const CONTACT_EMAIL = 'hello@adibuz.com';
const SITE_URL = 'https://www.adibuz.com';

const Section = memo(({ id, icon: Icon, title, children }: {
  id: string; icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode;
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
        <h2 id={`${id}-heading`} className="adibuz-gradient-text text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
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
const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 mb-2 rounded-xl bg-amber-50 border border-amber-200/70 p-4 flex gap-3" role="note">
    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
    <p className="text-amber-800 text-[14px] leading-relaxed font-medium">{children}</p>
  </div>
);

const TOC_ITEMS = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'company-info', label: 'Company Information' },
  { id: 'services', label: 'Services Overview' },
  { id: 'user-responsibilities', label: 'User Responsibilities' },
  { id: 'acceptable-use', label: 'Acceptable Use' },
  { id: 'ip-rights', label: 'Intellectual Property' },
  { id: 'client-responsibilities', label: 'Client Responsibilities' },
  { id: 'payments', label: 'Payments & Billing' },
  { id: 'deliverables', label: 'Project Deliverables' },
  { id: 'third-party', label: 'Third-Party Tools' },
  { id: 'ai-disclaimer', label: 'AI & Automation' },
  { id: 'results-disclaimer', label: 'Results Disclaimer' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact Us' },
];

const TermsOfUsePage = () => (
  <div className="min-h-screen bg-[#fdfaff] selection:bg-primary selection:text-white">
    <SEO
      title="Terms of Use | Adibuz"
      description="Read the Terms of Use for Adibuz â€” an AI-powered digital marketing agency. Understand our service terms, client responsibilities, IP rights, and legal policies."
      canonical={`${SITE_URL}/terms`}
    />
    <SimpleHeader />

    {/* Hero */}
    <header className="relative overflow-hidden pt-32 pb-16 md:pb-24 text-center px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-[12px] font-semibold text-primary uppercase tracking-widest mb-6">
          <FileText className="w-3.5 h-3.5" aria-hidden="true" /> Legal
        </div>
        <h1 className="adibuz-gradient-text text-4xl md:text-6xl font-[900] tracking-tight leading-[1.05] mb-5">
          Terms of Use
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto mb-6">
          By using our website or services, you agree to these terms. Please read them carefully â€” we've kept them clear and honest.
        </p>
        <p className="text-sm text-slate-400 font-medium">
          Effective Date: <strong className="text-slate-600">{EFFECTIVE_DATE}</strong>
          {' Â· '}Last Updated: <strong className="text-slate-600">{EFFECTIVE_DATE}</strong>
        </p>
      </div>
    </header>

    {/* Layout */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* Sticky TOC */}
        <aside className="lg:w-64 flex-shrink-0" aria-label="Table of contents">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm p-5 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">On This Page</p>
            <nav aria-label="Terms of use sections">
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

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-6" aria-label="Terms of use content">

          {/* Acceptance */}
          <Section id="acceptance" icon={Shield} title="Acceptance of Terms">
            <P>By accessing or using the Adibuz website (<a href={SITE_URL} className="text-primary font-medium hover:underline" target="_blank" rel="noopener noreferrer">adibuz.com</a>) or engaging our services, you confirm that you have read, understood, and agree to be bound by these Terms of Use and our <Link to="/privacy-policy" className="text-primary font-medium hover:underline">Privacy Policy</Link>.</P>
            <P>If you do not agree to these terms, please do not use our website or services. Your continued use of the website or services following any updates to these terms constitutes your acceptance of the revised terms.</P>
            <P>These terms apply to all visitors, clients, prospective clients, and any other users of the website or services.</P>
          </Section>

          {/* Company Info */}
          <Section id="company-info" icon={Users} title="Company Information">
            <P>Adibuz is an AI-powered digital marketing and branding agency based in India, providing services to clients globally. We operate under the brand name "Adibuz" and can be contacted at:</P>
            <div className="mt-4 rounded-xl bg-primary/5 border border-primary/10 p-5 space-y-2">
              <p className="font-bold text-slate-800 text-base">Adibuz Digital Agency</p>
              <p className="text-slate-600 text-[15px]">ðŸ“§ <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a></p>
              <p className="text-slate-600 text-[15px]">ðŸŒ <a href={SITE_URL} className="text-primary font-medium hover:underline" target="_blank" rel="noopener noreferrer">{SITE_URL}</a></p>
              <p className="text-slate-600 text-[15px]">ðŸ“ India (serving clients globally)</p>
            </div>
          </Section>

          {/* Services */}
          <Section id="services" icon={Zap} title="Services Overview">
            <P>Adibuz provides a range of digital marketing and technology services, including but not limited to:</P>
            <Ul items={[
              'Search Engine Optimisation (SEO)',
              'Web design and development',
              'AI automation and workflow integrations',
              'Performance marketing (Google Ads, Meta Ads, LinkedIn Ads)',
              'Social media marketing and management',
              'Brand identity and visual design',
              'Content marketing and copywriting',
              'Lead generation systems',
              'Marketing analytics and reporting',
              'Growth consulting and digital strategy',
            ]} />
            <P>The scope, pricing, timelines, and deliverables for specific engagements will be defined in individual Service Agreements, Proposals, or Statements of Work entered into between Adibuz and the client.</P>
          </Section>

          {/* User Responsibilities */}
          <Section id="user-responsibilities" icon={Users} title="User Responsibilities">
            <P>When using our website or services, you agree to:</P>
            <Ul items={[
              'Provide accurate, complete, and current information when requested',
              'Not impersonate any person or entity or misrepresent your affiliation',
              'Keep any login credentials or access details confidential',
              'Notify us immediately of any unauthorised use of your account or information',
              'Comply with all applicable local, national, and international laws and regulations',
              'Not use our website or services for any unlawful, harmful, or fraudulent purpose',
            ]} />
          </Section>

          {/* Acceptable Use */}
          <Section id="acceptable-use" icon={Shield} title="Acceptable Use Policy">
            <P>You must not use our website or services to:</P>
            <Ul items={[
              'Transmit or distribute malware, viruses, or malicious code',
              'Attempt to gain unauthorised access to our systems or data',
              'Scrape, crawl, or extract data from our website without permission',
              'Reproduce, distribute, or commercially exploit our content without written consent',
              'Engage in spam, phishing, or other deceptive communications',
              'Use our branding, logo, or name in any misleading or unauthorised way',
              'Reverse-engineer, decompile, or attempt to extract source code from our tools',
            ]} />
            <P>Violation of this policy may result in immediate suspension of access to our services and potential legal action.</P>
          </Section>

          {/* IP Rights */}
          <Section id="ip-rights" icon={Lock} title="Intellectual Property Rights">
            <H3>Adibuz Owned Content</H3>
            <P>All content on this website â€” including but not limited to text, graphics, logos, icons, images, audio, video, code, and software â€” is the intellectual property of Adibuz or its licensors and is protected by applicable copyright, trademark, and intellectual property laws.</P>
            <H3>Client Deliverables</H3>
            <P>Upon receipt of full payment for a project, Adibuz transfers ownership of the final agreed deliverables (such as website design files, ad creative, or written content) to the client. Ownership of proprietary tools, frameworks, templates, and methodologies used to create deliverables remains with Adibuz.</P>
            <H3>Prohibited Uses</H3>
            <P>You may not copy, reproduce, republish, upload, post, transmit, or distribute any Adibuz content for commercial purposes without our express written permission.</P>
          </Section>

          {/* Client Responsibilities */}
          <Section id="client-responsibilities" icon={Users} title="Client Responsibilities">
            <P>Clients engaging Adibuz for services are responsible for:</P>
            <Ul items={[
              'Providing all necessary brand assets, access credentials, and project briefs in a timely manner',
              'Reviewing and approving draft deliverables within agreed timelines',
              'Ensuring that content, images, or materials provided to Adibuz do not infringe third-party rights',
              'Maintaining active and accessible accounts on platforms (Google, Meta, etc.) used for campaigns',
              'Communicating feedback and change requests clearly and within defined revision windows',
              'Ensuring billing information is accurate and payments are made on time',
            ]} />
            <P>Delays caused by a client's failure to provide required materials or approvals may affect project timelines. Adibuz shall not be held liable for such delays.</P>
          </Section>

          {/* Payments */}
          <Section id="payments" icon={CreditCard} title="Payments & Billing">
            <H3>Fees</H3>
            <P>All service fees are specified in individual proposals or service agreements. Prices are in INR (Indian Rupees) unless otherwise stated. Adibuz reserves the right to update pricing with reasonable notice.</P>
            <H3>Payment Terms</H3>
            <Ul items={[
              'A deposit or advance payment may be required before project commencement',
              'Retainer or ongoing service fees are due at the start of each billing period',
              'Final payment must be received before delivery of final assets or go-live',
              'Invoices are due within the payment window specified on the invoice',
            ]} />
            <H3>Late Payments</H3>
            <P>Late payments may result in pausing of active services until outstanding balances are settled. Adibuz reserves the right to charge a late fee on overdue invoices.</P>
            <H3>Refunds</H3>
            <P>Refund eligibility depends on the stage of work completed and the terms outlined in the individual service agreement. Adibuz does not offer refunds for completed work, used ad spend, or third-party software fees.</P>
          </Section>

          {/* Deliverables */}
          <Section id="deliverables" icon={FileText} title="Project Timelines & Deliverables">
            <P>Project timelines are estimates and depend on both parties fulfilling their obligations. Adibuz will make reasonable efforts to meet agreed deadlines; however, timelines may be affected by:</P>
            <Ul items={[
              'Delays in client feedback or approvals',
              'Incomplete or late delivery of required assets by the client',
              'Third-party platform outages or policy changes',
              'Scope changes requested by the client after project commencement',
              'Force majeure events or circumstances outside Adibuz\'s control',
            ]} />
            <P>Any changes to the agreed scope of work must be documented and may result in revised timelines or additional fees.</P>
          </Section>

          {/* Third Party */}
          <Section id="third-party" icon={Globe} title="Third-Party Tools & Services">
            <P>Adibuz uses and may recommend various third-party tools and platforms to deliver services, including Google Ads, Meta Ads Manager, LinkedIn Campaign Manager, Cloudinary, Supabase, Vercel, and others.</P>
            <P>Adibuz is not responsible for:</P>
            <Ul items={[
              'Outages, errors, or changes to third-party platforms or APIs',
              'Changes to advertising platform algorithms, policies, or fee structures',
              'Data loss or service interruptions caused by third-party providers',
              'The privacy practices or terms of conditions of third-party tools',
            ]} />
            <P>Clients are responsible for reviewing and accepting the terms of any third-party platforms used in connection with their campaigns or projects.</P>
          </Section>

          {/* AI Disclaimer */}
          <Section id="ai-disclaimer" icon={Zap} title="AI & Automation Disclaimer">
            <Callout>AI-generated content and automation outputs are provided as a starting point and may require human review before use in production environments.</Callout>
            <P>Adibuz uses artificial intelligence and automation tools to enhance its service delivery. Please note:</P>
            <Ul items={[
              'AI-generated content (copy, visuals, code, strategies) is reviewed by our team before delivery',
              'AI outputs may occasionally contain errors, biases, or inaccuracies â€” clients should review all deliverables',
              'Automation workflows are tested but may be affected by third-party API changes',
              'Adibuz does not use client data to train external AI models without explicit written consent',
              'No fully automated decisions with significant legal effects are made without human oversight',
            ]} />
          </Section>

          {/* Results Disclaimer */}
          <Section id="results-disclaimer" icon={AlertTriangle} title="SEO & Marketing Results Disclaimer">
            <Callout>Adibuz does not guarantee specific SEO rankings, traffic volumes, lead counts, or advertising ROI. Digital marketing results vary based on many factors outside our control.</Callout>
            <P>Performance marketing, SEO, and growth services involve inherent uncertainty. Results depend on factors including but not limited to:</P>
            <Ul items={[
              'Search engine algorithm updates (Google, Bing, etc.)',
              'Advertising platform policy changes (Meta, Google, LinkedIn)',
              'Market competition and industry trends',
              'Budget levels, ad quality, and audience targeting',
              'Client website performance, conversion rate, and product-market fit',
              'Economic conditions and seasonal variations',
            ]} />
            <P>Any projections, forecasts, or benchmarks shared during consultations are illustrative estimates only and do not constitute guarantees or warranties of specific outcomes.</P>
          </Section>

          {/* Liability */}
          <Section id="liability" icon={Shield} title="Limitation of Liability">
            <P>To the fullest extent permitted by applicable law, Adibuz and its directors, employees, partners, and affiliates shall not be liable for:</P>
            <Ul items={[
              'Indirect, incidental, special, consequential, or punitive damages',
              'Loss of profits, revenue, data, or business opportunities',
              'Damages resulting from third-party platform changes, outages, or decisions',
              'Results of marketing campaigns that do not meet client expectations',
              'Losses arising from client-provided inaccurate or incomplete information',
            ]} />
            <P>In no event shall Adibuz's total liability to any client exceed the total fees paid by that client in the three (3) months prior to the claim.</P>
            <P>Some jurisdictions do not allow the exclusion of certain warranties or liability limitations, so some of the above may not apply to you.</P>
          </Section>

          {/* Confidentiality */}
          <Section id="confidentiality" icon={Lock} title="Confidentiality">
            <P>Both Adibuz and its clients agree to treat as confidential any non-public information shared during the course of engagement. This includes business strategies, financial information, campaign data, proprietary processes, and client credentials.</P>
            <P>Adibuz will not disclose confidential client information to third parties except:</P>
            <Ul items={[
              'As required by law or court order',
              'To authorised team members or subcontractors strictly for service delivery',
              'With the client\'s prior written consent',
            ]} />
            <P>Clients similarly agree not to disclose Adibuz's proprietary methodologies, internal processes, or pricing to competitors or third parties.</P>
          </Section>

          {/* Termination */}
          <Section id="termination" icon={AlertTriangle} title="Account Suspension & Termination">
            <P>Adibuz reserves the right to suspend or terminate access to its services or website at any time, with or without notice, if a user or client:</P>
            <Ul items={[
              'Violates any provision of these Terms of Use',
              'Engages in fraudulent, abusive, or harmful behaviour',
              'Fails to make payment for services rendered',
              'Provides false or misleading information',
            ]} />
            <P>Upon termination, any outstanding fees remain due and payable. Adibuz will retain a copy of work completed to date but is not obligated to transfer assets until all outstanding balances are cleared.</P>
            <P>Clients may terminate ongoing engagements by providing written notice as specified in their individual service agreement. Early termination may be subject to fees.</P>
          </Section>

          {/* Governing Law */}
          <Section id="governing-law" icon={Globe} title="Governing Law & Dispute Resolution">
            <H3>Governing Law</H3>
            <P>These Terms of Use are governed by and construed in accordance with the laws of India, without regard to conflict of law principles.</P>
            <H3>Dispute Resolution</H3>
            <P>In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation. If a resolution cannot be reached within 30 days, the dispute shall be submitted to binding arbitration or the competent courts of India.</P>
            <P>Both parties waive any right to participate in class-action lawsuits or class-wide arbitration related to these terms or Adibuz's services.</P>
          </Section>

          {/* Changes */}
          <Section id="changes" icon={FileText} title="Changes to These Terms">
            <P>Adibuz reserves the right to update or modify these Terms of Use at any time. When we make material changes, we will:</P>
            <Ul items={[
              'Update the "Last Updated" date at the top of this page',
              'Post a notice on our website if the changes are significant',
              'Notify active clients by email where appropriate',
            ]} />
            <P>Your continued use of our website or services after the effective date of any changes constitutes your acceptance of the updated terms.</P>
          </Section>

          {/* Contact */}
          <Section id="contact" icon={Mail} title="Contact Information">
            <P>If you have questions about these Terms of Use, please contact us:</P>
            <div className="mt-4 rounded-xl bg-primary/5 border border-primary/10 p-5 space-y-2">
              <p className="font-bold text-slate-800 text-base">Adibuz Digital Agency</p>
              <p className="text-slate-600 text-[15px]">ðŸ“§ <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">{CONTACT_EMAIL}</a></p>
              <p className="text-slate-600 text-[15px]">ðŸŒ <a href={SITE_URL} className="text-primary font-medium hover:underline" target="_blank" rel="noopener noreferrer">{SITE_URL}</a></p>
            </div>
            <P>Also see our <Link to="/privacy-policy" className="text-primary font-medium hover:underline">Privacy Policy</Link> for information on how we handle your personal data.</P>
          </Section>

          {/* Footer nav */}
          <div className="text-center pt-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-75 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
              â† Back to Home
            </Link>
          </div>

        </main>
      </div>
    </div>

    <Footer />
  </div>
);

export default TermsOfUsePage;

