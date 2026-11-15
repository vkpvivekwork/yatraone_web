export const metadata = {
  title: 'Varanasi Tour Package 3 Days 2 Nights — Kashi Darshan & Sarnath | Yatra Ke Sathi',
  description:
    'Varanasi 3 days 2 nights tour package — Kashi Vishwanath darshan, sunrise boat ride on Ganga, Dashashwamedh Aarti, Manikarnika ghat & Sarnath excursion. Book now.',
  keywords: [
    'Varanasi tour package 3 days 2 nights',
    'Varanasi 3 day tour package',
    'Kashi darshan 3 days',
    'Varanasi trip 3 days',
    'Varanasi package tour',
    'Varanasi Sarnath tour',
    'Ganga Aarti tour Varanasi',
    'Kashi Vishwanath darshan package',
    'Varanasi 3 night package',
    'Yatra Ke Sathi',
  ],
  alternates: {
    canonical: 'https://yatraksathi.com/tours/varanasi-tour-package-3-days-2-nights',
  },
  openGraph: {
    title: 'Varanasi Tour Package 3 Days 2 Nights | Kashi Darshan | Yatra Ke Sathi',
    description:
      'Kashi Vishwanath, sunrise boat ride, Ganga Aarti & Sarnath — 3 days in Varanasi planned by locals.',
    url: 'https://yatraksathi.com/tours/varanasi-tour-package-3-days-2-nights',
    siteName: 'Yatra Ke Sathi',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1705952484283-19c31e37e0e4?w=1200&q=85&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Varanasi 3 day tour — Kashi ghats at sunrise',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varanasi Tour Package 3 Days 2 Nights | Yatra Ke Sathi',
    description: 'Kashi Vishwanath, sunrise boat ride, Ganga Aarti & Sarnath — 3 days planned by locals.',
    images: ['https://images.unsplash.com/photo-1705952484283-19c31e37e0e4?w=1200&q=85&auto=format&fit=crop'],
  },
}

export default function Layout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yatraksathi.com' },
          { '@type': 'ListItem', position: 2, name: 'Tour Packages', item: 'https://yatraksathi.com/tours' },
          { '@type': 'ListItem', position: 3, name: 'Varanasi 3 Days 2 Nights', item: 'https://yatraksathi.com/tours/varanasi-tour-package-3-days-2-nights' },
        ],
      },
      {
        '@type': 'TouristTrip',
        name: 'Varanasi Tour Package 3 Days 2 Nights',
        description:
          'Kashi Vishwanath darshan, sunrise boat ride on the Ganga, Dashashwamedh Ganga Aarti, Manikarnika Ghat and Sarnath excursion — 3 days in Varanasi planned by locals.',
        url: 'https://yatraksathi.com/tours/varanasi-tour-package-3-days-2-nights',
        touristType: ['Pilgrimage', 'Cultural', 'Religious'],
        availableLanguage: ['English', 'Hindi'],
        provider: {
          '@type': 'TravelAgency',
          name: 'Yatra Ke Sathi',
          url: 'https://yatraksathi.com',
          telephone: '+919277472279',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Varanasi',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN',
          },
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
