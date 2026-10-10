export const metadata = {
  title: 'Kashi Pravesh — Luxury Spiritual Journeys',
  description: 'Curated luxury spiritual travel — private ghats, temple darshans, heritage stays and divine experiences.',
}

export default function Sample3Layout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:wght@300;400;500&family=Cinzel:wght@400;600&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
