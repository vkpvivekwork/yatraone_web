'use client'
import { useState, useRef } from 'react'
import Navbar from '@/app/components/Navbar'

const API_URL  = 'https://yatra.pythonanywhere.com/api/bookings/'
const WA       = '919277472279'
const WA_BASE  = `https://wa.me/${WA}`
const TORAN    = 60
const PKG_NAME = 'Varanasi Bike Tour Kashi on Two Wheels 1 Day'
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/* ── Torn-paper SVG ───────────────────────────────────────── */
function generateTornPaperSVG() {
  const W = 600, H = 900; let seed = 53
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
  for(let i=0;i<26;i++){const side=Math.floor(r(0,4));let cx=r(0,W),cy=r(0,H);const inset=r(0,70);if(side===0)cy=inset;else if(side===1)cx=W-inset;else if(side===2)cy=H-inset;else cx=inset;stains+=`<ellipse cx="${cx}" cy="${cy}" rx="${r(20,70)}" ry="${r(15,55)}" fill="#c98a45" opacity="${r(0.08,0.2)}" filter="url(#vbt-soft)"/>`}
  let creases=''
  function crease(x,y,ang,segs,depth){let pd=`M${x.toFixed(1)} ${y.toFixed(1)}`;for(let i=0;i<segs;i++){ang+=r(-0.45,0.45);const l=r(10,32);x+=Math.cos(ang)*l;y+=Math.sin(ang)*l;pd+=` L${x.toFixed(1)} ${y.toFixed(1)}`;if(depth<2&&rand()<0.18)crease(x,y,ang+r(-1.2,1.2),Math.floor(r(2,5)),depth+1)};const o=r(0.25,0.5);creases+=`<path d="${pd}" stroke="#fff4dc" stroke-width="${r(0.6,1.3).toFixed(2)}" opacity="${o.toFixed(2)}" fill="none" stroke-linejoin="round"/>`;creases+=`<path d="${pd}" transform="translate(0.9 0.9)" stroke="#a87440" stroke-width="0.6" opacity="${(o*0.35).toFixed(2)}" fill="none" stroke-linejoin="round"/>`}
  for(let i=0;i<55;i++)crease(r(0,W),r(0,H),r(0,Math.PI*2),Math.floor(r(3,9)),0)
  return `<svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="vbt-tear"><path d="${d}"/></clipPath><radialGradient id="vbt-base" cx="52%" cy="48%" r="70%"><stop offset="0%" stop-color="#ffe9bf"/><stop offset="45%" stop-color="#fce1b2"/><stop offset="78%" stop-color="#f0c993"/><stop offset="100%" stop-color="#e3b073"/></radialGradient><filter id="vbt-blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="11"/><feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.52  0 0 0 0 0.24  1.6 0 0 0 -0.7"/></filter><filter id="vbt-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.36  0 0 0 0 0.15  0 0 0 0.5 0"/></filter><filter id="vbt-fray" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="2" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="vbt-edgeGlow"><feGaussianBlur stdDeviation="10"/></filter><filter id="vbt-rim"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="vbt-soft"><feGaussianBlur stdDeviation="12"/></filter></defs><g filter="url(#vbt-fray)"><g clip-path="url(#vbt-tear)"><rect width="${W}" height="${H}" fill="url(#vbt-base)"/><rect width="${W}" height="${H}" filter="url(#vbt-blotch)" opacity="0.35"/>${stains}<rect width="${W}" height="${H}" filter="url(#vbt-grain)" opacity="0.28"/>${creases}<path d="${d}" fill="none" stroke="#d6a466" stroke-width="50" opacity="0.4" filter="url(#vbt-edgeGlow)"/><path d="${d}" fill="none" stroke="#b3773a" stroke-width="5" opacity="0.55" filter="url(#vbt-rim)"/><path d="${d}" fill="none" stroke="#9a6128" stroke-width="1.4" opacity="0.35"/></g></g></svg>`
}
const TORN_PAPER_SVG = generateTornPaperSVG()

/* ── Data ─────────────────────────────────────────────────── */

const ROUTE_STOPS = [
  {
    time: 'Morning (5:30 – 8:00 AM)', icon: '🌅',
    title: 'Sunrise Start — Assi Ghat',
    km: 'Start point',
    activities: [
      'Pick up scooty / bike at Assi Ghat — helmet & route map handed over',
      'Subah-e-Banaras — music & yoga on the ghat (5:30 AM)',
      'Ride along the ghat road at sunrise — golden hour views',
      'Banarasi chai & kachori at a local stall near Lanka Gate',
      'BHU New Vishwanath (Birla) Temple — quick darshan',
    ],
    photos: [
      { id: '1571536802807-30451e3955d8', alt: 'Assi Ghat sunrise' },
      { id: '1596097825168-c9b773f404ff', alt: 'Ghat road at dawn' },
      { id: '1608412525537-662195e817c5', alt: 'Banarasi chai stall' },
    ],
  },
  {
    time: 'Mid Morning (8:30 – 11:30 AM)', icon: '🛕',
    title: 'South Kashi Temple Loop',
    km: '~8 km loop',
    activities: [
      'Durga Mata Mandir (Durgakund) — 5 min ride from BHU',
      'Sankat Mochan Hanuman Temple — park & enter',
      'Tulsi Manas Mandir — where Tulsidas wrote Ramcharitmanas',
      'Ride through the narrow old-city lanes to Kaal Bhairav Mandir',
      'Maa Annapurna Devi Temple & Kashi Vishwanath Corridor (park at Godowlia)',
      'Street photography — silk weavers, flower sellers, chai wallahs',
    ],
    photos: [
      { id: '1665413791167-6718dcf36773', alt: 'Kaal Bhairav Temple' },
      { id: '1561359313-0639aad49ca6', alt: 'Old city lanes' },
      { id: '1513475382585-d06e58bcb0e0', alt: 'Silk market Varanasi' },
    ],
  },
  {
    time: 'Afternoon (12:00 – 3:00 PM)', icon: '🏛️',
    title: 'Sarnath Ride — 12 km Out',
    km: '~12 km from city',
    activities: [
      'Ride out of the city north-east to Sarnath (~25 min)',
      'Dhamek Stupa — where Buddha gave his first sermon',
      'Sarnath Deer Park — peaceful grounds & monasteries',
      'Sarnath Archaeological Museum (optional entry)',
      'Lunch at a local dhaba on the Sarnath road (own cost)',
      'Return ride back into the city',
    ],
    photos: [
      { id: '1649876674933-a5b3b39b4da1', alt: 'Dhamek Stupa — Sarnath' },
      { id: '1634920540678-df0e179c5243', alt: 'Sarnath Deer Park' },
      { id: '1705952484283-19c31e37e0e4', alt: 'Buddhist monastery Sarnath' },
    ],
  },
  {
    time: 'Late Afternoon (3:30 – 5:30 PM)', icon: '🏰',
    title: 'Ramnagar Fort — Across the Ganga',
    km: '~10 km via bridge',
    activities: [
      'Ride south across the Ganga bridge to Ramnagar',
      'Ramnagar Fort — 18th century Maharaja palace',
      'Fort museum — vintage cars, weapons, royal artefacts',
      'View of Varanasi skyline from across the river',
      'Ride back via the bridge — sunset over the Ganga',
    ],
    photos: [
      { id: '1627894483216-2138af692e32', alt: 'Ramnagar Fort Varanasi' },
      { id: '1596097825168-c9b773f404ff', alt: 'Ganga bridge ride' },
      { id: '1608412525537-662195e817c5', alt: 'Varanasi from across river' },
    ],
  },
  {
    time: 'Evening (6:00 – 8:30 PM)', icon: '🕯️',
    title: 'Dashashwamedh Ghat — Ganga Aarti',
    km: 'Back to city center',
    activities: [
      'Ride to Dashashwamedh Ghat — park near Godowlia',
      'Evening Ganga Aarti — 7 priests, fire lamps & conch shells',
      'Flower diya floating on the Ganga',
      'Godowlia market walk — Banarasi paan & street snacks',
      'Return scooty to Assi Ghat pickup point',
    ],
    photos: [
      { id: '1627894483216-2138af692e32', alt: 'Ganga Aarti ceremony' },
      { id: '1705952484283-19c31e37e0e4', alt: 'Diya floating Ganga' },
      { id: '1561359313-0639aad49ca6', alt: 'Godowlia evening market' },
    ],
  },
]

