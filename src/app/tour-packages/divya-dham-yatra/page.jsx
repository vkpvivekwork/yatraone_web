'use client'
import { useState } from 'react'

const WA_NUMBER = '919277472279'
const WA_BASE    = `https://wa.me/${WA_NUMBER}`
const TORAN_COUNT = 60
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const DAYS = [
  {
    day: 1, city: 'Varanasi', title: 'Kashi Darshan — Temples & Ganga Aarti',
    activities: [
      'Arrival in Varanasi — hotel check-in',
      'Kashi Vishwanath Temple darshan',
      'Maa Annapurna Temple darshan',
      'Baba Kalbhairav Temple darshan',
      'Local street food & Banarasi saree weavers area',
      'Ganga Aarti at Dashashwamedh Ghat with boat ride',
      'Overnight stay in Varanasi',
    ],
    photos: [
      { id: '1665413791167-6718dcf36773', alt: 'Kashi Vishwanath Temple' },
      { id: '1627894483216-2138af692e32', alt: 'Ganga Aarti ceremony' },
      { id: '1561359313-0639aad49ca6',    alt: 'Varanasi ghats' },
    ],
  },
  {
    day: 2, city: 'Varanasi', title: 'Sarnath & Temple Trail',
    activities: [
      'Sankat Mochan Temple darshan',
      'Durga Temple (Durgakund) darshan',
      'Tulsi Manas Mandir',
      'Banaras Hindu University campus',
      'Kachori Sabji — famous Banarasi breakfast',
      'Sarnath — Deer Park, Dharmarajika Temple',
      'Chaukhandi Stupa & Dhamek Stupa',
      'Overnight stay in Varanasi',
    ],
    photos: [
      { id: '1571536802807-30451e3955d8', alt: 'Morning on Ganga' },
      { id: '1608412525537-662195e817c5', alt: 'Varanasi temple trail' },
      { id: '1649876674933-a5b3b39b4da1', alt: 'Sarnath — Dhamek Stupa' },
    ],
  },
  {
    day: 3, city: 'Prayagraj', title: 'Triveni Sangam & Fort',
    activities: [
      'Drive from Varanasi to Prayagraj (~3 hrs)',
      'Hanuman Mandir darshan at Prayagraj',
      'Boat ride & holy bath at Triveni Sangam (Ganga + Yamuna + Saraswati)',
      'Anand Bhawan (Nehru family museum)',
      'Allahabad Fort (Ashoka Pillar, Saraswati Koop, Patalpuri Temple)',
      'Khusro Bagh (Mughal garden)',
      'Drive to Ayodhya — hotel check-in',
      'Evening Saryu Aarti at Ram ki Paidi',
    ],
    photos: [
      { id: '1705952484283-19c31e37e0e4', alt: 'Triveni Sangam' },
      { id: '1706186829065-ede677efe384', alt: 'Prayagraj river banks' },
      { id: '1599831069477-b2acdc0bcb91', alt: 'Saryu Aarti — Ayodhya' },
    ],
  },
  {
    day: 4, city: 'Ayodhya', title: 'Ram Janmabhoomi & Saryu Aarti',
    activities: [
      'Ram Janmabhoomi Temple darshan',
      'Hanuman Garhi Temple',
      'Kanak Bhawan darshan',
      'Dasharath Mahal visit',
      'Ramkatha Park',
      'Guptar Ghat — Lord Ram\'s final journey site',
      'Evening Aarti at Saryu River',
      'Overnight stay in Ayodhya',
    ],
    photos: [
      { id: '1613445607898-f46e51645acf', alt: 'Ram Mandir — Ayodhya' },
      { id: '1634920540678-df0e179c5243', alt: 'Kanak Bhawan — Ayodhya' },
      { id: '1599831069477-b2acdc0bcb91', alt: 'Saryu Aarti — Ayodhya' },
    ],
  },
  {
    day: 5, city: 'Bodh Gaya', title: 'Mahabodhi Temple & Buddhist Monasteries',
    activities: [
      'Drive from Ayodhya to Bodh Gaya (~5 hrs)',
      'Mahabodhi Temple — UNESCO World Heritage Site',
      'Bodhi Tree & Vajrasana (seat of enlightenment)',
      'Great Buddha Statue (80 ft)',
      'Thai, Tibetan & Japanese Monasteries',
      'Indosan Nippon Japanese Temple & Chinese Temple',
      'Archaeological Museum Bodh Gaya',
      'Departure to home city',
    ],
    photos: [
      { id: '1596097825168-c9b773f404ff', alt: 'Mahabodhi Temple — Bodh Gaya' },
      { id: '1513475382585-d06e58bcb0e0', alt: 'Buddhist monastery' },
      { id: '1608412525537-662195e817c5', alt: 'Bodh Gaya' },
    ],
  },
]

const TRIP_DIARIES = [
  { name: 'Rajesh Sharma',  city: 'Delhi',     stars: 5, photo: '1627894483216-2138af692e32', caption: 'Ganga Aarti · Varanasi' },
  { name: 'Priya Verma',    city: 'Mumbai',    stars: 5, photo: '1613445607898-f46e51645acf', caption: 'Ram Mandir · Ayodhya' },
  { name: 'Sunita Devi',    city: 'Patna',     stars: 5, photo: '1705952484283-19c31e37e0e4', caption: 'Triveni Sangam · Prayagraj' },
  { name: 'Manoj Tiwari',   city: 'Bhopal',    stars: 5, photo: '1649876674933-a5b3b39b4da1', caption: 'Sarnath · Varanasi' },
  { name: 'Kavita Singh',   city: 'Jaipur',    stars: 5, photo: '1599831069477-b2acdc0bcb91', caption: 'Saryu Aarti · Ayodhya' },
  { name: 'Amit Gupta',     city: 'Lucknow',   stars: 5, photo: '1596097825168-c9b773f404ff', caption: 'Bodh Gaya Darshan' },
]

const ROUTE = [
  { city: 'Varanasi',   hi: 'काशी',         nights: '2 Nights',   days: 'Day 1–2' },
  { city: 'Prayagraj',  hi: 'प्रयागराज',    nights: 'Day Visit',  days: 'Day 3' },
  { city: 'Ayodhya',    hi: 'अयोध्या',      nights: '1 Night',    days: 'Day 3–4' },
  { city: 'Bodh Gaya',  hi: 'बोध गया',      nights: 'Day Visit',  days: 'Day 5' },
]

