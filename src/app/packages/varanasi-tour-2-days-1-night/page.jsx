import PackagePage from '@/components/PackagePage'
import { PACKAGES_DATA } from '@/lib/packageData'

export const metadata = {
  title: 'Varanasi Tour 2 Days 1 Night — Compact Kashi Experience | Yatra Ke Saathi',
  description: 'Compact 2-day 1-night Varanasi tour. Ganga Aarti, Kashi Vishwanath, Sarnath, Banarasi street food & shopping. Private AC transport included.',
}

export default function Varanasi2D1NPage() {
  return <PackagePage pkg={PACKAGES_DATA['varanasi-tour-2-days-1-night']} />
}
