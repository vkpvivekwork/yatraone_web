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
    day: 1, city: 'Varanasi', title: 'Arrival & Evening Temple Darshan',
    activities: [
      'Hotel check-in',
      'Kaal Bhairav Temple darshan',
      'Maha Mrityunjay Temple',
      'Ganga Aarti at Dashashwamedh Ghat',
      'Explore Dashashwamedh shopping street',
      'Annapurna Temple darshan',
      'Kashi Vishwanath Shayan Aarti',
      'Back to hotel',
    ],
    photos: [
      { id: '1561359313-0639aad49ca6', alt: 'Varanasi ghats at dusk' },
      { id: '1627894483216-2138af692e32', alt: 'Ganga Aarti ceremony' },
      { id: '1665413791167-6718dcf36773', alt: 'Temple lamps' },
    ],
  },
  {
    day: 2, city: 'Varanasi', title: 'Morning Sightseeing & Ghats',
    activities: [
      'Early Morning Mangala Aarti (check inclusions)',
      'Subah-e-Banaras — music & yoga on the ghats',
      'Morning Boat ride — Explore all 84 ghats',
      'BHU Kashi Vishwanath darshan',
      'Sankat Mochan (Hanuman Mandir)',
      'Durga Mata Mandir Darshan',
      'Back to hotel',
    ],
    photos: [
      { id: '1571536802807-30451e3955d8', alt: 'Morning boat on Ganga' },
      { id: '1608412525537-662195e817c5', alt: 'Varanasi ghats' },
      { id: '1596097825168-c9b773f404ff', alt: 'River at sunrise' },
    ],
  },
  {
    day: 3, city: 'Prayagraj → Ayodhya', title: 'Triveni Sangam Snan & Ayodhya Arrival',
    activities: [
      'Early morning departure to Prayagraj',
      'Triveni Sangam Snan (holy dip)',
      'Alopi Mata Shakti Peeth darshan',
      'Bade Hanuman Ji darshan',
      'Travel to Ayodhya',
      'Hotel check-in in Ayodhya',
      'Explore Lata Mangeshkar Chowk & Surya Stambh',
      'Evening Saryu Aarti',
      'Overnight stay in Ayodhya',
    ],
    photos: [
      { id: '1705952484283-19c31e37e0e4', alt: 'Sacred confluence — Sangam' },
      { id: '1706186829065-ede677efe384', alt: 'Prayagraj river banks' },
      { id: '1634920540678-df0e179c5243', alt: 'Arrival in Ayodhya' },
    ],
  },
  {
    day: 4, city: 'Ayodhya', title: 'Ayodhya Darshan & Departure',
    activities: [
      'Morning breakfast',
      'Ram Mandir darshan',
      'Kanak Bhawan',
      'Dashrath Mahal',
      'Drop to railway station or airport',
    ],
    photos: [
      { id: '1599831069477-b2acdc0bcb91', alt: 'Ayodhya evening aarti' },
      { id: '1613445607898-f46e51645acf', alt: 'Ram Mandir darshan' },
      { id: '1649876674933-a5b3b39b4da1', alt: 'Temple complex' },
    ],
  },
]



const TRIP_DIARIES = [
  { name: 'Rajesh Sharma', city: 'Delhi',   stars: 5, photo: '1627894483216-2138af692e32', caption: 'Ganga Aarti · Varanasi' },
  { name: 'Priya Verma',   city: 'Mumbai',  stars: 5, photo: '1613445607898-f46e51645acf', caption: 'Ram Mandir · Ayodhya' },
  { name: 'Amit Gupta',    city: 'Lucknow', stars: 5, photo: '1705952484283-19c31e37e0e4', caption: 'Triveni Sangam · Prayagraj' },
  { name: 'Sunita Devi',   city: 'Patna',   stars: 5, photo: '1561359313-0639aad49ca6',    caption: 'Ghats · Varanasi' },
  { name: 'Manoj Tiwari',  city: 'Bhopal',  stars: 5, photo: '1599831069477-b2acdc0bcb91', caption: 'Saryu Aarti · Ayodhya' },
  { name: 'Kavita Singh',  city: 'Jaipur',  stars: 5, photo: '1571536802807-30451e3955d8', caption: 'Boat Ride · Ganga' },
]