const SERVICES = [
  { hi: 'कैब',              en: 'AC Cab',          photo: '1449965408869-eaa3f722e40d' },
  { hi: 'नौका विहार',       en: 'Boat Ride',        photo: '1571536802807-30451e3955d8' },
  { hi: 'मंदिर दर्शन',      en: 'Temple Darshan',   photo: '1665413791167-6718dcf36773' },
  { hi: 'होटल बुकिंग',      en: 'Hotel Booking',    photo: '1631049307264-da0ec9d70304' },
  { hi: 'संगम स्नान',       en: 'Sangam Snan',      photo: '1705952484283-19c31e37e0e4' },
  { hi: 'पिकअप और ड्रॉप',   en: 'Pickup & Drop',    photo: '1449965408869-eaa3f722e40d' },
  { hi: 'गंगा आरती',        en: 'Ganga Aarti',      photo: '1627894483216-2138af692e32' },
  { hi: 'बोध गया दर्शन',    en: 'Bodh Gaya Visit',  photo: '1596097825168-c9b773f404ff' },
]

const ACTIVITIES = [
  { en: 'Kashi Vishwanath Temple Darshan',      photo: '1665413791167-6718dcf36773' },
  { en: 'Ganga Aarti & Boat Ride',              photo: '1627894483216-2138af692e32' },
  { en: 'Sarnath — Buddha\'s First Sermon',     photo: '1649876674933-a5b3b39b4da1' },
  { en: 'Triveni Sangam Holy Dip',              photo: '1705952484283-19c31e37e0e4' },
  { en: 'Allahabad Fort & Anand Bhawan',        photo: '1706186829065-ede677efe384' },
  { en: 'Ram Janmabhoomi Darshan',              photo: '1613445607898-f46e51645acf' },
  { en: 'Saryu Aarti — Ayodhya',               photo: '1599831069477-b2acdc0bcb91' },
  { en: 'Mahabodhi Temple — Bodh Gaya',         photo: '1596097825168-c9b773f404ff' },
]

const FAQS = [
  { q: 'What is the duration of the Divya Dham Yatra?', a: 'This is a 5 Days / 4 Nights tour covering all four sacred destinations: Varanasi (2 nights), Prayagraj (day visit), Ayodhya (1 night) and Bodh Gaya (day visit & departure).' },
  { q: 'Is there a minimum group size?', a: 'The Standard package requires minimum 4 persons. The Premium package is available for 2 persons. Contact us on WhatsApp for solo bookings.' },
  { q: 'Are meals included?', a: 'Daily breakfast is included at all hotels. Lunch and dinner are not included.' },
  { q: 'What is not covered in the package?', a: 'Train / flight tickets, monument entry fees, personal expenses, 5% GST and helicopter / palkhi charges are not included.' },
  { q: 'How do I confirm my booking?', a: '50% advance payment at booking. Remaining 50% on Day 1 after hotel check-in.' },
  { q: 'Is the Triveni Sangam boat ride included?', a: 'Yes. A boat ride for the Sangam holy dip at Prayagraj is included in both packages.' },
  { q: 'Is Bodh Gaya covered on a separate day?', a: 'Yes. Day 5 is dedicated to Bodh Gaya — Mahabodhi Temple, Bodhi Tree, Great Buddha Statue, and the international monasteries before departure.' },
  { q: 'Can I customise the itinerary?', a: 'Yes. Contact us on WhatsApp with your requirements and we will tailor the tour to suit your preferences.' },
]

const STD = {
  label: 'Standard', price: '₹12,000', note: 'per person · Min 4 Pax',
  inclusions: [
    'Accommodation (4 Nights · 3 Star)',
    'AC Vehicle — all intercity transfers & sightseeing',
    'Daily Breakfast',
    'Ganga Aarti Boat Ride at Varanasi',
    'Triveni Sangam boat ride at Prayagraj',
    'Kashi Vishwanath Darshan assistance',
    'Ram Mandir Darshan assistance',
    'All sightseeing per itinerary',
    'Driver & Fuel charges',
  ],
  exclusions: [
    'Train / Flight tickets',
    'Lunch & Dinner',
    'Monument entry fees',
    'Pickup & Drop from station/airport',
    'Personal expenses',
    '5% GST',
  ],
}

const PRE = {
  label: 'Premium', price: '₹17,999', note: 'per person · Min 2 Pax',
  inclusions: [
    'Accommodation (4 Nights · 4 Star)',
    'AC Vehicle — all intercity transfers & sightseeing',
    'Daily Breakfast',
    'Morning & Evening Boat Ride — Ganga',
    'Triveni Sangam boat ride at Prayagraj',
    'Kashi Vishwanath VIP Darshan passes',
    'Ram Mandir VIP Darshan passes',
    'Pickup & Drop from Railway Station / Airport',
    'All sightseeing per itinerary',
    'Driver & Fuel charges',
  ],
  exclusions: [
    'Train / Flight tickets',
    'Lunch & Dinner',
    'Monument entry fees',
    'Personal expenses',
    '5% GST',
  ],
}