const PACKAGES = [
  {
    id: 'self',
    label: 'Self-Ride',
    price: '₹999',
    note: 'per person · Min 1 person',
    badge: 'POPULAR',
    highlight: false,
    inclusions: [
      'Scooty / bike rental (8 hrs)',
      'Helmet & safety gear',
      'Printed route map (English + Hindi)',
      'Full fuel tank',
      'WhatsApp support during ride',
      'Pickup & drop at Assi Ghat',
    ],
    exclusions: [
      'Guide (you explore freely)',
      'Entry fees (Sarnath Museum, Ramnagar Fort)',
      'Meals & personal expenses',
      '5% GST',
    ],
  },
  {
    id: 'guided',
    label: 'Guided Ride',
    price: '₹1,499',
    note: 'per person · Min 2 persons',
    badge: 'BEST VALUE',
    highlight: true,
    inclusions: [
      'Scooty / bike rental (8 hrs)',
      'Local guide rides with you on their own bike',
      'Helmet & safety gear',
      'Full fuel tank',
      'All 5 route stops covered',
      'Temple darshan assistance',
      'Street food & local chai stops',
      'Photography spot recommendations',
      'Pickup & drop at Assi Ghat',
    ],
    exclusions: [
      'Entry fees (Sarnath Museum, Ramnagar Fort)',
      'Meals & personal expenses',
      '5% GST',
    ],
  },
]

const INCLUSIONS = [
  { photo: '1449965408869-eaa3f722e40d', icon: '🛵', title: 'Scooty / Bike Rental' },
  { photo: '1634920540678-df0e179c5243', icon: '⛑️', title: 'Helmet & Safety Gear' },
  { photo: '1513475382585-d06e58bcb0e0', icon: '🗺️', title: 'Route Map' },
  { photo: '1649876674933-a5b3b39b4da1', icon: '⛽', title: 'Full Fuel Tank' },
  { photo: '1627894483216-2138af692e32', icon: '🕯️', title: 'Ganga Aarti Stop' },
  { photo: '1561359313-0639aad49ca6', icon: '📞', title: 'WhatsApp Support' },
]

const TRIP_DIARIES = [
  { name: 'Rahul Mehta',    city: 'Pune',      stars: 5, photo: 'https://ik.imagekit.io/yatraksathi/TravelStories/gallery04.jpeg?updatedAt=1794591663323', review: 'Renting a scooty and riding to Sarnath at sunrise — absolute freedom. Best day in Varanasi by far.' },
  { name: 'Anjali Mishra',  city: 'Bhopal',    stars: 5, photo: 'https://ik.imagekit.io/yatraksathi/TravelStories/gallery05.jpeg?updatedAt=1794591675210', review: 'The guided ride was perfect. Our guide knew every shortcut in the old city — lanes a car never reaches.' },
  { name: 'Karan & Pooja',  city: 'Delhi',     stars: 5, photo: 'https://ik.imagekit.io/yatraksathi/TravelStories/gallery06.jpeg?updatedAt=1794591707022', review: 'Riding across the Ganga bridge to Ramnagar Fort at sunset was cinematic. 10/10 experience.' },
  { name: 'Suresh Kumar',   city: 'Patna',     stars: 4, photo: 'https://ik.imagekit.io/yatraksathi/TravelStories/gallery01.jpeg?updatedAt=1794591722929', review: 'Covered Sarnath, 3 temples and Ganga Aarti all in one day on a scooty. Highly efficient and fun.' },
  { name: 'Meena Agarwal',  city: 'Ahmedabad', stars: 5, photo: 'https://ik.imagekit.io/yatraksathi/TravelStories/gallery10.jpeg?updatedAt=1794591733950', review: 'As a solo female traveller, the guided option made me feel safe. Guide was respectful throughout.' },
  { name: 'Deepak Tiwari',  city: 'Jaipur',    stars: 5, photo: 'https://ik.imagekit.io/yatraksathi/TravelStories/gallery03.jpeg?updatedAt=1794591733055', review: 'Booked for 4 friends. We all rode together — absolute blast through the old city lanes.' },
]

