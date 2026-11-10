'use client'
import { useState, useRef, Fragment } from 'react'
import Navbar from '@/app/components/Navbar'

const API_URL  = 'https://yatra.pythonanywhere.com/api/bookings/'
const WA       = '919277472279'
const WA_BASE  = `https://wa.me/${WA}`
const waEnquire = `https://wa.me/${WA}?text=${encodeURIComponent(`Namaste! I want to book the Varanasi Ayodhya Prayagraj Tour Package 4 Days 3 Nights.`)}`
const TORAN    = 60
const PKG_NAME = 'Varanasi Ayodhya Prayagraj Tour Package 4 Days 3 Nights'
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
  for(let i=0;i<26;i++){const side=Math.floor(r(0,4));let cx=r(0,W),cy=r(0,H);const inset=r(0,70);if(side===0)cy=inset;else if(side===1)cx=W-inset;else if(side===2)cy=H-inset;else cx=inset;stains+=`<ellipse cx="${cx}" cy="${cy}" rx="${r(20,70)}" ry="${r(15,55)}" fill="#c98a45" opacity="${r(0.08,0.2)}" filter="url(#vap-soft)"/>`}
  let creases=''
  function crease(x,y,ang,segs,depth){let pd=`M${x.toFixed(1)} ${y.toFixed(1)}`;for(let i=0;i<segs;i++){ang+=r(-0.45,0.45);const l=r(10,32);x+=Math.cos(ang)*l;y+=Math.sin(ang)*l;pd+=` L${x.toFixed(1)} ${y.toFixed(1)}`;if(depth<2&&rand()<0.18)crease(x,y,ang+r(-1.2,1.2),Math.floor(r(2,5)),depth+1)};const o=r(0.25,0.5);creases+=`<path d="${pd}" stroke="#fff4dc" stroke-width="${r(0.6,1.3).toFixed(2)}" opacity="${o.toFixed(2)}" fill="none" stroke-linejoin="round"/>`;creases+=`<path d="${pd}" transform="translate(0.9 0.9)" stroke="#a87440" stroke-width="0.6" opacity="${(o*0.35).toFixed(2)}" fill="none" stroke-linejoin="round"/>`}
  for(let i=0;i<55;i++)crease(r(0,W),r(0,H),r(0,Math.PI*2),Math.floor(r(3,9)),0)
  return `<svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="vap-tear"><path d="${d}"/></clipPath><radialGradient id="vap-base" cx="52%" cy="48%" r="70%"><stop offset="0%" stop-color="#ffe9bf"/><stop offset="45%" stop-color="#fce1b2"/><stop offset="78%" stop-color="#f0c993"/><stop offset="100%" stop-color="#e3b073"/></radialGradient><filter id="vap-blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="13"/><feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.52  0 0 0 0 0.24  1.6 0 0 0 -0.7"/></filter><filter id="vap-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.36  0 0 0 0 0.15  0 0 0 0.5 0"/></filter><filter id="vap-fray" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="4" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="vap-edgeGlow"><feGaussianBlur stdDeviation="10"/></filter><filter id="vap-rim"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="vap-soft"><feGaussianBlur stdDeviation="12"/></filter></defs><g filter="url(#vap-fray)"><g clip-path="url(#vap-tear)"><rect width="${W}" height="${H}" fill="url(#vap-base)"/><rect width="${W}" height="${H}" filter="url(#vap-blotch)" opacity="0.35"/>${stains}<rect width="${W}" height="${H}" filter="url(#vap-grain)" opacity="0.28"/>${creases}<path d="${d}" fill="none" stroke="#d6a466" stroke-width="50" opacity="0.4" filter="url(#vap-edgeGlow)"/><path d="${d}" fill="none" stroke="#b3773a" stroke-width="5" opacity="0.55" filter="url(#vap-rim)"/><path d="${d}" fill="none" stroke="#9a6128" stroke-width="1.4" opacity="0.35"/></g></g></svg>`
}
const TORN_PAPER_SVG = generateTornPaperSVG()

/* ── Data ─────────────────────────────────────────────────── */

const DAYS = [
  {
    day: 'Day 1', title: 'Varanasi Arrival & Evening Rituals',
    city: 'Varanasi',
    activities: ['Hotel check-in & freshen up', 'Kaal Bhairav Temple darshan', 'Maha Mrityunjay Temple darshan', 'Ganga Aarti at Dashashwamedh Ghat', 'Explore Dashashwamedh shopping street', 'Annapurna Temple darshan', 'Kashi Vishwanath Shayan Aarti', 'Return to hotel · overnight stay'],
    img: '1705952484283-19c31e37e0e4',
  },
  {
    day: 'Day 2', title: 'Varanasi Spiritual Exploration & Ghats',
    city: 'Varanasi',
    activities: ['Early morning Mangala Aarti', 'Subah-e-Banaras — music & yoga at Assi Ghat', 'Morning private boat ride covering all 84 ghats', 'BHU Kashi Vishwanath Temple darshan', 'Sankat Mochan Hanuman Mandir darshan', 'Durga Mata Mandir darshan', 'Return to hotel · overnight stay'],
    img: '1596097825168-c9b773f404ff',
  },
  {
    day: 'Day 3', title: 'Prayagraj Sangam & Transit to Ayodhya',
    city: 'Varanasi → Prayagraj → Ayodhya',
    activities: ['Early morning departure toward Prayagraj', 'Sacred Triveni Sangam Snan — holy dip', 'Alopi Mata Shakti Peeth darshan', 'Bade Hanuman Ji (Lakhate Hanuman) darshan', 'Journey onward to Ayodhya', 'Hotel check-in in Ayodhya', 'Explore Lata Chowk & Surya Stambh', 'Evening Saryu Aarti · overnight stay'],
    img: '1627894483216-2138af692e32',
  },
  {
    day: 'Day 4', title: 'Ayodhya Darshan & Departure',
    city: 'Ayodhya → Departure',
    activities: ['Morning breakfast', 'Shri Ram Janmabhoomi Mandir darshan', 'Kanak Bhawan darshan', 'Dasharath Mahal darshan', 'Drop at railway station / airport'],
    img: '1608412525537-662195e817c5',
  },
]

