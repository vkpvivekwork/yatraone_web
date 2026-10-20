'use client'
import { useState } from 'react'

const WA_NUMBER = '919277472279'
const WA_BASE    = `https://wa.me/${WA_NUMBER}`
const TORAN_COUNT = 60

const U = (id, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

/* ── Grain / noise texture for aged-paper feel ─────────── */
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/* ── Data ──────────────────────────────────────────────── */
const DAYS = [
  {
    day: 1, city: 'Ayodhya', title: 'Arrival in Ayodhya — Deepotsav & Temple Darshan',
    activities: [
      'Arrival in Ayodhya (morning or afternoon) — hotel / homestay check-in',
      'Shri Ram Janmabhoomi darshan',
      'Hanumangarhi visit',
      'Kanak Bhawan darshan',
      'Ramkatha Museum exploration',
      'Evening: Deepotsav celebrations at Ramkatha Park',
      'Witness millions of diyas glowing at Guptar Ghat — Green Deepotsav',
      'Drone show, green fireworks & cultural performances',
      'Taste local cuisine & explore handicraft markets at night',
      'Overnight stay in Ayodhya',
    ],
    photos: [
      { id: '1599831069477-b2acdc0bcb91', alt: 'Saryu Aarti — Ayodhya' },
      { id: '1613445607898-f46e51645acf', alt: 'Ram Mandir darshan' },
      { id: '1634920540678-df0e179c5243', alt: 'Kanak Bhawan — Ayodhya' },
    ],
  },
  {
    day: 2, city: 'Varanasi', title: 'Arrival in Varanasi — Sarnath, Dolphins & Ganga',
    activities: [
      'Morning drive from Ayodhya to Varanasi (~3 hrs)',
      'Hotel / homestay check-in',
      'Visit Sarnath — where Lord Buddha gave his first sermon',
      'Explore the Gharial & Turtle Breeding Centre at Sarnath',
      'Dolphin sighting on the Ganges at Saidpur, Ghazipur',
      'Visit the Namami Gange Museum (Ganga-themed immersive experience)',
      'Overnight stay in Varanasi',
    ],
    photos: [
      { id: '1649876674933-a5b3b39b4da1', alt: 'Sarnath — Dhamek Stupa' },
      { id: '1571536802807-30451e3955d8', alt: 'River Ganga at dawn' },
      { id: '1608412525537-662195e817c5', alt: 'Varanasi ghats' },
    ],
  },
  {
    day: 3, city: 'Varanasi', title: 'Exploring Varanasi & Departure',
    activities: [
      'Early morning Ganga Aarti at the ghats',
      'Yoga and meditation session by the Ganges',
      'Kashi Vishwanath Temple darshan',
      'Kal Bhairav Temple darshan',
      'Afternoon: Ramnagar Fort & the Ganga River Trail',
      'Meet Banarasi weavers — experience traditional handloom artistry',
      'Depart for onward destination in the evening',
    ],
    photos: [
      { id: '1627894483216-2138af692e32', alt: 'Ganga Aarti ceremony' },
      { id: '1665413791167-6718dcf36773', alt: 'Kashi Vishwanath Temple' },
      { id: '1561359313-0639aad49ca6', alt: 'Varanasi ghats' },
    ],
  },
]

const TRIP_DIARIES = [
  { name: 'Rajesh Sharma',  city: 'Delhi',     stars: 5, photo: '1627894483216-2138af692e32', caption: 'Ganga Aarti · Varanasi' },
  { name: 'Priya Verma',    city: 'Mumbai',    stars: 5, photo: '1613445607898-f46e51645acf', caption: 'Ram Mandir · Ayodhya' },
  { name: 'Sunita Devi',    city: 'Patna',     stars: 5, photo: '1561359313-0639aad49ca6',    caption: 'Ghats · Varanasi' },
  { name: 'Manoj Tiwari',   city: 'Bhopal',    stars: 5, photo: '1599831069477-b2acdc0bcb91', caption: 'Saryu Aarti · Ayodhya' },
  { name: 'Kavita Singh',   city: 'Jaipur',    stars: 5, photo: '1571536802807-30451e3955d8', caption: 'Boat Ride · Ganga' },
  { name: 'Amit Gupta',     city: 'Lucknow',   stars: 5, photo: '1665413791167-6718dcf36773', caption: 'Temple Darshan · Kashi' },
]

const ROUTE = [
  { city: 'Ayodhya',  hi: 'अयोध्या', nights: '1 Night',  days: 'Day 1' },
  { city: 'Varanasi', hi: 'काशी',    nights: '1 Night',  days: 'Day 2–3' },
]

const SERVICES = [
  { hi: 'कैब',              en: 'AC Cab',          photo: '1449965408869-eaa3f722e40d' },
  { hi: 'नौका विहार',       en: 'Boat Ride',        photo: '1571536802807-30451e3955d8' },
  { hi: 'मंदिर दर्शन',      en: 'Temple Darshan',   photo: '1665413791167-6718dcf36773' },
  { hi: 'होटल बुकिंग',      en: 'Hotel Booking',    photo: '1631049307264-da0ec9d70304' },
  { hi: 'दर्शनीय स्थल',     en: 'Sightseeing',      photo: '1561359313-0639aad49ca6' },
  { hi: 'पिकअप और ड्रॉप',   en: 'Pickup & Drop',    photo: '1449965408869-eaa3f722e40d' },
  { hi: 'गंगा आरती',        en: 'Ganga Aarti',      photo: '1627894483216-2138af692e32' },
  { hi: 'सारनाथ भ्रमण',     en: 'Sarnath Visit',    photo: '1649876674933-a5b3b39b4da1' },
]

const ACTIVITIES = [
  { en: 'Ram Janmabhoomi Darshan',        photo: '1613445607898-f46e51645acf' },
  { en: 'Hanumangarhi & Kanak Bhawan',   photo: '1634920540678-df0e179c5243' },
  { en: 'Deepotsav — Guptar Ghat',       photo: '1599831069477-b2acdc0bcb91' },
  { en: "Sarnath — Buddha's First Sermon", photo: '1649876674933-a5b3b39b4da1' },
  { en: 'Dolphin Sighting on Ganga',     photo: '1571536802807-30451e3955d8' },
  { en: 'Namami Gange Museum',           photo: '1596097825168-c9b773f404ff' },
  { en: 'Ganga Aarti at the Ghats',      photo: '1627894483216-2138af692e32' },
  { en: 'Kashi Vishwanath Temple',       photo: '1665413791167-6718dcf36773' },
  { en: 'Ramnagar Fort & Ganga Trail',   photo: '1561359313-0639aad49ca6' },
  { en: 'Banarasi Handloom Artistry',    photo: '1513475382585-d06e58bcb0e0' },
]

const FAQS = [
  {
    q: 'What is the duration of this tour package?',
    a: 'This is a 2-Night / 3-Day tour. Day 1 is in Ayodhya (Deepotsav, Ram Mandir & temples). Day 2 covers the drive to Varanasi + Sarnath & Ganga experiences. Day 3 is a full Varanasi exploration with Ganga Aarti, Kashi Vishwanath & Ramnagar Fort before evening departure.',
  },
  {
    q: 'Is there a minimum group size requirement?',
    a: 'A minimum of 2 persons is required for booking. For solo travellers, please contact us on WhatsApp — we will try our best to accommodate you.',
  },
  {
    q: 'Are meals included in the package?',
    a: 'Daily breakfast is included in both Standard and Premium packages. Lunch and dinner are not included.',
  },
  {
    q: 'What is not covered in the package price?',
    a: 'Train / flight tickets to and from Varanasi are not included. Entry fees at monuments, personal expenses, and 5% GST are also excluded.',
  },
  {
    q: 'How do I confirm my booking?',
    a: '50% advance payment is required at the time of booking. The remaining 50% is to be paid on the first day of the tour after hotel check-in.',
  },
  {
    q: 'Is transport to Ayodhya included?',
    a: 'Yes — a private AC car from Varanasi to Ayodhya and back is included in both packages.',
  },
  {
    q: 'Is a boat ride on the Ganga included?',
    a: 'Yes. A morning boat ride on the Ganga to see all the ghats is included in the Standard package. The Premium package additionally includes an evening Ganga Aarti boat ride.',
  },
  {
    q: 'Can I customise the itinerary?',
    a: 'Absolutely. Reach out to us on WhatsApp with your requirements — we can adjust stays, add extra darshans, or extend the trip to suit your preferences.',
  },
]

const STD = {
  label: 'Standard', price: '₹8,999', note: 'per person · Min 2 Pax',
  inclusions: [
    'Accommodation (2 Nights · 3 Star)',
    'AC Vehicle — Varanasi to Ayodhya & back',
    'Daily Breakfast',
    'Morning Boat Ride — River Ganga',
    'Kashi Vishwanath Darshan assistance',
    'Ram Mandir Darshan assistance',
    'All sightseeing per itinerary',
    'Driver & Fuel charges',
  ],
  exclusions: [
    'Train / Flight tickets to Varanasi',
    'Lunch & Dinner',
    'Entry fees at monuments',
    'Pickup & Drop from station/airport',
    'Personal expenses',
    '5% GST',
  ],
}

const PRE = {
  label: 'Premium', price: '₹12,999', note: 'per person · Min 2 Pax',
  inclusions: [
    'Accommodation (2 Nights · 3 Star)',
    'AC Vehicle — Varanasi to Ayodhya & back',
    'Daily Breakfast',
    'Morning & Evening Boat Ride — River Ganga',
    'Kashi Vishwanath VIP Darshan passes',
    'Ram Mandir VIP Darshan passes',
    'Pickup & Drop from Railway Station / Airport',
    'All sightseeing per itinerary',
    'Driver & Fuel charges',
  ],
  exclusions: [
    'Train / Flight tickets to Varanasi',
    'Lunch & Dinner',
    'Personal expenses',
    '5% GST',
  ],
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */

function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="ka-mark" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" fill="#B5421A" />
          <path d="M24 9c5 6 5 12 0 17-5-5-5-11 0-17z" fill="#FAF5E0" />
          <path d="M11 30h26c-2 6-7 9-13 9s-11-3-13-9z" fill="#FAF5E0" />
          <path d="M16 34h16" stroke="#B5421A" strokeWidth="1.6" />
        </symbol>
      </defs>
    </svg>
  )
}

function WaIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 32 32" fill={color} style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
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
        <rect x="30" y="120" width="50" height="28" />
        <polygon points="55,82 30,120 80,120" />
        <polygon points="55,62 43,82 67,82" />
        <rect x="52" y="50" width="6" height="13" />
        <circle cx="55" cy="47" r="5" />
        <rect x="108" y="132" width="28" height="17" />
        <polygon points="122,114 108,132 136,132" />
        <rect x="120" y="107" width="4" height="8" />
        <circle cx="122" cy="104" r="3.5" />
        <rect x="165" y="110" width="62" height="38" />
        <polygon points="196,68 165,110 227,110" />
        <polygon points="196,48 180,68 212,68" />
        <polygon points="196,32 186,48 206,48" />
        <rect x="193" y="20" width="6" height="13" />
        <circle cx="196" cy="17" r="5.5" />
        <rect x="158" y="142" width="76" height="6" />
        <rect x="262" y="128" width="44" height="20" />
        <ellipse cx="284" cy="128" rx="22" ry="13" />
        <rect x="282" y="114" width="4" height="15" />
        <circle cx="284" cy="111" r="4" />
        <rect x="330" y="116" width="18" height="32" />
        <rect x="390" y="116" width="18" height="32" />
        <rect x="330" y="101" width="78" height="17" />
        <polygon points="369,71 330,101 408,101" />
        <rect x="366" y="58" width="6" height="14" />
        <circle cx="369" cy="55" r="5" />
        <rect x="438" y="130" width="36" height="18" />
        <polygon points="456,108 438,130 474,130" />
        <polygon points="456,92 445,108 467,108" />
        <rect x="454" y="84" width="4" height="9" />
        <circle cx="456" cy="81" r="3.5" />
        <rect x="502" y="98" width="82" height="50" />
        <polygon points="543,50 502,98 584,98" />
        <polygon points="543,28 525,50 561,50" />
        <polygon points="543,12 534,28 552,28" />
        <rect x="540" y="0" width="6" height="13" />
        <circle cx="543" cy="-2" r="6" />
        <rect x="498" y="112" width="16" height="36" />
        <polygon points="506,98 498,112 514,112" />
        <rect x="568" y="112" width="16" height="36" />
        <polygon points="576,98 568,112 584,112" />
        <rect x="492" y="142" width="102" height="6" />
        <rect x="618" y="126" width="36" height="22" />
        <ellipse cx="636" cy="126" rx="18" ry="11" />
        <rect x="634" y="114" width="4" height="13" />
        <circle cx="636" cy="111" r="3.5" />
        <rect x="668" y="130" width="28" height="18" />
        <ellipse cx="682" cy="130" rx="14" ry="9" />
        <rect x="680" y="120" width="4" height="11" />
        <circle cx="682" cy="117" r="3" />
        <rect x="728" y="114" width="56" height="34" />
        <polygon points="756,74 728,114 784,114" />
        <polygon points="756,56 742,74 770,74" />
        <rect x="754" y="44" width="5" height="13" />
        <circle cx="756" cy="41" r="4.5" />
        <rect x="724" y="128" width="12" height="20" />
        <rect x="786" y="128" width="12" height="20" />
        <rect x="830" y="132" width="30" height="16" />
        <polygon points="845,114 830,132 860,132" />
        <rect x="843" y="94" width="4" height="21" />
        <polygon points="847,94 847,106 857,100" />
        <circle cx="845" cy="91" r="3" />
        <rect x="882" y="120" width="16" height="28" />
        <rect x="936" y="120" width="16" height="28" />
        <rect x="882" y="107" width="70" height="15" />
        <polygon points="917,80 882,107 952,107" />
        <rect x="914" y="67" width="6" height="14" />
        <circle cx="917" cy="64" r="5" />
        <rect x="980" y="128" width="34" height="20" />
        <ellipse cx="997" cy="128" rx="17" ry="10" />
        <rect x="995" y="117" width="4" height="12" />
        <circle cx="997" cy="114" r="3.5" />
        <rect x="1044" y="116" width="54" height="32" />
        <polygon points="1071,76 1044,116 1098,116" />
        <polygon points="1071,58 1057,76 1085,76" />
        <rect x="1068" y="46" width="6" height="13" />
        <circle cx="1071" cy="43" r="5" />
        <rect x="1122" y="130" width="34" height="18" />
        <polygon points="1139,110 1122,130 1156,130" />
        <rect x="1137" y="102" width="4" height="9" />
        <circle cx="1139" cy="99" r="3.5" />
      </g>
    </svg>
  )
}

