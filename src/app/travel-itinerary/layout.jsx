export const metadata = {
  title: 'Plan Your Custom Yatra — Yatra Ke Saathi',
  description: 'Build your custom teerth yatra itinerary. Pick your dhams, services and dates. We arrange everything.',
}

export default function TravelItineraryLayout({ children }) {
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
