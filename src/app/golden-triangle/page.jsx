'use client'
import { useState, useEffect, useRef } from 'react'

const WA_NUMBER = '919277472279'
const WA_BASE   = `https://wa.me/${WA_NUMBER}`
const TEL       = `tel:+${WA_NUMBER}`
const GRAIN     = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const WA_QUOTE  = `${WA_BASE}?text=${encodeURIComponent('Namaste! I am interested in the Golden Triangle Tour (Varanasi · Prayagraj · Ayodhya) — 5 Days / 4 Nights. Please share the itinerary and pricing.')}`
const WA_STD    = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Standard Package (₹6,999/person) for the Golden Triangle Tour — 5D/4N Varanasi · Prayagraj · Ayodhya.')}`
const WA_PRE    = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Premium Package (₹11,999/person) for the Golden Triangle Tour — 5D/4N Varanasi · Prayagraj · Ayodhya.')}`

/* ══ DATA ══════════════════════════════════════════════════ */

const ROUTE = [
  { city: 'Varanasi',  hi: 'काशी',        nights: '2 Nights', days: 'Day 1 – 2' },
  { city: 'Prayagraj', hi: 'प्रयागराज',   nights: '1 Night',  days: 'Day 2 – 3' },
  { city: 'Ayodhya',   hi: 'अयोध्या',     nights: '1 Night',  days: 'Day 3 – 4' },
]

const WHO_FOR = [
  {
    icon: '🙏',
    title: 'Solo Pilgrims',
    desc: 'We pair you with groups leaving the same day. Pandit booking, room sharing — everything pre-arranged so you travel alone but never feel alone.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Families & Groups',
    desc: 'Veg-only meals on request, child-friendly pace, and dedicated rooms for elders. Best value at 4+ persons — customised at every step.',
  },
  {
    icon: '🧓',
    title: 'Senior Citizens',
    desc: 'Wheelchair access at ghats, porter support, priority darshan queues and AC rest stops — we pace the journey for your ease and comfort.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', icon: '💬', title: 'WhatsApp Us',            desc: 'Send your travel dates & group size. No payment needed — just a free conversation.' },
  { step: '02', icon: '📋', title: 'Receive Custom Quote',   desc: 'Within hours we share a detailed itinerary, hotel names and transparent all-in pricing.' },
  { step: '03', icon: '✅', title: 'Book with 50% Advance',  desc: 'Lock your dates with 50% advance. Remaining 50% is paid on Day 1 at hotel check-in.' },
  { step: '04', icon: '🚗', title: 'We Handle Everything',   desc: 'Cab, hotel, darshan passes, boat, guide — you just arrive and experience the sacred journey.' },
]

const DAYS = [
  {
    day: 1, city: 'Varanasi', title: 'Arrival in Varanasi — Ganga Aarti & Ancient Temples',
    activities: [
      'Arrival in Varanasi — hotel check-in',
      'Kashi Vishwanath Temple darshan',
      'Kal Bhairav Temple & Annapurna Devi darshan',
      'Explore Vishwanath Gali & Banarasi silk market',
      'Evening Ganga Aarti at Dashashwamedh Ghat',
      'Boat ride on the Ganges at dusk',
      'Overnight stay in Varanasi',
    ],  
    photos: [
      { id: '1627894483216-2138af692e32', alt: 'Ganga Aarti · Dashashwamedh Ghat' },
      { id: '1665413791167-6718dcf36773', alt: 'Kashi Vishwanath Temple' },
      { id: '1608412525537-662195e817c5', alt: 'Varanasi Ghats at dusk' },
    ],
  },
  {
    day: 2, city: 'Varanasi → Prayagraj', title: 'Sarnath, Sangam & Triveni Boat Ride',
    activities: [
      'Sunrise boat ride on the River Ganga',
      'Sarnath — Dhamek Stupa, Deer Park & Ashoka Pillar',
      'Drive to Prayagraj (~3 hrs)',
      'Triveni Sangam — holy dip at the confluence of three rivers',
      'Sangam boat ride — Ganga, Yamuna & Saraswati',
      'Anand Bhawan heritage museum',
      'Overnight stay in Prayagraj',
    ],
    photos: [
      { id: '1649876674933-a5b3b39b4da1', alt: 'Sarnath · Dhamek Stupa' },
      { id: '1596097825168-c9b773f404ff', alt: 'Triveni Sangam · Prayagraj' },
      { id: '1571536802807-30451e3955d8', alt: 'Boat ride at Sangam' },
    ],
  },
  {
    day: 3, city: 'Prayagraj → Ayodhya', title: 'Ram Janmabhoomi & Saryu Aarti',
    activities: [
      'Drive to Ayodhya (~2.5 hrs)',
      'Ram Janmabhoomi — darshan at the grand new Ram Mandir',
      'Hanumangarhi Temple darshan',
      'Kanak Bhawan & Dasharath Mahal',
      'Ramkatha Park — immersive Ramayana experience',
      'Evening Saryu Aarti at Ram Ki Paidi Ghat',
      'Overnight stay in Ayodhya',
    ],
    photos: [
      { id: '1613445607898-f46e51645acf', alt: 'Ram Mandir · Ayodhya' },
      { id: '1634920540678-df0e179c5243', alt: 'Kanak Bhawan · Ayodhya' },
      { id: '1599831069477-b2acdc0bcb91', alt: 'Saryu Aarti · Ayodhya' },
    ],
  },
  {
    day: 4, city: 'Ayodhya', title: 'Morning Temples & Departure',
    activities: [
      'Morning darshan at Nageshwarnath Temple',
      "Guptar Ghat — Lord Ram's final journey site",
      'Ram Ki Paidi ghats walk at sunrise',
      "Taste Ayodhya's famous pedas & jalebi for breakfast",
      'Drive back to Varanasi or direct departure',
      'Tour concludes — carry blessings & memories',
    ],
    photos: [
      { id: '1599831069477-b2acdc0bcb91', alt: 'Saryu Ghats · morning' },
      { id: '1613445607898-f46e51645acf', alt: 'Ram Mandir spire' },
      { id: '1561359313-0639aad49ca6', alt: 'Departure · Ayodhya' },
    ],
  },
]

const ACTIVITIES = [
  { en: 'Kashi Vishwanath Darshan',     photo: '1665413791167-6718dcf36773' },
  { en: 'Ganga Aarti at Dashashwamedh', photo: '1627894483216-2138af692e32' },
  { en: 'Sunrise Boat Ride · Ganga',    photo: '1571536802807-30451e3955d8' },
  { en: 'Sarnath · Dhamek Stupa',       photo: '1649876674933-a5b3b39b4da1' },
  { en: 'Triveni Sangam Holy Dip',      photo: '1596097825168-c9b773f404ff' },
  { en: 'Ram Janmabhoomi Darshan',      photo: '1613445607898-f46e51645acf' },
  { en: 'Hanumangarhi · Kanak Bhawan', photo: '1634920540678-df0e179c5243' },
  { en: 'Saryu Ghat Evening Aarti',     photo: '1599831069477-b2acdc0bcb91' },
]

const STD = {
  label: 'Standard',
  price: '₹6,999',
  note: 'per person · Min 2 Pax',
  inclusions: [
    '3-Star Hotel (4 nights, twin sharing)',
    'AC Car — all transfers & sightseeing',
    'Kashi Vishwanath Darshan passes',
    'Private Ganga Aarti boat ride',
    'Sangam boat ride · Prayagraj',
    'Local expert guide in Varanasi',
    'All toll, parking & driver allowance',
  ],
  exclusions: [
    'Train / flight tickets',
    'Meals (breakfast, lunch, dinner)',
    'Mangala Aarti & Shayan Aarti passes',
    'Personal expenses',
  ],
}

const PRE = {
  label: 'Premium',
  price: '₹11,999',
  note: 'per person · Min 2 Pax',
  inclusions: [
    '4-Star Hotel (4 nights, twin sharing)',
    'AC Innova / Crysta — all transfers',
    'Daily breakfast included',
    'Kashi Vishwanath Mangala / Shayan Aarti',
    'Private front-row Ganga Aarti boat',
    'Ram Mandir VIP Darshan passes',
    'Sangam special sunrise boat ride',
    'Expert guide — all 3 cities',
    'Pickup & drop from station/airport',
    'All toll, parking & driver allowance',
  ],
  exclusions: [
    'Train / flight tickets',
    'Lunch & dinner',
    'Personal expenses',
  ],
}

const INCLUSIONS = [
  { icon: '🚗', title: 'AC Cab',          desc: 'Private cab for all transfers & sightseeing' },
  { icon: '🏨', title: '4-Night Hotel',   desc: 'Twin sharing, curated hotels near temples' },
  { icon: '🍳', title: 'Daily Breakfast', desc: 'Served at hotel each morning (Premium)' },
  { icon: '🛶', title: 'Boat Rides',      desc: 'Ganga Aarti boat + Sangam boat ride' },
  { icon: '🧭', title: 'Local Guide',     desc: 'Expert guide in Varanasi' },
  { icon: '🅿️', title: 'All Charges',    desc: 'Toll, parking & driver allowance' },
]

