'use client'
import { useState, useRef, Fragment } from 'react'
import Navbar from '@/app/components/Navbar'

const API_URL     = 'https://yatra.pythonanywhere.com/api/bookings/'
const WA_NUMBER   = '919277472279'
const WA_BASE     = `https://wa.me/${WA_NUMBER}`
const TORAN_COUNT = 60
const PKG_NAME    = 'Varanasi Tour Package 3 Days 2 Nights'
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/* ── Torn-paper SVG ───────────────────────────────────────── */
function generateTornPaperSVG() {
  const W = 600, H = 804; let seed = 21
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const r = (a, b) => a + rand() * (b - a)
  const corners = [0,1,2,3].map(() => rand() < 0.75 ? { span: r(28,70), slope: r(0.6,1.5) } : { span: r(4,10), slope: 1 })
  function edge(x1,y1,x2,y2,nx,ny,cStart,cEnd,skipStart=0,skipEnd=0) {
    const len=Math.hypot(x2-x1,y2-y1),ux=(x2-x1)/len,uy=(y2-y1)/len
    const shelves=[];let s=0;while(s<len){const w=r(25,120),k=rand();shelves.push({from:s,to:s+w,depth:k<0.3?r(18,34):k<0.65?r(8,18):r(0,7)});s+=w}
    const shelfAt=t=>shelves.find(sh=>t>=sh.from&&t<sh.to)||shelves[shelves.length-1]
    const bites=[];let b=r(25,70);while(b<len-30){if(rand()<0.75)bites.push({at:b,w:r(14,55),depth:r(20,46),skew:r(-0.5,0.5)});b+=r(55,140)}
    const rips=[];let q=r(60,160);while(q<len-50){if(rand()<0.5)rips.push({at:q,depth:r(35,85),lean:r(-18,18),w:r(3,7)});q+=r(120,260)}
    const pts=[];let t=0,depth=shelfAt(0).depth
    while(t<=len){
      const target=shelfAt(t).depth;depth+=(target-depth)*0.3;let off=depth+r(0,3.5);if(rand()<0.12)off+=r(3,9)
      const bite=bites.find(bt=>t>=bt.at&&t<=bt.at+bt.w)
      if(bite){const f=(t-bite.at)/bite.w;const shape=Math.sin(Math.PI*Math.min(1,f*1.4))*(1+bite.skew*(f-0.5));off=Math.max(off,bite.depth*Math.min(1,shape*1.6)+r(-4,4))}
      if(len-t<Math.max(cEnd.span*cEnd.slope,skipEnd))break
      if(t<skipStart){t+=r(1.5,3.5);continue}
      if(t<cStart.span)off=Math.max(off,(cStart.span-t)*cStart.slope+r(-2,4))
      pts.push([x1+ux*t+nx*off,y1+uy*t+ny*off])
      if(pts.length===1)pts.firstOff=off;pts.lastOff=off
      const rip=rips.find(rp=>t<=rp.at&&t+4>rp.at)
      if(rip){const bx=x1+ux*t,by=y1+uy*t;rip.depth=off+rip.depth*0.75;const steps=5;for(let i=1;i<=steps;i++){const f=i/steps;pts.push([bx+ux*(rip.lean*f+r(-2,2))+nx*(off+(rip.depth-off)*f),by+uy*(rip.lean*f+r(-2,2))+ny*(off+(rip.depth-off)*f)])};for(let i=steps-1;i>=0;i--){const f=i/steps;pts.push([bx+ux*(rip.lean*f+rip.w*(1-f*0.7)+r(-1.5,1.5))+nx*(off+(rip.depth-off)*f),by+uy*(rip.lean*f+rip.w*(1-f*0.7)+r(-1.5,1.5))+ny*(off+(rip.depth-off)*f)])};t+=rip.w+1;continue}
      t+=r(1.5,3.5)
    }
    return pts
  }
  const m=3
  const top=edge(m,m,W-m,m,0,1,corners[0],corners[1])
  const right=edge(W-m,m,W-m,H-m,-1,0,corners[1],corners[2],top.lastOff+2)
  const bottom=edge(W-m,H-m,m,H-m,0,-1,corners[2],corners[3],right.lastOff+2)
  const left=edge(m,H-m,m,m,1,0,corners[3],corners[0],bottom.lastOff+2,top.firstOff+2)
  const pts=[...top,...right,...bottom,...left]
  const d='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')+' Z'
  let stains=''
  for(let i=0;i<26;i++){const side=Math.floor(r(0,4));let cx=r(0,W),cy=r(0,H);const inset=r(0,70);if(side===0)cy=inset;else if(side===1)cx=W-inset;else if(side===2)cy=H-inset;else cx=inset;stains+=`<ellipse cx="${cx}" cy="${cy}" rx="${r(20,70)}" ry="${r(15,55)}" fill="#c98a45" opacity="${r(0.08,0.2)}" filter="url(#tp-soft)"/>`}
  for(let i=0;i<6;i++)stains+=`<ellipse cx="${r(80,W-80)}" cy="${r(80,H-80)}" rx="${r(25,60)}" ry="${r(20,50)}" fill="#d9a060" opacity="${r(0.04,0.09)}" filter="url(#tp-soft)"/>`
  let creases=''
  function crease(x,y,ang,segs,depth){let pd=`M${x.toFixed(1)} ${y.toFixed(1)}`;for(let i=0;i<segs;i++){ang+=r(-0.45,0.45);const l=r(10,32);x+=Math.cos(ang)*l;y+=Math.sin(ang)*l;pd+=` L${x.toFixed(1)} ${y.toFixed(1)}`;if(depth<2&&rand()<0.18)crease(x,y,ang+r(-1.2,1.2),Math.floor(r(2,5)),depth+1)};const o=r(0.25,0.5);creases+=`<path d="${pd}" stroke="#fff4dc" stroke-width="${r(0.6,1.3).toFixed(2)}" opacity="${o.toFixed(2)}" fill="none" stroke-linejoin="round"/>`;creases+=`<path d="${pd}" transform="translate(0.9 0.9)" stroke="#a87440" stroke-width="0.6" opacity="${(o*0.35).toFixed(2)}" fill="none" stroke-linejoin="round"/>`}
  for(let i=0;i<55;i++)crease(r(0,W),r(0,H),r(0,Math.PI*2),Math.floor(r(3,9)),0)
  return `<svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="tp-tear"><path d="${d}"/></clipPath><radialGradient id="tp-base" cx="52%" cy="48%" r="70%"><stop offset="0%" stop-color="#ffe9bf"/><stop offset="45%" stop-color="#fce1b2"/><stop offset="78%" stop-color="#f0c993"/><stop offset="100%" stop-color="#e3b073"/></radialGradient><linearGradient id="tp-sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="45%" stop-color="#fff6e0" stop-opacity="0.35"/><stop offset="60%" stop-color="#fff" stop-opacity="0"/></linearGradient><filter id="tp-crumple" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.018 0.024" numOctaves="4" seed="5" result="n"/><feDiffuseLighting in="n" surfaceScale="2.2" lighting-color="#ffffff"><feDistantLight azimuth="225" elevation="62"/></feDiffuseLighting><feColorMatrix type="matrix" values="1 0 0 0 0  0 0.92 0 0 0  0 0 0.8 0 0  0 0 0 1 0"/></filter><filter id="tp-wrinkle" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" seed="13" result="n"/><feDiffuseLighting in="n" surfaceScale="1.2" lighting-color="#ffffff"><feDistantLight azimuth="225" elevation="70"/></feDiffuseLighting></filter><filter id="tp-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.36  0 0 0 0 0.15  0 0 0 0.5 0"/></filter><filter id="tp-blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="11"/><feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.52  0 0 0 0 0.24  1.6 0 0 0 -0.7"/></filter><filter id="tp-patchy" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.2 0 0 0 -0.6"/></filter><mask id="tp-patchMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" filter="url(#tp-patchy)"/></mask><filter id="tp-fray" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="2" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="tp-edgeGlow"><feGaussianBlur stdDeviation="10"/></filter><filter id="tp-rim"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="tp-soft"><feGaussianBlur stdDeviation="12"/></filter></defs><g filter="url(#tp-fray)"><g clip-path="url(#tp-tear)"><rect width="${W}" height="${H}" fill="url(#tp-base)"/><rect width="${W}" height="${H}" filter="url(#tp-blotch)" opacity="0.35"/>${stains}<rect width="${W}" height="${H}" filter="url(#tp-crumple)" opacity="0.18" style="mix-blend-mode:multiply"/><rect width="${W}" height="${H}" filter="url(#tp-wrinkle)" opacity="0.07" style="mix-blend-mode:multiply"/>${creases}<rect width="${W}" height="${H}" fill="url(#tp-sheen)"/><rect width="${W}" height="${H}" filter="url(#tp-grain)" opacity="0.28"/><path d="${d}" fill="none" stroke="#d6a466" stroke-width="50" opacity="0.4" filter="url(#tp-edgeGlow)"/><path d="${d}" fill="none" stroke="#d29a55" stroke-width="80" opacity="0.38" filter="url(#tp-edgeGlow)" mask="url(#tp-patchMask)"/><path d="${d}" fill="none" stroke="#c0843c" stroke-width="26" opacity="0.4" filter="url(#tp-rim)" mask="url(#tp-patchMask)"/><path d="${d}" fill="none" stroke="#b3773a" stroke-width="5" opacity="0.55" filter="url(#tp-rim)"/><path d="${d}" fill="none" stroke="#9a6128" stroke-width="1.4" opacity="0.35"/><path d="${d}" fill="none" stroke="#fff1d6" stroke-width="2.6" opacity="0.55" stroke-dasharray="14 6 30 4 8 10" mask="url(#tp-patchMask)"/></g></g></svg>`
}
const TORN_PAPER_SVG = generateTornPaperSVG()