const ROUTE = [
  { city: 'Varanasi', hi: 'काशी', nights: '2 Nights', days: 'Day 1–2' },
  { city: 'Prayagraj', hi: 'प्रयागराज', nights: 'Day visit', days: 'Day 3' },
  { city: 'Ayodhya', hi: 'अयोध्या', nights: '1 Night', days: 'Day 3–4' },
]

const SERVICES = [
  {
    hi: 'कैब',
    en: 'Cab',
    photo: '1449965408869-eaa3f722e40d',
  },
  {
    hi: 'नौका विहार',
    en: 'Boat Ride',
    photo: '1571536802807-30451e3955d8',
  },
  {
    hi: 'मंदिर दर्शन',
    en: 'Temple Darshan',
    photo: '1665413791167-6718dcf36773',
  },
  {
    hi: 'दर्शन व्यवस्था',
    en: 'Darshan Passes',
    photo: '1613445607898-f46e51645acf',
  },
  {
    hi: 'होटल बुकिंग',
    en: 'Hotel Booking',
    photo: '1631049307264-da0ec9d70304',
  },
  {
    hi: 'दर्शनीय स्थल',
    en: 'Sightseeing',
    photo: '1561359313-0639aad49ca6',
  },
  {
    hi: 'पिकअप और ड्रॉप',
    en: 'Pickup & Drop',
    photo: '1449965408869-eaa3f722e40d',
  },
  {
    hi: 'गंगा आरती',
    en: 'Ganga Aarti',
    photo: '1627894483216-2138af692e32',
  },
]

const ACTIVITIES = [
  { en: 'Evening Ganga Aarti',        photo: '1627894483216-2138af692e32' },
  { en: 'Subah-e-Banaras — Assi Ghat', photo: '1571536802807-30451e3955d8' },
  { en: 'Kashi Vishwanath Temple',    photo: '1665413791167-6718dcf36773' },
  { en: 'Darshan & Puja in Kashi',   photo: '1561359313-0639aad49ca6' },
  { en: 'Boat Ride — River Ganga',   photo: '1596097825168-c9b773f404ff' },
  { en: 'Sarnath',                    photo: '1649876674933-a5b3b39b4da1' },
  { en: 'Local Handicraft Shopping',  photo: '1513475382585-d06e58bcb0e0' },
  { en: 'Ram Mandir Darshan',         photo: '1613445607898-f46e51645acf' },
  { en: 'Saryu River Aarti — Ayodhya', photo: '1599831069477-b2acdc0bcb91' },
  { en: 'Holy Bath — Triveni Sangam', photo: '1705952484283-19c31e37e0e4' },
  { en: 'Boat Ride — Saryu & Sangam', photo: '1706186829065-ede677efe384' },
  { en: 'Dev Deepawali',              photo: '1608412525537-662195e817c5' },
  { en: 'Historical Places — Prayagraj', photo: '1634920540678-df0e179c5243' },
]