const TRIP_DIARIES = [
  { name: 'Ganga Aarti · Dashashwamedh', photo: '1627894483216-2138af692e32', stars: 5 },
  { name: 'Ram Mandir · Ayodhya',         photo: '1613445607898-f46e51645acf', stars: 5 },
  { name: 'Triveni Sangam · Prayagraj',   photo: '1596097825168-c9b773f404ff', stars: 5 },
  { name: 'Sarnath · Dhamek Stupa',       photo: '1649876674933-a5b3b39b4da1', stars: 5 },
  { name: 'Sunrise Boat Ride · Ganga',    photo: '1571536802807-30451e3955d8', stars: 5 },
  { name: 'Kashi Vishwanath Temple',      photo: '1665413791167-6718dcf36773', stars: 5 },
]

const REVIEWS = [
  { name: 'Priya Verma',    city: 'Mumbai',    stars: 5, text: 'The Ganga Aarti arrangements were flawless. Our driver knew every shortcut and the hotel was spotless. Will return for Kumbh.' },
  { name: 'Ramesh Agarwal', city: 'Jaipur',    stars: 5, text: 'My elderly parents did Ram Mandir darshan comfortably. No rush, no crowd stress. A truly trustworthy team.' },
  { name: 'Sunita Devi',    city: 'Delhi',     stars: 5, text: 'Triveni Sangam sunrise boat ride was the highlight of my life. Everything on time, guide was deeply knowledgeable.' },
  { name: 'Vikram Singh',   city: 'Lucknow',   stars: 5, text: 'Booked for family of 6. Exact price as quoted, zero hidden charges. 100% recommend Yatra Ke Saathi.' },
  { name: 'Anita Sharma',   city: 'Ahmedabad', stars: 5, text: 'Travelled solo — they paired me with a group instantly. Felt completely safe. The VIP darshan pass saved 2+ hours of queue.' },
]

const FAQS = [
  {
    q: 'What is the duration of this tour?',
    a: 'This is a 5-Day / 4-Night tour. Day 1–2 in Varanasi, Day 2–3 in Prayagraj, Day 3–4 in Ayodhya, with departure on Day 4/5.',
  },
  {
    q: 'Is there a minimum group size?',
    a: 'Minimum 2 persons required. For solo travellers, contact us on WhatsApp — we accommodate based on availability.',
  },
  {
    q: 'Are train or flight tickets included?',
    a: 'No. Train / flight tickets to and from Varanasi are not included. The package covers all local transport between cities.',
  },
  {
    q: 'Can the itinerary be customised?',
    a: 'Absolutely. Reach out on WhatsApp with your dates, group size and preferences — we will craft a personalised plan.',
  },
  {
    q: 'What is the booking process?',
    a: '50% advance at booking, remaining 50% on arrival. No advance payment needed just to get a quote — message us first.',
  },
  {
    q: 'Is this tour suitable for senior citizens?',
    a: 'Yes. We offer a senior-friendly pace with wheelchair access at key ghats, porter support, and priority darshan arrangements.',
  },
  {
    q: 'What languages do your guides speak?',
    a: 'Our guides speak Hindi and English fluently. For regional languages, please mention it while enquiring.',
  },
]

/* ── Vintage torn-paper SVG background for the form ───── */
function generateTornPaperSVG() {
  const W = 600, H = 760
  let seed = 21
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const r = (a, b) => a + rand() * (b - a)

  const corners = [0, 1, 2, 3].map(() => rand() < 0.75
    ? { span: r(28, 70), slope: r(0.6, 1.5) } : { span: r(4, 10), slope: 1 })

  function edge(x1, y1, x2, y2, nx, ny, cStart, cEnd, skipStart = 0, skipEnd = 0) {
    const len = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len
    const shelves = []; let s = 0
    while (s < len) {
      const w = r(25, 120), k = rand()
      shelves.push({ from: s, to: s + w, depth: k < 0.3 ? r(18, 34) : k < 0.65 ? r(8, 18) : r(0, 7) })
      s += w
    }
    const shelfAt = t => shelves.find(sh => t >= sh.from && t < sh.to) || shelves[shelves.length - 1]
    const bites = []; let b = r(25, 70)
    while (b < len - 30) {
      if (rand() < 0.75) bites.push({ at: b, w: r(14, 55), depth: r(20, 46), skew: r(-0.5, 0.5) })
      b += r(55, 140)
    }
    const rips = []; let q = r(60, 160)
    while (q < len - 50) {
      if (rand() < 0.5) rips.push({ at: q, depth: r(35, 85), lean: r(-18, 18), w: r(3, 7) })
      q += r(120, 260)
    }
    const pts = []; let t = 0, depth = shelfAt(0).depth
    while (t <= len) {
      const target = shelfAt(t).depth
      depth += (target - depth) * 0.3
      let off = depth + r(0, 3.5)
      if (rand() < 0.12) off += r(3, 9)
      const bite = bites.find(bt => t >= bt.at && t <= bt.at + bt.w)
      if (bite) {
        const f = (t - bite.at) / bite.w
        const shape = Math.sin(Math.PI * Math.min(1, f * 1.4)) * (1 + bite.skew * (f - 0.5))
        off = Math.max(off, bite.depth * Math.min(1, shape * 1.6) + r(-4, 4))
      }
      if (len - t < Math.max(cEnd.span * cEnd.slope, skipEnd)) break
      if (t < skipStart) { t += r(1.5, 3.5); continue }
      if (t < cStart.span) off = Math.max(off, (cStart.span - t) * cStart.slope + r(-2, 4))
      pts.push([x1 + ux * t + nx * off, y1 + uy * t + ny * off])
      if (pts.length === 1) pts.firstOff = off
      pts.lastOff = off
      const rip = rips.find(rp => t <= rp.at && t + 4 > rp.at)
      if (rip) {
        const bx = x1 + ux * t, by = y1 + uy * t
        rip.depth = off + rip.depth * 0.75
        const steps = 5
        for (let i = 1; i <= steps; i++) {
          const f = i / steps
          pts.push([bx + ux * (rip.lean * f + r(-2, 2)) + nx * (off + (rip.depth - off) * f),
                    by + uy * (rip.lean * f + r(-2, 2)) + ny * (off + (rip.depth - off) * f)])
        }
        for (let i = steps - 1; i >= 0; i--) {
          const f = i / steps
          pts.push([bx + ux * (rip.lean * f + rip.w * (1 - f * 0.7) + r(-1.5, 1.5)) + nx * (off + (rip.depth - off) * f),
                    by + uy * (rip.lean * f + rip.w * (1 - f * 0.7) + r(-1.5, 1.5)) + ny * (off + (rip.depth - off) * f)])
        }
        t += rip.w + 1; continue
      }
      t += r(1.5, 3.5)
    }
    return pts
  }

  const m = 3
  const top    = edge(m, m, W - m, m, 0, 1, corners[0], corners[1])
  const right  = edge(W - m, m, W - m, H - m, -1, 0, corners[1], corners[2], top.lastOff + 2)
  const bottom = edge(W - m, H - m, m, H - m, 0, -1, corners[2], corners[3], right.lastOff + 2)
  const left   = edge(m, H - m, m, m, 1, 0, corners[3], corners[0], bottom.lastOff + 2, top.firstOff + 2)
  const pts = [...top, ...right, ...bottom, ...left]
  const d = 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + ' Z'

  let stains = ''
  for (let i = 0; i < 26; i++) {
    const side = Math.floor(r(0, 4))
    let cx = r(0, W), cy = r(0, H)
    const inset = r(0, 70)
    if (side === 0) cy = inset; else if (side === 1) cx = W - inset
    else if (side === 2) cy = H - inset; else cx = inset
    stains += `<ellipse cx="${cx}" cy="${cy}" rx="${r(20, 70)}" ry="${r(15, 55)}" fill="#c98a45" opacity="${r(0.08, 0.2)}" filter="url(#tp-soft)"/>`
  }
  for (let i = 0; i < 6; i++) {
    stains += `<ellipse cx="${r(80, W - 80)}" cy="${r(80, H - 80)}" rx="${r(25, 60)}" ry="${r(20, 50)}" fill="#d9a060" opacity="${r(0.04, 0.09)}" filter="url(#tp-soft)"/>`
  }

  let creases = ''
  function crease(x, y, ang, segs, depth) {
    let pd = `M${x.toFixed(1)} ${y.toFixed(1)}`
    for (let i = 0; i < segs; i++) {
      ang += r(-0.45, 0.45)
      const l = r(10, 32)
      x += Math.cos(ang) * l; y += Math.sin(ang) * l
      pd += ` L${x.toFixed(1)} ${y.toFixed(1)}`
      if (depth < 2 && rand() < 0.18) crease(x, y, ang + r(-1.2, 1.2), Math.floor(r(2, 5)), depth + 1)
    }
    const o = r(0.25, 0.5)
    creases += `<path d="${pd}" stroke="#fff4dc" stroke-width="${r(0.6, 1.3).toFixed(2)}" opacity="${o.toFixed(2)}" fill="none" stroke-linejoin="round"/>`
    creases += `<path d="${pd}" transform="translate(0.9 0.9)" stroke="#a87440" stroke-width="0.6" opacity="${(o * 0.35).toFixed(2)}" fill="none" stroke-linejoin="round"/>`
  }
  for (let i = 0; i < 55; i++) {
    crease(r(0, W), r(0, H), r(0, Math.PI * 2), Math.floor(r(3, 9)), 0)
  }

  return `<svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="tp-tear"><path d="${d}"/></clipPath><radialGradient id="tp-base" cx="52%" cy="48%" r="70%"><stop offset="0%" stop-color="#ffe9bf"/><stop offset="45%" stop-color="#fce1b2"/><stop offset="78%" stop-color="#f0c993"/><stop offset="100%" stop-color="#e3b073"/></radialGradient><linearGradient id="tp-sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="45%" stop-color="#fff6e0" stop-opacity="0.35"/><stop offset="60%" stop-color="#fff" stop-opacity="0"/></linearGradient><filter id="tp-crumple" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.018 0.024" numOctaves="4" seed="5" result="n"/><feDiffuseLighting in="n" surfaceScale="2.2" lighting-color="#ffffff"><feDistantLight azimuth="225" elevation="62"/></feDiffuseLighting><feColorMatrix type="matrix" values="1 0 0 0 0  0 0.92 0 0 0  0 0 0.8 0 0  0 0 0 1 0"/></filter><filter id="tp-wrinkle" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" seed="13" result="n"/><feDiffuseLighting in="n" surfaceScale="1.2" lighting-color="#ffffff"><feDistantLight azimuth="225" elevation="70"/></feDiffuseLighting></filter><filter id="tp-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.36  0 0 0 0 0.15  0 0 0 0.5 0"/></filter><filter id="tp-blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="11"/><feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.52  0 0 0 0 0.24  1.6 0 0 0 -0.7"/></filter><filter id="tp-patchy" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.2 0 0 0 -0.6"/></filter><mask id="tp-patchMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" filter="url(#tp-patchy)"/></mask><filter id="tp-fray" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="2" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="tp-edgeGlow"><feGaussianBlur stdDeviation="10"/></filter><filter id="tp-rim"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="tp-soft"><feGaussianBlur stdDeviation="12"/></filter></defs><g filter="url(#tp-fray)"><g clip-path="url(#tp-tear)"><rect width="${W}" height="${H}" fill="url(#tp-base)"/><rect width="${W}" height="${H}" filter="url(#tp-blotch)" opacity="0.35"/>${stains}<rect width="${W}" height="${H}" filter="url(#tp-crumple)" opacity="0.18" style="mix-blend-mode:multiply"/><rect width="${W}" height="${H}" filter="url(#tp-wrinkle)" opacity="0.07" style="mix-blend-mode:multiply"/>${creases}<rect width="${W}" height="${H}" fill="url(#tp-sheen)"/><rect width="${W}" height="${H}" filter="url(#tp-grain)" opacity="0.28"/><path d="${d}" fill="none" stroke="#d6a466" stroke-width="50" opacity="0.4" filter="url(#tp-edgeGlow)"/><path d="${d}" fill="none" stroke="#d29a55" stroke-width="80" opacity="0.38" filter="url(#tp-edgeGlow)" mask="url(#tp-patchMask)"/><path d="${d}" fill="none" stroke="#c0843c" stroke-width="26" opacity="0.4" filter="url(#tp-rim)" mask="url(#tp-patchMask)"/><path d="${d}" fill="none" stroke="#b3773a" stroke-width="5" opacity="0.55" filter="url(#tp-rim)"/><path d="${d}" fill="none" stroke="#9a6128" stroke-width="1.4" opacity="0.35"/><path d="${d}" fill="none" stroke="#fff1d6" stroke-width="2.6" opacity="0.55" stroke-dasharray="14 6 30 4 8 10" mask="url(#tp-patchMask)"/></g></g></svg>`
}
const TORN_PAPER_SVG = generateTornPaperSVG()