const INCLUSIONS = [
  { photo:'1631049307264-da0ec9d70304', icon:'🏨', title:'3-Star Hotel' },
  { photo:'1449965408869-eaa3f722e40d', icon:'🚗', title:'AC Vehicle' },
  { photo:'1571536802807-30451e3955d8', icon:'⛵', title:'Boat Rides' },
  { photo:'1627894483216-2138af692e32', icon:'🕯️', title:'Special Ganga Aarti' },
  { photo:'1449965408869-eaa3f722e40d', icon:'📍', title:'Pickup & Drop' },
  { photo:'1665413791167-6718dcf36773', icon:'🛕', title:'All Sightseeing' },
  { photo:'1649876674933-a5b3b39b4da1', icon:'🙏', title:'Ram Janmabhoomi' },
  { photo:'1596097825168-c9b773f404ff', icon:'🏊', title:'Sangam Snan' },
  { photo:'1608412525537-662195e817c5', icon:'🌸', title:'Alopi Mata Shakti Peeth' },
  { photo:'1504674900247-0877df9cc836', icon:'🍳', title:'Daily Breakfast' },
]

const MARQUEE_ITEMS = [
  '🛕 Kashi Vishwanath Shayan Aarti', '⛵ All 84 Ghats Boat Ride', '🕯️ Subah-e-Banaras', '🙏 Ram Janmabhoomi Darshan',
  '🏊 Triveni Sangam Snan', '🌸 Alopi Mata Shakti Peeth', '🚗 AC Vehicle Throughout', '🏨 Hotel Stay',
  '🍳 Daily Breakfast', '📍 3 Sacred Cities', '✅ No Hidden Charges', '📲 WhatsApp Support 24/7',
]

const TRIP_DIARIES = [
  { name:'Suresh Pandey',   city:'Lucknow',  stars:5, photo:'1627894483216-2138af692e32', review:'Completed the Tri-city yatra in 4 days. Ram Mandir darshan was deeply emotional. Everything was smooth.' },
  { name:'Meena Tripathi',  city:'Mumbai',   stars:5, photo:'1665413791167-6718dcf36773', review:'First time in Varanasi and Ayodhya. The guide arranged everything — no queues, no confusion.' },
  { name:'Ramesh Gupta',    city:'Delhi',    stars:5, photo:'1596097825168-c9b773f404ff', review:'Sangam snan at Prayagraj was the highlight. Highly recommend this tri-city package.' },
  { name:'Anita Sharma',    city:'Jaipur',   stars:5, photo:'1571536802807-30451e3955d8', review:'The sunrise boat ride and Ganga Aarti on Day 1 — I will never forget those two hours.' },
  { name:'Vijay Kumar',     city:'Patna',    stars:4, photo:'1649876674933-a5b3b39b4da1', review:'Well planned itinerary. 4 days felt right — not too rushed, covered all major darshans.' },
  { name:'Priya Verma',     city:'Bhopal',   stars:5, photo:'1608412525537-662195e817c5', review:'Booked for parents (senior citizens). Team arranged easy access at every temple. Very thoughtful.' },
]

const FAQS = [
  { q:'What does the 4-day Varanasi–Ayodhya–Prayagraj package cover?', a:'Day 1: Varanasi arrival, Kaal Bhairav, Maha Mrityunjay, Ganga Aarti at Dashashwamedh, Annapurna Temple and Kashi Vishwanath Shayan Aarti. Day 2: Mangala Aarti, Subah-e-Banaras, private boat ride on all 84 ghats, BHU Kashi Vishwanath, Sankat Mochan and Durga Mata. Day 3: Prayagraj — Triveni Sangam Snan, Alopi Mata Shakti Peeth and Bade Hanuman Ji, then drive to Ayodhya — Lata Chowk, Surya Stambh and Saryu Aarti. Day 4: Ram Janmabhoomi Mandir, Kanak Bhawan, Dasharath Mahal and departure drop.' },
  { q:'Is the Ram Mandir darshan slot pre-booked?', a:'We help coordinate the darshan visit at an optimal time to minimise waiting. During peak seasons (Diwali, Ram Navami) advanced slots may be arranged on request.' },
  { q:'What is the distance between the three cities?', a:'Varanasi to Ayodhya is ~200 km (approx 4 hours). Ayodhya to Prayagraj is ~150 km (approx 3 hours). All travel is by private AC vehicle included in the package.' },
  { q:'Is Triveni Sangam snan included?', a:'Yes. A dedicated boat ride to the confluence of Ganga, Yamuna and Saraswati is included. Ritual bath is at your discretion.' },
  { q:'Can senior citizens and families with kids join?', a:'Absolutely. We arrange comfortable vehicles, easy access routes, and can adjust the pace. Wheelchair assistance at ghats can be arranged on request.' },
  { q:'How is payment handled?', a:'No advance needed to enquire. Send a booking request via the form or WhatsApp — our team confirms the plan and pricing. Payment is settled before departure.' },
]