const FAQS = [
  { q: 'Do I need a driving licence to rent a scooty?', a: 'Yes, a valid Indian driving licence (or international driving permit for foreign nationals) is required. We will ask for a photo copy at pickup.' },
  { q: 'What type of bikes / scooties are available?', a: 'We offer Honda Activa scooties (most popular), Hero Pleasure, and Royal Enfield Bullet 350 for those who prefer a classic Kashi ride. Availability subject to booking date.' },
  { q: 'Is the guided ride on the same bike or a separate one?', a: 'Your guide rides their own bike alongside you — you are always on your own scooty with full freedom. The guide leads the route, recommends stops, and assists at temples.' },
  { q: 'What is included in the Self-Ride package?', a: 'Scooty rental for 8 hours, helmet, safety gear, full fuel tank, printed route map (English + Hindi), and WhatsApp support in case you get lost or need help.' },
  { q: 'Can I modify the route or add extra stops?', a: 'Absolutely — the route is a recommendation, not a fixed itinerary. Feel free to linger at Sarnath longer or skip Ramnagar Fort. The scooty is yours for 8 hours.' },
  { q: 'Is the Sarnath visit included in both packages?', a: 'Yes — Sarnath is a 12 km ride and easily reachable. Entry to the Sarnath Archaeological Museum (₹20–40) is on your own. The guided package includes a local context walkthrough at the site.' },
  { q: 'What if the scooty breaks down?', a: 'We provide a roadside assistance number and WhatsApp support. For the guided package, your guide handles everything on-road. We will arrange a replacement vehicle if needed.' },
  { q: 'Is this suitable for first-time riders?', a: 'If you are comfortable on a gearless scooter in city traffic, yes. Varanasi traffic can be hectic in the old city — we recommend the Guided Ride for first-timers as your guide navigates the tricky lanes.' },
  { q: 'How is the booking confirmed?', a: '50% advance to confirm. Remaining on the day of the ride at pickup. Our team confirms pickup time and location via WhatsApp within 2 hours of booking.' },
]

/* ── Components ─────────────────────────────────────────────── */

function WaIcon({ size = 20, color = 'currentColor' }) {
  return <svg viewBox="0 0 32 32" fill={color} style={{ width:size, height:size, flexShrink:0 }}><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" /></svg>
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

function InclusionCard({ item }) {
  return (
    <div style={{ background:'#FAF5E0', borderRadius:'5px', overflow:'hidden', boxShadow:'0 6px 22px rgba(43,26,14,.22), inset 0 0 0 1px rgba(196,146,37,.3)', display:'flex', flexDirection:'column' }}>
      <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', background:'#E8D8A0', flexShrink:0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={U(item.photo, 500)} alt={item.title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 50%)' }} />
        <span style={{ position:'absolute', top:'7px', left:'8px', fontSize:'1.3rem', lineHeight:1, filter:'drop-shadow(0 1px 3px rgba(0,0,0,.5))' }}>{item.icon}</span>
        <div style={{ position:'absolute', bottom:'6px', left:'8px', fontSize:'.6rem', color:'#4ade80', letterSpacing:'.08em', fontWeight:700 }}>included</div>
      </div>
      <div style={{ padding:'9px 12px 11px', background:'#FAF0CC', backgroundImage:GRAIN, borderTop:'1px solid rgba(196,146,37,.35)' }}>
        <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'.88rem', color:'#3A1408', lineHeight:1.3 }}>{item.title}</span>
      </div>
    </div>
  )
}

function PkgCard({ pkg, waLink }) {
  return (
    <div style={{ flex:'1 1 280px', background:'#FAF0CC', backgroundImage:GRAIN, border:pkg.highlight?'2px solid #B5421A':'1.5px solid rgba(196,146,37,.45)', borderRadius:'5px', padding:'32px 26px 26px', position:'relative', boxShadow:pkg.highlight?'0 10px 36px rgba(181,66,26,.22)':'0 6px 24px rgba(43,26,14,.14)' }}>
      <div style={{ position:'absolute', top:'-14px', left:'24px', background:pkg.highlight?'#B5421A':'#7A5018', color:'#FAF5E0', borderRadius:'3px', padding:'3px 16px', fontSize:'.76rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{pkg.badge}</div>
      <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'1.3rem', color:'#2B1A0E', marginBottom:'2px' }}>{pkg.label}</div>
      <div style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:'2rem', color:pkg.highlight?'#B5421A':'#5A3F28', lineHeight:1, marginBottom:'4px' }}>{pkg.price}</div>
      <div style={{ fontSize:'.78rem', color:'#8B5E1A', marginBottom:'16px' }}>{pkg.note}</div>
      <GoldRule margin="0 0 16px" />
      <div style={{ marginBottom:'16px' }}>
        <div style={{ fontWeight:700, color:'#3A6B2E', fontSize:'.85rem', marginBottom:'8px' }}>What&apos;s Included</div>
        {pkg.inclusions.map(item => <div key={item} style={{ display:'flex', gap:'8px', padding:'5px 0', borderBottom:'1px dashed rgba(58,107,46,.2)', fontSize:'.88rem' }}><span style={{ color:'#3A6B2E', flexShrink:0 }}>✔</span><span>{item}</span></div>)}
      </div>
      <div style={{ marginBottom:'24px' }}>
        <div style={{ fontWeight:700, color:'#8B2020', fontSize:'.85rem', marginBottom:'8px' }}>Not Included</div>
        {pkg.exclusions.map(item => <div key={item} style={{ display:'flex', gap:'8px', padding:'5px 0', borderBottom:'1px dashed rgba(139,32,32,.18)', fontSize:'.88rem' }}><span style={{ color:'#8B2020', flexShrink:0 }}>✖</span><span>{item}</span></div>)}
      </div>
      <a href={waLink} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:pkg.highlight?'linear-gradient(135deg,#B5421A,#7A2E0E)':'linear-gradient(135deg,#7A5018,#4A3010)', color:'#FAF5E0', borderRadius:'4px', padding:'13px 20px', fontWeight:700, fontSize:'1rem', textDecoration:'none' }}>
        <WaIcon color="#FAF5E0" /> Book {pkg.label} on WhatsApp
      </a>
    </div>
  )
}