/* ── Data ─────────────────────────────────────────────────── */

const DAYS = [
  {
    day: 1, city: 'Varanasi', title: 'Arrival, Kaal Bhairav & Dashashwamedh Ghat',
    activities: [
      'Pickup from railway station / airport',
      'Hotel check-in & freshen up',
      'Kaal Bhairav Mandir darshan — Kotwal of Kashi',
      'Maha Mritunjay Mandir darshan',
      'Dashashwamedh Ghat — evening atmosphere & aarti viewing',
      'Local market walk — Banarasi chai, paan & street food',
      'Overnight stay in Varanasi',
    ],
    photos: [
      { id: '1665413791167-6718dcf36773', alt: 'Kaal Bhairav Mandir' },
      { id: '1627894483216-2138af692e32', alt: 'Dashashwamedh Ghat evening' },
      { id: '1561359313-0639aad49ca6',   alt: 'Varanasi ghats at dusk' },
    ],
  },
  {
    day: 2, city: 'Varanasi', title: 'Sparsh Darshan (Kashi Vishwanath), Subah-e-Banaras & Sarnath',
    activities: [
      'Pre-dawn Sparsh Darshan — Kashi Vishwanath Temple (touch the Shivling)',
      'Subah-e-Banaras morning Aarti at Assi Ghat',
      'Sunrise boat ride on the Ganges',
      'Kachori Sabji & Jalebi — authentic Banarasi breakfast',
      'Sankat Mochan Hanuman Temple',
      'Durga Kund Mandir & Tulsi Manas Mandir',
      'BHU campus tour — Birla Temple',
      'Sarnath — Dhamek Stupa & Archaeological Museum',
      'Akshardham Varanasi',
      'Overnight stay in Varanasi',
    ],
    photos: [
      { id: '1596097825168-c9b773f404ff', alt: 'Sparsh Darshan — Kashi Vishwanath' },
      { id: '1571536802807-30451e3955d8', alt: 'Sunrise boat ride on the Ganges' },
      { id: '1649876674933-a5b3b39b4da1', alt: 'Sarnath — Dhamek Stupa' },
    ],
  },
  {
    day: 3, city: 'Varanasi → Vindhyachal', title: 'Vindhyachal — 3 Devi Darshan & Departure',
    activities: [
      'Early morning drive to Vindhyachal (~65 km, ~1.5 hrs)',
      'Maa Vindhyavasini Devi Temple darshan',
      'Ashtabhuja Devi Temple darshan',
      'Kali Khoh Temple darshan — 3 Devi Darshan complete',
      'Return drive to Varanasi',
      'Drop at railway station / airport',
    ],
    photos: [
      { id: '1608412525537-662195e817c5', alt: 'Vindhyachal Devi Temple' },
      { id: '1513475382585-d06e58bcb0e0', alt: 'Ashtabhuja Temple' },
      { id: '1627894483216-2138af692e32', alt: 'Departure from Varanasi' },
    ],
  },
]

const ROUTE = [
  { city: 'Day 1', hi: 'सायं दर्शन',   nights: 'Temples & Ghat',          days: 'Evening'  },
  { city: 'Day 2', hi: 'स्पर्श दर्शन', nights: 'Sparsh Darshan & Sarnath', days: 'Full Day' },
  { city: 'Day 3', hi: 'विन्ध्याचल',   nights: '3 Devi Darshan',           days: 'Morning'  },
]

