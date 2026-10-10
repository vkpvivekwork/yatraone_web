import PackagePage from '@/components/PackagePage'
import { PACKAGES_DATA } from '@/lib/packageData'

export const metadata = {
  title: 'Golden Triangle Tour — Varanasi, Prayagraj & Ayodhya | Yatra Ke Saathi',
  description: '5 Days / 4 Nights tour covering Kashi Vishwanath, Triveni Sangam & Ram Janmabhoomi. Starting ₹6,000/person. Private cab, guided darshan & more.',
}

export default function GoldenTrianglePage() {
  return <PackagePage pkg={PACKAGES_DATA['golden-triangle']} />
}
