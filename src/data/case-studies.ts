export interface CaseStudy {
  client: string;
  challenge: string;
  result: string;
  image: string;
  metrics: { label: string; value: string }[];
  industry: string;
  timeline: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'Askin Astrology',
    challenge: 'Low conversions and inconsistent leads',
    result: '₹4Cr+ Revenue Generated',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&q=75&fm=webp',
    metrics: [
      { label: 'Total Revenue', value: '₹4Cr+' },
      { label: 'Return on Ad Spend', value: '3.5x' },
      { label: 'Cost Per Acquisition', value: '60% Lower' },
      { label: 'Conversions', value: '2x Increase' }
    ],
    industry: 'Spiritual / E-commerce',
    timeline: '6 Months',
  },
  {
    client: 'LuxeDecor',
    challenge: 'High competition in high-ticket luxury niche',
    result: '5.5x Average ROAS Scaled',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=75&fm=webp',
    metrics: [
      { label: 'Avg ROAS', value: '5.5x' },
      { label: 'Annual Revenue', value: '₹12Cr+' },
      { label: 'Market Share', value: '45% Growth' },
      { label: 'LTV', value: '3.2x Increase' }
    ],
    industry: 'Home Decor',
    timeline: '12 Months',
  },
  {
    client: 'TechStart',
    challenge: 'Struggling to acquire B2B enterprise leads',
    result: '850+ Qualified MQLs/Month',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=75&fm=webp',
    metrics: [
      { label: 'Monthly MQLs', value: '850+' },
      { label: 'Cost Per Lead', value: '₹1,200 Lower' },
      { label: 'Pipeline Value', value: '₹35Cr+' },
      { label: 'Retention', value: '18% Higher' }
    ],
    industry: 'SaaS / Enterprise',
    timeline: '4 Months',
  }
];
