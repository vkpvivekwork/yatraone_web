'use client'
import { useState, useRef, Fragment } from 'react'
import Navbar from '@/app/components/Navbar'

const API_URL  = 'https://yatra.pythonanywhere.com/api/bookings/'
const WA       = '919277472279'
const WA_BASE  = `https://wa.me/${WA}`
const TORAN    = 60
const PKG_NAME = 'Varanasi Complete Tour Package 5 Days 4 Nights'
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/* ── Torn-paper SVG ───────────────────────────────────────── */
function generateTornPaperSVG() {
  const W = 600, H = 900; let seed = 37
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
  for(let i=0;i<26;i++){const side=Math.floor(r(0,4));let cx=r(0,W),cy=r(0,H);const inset=r(0,70);if(side===0)cy=inset;else if(side===1)cx=W-inset;else if(side===2)cy=H-inset;else cx=inset;stains+=`<ellipse cx="${cx}" cy="${cy}" rx="${r(20,70)}" ry="${r(15,55)}" fill="#c98a45" opacity="${r(0.08,0.2)}" filter="url(#ctp-soft)"/>`}
  let creases=''
  function crease(x,y,ang,segs,depth){let pd=`M${x.toFixed(1)} ${y.toFixed(1)}`;for(let i=0;i<segs;i++){ang+=r(-0.45,0.45);const l=r(10,32);x+=Math.cos(ang)*l;y+=Math.sin(ang)*l;pd+=` L${x.toFixed(1)} ${y.toFixed(1)}`;if(depth<2&&rand()<0.18)crease(x,y,ang+r(-1.2,1.2),Math.floor(r(2,5)),depth+1)};const o=r(0.25,0.5);creases+=`<path d="${pd}" stroke="#fff4dc" stroke-width="${r(0.6,1.3).toFixed(2)}" opacity="${o.toFixed(2)}" fill="none" stroke-linejoin="round"/>`;creases+=`<path d="${pd}" transform="translate(0.9 0.9)" stroke="#a87440" stroke-width="0.6" opacity="${(o*0.35).toFixed(2)}" fill="none" stroke-linejoin="round"/>`}
  for(let i=0;i<55;i++)crease(r(0,W),r(0,H),r(0,Math.PI*2),Math.floor(r(3,9)),0)
  return `<svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="ctp-tear"><path d="${d}"/></clipPath><radialGradient id="ctp-base" cx="52%" cy="48%" r="70%"><stop offset="0%" stop-color="#ffe9bf"/><stop offset="45%" stop-color="#fce1b2"/><stop offset="78%" stop-color="#f0c993"/><stop offset="100%" stop-color="#e3b073"/></radialGradient><filter id="ctp-blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="11"/><feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.52  0 0 0 0 0.24  1.6 0 0 0 -0.7"/></filter><filter id="ctp-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.36  0 0 0 0 0.15  0 0 0 0.5 0"/></filter><filter id="ctp-fray" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="2" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="ctp-edgeGlow"><feGaussianBlur stdDeviation="10"/></filter><filter id="ctp-rim"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="ctp-soft"><feGaussianBlur stdDeviation="12"/></filter></defs><g filter="url(#ctp-fray)"><g clip-path="url(#ctp-tear)"><rect width="${W}" height="${H}" fill="url(#ctp-base)"/><rect width="${W}" height="${H}" filter="url(#ctp-blotch)" opacity="0.35"/>${stains}<rect width="${W}" height="${H}" filter="url(#ctp-grain)" opacity="0.28"/>${creases}<path d="${d}" fill="none" stroke="#d6a466" stroke-width="50" opacity="0.4" filter="url(#ctp-edgeGlow)"/><path d="${d}" fill="none" stroke="#b3773a" stroke-width="5" opacity="0.55" filter="url(#ctp-rim)"/><path d="${d}" fill="none" stroke="#9a6128" stroke-width="1.4" opacity="0.35"/></g></g></svg>`
}
const TORN_PAPER_SVG = generateTornPaperSVG()

/* ── Data ─────────────────────────────────────────────────── */

