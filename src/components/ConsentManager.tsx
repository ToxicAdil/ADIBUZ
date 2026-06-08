/**
 * ConsentManager.tsx
 *
 * Loads the Silktide Consent Manager from CDN in a completely non-blocking way:
 *  1. CSS  â†’ injected as media="print" then switched to "all" after load
 *            (same technique used for Google Fonts in index.html)
 *  2. JS   â†’ injected after requestIdleCallback (or 600 ms fallback) so it
 *            never blocks the main thread during the initial paint / LCP phase
 *
 * Google Consent Mode v2 defaults are set in index.html (inline script, < 300 B)
 * so they fire before ANY other script. This component updates consent on user
 * choice via the Silktide `consentChanged` event.
 *
 * The component renders null â€” all work is pure DOM side-effects.
 *
 * â”€â”€ SUBRESOURCE INTEGRITY (SRI) POLICY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * Both the Silktide CSS and JS are loaded with:
 *   - integrity="sha384-<hash>"  (W3C SRI, enforced by the browser)
 *   - crossorigin="anonymous"    (required â€” SRI checks are CORS-gated)
 *
 * The sha384 hashes were independently verified by downloading both assets
 * and recomputing the hashes locally on 2026-05-16. They match the values
 * originally provided in the Silktide integration snippet.
 *
 * If jsDelivr or Silktide's CDN serves a tampered file, the browser will:
 *   1. Refuse to execute / apply the resource.
 *   2. Fire a SecurityPolicyViolation event.
 *   3. Trigger the onerror handler below (for JS), which logs a warning.
 *   The site continues to function without the consent banner â€” graceful
 *   degradation is intentional to avoid a broken experience for the user.
 *
 * To update Silktide: bump SILKTIDE_VERSION, fetch both new assets, recompute
 * sha384 hashes (e.g. `openssl dgst -sha384 -binary file | base64`), and
 * update SILKTIDE_CSS_INTEGRITY and SILKTIDE_JS_INTEGRITY below.
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 */

import { memo, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SILKTIDE_VERSION = '2.0.0';
const SILKTIDE_CSS_HREF = `https://cdn.jsdelivr.net/gh/silktide/consent-manager@v${SILKTIDE_VERSION}/silktide-consent-manager.css`;
const SILKTIDE_JS_SRC  = `https://cdn.jsdelivr.net/gh/silktide/consent-manager@v${SILKTIDE_VERSION}/silktide-consent-manager.js`;

/**
 * SRI hashes â€” verified 2026-05-16 by recomputing sha384 from live CDN bytes.
 * CSS: sha384-IO1E/jCrQXyH5rwcI0SXP7OXw47JFqQNDQcKhbFvqnL2IunBxxwE2Ne5XyAmCqKs  âœ…
 * JS : sha384-j4NIMOecmtzMWe9GJADIIe5hTlHG63aiTQ/2XorW10RNyQJg+IU+xwFVDy45wBah  âœ…
 */
const SILKTIDE_CSS_INTEGRITY = 'sha384-IO1E/jCrQXyH5rwcI0SXP7OXw47JFqQNDQcKhbFvqnL2IunBxxwE2Ne5XyAmCqKs';
const SILKTIDE_JS_INTEGRITY  = 'sha384-j4NIMOecmtzMWe9GJADIIe5hTlHG63aiTQ/2XorW10RNyQJg+IU+xwFVDy45wBah';

// Unique IDs so we never double-inject
const CSS_ID = 'silktide-consent-manager-css';
const JS_ID  = 'silktide-consent-manager-js';

// ---------------------------------------------------------------------------
// gtag helper (window.gtag is initialised in index.html inline script)
// ---------------------------------------------------------------------------
function gtagUpdate(params: GtagConsentParams) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', params);
  }
}

// ---------------------------------------------------------------------------
// Silktide init configuration
// ---------------------------------------------------------------------------
function buildSilktideConfig() {
  return {
    backdrop: { show: true },
    icon: {
      // Bottom-left so it never overlaps the ChatFAB (bottom-right)
      position: 'bottomLeft',
    },
    prompt: { position: 'bottomRight' },
    consentTypes: [
      {
        id: 'essential',
        label: 'Essential',
        description:
          '<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>',
        required: true,
        onAccept() {
          // Essential cookies are always active â€” nothing to gate here
        },
      },
      {
        id: 'analytics',
        label: 'Analytics',
        description:
          '<p>These cookies help us understand how visitors interact with our site, which pages are most popular, and how we can improve the overall experience.</p>',
        defaultValue: true,
        // Google Consent Mode v2 storage key
        gtag: 'analytics_storage',
        onAccept() {
          gtagUpdate({ analytics_storage: 'granted' });
        },
        onRevoke() {
          gtagUpdate({ analytics_storage: 'denied' });
        },
      },
      {
        id: 'marketing',
        label: 'Marketing',
        description:
          '<p>These cookies are used by us and our advertising partners to show you relevant ads on this site and elsewhere, and to measure how those campaigns perform.</p>',
        gtag: ['ad_storage', 'ad_user_data', 'ad_personalization'],
        onAccept() {
          gtagUpdate({
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
          });
        },
        onRevoke() {
          gtagUpdate({
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });
        },
      },
    ],
    text: {
      prompt: {
        description:
          '<p>We use cookies to enhance your experience, personalise content, and analyse our traffic. You can choose which cookies you allow.</p>',
        acceptAllButtonText: 'Accept all',
        acceptAllButtonAccessibleLabel: 'Accept all cookies',
        rejectNonEssentialButtonText: 'Reject non-essential',
        rejectNonEssentialButtonAccessibleLabel: 'Reject all non-essential cookies',
        preferencesButtonText: 'Preferences',
        preferencesButtonAccessibleLabel: 'Manage cookie preferences',
      },
      preferences: {
        title: 'Manage your cookie preferences',
        description:
          '<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your preferences will apply across our website.</p>',
        saveButtonText: 'Save and close',
        saveButtonAccessibleLabel: 'Save your cookie preferences and close',
        // Remove Silktide credit link (optional â€” keep if you want to support OSS)
        creditLinkText: '',
        creditLinkAccessibleLabel: '',
      },
    },
  };
}