function WaIcon({ size = 20, color = 'currentColor' }) {
  return <svg viewBox="0 0 32 32" fill={color} style={{ width: size, height: size, flexShrink: 0 }}><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" /></svg>
}
function GoldRule({ margin = '20px 0' }) {
  return <div style={{ display:'flex', alignItems:'center', gap:'10px', margin }}><div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} /><svg viewBox="0 0 24 24" width="16" height="16" fill="#C49225"><path d="M12 2l1.8 5.4H20l-4.9 3.6 1.8 5.4L12 13l-4.9 3.4 1.8-5.4L4 7.4h6.2z" /></svg><div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} /></div>
}
function TempleSkyline({ fill = '#C49225', opacity = 1 }) {
  return <svg viewBox="0 0 1200 160" preserveAspectRatio="xMidYMax meet" style={{ width:'100%', display:'block', pointerEvents:'none' }} aria-hidden="true"><g fill={fill} opacity={opacity}><rect x="0" y="148" width="1200" height="14" /><rect x="30" y="120" width="50" height="28" /><polygon points="55,82 30,120 80,120" /><polygon points="55,62 43,82 67,82" /><rect x="52" y="50" width="6" height="13" /><circle cx="55" cy="47" r="5" /><rect x="165" y="110" width="62" height="38" /><polygon points="196,68 165,110 227,110" /><polygon points="196,48 180,68 212,68" /><polygon points="196,32 186,48 206,48" /><rect x="193" y="20" width="6" height="13" /><circle cx="196" cy="17" r="5.5" /><rect x="330" y="116" width="18" height="32" /><rect x="390" y="116" width="18" height="32" /><rect x="330" y="101" width="78" height="17" /><polygon points="369,71 330,101 408,101" /><rect x="366" y="58" width="6" height="14" /><circle cx="369" cy="55" r="5" /><rect x="502" y="98" width="82" height="50" /><polygon points="543,50 502,98 584,98" /><polygon points="543,28 525,50 561,50" /><polygon points="543,12 534,28 552,28" /><rect x="540" y="0" width="6" height="13" /><circle cx="543" cy="-2" r="6" /><rect x="492" y="142" width="102" height="6" /><rect x="728" y="114" width="56" height="34" /><polygon points="756,74 728,114 784,114" /><polygon points="756,56 742,74 770,74" /><rect x="754" y="44" width="5" height="13" /><circle cx="756" cy="41" r="4.5" /><rect x="882" y="120" width="16" height="28" /><rect x="936" y="120" width="16" height="28" /><rect x="882" y="107" width="70" height="15" /><polygon points="917,80 882,107 952,107" /><rect x="914" y="67" width="6" height="14" /><circle cx="917" cy="64" r="5" /><rect x="1044" y="116" width="54" height="32" /><polygon points="1071,76 1044,116 1098,116" /><polygon points="1071,58 1057,76 1085,76" /><rect x="1068" y="46" width="6" height="13" /><circle cx="1071" cy="43" r="5" /></g></svg>
}
function VintagePhoto({ id, alt }) {
  return <div style={{ background:'#FAF5E0', padding:'5px 5px 20px', boxShadow:'0 6px 20px rgba(43,26,14,.3), inset 0 0 0 1px rgba(196,146,37,.35)', borderRadius:'2px', position:'relative' }}><div style={{ overflow:'hidden', aspectRatio:'1', background:'#E8D8A0' }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={U(id, 380)} alt={alt} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} /></div><div style={{ position:'absolute', bottom:'3px', left:'5px', right:'5px', textAlign:'center', fontSize:'.65rem', color:'#8B5E1A', fontFamily:"'Kalam', cursive", overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{alt}</div></div>
}
function DayCard({ d }) {
  return <div style={{ borderRadius:'5px', overflow:'hidden', border:'1.5px solid rgba(196,146,37,.4)', boxShadow:'0 8px 36px rgba(43,26,14,.18)' }}><div style={{ background:'linear-gradient(105deg,#FAF0CC 0%,#EDD690 55%,#FAF0CC 100%)', backgroundImage:GRAIN, display:'flex', alignItems:'stretch', position:'relative', overflow:'hidden', borderBottom:'2px solid rgba(196,146,37,.5)' }}><div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'100px', borderRight:'2px dashed rgba(90,63,40,.25)', padding:'20px 14px', flexShrink:0 }}><span style={{ fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'.66rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#8B5E1A', marginBottom:'2px' }}>DAY</span><span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(3rem,7vw,4.8rem)', color:'#5A3F28', lineHeight:1, letterSpacing:'-3px' }}>{d.day}</span></div><div style={{ padding:'20px 26px', display:'flex', flexDirection:'column', justifyContent:'center' }}><div style={{ fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'.75rem', letterSpacing:'.2em', textTransform:'uppercase', color:'#B5421A', marginBottom:'5px' }}>{d.city}</div><div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:600, fontSize:'clamp(.95rem,2.4vw,1.25rem)', color:'#5A3F28', lineHeight:1.25 }}>{d.title}</div></div><div style={{ position:'absolute', top:'9px', right:'14px', fontSize:'1.2rem', opacity:.3, color:'#8B5E1A', fontFamily:"'Tiro Devanagari Hindi',serif" }}>ॐ</div></div><div style={{ background:'#FAF0CC', backgroundImage:GRAIN, padding:'24px 28px 30px' }}><GoldRule margin="0 0 16px" /><ul style={{ listStyle:'none', marginBottom:'26px' }}>{d.activities.map((act,i)=><li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'4px 0', fontFamily:"'Mukta',sans-serif", fontSize:'clamp(.92rem,1.8vw,1.04rem)', fontWeight:600, color:'#2B1A0E', lineHeight:1.45, borderBottom:i<d.activities.length-1?'1px solid rgba(196,146,37,.2)':'none' }}><span style={{ color:'#B5421A', fontSize:'.8rem', marginTop:'4px', flexShrink:0 }}>◆</span>{act}</li>)}</ul><GoldRule margin="0 0 20px" /><div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }}>{d.photos.map((p,i)=><VintagePhoto key={i} id={p.id} alt={p.alt} />)}</div></div></div>
}
function ServiceCard({ svc }) {
  return <div style={{ background:'#FAF5E0', padding:'4px 4px 22px', boxShadow:'0 6px 20px rgba(43,26,14,.3), inset 0 0 0 1px rgba(196,146,37,.35)', borderRadius:'2px', position:'relative' }}><div style={{ overflow:'hidden', aspectRatio:'1', background:'#E8D8A0' }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={U(svc.photo, 400)} alt={svc.en} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} /></div><div style={{ position:'absolute', bottom:'4px', left:'6px', right:'6px', textAlign:'center', fontSize:'.7rem', color:'#8B5E1A', fontFamily:"'Kalam', cursive", overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{svc.en}</div></div>
}
function FaqItem({ faq, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return <div style={{ background:'#FAF0CC', backgroundImage:GRAIN, border:'1.5px solid rgba(196,146,37,.4)', borderRadius:'4px', overflow:'hidden' }}><button onClick={()=>setOpen(v=>!v)} style={{ width:'100%', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'14px', padding:'16px 20px', cursor:'pointer', border:'none', background:'transparent', fontFamily:"'Mukta',sans-serif", fontWeight:700, fontSize:'clamp(.95rem,1.8vw,1.05rem)', color:'#2B1A0E', lineHeight:1.4 }} aria-expanded={open}><span>{faq.q}</span><span style={{ flexShrink:0, width:'22px', height:'22px', borderRadius:'50%', background:open?'#B5421A':'#C49225', display:'flex', alignItems:'center', justifyContent:'center', color:'#FAF5E0', fontSize:'.8rem', fontWeight:900 }}>{open?'−':'+'}</span></button>{open&&<div style={{ padding:'14px 20px 18px', fontFamily:"'Mukta',sans-serif", fontSize:'.97rem', color:'#4A2E12', lineHeight:1.65, borderTop:'1px solid rgba(196,146,37,.3)' }}>{faq.a}</div>}</div>
}
function PkgCard({ data, waLink }) {
  const isPremium = data.label === 'Premium'
  return <div style={{ flex:1, minWidth:'280px', background:'#FAF0CC', backgroundImage:GRAIN, border:isPremium?'2px solid #B5421A':'1.5px solid rgba(196,146,37,.45)', borderRadius:'5px', padding:'32px 26px 26px', position:'relative', boxShadow:isPremium?'0 10px 36px rgba(181,66,26,.22)':'0 6px 24px rgba(43,26,14,.14)' }}><div style={{ position:'absolute', top:'-14px', left:'24px', background:isPremium?'#B5421A':'#7A5018', color:'#FAF5E0', borderRadius:'3px', padding:'3px 16px', fontSize:'.76rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' }}>{isPremium?'BEST VALUE':'STANDARD'}</div><div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'1.3rem', color:'#2B1A0E', marginBottom:'4px' }}>{data.label} Package</div><GoldRule margin="10px 0 12px" /><div style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'2.4rem', fontWeight:900, color:'#B5421A', lineHeight:1, marginBottom:'4px' }}>{data.price}/-</div><div style={{ fontSize:'.85rem', color:'#8B5E1A', marginBottom:'22px' }}>{data.note}</div><div style={{ marginBottom:'16px' }}><div style={{ fontWeight:700, color:'#3A6B2E', fontSize:'.88rem', marginBottom:'8px' }}>✔ What&apos;s Included</div>{data.inclusions.map(item=><div key={item} style={{ display:'flex', gap:'8px', padding:'5px 0', borderBottom:'1px dashed rgba(58,107,46,.2)', fontSize:'.9rem' }}><span style={{ color:'#3A6B2E', flexShrink:0, marginTop:'2px' }}>✔</span><span>{item}</span></div>)}</div><div style={{ marginBottom:'24px' }}><div style={{ fontWeight:700, color:'#8B2020', fontSize:'.88rem', marginBottom:'8px' }}>✖ Not Included</div>{data.exclusions.map(item=><div key={item} style={{ display:'flex', gap:'8px', padding:'5px 0', borderBottom:'1px dashed rgba(139,32,32,.18)', fontSize:'.9rem' }}><span style={{ color:'#8B2020', flexShrink:0, marginTop:'2px' }}>✖</span><span>{item}</span></div>)}</div><a href={waLink} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:isPremium?'linear-gradient(135deg,#B5421A,#7A2E0E)':'linear-gradient(135deg,#7A5018,#4A3010)', color:'#FAF5E0', borderRadius:'4px', padding:'13px 20px', fontWeight:700, fontSize:'1rem', textDecoration:'none' }}><WaIcon color="#FAF5E0" /> Book {data.label} on WhatsApp</a></div>
}
function generateTornPaperSVG() {
  const W=600,H=804;let seed=21;const rand=()=>(seed=(seed*16807)%2147483647)/2147483647;const r=(a,b)=>a+rand()*(b-a);const corners=[0,1,2,3].map(()=>rand()<0.75?{span:r(28,70),slope:r(0.6,1.5)}:{span:r(4,10),slope:1});function edge(x1,y1,x2,y2,nx,ny,cStart,cEnd,skipStart=0,skipEnd=0){const len=Math.hypot(x2-x1,y2-y1),ux=(x2-x1)/len,uy=(y2-y1)/len;const shelves=[];let s=0;while(s<len){const w=r(25,120),k=rand();shelves.push({from:s,to:s+w,depth:k<0.3?r(18,34):k<0.65?r(8,18):r(0,7)});s+=w};const shelfAt=t=>shelves.find(sh=>t>=sh.from&&t<sh.to)||shelves[shelves.length-1];const bites=[];let b=r(25,70);while(b<len-30){if(rand()<0.75)bites.push({at:b,w:r(14,55),depth:r(20,46),skew:r(-0.5,0.5)});b+=r(55,140)};const rips=[];let q=r(60,160);while(q<len-50){if(rand()<0.5)rips.push({at:q,depth:r(35,85),lean:r(-18,18),w:r(3,7)});q+=r(120,260)};const pts=[];let t=0,depth=shelfAt(0).depth;while(t<=len){const target=shelfAt(t).depth;depth+=(target-depth)*0.3;let off=depth+r(0,3.5);if(rand()<0.12)off+=r(3,9);const bite=bites.find(bt=>t>=bt.at&&t<=bt.at+bt.w);if(bite){const f=(t-bite.at)/bite.w;const shape=Math.sin(Math.PI*Math.min(1,f*1.4))*(1+bite.skew*(f-0.5));off=Math.max(off,bite.depth*Math.min(1,shape*1.6)+r(-4,4))};if(len-t<Math.max(cEnd.span*cEnd.slope,skipEnd))break;if(t<skipStart){t+=r(1.5,3.5);continue};if(t<cStart.span)off=Math.max(off,(cStart.span-t)*cStart.slope+r(-2,4));pts.push([x1+ux*t+nx*off,y1+uy*t+ny*off]);if(pts.length===1)pts.firstOff=off;pts.lastOff=off;const rip=rips.find(rp=>t<=rp.at&&t+4>rp.at);if(rip){const bx=x1+ux*t,by=y1+uy*t;rip.depth=off+rip.depth*0.75;const steps=5;for(let i=1;i<=steps;i++){const f=i/steps;pts.push([bx+ux*(rip.lean*f+r(-2,2))+nx*(off+(rip.depth-off)*f),by+uy*(rip.lean*f+r(-2,2))+ny*(off+(rip.depth-off)*f)])};for(let i=steps-1;i>=0;i--){const f=i/steps;pts.push([bx+ux*(rip.lean*f+rip.w*(1-f*0.7)+r(-1.5,1.5))+nx*(off+(rip.depth-off)*f),by+uy*(rip.lean*f+rip.w*(1-f*0.7)+r(-1.5,1.5))+ny*(off+(rip.depth-off)*f)])};t+=rip.w+1;continue};t+=r(1.5,3.5)};return pts};const m=3;const top=edge(m,m,W-m,m,0,1,corners[0],corners[1]);const right=edge(W-m,m,W-m,H-m,-1,0,corners[1],corners[2],top.lastOff+2);const bottom=edge(W-m,H-m,m,H-m,0,-1,corners[2],corners[3],right.lastOff+2);const left=edge(m,H-m,m,m,1,0,corners[3],corners[0],bottom.lastOff+2,top.firstOff+2);const pts=[...top,...right,...bottom,...left];const d='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')+' Z';let stains='';for(let i=0;i<26;i++){const side=Math.floor(r(0,4));let cx=r(0,W),cy=r(0,H);const inset=r(0,70);if(side===0)cy=inset;else if(side===1)cx=W-inset;else if(side===2)cy=H-inset;else cx=inset;stains+=`<ellipse cx="${cx}" cy="${cy}" rx="${r(20,70)}" ry="${r(15,55)}" fill="#c98a45" opacity="${r(0.08,0.2)}" filter="url(#tp-soft)"/>`};for(let i=0;i<6;i++){stains+=`<ellipse cx="${r(80,W-80)}" cy="${r(80,H-80)}" rx="${r(25,60)}" ry="${r(20,50)}" fill="#d9a060" opacity="${r(0.04,0.09)}" filter="url(#tp-soft)"/>`};let creases='';function crease(x,y,ang,segs,depth){let pd=`M${x.toFixed(1)} ${y.toFixed(1)}`;for(let i=0;i<segs;i++){ang+=r(-0.45,0.45);const l=r(10,32);x+=Math.cos(ang)*l;y+=Math.sin(ang)*l;pd+=` L${x.toFixed(1)} ${y.toFixed(1)}`;if(depth<2&&rand()<0.18)crease(x,y,ang+r(-1.2,1.2),Math.floor(r(2,5)),depth+1)};const o=r(0.25,0.5);creases+=`<path d="${pd}" stroke="#fff4dc" stroke-width="${r(0.6,1.3).toFixed(2)}" opacity="${o.toFixed(2)}" fill="none" stroke-linejoin="round"/>`;creases+=`<path d="${pd}" transform="translate(0.9 0.9)" stroke="#a87440" stroke-width="0.6" opacity="${(o*0.35).toFixed(2)}" fill="none" stroke-linejoin="round"/>`};for(let i=0;i<55;i++){crease(r(0,W),r(0,H),r(0,Math.PI*2),Math.floor(r(3,9)),0)};return `<svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="tp-tear"><path d="${d}"/></clipPath><radialGradient id="tp-base" cx="52%" cy="48%" r="70%"><stop offset="0%" stop-color="#ffe9bf"/><stop offset="45%" stop-color="#fce1b2"/><stop offset="78%" stop-color="#f0c993"/><stop offset="100%" stop-color="#e3b073"/></radialGradient><linearGradient id="tp-sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="45%" stop-color="#fff6e0" stop-opacity="0.35"/><stop offset="60%" stop-color="#fff" stop-opacity="0"/></linearGradient><filter id="tp-crumple" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.018 0.024" numOctaves="4" seed="5" result="n"/><feDiffuseLighting in="n" surfaceScale="2.2" lighting-color="#ffffff"><feDistantLight azimuth="225" elevation="62"/></feDiffuseLighting><feColorMatrix type="matrix" values="1 0 0 0 0  0 0.92 0 0 0  0 0 0.8 0 0  0 0 0 1 0"/></filter><filter id="tp-wrinkle" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" seed="13" result="n"/><feDiffuseLighting in="n" surfaceScale="1.2" lighting-color="#ffffff"><feDistantLight azimuth="225" elevation="70"/></feDiffuseLighting></filter><filter id="tp-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.36  0 0 0 0 0.15  0 0 0 0.5 0"/></filter><filter id="tp-blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="11"/><feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.52  0 0 0 0 0.24  1.6 0 0 0 -0.7"/></filter><filter id="tp-patchy" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.2 0 0 0 -0.6"/></filter><mask id="tp-patchMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" filter="url(#tp-patchy)"/></mask><filter id="tp-fray" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="2" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="tp-edgeGlow"><feGaussianBlur stdDeviation="10"/></filter><filter id="tp-rim"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="tp-soft"><feGaussianBlur stdDeviation="12"/></filter></defs><g filter="url(#tp-fray)"><g clip-path="url(#tp-tear)"><rect width="${W}" height="${H}" fill="url(#tp-base)"/><rect width="${W}" height="${H}" filter="url(#tp-blotch)" opacity="0.35"/>${stains}<rect width="${W}" height="${H}" filter="url(#tp-crumple)" opacity="0.18" style="mix-blend-mode:multiply"/><rect width="${W}" height="${H}" filter="url(#tp-wrinkle)" opacity="0.07" style="mix-blend-mode:multiply"/>${creases}<rect width="${W}" height="${H}" fill="url(#tp-sheen)"/><rect width="${W}" height="${H}" filter="url(#tp-grain)" opacity="0.28"/><path d="${d}" fill="none" stroke="#d6a466" stroke-width="50" opacity="0.4" filter="url(#tp-edgeGlow)"/><path d="${d}" fill="none" stroke="#d29a55" stroke-width="80" opacity="0.38" filter="url(#tp-edgeGlow)" mask="url(#tp-patchMask)"/><path d="${d}" fill="none" stroke="#c0843c" stroke-width="26" opacity="0.4" filter="url(#tp-rim)" mask="url(#tp-patchMask)"/><path d="${d}" fill="none" stroke="#b3773a" stroke-width="5" opacity="0.55" filter="url(#tp-rim)"/><path d="${d}" fill="none" stroke="#9a6128" stroke-width="1.4" opacity="0.35"/><path d="${d}" fill="none" stroke="#fff1d6" stroke-width="2.6" opacity="0.55" stroke-dasharray="14 6 30 4 8 10" mask="url(#tp-patchMask)"/></g></g></svg>`
}
const TORN_PAPER_SVG = generateTornPaperSVG()
const INIT_FORM = { name:'', mobile:'', people:'', pkg:'' }

