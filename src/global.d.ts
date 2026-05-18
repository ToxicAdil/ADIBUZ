/// <reference types="vite/client" />

// ── Google Consent Mode v2 / GA ─────────────────────────────────────────────
type GtagCommand = 'consent' | 'config' | 'event' | 'set' | 'js';
type GtagConsentState = 'granted' | 'denied';

interface GtagConsentParams {
  analytics_storage?: GtagConsentState;
  ad_storage?: GtagConsentState;
  ad_user_data?: GtagConsentState;
  ad_personalization?: GtagConsentState;
  functionality_storage?: GtagConsentState;
  personalization_storage?: GtagConsentState;
  security_storage?: GtagConsentState;
  wait_for_update?: number;
  region?: string[];
}

interface Window {
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };

  // Google Tag / Analytics
  dataLayer: unknown[];
  gtag: (command: GtagCommand, target: string, params?: GtagConsentParams | Record<string, unknown>) => void;

  // Silktide Consent Manager
  silktideConsentManager?: {
    init: (config: Record<string, unknown>) => void;
    showPreferences: () => void;
    hasConsented: (type: string) => boolean;
    on: (event: string, callback: (detail: Record<string, unknown>) => void) => void;
  };

  // Convenience opener exposed by ConsentManager component
  adibuzOpenCookiePrefs?: () => void;
}