const FAQS = [
  {
    q: 'What is the duration of this tour package?',
    a: 'This is a 3-Night / 4-Day tour covering Varanasi (2 nights), Prayagraj (day visit), and Ayodhya (1 night).',
  },
  {
    q: 'What is the minimum group size to book this package?',
    a: 'A minimum of 4 persons is required for both Standard and Premium packages. For smaller groups, please contact us on WhatsApp — we will try to accommodate you.',
  },
  {
    q: 'Are meals included in the package?',
    a: 'The Standard Package does not include meals. The Premium Package includes daily breakfast. Lunch and dinner are not included in either package.',
  },
  {
    q: 'What is not covered in the package price?',
    a: 'Travel tickets (bus, train, or flight) to and from Varanasi are not included. Personal expenses, tips, and entry fees to specific religious events like Mangala Aarti (Standard only) are also excluded.',
  },
  {
    q: 'How do I confirm my booking?',
    a: '50% advance payment is required at the time of booking. The remaining 50% is to be paid on the first day of the tour after hotel check-in.',
  },
  {
    q: 'Can I get Kashi Vishwanath Mangala Aarti darshan?',
    a: 'Yes — the Premium Package includes either Mangala Aarti or Shayan Aarti at Kashi Vishwanath. In the Standard Package this is listed as an optional add-on (not included).',
  },
  {
    q: 'Is transport between cities included?',
    a: 'Yes. AC car transportation between Varanasi, Prayagraj, and Ayodhya is included in both packages. Pickup and drop from the railway station or airport is included only in the Premium Package.',
  },
  {
    q: 'Is a private boat ride on the Ganga included?',
    a: 'Yes. A private boat ride at Varanasi to explore the 84 ghats is included in both Standard and Premium packages.',
  },
  {
    q: 'Can I customise the itinerary?',
    a: 'Absolutely. Reach out to us on WhatsApp with your requirements — we can adjust stays, add extra darshans, or extend the trip to suit your preferences.',
  },
]

const STD = {
  label: 'Standard', price: '₹14,499', note: 'per person · Min 4 Pax',
  inclusions: [
    'Accommodation (3 Star)', 'Transportation (AC Car)',
    'Kashi Vishwanath Darshan passes', 'Boat ride at Varanasi (Private)',
    'Ram Mandir darshan passes', 'All sightseeing',
  ],
  exclusions: [
    'Travel tickets (Bus / Train / Flight)', 'Meals (Fooding)',
    'Mangala Aarti', 'Pickup / Drop facility', 'Personal expenses',
  ],
}