// ---------------------------------------------------------------------------
// DOM injection helpers
// ---------------------------------------------------------------------------
function injectCSS(): HTMLLinkElement | null {
  if (document.getElementById(CSS_ID)) return null;

  const link = document.createElement('link');
  link.id        = CSS_ID;
  link.rel       = 'stylesheet';
  link.href      = SILKTIDE_CSS_HREF;
  link.integrity = SILKTIDE_CSS_INTEGRITY;
  link.crossOrigin = 'anonymous';
  // Non-blocking: start as "print" â†’ switch to "all" after load
  link.media = 'print';
  link.onload = () => { link.media = 'all'; };
  document.head.appendChild(link);
  return link;
}

function injectJS(onLoad: () => void): HTMLScriptElement | null {
  if (document.getElementById(JS_ID)) {
    // Already injected (e.g. HMR re-mount) â€” just call init directly
    onLoad();
    return null;
  }

  const script = document.createElement('script');
  script.id          = JS_ID;
  script.src         = SILKTIDE_JS_SRC;
  script.integrity   = SILKTIDE_JS_INTEGRITY;
  script.crossOrigin = 'anonymous';
  // async so it doesn't block HTML parsing
  script.async       = true;
  script.onload      = onLoad;
  script.onerror     = () => {
    // Silktide failed to load. Possible causes:
    //  1. Ad blocker / privacy extension blocked the CDN request.
    //  2. Network error (CDN down, DNS failure).
    //  3. SRI integrity mismatch â€” the browser detected a tampered file
    //     and refused to execute it. This is the SRI security mechanism
    //     working correctly. The banner simply won't appear.
    // The site continues to work normally â€” graceful degradation is intentional.
    console.warn(
      '[ConsentManager] Silktide script failed to load. ' +
      'If this is an SRI integrity error, the CDN may have served a tampered file. ' +
      'Check the browser Security tab for SecurityPolicyViolation events.'
    );
  };
  document.head.appendChild(script);
  return script;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
function ConsentManagerInner() {
  useEffect(() => {
    let cssEl: HTMLLinkElement | null = null;
    let jsEl: HTMLScriptElement | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
    let brandingObserver: MutationObserver | null = null;

    function removeSilktideBranding() {
      const wrapper = document.getElementById('stcm-wrapper');
      if (!wrapper) return;
      const brandLinks = wrapper.querySelectorAll<HTMLElement>(
        'a[href*="silktide.com"], a.stcm-credit-link, a.stcm-logo'
      );
      brandLinks.forEach((el) => {
        el.style.cssText = 'display:none!important;visibility:hidden!important;width:0!important;height:0!important;overflow:hidden!important;pointer-events:none!important;';
      });
    }

    function initSilktide() {
      if (!window.silktideConsentManager) {
        console.warn('[ConsentManager] silktideConsentManager not found on window.');
        return;
      }

      window.adibuzOpenCookiePrefs = () => {
        window.silktideConsentManager?.showPreferences();
      };

      window.silktideConsentManager.init(buildSilktideConfig());
      requestAnimationFrame(removeSilktideBranding);

      brandingObserver = new MutationObserver(removeSilktideBranding);
      const wrapper = document.getElementById('stcm-wrapper');
      if (wrapper) {
        brandingObserver.observe(wrapper, { childList: true, subtree: true });
      } else {
        brandingObserver.observe(document.body, { childList: true, subtree: false });
      }
    }

    const interactionEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    let started = false;

    function startConsentManager() {
      if (started) return;
      started = true;
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, startConsentManager);
      });
      if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
      cssEl = injectCSS();
      jsEl = injectJS(initSilktide);
    }

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, startConsentManager, { once: true, passive: true });
    });
    timeoutHandle = setTimeout(startConsentManager, 12000);

    return () => {
      if (timeoutHandle !== null) clearTimeout(timeoutHandle);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, startConsentManager);
      });
      brandingObserver?.disconnect();
      delete window.adibuzOpenCookiePrefs;

      if (import.meta.env.DEV) {
        cssEl?.remove();
        jsEl?.remove();
      }
    };
  }, []);

  return null;
}

// memo ensures React never re-renders this component
export const ConsentManager = memo(ConsentManagerInner);
ConsentManager.displayName = 'ConsentManager';