function VintagePhoto({ id, alt }) {
  return (
    <div style={{
      background: '#FAF5E0',
      padding: '5px 5px 20px',
      boxShadow: '0 6px 20px rgba(43,26,14,.3), inset 0 0 0 1px rgba(196,146,37,.35)',
      borderRadius: '2px',
      position: 'relative',
    }}>
      <div style={{ overflow: 'hidden', aspectRatio: '1', background: '#E8D8A0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={U(id, 380)} alt={alt} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{
        position: 'absolute', bottom: '3px', left: '5px', right: '5px',
        textAlign: 'center', fontSize: '.65rem', color: '#8B5E1A',
        fontFamily: "'Kalam', cursive", overflow: 'hidden',
        whiteSpace: 'nowrap', textOverflow: 'ellipsis',
      }}>{alt}</div>
    </div>
  )
}

function DayCard({ d }) {
  return (
    <div style={{
      borderRadius: '5px',
      overflow: 'hidden',
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
          <span style={{
            fontFamily: "'Mukta',sans-serif", fontWeight: 700,
            fontSize: '.66rem', letterSpacing: '.24em', textTransform: 'uppercase',
            color: '#8B5E1A', marginBottom: '2px',
          }}>DAY</span>
          <span style={{
            fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
            fontSize: 'clamp(3rem,7vw,4.8rem)',
            color: '#5A3F28', lineHeight: 1, letterSpacing: '-3px',
          }}>{d.day}</span>
        </div>

        <div style={{ padding: '20px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            fontFamily: "'Mukta',sans-serif", fontWeight: 700,
            fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase',
            color: '#B5421A', marginBottom: '5px',
          }}>{d.city}</div>
          <div style={{
            fontFamily: "'Fraunces',Georgia,serif", fontWeight: 600,
            fontSize: 'clamp(.95rem,2.4vw,1.25rem)', color: '#5A3F28', lineHeight: 1.25,
          }}>{d.title}</div>
        </div>

        <div style={{
          position: 'absolute', top: '9px', right: '14px',
          fontSize: '1.2rem', opacity: .3, color: '#8B5E1A',
          fontFamily: "'Tiro Devanagari Hindi',serif",
        }}>ॐ</div>
      </div>

      <div style={{
        background: '#FAF0CC',
        backgroundImage: GRAIN,
        padding: '24px 28px 30px',
      }}>
        <GoldRule margin="0 0 16px" />
        <ul style={{ listStyle: 'none', marginBottom: '26px' }}>
          {d.activities.map((act, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '10px',
              padding: '4px 0', fontFamily: "'Mukta',sans-serif",
              fontSize: 'clamp(.92rem,1.8vw,1.04rem)', fontWeight: 600,
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

function ServiceCard({ svc }) {
  return (
    <div style={{
      background: '#FAF5E0',
      padding: '4px 4px 22px',
      boxShadow: '0 6px 20px rgba(43,26,14,.3), inset 0 0 0 1px rgba(196,146,37,.35)',
      borderRadius: '2px',
      position: 'relative',
    }}>
      <div style={{ overflow: 'hidden', aspectRatio: '1', background: '#E8D8A0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={U(svc.photo, 400)}
          alt={svc.en}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{
        position: 'absolute', bottom: '4px', left: '6px', right: '6px',
        textAlign: 'center', fontSize: '.7rem', color: '#8B5E1A',
        fontFamily: "'Kalam', cursive", overflow: 'hidden',
        whiteSpace: 'nowrap', textOverflow: 'ellipsis',
      }}>{svc.en}</div>
    </div>
  )
}

function FaqItem({ faq, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      background: '#FAF0CC',
      backgroundImage: GRAIN,
      border: '1.5px solid rgba(196,146,37,.4)',
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 3px 12px rgba(43,26,14,.1)',
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
          padding: '16px 20px', cursor: 'pointer', border: 'none', background: 'transparent',
          fontFamily: "'Mukta',sans-serif", fontWeight: 700,
          fontSize: 'clamp(.95rem,1.8vw,1.05rem)', color: '#2B1A0E', lineHeight: 1.4,
        }}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <span style={{
          flexShrink: 0, width: '22px', height: '22px',
          borderRadius: '50%', background: open ? '#B5421A' : '#C49225',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#FAF5E0', fontSize: '.8rem', fontWeight: 900,
          transition: 'background .2s',
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{
          padding: '0 20px 18px', fontFamily: "'Mukta',sans-serif",
          fontSize: '.97rem', color: '#4A2E12', lineHeight: 1.65,
          borderTop: '1px solid rgba(196,146,37,.3)',
          paddingTop: '14px',
        }}>
          {faq.a}
        </div>
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
      boxShadow: isPremium
        ? '0 10px 36px rgba(181,66,26,.22)' : '0 6px 24px rgba(43,26,14,.14)',
    }}>
      <div style={{
        position: 'absolute', top: '-14px', left: '24px',
        background: isPremium ? '#B5421A' : '#7A5018',
        color: '#FAF5E0', borderRadius: '3px',
        padding: '3px 16px', fontSize: '.76rem',
        fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
        boxShadow: '0 2px 8px rgba(0,0,0,.25)',
      }}>{isPremium ? 'BEST VALUE' : 'STANDARD'}</div>

      <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '1.3rem', color: '#2B1A0E', marginBottom: '4px' }}>
        {data.label} Package
      </div>
      <GoldRule margin="10px 0 12px" />
      <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: '2.4rem', fontWeight: 900, color: '#B5421A', lineHeight: 1, marginBottom: '4px' }}>
        {data.price}/-
      </div>
      <div style={{ fontSize: '.85rem', color: '#8B5E1A', marginBottom: '22px' }}>{data.note}</div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontWeight: 700, color: '#3A6B2E', fontSize: '.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>✔</span> What&apos;s Included
        </div>
        {data.inclusions.map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '5px 0', borderBottom: '1px dashed rgba(58,107,46,.2)', fontSize: '.9rem' }}>
            <span style={{ color: '#3A6B2E', flexShrink: 0, marginTop: '2px' }}>✔</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontWeight: 700, color: '#8B2020', fontSize: '.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>✖</span> Not Included
        </div>
        {data.exclusions.map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '5px 0', borderBottom: '1px dashed rgba(139,32,32,.18)', fontSize: '.9rem' }}>
            <span style={{ color: '#8B2020', flexShrink: 0, marginTop: '2px' }}>✖</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <a href={waLink} target="_blank" rel="noopener" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        background: isPremium
          ? 'linear-gradient(135deg,#B5421A,#7A2E0E)'
          : 'linear-gradient(135deg,#7A5018,#4A3010)',
        color: '#FAF5E0', borderRadius: '4px', padding: '13px 20px',
        fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
        boxShadow: '0 4px 14px rgba(0,0,0,.25)', letterSpacing: '.02em',
      }}>
        <WaIcon color="#FAF5E0" /> Book {data.label} on WhatsApp
      </a>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
