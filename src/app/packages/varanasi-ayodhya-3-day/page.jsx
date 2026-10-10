import PackagePage from '@/components/PackagePage'
import { PACKAGES_DATA } from '@/lib/packageData'

export const metadata = {
  title: 'Varanasi Ayodhya 3 Day Tour — Kashi Darshan & Ram Mandir | Yatra Ke Saathi',
  description: '3 Days / 2 Nights covering Kashi Vishwanath, Sarnath, Ram Janmabhoomi & Saryu Aarti. VIP darshan included. Starting ₹7,999/person.',
}

export default function VaranasiAyodhya3DayPage() {
  return <PackagePage pkg={PACKAGES_DATA['varanasi-ayodhya-3-day']} />
}