const INCLUSIONS = [
  { photo: '1631049307264-da0ec9d70304', icon: '🏨', title: 'Hotel Stay',          desc: '2 nights near the ghats' },
  { photo: '1449965408869-eaa3f722e40d', icon: '🚗', title: 'AC Vehicle',          desc: 'All 3 days · all transfers' },
  { photo: '1571536802807-30451e3955d8', icon: '⛵', title: 'Boat Rides',          desc: 'Sunrise & evening on the Ganga' },
  { photo: '1665413791167-6718dcf36773', icon: '🛕', title: 'Temple Circuit',      desc: 'Kashi Vishwanath, Annapurna, Kal Bhairav & more' },
  { photo: '1627894483216-2138af692e32', icon: '🕯️', title: 'Ganga Ghat Aarti',  desc: 'Dashashwamedh Ghat · every evening' },
  { photo: '1649876674933-a5b3b39b4da1', icon: '🏛️', title: 'Sarnath Excursion', desc: 'Dhamek Stupa & museum entry' },
  { photo: '1634920540678-df0e179c5243', icon: '🧭', title: 'Expert Local Guide', desc: 'All 3 days · full assistance' },
  { photo: '1596097825168-c9b773f404ff', icon: '🚶', title: 'Heritage Walk',       desc: 'Vishwanath Gali · old city lanes' },
  { photo: '1504674900247-0877df9cc836', icon: '🍳', title: 'Daily Breakfast',    desc: 'Included at hotel' },
  { photo: '1449965408869-eaa3f722e40d', icon: '📍', title: 'Pickup & Drop',       desc: 'Railway station / airport' },
]

const ACTIVITIES = [
  { en: 'Sparsh Darshan — Kashi Vishwanath', photo: '1665413791167-6718dcf36773' },
  { en: 'Kaal Bhairav & Maha Mritunjay',     photo: '1627894483216-2138af692e32' },
  { en: 'Subah-e-Banaras Aarti',             photo: '1596097825168-c9b773f404ff' },
  { en: 'Sunrise Boat Ride — Ganga',         photo: '1571536802807-30451e3955d8' },
  { en: 'Sankat Mochan & Durga Kund',        photo: '1608412525537-662195e817c5' },
  { en: 'Sarnath — Dhamek Stupa',            photo: '1649876674933-a5b3b39b4da1' },
  { en: 'Akshardham Varanasi',               photo: '1561359313-0639aad49ca6'   },
  { en: 'Vindhyachal — 3 Devi Darshan',      photo: '1513475382585-d06e58bcb0e0' },
]

const TRIP_DIARIES = [
  { name: 'Priya Verma',   city: 'Mumbai',  stars: 5, photo: '1627894483216-2138af692e32', caption: 'Ganga Aarti · Varanasi',    review: 'The aarti boat ride at night was something I will never forget.' },
  { name: 'Rajesh Sharma', city: 'Delhi',   stars: 4, photo: '1665413791167-6718dcf36773', caption: 'Kashi Vishwanath Temple',   review: 'Guide was very knowledgeable. Darshan was smooth with no long wait.' },
  { name: 'Sunita Devi',   city: 'Patna',   stars: 5, photo: '1561359313-0639aad49ca6',   caption: 'Ghats · Varanasi',          review: 'Felt completely safe travelling as a solo woman. Highly recommend.' },
  { name: 'Kavita Singh',  city: 'Jaipur',  stars: 5, photo: '1571536802807-30451e3955d8', caption: 'Sunrise Boat Ride · Ganga', review: 'Sunrise on the Ganga — no words. The guide arranged everything.' },
  { name: 'Manoj Tiwari',  city: 'Bhopal',  stars: 4, photo: '1649876674933-a5b3b39b4da1', caption: 'Sarnath Stupa',             review: 'Sarnath excursion was well-planned. Driver was punctual both days.' },
  { name: 'Amit Gupta',    city: 'Lucknow', stars: 5, photo: '1608412525537-662195e817c5', caption: 'Morning Ghats · Kashi',     review: 'Booked for family of 5. Exact price as quoted, zero hidden charges.' },
]


const FAQS = [
  { q: 'What does the 3 Days 2 Nights Varanasi tour cover?', a: 'Day 1: Kaal Bhairav Mandir, Maha Mritunjay Mandir, Dashashwamedh Ghat evening and local market. Day 2: pre-dawn Sparsh Darshan at Kashi Vishwanath (touch the Shivling), Subah-e-Banaras Aarti, sunrise boat ride, Sankat Mochan, Durga Kund, Tulsi Manas, BHU, Sarnath and Akshardham. Day 3: Vindhyachal — Maa Vindhyavasini, Ashtabhuja and Kali Khoh (3 Devi Darshan), then return drop.' },
  { q: 'Is there a minimum group size?', a: 'Minimum 2 persons. Solo travellers may contact us on WhatsApp — we often arrange same-day groups.' },
  { q: 'Are meals included?', a: 'Daily breakfast is included. Lunch and dinner are not included but we guide you to the best local spots.' },
  { q: 'What is not covered in the package?', a: 'Train / flight tickets, monument entry fees (Sarnath Museum), personal expenses and 5% GST are not included.' },
  { q: 'Is the Kashi Vishwanath VIP pass included?', a: 'Our guide assists with darshan queue navigation. If you need a VIP pass arrangement, let us know when you enquire and we will include it.' },
  { q: 'Can I customise the itinerary?', a: 'Yes — contact us on WhatsApp and we will tailor the tour to your preferences, pace or special requirements.' },
  { q: 'How is the booking confirmed?', a: 'Once your enquiry is received, our team confirms on WhatsApp within 2 hours with the full plan and payment details. No advance needed just to enquire.' },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: PKG_NAME,
  description: 'Kashi Vishwanath darshan, sunrise boat ride on the Ganges, Ganga Aarti and Sarnath excursion — 3 days 2 nights guided tour of Varanasi.',
  touristType: 'Pilgrimage, Cultural',
  provider: { '@type': 'TravelAgency', name: 'Yatra Ke Sathi', url: 'https://yatraksathi.com', telephone: '+919277472279', address: { '@type': 'PostalAddress', addressLocality: 'Varanasi', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' } },
}

/* ── Sub-components ───────────────────────────────────────── */

function WaIcon({ size = 20, color = 'currentColor' }) {
  return <svg viewBox="0 0 32 32" fill={color} style={{ width: size, height: size, flexShrink: 0 }}><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" /></svg>
}

function GoldRule({ margin = '20px 0' }) {
  return <div style={{ display:'flex', alignItems:'center', gap:'10px', margin }}><div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} /><svg viewBox="0 0 24 24" width="16" height="16" fill="#C49225"><path d="M12 2l1.8 5.4H20l-4.9 3.6 1.8 5.4L12 13l-4.9 3.4 1.8-5.4L4 7.4h6.2z" /></svg><div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} /></div>
}

