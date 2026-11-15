export const metadata = {
  title: 'Varanasi Complete Tour Package 4 Days 3 Nights — All Temples, Ghats & Excursions | Yatra Ke Sathi',
  description:
    'Complete Varanasi tour package — Sparsh Darshan, all major ghats, Sarnath, Swarved Mandir, Ramnagar Fort & Vindhyachal 3 Devi Darshan. 4 days 3 nights. Book with locals.',
  keywords: [
    'Varanasi complete tour package',
    'Varanasi full tour package',
    'Varanasi 4 days tour package',
    'Varanasi sightseeing package',
    'Kashi complete darshan package',
    'Varanasi all temples tour',
    'Ramnagar Fort Varanasi',
    'Vindhyachal devi darshan',
    'Swarved Mandir Varanasi',
    'Yatra Ke Sathi',
  ],
  alternates: {
    canonical: 'https://yatraksathi.com/tours/varanasi-complete-tour-package',
  },
  openGraph: {
    title: 'Varanasi Complete Tour Package 4 Days 3 Nights | All Temples & Ghats | Yatra Ke Sathi',
    description:
      'The definitive Kashi experience — all temples, ghats, Sarnath, Ramnagar Fort & Vindhyachal in 4 days. Planned by locals.',
    url: 'https://yatraksathi.com/tours/varanasi-complete-tour-package',
    siteName: 'Yatra Ke Sathi',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596097825168-c9b773f404ff?w=1200&q=85&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Varanasi complete tour — ghats and temples',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varanasi Complete Tour Package 4 Days | Yatra Ke Sathi',
    description: 'All temples, ghats, Sarnath, Ramnagar Fort & Vindhyachal — 4 days planned by locals.',
    images: ['https://images.unsplash.com/photo-1596097825168-c9b773f404ff?w=1200&q=85&auto=format&fit=crop'],
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
          { '@type': 'ListItem', position: 3, name: 'Varanasi Complete Tour Package', item: 'https://yatraksathi.com/tours/varanasi-complete-tour-package' },
        ],
      },
      {
        '@type': 'TouristTrip',
        name: 'Varanasi Complete Tour Package — 4 Days 3 Nights',
        description:
          'The complete Kashi experience — Sparsh Darshan, all major temples and ghats, Sarnath, Swarved Mandir, Ramnagar Fort and Vindhyachal 3 Devi Darshan. 4 days 3 nights, planned by locals.',
        url: 'https://yatraksathi.com/tours/varanasi-complete-tour-package',
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
