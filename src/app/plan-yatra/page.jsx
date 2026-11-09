import { Suspense } from 'react'
import BookingForm from './BookingForm'

export const metadata = {
  title: 'Plan Your Kashi Yatra — Book Tours, Boats, Cabs & Hotels | Yatra Ke Sathi',
  description: 'Plan your Varanasi / Kashi yatra online. Book tour packages, Ganga boat rides, cabs and hotel stays with Yatra Ke Sathi — arranged by locals. Free enquiry, reply within 2 hours.',
  keywords: 'varanasi tour booking, kashi yatra plan, varanasi boat ride book, kashi darshan tour, varanasi cab booking, yatra ke sathi',
}


export default function PlanYatraPage() {
  return (
    <Suspense fallback={null}>
      <BookingForm />
    </Suspense>
  )
}

