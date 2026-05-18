import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import { ConsentManager } from './components/ConsentManager.tsx';
import './index.css';

import { ErrorBoundary } from './components/ErrorBoundary.tsx';

// PERFORMANCE: Lazy-load ChatFAB — it's a floating button that doesn't need to
// be in the initial bundle. This keeps framer-motion entirely out of the
// critical path since App.tsx also lazy-loads all motion-dependent components.
const ChatFAB = lazy(() => import('./components/ChatFAB.tsx'));

// Lazy-load all sub-pages so their heavy dependencies (Spline, etc.) 
// are only downloaded when the user actually navigates to them.
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
const WorkPage = lazy(() => import('./pages/WorkPage.tsx'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage.tsx'));
const ChatAssistantPage = lazy(() => import('./pages/ChatAssistantPage.tsx'));
const InsightsPage = lazy(() => import('./pages/InsightsPage.tsx'));
const InsightDetailPage = lazy(() => import('./pages/InsightDetailPage.tsx'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.tsx'));
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage.tsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.tsx'));
const ServicePage = lazy(() => import('./pages/ServicePage.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-[#3A0F63] border-t-transparent rounded-full animate-spin" />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          {/*
            ConsentManager is placed OUTSIDE <Routes> and <Suspense> so it:
            - Mounts exactly once for the entire app lifetime
            - Is never re-mounted or unmounted by route changes
            - Renders null — all work is DOM side-effects
          */}
          <ConsentManager />

          <Suspense fallback={<PageLoader />}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:id" element={<CaseStudyDetailPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<InsightDetailPage />} />
              <Route path="/assistant" element={<ChatAssistantPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfUsePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <ChatFAB />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