function TempleSkyline() {
  return <svg viewBox="0 0 1200 160" preserveAspectRatio="xMidYMax meet" style={{ width:'100%', display:'block' }} aria-hidden="true"><g fill="#C49225" opacity={0.42}><rect x="0" y="148" width="1200" height="14" /><rect x="30" y="120" width="50" height="28" /><polygon points="55,82 30,120 80,120" /><polygon points="55,62 43,82 67,82" /><rect x="52" y="50" width="6" height="13" /><circle cx="55" cy="47" r="5" /><rect x="165" y="110" width="62" height="38" /><polygon points="196,68 165,110 227,110" /><polygon points="196,48 180,68 212,68" /><polygon points="196,32 186,48 206,48" /><rect x="193" y="20" width="6" height="13" /><circle cx="196" cy="17" r="5.5" /><rect x="502" y="98" width="82" height="50" /><polygon points="543,50 502,98 584,98" /><polygon points="543,28 525,50 561,50" /><polygon points="543,12 534,28 552,28" /><rect x="540" y="0" width="6" height="13" /><circle cx="543" cy="-2" r="6" /><rect x="728" y="114" width="56" height="34" /><polygon points="756,74 728,114 784,114" /><polygon points="756,56 742,74 770,74" /><rect x="754" y="44" width="5" height="13" /><circle cx="756" cy="41" r="4.5" /><rect x="1044" y="116" width="54" height="32" /><polygon points="1071,76 1044,116 1098,116" /><polygon points="1071,58 1057,76 1085,76" /><rect x="1068" y="46" width="6" height="13" /><circle cx="1071" cy="43" r="5" /></g></svg>
}

function VintagePhoto({ id, alt }) {
  return <div style={{ background:'#FAF5E0', padding:'5px 5px 20px', boxShadow:'0 6px 20px rgba(43,26,14,.3), inset 0 0 0 1px rgba(196,146,37,.35)', borderRadius:'2px', position:'relative' }}><div style={{ overflow:'hidden', aspectRatio:'1', background:'#E8D8A0' }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={U(id, 380)} alt={alt} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} /></div><div style={{ position:'absolute', bottom:'3px', left:'5px', right:'5px', textAlign:'center', fontSize:'.65rem', color:'#8B5E1A', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{alt}</div></div>
}

function DayCard({ d }) {
  return (
    <div style={{ borderRadius:'5px', overflow:'hidden', border:'1.5px solid rgba(196,146,37,.4)', boxShadow:'0 8px 36px rgba(43,26,14,.18)' }}>
      <div style={{ background:'linear-gradient(105deg,#FAF0CC 0%,#EDD690 55%,#FAF0CC 100%)', backgroundImage:GRAIN, display:'flex', alignItems:'stretch', position:'relative', overflow:'hidden', borderBottom:'2px solid rgba(196,146,37,.5)' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'100px', borderRight:'2px dashed rgba(90,63,40,.25)', padding:'20px 14px', flexShrink:0 }}>
          <span style={{ fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'.66rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#8B5E1A', marginBottom:'2px' }}>DAY</span>
          <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(3rem,7vw,4.8rem)', color:'#5A3F28', lineHeight:1, letterSpacing:'-3px' }}>{d.day}</span>
        </div>
        <div style={{ padding:'20px 26px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'.75rem', letterSpacing:'.2em', textTransform:'uppercase', color:'#B5421A', marginBottom:'5px' }}>{d.city}</div>
          <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:600, fontSize:'clamp(.95rem,2.4vw,1.25rem)', color:'#5A3F28', lineHeight:1.25 }}>{d.title}</div>
        </div>
        <div style={{ position:'absolute', top:'9px', right:'14px', fontSize:'1.2rem', opacity:.3, color:'#8B5E1A', fontFamily:"'Tiro Devanagari Hindi',serif" }}>ॐ</div>
      </div>
      <div style={{ background:'#FAF0CC', backgroundImage:GRAIN, padding:'24px 28px 30px' }}>
        <GoldRule margin="0 0 16px" />
        <ul style={{ listStyle:'none', marginBottom:'26px' }}>
          {d.activities.map((act, i) => (
            <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'4px 0', fontFamily:"'Mukta',sans-serif", fontSize:'clamp(.92rem,1.8vw,1.04rem)', fontWeight:600, color:'#2B1A0E', lineHeight:1.45, borderBottom:i<d.activities.length-1?'1px solid rgba(196,146,37,.2)':'none' }}>
              <span style={{ color:'#B5421A', fontSize:'.8rem', marginTop:'4px', flexShrink:0 }}>◆</span>{act}
            </li>
          ))}
        </ul>
        <GoldRule margin="0 0 20px" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }}>
          {d.photos.map((p, i) => <VintagePhoto key={i} id={p.id} alt={p.alt} />)}
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ svc }) {
  return <div style={{ background:'#FAF5E0', padding:'4px 4px 22px', boxShadow:'0 6px 20px rgba(43,26,14,.3), inset 0 0 0 1px rgba(196,146,37,.35)', borderRadius:'2px', position:'relative' }}><div style={{ overflow:'hidden', aspectRatio:'1', background:'#E8D8A0' }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={U(svc.photo, 400)} alt={svc.en} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} /></div><div style={{ position:'absolute', bottom:'4px', left:'6px', right:'6px', textAlign:'center', fontSize:'.7rem', color:'#8B5E1A', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{svc.en}</div></div>
}

function InclusionCard({ item }) {
  return (
    <div style={{ background:'#FAF5E0', borderRadius:'5px', overflow:'hidden', boxShadow:'0 6px 22px rgba(43,26,14,.22), inset 0 0 0 1px rgba(196,146,37,.3)', display:'flex', flexDirection:'column' }}>
      <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', background:'#E8D8A0', flexShrink:0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={U(item.photo, 500)} alt={item.title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 50%)' }} />
        <span style={{ position:'absolute', top:'7px', left:'8px', fontSize:'1.3rem', lineHeight:1, filter:'drop-shadow(0 1px 3px rgba(0,0,0,.5))' }}>{item.icon}</span>
        <div style={{ position:'absolute', bottom:'6px', left:'8px', fontSize:'.6rem', color:'#4ade80', letterSpacing:'.08em', fontWeight:700 }}>✔ included</div>
      </div>
      <div style={{ padding:'9px 12px 11px', background:'#FAF0CC', backgroundImage:GRAIN, borderTop:'1px solid rgba(196,146,37,.35)' }}>
        <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'.88rem', color:'#3A1408', lineHeight:1.3 }}>{item.title}</span>
      </div>
    </div>
  )
}

