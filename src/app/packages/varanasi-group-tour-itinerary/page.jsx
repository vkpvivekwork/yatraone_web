import PackagePage from '@/components/PackagePage'
import { PACKAGES_DATA } from '@/lib/packageData'

export const metadata = {
  title: 'Varanasi Group Tour Package & Itinerary — Min 10 Persons | Yatra Ke Saathi',
  description: '2-day organised group tour of Varanasi. VIP Kashi Vishwanath darshan, Ganga Aarti, Sarnath & boat rides. AC Tempo Traveller to Volvo Coach available.',
}

export default function VaranasiGroupTourPage() {
  return <PackagePage pkg={PACKAGES_DATA['varanasi-group-tour-itinerary']} />
}
