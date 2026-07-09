import { StrictMode, lazy, Suspense, useEffect, useState } from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import { ConsentManager } from './components/ConsentManager.tsx';
import './index.css';

import { ErrorBoundary } from './components/ErrorBoundary.tsx';

// PERFORMANCE: Lazy-load ChatFAB and mount it after first paint/idle time.
// It is useful, but it should not compete with the initial mobile render.
const ChatFAB = lazy(() => import('./components/ChatFAB.tsx'));

// Lazy-load all sub-pages so their heavy dependencies are only downloaded when needed.
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
const WorkPage = lazy(() => import('./pages/WorkPage.tsx'));
const ChatAssistantPage = lazy(() => import('./pages/ChatAssistantPage.tsx'));
const InsightsPage = lazy(() => import('./pages/InsightsPage.tsx'));
const InsightDetailPage = lazy(() => import('./pages/InsightDetailPage.tsx'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.tsx'));
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage.tsx'));
const CookiePreferencesPage = lazy(() => import('./pages/CookiePreferencesPage.tsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.tsx'));
const ServicePage = lazy(() => import('./pages/ServicePage.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-[#3A0F63] border-t-transparent rounded-full animate-spin" />
  </div>
);

function getRuntimeHints() {
  if (typeof window === 'undefined') {
    return { isMobile: false, isLowPower: false, prefersReducedMotion: false };
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const isMobile =
    isTouch ||
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const memory = nav.deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const isLowPower = isMobile && (prefersReducedMotion || memory <= 3 || cores <= 4);

  return { isMobile, isLowPower, prefersReducedMotion };
}

function applyRuntimeHints() {
  if (typeof document === 'undefined') return getRuntimeHints();

  const hints = getRuntimeHints();
  const root = document.documentElement;
  root.classList.toggle('adibuz-mobile', hints.isMobile);
  root.classList.toggle('adibuz-low-power', hints.isLowPower);
  root.classList.toggle('adibuz-reduced-motion', hints.prefersReducedMotion);
  root.dataset.performanceTier = hints.isLowPower ? 'low' : hints.isMobile ? 'mobile' : 'desktop';
  return hints;
}

const runtimeHints = applyRuntimeHints();

function DeferredChatFAB() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const delay = runtimeHints.isLowPower ? 2600 : runtimeHints.isMobile ? 1600 : 500;
    const timeout = window.setTimeout(() => setShouldMount(true), delay);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!shouldMount) return null;

  return (
    <Suspense fallback={null}>
      <ChatFAB />
    </Suspense>
  );
}

if (typeof window !== 'undefined') {
  const hadAppSessionStarted = sessionStorage.getItem('adibuz:app-session-started') === '1';
  (window as Window & typeof globalThis & { __ADIBUZ_HAD_APP_SESSION_STARTED__?: boolean }).__ADIBUZ_HAD_APP_SESSION_STARTED__ =
    hadAppSessionStarted;
  sessionStorage.setItem('adibuz:app-session-started', '1');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        {/*
          ConsentManager is placed outside Routes and Suspense so it mounts
          exactly once for the app lifetime.
        */}
        <ConsentManager />

        <Suspense fallback={<PageLoader />}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
            <Route path="/assistant" element={<ChatAssistantPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="/cookie-preferences" element={<CookiePreferencesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <DeferredChatFAB />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
