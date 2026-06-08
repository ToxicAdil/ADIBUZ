import React from 'react';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { ContactForm } from '@/components/ContactForm';
import { JsonLd, SEO } from '@/components/SEO';
import { BackgroundGradientGlow } from '@/components/ui/background-gradient-glow';
import { FadeInUp } from '@/lib/animations';

export default function ContactPage() {
  return (
    <div className="min-h-screen adibuz-page flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <SEO 
        title="Contact Our Digital Marketing Agency | Adibuz" 
        description="Get in touch with Adibuz to scale your business with data-driven AI marketing, web development, and SEO. Response within 24 hours." 
      />
      <JsonLd
        id="breadcrumb-contact"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.adibuz.com/' },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.adibuz.com/contact' },
          ],
        }}
      />
      <SimpleHeader />
      
      <main className="flex-1 relative pt-32 pb-24 overflow-hidden">
        <BackgroundGradientGlow className="absolute inset-0 z-0" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto">
            <FadeInUp className="text-center mb-12 space-y-4">
              <span className="adibuz-kicker mx-auto">Start the Growth Conversation</span>
              <h1 className="adibuz-heading">
                Contact Our <span className="adibuz-gradient-text">Digital Marketing Agency</span>
              </h1>
              <p className="adibuz-subheading max-w-2xl mx-auto">
                Ready to scale your brand? Fill out the form below and our team of experts will get back to you within 24 hours.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <ContactForm />
            </FadeInUp>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

