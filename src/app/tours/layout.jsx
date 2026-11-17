export const metadata = {
  title: 'Varanasi Tour Packages — Kashi Darshan, Ayodhya & Prayagraj | Yatra Ke Sathi',
  description:
    'Book guided tour packages in Varanasi — 3-day Kashi darshan, complete Varanasi tour, Varanasi–Ayodhya–Prayagraj yatra and custom trips. Planned by locals.',
  keywords: [
    'Varanasi tour packages',
    'Kashi tour package',
    'Varanasi trip package',
    'Varanasi tour operator',
    'Varanasi Ayodhya Prayagraj tour',
    'Varanasi 3 days package',
    'Kashi darshan package',
    'guided tour Varanasi',
    'Kashi yatra package',
    'Yatra Ke Sathi',
  ],
  alternates: {
    canonical: 'https://yatraksathi.com/tours',
  },
  openGraph: {
    title: 'Varanasi Tour Packages | Kashi Darshan & Multi-city Yatras | Yatra Ke Sathi',
    description:
      'Guided Varanasi tour packages — 3-day Kashi darshan, complete tour, Ayodhya & Prayagraj yatra, and fully custom trips.',
    url: 'https://yatraksathi.com/tours',
    siteName: 'Yatra Ke Sathi',
    images: [
      {
        url: 'https://yatraksathi.com/YA%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%BEk%20SA%E0%A4%A5%E0%A5%80.png',
        width: 1200,
        height: 630,
        alt: 'Yatrak Sathi — Varanasi tour packages',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varanasi Tour Packages | Yatra Ke Sathi',
    description: 'Kashi darshan, Ayodhya & Prayagraj yatras — guided packages planned by locals.',
    images: ['https://yatraksathi.com/YA%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%BEk%20SA%E0%A4%A5%E0%A5%80.png'],
  },
}

export default function ToursLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yatraksathi.com' },
          { '@type': 'ListItem', position: 2, name: 'Tour Packages', item: 'https://yatraksathi.com/tours' },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Varanasi Tour Packages',
        description: 'Guided tour packages in Varanasi by Yatra Ke Sathi',
        url: 'https://yatraksathi.com/tours',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Varanasi Tour Package 3 Days 2 Nights', url: 'https://yatraksathi.com/tours/varanasi-tour-package-3-days-2-nights' },
          { '@type': 'ListItem', position: 2, name: 'Varanasi Complete Tour Package', url: 'https://yatraksathi.com/tours/varanasi-complete-tour-package' },
          { '@type': 'ListItem', position: 3, name: 'Varanasi Ayodhya Prayagraj Tour Package', url: 'https://yatraksathi.com/tours/varanasi-ayodhya-prayagraj-tour-package' },
          { '@type': 'ListItem', position: 4, name: 'Varanasi Temple Darshan', url: 'https://yatraksathi.com/tours/varanasi-temple-darshan' },
          { '@type': 'ListItem', position: 5, name: 'Subah-e-Banaras Heritage Walk', url: 'https://yatraksathi.com/tours/heritage-walk' },
        ],
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
