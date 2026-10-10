export const metadata = {
  title: 'Yatra Ke Saathi — Teerth Yatra from Kashi',
  description: 'Spiritual yatras to Kashi, Ayodhya, Prayagraj, Ujjain, Vrindavan and Haridwar. Tour packages, cabs, boats and hotels arranged by locals.',
}

export default function Sample5Layout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Eczar:wght@500;600;700;800&family=Hind:wght@400;500;600&family=Kalam:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