const NUM_PEOPLE = ['1','2','3','4','5','6','7','8','9','10','11–15','16–20','20+']

const SCHEMA = {
  '@context': 'https://schema.org', '@type': 'TouristTrip', name: PKG_NAME,
  description: 'Three sacred cities in one yatra — Kashi Vishwanath darshan in Varanasi, Ram Janmabhoomi in Ayodhya, and Triveni Sangam snan at Prayagraj.',
  touristType: 'Pilgrimage, Religious',
  itinerary: { '@type': 'ItemList', itemListElement: DAYS.map((d,i) => ({'@type':'ListItem',position:i+1,name:`${d.day}: ${d.title} (${d.city})`})) },
  provider: { '@type':'TravelAgency', name:'Yatra Ke Sathi', url:'https://yatraksathi.com', telephone:'+919277472279', address:{'@type':'PostalAddress',addressLocality:'Varanasi',addressRegion:'Uttar Pradesh',addressCountry:'IN'} },
}

function buildWaMsg(f) {
  const lines = [`Namaste! I want to book the ${PKG_NAME}.`]
  if (f.start_date)  lines.push(`Expected Date: ${f.start_date}`)
  if (f.num_people)  lines.push(`People: ${f.num_people}`)
  if (f.name)        lines.push(`Name: ${f.name}`)
  if (f.phone)       lines.push(`Phone: ${f.phone}`)
  if (f.customer_notes) lines.push(`Notes: ${f.customer_notes}`)
  return lines.join('\n')
}

/* ── Components ──────────────────────────────────────────── */

function WaIcon({ size = 20, color = 'currentColor' }) {
  return <svg viewBox="0 0 32 32" fill={color} style={{ width:size, height:size, flexShrink:0 }}><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" /></svg>
}

function GoldRule({ margin = '14px auto 0', width = '60px' }) {
  return <div style={{ width, height:'2px', background:'linear-gradient(to right,transparent,#C49225,transparent)', margin }} />
}

function InclusionCard({ item }) {
  return (
    <div style={{ background:'#FAF5E0', borderRadius:'8px', overflow:'hidden', boxShadow:'0 4px 18px rgba(43,26,14,.14),inset 0 0 0 1px rgba(196,146,37,.25)' }}>
      <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', background:'#E8D8A0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={U(item.photo, 500)} alt={item.title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 55%)' }} />
        <span style={{ position:'absolute', bottom:'8px', left:'9px', fontSize:'1.3rem' }}>{item.icon}</span>
      </div>
      <div style={{ padding:'10px 12px', backgroundImage:GRAIN }}>
        <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'.88rem', color:'#3A1408', textAlign:'center' }}>{item.title}</div>
      </div>
    </div>
  )
}

function FaqItem({ faq, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div style={{ background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.3)', borderRadius:'10px', overflow:'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width:'100%', background:'none', border:'none', cursor:'pointer', padding:'18px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px', textAlign:'left' }}>
        <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'1rem', color:'#3A1408', lineHeight:1.4 }}>{faq.q}</span>
        <span style={{ fontSize:'1.2rem', color:'#B5421A', flexShrink:0, transform:open?'rotate(180deg)':'rotate(0)', transition:'transform .2s' }}>▾</span>
      </button>
      {open && <div style={{ padding:'0 20px 18px', fontSize:'.92rem', color:'#5A3F28', lineHeight:1.65 }}>{faq.a}</div>}
    </div>
  )
}

function SectionHead({ hi, title }) {
  return (
    <div style={{ textAlign:'center', marginBottom:'42px' }}>
      <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'clamp(.95rem,2vw,1.1rem)', color:'#B5421A', fontWeight:700, marginBottom:'8px' }}>{hi}</div>
      <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.6rem)', color:'#3A1408', margin:0, lineHeight:1.1 }}>{title}</h2>
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

/* ── Page ───────────────────────────────────────────────────── */

