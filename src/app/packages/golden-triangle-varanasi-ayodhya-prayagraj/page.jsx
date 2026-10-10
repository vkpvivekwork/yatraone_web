import PackagePage from '@/components/PackagePage'
import { PACKAGES_DATA } from '@/lib/packageData'

export const metadata = {
  title: 'Golden Triangle Tour — Varanasi, Ayodhya & Prayagraj (4 Days) | Yatra Ke Saathi',
  description: '4 Days / 3 Nights covering Kashi Vishwanath, Sarnath, Triveni Sangam & Ram Janmabhoomi. A complete spiritual circuit of Uttar Pradesh.',
}

export default function GoldenTriangle4DPage() {
  return <PackagePage pkg={PACKAGES_DATA['golden-triangle-varanasi-ayodhya-prayagraj']} />
}