export default function DivyaDhamYatra() {
  const [navOpen, setNavOpen] = useState(false)
  const [form, setForm]       = useState(INIT_FORM)
  const [sent, setSent]       = useState(false)
  const handleChange = e => setForm(prev=>({...prev,[e.target.name]:e.target.value}))
  function handleEnquire(e) {
    e.preventDefault()
    const lines=[`Namaste! I'd like to enquire about the Divya Dham Yatra (5D/4N).`,``,`Name: ${form.name}`,`Mobile: ${form.mobile}`,`No. of Travellers: ${form.people}`,form.pkg?`Package Preference: ${form.pkg}`:''].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`,'_blank','noopener')
    setSent(true); setTimeout(()=>setSent(false),4000)
  }
  const waEnquire=`${WA_BASE}?text=${encodeURIComponent('Namaste! I am interested in the Divya Dham Yatra (5D/4N). Please share details.')}`
  const waStd=`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Standard Package (₹12,000/person) for the Divya Dham Yatra.')}`
  const waPre=`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Premium Package (₹17,999/person) for the Divya Dham Yatra.')}`

  return (
    <div style={{ background:'#F5E8AE', backgroundImage:GRAIN, minHeight:'100vh', color:'#2B1A0E', fontFamily:"'Mukta',system-ui,sans-serif" }}>
      <div className="topbar" style={{ background:'#6B2509' }}><div className="wrap"><span className="hi">हर हर महादेव · जय श्री राम · बुद्धं शरणं गच्छामि</span><span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span></div></div>
      <header className="nav" style={{ background:'rgba(245,232,174,.97)', borderBottom:'1px solid rgba(196,146,37,.3)' }}>
        <div className="wrap nav-inner" style={{ padding:'6px 0' }}>
          <a href="/" className="logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height:'64px', width:'auto', display:'block' }} /></a>
          <nav className={`nav-links${navOpen?' open':''}`}>
            <a href="/#services" onClick={()=>setNavOpen(false)}>Services</a><a href="/packages" onClick={()=>setNavOpen(false)}>Packages</a><a href="/#about" onClick={()=>setNavOpen(false)}>About</a><a href="/#ghats" onClick={()=>setNavOpen(false)}>Ghats</a><a href="/#stories" onClick={()=>setNavOpen(false)}>Stories</a>
          </nav>
          <a href="/#book" className="btn" style={{ background:'#B5421A' }}>Plan my yatra</a>
          <button className="menu-btn" aria-label="Menu" onClick={()=>setNavOpen(v=>!v)}>☰</button>
        </div>
      </header>
      <div className="toran" aria-hidden="true">{Array.from({length:TORAN_COUNT},(_,i)=><i key={i} />)}</div>

      <main>
        <style>{`.ka-hero{position:relative;overflow:hidden;background:url('/images/background-theme1.jpg') center/cover no-repeat;width:100%}.ka-hoverlay{position:absolute;inset:0;pointer-events:none;z-index:1;background:linear-gradient(180deg,rgba(18,5,1,.45) 0%,rgba(18,5,1,.18) 35%,rgba(18,5,1,.18) 65%,rgba(18,5,1,.48) 100%)}.ka-hinner{position:relative;z-index:2;padding:clamp(4px,1vw,10px) clamp(16px,5vw,48px) clamp(28px,5vw,52px);max-width:720px;margin:0 auto}.ka-hwabtn{display:flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(135deg,#e8701a,#C4520C);color:#FAF5E0;padding:14px 26px;border-radius:4px;font-weight:700;font-size:1rem;text-decoration:none;box-shadow:0 4px 20px rgba(0,0,0,.5)}.ka-hwabtn:hover{background:linear-gradient(135deg,#C4520C,#7A2E0E)}`}</style>
        <section className="ka-hero">
          <div className="ka-hoverlay" />
          <div className="ka-hinner">
            <nav style={{ fontSize:'.76rem', color:'rgba(255,255,255,0.92)', marginBottom:'16px', display:'flex', gap:'5px', flexWrap:'wrap' }}>
              <a href="/" style={{ color:'#FFFFFF', textDecoration:'underline', textUnderlineOffset:'3px' }}>Home</a><span>›</span><a href="/packages" style={{ color:'#FFFFFF', textDecoration:'underline', textUnderlineOffset:'3px' }}>Packages</a><span>›</span><span>Divya Dham Yatra</span>
            </nav>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'clamp(1.1rem,3vw,1.5rem)', color:'#FF9933', fontWeight:700, letterSpacing:'.08em', textShadow:'0 1px 5px rgba(0,0,0,.45)', marginBottom:'10px' }}>ॐ नमः शिवाय · जय श्री राम · बुद्धं शरणं गच्छामि</div>
              <GoldRule margin="0 0 12px" />
              <h1 style={{ fontFamily:"'Samarkan',serif", fontWeight:400, fontSize:'clamp(2.2rem,7vw,4.5rem)', color:'#FFFFFF', letterSpacing:'0.04em', lineHeight:1, textShadow:'0 2px 28px rgba(0,0,0,.7)', margin:'0 0 6px' }}>Divya Dham Yatra</h1>
              <div style={{ fontFamily:"'Samarkan',serif", fontWeight:400, fontSize:'clamp(1.4rem,4vw,2.4rem)', color:'#F4A81D', letterSpacing:'0.04em', lineHeight:1, textShadow:'0 2px 20px rgba(0,0,0,.65)', marginBottom:'8px' }}>Golden Quadrilateral</div>
              <p style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'clamp(1rem,2.5vw,1.3rem)', fontWeight:700, color:'#D4956A', marginBottom:'18px' }}>हर यात्रा का भरोसेमंद साथी</p>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(10,3,0,.5)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', border:'1px solid rgba(244,168,29,.3)', borderRadius:'40px', padding:'7px 18px', marginBottom:'20px', flexWrap:'wrap', justifyContent:'center' }}>
                {['काशी','प्रयागराज','अयोध्या','बोध गया'].map((c,i)=>(
                  <span key={c} style={{ display:'inline-flex', alignItems:'center', gap:'8px' }}>
                    <span style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'.95rem', color:'#FAF5E0' }}>{c}</span>
                    {i < 3 && <span style={{ color:'#F4A81D', fontSize:'.9rem' }}>›</span>}
                  </span>
                ))}
                <span style={{ color:'rgba(244,200,128,.6)', fontSize:'.9rem', marginLeft:'4px' }}>· 5 Days / 4 Nights</span>
              </div>
              <div><a href={waEnquire} target="_blank" rel="noopener" className="ka-hwabtn" style={{ display:'inline-flex' }}><WaIcon color="#FAF5E0" size={20} /> Enquire on WhatsApp</a></div>
            </div>
          </div>
        </section>

        <div style={{ padding:'0 0 0' }}><div className="wrap"><GoldRule margin="0 0 32px" /><style>{`.ka-route{display:flex;align-items:flex-start;justify-content:center;gap:0;flex-wrap:nowrap}.ka-route-city{display:flex;flex-direction:column;align-items:center;flex:1;min-width:0}.ka-route-line{flex:1;height:2px;background:linear-gradient(90deg,#B5421A,#C49225);margin-top:18px}`}</style><div className="ka-route">{ROUTE.map((rt,i)=>(<><div key={rt.city} className="ka-route-city"><div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'linear-gradient(135deg,#B5421A,#6B2509)', border:'3px solid #C49225', display:'flex', alignItems:'center', justifyContent:'center', color:'#FAF5E0', fontWeight:900, fontSize:'.8rem' }}>{i+1}</div><div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'clamp(.8rem,1.6vw,1rem)', color:'#6B2509', marginTop:'8px', textAlign:'center' }}>{rt.city}</div><div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'.75rem', color:'#B5421A', marginTop:'2px' }}>{rt.hi}</div><div style={{ fontSize:'.68rem', color:'#8B5E1A', fontWeight:600, marginTop:'4px', background:'rgba(196,146,37,.15)', borderRadius:'10px', padding:'2px 7px' }}>{rt.nights}</div><div style={{ fontSize:'.64rem', color:'#A07840', marginTop:'2px' }}>{rt.days}</div></div>{i<ROUTE.length-1&&<div key={`line-${i}`} className="ka-route-line" />}</>))}</div><GoldRule margin="32px 0 0" /></div></div>

        <section style={{ padding:'16px 0' }}><div className="wrap" style={{ maxWidth:'780px', position:'relative', filter:'drop-shadow(0 4px 22px rgba(90,50,10,0.24))' }}><div style={{ position:'absolute', inset:0, zIndex:0 }} dangerouslySetInnerHTML={{ __html:TORN_PAPER_SVG }} /><div style={{ position:'relative', zIndex:1, padding:'clamp(44px,7vw,72px) clamp(60px,12vw,100px) clamp(64px,10vw,88px)' }}><div style={{ textAlign:'center', marginBottom:'32px' }}><h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.9rem,4vw,2.8rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'8px' }}>Plan Your Yatra</h2><p style={{ color:'#5A3F28', fontSize:'.97rem', maxWidth:'38rem', margin:'0 auto' }}>Fill in your details and we will get back to you on WhatsApp.</p><GoldRule margin="18px auto 0" /></div><style>{`.ka-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:28px;row-gap:22px}@media(max-width:580px){.ka-form-grid{grid-template-columns:1fr}}.ka-field label{display:block;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:#7A4A1A;margin-bottom:4px}.ka-field input,.ka-field select{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(139,94,26,0.55);border-radius:0;padding:7px 2px;font-family:Georgia,serif;font-size:1rem;color:#2B1A0E;outline:none;box-sizing:border-box}.ka-field input:focus,.ka-field select:focus{border-bottom-color:#B5421A}.ka-field input::placeholder{color:rgba(139,94,26,0.45);font-style:italic}.ka-field select{appearance:none;cursor:pointer}.ka-field-full{grid-column:1/-1}.ka-submit-btn{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px 20px;background:linear-gradient(135deg,#8B3A10,#5A2008);color:#FAF5E0;border:none;border-radius:2px;font-family:'Tiro Devanagari Hindi',Georgia,serif;font-weight:700;font-size:1rem;cursor:pointer;letter-spacing:.08em;box-shadow:0 3px 14px rgba(139,58,16,.35);transition:opacity .18s}.ka-submit-btn:hover{opacity:.88}.ka-submit-btn:disabled{opacity:.55;cursor:not-allowed}`}</style><form onSubmit={handleEnquire} style={{ background:'transparent', border:'none', padding:0 }}><div className="ka-form-grid"><div className="ka-field"><label htmlFor="dd-name">Full Name *</label><input id="dd-name" name="name" type="text" required placeholder="e.g. Ramesh Sharma" value={form.name} onChange={handleChange} /></div><div className="ka-field"><label htmlFor="dd-mobile">Mobile Number *</label><input id="dd-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} /></div><div className="ka-field"><label htmlFor="dd-people">No. of Travellers *</label><select id="dd-people" name="people" required value={form.people} onChange={handleChange}><option value="">Select travellers</option>{['2','3','4','5','6','7','8','9','10','10+'].map(n=><option key={n} value={n}>{n} people</option>)}</select></div><div className="ka-field"><label htmlFor="dd-pkg">Package Preference</label><select id="dd-pkg" name="pkg" value={form.pkg} onChange={handleChange}><option value="">Not decided yet</option><option value="Standard (₹12,000/person · Min 4 Pax)">Standard — ₹12,000/person (Min 4 Pax)</option><option value="Premium (₹17,999/person · Min 2 Pax)">Premium — ₹17,999/person (Min 2 Pax)</option></select></div><div className="ka-field-full"><button type="submit" className="ka-submit-btn" disabled={sent}><WaIcon size={20} color="#FAF5E0" />{sent?'Opening WhatsApp...':'Submit'}</button></div></div></form></div></div></section>

        <section style={{ paddingBottom:'14px' }}><div className="wrap" style={{ textAlign:'center' }}><div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>Step-by-step journey</div><h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2.1rem,4.5vw,3.2rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'10px' }}>Day-by-Day Itinerary</h2><p style={{ color:'#5A3F28', maxWidth:'46rem', margin:'0 auto', fontSize:'1rem' }}>Varanasi · Prayagraj · Ayodhya · Bodh Gaya — 4 nights, 5 days of the Golden Quadrilateral yatra.</p><GoldRule margin="18px auto 0" /></div></section>
        <section style={{ padding:'14px 0 0' }}><div className="wrap" style={{ display:'flex', flexDirection:'column', gap:'26px' }}>{DAYS.map(d=><DayCard key={d.day} d={d} />)}</div></section>
        <div style={{ overflow:'hidden', padding:'52px 0 0' }}><TempleSkyline fill="#C49225" opacity={0.42} /></div>

        <section style={{ padding:'70px 0 80px' }}><div className="wrap"><div style={{ textAlign:'center', marginBottom:'40px' }}><div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>हमारी सेवाएं</div><h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'8px' }}>Services We Provide</h2><p style={{ color:'#5A3F28', fontSize:'1rem', maxWidth:'44rem', margin:'0 auto' }}>All four sacred destinations — every detail arranged by Yatra Ke Saathi.</p><GoldRule margin="18px auto 0" /></div><style>{`.ka-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}@media(min-width:860px){.ka-svc-grid{grid-template-columns:repeat(6,1fr);gap:12px}}`}</style><div className="ka-svc-grid">{SERVICES.map(svc=><ServiceCard key={svc.en} svc={svc} />)}</div></div></section>

        <section style={{ padding:'0 0 70px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}><div className="wrap"><div style={{ textAlign:'center', marginBottom:'40px' }}><div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>क्या-क्या शामिल है</div><h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'8px' }}>Activities Covered</h2><GoldRule margin="18px auto 0" /></div><div className="ka-svc-grid">{ACTIVITIES.map(act=><ServiceCard key={act.en} svc={act} />)}</div></div></section>

        <section style={{ padding:'70px 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}><div className="wrap"><div style={{ textAlign:'center', marginBottom:'40px' }}><div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>यात्रियों की यादें</div><h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'8px' }}>Glimpses of Past Yatras</h2><GoldRule margin="18px auto 0" /></div><style>{`.ka-diary-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}@media(min-width:720px){.ka-diary-grid{grid-template-columns:repeat(3,1fr)}}.ka-diary-img{overflow:hidden}.ka-diary-img img{transition:transform .6s ease;display:block;width:100%;height:100%;object-fit:cover}.ka-diary-card:hover .ka-diary-img img{transform:scale(1.07)}.ka-diary-card:hover{box-shadow:0 12px 40px rgba(0,0,0,.55),0 0 0 2px #C49225 !important}`}</style><div className="ka-diary-grid">{TRIP_DIARIES.map(t=>(<div key={t.name} className="ka-diary-card" style={{ borderRadius:'5px', overflow:'hidden', border:'1.5px solid rgba(196,146,37,.35)', boxShadow:'0 8px 28px rgba(0,0,0,.35)' }}><div className="ka-diary-img" style={{ aspectRatio:'4/3', background:'#E8D8A0' }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={U(t.photo,600)} alt={t.name} loading="lazy" /></div><div style={{ background:'#FAF0CC', backgroundImage:GRAIN, padding:'10px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(196,146,37,.35)' }}><div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'.92rem', color:'#6B2509' }}>{t.name}</div><div style={{ display:'flex', gap:'1px' }}>{Array.from({length:t.stars}).map((_,i)=><span key={i} style={{ color:'#C49225', fontSize:'.82rem' }}>★</span>)}</div></div></div>))}</div></div></section>

        <section style={{ padding:'70px 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}><div className="wrap"><div style={{ textAlign:'center', marginBottom:'42px' }}><div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>Choose your plan</div><h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'8px' }}>Packages &amp; Pricing</h2><p style={{ color:'#5A3F28', fontSize:'1rem' }}>Standard: Min 4 pax. Premium: Min 2 pax.</p></div><div style={{ background:'#FAF0CC', backgroundImage:GRAIN, border:'1.5px dashed #C49225', borderRadius:'4px', padding:'15px 22px', display:'flex', gap:'12px', alignItems:'flex-start', fontSize:'.93rem', marginBottom:'34px' }}><span style={{ fontSize:'1.2rem', flexShrink:0 }}>💡</span><span><strong>Payment Terms:</strong> 50% advance at booking. Remaining 50% on Day 1 after hotel check-in.</span></div><div style={{ display:'flex', gap:'24px', flexWrap:'wrap', alignItems:'flex-start' }}><PkgCard data={STD} waLink={waStd} /><PkgCard data={PRE} waLink={waPre} /></div></div></section>

        <section style={{ padding:'70px 0 80px' }}><div className="wrap"><div style={{ textAlign:'center', marginBottom:'40px' }}><div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>सामान्य प्रश्न</div><h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'8px' }}>Frequently Asked Questions</h2><GoldRule margin="18px auto 0" /></div><div style={{ display:'flex', flexDirection:'column', gap:'12px', maxWidth:'820px', margin:'0 auto' }}>{FAQS.map((faq,i)=><FaqItem key={i} faq={faq} defaultOpen={i===0} />)}</div></div></section>

        <section style={{ padding:'60px 0 80px' }}><div className="wrap" style={{ textAlign:'center' }}><div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'8px' }}>हर यात्रा का भरोसेमंद साथी</div><h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'4px' }}>Yatra Ke Saathi</h2><p style={{ color:'#8B5E1A', fontSize:'.95rem', marginBottom:'24px' }}>Tour &amp; Travel · Varanasi</p><GoldRule margin="0 auto 28px" /><div style={{ display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center', marginBottom:'32px', color:'#3A2510', fontSize:'.95rem' }}><span>📍 Durgakund, Varanasi</span><span style={{ color:'#C49225' }}>·</span><a href="tel:+919277472279" style={{ color:'#B5421A', fontWeight:700, textDecoration:'none' }}>📞 +91 92774 72279</a></div><a href={waEnquire} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#B5421A', color:'#FAF5E0', padding:'14px 32px', borderRadius:'4px', fontWeight:700, fontSize:'1rem', textDecoration:'none' }}><WaIcon size={20} color="#FAF5E0" /> Plan Your Yatra Now</a></div></section>
      </main>

      <footer>
        <div className="big-hi" aria-hidden="true">दिव्य धाम</div>
        <div className="wrap"><div className="foot"><div><a href="/" className="logo" style={{ marginBottom:'14px' }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height:'60px', width:'auto', display:'block' }} /></a><p style={{ fontSize:'.93rem', maxWidth:'22rem', color:'#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p></div><div><h4>Services</h4><ul><li><a href="/#book">Tour packages</a></li><li><a href="/#book">Cab booking</a></li><li><a href="/#book">Boat rides</a></li><li><a href="/#book">Hotels</a></li></ul></div><div><h4>Popular Packages</h4><ul><li><a href="/tour-packages/kashi-ayodhya">Kashi–Ayodhya (3D)</a></li><li><a href="/tour-packages/kashi-prayagraj-ayodhya">Kashi–Prayagraj–Ayodhya (4D)</a></li><li><a href="/tour-packages/divya-dham-yatra">Divya Dham Yatra (5D)</a></li><li><a href="/tour-packages/golden-triangle-varanasi-ayodhya-prayagraj">Golden Triangle (4D)</a></li></ul></div><div><h4>Contact</h4><ul><li>Varanasi, Uttar Pradesh</li><li><a href="tel:+919277472279">+91 92774 72279</a></li><li><a href="mailto:info@yatraksathi.com">info@yatraksathi.com</a></li></ul></div></div></div>
      </footer>
    </div>
  )
}