const DAYS = [
  {
    day: 'Day 1', title: 'Arrival & Evening Aarti',
    activities: ['Arrival in Varanasi — hotel check-in & freshen up', 'Assi Ghat evening walk', 'Kashi Vishwanath Temple darshan', 'Dashashwamedh Ganga Aarti ceremony', 'Evening Aarti boat ride on the Ganga', 'Overnight stay'],
    img: '1705952484283-19c31e37e0e4',
    photos: [{ id:'1627894483216-2138af692e32', alt:'Ganga Aarti' }, { id:'1665413791167-6718dcf36773', alt:'Kashi Vishwanath' }, { id:'1561359313-0639aad49ca6', alt:'Varanasi ghats' }],
  },
  {
    day: 'Day 2', title: 'Kashi Temples & Old City',
    activities: ['Pre-dawn walk to the ghats — sunrise boat ride', 'Kashi Vishwanath Temple darshan', 'Maa Annapurna & Gyan Vapi area', 'Kal Bhairav & Vishalakshi Mandir', 'Heritage lane walk through Vishwanath Gali', 'Evening Ganga Aarti'],
    img: '1596097825168-c9b773f404ff',
    photos: [{ id:'1571536802807-30451e3955d8', alt:'Sunrise boat ride' }, { id:'1608412525537-662195e817c5', alt:'Morning rituals' }, { id:'1665413791167-6718dcf36773', alt:'Temple darshan' }],
  },
  {
    day: 'Day 3', title: 'Sarnath & Ramnagar Fort',
    activities: ['Morning drive to Sarnath (12 km)', 'Dhamek Stupa — where Buddha first preached', 'Sarnath Archaeological Museum', 'Mulagandha Kuti Vihar temple', 'Ramnagar Fort & heritage museum', 'Evening free at ghats'],
    img: '1627894483216-2138af692e32',
    photos: [{ id:'1649876674933-a5b3b39b4da1', alt:'Dhamek Stupa' }, { id:'1634920540678-df0e179c5243', alt:'Ramnagar Fort' }, { id:'1596097825168-c9b773f404ff', alt:'Ghats at dusk' }],
  },
  {
    day: 'Day 4', title: 'Deep Kashi & Chunar Fort',
    activities: ['Manikarnika Ghat & Harishchandra Ghat', 'Bharat Mata Mandir & Tulsi Manas Mandir', 'Sankat Mochan Hanuman Temple', 'Durga Kund Temple', 'Chunar Fort excursion (50 km)'],
    img: '1608412525537-662195e817c5',
    photos: [{ id:'1596097825168-c9b773f404ff', alt:'Manikarnika Ghat' }, { id:'1705952484283-19c31e37e0e4', alt:'Chunar Fort' }, { id:'1627894483216-2138af692e32', alt:'Sankat Mochan' }],
  },
  {
    day: 'Day 5', title: 'Final Morning & Departure',
    activities: ['Early ghat walk or sunrise boat ride', 'BHU campus tour — Birla Temple', 'Banarasi kachori breakfast & local market', 'Souvenir shopping — Banarasi sarees', 'Drop to railway station / airport'],
    img: '1561359313-0639aad49ca6',
    photos: [{ id:'1571536802807-30451e3955d8', alt:'Last sunrise' }, { id:'1504674900247-0877df9cc836', alt:'Banarasi breakfast' }, { id:'1649876674933-a5b3b39b4da1', alt:'Departure' }],
  },
]

const INCLUSIONS = [
  { photo:'1631049307264-da0ec9d70304', icon:'🏨', title:'Hotel Stay' },
  { photo:'1449965408869-eaa3f722e40d', icon:'🚗', title:'AC Vehicle' },
  { photo:'1571536802807-30451e3955d8', icon:'⛵', title:'Boat Rides' },
  { photo:'1665413791167-6718dcf36773', icon:'🛕', title:'Temple Circuit' },
  { photo:'1627894483216-2138af692e32', icon:'🕯️', title:'Ganga Ghat Aarti' },
  { photo:'1649876674933-a5b3b39b4da1', icon:'🏛️', title:'Sarnath Excursion' },
  { photo:'1608412525537-662195e817c5', icon:'🏰', title:'Ramnagar Fort' },
  { photo:'1705952484283-19c31e37e0e4', icon:'🏯', title:'Chunar Fort' },
  { photo:'1634920540678-df0e179c5243', icon:'🧭', title:'Expert Guide' },
  { photo:'1596097825168-c9b773f404ff', icon:'🚶', title:'Heritage Walk' },
  { photo:'1504674900247-0877df9cc836', icon:'🍳', title:'Daily Breakfast' },
  { photo:'1449965408869-eaa3f722e40d', icon:'📍', title:'Pickup & Drop' },
]

const TRIP_DIARIES = [
  { name:'Priya Verma',   city:'Mumbai',  stars:5, photo:'1627894483216-2138af692e32', review:'The aarti boat ride at night was something I will never forget.' },
  { name:'Rajesh Sharma', city:'Delhi',   stars:4, photo:'1665413791167-6718dcf36773', review:'Guide was very knowledgeable. Darshan was smooth with no long wait.' },
  { name:'Sunita Devi',   city:'Patna',   stars:5, photo:'1561359313-0639aad49ca6',   review:'Felt completely safe as a solo woman traveller. Highly recommend.' },
  { name:'Kavita Singh',  city:'Jaipur',  stars:5, photo:'1571536802807-30451e3955d8', review:'Sunrise on the Ganga — no words. The guide arranged everything.' },
  { name:'Manoj Tiwari',  city:'Bhopal',  stars:4, photo:'1649876674933-a5b3b39b4da1', review:'Sarnath & Ramnagar both in one day. Very well planned by the team.' },
  { name:'Amit Gupta',    city:'Lucknow', stars:5, photo:'1608412525537-662195e817c5', review:'Booked for family of 5. Exact price as quoted, zero hidden charges.' },
]