/* ══ SUB-COMPONENTS ════════════════════════════════════════ */

function WaIcon({ size = 20, color = '#FAF5E0' }) {
  return (
    <svg viewBox="0 0 32 32" fill={color} style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 17.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  )
}

function GoldRule({ margin = '20px 0' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} />
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#C49225">
        <path d="M12 2l1.8 5.4H20l-4.9 3.6 1.8 5.4L12 13l-4.9 3.4 1.8-5.4L4 7.4h6.2z" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} />
    </div>
  )
}

function TempleSkyline({ fill = '#C49225', opacity = 1 }) {
  return (
    <svg viewBox="0 0 1200 160" preserveAspectRatio="xMidYMax meet"
      style={{ width: '100%', display: 'block', pointerEvents: 'none' }} aria-hidden="true">
      <g fill={fill} opacity={opacity}>
        <rect x="0" y="148" width="1200" height="14" />
        <rect x="30" y="120" width="50" height="28" /><polygon points="55,82 30,120 80,120" /><polygon points="55,62 43,82 67,82" /><rect x="52" y="50" width="6" height="13" /><circle cx="55" cy="47" r="5" />
        <rect x="108" y="132" width="28" height="17" /><polygon points="122,114 108,132 136,132" /><rect x="120" y="107" width="4" height="8" /><circle cx="122" cy="104" r="3.5" />
        <rect x="165" y="110" width="62" height="38" /><polygon points="196,68 165,110 227,110" /><polygon points="196,48 180,68 212,68" /><polygon points="196,32 186,48 206,48" /><rect x="193" y="20" width="6" height="13" /><circle cx="196" cy="17" r="5.5" /><rect x="158" y="142" width="76" height="6" />
        <rect x="262" y="128" width="44" height="20" /><ellipse cx="284" cy="128" rx="22" ry="13" /><rect x="282" y="114" width="4" height="15" /><circle cx="284" cy="111" r="4" />
        <rect x="330" y="116" width="18" height="32" /><rect x="390" y="116" width="18" height="32" /><rect x="330" y="101" width="78" height="17" /><polygon points="369,71 330,101 408,101" /><rect x="366" y="58" width="6" height="14" /><circle cx="369" cy="55" r="5" />
        <rect x="502" y="98" width="82" height="50" /><polygon points="543,50 502,98 584,98" /><polygon points="543,28 525,50 561,50" /><polygon points="543,12 534,28 552,28" /><rect x="540" y="0" width="6" height="13" /><circle cx="543" cy="-2" r="6" /><rect x="498" y="112" width="16" height="36" /><rect x="568" y="112" width="16" height="36" /><rect x="492" y="142" width="102" height="6" />
        <rect x="728" y="114" width="56" height="34" /><polygon points="756,74 728,114 784,114" /><polygon points="756,56 742,74 770,74" /><rect x="754" y="44" width="5" height="13" /><circle cx="756" cy="41" r="4.5" /><rect x="724" y="128" width="12" height="20" /><rect x="786" y="128" width="12" height="20" />
        <rect x="882" y="120" width="16" height="28" /><rect x="936" y="120" width="16" height="28" /><rect x="882" y="107" width="70" height="15" /><polygon points="917,80 882,107 952,107" /><rect x="914" y="67" width="6" height="14" /><circle cx="917" cy="64" r="5" />
        <rect x="1044" y="116" width="54" height="32" /><polygon points="1071,76 1044,116 1098,116" /><polygon points="1071,58 1057,76 1085,76" /><rect x="1068" y="46" width="6" height="13" /><circle cx="1071" cy="43" r="5" />
        <rect x="1122" y="130" width="34" height="18" /><polygon points="1139,110 1122,130 1156,130" /><rect x="1137" y="102" width="4" height="9" /><circle cx="1139" cy="99" r="3.5" />
      </g>
    </svg>
  )
}

function VintagePhoto({ id, alt }) {
  return (
    <div style={{
      background: '#FAF5E0', padding: '5px 5px 20px',
      boxShadow: '0 6px 20px rgba(43,26,14,.3), inset 0 0 0 1px rgba(196,146,37,.35)',
      borderRadius: '2px', position: 'relative',
    }}>
      <div style={{ overflow: 'hidden', aspectRatio: '1', background: '#E8D8A0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={U(id, 380)} alt={alt} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{
        position: 'absolute', bottom: '3px', left: '5px', right: '5px',
        textAlign: 'center', fontSize: '.65rem', color: '#8B5E1A',
        fontFamily: "'Kalam',cursive", overflow: 'hidden',
        whiteSpace: 'nowrap', textOverflow: 'ellipsis',
      }}>{alt}</div>
    </div>
  )
}

