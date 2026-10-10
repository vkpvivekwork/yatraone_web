import PackagePage from '@/components/PackagePage'
import { PACKAGES_DATA } from '@/lib/packageData'

export const metadata = {
  title: 'Varanasi 2 Days Tour Plan — Quick Kashi Darshan | Yatra Ke Saathi',
  description: '2-day Varanasi itinerary with Kashi Vishwanath, Ganga Aarti, Sarnath & more. Hotel options from ₹2,250/night. Ideal for a short pilgrimage.',
}

export default function Varanasi2DaysPage() {
  return <PackagePage pkg={PACKAGES_DATA['varanasi-2-days']} />
}