function FaqItem({ faq, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background:'#FAF0CC', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'4px', overflow:'hidden' }}>
      <button onClick={() => setOpen(v => !v)} style={{ width:'100%', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'14px', padding:'16px 20px', cursor:'pointer', border:'none', background:'transparent', fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'clamp(.95rem,1.8vw,1.05rem)', color:'#2B1A0E', lineHeight:1.4 }} aria-expanded={open}>
        <span>{faq.q}</span>
        <span style={{ flexShrink:0, width:'22px', height:'22px', borderRadius:'50%', background:open?'#B5421A':'#C49225', display:'flex', alignItems:'center', justifyContent:'center', color:'#FAF5E0', fontSize:'.8rem', fontWeight:900 }}>{open?'−':'+'}</span>
      </button>
      {open && <div style={{ padding:'14px 20px 18px', fontFamily:"'Mukta',sans-serif", fontSize:'.97rem', color:'#4A2E12', lineHeight:1.65, borderTop:'1px solid rgba(196,146,37,.3)' }}>{faq.a}</div>}
    </div>
  )
}

function SectionHead({ hi, title }) {
  return (
    <div style={{ textAlign:'center', marginBottom:'42px' }}>
      <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>{hi}</div>
      <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'8px' }}>{title}</h2>
      <GoldRule margin="18px auto 0" />
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
            <li><a href="/tours">All Tours</a></li>
            <li><a href="/tours/varanasi-temple-darshan">Kashi Temple Darshan</a></li>
            <li><a href="/tours/varanasi-complete-tour-package">Complete Tour 4D</a></li>
            <li><a href="/tours/heritage-walk">Heritage Walk</a></li>
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

/* ── Page ───────────────────────────────────────────────────── */