function DayCard({ d }) {
  return (
    <div style={{
      borderRadius: '5px', overflow: 'hidden',
      border: '1.5px solid rgba(196,146,37,.4)',
      boxShadow: '0 8px 36px rgba(43,26,14,.18), 0 1px 0 rgba(250,245,224,.9) inset',
    }}>
      <div style={{
        background: 'linear-gradient(105deg,#FAF0CC 0%,#EDD690 55%,#FAF0CC 100%)',
        backgroundImage: GRAIN,
        display: 'flex', alignItems: 'stretch',
        position: 'relative', overflow: 'hidden',
        borderBottom: '2px solid rgba(196,146,37,.5)',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minWidth: '100px',
          borderRight: '2px dashed rgba(90,63,40,.25)',
          padding: '20px 14px', flexShrink: 0,
        }}>
          <span style={{ fontFamily: "'Mukta',sans-serif", fontWeight: 700, fontSize: '.66rem', letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B5E1A', marginBottom: '2px' }}>DAY</span>
          <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.8rem,7vw,4.8rem)', color: '#5A3F28', lineHeight: 1, letterSpacing: '-3px' }}>{d.day}</span>
        </div>
        <div style={{ padding: '20px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: "'Mukta',sans-serif", fontWeight: 700, fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#B5421A', marginBottom: '5px' }}>{d.city}</div>
          <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 600, fontSize: 'clamp(.95rem,2.4vw,1.25rem)', color: '#5A3F28', lineHeight: 1.25 }}>{d.title}</div>
        </div>
        <div style={{ position: 'absolute', top: '9px', right: '14px', fontSize: '1.2rem', opacity: .3, color: '#8B5E1A', fontFamily: "'Tiro Devanagari Hindi',serif" }}>ॐ</div>
      </div>
      <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, padding: '24px 28px 30px' }}>
        <GoldRule margin="0 0 16px" />
        <ul style={{ listStyle: 'none', marginBottom: '26px' }}>
          {d.activities.map((act, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '10px',
              padding: '5px 0', fontFamily: "'Mukta',sans-serif",
              fontSize: 'clamp(.92rem,1.8vw,1.02rem)', fontWeight: 600,
              color: '#2B1A0E', lineHeight: 1.45,
              borderBottom: i < d.activities.length - 1 ? '1px solid rgba(196,146,37,.2)' : 'none',
            }}>
              <span style={{ color: '#B5421A', fontSize: '.8rem', marginTop: '4px', flexShrink: 0 }}>◆</span>
              {act}
            </li>
          ))}
        </ul>
        <GoldRule margin="0 0 20px" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {d.photos.map((p, i) => <VintagePhoto key={i} id={p.id} alt={p.alt} />)}
        </div>
      </div>
    </div>
  )
}

function FaqItem({ faq, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      background: '#FAF0CC', backgroundImage: GRAIN,
      border: '1.5px solid rgba(196,146,37,.4)',
      borderRadius: '4px', overflow: 'hidden',
      boxShadow: '0 3px 12px rgba(43,26,14,.1)',
    }}>
      <button onClick={() => setOpen(v => !v)} aria-expanded={open} style={{
        width: '100%', textAlign: 'left',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
        padding: '16px 20px', cursor: 'pointer', border: 'none', background: 'transparent',
        fontFamily: "'Mukta',sans-serif", fontWeight: 700,
        fontSize: 'clamp(.95rem,1.8vw,1.05rem)', color: '#2B1A0E', lineHeight: 1.4,
      }}>
        <span>{faq.q}</span>
        <span style={{
          flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%',
          background: open ? '#B5421A' : '#C49225',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#FAF5E0', fontSize: '.85rem', fontWeight: 900, transition: 'background .2s',
        }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{
          padding: '14px 20px 18px',
          fontFamily: "'Mukta',sans-serif", fontSize: '.97rem',
          color: '#4A2E12', lineHeight: 1.65,
          borderTop: '1px solid rgba(196,146,37,.3)',
        }}>{faq.a}</div>
      )}
    </div>
  )
}

function PkgCard({ data, waLink }) {
  const isPremium = data.label === 'Premium'
  return (
    <div style={{
      flex: 1, minWidth: '280px',
      background: '#FAF0CC', backgroundImage: GRAIN,
      border: isPremium ? '2px solid #B5421A' : '1.5px solid rgba(196,146,37,.45)',
      borderRadius: '5px', padding: '32px 26px 26px',
      position: 'relative',
      boxShadow: isPremium ? '0 10px 36px rgba(181,66,26,.22)' : '0 6px 24px rgba(43,26,14,.14)',
    }}>
      <div style={{
        position: 'absolute', top: '-14px', left: '24px',
        background: isPremium ? '#B5421A' : '#7A5018',
        color: '#FAF5E0', borderRadius: '3px',
        padding: '3px 16px', fontSize: '.76rem',
        fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
        boxShadow: '0 2px 8px rgba(0,0,0,.25)',
      }}>{isPremium ? 'BEST VALUE' : 'STANDARD'}</div>
      <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '1.3rem', color: '#2B1A0E', marginBottom: '4px' }}>{data.label} Package</div>
      <GoldRule margin="10px 0 12px" />
      <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: '2.4rem', fontWeight: 900, color: '#B5421A', lineHeight: 1, marginBottom: '4px' }}>{data.price}/-</div>
      <div style={{ fontSize: '.85rem', color: '#8B5E1A', marginBottom: '22px' }}>{data.note}</div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontWeight: 700, color: '#3A6B2E', fontSize: '.88rem', marginBottom: '8px' }}>✔ What&apos;s Included</div>
        {data.inclusions.map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '5px 0', borderBottom: '1px dashed rgba(58,107,46,.2)', fontSize: '.9rem' }}>
            <span style={{ color: '#3A6B2E', flexShrink: 0, marginTop: '2px' }}>✔</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontWeight: 700, color: '#8B2020', fontSize: '.88rem', marginBottom: '8px' }}>✖ Not Included</div>
        {data.exclusions.map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '5px 0', borderBottom: '1px dashed rgba(139,32,32,.18)', fontSize: '.9rem' }}>
            <span style={{ color: '#8B2020', flexShrink: 0, marginTop: '2px' }}>✖</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <a href={waLink} target="_blank" rel="noopener" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        background: isPremium ? 'linear-gradient(135deg,#B5421A,#7A2E0E)' : 'linear-gradient(135deg,#7A5018,#4A3010)',
        color: '#FAF5E0', borderRadius: '4px', padding: '13px 20px',
        fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
        boxShadow: '0 4px 14px rgba(0,0,0,.25)',
      }}>
        <WaIcon color="#FAF5E0" /> Book {data.label} on WhatsApp
      </a>
    </div>
  )
}

