export const metadata = {
  title: 'Varanasi Temple Darshan Tour — Kashi Vishwanath & All Temples in 1 Day | Yatra Ke Sathi',
  description:
    'Varanasi temple darshan tour — Kashi Vishwanath, Kaal Bhairav, Sankat Mochan, Durga Mandir, Tulsi Manas Mandir & Ganga Aarti at Dashashwamedh. 1-day guided Kashi darshan by locals.',
  keywords: [
    'Varanasi temple darshan',
    'Kashi Vishwanath darshan',
    'Kashi darshan package',
    'Varanasi one day tour',
    'Varanasi temple tour',
    'Varanasi 1 day tour package',
    'Kashi temple darshan package',
    'Ganga Aarti Varanasi',
    'guided temple tour Varanasi',
    'Yatra Ke Sathi',
  ],
  alternates: {
    canonical: 'https://yatraksathi.com/tours/varanasi-temple-darshan',
  },
  openGraph: {
    title: 'Varanasi Temple Darshan — Kashi Vishwanath & All Temples in 1 Day | Yatra Ke Sathi',
    description:
      'Kashi Vishwanath, Kaal Bhairav, Sankat Mochan & Ganga Aarti — complete Kashi darshan in one day, guided by locals.',
    url: 'https://yatraksathi.com/tours/varanasi-temple-darshan',
    siteName: 'Yatra Ke Sathi',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1705952484283-19c31e37e0e4?w=1200&q=85&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Kashi Vishwanath temple darshan Varanasi',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varanasi Temple Darshan | Kashi Darshan 1 Day',
    description: 'Kashi Vishwanath, Kaal Bhairav, Sankat Mochan & Ganga Aarti — complete darshan in one day.',
    images: ['https://images.unsplash.com/photo-1705952484283-19c31e37e0e4?w=1200&q=85&auto=format&fit=crop'],
  },
}

export default function TemplesDarshanLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yatraksathi.com' },
          { '@type': 'ListItem', position: 2, name: 'Tour Packages', item: 'https://yatraksathi.com/tours' },
          { '@type': 'ListItem', position: 3, name: 'Varanasi Temple Darshan', item: 'https://yatraksathi.com/tours/varanasi-temple-darshan' },
        ],
      },
      {
        '@type': 'TouristTrip',
        name: 'Varanasi Temple Darshan — Kashi Darshan in 1 Day',
        description:
          'A guided 1-day Kashi darshan covering Kashi Vishwanath, Kaal Bhairav, Sankat Mochan, Durga Mandir, Tulsi Manas Mandir and Ganga Aarti at Dashashwamedh Ghat.',
        url: 'https://yatraksathi.com/tours/varanasi-temple-darshan',
        touristType: ['Pilgrimage', 'Religious'],
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