export default function VaranasiBikeTourPage() {
  const [openSlots, setOpenSlots] = useState([0])
  const today = new Date().toISOString().slice(0, 10)
  const [form, setForm]     = useState({ name:'', phone:'', start_date:'', num_people:'2', pkg_type:'', customer_notes:'' })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  const waEnquire = `${WA_BASE}?text=${encodeURIComponent(`Namaste! I am interested in the ${PKG_NAME}. Please share details and pricing.`)}`
  const waSelf    = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Self-Ride Varanasi Bike Tour (₹999/person). Please confirm availability.')}`
  const waGuided  = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Guided Varanasi Bike Tour (₹1,499/person). Please confirm availability.')}`

  function toggleSlot(i) { setOpenSlots(prev => prev.includes(i) ? prev.filter(s => s !== i) : [...prev, i]) }
  function setF(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('submitting'); setErrMsg('')
    try {
      const payload = { name:form.name.trim(), phone:form.phone.trim(), services:['tour'], cities:['kashi'], start_date:form.start_date||undefined, num_people:form.num_people||'2', num_days:'1', package_name:`${PKG_NAME}${form.pkg_type?' — '+form.pkg_type:''}`, customer_notes:form.customer_notes.trim()||undefined, page_source:'tours/varanasi-bike-tour' }
      Object.keys(payload).forEach(k => payload[k]===undefined && delete payload[k])
      const res = await fetch(API_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
      if (res.ok) { setStatus('success') } else {
        const data = await res.json().catch(()=>({}))
        setErrMsg(typeof data==='object'?Object.values(data).flat().join(' '):'Something went wrong.')
        setStatus('error')
      }
    } catch { setErrMsg('Could not connect. Please try WhatsApp below.'); setStatus('error') }
  }

  return (
    <div style={{ background:'#F5E8AE', backgroundImage:GRAIN, minHeight:'100vh', color:'#2B1A0E', fontFamily:"'Mukta',system-ui,sans-serif" }}>

      <div className="topbar" style={{ background:'#6B2509' }}><div className="wrap">
        <span className="hi">हर हर महादेव · काशी यात्रा · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({length:TORAN},(_,i)=><i key={i} />)}</div>
      <Navbar ctaLabel="Book Bike Tour" ctaHref="#book" />

      <main>
        <style>{`
          @keyframes vbt-kenburns{from{transform:scale(1);transform-origin:60% 50%}to{transform:scale(1.08);transform-origin:40% 55%}}
          .vbt-hero{position:relative;overflow:hidden;min-height:88vh;display:flex;align-items:center;background:#0a0500}
          .vbt-hero::before{content:'';position:absolute;inset:0;z-index:0;background:url('https://images.unsplash.com/photo-1561359313-0639aad49ca6?w=1400&q=80&auto=format&fit=crop') center/cover no-repeat;animation:vbt-kenburns 18s ease-in-out infinite alternate;will-change:transform}
          .vbt-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(12,3,0,.95) 0%,rgba(12,3,0,.6) 45%,rgba(12,3,0,.18) 100%)}
          .vbt-hinner{position:relative;z-index:2;padding:clamp(80px,10vw,120px) clamp(16px,5vw,48px) clamp(48px,6vw,80px);max-width:780px;margin:0 auto;text-align:center;width:100%}
          @keyframes vbt-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.vbt-marquee-track{display:flex;width:max-content;animation:vbt-marquee 28s linear infinite}
          .vbt-inc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
          @media(min-width:480px){.vbt-inc-grid{grid-template-columns:repeat(3,1fr)}}
          @media(min-width:1024px){.vbt-inc-grid{grid-template-columns:repeat(6,1fr)}}
          @keyframes vbt-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .vbt-slider{overflow:hidden;padding:36px 0 48px;width:100%}
          .vbt-scroll-track{display:flex;flex-wrap:nowrap;width:max-content;animation:vbt-scroll 28s linear infinite;will-change:transform}
          .vbt-scroll-track:hover{animation-play-state:paused}
          .vbt-slide{flex:0 0 140px;width:140px;margin-right:22px}
          .vbt-fg{display:grid;grid-template-columns:1fr 1fr;column-gap:28px;row-gap:22px}
          @media(max-width:580px){.vbt-fg{grid-template-columns:1fr}}
          .vbt-fl label{display:block;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:#7A4A1A;margin-bottom:4px}
          .vbt-fl input,.vbt-fl select{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(139,94,26,0.55);border-radius:0;padding:7px 2px;font-family:Georgia,serif;font-size:1rem;color:#2B1A0E;outline:none;box-sizing:border-box}
          .vbt-fl input:focus,.vbt-fl select:focus{border-bottom-color:#B5421A}
          .vbt-fl input::placeholder{color:rgba(139,94,26,0.45);font-style:italic}
          .vbt-fl select{appearance:none;cursor:pointer}
          .vbt-full{grid-column:1/-1}
          .vbt-sub{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#8B3A10,#5A2008);color:#FAF5E0;border:none;border-radius:2px;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-weight:700;font-size:1rem;cursor:pointer;letter-spacing:.08em;box-shadow:0 3px 14px rgba(139,58,16,.35);transition:opacity .18s}
          .vbt-sub:hover{opacity:.88}.vbt-sub:disabled{opacity:.55;cursor:not-allowed}
          .vbt-sticky{display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;background:linear-gradient(105deg,#6B2509,#B5421A);padding:10px 16px;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 -4px 20px rgba(43,26,14,.35);border-top:1px solid rgba(196,146,37,.35)}
          @media(max-width:720px){.vbt-sticky{display:flex}.fab{bottom:76px !important}}
          .vbt-slot-btn{width:100%;text-align:left;border:none;cursor:pointer;background:transparent;padding:0;display:block}
        `}</style>

        {/* ── Hero ── */}
        <section className="vbt-hero">
          <div className="vbt-overlay" />
          <div className="vbt-hinner">
            <nav style={{ position:'absolute', top:'clamp(10px,2vw,18px)', left:'50%', transform:'translateX(-50%)', fontSize:'.76rem', color:'rgba(255,255,255,.7)', display:'flex', gap:'5px', flexWrap:'wrap', justifyContent:'center', zIndex:3, whiteSpace:'nowrap' }}>
              <a href="/" style={{ color:'#fff', textDecoration:'underline' }}>Home</a><span>›</span>
              <a href="/tours" style={{ color:'#fff', textDecoration:'underline' }}>Tours</a><span>›</span>
              <span>Varanasi Bike Tour</span>
            </nav>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', fontSize:'.78rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#F4A81D', marginBottom:'14px' }}>
              <span>Varanasi</span><span style={{ color:'rgba(244,168,29,.45)' }}>|</span>
              <span style={{ color:'rgba(255,255,255,.6)', fontWeight:400, letterSpacing:'.08em' }}>1 Day · Scooty / Bike · 5 Stops</span>
            </div>
            <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2.6rem,7vw,4.6rem)', color:'#FFFFFF', textShadow:'0 3px 28px rgba(0,0,0,.75)', lineHeight:.95, marginBottom:'12px', letterSpacing:'-.02em' }}>Kashi on<br />Two Wheels</h1>
            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:400, fontStyle:'italic', fontSize:'clamp(1.2rem,3vw,1.9rem)', color:'rgba(255,255,255,.75)', marginBottom:'10px' }}>1 Day · Self-Ride or Guided</div>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'clamp(1rem,2.5vw,1.4rem)', color:'#D4956A', marginBottom:'28px' }}>सड़कों पर काशी दर्शन · हर हर महादेव</div>
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'28px', justifyContent:'center' }}>
              <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#25D366', color:'#fff', borderRadius:'4px', padding:'14px 28px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 20px rgba(37,211,102,.45)' }}><WaIcon size={20} color="#fff" /> WhatsApp Us</a>
              <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.35)', color:'#FAF5E0', borderRadius:'4px', padding:'14px 24px', fontWeight:700, fontSize:'1rem', textDecoration:'none' }}>Book Now</a>
            </div>
            <div style={{ display:'flex', gap:'0', flexWrap:'wrap', borderTop:'1px solid rgba(244,168,29,.18)', paddingTop:'20px', justifyContent:'center' }}>
              {[{num:'1',label:'Day'},{num:'~50',label:'km Loop'},{num:'5',label:'Stops'},{num:'₹999',label:'From'}].map((s,i)=>(
                <div key={s.label} style={{ display:'flex', alignItems:'center' }}>
                  {i>0&&<div style={{ width:'1px', height:'32px', background:'rgba(244,168,29,.2)', margin:'0 4px' }} />}
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
        <div style={{ background:'linear-gradient(90deg,#3A1408,#6B2509,#3A1408)', borderBottom:'1px solid rgba(196,146,37,.3)', overflow:'hidden', padding:'10px 0' }}>
          <div className="vbt-marquee-track">
            {[...Array(2)].flatMap(()=>[
              {icon:'🛵',text:'Scooty & Bike Rental'},{icon:'⭐',text:'4.9 Google Rating'},
              {icon:'📍',text:'Assi Ghat Pickup'},{icon:'⚡',text:'Reply within 2 Hours'},
              {icon:'🏛️',text:'Sarnath Included'},{icon:'🏰',text:'Ramnagar Fort Stop'},
              {icon:'🔒',text:'No Advance to Enquire'},{icon:'🧭',text:'Local Guide Available'},
            ]).map((t,i)=>(
              <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'0 32px', whiteSpace:'nowrap', fontSize:'.82rem', color:'rgba(250,245,224,.85)' }}>
                <span>{t.icon}</span>{t.text}<span style={{ color:'rgba(196,146,37,.5)', marginLeft:'32px' }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Route Itinerary ── */}
        <section style={{ padding:'70px 0 40px' }}>
          <div className="wrap" style={{ textAlign:'center', marginBottom:'52px' }}>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>एक दिन का काशी चक्कर</div>
            <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,2.8rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'8px' }}>The Kashi Loop Route</h2>
            <p style={{ color:'#5A3F28', maxWidth:'46rem', margin:'0 auto', fontSize:'1rem' }}>~50 km total · sunrise to Ganga Aarti — click any stop to expand.</p>
            <GoldRule margin="18px auto 0" />
          </div>
          <div className="wrap" style={{ maxWidth:'820px' }}>
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', left:'19px', top:'24px', bottom:'24px', width:'2px', background:'linear-gradient(to bottom,#B5421A,#C49225,#B5421A,#C49225,#B5421A)', borderRadius:'2px' }} />

              {ROUTE_STOPS.map((stop, i) => {
                const isOpen = openSlots.includes(i)
                const isLast = i === ROUTE_STOPS.length - 1
                return (
                  <div key={stop.time} style={{ position:'relative', marginBottom:isLast?0:'12px' }}>
                    <div style={{ position:'absolute', left:'10px', top:'22px', width:'20px', height:'20px', borderRadius:'50%', background:isOpen?'linear-gradient(135deg,#B5421A,#6B2509)':'#FAF0CC', border:`3px solid ${isOpen?'#C49225':'rgba(196,146,37,.5)'}`, zIndex:2, boxShadow:isOpen?'0 0 0 4px rgba(196,146,37,.2)':'none', transition:'all .25s' }} />
                    <div style={{ marginLeft:'50px', background:'#FAF5E0', borderRadius:'8px', overflow:'hidden', boxShadow:isOpen?'0 8px 32px rgba(43,26,14,.2),inset 0 0 0 1.5px rgba(196,146,37,.5)':'0 2px 12px rgba(43,26,14,.1),inset 0 0 0 1px rgba(196,146,37,.25)', transition:'box-shadow .25s' }}>
                      <button className="vbt-slot-btn" onClick={() => toggleSlot(i)}>
                        <div style={{ background:isOpen?'linear-gradient(105deg,#FAF0CC,#EDD690)':'#FAF5E0', backgroundImage:GRAIN, display:'flex', alignItems:'center', borderBottom:isOpen?'2px solid rgba(196,146,37,.5)':'none', transition:'background .2s' }}>
                          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'72px', borderRight:'2px dashed rgba(90,63,40,.2)', padding:'16px 10px', flexShrink:0 }}>
                            <span style={{ fontSize:'1.5rem', lineHeight:1, marginBottom:'4px' }}>{stop.icon}</span>
                            <span style={{ fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'.55rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#8B5E1A', textAlign:'center' }}>Stop {i+1}</span>
                          </div>
                          <div style={{ flex:1, padding:'16px 20px', textAlign:'left' }}>
                            <div style={{ fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'.72rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#B5421A', marginBottom:'4px' }}>{stop.time}</div>
                            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'clamp(.95rem,2.2vw,1.2rem)', color:'#3A1408', lineHeight:1.25 }}>{stop.title}</div>
                            <div style={{ marginTop:'6px', display:'flex', alignItems:'center', gap:'10px' }}>
                              <span style={{ fontSize:'.68rem', color:'#8B5E1A', fontWeight:600 }}>{stop.activities.length} activities</span>
                              <span style={{ fontSize:'.66rem', background:'rgba(196,146,37,.18)', border:'1px solid rgba(196,146,37,.35)', borderRadius:'10px', padding:'1px 8px', color:'#5A3F28', fontWeight:700 }}>{stop.km}</span>
                              {!isOpen&&<span style={{ fontSize:'.65rem', color:'rgba(139,94,26,.55)', fontStyle:'italic' }}>tap to expand</span>}
                            </div>
                          </div>
                          <div style={{ padding:'0 20px', flexShrink:0, fontSize:'1rem', color:'#B5421A', transition:'transform .25s', transform:isOpen?'rotate(180deg)':'rotate(0deg)' }}>▼</div>
                        </div>
                      </button>

                      {isOpen && (
                        <div style={{ background:'#FAF0CC', backgroundImage:GRAIN, padding:'22px 24px 10px' }}>
                          <GoldRule margin="0 0 16px" />
                          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0', marginBottom:'22px' }}>
                            {stop.activities.map((a,ai) => (
                              <li key={ai} style={{ display:'flex', alignItems:'flex-start', gap:'12px', fontSize:'.92rem', color:'#2B1A0E', lineHeight:1.6, padding:'7px 0', borderBottom:ai<stop.activities.length-1?'1px solid rgba(196,146,37,.18)':'none' }}>
                                <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:'linear-gradient(135deg,#B5421A,#8B3A10)', color:'#FAF5E0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.58rem', fontWeight:900, flexShrink:0, marginTop:'3px' }}>{ai+1}</div>
                                {a}
                              </li>
                            ))}
                          </ul>
                          <GoldRule margin="0 0 18px" />
                          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', paddingBottom:'22px' }}>
                            {stop.photos.map((p,pi) => <VintagePhoto key={pi} id={p.id} alt={p.alt} />)}
                          </div>
                        </div>
                      )}
                    </div>

                    {!isLast && (
                      <div style={{ position:'absolute', left:'11px', bottom:'-22px', zIndex:3 }}>
                        <div style={{ width:'0', height:'0', borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:'8px solid #C49225', opacity:.6 }} />
                      </div>
                    )}
                  </div>
                )
              })}

              <div style={{ marginLeft:'50px', marginTop:'24px' }}>
                <div style={{ position:'absolute', left:'10px', width:'20px', height:'20px', borderRadius:'50%', background:'linear-gradient(135deg,#C49225,#8B5E1A)', border:'3px solid #C49225', zIndex:2 }} />
                <div style={{ marginLeft:'50px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'10px 24px', borderRadius:'4px', fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:'.9rem', display:'inline-flex', alignItems:'center', gap:'8px' }}>
                  Loop Complete · Return to Assi Ghat
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Book CTA */}
        <div style={{ textAlign:'center', padding:'32px 0 0' }}>
          <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'14px 32px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.35)' }}>Book This Ride</a>
        </div>
        <div style={{ overflow:'hidden', padding:'32px 0 0' }}><TempleSkyline /></div>

        {/* ── Package Includes ── */}
        <section style={{ padding:'70px 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap">
            <SectionHead hi="हर सवारी में शामिल है" title="What's Included" />
            <div className="vbt-inc-grid">
              {INCLUSIONS.map(item => <InclusionCard key={item.title} item={item} />)}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section style={{ padding:'70px 0 80px' }}>
          <div className="wrap">
            <SectionHead hi="अपना विकल्प चुनें" title="Choose Your Ride" />
            <div style={{ display:'flex', gap:'24px', flexWrap:'wrap', alignItems:'flex-start', maxWidth:'860px', margin:'0 auto' }}>
              <PkgCard pkg={PACKAGES[0]} waLink={waSelf} />
              <PkgCard pkg={PACKAGES[1]} waLink={waGuided} />
            </div>
            <p style={{ textAlign:'center', color:'#8B5E1A', fontSize:'.88rem', marginTop:'24px' }}>
              Payment: 50% advance to confirm · remaining 50% at pickup
            </p>
          </div>
        </section>

        {/* ── What You'll See ── */}
        <section style={{ padding:'60px 0 70px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap">
            <SectionHead hi="रास्ते में क्या दिखेगा" title="What You'll See" />
            <div style={{ display:'grid', gap:'32px' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🛕</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408' }}>Temples on the Route</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['BHU Birla Temple','Durga Mata Mandir','Sankat Mochan Hanuman','Tulsi Manas Mandir','Kal Bhairav Mandir','Kashi Vishwanath (walk-in)','Maa Annapurna Mandir'].map(p=>(
                    <span key={p} style={{ background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{p}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🏛️</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408' }}>Heritage & Excursions</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Sarnath — Dhamek Stupa','Sarnath Deer Park','Ramnagar Fort','Ramnagar Fort Museum','Ganga Bridge Ride','BHU Campus'].map(h=>(
                    <span key={h} style={{ background:'linear-gradient(135deg,rgba(58,20,8,.08),rgba(196,146,37,.12))', border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{h}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🚶</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408' }}>Old City Lanes</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Vishwanath Gali','Godowlia Chowk','Silk Weaver Lanes','Flower Market','Old Spice Bazaar','Kabir Math Area'].map(l=>(
                    <span key={l} style={{ background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{l}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🍵</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408' }}>Roadside Food Stops</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Banarasi Chai (Lanka Gate)','Kachori Sabzi','Dhaba Lunch (Sarnath Road)','Tamatar Chaat','Lassi at Godowlia','Banarasi Paan'].map(f=>(
                    <span key={f} style={{ background:'rgba(196,146,37,.1)', border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trip Diaries ── */}
        <section style={{ padding:'70px 0 0', background:'linear-gradient(180deg,#F5E8AE 0%,#EDD690 100%)', backgroundImage:GRAIN, overflow:'hidden' }}>
          <div className="wrap">
            <SectionHead hi="यात्रियों की यादें" title="Riders' Stories" />
          </div>
          <div className="vbt-slider">
            <div className="vbt-scroll-track">
              {[...TRIP_DIARIES,...TRIP_DIARIES].map((t,i)=>{
                const tilts=[-4,3,-2,4,-3,2],lifts=[-14,10,-8,16,-10,8]
                return (
                  <div key={`${t.name}-${i}`} className="vbt-slide" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ transform:`rotate(${tilts[i%tilts.length]}deg) translateY(${lifts[i%lifts.length]}px)`, width:'100%' }}>
                      <div style={{ background:'#FAF5E0', padding:'4px', boxShadow:'0 8px 28px rgba(0,0,0,.35),inset 0 0 0 1px rgba(196,146,37,.3)', borderRadius:'2px' }}>
                        <div style={{ aspectRatio:'3/4', overflow:'hidden', background:'#E8D8A0', position:'relative' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={t.photo} alt={t.name} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 50%)' }} />
                          <div style={{ position:'absolute', bottom:'7px', left:'7px', right:'7px' }}>
                            <div style={{ fontSize:'.58rem', color:'rgba(255,255,255,.85)', fontStyle:'italic', lineHeight:1.35, marginBottom:'4px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>"{t.review}"</div>
                            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'.7rem', color:'#fff' }}>{t.name}</div>
                            <div style={{ display:'flex', alignItems:'center', gap:'4px', marginTop:'1px' }}>
                              <span style={{ color:'#F4C87A', fontSize:'.58rem', letterSpacing:'1px' }}>{'★'.repeat(t.stars)}{'☆'.repeat(5-t.stars)}</span>
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
          <div style={{ textAlign:'center', padding:'0 0 48px' }}>
            <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'14px 32px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.35)' }}>Book This Ride</a>
          </div>
        </section>

        {/* ── How it Works ── */}
        <div style={{ background:'linear-gradient(105deg,#3A1408,#6B2509,#3A1408)', borderTop:'1px solid rgba(196,146,37,.2)', borderBottom:'1px solid rgba(196,146,37,.2)', padding:'22px 0' }}>
          <div className="wrap">
            <div style={{ display:'flex', alignItems:'flex-start', flexWrap:'wrap', justifyContent:'center' }}>
              {[
                {icon:'💬',title:'Send Enquiry',      desc:'Fill the form or WhatsApp. No payment to enquire.'},
                {icon:'🛵',title:'Pick Up Your Bike', desc:'Meet us at Assi Ghat. We hand you keys, helmet & route map.'},
                {icon:'🗺️',title:'Ride Freely',       desc:'Follow the loop or go your own way. We\'re on WhatsApp if you need us.'},
              ].map((h,i,arr)=>(
                <div key={h.title} style={{ display:'flex', alignItems:'flex-start', flex:'1 1 160px' }}>
                  <div style={{ textAlign:'center', padding:'0 16px', flex:1 }}>
                    <div style={{ fontSize:'1.3rem', marginBottom:'4px' }}>{h.icon}</div>
                    <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'.88rem', color:'#F4C87A', marginBottom:'3px' }}>{h.title}</div>
                    <p style={{ fontSize:'.74rem', color:'rgba(250,245,224,.6)', lineHeight:1.5, margin:0 }}>{h.desc}</p>
                  </div>
                  {i<arr.length-1&&<div style={{ color:'rgba(196,146,37,.4)', fontSize:'1.2rem', paddingTop:'10px', flexShrink:0 }}>›</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Enquiry Form ── */}
        <section id="book" style={{ padding:'20px 0 28px' }}>
          <div className="wrap" style={{ maxWidth:'780px', position:'relative', filter:'drop-shadow(0 4px 22px rgba(90,50,10,0.24))' }}>
            <div style={{ position:'absolute', inset:0, zIndex:0 }} dangerouslySetInnerHTML={{ __html:TORN_PAPER_SVG }} />
            <div style={{ position:'relative', zIndex:1, padding:'clamp(44px,7vw,72px) clamp(60px,12vw,100px) clamp(64px,10vw,88px)' }}>
              {status==='success'?(
                <div style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px' }}>
                  <div style={{ fontSize:'3rem' }}>🛵</div>
                  <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.6rem,4vw,2.4rem)', color:'#6B2509' }}>Ride Booked!</h2>
                  <p style={{ color:'#5A3F28', maxWidth:'360px', lineHeight:1.65 }}>Our team will confirm pickup time and bike details on WhatsApp within 2 hours.</p>
                  <GoldRule margin="4px 0" />
                  <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 24px', background:'#25D366', color:'#fff', borderRadius:'4px', fontWeight:700, textDecoration:'none' }}><WaIcon size={18} color="#fff" /> Also chat on WhatsApp</a>
                </div>
              ):(
                <>
                  <div style={{ textAlign:'center', marginBottom:'32px' }}>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(181,66,26,.12)', border:'1px solid rgba(181,66,26,.25)', borderRadius:'20px', padding:'4px 12px', fontSize:'.72rem', fontWeight:700, color:'#B5421A', marginBottom:'10px' }}>Limited bikes available on weekends</div>
                    <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.9rem,4vw,2.8rem)', color:'#6B2509', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'12px' }}>Book Your Kashi Ride</h2>
                    <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'8px 16px', marginBottom:'14px' }}>
                      {[['⭐','4.9 Rating'],['🛵','Activa / Bullet'],['⚡','Reply in 2 hrs'],['📍','Assi Ghat Pickup']].map(([icon,label])=>(
                        <span key={label} style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'.72rem', color:'#5A3F28', fontWeight:600 }}><span>{icon}</span>{label}</span>
                      ))}
                    </div>
                    <GoldRule margin="4px auto 0" />
                  </div>
                  <form onSubmit={handleSubmit} style={{ background:'transparent', border:'none', padding:0 }}>
                    <div className="vbt-fg">
                      <div className="vbt-fl"><label htmlFor="vbt-name">Full Name *</label><input id="vbt-name" type="text" required placeholder="e.g. Rahul Mehta" autoComplete="name" value={form.name} onChange={e=>setF('name',e.target.value)} /></div>
                      <div className="vbt-fl"><label htmlFor="vbt-phone">Mobile / WhatsApp *</label><input id="vbt-phone" type="tel" required placeholder="+91 98765 43210" autoComplete="tel" value={form.phone} onChange={e=>setF('phone',e.target.value)} /></div>
                      <div className="vbt-fl">
                        <label htmlFor="vbt-people">No. of Riders *</label>
                        <select id="vbt-people" required value={form.num_people} onChange={e=>setF('num_people',e.target.value)}>
                          <option value="">Select riders</option>
                          {['1','2','3','4','5','6','7','8','9','10','10+'].map(n=><option key={n} value={n}>{n} {n==='1'?'rider':'riders'}</option>)}
                        </select>
                      </div>
                      <div className="vbt-fl">
                        <label htmlFor="vbt-pkg">Package Type</label>
                        <select id="vbt-pkg" value={form.pkg_type} onChange={e=>setF('pkg_type',e.target.value)}>
                          <option value="">Not decided yet</option>
                          <option value="Self-Ride (₹999/person)">Self-Ride — ₹999/person</option>
                          <option value="Guided Ride (₹1,499/person)">Guided Ride — ₹1,499/person</option>
                        </select>
                      </div>
                      <div className="vbt-fl"><label htmlFor="vbt-date">Ride Date</label><input id="vbt-date" type="date" min={today} value={form.start_date} onChange={e=>setF('start_date',e.target.value)} /></div>
                      <div className="vbt-fl"><label htmlFor="vbt-note">Special Requirements</label><input id="vbt-note" type="text" placeholder="e.g. Royal Enfield, pillion rider, early start…" value={form.customer_notes} onChange={e=>setF('customer_notes',e.target.value)} /></div>
                      {status==='error'&&<div className="vbt-full" style={{ background:'#fdf2f2', border:'1px solid #f5c6c6', borderRadius:'6px', padding:'10px 14px', fontSize:'.88rem', color:'#9b2c2c' }}>{errMsg} · <a href={waEnquire} target="_blank" rel="noopener">Message us on WhatsApp</a></div>}
                      <div className="vbt-full"><button type="submit" className="vbt-sub" disabled={status==='submitting'}>{status==='submitting'?'Sending…':'Book Now — Send Enquiry'}</button></div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding:'70px 0 80px' }}>
          <div className="wrap">
            <SectionHead hi="सामान्य प्रश्न" title="Frequently Asked Questions" />
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', maxWidth:'820px', margin:'0 auto' }}>
              {FAQS.map((faq,i)=><FaqItem key={i} faq={faq} defaultOpen={i===0} />)}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding:'70px 0 90px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap" style={{ textAlign:'center', maxWidth:'640px' }}>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1.1rem', color:'#B5421A', marginBottom:'10px' }}>काशी की सड़कें बुला रही हैं</div>
            <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,5vw,3.2rem)', color:'#6B2509', letterSpacing:'-1px', lineHeight:1.1, marginBottom:'16px' }}>The open road through<br />ancient Kashi awaits.</h2>
            <p style={{ color:'#5A3F28', fontSize:'1rem', lineHeight:1.7, marginBottom:'28px' }}>Scooty rental, helmet, route map, guide — everything sorted. You just show up and ride.</p>
            <GoldRule margin="0 auto 28px" />
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', marginBottom:'20px' }}>
              <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'15px 34px', borderRadius:'4px', fontWeight:700, fontSize:'1.05rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.4)' }}>Book This Ride</a>
              <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#25D366', color:'#fff', padding:'15px 28px', borderRadius:'4px', fontWeight:700, fontSize:'1.05rem', textDecoration:'none' }}><WaIcon size={20} color="#fff" /> WhatsApp Us</a>
            </div>
            <a href="tel:+919277472279" style={{ fontSize:'.9rem', color:'#B5421A', fontWeight:700, textDecoration:'none' }}>+91 92774 72279 · Varanasi</a>
          </div>
        </section>
      </main>

      <Footer />

      <a href={waEnquire} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <WaIcon size={26} color="#fff" />
      </a>

      <div className="vbt-sticky">
        <div style={{ display:'flex', flexDirection:'column', gap:'1px' }}>
          <strong style={{ color:'#FAF5E0', fontSize:'.88rem' }}>Kashi Bike Tour · 1 Day</strong>
          <span style={{ color:'rgba(250,245,224,.65)', fontSize:'.72rem' }}>Self-Ride ₹999 · Guided ₹1,499</span>
        </div>
        <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#FAF5E0', color:'#6B2509', padding:'9px 18px', borderRadius:'4px', fontWeight:700, fontSize:'.88rem', textDecoration:'none', whiteSpace:'nowrap' }}>Book Now</a>
      </div>
    </div>
  )
}