/* ══ PAGE ═══════════════════════════════════════════════════ */
export default function GoldenTrianglePage() {
  const [navOpen, setNavOpen]     = useState(false)
  const [pastHero, setPastHero]   = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [enquiry, setEnquiry]     = useState({ name: '', phone: '', people: '', pkg: '', date: '' })
  const [sent, setSent]           = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const toastShown = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const sy    = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPastHero(sy > 600)
      if (total > 0 && sy / total > 0.75 && !toastShown.current) {
        toastShown.current = true
        setShowToast(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleEnquiry = (e) => {
    e.preventDefault()
    const lines = [
      `Namaste! I'd like to enquire about the Golden Triangle Tour (Varanasi · Prayagraj · Ayodhya — 5D/4N).`,
      ``,
      `Name: ${enquiry.name}`,
      `WhatsApp: ${enquiry.phone}`,
      enquiry.people ? `Travellers: ${enquiry.people}` : '',
      enquiry.pkg    ? `Package: ${enquiry.pkg}` : '',
      enquiry.date   ? `Travel Date: ${enquiry.date}` : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div style={{
      background: '#F5E8AE', backgroundImage: GRAIN,
      minHeight: '100vh', color: '#2B1A0E',
      fontFamily: "'Mukta',system-ui,sans-serif",
    }}>

      <style>{`
        .gt-sm-hide { display: inline; }
        @media (max-width: 480px) { .gt-sm-hide { display: none; } }

        .gt-hero {
          position: relative; overflow: hidden; min-height: 92vh;
          display: flex; align-items: flex-end;
          background: url('/images/background-theme1.jpg') center / cover no-repeat;
        }
        .gt-hoverlay {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: linear-gradient(to top,
            rgba(12,3,0,.92) 0%, rgba(12,3,0,.55) 45%,
            rgba(12,3,0,.18) 80%, rgba(12,3,0,.12) 100%);
        }
        .gt-hinner {
          position: relative; z-index: 2; width: 100%;
          max-width: 1200px; margin: 0 auto;
          padding: clamp(24px,5vw,48px);
          padding-top: 120px;
          padding-bottom: clamp(48px,6vw,80px);
        }

        .gt-cta-desktop { display: flex; }
        .gt-cta-mobile  { display: none; }
        @media (max-width: 600px) {
          .gt-cta-desktop { display: none; }
          .gt-cta-mobile  { display: flex; }
        }

        .gt-act-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
        @media (max-width: 900px) { .gt-act-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 560px) { .gt-act-grid { grid-template-columns: repeat(2,1fr); gap: 10px; } }

        .gt-inc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        @media (max-width: 860px) { .gt-inc-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .gt-inc-grid { grid-template-columns: 1fr; gap: 10px; } }

        .gt-who-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media (max-width: 780px) { .gt-who-grid { grid-template-columns: 1fr; gap: 14px; } }

        .gt-how-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        @media (max-width: 900px) { .gt-how-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 520px) { .gt-how-grid { grid-template-columns: 1fr; gap: 12px; } }

        .gt-rev-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        @media (max-width: 860px) { .gt-rev-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 540px) { .gt-rev-grid { grid-template-columns: 1fr; } }

        .gt-diary-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        @media (max-width: 720px) { .gt-diary-grid { grid-template-columns: repeat(2,1fr); } }

        .gt-form-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 540px) { .gt-form-2col { grid-template-columns: 1fr; } }

        .gt-route { display: flex; align-items: flex-start; justify-content: center; }
        .gt-route-city { display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 0; }
        .gt-route-line { flex: 1; height: 2px; background: linear-gradient(90deg,#B5421A,#C49225); margin-top: 18px; }

        .gt-sticky-bar {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          background: linear-gradient(105deg,#6B2509,#B5421A);
          padding: 10px 16px;
          align-items: center; justify-content: space-between; gap: 12px;
          box-shadow: 0 -4px 20px rgba(43,26,14,.35);
          border-top: 1px solid rgba(196,146,37,.4);
        }
        @media (max-width: 720px) { .gt-sticky-bar { display: flex; } }

        @keyframes gt-slide-up {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes gt-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .gt-marquee-track {
          display: flex; width: max-content;
          animation: gt-marquee 22s linear infinite;
        }
        .gt-marquee-track:hover { animation-play-state: paused; }

        .gt-input {
          width: 100%; padding: 11px 14px;
          background: rgba(255,245,220,.92);
          border: 1.5px solid rgba(196,146,37,.5);
          border-radius: 4px; font-size: 1rem;
          font-family: 'Mukta',sans-serif; color: #2B1A0E;
          outline: none; box-sizing: border-box;
        }
        .gt-input:focus { border-color: #B5421A; background: #fff; }

        .gt-diary-card { transition: box-shadow .25s; }
        .gt-diary-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,.45), 0 0 0 2px #C49225 !important; }
        .gt-diary-card:hover .gt-diary-img img { transform: scale(1.07); }
        .gt-diary-img img { transition: transform .6s ease; }

        /* Hero split layout */
        .gt-hero-split { display: flex; align-items: flex-end; gap: clamp(20px,4vw,44px); }
        .gt-hero-left { flex: 1; min-width: 0; }
        .gt-hero-form-panel {
          width: 330px; flex-shrink: 0;
          background: rgba(8,2,0,.82); backdrop-filter: blur(14px);
          border: 1px solid rgba(196,146,37,.4); border-radius: 8px;
          padding: 22px 20px; box-sizing: border-box;
        }
        @media (max-width: 860px) {
          .gt-hero-split { flex-direction: column; }
          .gt-hero-form-panel { width: 100%; }
        }

        /* Quick contact strip */
        .gt-qstrip { display: flex; gap: 12px; }
        .gt-qbox {
          flex: 1; display: flex; align-items: center; gap: 12px;
          background: rgba(250,240,204,.07); border: 1px solid rgba(196,146,37,.3);
          border-radius: 6px; padding: 14px 16px; text-decoration: none;
          transition: background .2s, border-color .2s;
        }
        .gt-qbox:hover { background: rgba(250,240,204,.14); border-color: rgba(196,146,37,.6); }
        @media (max-width: 600px) { .gt-qstrip { flex-direction: column; } }
      `}</style>

      {/* ── Topbar ── */}
      <div className="topbar" style={{ background: '#6B2509' }}>
        <div className="wrap">
          <span className="hi">हर हर महादेव · जय श्री राम · जय माँ गंगे</span>
          <span><span className="gt-sm-hide">Call / WhatsApp: </span><a href={TEL}>+91 92774 72279</a></span>
        </div>
      </div>

      {/* ── Nav ── */}
      <header className="nav" style={{ background: 'rgba(245,232,174,.97)', borderBottom: '1px solid rgba(196,146,37,.3)' }}>
        <div className="wrap nav-inner" style={{ padding: '6px 0' }}>
          <a href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '60px', width: 'auto', display: 'block' }} />
          </a>
          <nav className={`nav-links${navOpen ? ' open' : ''}`}>
            <a href="/" onClick={() => setNavOpen(false)}>Home</a>
            <a href="/tour-packages" onClick={() => setNavOpen(false)}>Packages</a>
            <a href="/cab" onClick={() => setNavOpen(false)}>Cab</a>
            <a href="/boat-rides" onClick={() => setNavOpen(false)}>Boating</a>
            <a href="/contact" onClick={() => setNavOpen(false)}>Contact</a>
          </nav>
          <button className="menu-btn" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>☰</button>
        </div>
      </header>

      {/* ── Toran ── */}
      <div className="toran" aria-hidden="true">
        {Array.from({ length: 60 }, (_, i) => <i key={i} />)}
      </div>


      <main>

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="gt-hero">
          <div className="gt-hoverlay" />
          <div className="gt-hinner">

            <nav style={{ fontSize: '.76rem', color: 'rgba(255,255,255,.7)', marginBottom: '20px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Home</a>
              <span>›</span>
              <a href="/tour-packages" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Packages</a>
              <span>›</span>
              <span>Golden Triangle</span>
            </nav>

                <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: '#FF9933', fontWeight: 700, textShadow: '0 1px 6px rgba(0,0,0,.5)', marginBottom: '10px' }}>
                  काशी · प्रयागराज · अयोध्या
                </div>

                <GoldRule margin="0 0 14px" />

                <h1 style={{
                  fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
                  fontSize: 'clamp(2.6rem,7vw,5rem)', color: '#FFFFFF',
                  textShadow: '0 3px 24px rgba(0,0,0,.7)',
                  lineHeight: 1, marginBottom: '8px', letterSpacing: '-.01em',
                }}>
                  Golden Triangle
                </h1>
                <h2 style={{
                  fontFamily: "'Fraunces',Georgia,serif", fontWeight: 400, fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem,2.5vw,1.8rem)', color: 'rgba(255,255,255,.78)', marginBottom: '16px',
                }}>
                  Varanasi · Prayagraj · Ayodhya
                </h2>

                {/* Route pill */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(10,3,0,.5)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(244,168,29,.3)',
                  borderRadius: '40px', padding: '7px 18px',
                  marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center',
                }}>
                  {['काशी', 'प्रयागराज', 'अयोध्या'].map((c, i) => (
                    <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.88rem', color: '#FAF5E0' }}>{c}</span>
                      {i < 2 && <span style={{ color: '#F4A81D', fontSize: '.75rem' }}>›</span>}
                    </span>
                  ))}
                  <span style={{ color: 'rgba(244,200,128,.6)', fontSize: '.74rem', marginLeft: '4px' }}>· 5 Days / 4 Nights</span>
                </div>

                {/* Stats strip */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'rgba(10,3,0,.55)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(244,168,29,.35)', borderRadius: '40px',
                  overflow: 'hidden', flexWrap: 'wrap', justifyContent: 'center',
                  marginBottom: '18px',
                }}>
                  {[
                    { num: '5',      label: 'Days' },
                    { num: '4',      label: 'Nights' },
                    { num: '3',      label: 'Cities' },
                    { num: '₹6,999', label: 'Per Person' },
                  ].map((s, i) => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                      {i > 0 && <div style={{ width: '1px', height: '44px', background: 'rgba(244,168,29,.25)' }} />}
                      <div style={{ textAlign: 'center', padding: '10px 20px' }}>
                        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', color: '#F4C87A', lineHeight: 1 }}>{s.num}</div>
                        <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.6)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '2px' }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Urgency */}
                <div style={{ marginBottom: '22px', fontSize: '.82rem', color: 'rgba(255,200,80,.9)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>⚠️</span> Book early for weekends &amp; festival departures — slots fill fast
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={WA_QUOTE} target="_blank" rel="noopener" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    background: '#25D366', color: '#fff',
                    borderRadius: '4px', padding: '14px 28px', fontWeight: 700, fontSize: '1rem',
                    textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,.45)',
                  }}><WaIcon size={20} color="#fff" /> WhatsApp करें — Free Quote</a>
                  <a href={TEL} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.35)',
                    color: '#FAF5E0', borderRadius: '4px', padding: '14px 24px',
                    fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                  }}>📞 Call Now</a>
                </div>

          </div>
        </section>

        {/* ══ TRUST MARQUEE ═════════════════════════════════ */}
        <div style={{ background: 'linear-gradient(90deg,#3A1408,#6B2509,#3A1408)', borderBottom: '1px solid rgba(196,146,37,.3)', overflow: 'hidden', padding: '10px 0' }}>
          <div className="gt-marquee-track">
            {[...Array(2)].flatMap(() => [
              { icon: '⭐', text: '4.9★ Google Rating' },
              { icon: '👥', text: '500+ Pilgrims Served' },
              { icon: '📍', text: 'Varanasi Based' },
              { icon: '📞', text: 'Reply within 2 Hours' },
            ]).map((t, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0 36px', whiteSpace: 'nowrap', fontSize: '.85rem', color: 'rgba(250,245,224,.85)' }}>
                <span>{t.icon}</span> {t.text}
                <span style={{ color: 'rgba(196,146,37,.5)', marginLeft: '36px' }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ ROUTE TIMELINE ════════════════════════════════ */}
        <div style={{ padding: '0 0 48px' }}>
          <div className="wrap">
            <GoldRule margin="0 0 32px" />
            <div className="gt-route">
              {ROUTE.map((r, i) => (
                <div key={r.city} style={{ display: 'flex', alignItems: 'flex-start', flex: i < ROUTE.length - 1 ? 1 : undefined }}>
                  <div className="gt-route-city">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg,#B5421A,#6B2509)',
                      border: '3px solid #C49225',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#FAF5E0', fontWeight: 900, fontSize: '.85rem',
                      flexShrink: 0, boxShadow: '0 3px 10px rgba(181,66,26,.3)',
                    }}>{i + 1}</div>
                    <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: 'clamp(.9rem,2vw,1.1rem)', color: '#6B2509', marginTop: '8px', textAlign: 'center' }}>{r.city}</div>
                    <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.8rem', color: '#B5421A', marginTop: '2px' }}>{r.hi}</div>
                    <div style={{ fontSize: '.72rem', color: '#8B5E1A', fontWeight: 600, marginTop: '4px', background: 'rgba(196,146,37,.15)', borderRadius: '10px', padding: '2px 8px', whiteSpace: 'nowrap' }}>{r.nights}</div>
                    <div style={{ fontSize: '.68rem', color: '#A07840', marginTop: '2px' }}>{r.days}</div>
                  </div>
                  {i < ROUTE.length - 1 && <div className="gt-route-line" />}
                </div>
              ))}
            </div>
            <GoldRule margin="32px 0 0" />
          </div>
        </div>

        {/* ══ WHO IS THIS FOR ════════════════════════════════ */}
        <div style={{ padding: 'clamp(24px,3vw,36px) 0', background: '#FAF0CC', backgroundImage: GRAIN, borderBottom: '1px solid rgba(196,146,37,.2)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 'clamp(28px,8vw,80px)', flexWrap: 'wrap' }}>
              {[
                { icon: '🙏', title: 'Solo Pilgrims' },
                { icon: '👨‍👩‍👧‍👦', title: 'Families & Groups' },
                { icon: '🧓', title: 'Senior Citizens' },
                { icon: '🤝', title: 'With Friends' },
              ].map(w => (
                <div key={w.title} style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{w.icon}</span>
                  <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '.95rem', color: '#6B2509', whiteSpace: 'nowrap' }}>{w.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ VIDEO ═════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(36px,5vw,56px) 0', background: '#2B1A0E' }}>
          <div className="wrap" style={{ maxWidth: '760px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#FAF5E0', marginBottom: '6px' }}>
              Watch: Ganga Aarti · Ram Mandir · Sangam
            </div>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '.9rem', marginBottom: '20px' }}>
              A glimpse of what awaits you on the Golden Triangle Yatra
            </p>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(196,146,37,.3)', cursor: 'pointer' }}>
              {videoPlaying ? (
                <iframe
                  src="https://www.youtube.com/embed/Fnir46ENxfg?rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&controls=0&autoplay=1"
                  title="Ganga Aarti Varanasi — Dashashwamedh Ghat"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              ) : (
                <div onClick={() => setVideoPlaying(true)} style={{ position: 'absolute', inset: 0 }}>
                  <img
                    src={`https://img.youtube.com/vi/Fnir46ENxfg/maxresdefault.jpg`}
                    alt="Ganga Aarti Varanasi"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.25)',
                  }}>
                    <div style={{
                      width: '70px', height: '70px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#C00">
                        <polygon points="8,5 19,12 8,19" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══ VINTAGE ENQUIRY FORM ══════════════════════════ */}
        <section id="gt-enquiry-form" style={{ padding: '20px 0 28px' }}>
          <div className="wrap" style={{ maxWidth: '780px', position: 'relative', filter: 'drop-shadow(0 4px 22px rgba(90,50,10,0.28))' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} dangerouslySetInnerHTML={{ __html: TORN_PAPER_SVG }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(44px,7vw,72px) clamp(40px,10vw,100px) clamp(56px,8vw,88px)' }}>

              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '8px' }}>
                  Plan Your Golden Triangle Yatra
                </h2>
                <p style={{ color: '#5A3F28', fontSize: '.97rem', maxWidth: '38rem', margin: '0 auto' }}>
                  No payment needed — fill your details and we&apos;ll WhatsApp you a custom itinerary.
                </p>
                <GoldRule margin="18px auto 0" />
              </div>

              <style>{`
                .gt-form-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  column-gap: 28px;
                  row-gap: 22px;
                }
                @media (max-width: 580px) { .gt-form-grid { grid-template-columns: 1fr; } }
                .gt-vfield label {
                  display: block;
                  font-family: 'Tiro Devanagari Hindi', Georgia, serif;
                  font-weight: 400;
                  font-size: .76rem;
                  letter-spacing: .14em;
                  text-transform: uppercase;
                  color: #7A4A1A;
                  margin-bottom: 4px;
                }
                .gt-vfield input,
                .gt-vfield select {
                  width: 100%;
                  background: transparent;
                  border: none;
                  border-bottom: 1.5px solid rgba(139,94,26,0.55);
                  border-radius: 0;
                  padding: 7px 2px;
                  font-family: Georgia, serif;
                  font-size: 1rem;
                  color: #2B1A0E;
                  outline: none;
                  box-sizing: border-box;
                  transition: border-color .18s;
                }
                .gt-vfield input:focus,
                .gt-vfield select:focus { border-bottom-color: #B5421A; }
                .gt-vfield input::placeholder { color: rgba(139,94,26,0.45); font-style: italic; }
                .gt-vfield select { appearance: none; cursor: pointer; }
                .gt-vfield-full { grid-column: 1 / -1; }
                .gt-vsub-btn {
                  display: flex; align-items: center; justify-content: center; gap: 9px;
                  width: 100%; padding: 13px 20px;
                  background: linear-gradient(135deg,#8B3A10,#5A2008);
                  color: #FAF5E0; border: none; border-radius: 2px;
                  font-family: 'Tiro Devanagari Hindi', Georgia, serif; font-weight: 700; font-size: 1rem;
                  cursor: pointer; letter-spacing: .08em;
                  box-shadow: 0 3px 14px rgba(139,58,16,.35);
                  transition: opacity .18s; margin-top: 2px;
                }
                .gt-vsub-btn:hover { opacity: .88; }
                .gt-vsub-btn:disabled { opacity: .55; cursor: not-allowed; }
              `}</style>

              <form onSubmit={handleEnquiry} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <div className="gt-form-grid">

                  <div className="gt-vfield">
                    <label htmlFor="gt-name">Full Name *</label>
                    <input id="gt-name" type="text" required placeholder="e.g. Ramesh Sharma"
                      autoComplete="name"
                      value={enquiry.name} onChange={e => setEnquiry(p => ({ ...p, name: e.target.value }))} />
                  </div>

                  <div className="gt-vfield">
                    <label htmlFor="gt-phone">WhatsApp Number *</label>
                    <input id="gt-phone" type="tel" required placeholder="+91 98765 43210"
                      autoComplete="tel" inputMode="tel"
                      value={enquiry.phone} onChange={e => setEnquiry(p => ({ ...p, phone: e.target.value }))} />
                  </div>

                  <div className="gt-vfield">
                    <label htmlFor="gt-people">No. of Travellers *</label>
                    <select id="gt-people" value={enquiry.people} onChange={e => setEnquiry(p => ({ ...p, people: e.target.value }))}>
                      <option value="">Select travellers</option>
                      {['1','2','3','4','5','6','7','8','9','10','10+'].map(n => (
                        <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="gt-vfield">
                    <label htmlFor="gt-pkg">Package Preference</label>
                    <select id="gt-pkg" value={enquiry.pkg} onChange={e => setEnquiry(p => ({ ...p, pkg: e.target.value }))}>
                      <option value="">Not decided yet</option>
                      <option value="Standard (₹6,999/person)">Standard — ₹6,999/person</option>
                      <option value="Premium (₹11,999/person)">Premium — ₹11,999/person</option>
                    </select>
                  </div>

                  <div className="gt-vfield gt-vfield-full">
                    <label htmlFor="gt-date">Travel Date (Approx)</label>
                    <input id="gt-date" type="text" placeholder="e.g. Jan 2025, Diwali week, Flexible…"
                      value={enquiry.date} onChange={e => setEnquiry(p => ({ ...p, date: e.target.value }))} />
                  </div>

                  <div className="gt-vfield-full">
                    <button type="submit" className="gt-vsub-btn" disabled={sent}>
                      <WaIcon size={20} color="#FAF5E0" />
                      {sent ? 'Opening WhatsApp…' : 'Get Quote'}
                    </button>
                  </div>

                  {/* Micro-testimonials */}
                  <div className="gt-vfield-full" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '18px', borderTop: '1px dashed rgba(139,94,26,0.3)', marginTop: '6px' }}>
                    {[
                      { name: 'Priya V.', city: 'Mumbai', text: 'Ganga Aarti arrangements were flawless.' },
                      { name: 'Ramesh A.', city: 'Jaipur', text: 'My parents did Ram Mandir darshan comfortably.' },
                      { name: 'Sunita D.', city: 'Delhi', text: 'Triveni Sangam boat ride — highlight of my life.' },
                    ].map(r => (
                      <div key={r.name} style={{ textAlign: 'center', maxWidth: '160px', flex: '1 1 120px' }}>
                        <div style={{ color: '#C49225', fontSize: '.75rem', letterSpacing: '2px' }}>★★★★★</div>
                        <div style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: '.78rem', color: '#4A2E12', margin: '3px 0' }}>"{r.text}"</div>
                        <div style={{ fontSize: '.72rem', color: '#8B5E1A', fontWeight: 700 }}>— {r.name}, {r.city}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </form>

            </div>
          </div>
        </section>

        {/* ══ DAY-WISE ITINERARY ════════════════════════════ */}
        <section style={{ padding: 'clamp(48px,6vw,80px) 0' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.95rem', color: '#8B5E1A', marginBottom: '4px' }}>दिन-दर-दिन यात्रा</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '6px' }}>
                Day-wise Itinerary
              </h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '40rem', margin: '0 auto' }}>
                A carefully planned 5-day pilgrimage across three of India&apos;s most sacred cities.
              </p>
              <GoldRule margin="16px auto 0" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {DAYS.map(d => <DayCard key={d.day} d={d} />)}
            </div>
          </div>
        </section>

        {/* ══ ACTIVITIES ════════════════════════════════════ */}
        <section style={{ padding: '0 0 clamp(48px,6vw,72px)', background: 'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage: GRAIN }}>
          <div style={{ overflow: 'hidden' }}>
            <TempleSkyline fill="#C49225" opacity={0.35} />
          </div>
          <div className="wrap" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.95rem', color: '#8B5E1A', marginBottom: '4px' }}>अनुभव</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08 }}>
                Experiences & Activities
              </h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div className="gt-act-grid">
              {ACTIVITIES.map(a => (
                <div key={a.en} style={{
                  background: '#FAF5E0', padding: '4px 4px 22px',
                  boxShadow: '0 6px 20px rgba(43,26,14,.3), inset 0 0 0 1px rgba(196,146,37,.35)',
                  borderRadius: '2px', position: 'relative',
                }}>
                  <div style={{ overflow: 'hidden', aspectRatio: '1', background: '#E8D8A0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(a.photo, 400)} alt={a.en} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{
                    position: 'absolute', bottom: '4px', left: '6px', right: '6px',
                    textAlign: 'center', fontSize: '.7rem', color: '#8B5E1A',
                    fontFamily: "'Kalam',cursive", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                  }}>{a.en}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══════════════════════════════════ */}
        <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.95rem', color: '#8B5E1A', marginBottom: '4px' }}>कैसे बुक करें</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08 }}>
                How It Works
              </h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '38rem', margin: '8px auto 0' }}>
                From first message to departure day — we make it simple.
              </p>
              <GoldRule margin="14px auto 0" />
            </div>
            <div className="gt-how-grid">
              {HOW_IT_WORKS.map(h => (
                <div key={h.step} style={{
                  background: '#FAF0CC', backgroundImage: GRAIN,
                  border: '1.5px solid rgba(196,146,37,.35)',
                  borderRadius: '6px', padding: '28px 20px 24px',
                  boxShadow: '0 4px 16px rgba(43,26,14,.1)',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: '-14px', left: '20px',
                    background: '#6B2509', color: '#F4C87A',
                    borderRadius: '3px', padding: '3px 12px',
                    fontFamily: "'Fraunces',serif", fontWeight: 900,
                    fontSize: '.82rem', letterSpacing: '.08em',
                  }}>STEP {h.step}</div>
                  <div style={{ fontSize: '2rem', marginBottom: '10px', lineHeight: 1 }}>{h.icon}</div>
                  <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '1.05rem', color: '#3A1408', marginBottom: '8px' }}>{h.title}</div>
                  <p style={{ fontSize: '.9rem', color: '#5A3F28', lineHeight: 1.6, margin: 0 }}>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MID-PAGE CTA ══════════════════════════════════ */}
        <section id="enquire" style={{ padding: 'clamp(48px,6vw,72px) 0', background: 'linear-gradient(135deg,#3A1408 0%,#6B2509 100%)', backgroundImage: GRAIN }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#C49225', marginBottom: '8px' }}>अभी बात करें</div>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#FAF5E0', letterSpacing: '-1px', marginBottom: '10px' }}>
              Ready to Plan Your Yatra?
            </h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem', maxWidth: '34rem', margin: '0 auto 28px' }}>
              No payment needed. Send your dates &amp; group size — we reply within 2–4 hours.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a href={WA_QUOTE} target="_blank" rel="noopener" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#25D366', color: '#fff', borderRadius: '4px',
                padding: '14px 28px', fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,.35)',
              }}>
                <WaIcon size={20} color="#fff" /> WhatsApp करें — Free Quote पाएं
              </a>
              <a href={TEL} style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.3)',
                color: '#FAF5E0', borderRadius: '4px', padding: '14px 24px',
                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              }}>📞 Call Now</a>
            </div>
          </div>
        </section>

        {/* ══ WHAT'S INCLUDED ══════════════════════════════ */}
        <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.95rem', color: '#8B5E1A', marginBottom: '4px' }}>इसमें शामिल है</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08 }}>
                Everything Included
              </h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div className="gt-inc-grid">
              {INCLUSIONS.map(item => (
                <div key={item.title} style={{
                  background: '#FAF0CC', backgroundImage: GRAIN,
                  border: '1.5px solid rgba(196,146,37,.35)',
                  borderRadius: '5px', padding: '20px 18px',
                  boxShadow: '0 4px 16px rgba(43,26,14,.1)',
                  display: 'flex', alignItems: 'flex-start', gap: '14px',
                }}>
                  <span style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '1rem', color: '#3A1A08', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '.86rem', color: '#5A3F28', lineHeight: 1.45 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══ TRIP DIARIES ══════════════════════════════════ */}
        <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: 'linear-gradient(180deg,#F5E8AE,#EDD690)', backgroundImage: GRAIN }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.95rem', color: '#8B5E1A', marginBottom: '4px' }}>यात्रियों की यादें</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '8px' }}>
                Glimpses of Past Yatras
              </h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '40rem', margin: '0 auto' }}>
                Real moments from pilgrims who journeyed with Yatra Ke Saathi.
              </p>
              <GoldRule margin="16px auto 0" />
            </div>
            <div className="gt-diary-grid">
              {TRIP_DIARIES.map(t => (
                <div key={t.name} className="gt-diary-card" style={{
                  borderRadius: '5px', overflow: 'hidden',
                  border: '1.5px solid rgba(196,146,37,.35)',
                  boxShadow: '0 8px 28px rgba(0,0,0,.25)',
                }}>
                  <div className="gt-diary-img" style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#E8D8A0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(t.photo, 600)} alt={t.name} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{
                    background: '#FAF0CC', backgroundImage: GRAIN,
                    padding: '10px 14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderTop: '1px solid rgba(196,146,37,.35)',
                  }}>
                    <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '.88rem', color: '#6B2509' }}>{t.name}</div>
                    <div style={{ display: 'flex', gap: '1px', flexShrink: 0 }}>
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <span key={i} style={{ color: '#C49225', fontSize: '.82rem' }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ REVIEWS ═══════════════════════════════════════ */}
        <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.95rem', color: '#8B5E1A', marginBottom: '4px' }}>हमारे यात्री</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08 }}>
                What Pilgrims Say
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', margin: '10px 0 0' }}>
                {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: '#C49225', fontSize: '1.2rem' }}>★</span>)}
                <span style={{ fontSize: '.9rem', color: '#8B5E1A', marginLeft: '4px' }}>4.9 / 5 · 500+ happy pilgrims</span>
              </div>
              <GoldRule margin="14px auto 0" />
            </div>
            <div className="gt-rev-grid">
              {REVIEWS.map(r => (
                <div key={r.name} style={{
                  background: '#FAF0CC', backgroundImage: GRAIN,
                  border: '1.5px solid rgba(196,146,37,.35)',
                  borderRadius: '6px', padding: '22px 20px',
                  boxShadow: '0 4px 16px rgba(43,26,14,.1)',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {Array.from({ length: r.stars }).map((_, i) => <span key={i} style={{ color: '#C49225', fontSize: '.9rem' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '.93rem', color: '#3A1408', lineHeight: 1.65, margin: 0, flex: 1 }}>&ldquo;{r.text}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(196,146,37,.25)', paddingTop: '10px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '50%',
                      background: 'linear-gradient(135deg,#B5421A,#6B2509)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#FAF5E0', fontWeight: 900, fontSize: '.9rem', flexShrink: 0,
                    }}>{r.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '.92rem', color: '#3A1408' }}>{r.name}</div>
                      <div style={{ fontSize: '.76rem', color: '#8B5E1A' }}>{r.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ════════════════════════════════════ */}
        <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: 'linear-gradient(180deg,#F5E8AE,#EDD690)', backgroundImage: GRAIN }}>
          <div className="wrap">
            <div style={{
              background: 'linear-gradient(135deg,#6B2509 0%,#3A1408 100%)',
              backgroundImage: GRAIN, borderRadius: '8px',
              padding: 'clamp(36px,6vw,64px) clamp(24px,6vw,80px)',
              border: '1.5px solid rgba(196,146,37,.3)',
              boxShadow: '0 16px 48px rgba(43,26,14,.35)',
              position: 'relative', overflow: 'hidden', textAlign: 'center',
            }}>
              <div style={{ position: 'absolute', right: '-10px', top: '-30px', fontSize: '13rem', opacity: .04, color: '#FAF5E0', fontFamily: "'Tiro Devanagari Hindi',serif", lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>ॐ</div>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1.1rem', color: '#F4C87A', marginBottom: '10px' }}>हर यात्रा का भरोसेमंद साथी</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#FAF5E0', letterSpacing: '-1px', marginBottom: '12px' }}>
                Plan Your Golden Triangle Yatra
              </h2>
              <p style={{ color: 'rgba(255,255,255,.78)', fontSize: 'clamp(.95rem,2vw,1.1rem)', maxWidth: '42rem', margin: '0 auto 24px' }}>
                Send your travel dates and group size on WhatsApp — we&apos;ll share a personalised itinerary and quote within hours. No payment now, no obligation.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
                {['✔ Free consultation', '✔ No advance payment', '✔ Reply within hours', '✔ 500+ happy pilgrims'].map(t => (
                  <span key={t} style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.5)' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={WA_QUOTE} target="_blank" rel="noopener" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#FAF5E0',
                  borderRadius: '4px', padding: '14px 28px', fontWeight: 700, fontSize: '1rem',
                  textDecoration: 'none', boxShadow: '0 4px 20px rgba(232,112,26,.4)',
                }}>
                  <WaIcon size={20} /> WhatsApp for Quote
                </a>
                <a href={TEL} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.3)',
                  color: '#FAF5E0', borderRadius: '4px', padding: '14px 28px',
                  fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                }}>📞 Call +91 92774 72279</a>
              </div>
              <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <a href="/tour-packages" style={{ color: '#F4C87A', fontSize: '.88rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>View all packages</a>
                <a href="/contact" style={{ color: '#F4C87A', fontSize: '.88rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Contact form</a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FAQs ══════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.95rem', color: '#8B5E1A', marginBottom: '4px' }}>सामान्य प्रश्न</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08 }}>
                Frequently Asked
              </h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '760px', margin: '0 auto' }}>
              {FAQS.map((f, i) => <FaqItem key={i} faq={f} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* ══ CONTACT SECTION ═══════════════════════════════ */}
        <section style={{ padding: 'clamp(40px,5vw,64px) 0' }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '8px' }}>
              हर यात्रा का भरोसेमंद साथी
            </div>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', color: '#6B2509', letterSpacing: '-1px', marginBottom: '4px' }}>
              Yatra Ke Saathi
            </h2>
            <p style={{ color: '#8B5E1A', fontSize: '.95rem', marginBottom: '20px' }}>Tour & Travel · Varanasi</p>
            <GoldRule margin="0 auto 24px" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '28px', color: '#3A2510', fontSize: '.95rem' }}>
              <span>📍 Durgakund, Varanasi</span>
              <span style={{ color: '#C49225' }}>·</span>
              <a href={TEL} style={{ color: '#B5421A', fontWeight: 700, textDecoration: 'none' }}>📞 +91 92774 72279</a>
              <span style={{ color: '#C49225' }}>·</span>
              <span>📸 @YATRAKSATHI</span>
              <span style={{ color: '#C49225' }}>·</span>
              <a href="mailto:info@yatraksathi.com" style={{ color: '#B5421A', textDecoration: 'none' }}>✉️ info@yatraksathi.com</a>
            </div>
            <a href={WA_QUOTE} target="_blank" rel="noopener" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#B5421A', color: '#FAF5E0',
              padding: '14px 32px', borderRadius: '4px',
              fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 4px 18px rgba(181,66,26,.35)',
              textDecoration: 'none',
            }}>
              <WaIcon size={20} /> Plan Your Yatra Now
            </a>
          </div>
        </section>

        {/* ══ ALSO EXPLORE ══════════════════════════════════ */}
        <section style={{ padding: '0 0 clamp(48px,6vw,72px)' }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.9rem', color: '#8B5E1A', marginBottom: '3px' }}>अन्य यात्राएं</div>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1rem', color: '#6B2509', marginBottom: '16px' }}>Explore other packages</div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
              {[
                { label: 'Kashi – Ayodhya (3D)',               href: '/tour-packages/kashi-ayodhya' },
                { label: 'Kashi · Prayagraj · Ayodhya (4D)',   href: '/tour-packages/kashi-prayagraj-ayodhya' },
                { label: 'Divya Dham Yatra (5D)',               href: '/tour-packages/divya-dham-yatra' },
                { label: 'All Packages →',                      href: '/tour-packages' },
              ].map(p => (
                <a key={p.label} href={p.href} style={{
                  padding: '8px 20px', borderRadius: '30px',
                  fontFamily: "'Mukta',sans-serif", fontWeight: 700, fontSize: '.88rem',
                  textDecoration: 'none', border: '1.5px solid rgba(196,146,37,.5)',
                  background: 'rgba(250,240,204,.8)', color: '#5A3F28',
                }}>
                  {p.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer>
        <div className="big-hi" aria-hidden="true">काशी</div>
        <div className="wrap">
          <div className="foot">
            <div>
              <a href="/" className="logo" style={{ marginBottom: '14px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '60px', width: 'auto', display: 'block' }} />
              </a>
              <p style={{ fontSize: '.92rem', maxWidth: '22rem', color: '#cdb892' }}>
                Tours, cabs, boats and hotels in Kashi, arranged by people who live here.
              </p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="/tour-packages">Tour Packages</a></li>
                <li><a href="/cab">Cab Booking</a></li>
                <li><a href="/boat-rides">Boat Rides</a></li>
                <li><a href="/hotels">Hotels</a></li>
              </ul>
            </div>
            <div>
              <h4>Popular Packages</h4>
              <ul>
                <li><a href="/golden-triangle">Golden Triangle (5D)</a></li>
                <li><a href="/tour-packages/kashi-prayagraj-ayodhya">Kashi–Prayagraj–Ayodhya</a></li>
                <li><a href="/tour-packages/divya-dham-yatra">Divya Dham Yatra</a></li>
                <li><a href="/tour-packages">All Packages</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>Durgakund, Varanasi, UP</li>
                <li><a href={TEL}>+91 92774 72279</a></li>
                <li><a href="mailto:info@yatraksathi.com">info@yatraksathi.com</a></li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <span>© {new Date().getFullYear()} Yatra Ke Saathi</span>
            <span>Photos: Unsplash</span>
          </div>
        </div>
      </footer>

      {/* ── Sticky Mobile Booking Bar ── */}
      <div className="gt-sticky-bar">
        <div style={{ color: '#FAF5E0' }}>
          <strong style={{ fontFamily: "'Fraunces',serif", fontSize: '1.3rem', display: 'block', lineHeight: 1 }}>From ₹6,999</strong>
          <span style={{ fontSize: '.72rem', color: 'rgba(250,245,224,.7)' }}>per person · 5D / 4N</span>
        </div>
        <a href={WA_QUOTE} target="_blank" rel="noopener" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#25D366', color: '#fff',
          padding: '10px 18px', borderRadius: '4px',
          fontWeight: 700, fontSize: '.95rem',
          textDecoration: 'none', whiteSpace: 'nowrap',
          boxShadow: '0 3px 12px rgba(0,0,0,.3)', flexShrink: 0,
        }}>
          <WaIcon size={18} color="#fff" /> Book Now
        </a>
      </div>

      {/* ── Scroll Toast ── */}
      {showToast && (
        <div style={{
          position: 'fixed', bottom: '80px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 200,
          width: 'calc(100% - 32px)', maxWidth: '440px',
          background: 'linear-gradient(135deg,#3A1408,#6B2509)',
          border: '1px solid rgba(196,146,37,.45)',
          borderRadius: '8px', padding: '16px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,.55)',
          display: 'flex', alignItems: 'center', gap: '14px',
          animation: 'gt-slide-up .35s ease',
        }}>
          <WaIcon size={32} color="#25D366" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1rem', color: '#FAF5E0', marginBottom: '2px' }}>
              Still deciding?
            </div>
            <div style={{ fontSize: '.84rem', color: 'rgba(255,255,255,.65)' }}>
              Chat with us — no payment needed. Reply within hours.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
            <a href={WA_QUOTE} target="_blank" rel="noopener" onClick={() => setShowToast(false)} style={{
              display: 'block', background: '#25D366', color: '#fff',
              padding: '8px 14px', borderRadius: '4px',
              fontWeight: 700, fontSize: '.88rem',
              textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center',
            }}>Chat Now</a>
            <button onClick={() => setShowToast(false)} style={{
              background: 'transparent', border: 'none',
              color: 'rgba(255,255,255,.4)', fontSize: '.75rem',
              cursor: 'pointer', padding: '2px',
            }}>Dismiss</button>
          </div>
        </div>
      )}

      {/* ── WhatsApp FAB ── */}
      <a className="fab" href={WA_QUOTE} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff" style={{ width: '28px', height: '28px' }}>
          <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 17.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
        </svg>
      </a>

    </div>
  )
}