function FaqItem({ faq, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background:'#FAF0CC', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'4px', overflow:'hidden' }}>
      <button onClick={() => setOpen(v => !v)} style={{ width:'100%', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'14px', padding:'16px 20px', cursor:'pointer', border:'none', background:'transparent', fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'clamp(.95rem,1.8vw,1.05rem)', color:'#2B1A0E', lineHeight:1.4 }} aria-expanded={open}>
        <span>{faq.q}</span>
        <span style={{ flexShrink:0, width:'22px', height:'22px', borderRadius:'50%', background:open?'#B5421A':'#C49225', display:'flex', alignItems:'center', justifyContent:'center', color:'#FAF5E0', fontSize:'.8rem', fontWeight:900 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding:'14px 20px 18px', fontFamily:"'Mukta',sans-serif", fontSize:'.97rem', color:'#4A2E12', lineHeight:1.65, borderTop:'1px solid rgba(196,146,37,.3)' }}>{faq.a}</div>}
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <div className="big-hi" aria-hidden="true">काशी</div>
      <div className="wrap">
        <div className="foot">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="/" className="logo" style={{ marginBottom:'14px' }}><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Sathi" style={{ height:'60px', width:'auto', display:'block' }} /></a>
            <p style={{ fontSize:'.93rem', maxWidth:'22rem', color:'#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
          </div>
          <div><h4>Tours</h4><ul>
            <li><a href="/tours">All Packages</a></li>
            <li><a href="/tours/varanasi-tour-package-3-days-2-nights">Varanasi 3D/2N</a></li>
            <li><a href="/tours/varanasi-complete-tour-package">Complete Tour</a></li>
            <li><a href="/tours/varanasi-ayodhya-prayagraj-tour-package">Tri-city Yatra</a></li>
          </ul></div>
          <div><h4>Services</h4><ul>
            <li><a href="/services/cab">Cab Booking</a></li>
            <li><a href="/services/boat">Boat Rides</a></li>
            <li><a href="/services/hotel">Hotels</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul></div>
          <div><h4>Contact</h4><ul>
            <li>Varanasi, Uttar Pradesh</li>
            <li><a href="tel:+919277472279">+91 92774 72279</a></li>
            <li>info@yatraksathi.com</li>
          </ul></div>
        </div>
        <div className="copy">
          <span>© {new Date().getFullYear()} Yatra Ke Sathi</span>
          <span>Photos: Unsplash</span>
        </div>
      </div>
    </footer>
  )
}

/* ── Page ─────────────────────────────────────────────────── */