export default function VaranasiAyodhyaPrayagrajPage() {
  const today = new Date().toISOString().slice(0, 10)
  const videoRef = useRef(null)
  const [muted, setMuted]       = useState(true)
  const [openDays, setOpenDays] = useState([0])
  const [form, setForm]         = useState({ name:'', phone:'', start_date:'', num_people:'2', customer_notes:'' })
  const [status, setStatus]     = useState('idle')
  const [errMsg, setErrMsg]     = useState('')

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })) }
  function toggleDay(i) { setOpenDays(prev => prev.includes(i) ? prev.filter(d => d !== i) : [...prev, i]) }
  function toggleMute() {
    if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setMuted(videoRef.current.muted) }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('submitting'); setErrMsg('')
    try {
      const payload = {
        name: form.name.trim(), phone: form.phone.trim(),
        services: ['tour'], cities: ['kashi','ayodhya','prayagraj'],
        start_date: form.start_date || undefined,
        num_people: parseInt(form.num_people, 10) || 2,
        num_days: '4', package_name: PKG_NAME,
        customer_notes: form.customer_notes.trim() || undefined,
        page_source: 'tours/varanasi-ayodhya-prayagraj',
      }
      Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])
      const res = await fetch(API_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
      if (res.ok) { setStatus('success') } else {
        const data = await res.json().catch(() => ({}))
        setErrMsg(typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Something went wrong.')
        setStatus('error')
      }
    } catch { setErrMsg('Could not connect. Please try WhatsApp below.'); setStatus('error') }
  }

  const DOUBLED = [...TRIP_DIARIES, ...TRIP_DIARIES]

  return (
    <div style={{ background:'#F5E8AE', backgroundImage:GRAIN }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=Tiro+Devanagari+Hindi&display=swap');
        .vap-day-btn{width:100%;text-align:left;border:none;cursor:pointer;background:transparent;padding:0;display:block}
        .vap-marquee-track{display:flex;gap:0;width:max-content;animation:vap-marquee 28s linear infinite}
        @keyframes vap-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .vap-slider{display:flex;gap:16px;width:max-content;animation:vap-scroll 36s linear infinite}
        @keyframes vap-scroll{0%{transform:translateX(0) rotate(-2deg)}100%{transform:translateX(-50%) rotate(-2deg)}}
        .vap-inc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        @media(min-width:480px){.vap-inc-grid{grid-template-columns:repeat(4,1fr)}}
        @media(min-width:900px){.vap-inc-grid{grid-template-columns:repeat(8,1fr)}}
        .vap-hide-mobile{display:block}
        @media(max-width:639px){.vap-hide-mobile{display:none!important}}
        .vap-fg{display:grid;grid-template-columns:1fr 1fr;column-gap:28px;row-gap:22px}
        @media(max-width:580px){.vap-fg{grid-template-columns:1fr}}
        .vap-fl label{display:block;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:#7A4A1A;margin-bottom:4px}
        .vap-fl input,.vap-fl select{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(139,94,26,0.55);border-radius:0;padding:7px 2px;font-family:Georgia,serif;font-size:1rem;color:#2B1A0E;outline:none;box-sizing:border-box}
        .vap-fl input:focus,.vap-fl select:focus{border-bottom-color:#B5421A}
        .vap-fl input::placeholder{color:rgba(139,94,26,0.45);font-style:italic}
        .vap-fl select{appearance:none;cursor:pointer}
        .vap-full{grid-column:1/-1}
        .vap-sub{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#8B3A10,#5A2008);color:#FAF5E0;border:none;border-radius:2px;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-weight:700;font-size:1rem;cursor:pointer;letter-spacing:.08em;box-shadow:0 3px 14px rgba(139,58,16,.35);transition:opacity .18s}
        .vap-sub:hover{opacity:.88}.vap-sub:disabled{opacity:.55;cursor:not-allowed}
        .vap-sticky{display:none;position:fixed;bottom:0;left:0;right:0;z-index:999;background:linear-gradient(135deg,#B5421A,#6B2509);padding:12px 16px;gap:10px;align-items:center;justify-content:space-between;box-shadow:0 -4px 20px rgba(0,0,0,.3)}
        @media(max-width:720px){.vap-sticky{display:flex}.fab{bottom:76px!important}}
      `}</style>

      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · जय श्री राम · प्रयागराज</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Book This Tour" ctaHref="#book" />

      <main>

        {/* ── Video Hero ── */}
        <section style={{ position:'relative', height:'88vh', minHeight:'520px', overflow:'hidden', background:'#1A0A02' }}>
          <video ref={videoRef} autoPlay muted loop playsInline
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.75 }}
            poster={U('1627894483216-2138af692e32', 1400)}>
            <source src="/videos/varanasi-hero.mp4" type="video/mp4" />
          </video>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,rgba(10,5,0,.82) 0%,rgba(10,5,0,.22) 55%,rgba(10,5,0,.75) 100%)' }} />
          <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}
            style={{ position:'absolute', top:'24px', right:'24px', zIndex:10, background:'rgba(255,255,255,.12)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.25)', borderRadius:'50%', width:'42px', height:'42px', cursor:'pointer', color:'#fff', fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {muted ? '🔇' : '🔊'}
          </button>
          <div style={{ position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 clamp(16px,5vw,52px)', maxWidth:'860px' }}>
            <nav style={{ fontSize:'.75rem', color:'rgba(255,255,255,.8)', marginBottom:'18px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
              <a href="/" style={{ color:'#fff', textDecoration:'underline' }}>Home</a><span>›</span>
              <a href="/tours" style={{ color:'#fff', textDecoration:'underline' }}>Tours</a><span>›</span>
              <span>Varanasi–Ayodhya–Prayagraj</span>
            </nav>
            <div style={{ marginBottom:'12px', display:'flex', flexWrap:'wrap', gap:'6px' }}>
              {['Varanasi','Ayodhya','Prayagraj'].map(c => (
                <span key={c} style={{ display:'inline-block', background:'rgba(255,153,51,.18)', border:'1px solid rgba(255,153,51,.5)', borderRadius:'20px', padding:'3px 13px', fontSize:'.78rem', color:'#FF9933', fontWeight:700 }}>{c}</span>
              ))}
            </div>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'clamp(.9rem,2vw,1.1rem)', color:'#F4C87A', fontWeight:700, marginBottom:'10px' }}>
              त्रिवेणी तीर्थ यात्रा · 4 दिन · 3 रात
            </div>
            <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,6vw,3.8rem)', color:'#fff', lineHeight:1.08, textShadow:'0 3px 28px rgba(0,0,0,.7)', margin:'0 0 14px' }}>
              Varanasi · Ayodhya<br />Prayagraj Yatra
            </h1>
            <p style={{ fontSize:'clamp(.93rem,1.8vw,1.08rem)', color:'rgba(255,255,255,.88)', lineHeight:1.65, maxWidth:'48rem', marginBottom:'28px' }}>
              Three of India's most sacred cities in one yatra — Kashi Vishwanath darshan, Ram Janmabhoomi in Ayodhya and Triveni Sangam snan at Prayagraj.
            </p>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#fff', padding:'13px 26px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 20px rgba(0,0,0,.5)' }}>
                Book This Tour
              </a>
              <a href="tel:+919277472279" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,.12)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.3)', color:'#fff', padding:'13px 24px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none' }}>
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Trust Marquee ── */}
        <div style={{ overflow:'hidden', background:'linear-gradient(135deg,#3A1408,#6B2509)', borderTop:'2px solid #C49225', borderBottom:'2px solid #C49225', padding:'13px 0' }}>
          <div className="vap-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'24px', padding:'0 20px', fontSize:'.82rem', fontWeight:700, letterSpacing:'.06em', color:'#F4C87A', whiteSpace:'nowrap' }}>
                {item} <span style={{ color:'rgba(196,146,37,.6)', fontSize:'1rem' }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Collapsible Timeline Itinerary ── */}
        <section style={{ padding:'70px 0 80px' }}>
          <div className="wrap">
            <SectionHead hi="दिन-प्रतिदिन की योजना" title="Tour Itinerary" />
            <div style={{ position:'relative', maxWidth:'860px', margin:'0 auto' }}>
              {/* Vertical connecting line */}
              <div style={{ position:'absolute', left:'19px', top:'24px', bottom:'24px', width:'2px', background:'linear-gradient(to bottom,#B5421A,#C49225,#B5421A,#C49225)', opacity:.6 }} />
              {DAYS.map((d, i) => {
                const isOpen = openDays.includes(i)
                const isLast = i === DAYS.length - 1
                return (
                  <div key={d.day} style={{ position:'relative', marginBottom: isLast ? 0 : '12px' }}>
                    {/* Circle node */}
                    <div style={{ position:'absolute', left:'10px', top:'22px', width:'20px', height:'20px', borderRadius:'50%', background: isOpen ? 'linear-gradient(135deg,#B5421A,#6B2509)' : '#FAF0CC', border:`3px solid ${isOpen ? '#C49225' : 'rgba(196,146,37,.5)'}`, zIndex:2 }} />
                    <div style={{ marginLeft:'50px' }}>
                      <button className="vap-day-btn" onClick={() => toggleDay(i)}>
                        <div style={{ background: isOpen ? 'linear-gradient(105deg,#FAF0CC,#EDD690)' : '#FAF5E0', backgroundImage:GRAIN, border:`1.5px solid ${isOpen ? 'rgba(196,146,37,.6)' : 'rgba(196,146,37,.3)'}`, borderRadius:'10px', overflow:'hidden', boxShadow: isOpen ? '0 4px 20px rgba(43,26,14,.18)' : '0 2px 8px rgba(43,26,14,.08)' }}>
                          <div style={{ display:'flex', alignItems:'stretch', borderBottom: isOpen ? '2px solid rgba(196,146,37,.5)' : 'none' }}>
                            <div style={{ minWidth:'72px', borderRight:'2px dashed rgba(90,63,40,.2)', padding:'16px 10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2px' }}>
                              <span style={{ fontSize:'.6rem', fontWeight:800, letterSpacing:'.1em', color:'rgba(90,63,40,.6)', textTransform:'uppercase' }}>DAY</span>
                              <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:900, lineHeight:1, color: isOpen ? '#B5421A' : '#5A3F28' }}>{i+1}</span>
                            </div>
                            <div style={{ padding:'16px 20px', flex:1 }}>
                              <div style={{ fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', color:'#B5421A', textTransform:'uppercase', marginBottom:'4px' }}>{d.day} · {d.city}</div>
                              <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1rem,2.5vw,1.3rem)', color:'#3A1408', lineHeight:1.2, marginBottom:'4px' }}>{d.title}</div>
                              <div style={{ fontSize:'.75rem', color:'rgba(90,63,40,.65)' }}>{d.activities.length} stops · tap to {isOpen ? 'collapse' : 'expand'}</div>
                            </div>
                            <div style={{ padding:'0 16px', display:'flex', alignItems:'center', fontSize:'1.1rem', color:'#C49225', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition:'transform .25s' }}>▾</div>
                          </div>
                          {isOpen && (
                            <div style={{ padding:'20px 22px' }}>
                              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'9px', margin:0, padding:0 }}>
                                {d.activities.map((a, ai) => (
                                  <li key={ai} style={{ display:'flex', gap:'10px', alignItems:'flex-start', fontSize:'.92rem', color:'#4A2E12', lineHeight:1.5 }}>
                                    <span style={{ minWidth:'22px', height:'22px', borderRadius:'50%', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.68rem', fontWeight:800, flexShrink:0, marginTop:'1px' }}>{ai+1}</span>
                                    {a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                    {/* Arrow between days */}
                    {!isLast && (
                      <div style={{ position:'absolute', left:'14px', bottom:'-8px', zIndex:3 }}>
                        <div style={{ width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:'9px solid #C49225', opacity:.6 }} />
                      </div>
                    )}
                  </div>
                )
              })}
              {/* Final destination */}
              <div style={{ marginLeft:'50px', marginTop:'18px', display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ background:'linear-gradient(135deg,#C49225,#8B6414)', borderRadius:'8px', padding:'10px 18px', display:'inline-flex', alignItems:'center', gap:'10px' }}>
                  <span style={{ fontSize:'1.2rem' }}>🏁</span>
                  <span style={{ fontFamily:"'Fraunces',serif", fontWeight:700, color:'#FAF5E0', fontSize:'.9rem' }}>Tri-city Yatra Complete · Memories Forever</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Book Now CTA ── */}
        <div style={{ textAlign:'center', padding:'0 0 60px' }}>
          <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'15px 36px', borderRadius:'4px', fontFamily:"'Fraunces',serif", fontWeight:800, fontSize:'1.1rem', textDecoration:'none', boxShadow:'0 6px 28px rgba(107,37,9,.35)', letterSpacing:'.02em' }}>
            Book This Tour &rarr;
          </a>
        </div>

        {/* ── SVG Temple Skyline Divider ── */}
        <div style={{ width:'100%', overflow:'hidden', lineHeight:0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width:'100%', height:'60px', display:'block' }} aria-hidden="true">
            <path d="M0,80 L50,80 L50,40 L60,40 L60,20 L70,20 L70,40 L80,40 L80,60 L100,60 L100,30 L110,30 L110,10 L120,10 L120,30 L130,30 L130,60 L150,60 L150,40 L160,40 L160,20 L170,20 L170,40 L180,40 L180,80 L230,80 L230,50 L240,50 L240,25 L248,25 L248,15 L256,15 L256,25 L264,25 L264,50 L274,50 L274,80 L320,80 L320,45 L330,45 L330,20 L340,20 L340,10 L350,10 L350,20 L360,20 L360,45 L370,45 L370,80 L420,80 L420,55 L430,55 L430,35 L438,35 L438,22 L446,22 L446,35 L454,35 L454,55 L464,55 L464,80 L520,80 L520,45 L530,45 L530,20 L540,20 L540,8 L550,8 L550,20 L560,20 L560,45 L570,45 L570,80 L620,80 L620,50 L630,50 L630,28 L638,28 L638,15 L646,15 L646,28 L654,28 L654,50 L664,50 L664,80 L720,80 L720,55 L730,55 L730,35 L738,35 L738,22 L746,22 L746,35 L754,35 L754,55 L764,55 L764,80 L820,80 L820,45 L830,45 L830,20 L840,20 L840,10 L850,10 L850,20 L860,20 L860,45 L870,45 L870,80 L920,80 L920,50 L930,50 L930,28 L940,28 L940,15 L950,15 L950,28 L960,28 L960,50 L970,50 L970,80 L1020,80 L1020,42 L1030,42 L1030,22 L1040,22 L1040,8 L1050,8 L1050,22 L1060,22 L1060,42 L1070,42 L1070,80 L1120,80 L1120,55 L1130,55 L1130,35 L1140,35 L1140,22 L1150,22 L1150,35 L1160,35 L1160,55 L1170,55 L1170,80 L1200,80 L1200,120 L0,120 Z"
              fill="#EDD690" />
          </svg>
        </div>

        {/* ── Package Includes ── */}
        <section style={{ padding:'70px 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap">
            <SectionHead hi="पैकेज में क्या शामिल है" title="Package Includes" />
            <div className="vap-inc-grid">
              {INCLUSIONS.map(item => (
                <div key={item.title} className={item.title === 'Kashi Darshan' ? 'vap-hide-mobile' : ''}>
                  <InclusionCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tri-city Highlights ── */}
        <section style={{ padding:'60px 0 70px' }}>
          <div className="wrap">
            <SectionHead hi="तीन शहर · एक यात्रा" title="What You'll Experience" />
            <div style={{ display:'grid', gap:'32px' }}>

              {/* Varanasi */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🛕</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408' }}>Varanasi — Kashi</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Kashi Vishwanath Temple','Dashashwamedh Ganga Aarti','Sunrise Boat Ride','Manikarnika Ghat','Assi Ghat Walk','Maa Annapurna Mandir','Banarasi Kachori Breakfast','Vishwanath Gali'].map(p => (
                    <span key={p} style={{ background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{p}</span>
                  ))}
                </div>
              </div>

              {/* Ayodhya */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🙏</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408' }}>Ayodhya — Ram Nagari</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Ram Janmabhoomi Darshan','Ram Mandir','Hanuman Garhi Temple','Saryu Ghat Morning Aarti','Kanak Bhawan','Ram Ki Paidi','Dashrath Mahal','Nageshwarnath Mandir'].map(p => (
                    <span key={p} style={{ background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{p}</span>
                  ))}
                </div>
              </div>

              {/* Prayagraj */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🏊</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408' }}>Prayagraj — Sangam Nagari</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Triveni Sangam Boat Ride','Sangam Snan','Allahabad Fort View','Mankameshwar Mandir','Anand Bhavan','Swaraj Bhavan','Hanuman Mandir Sangam','Akshayavat Tree'].map(p => (
                    <span key={p} style={{ background:'rgba(196,146,37,.1)', border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{p}</span>
                  ))}
                </div>
              </div>

              {/* Street Food */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🍵</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408' }}>Iconic Foods Across the Route</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Banarasi Chai','Kachori Sabzi (Varanasi)','Tamatar Chaat','Banarasi Paan','Khaja Mithai (Ayodhya)','Pedha (Ayodhya)','Sangam ke Aloo Tikki','Imarti (Prayagraj)'].map(f => (
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
            <SectionHead hi="यात्रियों की यादें" title="Glimpses of Past Yatras" />
          </div>
          <div style={{ overflow:'hidden', paddingBottom:'50px' }}>
            <div className="vap-slider">
              {DOUBLED.map((d, i) => (
                <div key={i} style={{ width:'260px', flexShrink:0, background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.35)', borderRadius:'10px', overflow:'hidden', boxShadow:'0 6px 24px rgba(43,26,14,.14)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(d.photo, 400)} alt={d.name} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  </div>
                  <div style={{ padding:'14px 14px 16px' }}>
                    <div style={{ color:'#C49225', fontSize:'.85rem', marginBottom:'6px', letterSpacing:'2px' }}>{'★'.repeat(d.stars)}</div>
                    <p style={{ fontSize:'.84rem', color:'#4A2E12', lineHeight:1.55, margin:'0 0 10px', fontStyle:'italic' }}>"{d.review}"</p>
                    <div style={{ fontSize:'.75rem', fontWeight:700, color:'#8B5E1A' }}>{d.name} · {d.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Book Now CTA ── */}
        <div style={{ textAlign:'center', padding:'50px 0' }}>
          <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'15px 36px', borderRadius:'4px', fontFamily:"'Fraunces',serif", fontWeight:800, fontSize:'1.1rem', textDecoration:'none', boxShadow:'0 6px 28px rgba(107,37,9,.35)', letterSpacing:'.02em' }}>
            Book This Tour &rarr;
          </a>
        </div>

        {/* ── How it Works ── */}
        <div style={{ background:'linear-gradient(105deg,#3A1408,#6B2509,#3A1408)', borderTop:'1px solid rgba(196,146,37,.2)', borderBottom:'1px solid rgba(196,146,37,.2)', padding:'22px 0' }}>
          <div className="wrap">
            <div style={{ display:'flex', alignItems:'flex-start', flexWrap:'wrap', justifyContent:'center' }}>
              {[{icon:'💬',title:'Send Enquiry',desc:'Fill the form or WhatsApp us. No payment needed.'},{icon:'📋',title:'Get Your Plan',desc:'We confirm on WhatsApp within 2 hours with full itinerary.'},{icon:'🚗',title:'We Handle Everything',desc:'Cab, guide, hotel, darshan — just arrive and enjoy.'}].map((h,i,arr)=>(
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
            <div style={{ position:'absolute', inset:0, zIndex:0 }} dangerouslySetInnerHTML={{ __html: TORN_PAPER_SVG }} />
            <div style={{ position:'relative', zIndex:1, padding:'clamp(44px,7vw,72px) clamp(60px,12vw,100px) clamp(64px,10vw,88px)' }}>
              {status === 'success' ? (
                <div style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px' }}>
                  <div style={{ fontSize:'3rem' }}>🙏</div>
                  <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.6rem,4vw,2.4rem)', color:'#6B2509' }}>Enquiry Received!</h2>
                  <p style={{ color:'#5A3F28', maxWidth:'360px', lineHeight:1.65 }}>Our team will confirm your booking on WhatsApp within 2 hours.</p>
                  <GoldRule margin="4px 0" />
                  <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 24px', background:'#25D366', color:'#fff', borderRadius:'4px', fontWeight:700, textDecoration:'none' }}><WaIcon size={18} color="#fff" /> Also chat on WhatsApp</a>
                </div>
              ) : (
                <>
                  <div style={{ textAlign:'center', marginBottom:'32px' }}>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(181,66,26,.12)', border:'1px solid rgba(181,66,26,.25)', borderRadius:'20px', padding:'4px 12px', fontSize:'.72rem', fontWeight:700, color:'#B5421A', marginBottom:'10px' }}>🔥 Popular dates filling fast — limited slots</div>
                    <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.9rem,4vw,2.8rem)', color:'#6B2509', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'12px' }}>Book This Tour</h2>
                    <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'8px 16px', marginBottom:'14px' }}>
                      {[['⭐','4.9 Rating'],['👥','500+ Pilgrims'],['⚡','Reply in 2 hrs'],['📍','Varanasi Based']].map(([icon, label]) => (
                        <span key={label} style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'.72rem', color:'#5A3F28', fontWeight:600 }}><span>{icon}</span>{label}</span>
                      ))}
                    </div>
                    <GoldRule margin="4px auto 0" />
                  </div>
                  <form onSubmit={handleSubmit} style={{ background:'transparent', border:'none', padding:0 }}>
                    <div className="vap-fg">
                      <div className="vap-fl"><label htmlFor="vap-name">Full Name *</label><input id="vap-name" type="text" required placeholder="e.g. Ramesh Sharma" autoComplete="name" value={form.name} onChange={e => setF('name', e.target.value)} /></div>
                      <div className="vap-fl"><label htmlFor="vap-phone">Mobile / WhatsApp *</label><input id="vap-phone" type="tel" required placeholder="+91 98765 43210" autoComplete="tel" value={form.phone} onChange={e => setF('phone', e.target.value)} /></div>
                      <div className="vap-fl">
                        <label htmlFor="vap-people">No. of Travellers *</label>
                        <select id="vap-people" required value={form.num_people} onChange={e => setF('num_people', e.target.value)}>
                          <option value="">Select travellers</option>
                          {NUM_PEOPLE.map(n => <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>)}
                        </select>
                      </div>
                      <div className="vap-fl"><label htmlFor="vap-date">Expected Travel Date</label><input id="vap-date" type="date" min={today} value={form.start_date} onChange={e => setF('start_date', e.target.value)} /></div>
                      <div className="vap-fl"><label htmlFor="vap-note">Special Requirements</label><input id="vap-note" type="text" placeholder="e.g. senior citizens, vegetarian…" value={form.customer_notes} onChange={e => setF('customer_notes', e.target.value)} /></div>
                      {status === 'error' && <div className="vap-full" style={{ background:'#fdf2f2', border:'1px solid #f5c6c6', borderRadius:'6px', padding:'10px 14px', fontSize:'.88rem', color:'#9b2c2c' }}>{errMsg} · <a href={waEnquire} target="_blank" rel="noopener">Message us on WhatsApp</a></div>}
                      <div className="vap-full"><button type="submit" className="vap-sub" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Book Now — Send Enquiry'}</button></div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding:'70px 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap">
            <SectionHead hi="सामान्य प्रश्न" title="Frequently Asked Questions" />
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', maxWidth:'820px', margin:'0 auto' }}>
              {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding:'70px 0 90px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap" style={{ textAlign:'center', maxWidth:'640px' }}>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1.1rem', color:'#B5421A', marginBottom:'10px' }}>जय श्री राम · हर हर महादेव · जय प्रयागराज</div>
            <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,5vw,3.2rem)', color:'#6B2509', letterSpacing:'-1px', lineHeight:1.1, marginBottom:'16px' }}>Three sacred cities await.<br/>We&apos;ll take care of everything.</h2>
            <p style={{ color:'#5A3F28', fontSize:'1rem', lineHeight:1.7, marginBottom:'28px' }}>500+ pilgrims guided. Zero hidden charges. Confirmed on WhatsApp within 2 hours — no advance needed to enquire.</p>
            <GoldRule margin="0 auto 28px" />
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', marginBottom:'20px' }}>
              <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'15px 34px', borderRadius:'4px', fontWeight:700, fontSize:'1.05rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.4)' }}>📋 Book This Tour</a>
              <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#25D366', color:'#fff', padding:'15px 28px', borderRadius:'4px', fontWeight:700, fontSize:'1.05rem', textDecoration:'none' }}><WaIcon size={20} color="#fff" /> WhatsApp Us</a>
            </div>
            <a href="tel:+919277472279" style={{ fontSize:'.9rem', color:'#B5421A', fontWeight:700, textDecoration:'none' }}>📞 +91 92774 72279 · Varanasi</a>
          </div>
        </section>

      </main>

      <Footer />

      {/* FAB */}
      <a href={waEnquire} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <WaIcon size={26} color="#fff" />
      </a>

      {/* Sticky Mobile Bar */}
      <div className="vap-sticky">
        <div style={{ display:'flex', flexDirection:'column', gap:'1px' }}>
          <strong style={{ color:'#FAF5E0', fontSize:'.88rem' }}>Varanasi · Ayodhya · Prayagraj</strong>
          <span style={{ color:'rgba(250,245,224,.65)', fontSize:'.72rem' }}>4 Days · 3 Nights · 3 Sacred Cities</span>
        </div>
        <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#FAF5E0', color:'#6B2509', padding:'9px 18px', borderRadius:'4px', fontWeight:700, fontSize:'.88rem', textDecoration:'none', whiteSpace:'nowrap' }}>📋 Book Now</a>
      </div>
    </div>
  )
}
