export const metadata = {
  title: 'Subah-e-Banaras Heritage Walk — Morning Ghat & Old City Walk in Varanasi | Yatra Ke Sathi',
  description:
    'Subah-e-Banaras: a 3-hour private morning heritage walk in Varanasi — Assi Ghat aarti, wrestling akhadas, Harishchandra Ghat, medieval galis, chai & kachori. Local guide. Starts 5:30 AM.',
  keywords: [
    'Varanasi morning walk',
    'Banaras heritage walk',
    'Kashi heritage walk',
    'Subah-e-Banaras',
    'Varanasi ghat walk',
    'morning walk Varanasi ghats',
    'old city walk Varanasi',
    'Varanasi guided walk',
    'Assi Ghat morning aarti walk',
    'Yatra Ke Sathi',
  ],
  alternates: {
    canonical: 'https://yatraksathi.com/tours/heritage-walk',
  },
  openGraph: {
    title: 'Subah-e-Banaras Heritage Walk — Morning Walk in Varanasi | Yatra Ke Sathi',
    description:
      'A 3-hour private morning walk through Varanasi\'s ghats and medieval lanes. Local guide, chai & kachori included. Starts 5:30 AM.',
    url: 'https://yatraksathi.com/tours/heritage-walk',
    siteName: 'Yatra Ke Sathi',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1634920540678-df0e179c5243?w=1200&q=85&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Varanasi old city morning heritage walk',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subah-e-Banaras Heritage Walk | Varanasi Morning Walk',
    description: '3-hour private morning walk — ghats, galis, chai & kachori. Local guide. Starts 5:30 AM.',
    images: ['https://images.unsplash.com/photo-1634920540678-df0e179c5243?w=1200&q=85&auto=format&fit=crop'],
  },
}

export default function HeritageWalkLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yatraksathi.com' },
          { '@type': 'ListItem', position: 2, name: 'Tour Packages', item: 'https://yatraksathi.com/tours' },
          { '@type': 'ListItem', position: 3, name: 'Subah-e-Banaras Heritage Walk', item: 'https://yatraksathi.com/tours/heritage-walk' },
        ],
      },
      {
        '@type': 'TouristTrip',
        name: 'Subah-e-Banaras — Morning Heritage Walk in Varanasi',
        description:
          'A 3-hour private guided morning walk through Varanasi\'s ghats and medieval lanes — Assi Ghat morning aarti, wrestling akhadas, Harishchandra Ghat, century-old galis, chai & kachori. Starts 5:00–5:30 AM.',
        url: 'https://yatraksathi.com/tours/heritage-walk',
        touristType: ['Pilgrimage', 'Cultural', 'Heritage'],
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
