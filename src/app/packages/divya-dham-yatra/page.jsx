import PackagePage from '@/components/PackagePage'
import { PACKAGES_DATA } from '@/lib/packageData'

export const metadata = {
  title: 'Divya Dham Yatra — Varanasi, Prayagraj, Ayodhya & Bodh Gaya | Yatra Ke Saathi',
  description: '5 Days / 4 Nights Golden Quadrilateral tour. Kashi Vishwanath, Triveni Sangam, Ram Janmabhoomi & Mahabodhi Temple. Starting ₹12,000/person.',
}

export default function DivyaDhamYatraPage() {
  return <PackagePage pkg={PACKAGES_DATA['divya-dham-yatra']} />
}
