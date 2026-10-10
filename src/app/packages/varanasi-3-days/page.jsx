import PackagePage from '@/components/PackagePage'
import { PACKAGES_DATA } from '@/lib/packageData'

export const metadata = {
  title: 'Varanasi 3 Days Itinerary — Temples, Ghats & Sarnath | Yatra Ke Saathi',
  description: '3-day Kashi itinerary covering Kashi Vishwanath, Kal Bhairav, Sankat Mochan, Sarnath, BHU and all major ghats. Complete day-by-day guide.',
}

export default function Varanasi3DaysPage() {
  return <PackagePage pkg={PACKAGES_DATA['varanasi-3-days']} />
}