const PRE = {
  label: 'Premium', price: '₹21,499', note: 'per person · Min 4 Pax',
  inclusions: [
    'Accommodation (3 Star)', 'Transportation (AC Car)',
    'Fooding — Breakfast included',
    'Kashi Vishwanath Mangala Aarti or Shayan Aarti',
    'Boat ride at Varanasi (Private)',
    'Ganga Aarti special arrangements',
    'Ram Mandir VIP darshan passes',
    'Pickup & Drop facility', 'All sightseeing',
  ],
  exclusions: [
    'Travel tickets (Bus / Train / Flight)',
    'Lunch & Dinner', 'Personal expenses',
  ],
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */

function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="kpa-mark" viewBox="0 0 48 48">
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

/* ── Ornamental gold rule ── */
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

/* ── Temple skyline SVG ── */
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

/* ── Vintage polaroid-style photo ── */
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

/* ── Day card — vintage travel-journal style ── */
function DayCard({ d }) {
  return (
    <div style={{
      borderRadius: '5px',
      overflow: 'hidden',
      border: '1.5px solid rgba(196,146,37,.4)',
      boxShadow: '0 8px 36px rgba(43,26,14,.18), 0 1px 0 rgba(250,245,224,.9) inset',
    }}>

      {/* Header band */}
      <div style={{
        background: 'linear-gradient(105deg,#FAF0CC 0%,#EDD690 55%,#FAF0CC 100%)',
        backgroundImage: GRAIN,
        display: 'flex', alignItems: 'stretch',
        position: 'relative', overflow: 'hidden',
        borderBottom: '2px solid rgba(196,146,37,.5)',
      }}>
        {/* Day-number stamp column */}
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

        {/* City + title */}
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

        {/* OM ornament */}
        <div style={{
          position: 'absolute', top: '9px', right: '14px',
          fontSize: '1.2rem', opacity: .3, color: '#8B5E1A',
          fontFamily: "'Tiro Devanagari Hindi',serif",
        }}>ॐ</div>
      </div>

      {/* Parchment content */}
      <div style={{
        background: '#FAF0CC',
        backgroundImage: GRAIN,
        padding: '24px 28px 30px',
      }}>
        <GoldRule margin="0 0 16px" />

        {/* Activities */}
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

        {/* Photo strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {d.photos.map((p, i) => <VintagePhoto key={i} id={p.id} alt={p.alt} />)}
        </div>
      </div>
    </div>
  )
}

/* ── Service card ── */
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

/* ── FAQ accordion item ── */
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

/* ── Pricing card ── */
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
export default function KashiPrayagrajAyodhya() {
  const [navOpen, setNavOpen] = useState(false)
  const waEnquire = `${WA_BASE}?text=${encodeURIComponent('Namaste! I am interested in the Kashi–Prayagraj–Ayodhya 3N/4D package. Please share details.')}`
  const waStd     = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Standard Package (₹14,499/person) for Kashi–Prayagraj–Ayodhya 3N/4D tour.')}`
  const waPre     = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Premium Package (₹21,499/person) for Kashi–Prayagraj–Ayodhya 3N/4D tour.')}`

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
          <span className="hi">हर हर महादेव · अतिथि देवो भव</span>
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
            HERO — parchment pilgrimage poster
        ══════════════════════════════════════════════ */}
        <style>{`
          /* ── Photo hero ── */
          .kpa-hero {
            position: relative;
            overflow: hidden;
            background: url('/images/background-theme1.jpg') center / cover no-repeat;
            width: 100%;
          }
          .kpa-hoverlay {
            position: absolute; inset: 0; pointer-events: none; z-index: 1;
            background:
              linear-gradient(180deg,
                rgba(18,5,1,.45) 0%,
                rgba(18,5,1,.18) 35%,
                rgba(18,5,1,.18) 65%,
                rgba(18,5,1,.48) 100%);
          }
          .kpa-hinner {
            position: relative; z-index: 2;
            padding: clamp(28px,5vw,52px) clamp(16px,5vw,48px) clamp(28px,5vw,52px);
            max-width: 720px; margin: 0 auto;
          }
          /* Layout helpers */
          .kpa-hcity { margin: 0; text-align: center; line-height: 1; }
          .kpa-hroute { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; row-gap:12px; }
          .kpa-hstats { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
          @media (min-width:520px) { .kpa-hstats { grid-template-columns:repeat(4,1fr); } }
          .kpa-hprow { display:flex; flex-direction:column; gap:14px; align-items:stretch; }
          @media (min-width:540px) { .kpa-hprow { flex-direction:row; align-items:center; justify-content:space-between; } }
          .kpa-hppair { display:flex; gap:8px; flex-direction:column; }
          @media (min-width:440px) { .kpa-hppair { flex-direction:row; } }
          .kpa-hwabtn {
            display:flex; align-items:center; justify-content:center; gap:9px;
            background:linear-gradient(135deg,#e8701a,#C4520C); color:#FAF5E0;
            padding:14px 26px; border-radius:4px; font-weight:700; font-size:1rem;
            text-decoration:none; box-shadow:0 4px 20px rgba(0,0,0,.5); white-space:nowrap;
          }
          .kpa-hwabtn:hover { background:linear-gradient(135deg,#C4520C,#7A2E0E); }
          .kpa-hhl { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
        `}</style>

        <section className="kpa-hero">
          <div className="kpa-hoverlay" />

          <div className="kpa-hinner">

            {/* Breadcrumb */}
            <nav style={{ fontSize:'.76rem', color:'rgba(250,210,140,.65)', marginBottom:'16px', display:'flex', gap:'5px', flexWrap:'wrap' }}>
              <a href="/" style={{ color:'#F4C880', textDecoration:'underline', textUnderlineOffset:'3px' }}>Home</a>
              <span>›</span>
              <a href="/packages" style={{ color:'#F4C880', textDecoration:'underline', textUnderlineOffset:'3px' }}>Packages</a>
              <span>›</span>
              <span>Kashi – Prayagraj – Ayodhya</span>
            </nav>

            <div style={{ textAlign:'center' }}>

              {/* Sanskrit */}
              <div style={{
                fontFamily:"'Tiro Devanagari Hindi',serif",
                fontSize:'clamp(1rem,2.8vw,1.2rem)',
                color:'#F4A81D', letterSpacing:'.08em',
                textShadow:'0 1px 8px rgba(0,0,0,.8)',
                marginBottom:'10px',
              }}>ॐ नमः शिवाय &nbsp;·&nbsp; जय श्री राम</div>

              <GoldRule margin="0 0 12px" />

              {/* Main title */}
              <h1 style={{
                fontFamily:"'Fraunces',Georgia,serif", fontWeight:900,
                fontSize:'clamp(2.8rem,11vw,6.4rem)', color:'#FAF5E0',
                letterSpacing:'-2px', textTransform:'uppercase', lineHeight:1,
                textShadow:'0 2px 28px rgba(0,0,0,.7)', margin:'0 0 6px',
              }}>Kashi</h1>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', margin:'6px 0', color:'#F4A81D' }}>
                <div style={{ height:'1px', width:'clamp(28px,9vw,60px)', background:'linear-gradient(90deg,transparent,#F4A81D)' }} />
                <svg viewBox="0 0 32 20" width="22" height="14" fill="none" stroke="#F4A81D" strokeWidth="1.3">
                  <path d="M16 2c3 4 3 10 0 14-3-4-3-10 0-14z"/><path d="M16 16c-3-5-7-8-13-9 1 5 6 9 13 9z"/><path d="M16 16c3-5 7-8 13-9-1 5-6 9-13 9z"/>
                </svg>
                <div style={{ height:'1px', width:'clamp(28px,9vw,60px)', background:'linear-gradient(90deg,#F4A81D,transparent)' }} />
              </div>

              <div style={{
                fontFamily:"'Fraunces',Georgia,serif", fontWeight:800,
                fontSize:'clamp(1.4rem,5.5vw,3.2rem)', color:'#F4D090',
                letterSpacing:'-0.5px', textTransform:'uppercase',
                textShadow:'0 2px 20px rgba(0,0,0,.65)', marginBottom:'10px',
              }}>Prayagraj &nbsp;·&nbsp; Ayodhya</div>

              <p style={{
                fontFamily:"'Tiro Devanagari Hindi',serif",
                fontSize:'clamp(.88rem,2.4vw,1.05rem)',
                color:'rgba(244,200,128,.85)',
                textShadow:'0 1px 6px rgba(0,0,0,.7)',
                marginBottom:'18px',
              }}>हर यात्रा का भरोसेमंद साथी</p>

              {/* Compact route pill */}
              <div style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                background:'rgba(10,3,0,.5)',
                backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                border:'1px solid rgba(244,168,29,.3)',
                borderRadius:'40px', padding:'7px 18px',
                marginBottom:'20px', flexWrap:'wrap', justifyContent:'center',
              }}>
                {['काशी','प्रयागराज','अयोध्या'].map((c,i) => (
                  <span key={c} style={{ display:'inline-flex', alignItems:'center', gap:'8px' }}>
                    <span style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'.85rem', color:'#FAF5E0' }}>{c}</span>
                    {i < 2 && <span style={{ color:'#F4A81D', fontSize:'.75rem' }}>›</span>}
                  </span>
                ))}
                <span style={{ color:'rgba(244,200,128,.6)', fontSize:'.74rem', marginLeft:'4px' }}>· 3 Nights / 4 Days</span>
              </div>

              {/* CTA */}
              <div>
                <a href={waEnquire} target="_blank" rel="noopener" className="kpa-hwabtn" style={{ display:'inline-flex' }}>
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
        <div style={{ padding:'0 0 48px' }}>
          <div className="wrap">
            <GoldRule margin="0 0 32px" />
            <style>{`
              .kpa-route { display:flex; align-items:flex-start; justify-content:center; gap:0; flex-wrap:nowrap; }
              .kpa-route-city { display:flex; flex-direction:column; align-items:center; flex:1; min-width:0; }
              .kpa-route-line { flex:1; height:2px; background:linear-gradient(90deg,#B5421A,#C49225); margin-top:18px; }
            `}</style>
            <div className="kpa-route">
              {ROUTE.map((r, i) => (
                <>
                  <div key={r.city} className="kpa-route-city">
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
                  {i < ROUTE.length - 1 && <div key={`line-${i}`} className="kpa-route-line" />}
                </>
              ))}
            </div>
            <GoldRule margin="32px 0 0" />
          </div>
        </div>

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
              Varanasi · Prayagraj · Ayodhya — 3 nights, 4 days of sacred darshan, river rituals &amp; cultural immersion.
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
                From Varanasi to Ayodhya — every detail of your Golden Triangle yatra is taken care of.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>

            <style>{`
              .kpa-svc-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
              }
              @media (min-width: 860px) {
                .kpa-svc-grid { grid-template-columns: repeat(6, 1fr); gap: 12px; }
              }
            `}</style>

            <div className="kpa-svc-grid">
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
                Every experience included in your Golden Triangle — Varanasi, Ayodhya &amp; Prayagraj tour.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>

            <div className="kpa-svc-grid">
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
              .kpa-diary-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; }
              @media(min-width:720px){ .kpa-diary-grid{ grid-template-columns:repeat(3,1fr); } }
              .kpa-diary-img { overflow:hidden; }
              .kpa-diary-img img { transition:transform .6s ease; display:block; width:100%; height:100%; object-fit:cover; }
              .kpa-diary-card:hover .kpa-diary-img img { transform:scale(1.07); }
              .kpa-diary-card:hover { box-shadow:0 12px 40px rgba(0,0,0,.55), 0 0 0 2px #C49225 !important; }
            `}</style>
            <div className="kpa-diary-grid">
              {TRIP_DIARIES.map(t => (
                <div key={t.name} className="kpa-diary-card" style={{
                  borderRadius:'5px', overflow:'hidden',
                  border:'1.5px solid rgba(196,146,37,.35)',
                  boxShadow:'0 8px 28px rgba(0,0,0,.35)',
                }}>
                  {/* Photo */}
                  <div className="kpa-diary-img" style={{ aspectRatio:'4/3', background:'#E8D8A0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(t.photo, 600)} alt={t.name} loading="lazy" />
                  </div>
                  {/* Name strip */}
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
              <p style={{ color: '#5A3F28', fontSize: '1rem' }}>Minimum 4 persons required for all packages.</p>
            </div>

            {/* Payment note */}
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
                Everything you need to know before booking your Kashi–Prayagraj–Ayodhya yatra.
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
                <li><a href="/golden-triangle">Golden Triangle (5D)</a></li>
                <li><a href="/packages/divya-dham-yatra">Divya Dham Yatra (5D)</a></li>
                <li><a href="/packages/varanasi-ayodhya-3-day">Varanasi Ayodhya (3D)</a></li>
                <li><a href="/tour-packages/kashi-prayagraj-ayodhya">Kashi–Prayagraj–Ayodhya (4D)</a></li>
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
        .kpa-sticky-bar {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          background: linear-gradient(105deg,#6B2509,#B5421A);
          padding: 10px 16px;
          align-items: center; justify-content: space-between; gap: 12px;
          box-shadow: 0 -4px 20px rgba(43,26,14,.35);
          border-top: 1px solid rgba(196,146,37,.4);
        }
        @media (max-width: 720px) { .kpa-sticky-bar { display: flex; } }
        .kpa-sticky-price { color: #FAF5E0; }
        .kpa-sticky-price strong { font-family: 'Fraunces',Georgia,serif; font-size: 1.3rem; font-weight: 900; display: block; line-height: 1; }
        .kpa-sticky-price span { font-size: .72rem; color: rgba(250,245,224,.7); }
        .kpa-sticky-btn {
          display: flex; align-items: center; gap: 8px;
          background: #25D366; color: #fff;
          padding: 10px 18px; border-radius: 4px;
          font-weight: 700; font-size: .95rem;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 3px 12px rgba(0,0,0,.3);
          flex-shrink: 0;
        }
      `}</style>
      <div className="kpa-sticky-bar">
        <div className="kpa-sticky-price">
          <strong>₹14,499/-</strong>
          <span>per person · Min 4 Pax</span>
        </div>
        <a href={waStd} target="_blank" rel="noopener" className="kpa-sticky-btn">
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
