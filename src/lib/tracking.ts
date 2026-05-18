export type ConversionEventName =
  | 'modal_open'
  | 'form_start'
  | 'form_submit'
  | 'lead_created'
  | 'conversion_success'
  | 'calendly_open'
  | 'booking_started'
  | 'booking_completed'
  | 'qualification_started'
  | 'qualification_submitted'
  | 'strategy_call_click'
  | 'strategy_call_conversion';

export interface ConversionEventParams {
  form_name: string;
  source_cta: string;
  [key: string]: any;
}

/**
 * Trigger a standard conversion event across all installed analytics platforms (GA4, Meta Pixel, etc.)
 */
export const trackConversionEvent = (eventName: ConversionEventName, params: ConversionEventParams) => {
  // 1. Google Analytics 4 (GA4)
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, {
      ...params,
      send_to: 'G-XXXXXXXXXX', // Ensure this matches index.html tracking ID when live
    });
  }

  // 2. Meta / Facebook Pixel
  if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
    // Map standard events to FB standard events if needed, or use Custom
    const fbEventMap: Record<string, string> = {
      'lead_created': 'Lead',
      'conversion_success': 'SubmitApplication',
    };
    
    const fbEventName = fbEventMap[eventName] || 'CustomEvent';
    (window as any).fbq('track', fbEventName, {
      content_name: params.form_name,
      content_category: params.source_cta,
      ...params
    });
  }

  // Fallback / Debug in development
  if (import.meta.env.DEV) {
    console.log(`[Tracking Event] ${eventName}:`, params);
  }
};
