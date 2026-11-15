export const metadata = {
  title: 'Varanasi Bike Tour — Kashi on Two Wheels 1 Day | Yatra Ke Sathi',
  description:
    'Explore Varanasi on a scooty or bike in 1 day — Assi Ghat sunrise, Sarnath, Ramnagar Fort, old city temples & Ganga Aarti. Self-ride from ₹999 or guided ride from ₹1,499. Book with Yatra Ke Sathi.',
  keywords: [
    'Varanasi bike tour',
    'Varanasi scooty tour',
    'Kashi on two wheels',
    'Varanasi self-ride tour',
    'Sarnath bike trip',
    'Varanasi 1 day bike ride',
    'Ramnagar Fort bike tour',
    'Varanasi guided bike tour',
    'bike rental Varanasi',
    'Yatra Ke Sathi',
  ],
  alternates: {
    canonical: 'https://yatraksathi.com/tours/varanasi-bike-tour',
  },
  openGraph: {
    title: 'Varanasi Bike Tour — Kashi on Two Wheels | Yatra Ke Sathi',
    description:
      'Explore Varanasi on a scooty in 1 day — Sarnath, Ramnagar Fort, old city temples & Ganga Aarti. Self-ride ₹999 or guided ₹1,499.',
    url: 'https://yatraksathi.com/tours/varanasi-bike-tour',
    siteName: 'Yatra Ke Sathi',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?w=1200&q=85&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Varanasi bike tour — Kashi streets on two wheels',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varanasi Bike Tour | Kashi on Two Wheels — 1 Day',
    description: 'Sarnath, Ramnagar Fort, temples & Ganga Aarti — explore Kashi on a scooty.',
    images: ['https://images.unsplash.com/photo-1561359313-0639aad49ca6?w=1200&q=85&auto=format&fit=crop'],
  },
}

export default function Layout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://yatraksathi.com' },
          { '@type': 'ListItem', position: 2, name: 'Tours', item: 'https://yatraksathi.com/tours' },
          { '@type': 'ListItem', position: 3, name: 'Varanasi Bike Tour', item: 'https://yatraksathi.com/tours/varanasi-bike-tour' },
        ],
      },
      {
        '@type': 'TouristTrip',
        name: 'Varanasi Bike Tour — Kashi on Two Wheels 1 Day',
        description: 'A 1-day guided or self-ride scooty tour of Varanasi covering Assi Ghat sunrise, Sarnath, Ramnagar Fort, old city temples and Ganga Aarti.',
        url: 'https://yatraksathi.com/tours/varanasi-bike-tour',
        touristType: ['Adventure', 'Cultural', 'Pilgrimage'],
        availableLanguage: ['English', 'Hindi'],
        provider: {
          '@type': 'TravelAgency',
          name: 'Yatra Ke Sathi',
          url: 'https://yatraksathi.com',
          telephone: '+919277472279',
          address: { '@type': 'PostalAddress', addressLocality: 'Varanasi', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