const FAQS = [
  { q:'What does the Varanasi 5 Days Complete Tour cover?', a:'Day 1: hotel check-in, Assi Ghat walk and Evening Ganga Aarti. Day 2: sunrise boat ride, Kashi Vishwanath, Kal Bhairav, heritage lane walk. Day 3: Sarnath excursion with Dhamek Stupa, museum and Ramnagar Fort. Day 4: Manikarnika Ghat, Sankat Mochan, Chunar Fort. Day 5: morning ghat walk, BHU Birla Temple and departure transfer.' },
  { q:'Is there a minimum group size?', a:'Minimum 2 persons. Solo travellers may contact us on WhatsApp — we often arrange same-day groups.' },
  { q:'Are meals included?', a:'Daily breakfast is included. Lunch and dinner are not included but we guide you to the best local spots.' },
  { q:'What is not covered in the package?', a:'Train / flight tickets, monument entry fees (Sarnath Museum, Ramnagar Fort, Chunar Fort), personal expenses and 5% GST.' },
  { q:'Are Ramnagar Fort and Chunar Fort entry fees included?', a:'Not in the base package. Our guide will assist you at entry. If you want them bundled, mention it when you enquire.' },
  { q:'Is the Kashi Vishwanath VIP pass included?', a:'Our guide assists with queue navigation. If you need a VIP pass arrangement, let us know when you enquire.' },
  { q:'Can I customise the itinerary?', a:'Yes — contact us on WhatsApp and we will tailor the tour to your preferences, pace or special requirements.' },
  { q:'How is the booking confirmed?', a:'Our team confirms on WhatsApp within 2 hours with the full plan. No advance needed just to enquire.' },
]

const SCHEMA = {
  '@context':'https://schema.org', '@type':'TouristTrip', name:PKG_NAME,
  description:'The definitive Kashi experience — all major temples, every important ghat, Sarnath, Ramnagar Fort, Chunar excursion and a heritage walk through ancient lanes.',
  touristType:'Pilgrimage, Cultural, Heritage',
  itinerary:{ '@type':'ItemList', itemListElement:DAYS.map((d,i)=>({'@type':'ListItem',position:i+1,name:`${d.day}: ${d.title}`})) },
  provider:{'@type':'TravelAgency',name:'Yatra Ke Sathi',url:'https://yatraksathi.com',telephone:'+919277472279',address:{'@type':'PostalAddress',addressLocality:'Varanasi',addressRegion:'Uttar Pradesh',addressCountry:'IN'}},
}

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

