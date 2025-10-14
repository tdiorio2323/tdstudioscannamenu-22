export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
) => {
  if (typeof window === 'undefined') return;

  // Add your analytics provider here (e.g., PostHog, Mixpanel, GA4)
  console.log('📊 Event:', eventName, properties);

  // Example: PostHog
  // window.posthog?.capture(eventName, properties);

  // Example: Google Analytics 4
  // window.gtag?.('event', eventName, properties);
};

export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return;

  console.log('📄 Page view:', url);

  // Example: PostHog
  // window.posthog?.capture('$pageview');

  // Example: Google Analytics 4
  // window.gtag?.('config', 'G-XXXXXXXXXX', { page_path: url });
};

export const identifyUser = (
  userId: string,
  traits?: Record<string, unknown>
) => {
  if (typeof window === 'undefined') return;

  console.log('👤 Identify:', userId, traits);

  // Example: PostHog
  // window.posthog?.identify(userId, traits);
};
