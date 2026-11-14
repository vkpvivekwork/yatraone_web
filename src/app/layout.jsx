import './globals.css'

export const metadata = {
  title: 'Yatra Ke Sathi — Kashi Tours, Cabs, Boats & Hotels',
  description: 'Yatra Ke Sathi: tour packages, cabs, Ganga boat rides and hotels in Kashi (Varanasi), arranged by locals.',
  openGraph: {
    title: 'Yatra Ke Sathi — Kashi Tours, Cabs, Boats & Hotels',
    description: 'Tour packages, cabs, Ganga boat rides and hotels in Kashi (Varanasi), arranged by locals.',
    url: 'https://yatraksathi.com',
    siteName: 'Yatra Ke Sathi',
    images: [{ url: 'https://yatraksathi.com/images/yatra-k-sathi-logo.png', width: 1200, height: 400, alt: 'Yatra Ke Sathi' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://yatraksathi.com/images/yatra-k-sathi-logo.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