export default function Varanasi3D2NPage() {
  const today = new Date().toISOString().slice(0, 10)

  const [form, setForm]     = useState({ name: '', phone: '', people: '', start_date: '', customer_notes: '' })
  const [status, setStatus] = useState('idle')   // idle | submitting | success | error
  const [errMsg, setErrMsg] = useState('')
  const [videoMuted, setVideoMuted] = useState(true)
  const videoRef = useRef(null)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('submitting')
    setErrMsg('')

    try {
      const payload = {
        name:          form.name.trim(),
        phone:         form.phone.trim(),
        services:      ['tour'],
        cities:        ['kashi'],
        start_date:    form.start_date || undefined,
        num_people:    form.people || '2',
        num_days:      '3',
        package_name:  PKG_NAME,
        customer_notes: form.customer_notes.trim() || undefined,
        page_source:   'tours/varanasi-3d2n',
      }
      Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrMsg(typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrMsg('Could not connect. Please try WhatsApp below.')
      setStatus('error')
    }
  }

  const waEnquire = `${WA_BASE}?text=${encodeURIComponent(`Namaste! I am interested in the ${PKG_NAME}. Please share details.`)}`

  return (
    <div style={{ background:'#F5E8AE', backgroundImage:GRAIN, minHeight:'100vh', color:'#2B1A0E', fontFamily:"'Mukta',system-ui,sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="topbar" style={{ background:'#6B2509' }}><div className="wrap">
        <span className="hi">हर हर महादेव · काशी यात्रा · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN_COUNT }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Book This Tour" ctaHref="#v3d-form" />

      <main>
        <style>{`
          .v3d-hero{position:relative;overflow:hidden;min-height:88vh;display:flex;align-items:center;}
          .v3d-hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;z-index:0}
          .v3d-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(12,3,0,.95) 0%,rgba(12,3,0,.55) 45%,rgba(12,3,0,.15) 100%)}
          .v3d-hinner{position:relative;z-index:2;padding:clamp(80px,10vw,120px) clamp(16px,5vw,48px) clamp(48px,6vw,80px);max-width:780px;margin:0 auto;text-align:center;width:100%}
          .v3d-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
          @media(min-width:860px){.v3d-svc-grid{grid-template-columns:repeat(6,1fr);gap:12px}}
          @keyframes v3d-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .v3d-slider{overflow:hidden;padding:36px 0 48px;width:100%}
          .v3d-scroll-track{display:flex;flex-wrap:nowrap;width:max-content;animation:v3d-scroll 28s linear infinite;will-change:transform}
          .v3d-scroll-track:hover{animation-play-state:paused}
          .v3d-slide{flex:0 0 140px;width:140px;margin-right:22px}
          .v3d-route{display:flex;align-items:flex-start;justify-content:center;gap:0;flex-wrap:nowrap}
          .v3d-route-city{display:flex;flex-direction:column;align-items:center;flex:1;min-width:0}
          .v3d-route-line{flex:1;height:2px;background:linear-gradient(90deg,#B5421A,#C49225);margin-top:18px}
        `}</style>

        {/* ── Hero ── */}
        <section className="v3d-hero">
          <video
            ref={videoRef}
            className="v3d-hero-video"
            src="/videos/Ganga-Aarti-Varanasi-SnapYT.App.mp4"
            autoPlay muted loop playsInline
            poster={U('1627894483216-2138af692e32', 1400)}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          />
          <button
            onClick={() => { if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setVideoMuted(v => !v) } }}
            aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
            style={{ position:'absolute', bottom:'24px', right:'24px', zIndex:4, background:'rgba(0,0,0,.45)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.2)', borderRadius:'50%', width:'40px', height:'40px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', color:'#fff' }}
          >{videoMuted ? '🔇' : '🔊'}</button>
          <div className="v3d-overlay" />
          <div className="v3d-hinner">
            <nav style={{ position:'absolute', top:'clamp(10px,2vw,18px)', left:'50%', transform:'translateX(-50%)', fontSize:'.76rem', color:'rgba(255,255,255,.7)', display:'flex', gap:'5px', flexWrap:'wrap', justifyContent:'center', zIndex:3, whiteSpace:'nowrap' }}>
              <a href="/" style={{ color:'#fff', textDecoration:'underline' }}>Home</a><span>›</span>
              <a href="/tours" style={{ color:'#fff', textDecoration:'underline' }}>Tours</a><span>›</span>
              <span>Varanasi 3D/2N</span>
            </nav>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', fontSize:'.78rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#F4A81D', marginBottom:'14px' }}>
              <span>Varanasi</span>
              <span style={{ color:'rgba(244,168,29,.45)' }}>|</span>
              <span style={{ color:'rgba(255,255,255,.6)', fontWeight:400, letterSpacing:'.08em' }}>3 Days · 2 Nights · Kashi Darshan</span>
            </div>
            <GoldRule margin="0 0 14px" />
            <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2.6rem,7vw,4.6rem)', color:'#FFFFFF', textShadow:'0 3px 28px rgba(0,0,0,.75)', lineHeight:.95, marginBottom:'12px', letterSpacing:'-.02em' }}>Varanasi Tour Package</h1>
            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:400, fontStyle:'italic', fontSize:'clamp(1.2rem,3vw,1.9rem)', color:'rgba(255,255,255,.75)', marginBottom:'10px' }}>3 Days · 2 Nights</div>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'clamp(1rem,2.5vw,1.4rem)', color:'#D4956A', marginBottom:'28px' }}>काशी दर्शन · हर हर महादेव</div>
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'28px', justifyContent:'center' }}>
              <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#25D366', color:'#fff', borderRadius:'4px', padding:'14px 28px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 20px rgba(37,211,102,.45)' }}>
                <WaIcon size={20} color="#fff" /> WhatsApp Us
              </a>
              <a href="#v3d-form" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.35)', color:'#FAF5E0', borderRadius:'4px', padding:'14px 24px', fontWeight:700, fontSize:'1rem', textDecoration:'none' }}>
                📋 Book Now
              </a>
            </div>
            <div style={{ display:'flex', gap:'0', flexWrap:'wrap', borderTop:'1px solid rgba(244,168,29,.18)', paddingTop:'20px', justifyContent:'center' }}>
              {[{ num:'3', label:'Days' }, { num:'2', label:'Nights' }, { num:'5+', label:'Temples' }, { num:'500+', label:'Pilgrims' }].map((s, i) => (
                <div key={s.label} style={{ display:'flex', alignItems:'center' }}>
                  {i > 0 && <div style={{ width:'1px', height:'32px', background:'rgba(244,168,29,.2)', margin:'0 4px' }} />}
                  <div style={{ textAlign:'center', padding:'0 18px' }}>
                    <div style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:'clamp(1rem,2.2vw,1.3rem)', color:'#F4C87A', lineHeight:1 }}>{s.num}</div>
                    <div style={{ fontSize:'.6rem', color:'rgba(255,255,255,.5)', letterSpacing:'.1em', textTransform:'uppercase', marginTop:'3px' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust Marquee ── */}
        <style>{`@keyframes v3d-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.v3d-marquee-track{display:flex;width:max-content;animation:v3d-marquee 30s linear infinite}`}</style>
        <div style={{ background:'linear-gradient(90deg,#3A1408,#6B2509,#3A1408)', borderBottom:'1px solid rgba(196,146,37,.3)', overflow:'hidden', padding:'10px 0' }}>
          <div className="v3d-marquee-track">
            {[...Array(2)].flatMap(() => [
              { icon:'⭐', text:'4.9★ Google Rating' },
              { icon:'👥', text:'500+ Pilgrims Served' },
              { icon:'📍', text:'Varanasi Based' },
              { icon:'⚡', text:'Reply within 2 Hours' },
              { icon:'🛕', text:'5+ Temples in 3 Days' },
              { icon:'🔒', text:'No Advance to Enquire' },
              { icon:'🚗', text:'AC Cab Included' },
              { icon:'⛵', text:'Sunrise Boat Ride Included' },
            ]).map((t, i) => (
              <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'0 32px', whiteSpace:'nowrap', fontSize:'.82rem', color:'rgba(250,245,224,.85)' }}>
                <span>{t.icon}</span>{t.text}
                <span style={{ color:'rgba(196,146,37,.5)', marginLeft:'32px' }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Route overview ── */}
        <div style={{ padding:'0 0 0' }}><div className="wrap">
          <GoldRule margin="0 0 32px" />
          <div className="v3d-route">
            {ROUTE.map((rt, i) => (<Fragment key={rt.city}>
              <div key={rt.city} className="v3d-route-city">
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'linear-gradient(135deg,#B5421A,#6B2509)', border:'3px solid #C49225', display:'flex', alignItems:'center', justifyContent:'center', color:'#FAF5E0', fontWeight:900, fontSize:'.85rem' }}>{i+1}</div>
                <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'clamp(.9rem,2vw,1.1rem)', color:'#6B2509', marginTop:'8px', textAlign:'center' }}>{rt.city}</div>
                <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'.8rem', color:'#B5421A', marginTop:'2px' }}>{rt.hi}</div>
                <div style={{ fontSize:'.72rem', color:'#8B5E1A', fontWeight:600, marginTop:'4px', background:'rgba(196,146,37,.15)', borderRadius:'10px', padding:'2px 8px', textAlign:'center' }}>{rt.nights}</div>
                <div style={{ fontSize:'.68rem', color:'#A07840', marginTop:'2px' }}>{rt.days}</div>
              </div>
              {i < ROUTE.length - 1 && <div className="v3d-route-line" />}
            </Fragment>))}
          </div>
          <GoldRule margin="32px 0 0" />
        </div></div>

        {/* ── Enquiry Form ── */}
        <section id="v3d-form" style={{ padding:'20px 0 28px' }}>
          <div className="wrap" style={{ maxWidth:'780px', position:'relative', filter:'drop-shadow(0 4px 22px rgba(90,50,10,0.24))' }}>
            <div style={{ position:'absolute', inset:0, zIndex:0 }} dangerouslySetInnerHTML={{ __html: TORN_PAPER_SVG }} />
            <div style={{ position:'relative', zIndex:1, padding:'clamp(44px,7vw,72px) clamp(60px,12vw,100px) clamp(64px,10vw,88px)' }}>
              {status === 'success' ? (
                <div style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px' }}>
                  <div style={{ fontSize:'3rem' }}>🙏</div>
                  <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.6rem,4vw,2.4rem)', color:'#6B2509' }}>Enquiry Received!</h2>
                  <p style={{ color:'#5A3F28', maxWidth:'360px', lineHeight:1.65 }}>Our team will confirm your booking on WhatsApp within 2 hours. Looking forward to your Kashi darshan.</p>
                  <GoldRule margin="4px 0" />
                  <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 24px', background:'#25D366', color:'#fff', borderRadius:'4px', fontWeight:700, textDecoration:'none' }}>
                    <WaIcon size={18} color="#fff" /> Also chat on WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <div style={{ textAlign:'center', marginBottom:'32px' }}>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(181,66,26,.12)', border:'1px solid rgba(181,66,26,.25)', borderRadius:'20px', padding:'4px 12px', fontSize:'.72rem', fontWeight:700, color:'#B5421A', marginBottom:'10px' }}>
                      🔥 Popular dates filling fast — limited slots
                    </div>
                    <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.9rem,4vw,2.8rem)', color:'#6B2509', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'12px' }}>Book This Tour</h2>
                    <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'8px 16px', marginBottom:'14px' }}>
                      {[['⭐','4.9 Rating'],['👥','500+ Pilgrims'],['⚡','Reply in 2 hrs'],['📍','Varanasi Based']].map(([icon, label]) => (
                        <span key={label} style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'.72rem', color:'#5A3F28', fontWeight:600 }}>
                          <span>{icon}</span>{label}
                        </span>
                      ))}
                    </div>
                    <GoldRule margin="4px auto 0" />
                  </div>
                  <style>{`
                    .v3d-fg{display:grid;grid-template-columns:1fr 1fr;column-gap:28px;row-gap:22px}
                    @media(max-width:580px){.v3d-fg{grid-template-columns:1fr}}
                    .v3d-fl label{display:block;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:#7A4A1A;margin-bottom:4px}
                    .v3d-fl input,.v3d-fl select,.v3d-fl textarea{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(139,94,26,0.55);border-radius:0;padding:7px 2px;font-family:Georgia,serif;font-size:1rem;color:#2B1A0E;outline:none;box-sizing:border-box;resize:none}
                    .v3d-fl input:focus,.v3d-fl select:focus,.v3d-fl textarea:focus{border-bottom-color:#B5421A}
                    .v3d-fl input::placeholder,.v3d-fl textarea::placeholder{color:rgba(139,94,26,0.45);font-style:italic}
                    .v3d-fl select{appearance:none;cursor:pointer}
                    .v3d-full{grid-column:1/-1}
                    .v3d-sub{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#8B3A10,#5A2008);color:#FAF5E0;border:none;border-radius:2px;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-weight:700;font-size:1rem;cursor:pointer;letter-spacing:.08em;box-shadow:0 3px 14px rgba(139,58,16,.35);transition:opacity .18s}
                    .v3d-sub:hover{opacity:.88}
                    .v3d-sub:disabled{opacity:.55;cursor:not-allowed}
                  `}</style>
                  <form onSubmit={handleSubmit} style={{ background:'transparent', border:'none', padding:0 }}>
                    <div className="v3d-fg">
                      <div className="v3d-fl">
                        <label htmlFor="v3d-name">Full Name *</label>
                        <input id="v3d-name" name="name" type="text" required placeholder="e.g. Ramesh Sharma" autoComplete="name" value={form.name} onChange={handleChange} />
                      </div>
                      <div className="v3d-fl">
                        <label htmlFor="v3d-phone">Mobile / WhatsApp *</label>
                        <input id="v3d-phone" name="phone" type="tel" required placeholder="+91 98765 43210" autoComplete="tel" value={form.phone} onChange={handleChange} />
                      </div>
                      <div className="v3d-fl">
                        <label htmlFor="v3d-people">No. of Travellers *</label>
                        <select id="v3d-people" name="people" required value={form.people} onChange={handleChange}>
                          <option value="">Select travellers</option>
                          {['1','2','3','4','5','6','7','8','9','10','10+'].map(n => <option key={n} value={n}>{n} {n==='1'?'person':'people'}</option>)}
                        </select>
                      </div>
                      <div className="v3d-fl">
                        <label htmlFor="v3d-date">Expected Travel Date</label>
                        <input id="v3d-date" name="start_date" type="date" min={today} value={form.start_date} onChange={handleChange} />
                      </div>
                      <div className="v3d-fl">
                        <label htmlFor="v3d-note">Special Requirements</label>
                        <input id="v3d-note" name="customer_notes" type="text" placeholder="e.g. senior citizens, vegetarian…" value={form.customer_notes} onChange={handleChange} />
                      </div>
                      {status === 'error' && (
                        <div className="v3d-full" style={{ background:'#fdf2f2', border:'1px solid #f5c6c6', borderRadius:'6px', padding:'10px 14px', fontSize:'.88rem', color:'#9b2c2c' }}>
                          {errMsg} · <a href={waEnquire} target="_blank" rel="noopener">Message us on WhatsApp</a>
                        </div>
                      )}
                      <div className="v3d-full">
                        <button type="submit" className="v3d-sub" disabled={status === 'submitting'}>
                          {status === 'submitting' ? 'Sending…' : 'Book Now — Send Enquiry'}
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── How it Works ── */}
        <div style={{ background:'linear-gradient(105deg,#3A1408,#6B2509,#3A1408)', borderTop:'1px solid rgba(196,146,37,.2)', borderBottom:'1px solid rgba(196,146,37,.2)', padding:'22px 0' }}>
          <div className="wrap">
            <div style={{ display:'flex', alignItems:'flex-start', flexWrap:'wrap', justifyContent:'center' }}>
              {[
                { step:'01', icon:'💬', title:'Send Enquiry',        desc:'Fill the form or WhatsApp us. No payment needed.' },
                { step:'02', icon:'📋', title:'Get Your Plan',       desc:'We confirm on WhatsApp within 2 hours with full itinerary.' },
                { step:'03', icon:'🚗', title:'We Handle Everything', desc:'Cab, guide, hotel, darshan — just arrive and enjoy.' },
              ].map((h, i, arr) => (
                <div key={h.step} style={{ display:'flex', alignItems:'flex-start', flex:'1 1 160px' }}>
                  <div style={{ textAlign:'center', padding:'0 16px', flex:1 }}>
                    <div style={{ fontSize:'1.3rem', marginBottom:'4px' }}>{h.icon}</div>
                    <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'.88rem', color:'#F4C87A', marginBottom:'3px' }}>{h.title}</div>
                    <p style={{ fontSize:'.74rem', color:'rgba(250,245,224,.6)', lineHeight:1.5, margin:0 }}>{h.desc}</p>
                  </div>
                  {i < arr.length - 1 && <div style={{ color:'rgba(196,146,37,.4)', fontSize:'1.2rem', paddingTop:'10px', flexShrink:0 }}>›</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Itinerary ── */}
        <section style={{ padding:'60px 0 20px' }}>
          <div className="wrap" style={{ textAlign:'center', marginBottom:'40px' }}>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>तीन दिन की पवित्र यात्रा</div>
            <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,2.8rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'8px' }}>Day-by-Day Itinerary</h2>
            <p style={{ color:'#5A3F28', maxWidth:'46rem', margin:'0 auto', fontSize:'1rem' }}>Varanasi — 2 nights, 3 full days of temples, Sparsh Darshan, Sarnath and Vindhyachal.</p>
            <GoldRule margin="18px auto 0" />
          </div>
          <div className="wrap" style={{ display:'flex', flexDirection:'column', gap:'26px' }}>
            {DAYS.map(d => <DayCard key={d.day} d={d} />)}
          </div>
        </section>

        <div style={{ textAlign:'center', padding:'32px 0 0' }}>
          <a href="#v3d-form" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'14px 32px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.35)' }}>
            📋 Book This Tour
          </a>
        </div>
        <div style={{ overflow:'hidden', padding:'32px 0 0' }}><TempleSkyline /></div>

        {/* ── Package Includes ── */}
        <section style={{ padding:'70px 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap">
            <div style={{ textAlign:'center', marginBottom:'42px' }}>
              <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>पैकेज में क्या शामिल है</div>
              <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'8px' }}>Package Includes</h2>
              <GoldRule margin="18px auto 0" />
            </div>
            <style>{`.v3d-inc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}@media(min-width:640px){.v3d-inc-grid{grid-template-columns:repeat(4,1fr)}}@media(min-width:1024px){.v3d-inc-grid{grid-template-columns:repeat(6,1fr)}}@media(max-width:639px){.v3d-hide-mobile{display:none!important}}`}</style>
            <div className="v3d-inc-grid">
              {INCLUSIONS.map(item => (
                <div key={item.title} className={item.title === 'Temple Circuit' ? 'v3d-hide-mobile' : ''}>
                  <InclusionCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trip Diaries ── */}
        <section style={{ padding:'70px 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN, overflow:'hidden' }}>
          <div className="wrap">
            <div style={{ textAlign:'center', marginBottom:'40px' }}>
              <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>यात्रियों की यादें</div>
              <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'8px' }}>Glimpses of Past Yatras</h2>
              <GoldRule margin="18px auto 0" />
            </div>
          </div>
          <div className="v3d-slider">
            <div className="v3d-scroll-track">
              {[...TRIP_DIARIES, ...TRIP_DIARIES].map((t, i) => {
                const tilts = [-4, 3, -2, 4, -3, 2]
                const lifts = [-14, 10, -8, 16, -10, 8]
                const tilt  = tilts[i % tilts.length]
                const lift  = lifts[i % lifts.length]
                return (
                  <div key={`${t.name}-${i}`} className="v3d-slide" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ transform:`rotate(${tilt}deg) translateY(${lift}px)`, width:'100%' }}>
                    <div style={{ background:'#FAF5E0', padding:'4px 4px 4px', boxShadow:'0 8px 28px rgba(0,0,0,.35), inset 0 0 0 1px rgba(196,146,37,.3)', borderRadius:'2px', position:'relative' }}>
                      <div style={{ aspectRatio:'3/4', overflow:'hidden', background:'#E8D8A0', position:'relative' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={U(t.photo, 400)} alt={t.caption} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 50%)' }} />
                        <div style={{ position:'absolute', bottom:'7px', left:'7px', right:'7px' }}>
                          <div style={{ fontSize:'.58rem', color:'rgba(255,255,255,.85)', fontStyle:'italic', lineHeight:1.35, marginBottom:'4px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>"{t.review}"</div>
                          <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'.7rem', color:'#fff', lineHeight:1.2 }}>{t.name}</div>
                          <div style={{ display:'flex', alignItems:'center', gap:'4px', marginTop:'1px' }}>
                            <span style={{ color:'#F4C87A', fontSize:'.58rem', letterSpacing:'1px' }}>{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</span>
                            <span style={{ fontSize:'.55rem', color:'rgba(255,255,255,.55)' }}>{t.city}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div style={{ textAlign:'center', padding:'0 0 48px', background:'linear-gradient(180deg,#F5E8AE,#EDD690)', backgroundImage:GRAIN }}>
          <a href="#v3d-form" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'14px 32px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.35)' }}>
            📋 Book This Tour
          </a>
        </div>

        {/* ── FAQ ── */}
        <section style={{ padding:'70px 0 80px' }}>
          <div className="wrap">
            <div style={{ textAlign:'center', marginBottom:'40px' }}>
              <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>सामान्य प्रश्न</div>
              <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'8px' }}>Frequently Asked Questions</h2>
              <GoldRule margin="18px auto 0" />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', maxWidth:'820px', margin:'0 auto' }}>
              {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding:'70px 0 90px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap" style={{ textAlign:'center', maxWidth:'640px' }}>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1.1rem', color:'#B5421A', marginBottom:'10px' }}>हर हर महादेव · काशी बुलाती है</div>
            <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,5vw,3.2rem)', color:'#6B2509', letterSpacing:'-1px', lineHeight:1.1, marginBottom:'16px' }}>Your Kashi awaits.<br/>We&apos;ll take care of everything.</h2>
            <p style={{ color:'#5A3F28', fontSize:'1rem', lineHeight:1.7, marginBottom:'28px' }}>500+ pilgrims guided. Zero hidden charges. Confirmed on WhatsApp within 2 hours — no advance needed to enquire.</p>
            <GoldRule margin="0 auto 28px" />
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', marginBottom:'20px' }}>
              <a href="#v3d-form" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'15px 34px', borderRadius:'4px', fontWeight:700, fontSize:'1.05rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.4)' }}>
                📋 Book This Tour
              </a>
              <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#25D366', color:'#fff', padding:'15px 28px', borderRadius:'4px', fontWeight:700, fontSize:'1.05rem', textDecoration:'none' }}>
                <WaIcon size={20} color="#fff" /> WhatsApp Us
              </a>
            </div>
            <a href="tel:+919277472279" style={{ fontSize:'.9rem', color:'#B5421A', fontWeight:700, textDecoration:'none' }}>📞 +91 92774 72279 · Varanasi</a>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .v3d-sticky{display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;background:linear-gradient(105deg,#6B2509,#B5421A);padding:10px 16px;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 -4px 20px rgba(43,26,14,.35);border-top:1px solid rgba(196,146,37,.35)}
        @media(max-width:720px){.v3d-sticky{display:flex}.fab{bottom:76px !important}}
      `}</style>
      <div className="v3d-sticky">
        <div style={{ color:'#FAF5E0' }}>
          <strong style={{ fontFamily:"'Fraunces',serif", fontSize:'1rem', display:'block', lineHeight:1 }}>Varanasi 3D / 2N</strong>
          <span style={{ fontSize:'.7rem', color:'rgba(250,245,224,.65)' }}>Stay · Boat · Guide · Cab · Food</span>
        </div>
        <a href="#v3d-form" style={{ display:'flex', alignItems:'center', gap:'7px', background:'#FAF0CC', color:'#6B2509', padding:'10px 18px', borderRadius:'4px', fontWeight:700, fontSize:'.92rem', textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>
          📋 Book Now
        </a>
      </div>

      <a href={waEnquire} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <WaIcon size={26} color="#fff" />
      </a>
    </div>
  )
}