const INIT_FORM = { name: '', mobile: '', people: '', date: '', from: '', pkg: '', notes: '' }

/* ── Vintage torn-paper SVG background for the form ────────── */
function generateTornPaperSVG() {
  const W = 600, H = 804
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

export default function KashiAyodhya() {
  const [navOpen, setNavOpen] = useState(false)
  const [form, setForm]       = useState(INIT_FORM)
  const [sent, setSent]       = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleEnquire(e) {
    e.preventDefault()
    const lines = [
      `Namaste! I'd like to enquire about the Kashi–Ayodhya 2N/3D Divine Tour.`,
      ``,
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `No. of Travellers: ${form.people}`,
      form.date   ? `Travel Date: ${form.date}`           : '',
      form.from   ? `Departing From: ${form.from}`         : '',
      form.pkg    ? `Package Preference: ${form.pkg}`      : '',
      form.notes  ? `Notes: ${form.notes}`                 : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }
  const waEnquire = `${WA_BASE}?text=${encodeURIComponent('Namaste! I am interested in the Kashi–Ayodhya 2N/3D Divine Tour package. Please share details.')}`
  const waStd     = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Standard Package (₹8,999/person) for Kashi–Ayodhya 2N/3D Divine Tour.')}`
  const waPre     = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Premium Package (₹12,999/person) for Kashi–Ayodhya 2N/3D Divine Tour.')}`

  return (
    <div style={{
      background: '#F5E8AE',
      backgroundImage: GRAIN,
      minHeight: '100vh',
      color: '#2B1A0E',
      fontFamily: "'Mukta',system-ui,sans-serif",
    }}>
      <SvgDefs />

      {/* ── Topbar ── */}
      <div className="topbar" style={{ background: '#6B2509' }}>
        <div className="wrap">
          <span className="hi">हर हर महादेव · जय श्री राम</span>
          <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
        </div>
      </div>

      {/* ── Nav ── */}
      <header className="nav" style={{ background: 'rgba(245,232,174,.97)', borderBottom: '1px solid rgba(196,146,37,.3)' }}>
        <div className="wrap nav-inner" style={{ padding: '6px 0' }}>
          <a href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '64px', width: 'auto', display: 'block' }} />
          </a>
          <nav className={`nav-links${navOpen ? ' open' : ''}`}>
            <a href="/#services" onClick={() => setNavOpen(false)}>Services</a>
            <a href="/packages" onClick={() => setNavOpen(false)}>Packages</a>
            <a href="/#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="/#ghats" onClick={() => setNavOpen(false)}>Ghats</a>
            <a href="/#stories" onClick={() => setNavOpen(false)}>Stories</a>
          </nav>
          <a href="/#book" className="btn" style={{ background: '#B5421A' }}>Plan my yatra</a>
          <button className="menu-btn" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>☰</button>
        </div>
      </header>

      {/* ── Toran ── */}
      <div className="toran" aria-hidden="true">
        {Array.from({ length: TORAN_COUNT }, (_, i) => <i key={i} />)}
      </div>

      <main>

        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <style>{`
          .ka-hero {
            position: relative;
            overflow: hidden;
            background: url('/images/background-theme1.jpg') center / cover no-repeat;
            width: 100%;
          }
          .ka-hoverlay {
            position: absolute; inset: 0; pointer-events: none; z-index: 1;
            background:
              linear-gradient(180deg,
                rgba(18,5,1,.45) 0%,
                rgba(18,5,1,.18) 35%,
                rgba(18,5,1,.18) 65%,
                rgba(18,5,1,.48) 100%);
          }
          .ka-hinner {
            position: relative; z-index: 2;
            padding: clamp(4px,1vw,10px) clamp(16px,5vw,48px) clamp(28px,5vw,52px);
            max-width: 720px; margin: 0 auto;
          }
          .ka-hwabtn {
            display:flex; align-items:center; justify-content:center; gap:9px;
            background:linear-gradient(135deg,#e8701a,#C4520C); color:#FAF5E0;
            padding:14px 26px; border-radius:4px; font-weight:700; font-size:1rem;
            text-decoration:none; box-shadow:0 4px 20px rgba(0,0,0,.5); white-space:nowrap;
          }
          .ka-hwabtn:hover { background:linear-gradient(135deg,#C4520C,#7A2E0E); }
        `}</style>

        <section className="ka-hero">
          <div className="ka-hoverlay" />

          <div className="ka-hinner">

            {/* Breadcrumb */}
            <nav style={{ fontSize:'.76rem', color:'rgba(255,255,255,0.92)', marginBottom:'16px', display:'flex', gap:'5px', flexWrap:'wrap' }}>
              <a href="/" style={{ color:'#FFFFFF', textDecoration:'underline', textUnderlineOffset:'3px' }}>Home</a>
              <span>›</span>
              <a href="/packages" style={{ color:'#FFFFFF', textDecoration:'underline', textUnderlineOffset:'3px' }}>Packages</a>
              <span>›</span>
              <span>Kashi – Ayodhya</span>
            </nav>

            <div style={{ textAlign:'center' }}>

              {/* Sanskrit */}
              <div style={{
                fontFamily:"'Tiro Devanagari Hindi',serif",
                fontSize:'clamp(1.3rem,3.5vw,1.7rem)',
                color:'#FF9933', fontWeight:700, letterSpacing:'.08em',
                textShadow:'0 1px 5px rgba(0,0,0,.45)',
                marginBottom:'10px',
              }}>ॐ नमः शिवाय &nbsp;·&nbsp; जय श्री राम</div>

              <GoldRule margin="0 0 12px" />

              {/* Main title — Kashi */}
              <h1 style={{
                fontFamily:"'Samarkan',serif", fontWeight:400,
                fontSize:'clamp(2.8rem,9vw,5.4rem)', color:'#FFFFFF',
                letterSpacing:'0.04em', lineHeight:1,
                textShadow:'0 2px 28px rgba(0,0,0,.7)', margin:'0 0 6px',
              }}>Kashi</h1>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', margin:'6px 0', color:'#F4A81D' }}>
                <div style={{ height:'1px', width:'clamp(28px,9vw,60px)', background:'linear-gradient(90deg,transparent,#F4A81D)' }} />
                <svg viewBox="0 0 32 20" width="22" height="14" fill="none" stroke="#F4A81D" strokeWidth="1.3">
                  <path d="M16 2c3 4 3 10 0 14-3-4-3-10 0-14z"/><path d="M16 16c-3-5-7-8-13-9 1 5 6 9 13 9z"/><path d="M16 16c3-5 7-8 13-9-1 5-6 9-13 9z"/>
                </svg>
                <div style={{ height:'1px', width:'clamp(28px,9vw,60px)', background:'linear-gradient(90deg,#F4A81D,transparent)' }} />
              </div>

              {/* Main title — Ayodhya */}
              <div style={{
                fontFamily:"'Samarkan',serif", fontWeight:400,
                fontSize:'clamp(2.4rem,8vw,5rem)', color:'#FFFFFF',
                letterSpacing:'0.04em', lineHeight:1,
                textShadow:'0 2px 20px rgba(0,0,0,.65)', marginBottom:'10px',
              }}>Ayodhya</div>

              <p style={{
                fontFamily:"'Tiro Devanagari Hindi',serif",
                fontSize:'clamp(1.3rem,3.5vw,1.7rem)',
                fontWeight:700,
                color:'#D4956A',
                textShadow:'none',
                marginBottom:'18px',
              }}>हर यात्रा का भरोसेमंद साथी</p>

              {/* Route pill */}
              <div style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                background:'rgba(10,3,0,.5)',
                backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                border:'1px solid rgba(244,168,29,.3)',
                borderRadius:'40px', padding:'7px 18px',
                marginBottom:'20px', flexWrap:'wrap', justifyContent:'center',
              }}>
                {['अयोध्या','काशी'].map((c,i) => (
                  <span key={c} style={{ display:'inline-flex', alignItems:'center', gap:'8px' }}>
                    <span style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1.05rem', color:'#FAF5E0' }}>{c}</span>
                    {i < 1 && <span style={{ color:'#F4A81D', fontSize:'.95rem' }}>›</span>}
                  </span>
                ))}
                <span style={{ color:'rgba(244,200,128,.6)', fontSize:'.95rem', marginLeft:'4px' }}>· 2 Nights / 3 Days</span>
              </div>

              {/* CTA */}
              <div>
                <a href={waEnquire} target="_blank" rel="noopener" className="ka-hwabtn" style={{ display:'inline-flex' }}>
                  <WaIcon color="#FAF5E0" size={20} />
                  Enquire on WhatsApp
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ROUTE TIMELINE
        ══════════════════════════════════════════════ */}
        <div style={{ padding:'0 0 0' }}>
          <div className="wrap">
            <GoldRule margin="0 0 32px" />
            <style>{`
              .ka-route { display:flex; align-items:flex-start; justify-content:center; gap:0; flex-wrap:nowrap; }
              .ka-route-city { display:flex; flex-direction:column; align-items:center; flex:1; min-width:0; }
              .ka-route-line { flex:1; height:2px; background:linear-gradient(90deg,#B5421A,#C49225); margin-top:18px; }
            `}</style>
            <div className="ka-route">
              {ROUTE.map((r, i) => (
                <>
                  <div key={r.city} className="ka-route-city">
                    <div style={{
                      width:'36px', height:'36px', borderRadius:'50%',
                      background:'linear-gradient(135deg,#B5421A,#6B2509)',
                      border:'3px solid #C49225',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#FAF5E0', fontWeight:900, fontSize:'.85rem',
                      flexShrink:0, boxShadow:'0 3px 10px rgba(181,66,26,.3)',
                    }}>{i + 1}</div>
                    <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:800, fontSize:'clamp(.9rem,2vw,1.1rem)', color:'#6B2509', marginTop:'8px', textAlign:'center' }}>{r.city}</div>
                    <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'.8rem', color:'#B5421A', marginTop:'2px' }}>{r.hi}</div>
                    <div style={{ fontSize:'.72rem', color:'#8B5E1A', fontWeight:600, marginTop:'4px', background:'rgba(196,146,37,.15)', borderRadius:'10px', padding:'2px 8px' }}>{r.nights}</div>
                    <div style={{ fontSize:'.68rem', color:'#A07840', marginTop:'2px' }}>{r.days}</div>
                  </div>
                  {i < ROUTE.length - 1 && <div key={`line-${i}`} className="ka-route-line" />}
                </>
              ))}
            </div>
            <GoldRule margin="32px 0 0" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            QUICK ENQUIRY FORM
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '16px 0 16px' }}>
          <div className="wrap" style={{ maxWidth: '780px', position: 'relative', filter: 'drop-shadow(0 4px 22px rgba(90,50,10,0.24))' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} dangerouslySetInnerHTML={{ __html: TORN_PAPER_SVG }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(44px,7vw,72px) clamp(60px,12vw,100px) clamp(64px,10vw,88px)' }}>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{
                fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
                fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#6B2509',
                textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '8px',
              }}>
                Plan Your Yatra
              </h2>
              <p style={{ color: '#5A3F28', fontSize: '.97rem', maxWidth: '38rem', margin: '0 auto' }}>
                Fill in your details.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>

            <style>{`
              .ka-form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 28px;
                row-gap: 22px;
              }
              @media (max-width: 580px) { .ka-form-grid { grid-template-columns: 1fr; } }
              .ka-field label {
                display: block;
                font-family: 'Tiro Devanagari Hindi', Georgia, serif;
                font-weight: 400;
                font-size: .76rem;
                letter-spacing: .14em;
                text-transform: uppercase;
                color: #7A4A1A;
                margin-bottom: 4px;
              }
              .ka-field input,
              .ka-field select,
              .ka-field textarea {
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
              .ka-field input:focus,
              .ka-field select:focus,
              .ka-field textarea:focus {
                border-bottom-color: #B5421A;
                box-shadow: none;
              }
              .ka-field input::placeholder,
              .ka-field textarea::placeholder { color: rgba(139,94,26,0.45); font-style: italic; }
              .ka-field select { appearance: none; cursor: pointer; }
              .ka-field textarea { resize: vertical; min-height: 80px; }
              .ka-field-full { grid-column: 1 / -1; }
              .ka-submit-btn {
                display: flex; align-items: center; justify-content: center; gap: 9px;
                width: 100%; padding: 13px 20px;
                background: linear-gradient(135deg,#8B3A10,#5A2008);
                color: #FAF5E0; border: none; border-radius: 2px;
                font-family: 'Tiro Devanagari Hindi', Georgia, serif; font-weight: 700; font-size: 1rem;
                cursor: pointer; letter-spacing: .08em;
                box-shadow: 0 3px 14px rgba(139,58,16,.35);
                transition: opacity .18s;
                margin-top: 2px;
              }
              .ka-submit-btn:hover { opacity: .88; }
              .ka-submit-btn:disabled { opacity: .55; cursor: not-allowed; }
            `}</style>

            <form
              onSubmit={handleEnquire}
              style={{
                background: 'transparent',
                backgroundImage: 'none',
                border: 'none',
                borderRadius: 0,
                padding: 0,
                boxShadow: 'none',
              }}
            >
              <div className="ka-form-grid">

                {/* Name */}
                <div className="ka-field">
                  <label htmlFor="ka-name">Full Name *</label>
                  <input
                    id="ka-name" name="name" type="text" required
                    placeholder="e.g. Ramesh Sharma"
                    value={form.name} onChange={handleChange}
                  />
                </div>

                {/* Mobile */}
                <div className="ka-field">
                  <label htmlFor="ka-mobile">Mobile Number *</label>
                  <input
                    id="ka-mobile" name="mobile" type="tel" required
                    placeholder="+91 98765 43210"
                    value={form.mobile} onChange={handleChange}
                  />
                </div>

                {/* No. of Travellers */}
                <div className="ka-field">
                  <label htmlFor="ka-people">No. of Travellers *</label>
                  <select id="ka-people" name="people" required value={form.people} onChange={handleChange}>
                    <option value="">Select travellers</option>
                    {['1','2','3','4','5','6','7','8','9','10','10+'].map(n => (
                      <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>

                {/* Package Preference */}
                <div className="ka-field">
                  <label htmlFor="ka-pkg">Package Preference</label>
                  <select id="ka-pkg" name="pkg" value={form.pkg} onChange={handleChange}>
                    <option value="">Not decided yet</option>
                    <option value="Standard (₹8,999/person)">Standard — ₹8,999/person</option>
                    <option value="Premium (₹12,999/person)">Premium — ₹12,999/person</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="ka-field-full">
                  <button type="submit" className="ka-submit-btn" disabled={sent}>
                    <WaIcon size={20} color="#FAF5E0" />
                    {sent ? 'Opening WhatsApp...' : 'Submit'}
                  </button>
                </div>

              </div>
            </form>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ITINERARY SECTION HEADING
        ══════════════════════════════════════════════ */}
        <section style={{ paddingBottom: '14px' }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>
              Step-by-step journey
            </div>
            <h2 style={{
              fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
              fontSize: 'clamp(2.1rem,4.5vw,3.2rem)', color: '#6B2509',
              textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '10px',
            }}>
              Day-by-Day Itinerary
            </h2>
            <p style={{ color: '#5A3F28', maxWidth: '46rem', margin: '0 auto', fontSize: '1rem' }}>
              Ayodhya · Varanasi — 2 nights, 3 days of sacred darshan, Deepotsav, river rituals &amp; cultural immersion.
            </p>
            <GoldRule margin="18px auto 0" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            DAY CARDS
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '14px 0 0' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {DAYS.map(d => <DayCard key={d.day} d={d} />)}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            TEMPLE SKYLINE DIVIDER
        ══════════════════════════════════════════════ */}
        <div style={{ overflow: 'hidden', padding: '52px 0 0' }}>
          <TempleSkyline fill="#C49225" opacity={0.42} />
        </div>

        {/* ══════════════════════════════════════════════
            SERVICES WE PROVIDE
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '70px 0 80px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>
                हमारी सेवाएं
              </div>
              <h2 style={{
                fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
                fontSize: 'clamp(2rem,4vw,3rem)', color: '#6B2509',
                textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '8px',
              }}>
                Services We Provide
              </h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '44rem', margin: '0 auto' }}>
                From Ayodhya to Varanasi — every detail of your divine yatra is taken care of.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>

            <style>{`
              .ka-svc-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
              }
              @media (min-width: 860px) {
                .ka-svc-grid { grid-template-columns: repeat(6, 1fr); gap: 12px; }
              }
            `}</style>

            <div className="ka-svc-grid">
              {SERVICES.map(svc => <ServiceCard key={svc.en} svc={svc} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ACTIVITIES COVERED
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '0 0 70px', background: 'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage: GRAIN }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>
                क्या-क्या शामिल है
              </div>
              <h2 style={{
                fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
                fontSize: 'clamp(2rem,4vw,3rem)', color: '#6B2509',
                textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '8px',
              }}>
                Activities Covered
              </h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '44rem', margin: '0 auto' }}>
                Every experience included in your Ayodhya–Varanasi divine tour.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>

            <div className="ka-svc-grid">
              {ACTIVITIES.map(act => <ServiceCard key={act.en} svc={act} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            TRIP DIARIES
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '70px 0 80px', background: 'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage: GRAIN }}>
          <div className="wrap">
            <div style={{ textAlign:'center', marginBottom:'40px' }}>
              <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>यात्रियों की यादें</div>
              <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'8px' }}>
                Glimpses of Past Yatras
              </h2>
              <p style={{ color:'#5A3F28', fontSize:'1rem', maxWidth:'40rem', margin:'0 auto' }}>
                Real moments from real travellers who journeyed with Yatra Ke Saathi.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>
            <style>{`
              .ka-diary-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; }
              @media(min-width:720px){ .ka-diary-grid{ grid-template-columns:repeat(3,1fr); } }
              .ka-diary-img { overflow:hidden; }
              .ka-diary-img img { transition:transform .6s ease; display:block; width:100%; height:100%; object-fit:cover; }
              .ka-diary-card:hover .ka-diary-img img { transform:scale(1.07); }
              .ka-diary-card:hover { box-shadow:0 12px 40px rgba(0,0,0,.55), 0 0 0 2px #C49225 !important; }
            `}</style>
            <div className="ka-diary-grid">
              {TRIP_DIARIES.map(t => (
                <div key={t.name} className="ka-diary-card" style={{
                  borderRadius:'5px', overflow:'hidden',
                  border:'1.5px solid rgba(196,146,37,.35)',
                  boxShadow:'0 8px 28px rgba(0,0,0,.35)',
                }}>
                  <div className="ka-diary-img" style={{ aspectRatio:'4/3', background:'#E8D8A0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(t.photo, 600)} alt={t.name} loading="lazy" />
                  </div>
                  <div style={{
                    background:'#FAF0CC', backgroundImage:GRAIN,
                    padding:'10px 14px',
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    borderTop:'1px solid rgba(196,146,37,.35)',
                  }}>
                    <div style={{
                      fontFamily:"'Fraunces',Georgia,serif", fontWeight:700,
                      fontSize:'.92rem', color:'#6B2509', lineHeight:1.2,
                    }}>{t.name}</div>
                    <div style={{ display:'flex', gap:'1px', flexShrink:0 }}>
                      {Array.from({length:t.stars}).map((_,i) => (
                        <span key={i} style={{ color:'#C49225', fontSize:'.82rem' }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PACKAGES & PRICING
        ══════════════════════════════════════════════ */}
        <section style={{
          padding: '70px 0 80px',
          background: 'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)',
          backgroundImage: GRAIN,
        }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '42px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>
                Choose your plan
              </div>
              <h2 style={{
                fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
                fontSize: 'clamp(2rem,4vw,3rem)', color: '#6B2509',
                textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '8px',
              }}>
                Packages &amp; Pricing
              </h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem' }}>Minimum 2 persons required for all packages.</p>
            </div>

            <div style={{
              background: '#FAF0CC', backgroundImage: GRAIN,
              border: '1.5px dashed #C49225', borderRadius: '4px',
              padding: '15px 22px', display: 'flex', gap: '12px',
              alignItems: 'flex-start', fontSize: '.93rem',
              marginBottom: '34px', boxShadow: '0 4px 14px rgba(43,26,14,.1)',
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>💡</span>
              <span>
                <strong>Payment Terms:</strong> 50% advance required at booking. Remaining 50% on the first day of tour after hotel check-in.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <PkgCard data={STD} waLink={waStd} />
              <PkgCard data={PRE} waLink={waPre} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FREQUENTLY ASKED QUESTIONS
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '70px 0 80px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>
                सामान्य प्रश्न
              </div>
              <h2 style={{
                fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
                fontSize: 'clamp(2rem,4vw,3rem)', color: '#6B2509',
                textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '8px',
              }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '42rem', margin: '0 auto' }}>
                Everything you need to know before booking your Kashi–Ayodhya divine yatra.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '820px', margin: '0 auto' }}>
              {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CONTACT CTA
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '60px 0 80px' }}>
          <div className="wrap" style={{ textAlign: 'center' }}>

            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '8px' }}>
              हर यात्रा का भरोसेमंद साथी
            </div>
            <h2 style={{
              fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
              fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#6B2509',
              textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '4px',
            }}>Yatra Ke Saathi</h2>
            <p style={{ color: '#8B5E1A', fontSize: '.95rem', marginBottom: '24px' }}>Tour &amp; Travel · Varanasi</p>

            <GoldRule margin="0 auto 28px" />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px', color: '#3A2510', fontSize: '.95rem' }}>
              <span>📍 Durgakund, Varanasi</span>
              <span style={{ color: '#C49225' }}>·</span>
              <a href="tel:+919277472279" style={{ color: '#B5421A', fontWeight: 700, textDecoration: 'none' }}>📞 +91 92774 72279</a>
              <span style={{ color: '#C49225' }}>·</span>
              <span>📸 @YATRAKSATHI</span>
              <span style={{ color: '#C49225' }}>·</span>
              <a href="mailto:info@yatraksathi.com" style={{ color: '#B5421A', textDecoration: 'none' }}>✉️ info@yatraksathi.com</a>
            </div>

            <a href={waEnquire} target="_blank" rel="noopener" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#B5421A', color: '#FAF5E0',
              padding: '14px 32px', borderRadius: '4px',
              fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 4px 18px rgba(181,66,26,.35)',
              textDecoration: 'none',
            }}>
              <WaIcon size={20} color="#FAF5E0" /> Plan Your Yatra Now
            </a>

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
              <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="/#book">Tour packages</a></li>
                <li><a href="/#book">Cab booking</a></li>
                <li><a href="/#book">Boat rides</a></li>
                <li><a href="/#book">Hotels</a></li>
              </ul>
            </div>
            <div>
              <h4>Popular Packages</h4>
              <ul>
                <li><a href="/tour-packages/kashi-ayodhya">Kashi–Ayodhya (3D)</a></li>
                <li><a href="/tour-packages/kashi-prayagraj-ayodhya">Kashi–Prayagraj–Ayodhya (4D)</a></li>
                <li><a href="/golden-triangle">Golden Triangle (5D)</a></li>
                <li><a href="/packages/divya-dham-yatra">Divya Dham Yatra (5D)</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>Varanasi, Uttar Pradesh</li>
                <li><a href="tel:+919277472279">+91 92774 72279</a></li>
                <li>info@yatraksathi.com</li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <span>© {new Date().getFullYear()} Yatra Ke Saathi</span>
            <span>Photos: Unsplash</span>
          </div>
        </div>
      </footer>

      {/* ── Sticky mobile booking bar ── */}
      <style>{`
        .ka-sticky-bar {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          background: linear-gradient(105deg,#6B2509,#B5421A);
          padding: 10px 16px;
          align-items: center; justify-content: space-between; gap: 12px;
          box-shadow: 0 -4px 20px rgba(43,26,14,.35);
          border-top: 1px solid rgba(196,146,37,.4);
        }
        @media (max-width: 720px) { .ka-sticky-bar { display: flex; } }
        .ka-sticky-price { color: #FAF5E0; }
        .ka-sticky-price strong { font-family: 'Fraunces',Georgia,serif; font-size: 1.3rem; font-weight: 900; display: block; line-height: 1; }
        .ka-sticky-price span { font-size: .72rem; color: rgba(250,245,224,.7); }
        .ka-sticky-btn {
          display: flex; align-items: center; gap: 8px;
          background: #25D366; color: #fff;
          padding: 10px 18px; border-radius: 4px;
          font-weight: 700; font-size: .95rem;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 3px 12px rgba(0,0,0,.3);
          flex-shrink: 0;
        }
      `}</style>
      <div className="ka-sticky-bar">
        <div className="ka-sticky-price">
          <strong>₹8,999/-</strong>
          <span>per person · Min 2 Pax</span>
        </div>
        <a href={waStd} target="_blank" rel="noopener" className="ka-sticky-btn">
          <WaIcon size={18} color="#fff" /> Book Now
        </a>
      </div>

      {/* WhatsApp FAB */}
      <a className="fab" href={waEnquire} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
        style={{ background: '#25D366' }}>
        <svg viewBox="0 0 32 32" fill="#FAF5E0">
          <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
        </svg>
      </a>
    </div>
  )
}
