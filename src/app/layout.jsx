import './globals.css'

export const metadata = {
  title: 'Yatra Ke Saathi — Kashi Tours, Cabs, Boats & Hotels',
  description: 'Yatra Ke Saathi: tour packages, cabs, Ganga boat rides and hotels in Kashi (Varanasi), arranged by locals.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
