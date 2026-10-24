export const metadata = {
  title: 'Golden Triangle Tour — Varanasi · Prayagraj · Ayodhya | 5 Days 4 Nights | Yatra Ke Saathi',
  description:
    'Book the Golden Triangle pilgrimage — Varanasi, Prayagraj & Ayodhya in 5 Days / 4 Nights starting ₹6,999/person. Includes Kashi Vishwanath darshan, Triveni Sangam snan, Ram Mandir VIP passes, AC cab & hotel. Book via WhatsApp.',
  keywords: [
    'Golden Triangle Tour Varanasi',
    'Varanasi Prayagraj Ayodhya tour package',
    'Kashi Prayagraj Ayodhya 5 days',
    'Ram Mandir tour package',
    'Triveni Sangam tour',
    'Kashi Vishwanath darshan tour',
    'pilgrimage tour Varanasi',
    'Yatra Ke Saathi',
    'Varanasi tour package 5 days',
    'Golden Triangle pilgrimage India',
  ],
  openGraph: {
    title: 'Golden Triangle Tour — Varanasi · Prayagraj · Ayodhya | 5D/4N | Yatra Ke Saathi',
    description:
      'Sacred yatra covering Kashi Vishwanath, Triveni Sangam & Ram Mandir. Starting ₹6,999/person. AC cab, hotel, darshan passes included.',
    url: 'https://yatraksathi.com/golden-triangle',
    siteName: 'Yatra Ke Saathi',
    type: 'website',
    images: [
      {
        url: 'https://yatraksathi.com/images/background-theme1.jpg',
        width: 1200,
        height: 630,
        alt: 'Golden Triangle Tour — Varanasi Prayagraj Ayodhya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golden Triangle Tour | 5D/4N | Yatra Ke Saathi',
    description: 'Varanasi · Prayagraj · Ayodhya pilgrimage starting ₹6,999/person.',
  },
  alternates: {
    canonical: 'https://yatraksathi.com/golden-triangle',
  },
}

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/background-theme1.jpg" />
      {children}
    </>
  )
}