export default function VaranasiCompletePage() {
  const videoRef = useRef(null)
  const [videoMuted, setVideoMuted] = useState(true)
  const [openDays, setOpenDays]     = useState([0])
  const today = new Date().toISOString().slice(0, 10)
  const [form, setForm]     = useState({ name:'', phone:'', start_date:'', num_people:'2', customer_notes:'' })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  const waEnquire = `${WA_BASE}?text=${encodeURIComponent(`Namaste! I want to book the ${PKG_NAME}.`)}`

  function toggleDay(i) { setOpenDays(prev => prev.includes(i) ? prev.filter(d => d !== i) : [...prev, i]) }
  function setF(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('submitting'); setErrMsg('')
    try {
      const payload = { name:form.name.trim(), phone:form.phone.trim(), services:['tour'], cities:['kashi'], start_date:form.start_date||undefined, num_people:form.num_people||'2', num_days:'5', package_name:PKG_NAME, customer_notes:form.customer_notes.trim()||undefined, page_source:'tours/varanasi-complete' }
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(SCHEMA) }} />
      <div className="topbar" style={{ background:'#6B2509' }}><div className="wrap">
        <span className="hi">हर हर महादेव · काशी यात्रा · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({length:TORAN},(_,i)=><i key={i} />)}</div>
      <Navbar ctaLabel="Book This Tour" ctaHref="#book" />

      <main>
        <style>{`
          .vcp-hero{position:relative;overflow:hidden;min-height:88vh;display:flex;align-items:center;background:#0a0500}
          .vcp-hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;z-index:0}
          .vcp-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(12,3,0,.95) 0%,rgba(12,3,0,.55) 45%,rgba(12,3,0,.15) 100%)}
          .vcp-hinner{position:relative;z-index:2;padding:clamp(80px,10vw,120px) clamp(16px,5vw,48px) clamp(48px,6vw,80px);max-width:780px;margin:0 auto;text-align:center;width:100%}
          @keyframes vcp-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.vcp-marquee-track{display:flex;width:max-content;animation:vcp-marquee 30s linear infinite}
          .vcp-inc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          @media(min-width:640px){.vcp-inc-grid{grid-template-columns:repeat(4,1fr)}}
          @media(min-width:1024px){.vcp-inc-grid{grid-template-columns:repeat(6,1fr)}}
          @media(max-width:639px){.vcp-hide-mobile{display:none!important}}
          @keyframes vcp-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .vcp-slider{overflow:hidden;padding:36px 0 48px;width:100%}
          .vcp-scroll-track{display:flex;flex-wrap:nowrap;width:max-content;animation:vcp-scroll 28s linear infinite;will-change:transform}
          .vcp-scroll-track:hover{animation-play-state:paused}
          .vcp-slide{flex:0 0 140px;width:140px;margin-right:22px}
          .vcp-fg{display:grid;grid-template-columns:1fr 1fr;column-gap:28px;row-gap:22px}
          @media(max-width:580px){.vcp-fg{grid-template-columns:1fr}}
          .vcp-fl label{display:block;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:#7A4A1A;margin-bottom:4px}
          .vcp-fl input,.vcp-fl select,.vcp-fl textarea{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(139,94,26,0.55);border-radius:0;padding:7px 2px;font-family:Georgia,serif;font-size:1rem;color:#2B1A0E;outline:none;box-sizing:border-box;resize:none}
          .vcp-fl input:focus,.vcp-fl select:focus,.vcp-fl textarea:focus{border-bottom-color:#B5421A}
          .vcp-fl input::placeholder,.vcp-fl textarea::placeholder{color:rgba(139,94,26,0.45);font-style:italic}
          .vcp-fl select{appearance:none;cursor:pointer}
          .vcp-full{grid-column:1/-1}
          .vcp-sub{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#8B3A10,#5A2008);color:#FAF5E0;border:none;border-radius:2px;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-weight:700;font-size:1rem;cursor:pointer;letter-spacing:.08em;box-shadow:0 3px 14px rgba(139,58,16,.35);transition:opacity .18s}
          .vcp-sub:hover{opacity:.88}.vcp-sub:disabled{opacity:.55;cursor:not-allowed}
          .vcp-sticky{display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;background:linear-gradient(105deg,#6B2509,#B5421A);padding:10px 16px;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 -4px 20px rgba(43,26,14,.35);border-top:1px solid rgba(196,146,37,.35)}
          @media(max-width:720px){.vcp-sticky{display:flex}.fab{bottom:76px !important}}
          .vcp-day-btn{width:100%;text-align:left;border:none;cursor:pointer;background:transparent;padding:0;display:block}
        `}</style>

        {/* ── Video Hero ── */}
        <section className="vcp-hero">
          <video ref={videoRef} className="vcp-hero-video" src="/videos/Ganga-Aarti-Varanasi-SnapYT.App.mp4" autoPlay muted loop playsInline poster={U('1627894483216-2138af692e32',1400)} disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" />
          <button onClick={() => { if(videoRef.current){videoRef.current.muted=!videoRef.current.muted;setVideoMuted(v=>!v)} }} aria-label={videoMuted?'Unmute':'Mute'} style={{ position:'absolute', bottom:'24px', right:'24px', zIndex:4, background:'rgba(0,0,0,.45)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.2)', borderRadius:'50%', width:'40px', height:'40px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', color:'#fff' }}>{videoMuted?'🔇':'🔊'}</button>
          <div className="vcp-overlay" />
          <div className="vcp-hinner">
            <nav style={{ position:'absolute', top:'clamp(10px,2vw,18px)', left:'50%', transform:'translateX(-50%)', fontSize:'.76rem', color:'rgba(255,255,255,.7)', display:'flex', gap:'5px', flexWrap:'wrap', justifyContent:'center', zIndex:3, whiteSpace:'nowrap' }}>
              <a href="/" style={{ color:'#fff', textDecoration:'underline' }}>Home</a><span>›</span>
              <a href="/tours" style={{ color:'#fff', textDecoration:'underline' }}>Tours</a><span>›</span>
              <span>Complete Tour</span>
            </nav>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', fontSize:'.78rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#F4A81D', marginBottom:'14px' }}>
              <span>Varanasi</span><span style={{ color:'rgba(244,168,29,.45)' }}>|</span>
              <span style={{ color:'rgba(255,255,255,.6)', fontWeight:400, letterSpacing:'.08em' }}>5 Days · 4 Nights · Sampurna Kashi Darshan</span>
            </div>
            <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2.6rem,7vw,4.6rem)', color:'#FFFFFF', textShadow:'0 3px 28px rgba(0,0,0,.75)', lineHeight:.95, marginBottom:'12px', letterSpacing:'-.02em' }}>Varanasi Complete<br />Tour Package</h1>
            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:400, fontStyle:'italic', fontSize:'clamp(1.2rem,3vw,1.9rem)', color:'rgba(255,255,255,.75)', marginBottom:'10px' }}>5 Days · 4 Nights</div>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'clamp(1rem,2.5vw,1.4rem)', color:'#D4956A', marginBottom:'28px' }}>संपूर्ण काशी दर्शन · हर हर महादेव</div>
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'28px', justifyContent:'center' }}>
              <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#25D366', color:'#fff', borderRadius:'4px', padding:'14px 28px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 20px rgba(37,211,102,.45)' }}><WaIcon size={20} color="#fff" /> WhatsApp Us</a>
              <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.35)', color:'#FAF5E0', borderRadius:'4px', padding:'14px 24px', fontWeight:700, fontSize:'1rem', textDecoration:'none' }}>📋 Book Now</a>
            </div>
            <div style={{ display:'flex', gap:'0', flexWrap:'wrap', borderTop:'1px solid rgba(244,168,29,.18)', paddingTop:'20px', justifyContent:'center' }}>
              {[{num:'5',label:'Days'},{num:'4',label:'Nights'},{num:'10+',label:'Temples'},{num:'500+',label:'Pilgrims'}].map((s,i)=>(
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
          <div className="vcp-marquee-track">
            {[...Array(2)].flatMap(()=>[
              {icon:'⭐',text:'4.9★ Google Rating'},{icon:'👥',text:'500+ Pilgrims Served'},
              {icon:'📍',text:'Varanasi Based'},{icon:'⚡',text:'Reply within 2 Hours'},
              {icon:'🛕',text:'10+ Temples in 5 Days'},{icon:'🔒',text:'No Advance to Enquire'},
              {icon:'🚗',text:'AC Cab Included'},{icon:'⛵',text:'Daily Sunrise Boat Ride'},
            ]).map((t,i)=>(
              <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'0 32px', whiteSpace:'nowrap', fontSize:'.82rem', color:'rgba(250,245,224,.85)' }}>
                <span>{t.icon}</span>{t.text}<span style={{ color:'rgba(196,146,37,.5)', marginLeft:'32px' }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            COLLAPSIBLE ROUTE / TIMELINE ITINERARY
        ══════════════════════════════════════════════ */}
        <section style={{ padding:'70px 0 40px' }}>
          <div className="wrap" style={{ textAlign:'center', marginBottom:'52px' }}>
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>पाँच दिन की पवित्र यात्रा</div>
            <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,2.8rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'8px' }}>Day-by-Day Itinerary</h2>
            <p style={{ color:'#5A3F28', maxWidth:'46rem', margin:'0 auto', fontSize:'1rem' }}>5 days · 4 nights — click any day to expand the full plan.</p>
            <GoldRule margin="18px auto 0" />
          </div>
          <div className="wrap" style={{ maxWidth:'820px' }}>
            {/* Timeline container */}
            <div style={{ position:'relative' }}>
              {/* Vertical connecting line */}
              <div style={{ position:'absolute', left:'19px', top:'24px', bottom:'24px', width:'2px', background:'linear-gradient(to bottom,#B5421A,#C49225,#B5421A,#C49225,#B5421A)', borderRadius:'2px' }} />

              {DAYS.map((d, i) => {
                const isOpen = openDays.includes(i)
                const isLast = i === DAYS.length - 1
                return (
                  <div key={d.day} style={{ position:'relative', marginBottom: isLast ? 0 : '12px' }}>
                    {/* Circle node on timeline */}
                    <div style={{ position:'absolute', left:'10px', top:'22px', width:'20px', height:'20px', borderRadius:'50%', background: isOpen ? 'linear-gradient(135deg,#B5421A,#6B2509)' : '#FAF0CC', border: `3px solid ${isOpen ? '#C49225' : 'rgba(196,146,37,.5)'}`, zIndex:2, boxShadow: isOpen ? '0 0 0 4px rgba(196,146,37,.2)' : 'none', transition:'all .25s' }} />

                    {/* Card */}
                    <div style={{ marginLeft:'50px', background:'#FAF5E0', borderRadius:'8px', overflow:'hidden', boxShadow: isOpen ? '0 8px 32px rgba(43,26,14,.2),inset 0 0 0 1.5px rgba(196,146,37,.5)' : '0 2px 12px rgba(43,26,14,.1),inset 0 0 0 1px rgba(196,146,37,.25)', transition:'box-shadow .25s' }}>

                      {/* Clickable header */}
                      <button className="vcp-day-btn" onClick={() => toggleDay(i)}>
                        <div style={{ background: isOpen ? 'linear-gradient(105deg,#FAF0CC,#EDD690)' : '#FAF5E0', backgroundImage:GRAIN, display:'flex', alignItems:'center', gap:'0', borderBottom: isOpen ? '2px solid rgba(196,146,37,.5)' : 'none', padding:'0', transition:'background .2s' }}>
                          {/* Day number block */}
                          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'72px', borderRight:'2px dashed rgba(90,63,40,.2)', padding:'16px 10px', flexShrink:0 }}>
                            <span style={{ fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#8B5E1A' }}>DAY</span>
                            <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,5vw,3.2rem)', color: isOpen ? '#B5421A' : '#5A3F28', lineHeight:1, letterSpacing:'-2px' }}>{i+1}</span>
                          </div>
                          {/* Title + meta */}
                          <div style={{ flex:1, padding:'16px 20px', textAlign:'left' }}>
                            <div style={{ fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'.72rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#B5421A', marginBottom:'4px' }}>{d.day}</div>
                            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'clamp(.95rem,2.2vw,1.2rem)', color:'#3A1408', lineHeight:1.25 }}>{d.title}</div>
                            <div style={{ marginTop:'6px', display:'flex', alignItems:'center', gap:'8px' }}>
                              <span style={{ fontSize:'.68rem', color:'#8B5E1A', fontWeight:600 }}>{d.activities.length} stops</span>
                              {!isOpen && <span style={{ fontSize:'.65rem', color:'rgba(139,94,26,.55)', fontStyle:'italic' }}>tap to expand</span>}
                            </div>
                          </div>
                          {/* Chevron */}
                          <div style={{ padding:'0 20px', flexShrink:0, fontSize:'1rem', color:'#B5421A', transition:'transform .25s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</div>
                        </div>
                      </button>

                      {/* Expandable content */}
                      {isOpen && (
                        <div style={{ background:'#FAF0CC', backgroundImage:GRAIN, padding:'22px 24px 10px' }}>
                          <GoldRule margin="0 0 16px" />
                          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0', marginBottom:'22px' }}>
                            {d.activities.map((a, ai) => (
                              <li key={ai} style={{ display:'flex', alignItems:'flex-start', gap:'12px', fontSize:'.92rem', color:'#2B1A0E', lineHeight:1.6, padding:'7px 0', borderBottom: ai < d.activities.length-1 ? '1px solid rgba(196,146,37,.18)' : 'none' }}>
                                <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0, marginTop:'3px' }}>
                                  <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:'linear-gradient(135deg,#B5421A,#8B3A10)', color:'#FAF5E0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.58rem', fontWeight:900 }}>{ai+1}</div>
                                  {ai < d.activities.length-1 && <div style={{ width:'1px', height:'0', borderLeft:'1px dashed rgba(181,66,26,.2)' }} />}
                                </div>
                                {a}
                              </li>
                            ))}
                          </ul>
                          <GoldRule margin="0 0 18px" />
                          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', paddingBottom:'22px' }}>
                            {d.photos.map((p,pi) => <VintagePhoto key={pi} id={p.id} alt={p.alt} />)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Arrow connector between days */}
                    {!isLast && (
                      <div style={{ position:'absolute', left:'11px', bottom:'-22px', zIndex:3, display:'flex', flexDirection:'column', alignItems:'center', gap:'2px' }}>
                        <div style={{ width:'0', height:'0', borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:'8px solid #C49225', opacity:.6 }} />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Final destination marker */}
              <div style={{ marginLeft:'50px', marginTop:'24px', display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ position:'absolute', left:'10px', width:'20px', height:'20px', borderRadius:'50%', background:'linear-gradient(135deg,#C49225,#8B5E1A)', border:'3px solid #C49225', zIndex:2 }} />
                <div style={{ marginLeft:'50px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'10px 24px', borderRadius:'4px', fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:'.9rem', display:'inline-flex', alignItems:'center', gap:'8px' }}>
                  🏁 Journey Complete · Memories Forever
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Book Now after itinerary */}
        <div style={{ textAlign:'center', padding:'32px 0 0' }}>
          <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'14px 32px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.35)' }}>📋 Book This Tour</a>
        </div>
        <div style={{ overflow:'hidden', padding:'32px 0 0' }}><TempleSkyline /></div>

        {/* ── Package Includes ── */}
        <section style={{ padding:'70px 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div className="wrap">
            <SectionHead hi="पैकेज में क्या शामिल है" title="Package Includes" />
            <div className="vcp-inc-grid">
              {INCLUSIONS.map(item=>(
                <div key={item.title} className={item.title==='Temple Circuit'?'vcp-hide-mobile':''}>
                  <InclusionCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            VARANASI MAJOR PLACES
        ══════════════════════════════════════════════ */}
        {/* ── Varanasi Highlights ── */}
        <section style={{ padding:'60px 0 70px' }}>
          <div className="wrap">
            <SectionHead hi="काशी की खोज करें" title="What You'll Experience" />
            {/* ── highlight categories ── */}
            <div style={{ display:'grid', gap:'32px' }}>

              {/* Row 1: Major Temples & Ghats */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🛕</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408', letterSpacing:'.01em' }}>Temples &amp; Ghats</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Kashi Vishwanath Temple','Manikarnika Ghat','Dashashwamedh Ghat','Assi Ghat','Maa Annapurna Mandir','Kal Bhairav Temple','Sankat Mochan Hanuman','Durga Kund Mandir','Bharat Mata Mandir','Tulsi Manas Mandir','Vishalakshi Mandir','Harishchandra Ghat'].map(p => (
                    <span key={p} style={{ background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{p}</span>
                  ))}
                </div>
              </div>

              {/* Row 2: Boat Rides on Ganga */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>⛵</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408', letterSpacing:'.01em' }}>Ganga Boat Rides</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Sunrise Boat Ride (5 AM)','Ganga Aarti Ride (6:30 PM)','Night Ganga Cruise','84 Ghats Panorama','Private Boat Option'].map(b => (
                    <span key={b} style={{ background:'linear-gradient(135deg,rgba(58,20,8,.08),rgba(196,146,37,.12))', border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{b}</span>
                  ))}
                </div>
              </div>

              {/* Row 3: Heritage Walk & Excursions */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🚶</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408', letterSpacing:'.01em' }}>Heritage Walks &amp; Excursions</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Vishwanath Gali Walk','Godowlia Chowk','Sarnath (Dhamek Stupa)','Ramnagar Fort','Chunar Fort','BHU Campus & Birla Temple','Kabir Math','Bengali Tola'].map(h => (
                    <span key={h} style={{ background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{h}</span>
                  ))}
                </div>
              </div>

              {/* Row 4: Street Food */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>🍵</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408', letterSpacing:'.01em' }}>Banarasi Street Food</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Banarasi Chai','Kachori Sabzi','Tamatar Chaat','Lassi at Shri Rajbandhu','Malaiyyo (winters)','Banarasi Paan'].map(f => (
                    <span key={f} style={{ background:'rgba(196,146,37,.1)', border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Row 5: Hidden Gems */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <span style={{ fontSize:'1.3rem' }}>💎</span>
                  <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'1.05rem', color:'#3A1408', letterSpacing:'.01em' }}>Hidden Gems</span>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(196,146,37,.5),transparent)', marginLeft:'6px' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Lolark Kund','Kabir Math Weaving Studio','Nepali Temple (Pashupatinath)','Chet Singh Ghat','Darbhanga Ghat Haveli','Man Mandir Observatory','Trilochan Ghat at Dusk','Jain Temples of Bhelupura'].map(g => (
                    <span key={g} style={{ background:'#FAF5E0', backgroundImage:GRAIN, border:'1.5px solid rgba(181,66,26,.25)', borderRadius:'20px', padding:'5px 14px', fontSize:'.82rem', color:'#5A3F28', fontWeight:600, whiteSpace:'nowrap' }}>{g}</span>
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
          <div className="vcp-slider">
            <div className="vcp-scroll-track">
              {[...TRIP_DIARIES,...TRIP_DIARIES].map((t,i)=>{
                const tilts=[-4,3,-2,4,-3,2],lifts=[-14,10,-8,16,-10,8]
                return (
                  <div key={`${t.name}-${i}`} className="vcp-slide" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ transform:`rotate(${tilts[i%tilts.length]}deg) translateY(${lifts[i%lifts.length]}px)`, width:'100%' }}>
                      <div style={{ background:'#FAF5E0', padding:'4px', boxShadow:'0 8px 28px rgba(0,0,0,.35),inset 0 0 0 1px rgba(196,146,37,.3)', borderRadius:'2px' }}>
                        <div style={{ aspectRatio:'3/4', overflow:'hidden', background:'#E8D8A0', position:'relative' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={U(t.photo,400)} alt={t.name} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
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
            <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#B5421A,#6B2509)', color:'#FAF5E0', padding:'14px 32px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 6px 24px rgba(107,37,9,.35)' }}>📋 Book This Tour</a>
          </div>
        </section>

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
            <div style={{ position:'absolute', inset:0, zIndex:0 }} dangerouslySetInnerHTML={{ __html:TORN_PAPER_SVG }} />
            <div style={{ position:'relative', zIndex:1, padding:'clamp(44px,7vw,72px) clamp(60px,12vw,100px) clamp(64px,10vw,88px)' }}>
              {status==='success'?(
                <div style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px' }}>
                  <div style={{ fontSize:'3rem' }}>🙏</div>
                  <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.6rem,4vw,2.4rem)', color:'#6B2509' }}>Enquiry Received!</h2>
                  <p style={{ color:'#5A3F28', maxWidth:'360px', lineHeight:1.65 }}>Our team will confirm your booking on WhatsApp within 2 hours.</p>
                  <GoldRule margin="4px 0" />
                  <a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 24px', background:'#25D366', color:'#fff', borderRadius:'4px', fontWeight:700, textDecoration:'none' }}><WaIcon size={18} color="#fff" /> Also chat on WhatsApp</a>
                </div>
              ):(
                <>
                  <div style={{ textAlign:'center', marginBottom:'32px' }}>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(181,66,26,.12)', border:'1px solid rgba(181,66,26,.25)', borderRadius:'20px', padding:'4px 12px', fontSize:'.72rem', fontWeight:700, color:'#B5421A', marginBottom:'10px' }}>🔥 Popular dates filling fast — limited slots</div>
                    <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.9rem,4vw,2.8rem)', color:'#6B2509', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'12px' }}>Book This Tour</h2>
                    <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'8px 16px', marginBottom:'14px' }}>
                      {[['⭐','4.9 Rating'],['👥','500+ Pilgrims'],['⚡','Reply in 2 hrs'],['📍','Varanasi Based']].map(([icon,label])=>(
                        <span key={label} style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'.72rem', color:'#5A3F28', fontWeight:600 }}><span>{icon}</span>{label}</span>
                      ))}
                    </div>
                    <GoldRule margin="4px auto 0" />
                  </div>
                  <form onSubmit={handleSubmit} style={{ background:'transparent', border:'none', padding:0 }}>
                    <div className="vcp-fg">
                      <div className="vcp-fl"><label htmlFor="vcp-name">Full Name *</label><input id="vcp-name" type="text" required placeholder="e.g. Ramesh Sharma" autoComplete="name" value={form.name} onChange={e=>setF('name',e.target.value)} /></div>
                      <div className="vcp-fl"><label htmlFor="vcp-phone">Mobile / WhatsApp *</label><input id="vcp-phone" type="tel" required placeholder="+91 98765 43210" autoComplete="tel" value={form.phone} onChange={e=>setF('phone',e.target.value)} /></div>
                      <div className="vcp-fl">
                        <label htmlFor="vcp-people">No. of Travellers *</label>
                        <select id="vcp-people" required value={form.num_people} onChange={e=>setF('num_people',e.target.value)}>
                          <option value="">Select travellers</option>
                          {['1','2','3','4','5','6','7','8','9','10','11–15','16–20','20+'].map(n=><option key={n} value={n}>{n} {n==='1'?'person':'people'}</option>)}
                        </select>
                      </div>
                      <div className="vcp-fl"><label htmlFor="vcp-date">Expected Travel Date</label><input id="vcp-date" type="date" min={today} value={form.start_date} onChange={e=>setF('start_date',e.target.value)} /></div>
                      <div className="vcp-fl"><label htmlFor="vcp-note">Special Requirements</label><input id="vcp-note" type="text" placeholder="e.g. senior citizens, vegetarian…" value={form.customer_notes} onChange={e=>setF('customer_notes',e.target.value)} /></div>
                      {status==='error'&&<div className="vcp-full" style={{ background:'#fdf2f2', border:'1px solid #f5c6c6', borderRadius:'6px', padding:'10px 14px', fontSize:'.88rem', color:'#9b2c2c' }}>{errMsg} · <a href={waEnquire} target="_blank" rel="noopener">Message us on WhatsApp</a></div>}
                      <div className="vcp-full"><button type="submit" className="vcp-sub" disabled={status==='submitting'}>{status==='submitting'?'Sending…':'Book Now — Send Enquiry'}</button></div>
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
            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1.1rem', color:'#B5421A', marginBottom:'10px' }}>हर हर महादेव · काशी बुलाती है</div>
            <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,5vw,3.2rem)', color:'#6B2509', letterSpacing:'-1px', lineHeight:1.1, marginBottom:'16px' }}>Your complete Kashi awaits.<br/>We&apos;ll take care of everything.</h2>
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

      <a href={waEnquire} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <WaIcon size={26} color="#fff" />
      </a>

      <div className="vcp-sticky">
        <div style={{ display:'flex', flexDirection:'column', gap:'1px' }}>
          <strong style={{ color:'#FAF5E0', fontSize:'.88rem' }}>Varanasi Complete Tour</strong>
          <span style={{ color:'rgba(250,245,224,.65)', fontSize:'.72rem' }}>5 Days · Temples · Forts · Sarnath</span>
        </div>
        <a href="#book" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#FAF5E0', color:'#6B2509', padding:'9px 18px', borderRadius:'4px', fontWeight:700, fontSize:'.88rem', textDecoration:'none', whiteSpace:'nowrap' }}>📋 Book Now</a>
      </div>
    </div>
  )
}
