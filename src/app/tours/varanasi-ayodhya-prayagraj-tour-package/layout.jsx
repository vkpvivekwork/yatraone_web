export const metadata = {
  title: 'Varanasi Ayodhya Prayagraj Tour Package 4 Days 3 Nights — Triveni Tirth Yatra | Yatra Ke Sathi',
  description:
    'Varanasi Ayodhya Prayagraj tour package — Kashi Vishwanath darshan, Ram Janmabhoomi Ayodhya & Triveni Sangam snan at Prayagraj. 4 days 3 nights. Book now.',
  keywords: [
    'Varanasi Ayodhya Prayagraj tour package',
    'Kashi Ayodhya Prayagraj yatra',
    'Varanasi Ayodhya tour package',
    'Prayagraj Varanasi tour',
    'Ram Janmabhoomi tour package',
    'Triveni Sangam tour',
    'Allahabad Varanasi tour package',
    'three holy cities tour India',
    'Kashi Ayodhya tour',
    'Mahakumbh Prayagraj tour',
    'Yatra Ke Sathi',
  ],
  alternates: {
    canonical: 'https://yatraksathi.com/tours/varanasi-ayodhya-prayagraj-tour-package',
  },
  openGraph: {
    title: 'Varanasi Ayodhya Prayagraj Tour Package | Triveni Tirth Yatra | Yatra Ke Sathi',
    description:
      'Three sacred cities in one yatra — Kashi Vishwanath, Ram Janmabhoomi & Triveni Sangam. 4 days 3 nights planned by locals.',
    url: 'https://yatraksathi.com/tours/varanasi-ayodhya-prayagraj-tour-package',
    siteName: 'Yatra Ke Sathi',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1200&q=85&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Varanasi Ayodhya Prayagraj tour — Triveni Tirth Yatra',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varanasi Ayodhya Prayagraj Tour Package | Yatra Ke Sathi',
    description: 'Kashi, Ayodhya & Prayagraj — three sacred cities in one yatra. 4 days planned by locals.',
    images: ['https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1200&q=85&auto=format&fit=crop'],
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
          { '@type': 'ListItem', position: 3, name: 'Varanasi Ayodhya Prayagraj Tour', item: 'https://yatraksathi.com/tours/varanasi-ayodhya-prayagraj-tour-package' },
        ],
      },
      {
        '@type': 'TouristTrip',
        name: 'Varanasi Ayodhya Prayagraj Tour Package — Triveni Tirth Yatra',
        description:
          'Three sacred cities in one yatra — Kashi Vishwanath darshan in Varanasi, Ram Janmabhoomi in Ayodhya, and Triveni Sangam snan in Prayagraj. 4 days 3 nights, planned by locals.',
        url: 'https://yatraksathi.com/tours/varanasi-ayodhya-prayagraj-tour-package',
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
