'use client'
import { useState } from 'react'

const WA_NUMBER = '919277472279'
const WA_BASE   = `https://wa.me/${WA_NUMBER}`
const TORAN_COUNT = 60

const U = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/* ── Package data ─────────────────────────────────────── */
const PACKAGES = [
  {
    slug: 'kashi-ayodhya',
    title: 'Kashi – Ayodhya',
    subtitle: 'Deepotsav · Ram Mandir · Ganga Aarti',
    duration: '2 Nights / 3 Days',
    nights: 2,
    price: '₹8,999',
    priceNote: 'per person · Min 2 Pax',
    cities: ['Varanasi', 'Ayodhya'],
    tag: 'Popular',
    tagColor: '#B5421A',
    category: 'duo',
    photo: '1627894483216-2138af692e32',
    desc: 'Witness Deepotsav in Ayodhya, darshan at the grand Ram Mandir, and the mesmerising Ganga Aarti at Dashashwamedh Ghat.',
    highlights: ['Ganga Aarti boat ride', 'Ram Mandir darshan', 'Kashi Vishwanath', 'Deepotsav'],
  },
  {
    slug: 'kashi-prayagraj-ayodhya',
    title: 'Kashi · Prayagraj · Ayodhya',
    subtitle: 'Triveni Sangam · Ram Mandir · Ganga Aarti',
    duration: '3 Nights / 4 Days',
    nights: 3,
    price: '₹14,499',
    priceNote: 'per person · Min 4 Pax',
    cities: ['Varanasi', 'Prayagraj', 'Ayodhya'],
    tag: 'Best Seller',
    tagColor: '#3A6B2E',
    category: 'multi',
    photo: '1596097825168-c9b773f404ff',
    desc: 'The ultimate Uttar Pradesh pilgrimage — Kashi Vishwanath darshan, snan at Triveni Sangam, and Ram Mandir VIP passes included.',
    highlights: ['Triveni Sangam snan', 'VIP darshan passes', 'Ganga Aarti', 'Saryu Aarti'],
  },
  {
    slug: 'golden-triangle-varanasi-ayodhya-prayagraj',
    title: 'Golden Triangle',
    subtitle: 'Varanasi · Prayagraj · Ayodhya',
    duration: '3 Nights / 4 Days',
    nights: 3,
    price: '₹8,999',
    priceNote: 'per person · Min 2 Pax',
    cities: ['Varanasi', 'Prayagraj', 'Ayodhya'],
    tag: 'New',
    tagColor: '#6B2509',
    category: 'multi',
    photo: '1613445607898-f46e51645acf',
    desc: 'Three of UP\'s holiest cities in one seamless yatra — Ganga ghats, Sangam sunrise, and the sacred Ram Janmabhoomi.',
    highlights: ['Sangam boat ride', 'Akshayavat darshan', 'Ram Janmabhoomi', 'Sarnath visit'],
  },
  {
    slug: 'divya-dham-yatra',
    title: 'Divya Dham Yatra',
    subtitle: 'Varanasi · Prayagraj · Ayodhya · Bodh Gaya',
    duration: '4 Nights / 5 Days',
    nights: 4,
    price: '₹12,000',
    priceNote: 'per person · Min 4 Pax',
    cities: ['Varanasi', 'Prayagraj', 'Ayodhya', 'Bodh Gaya'],
    tag: 'Grand Tour',
    tagColor: '#4A3010',
    category: 'multi',
    photo: '1649876674933-a5b3b39b4da1',
    desc: 'A 5-day pilgrimage across four sacred dhams — Kashi, Prayag, Ayodhya and the enlightenment ground of Bodh Gaya.',
    highlights: ['4 sacred cities', 'Bodh Gaya Mahabodhi', 'Triveni Sangam', 'Ram Mandir'],
  },
  {
    slug: 'varanasi-ayodhya-3-day',
    title: 'Varanasi & Ayodhya',
    subtitle: 'Ghats · Kashi Vishwanath · Ram Mandir',
    duration: '2 Nights / 3 Days',
    nights: 2,
    price: '₹7,999',
    priceNote: 'per person · Min 2 Pax',
    cities: ['Varanasi', 'Ayodhya'],
    tag: '',
    tagColor: '',
    category: 'duo',
    photo: '1665413791167-6718dcf36773',
    desc: 'Two divine cities, one unforgettable yatra. Morning boat rides on the Ganga, Kashi Vishwanath darshan, and Ram Mandir blessings.',
    highlights: ['Morning boat ride', 'Kashi Vishwanath', 'Hanumangarhi', 'Saryu Ghat'],
  },
  {
    slug: 'varanasi-3-days',
    title: 'Varanasi 3 Days',
    subtitle: 'Ghats · Temples · Sarnath',
    duration: '2 Nights / 3 Days',
    nights: 2,
    price: '₹7,999',
    priceNote: 'per person · Min 2 Pax',
    cities: ['Varanasi'],
    tag: '',
    tagColor: '',
    category: 'varanasi',
    photo: '1608412525537-662195e817c5',
    desc: 'Deep-dive into Kashi — three days of ghats, Ganga Aarti, Kashi Vishwanath, Sarnath and Banarasi weaving artistry.',
    highlights: ['Ganga Aarti', 'Kashi Vishwanath', 'Sarnath', 'Banarasi weaving'],
  },
  {
    slug: 'varanasi-2-days',
    title: 'Varanasi 2 Days',
    subtitle: 'Ghats · Aarti · Sarnath',
    duration: '1 Night / 2 Days',
    nights: 1,
    price: '₹5,999',
    priceNote: 'per person · Min 2 Pax',
    cities: ['Varanasi'],
    tag: '',
    tagColor: '',
    category: 'varanasi',
    photo: '1561359313-0639aad49ca6',
    desc: 'The essential Kashi experience — sunrise boat ride, Ganga Aarti, Kashi Vishwanath darshan, and a Sarnath afternoon.',
    highlights: ['Sunrise boat ride', 'Ganga Aarti', 'Kashi Vishwanath', 'Sarnath Stupa'],
  },
  {
    slug: 'varanasi-tour-2-days-1-night',
    title: 'Varanasi 2D / 1N',
    subtitle: 'Budget · Ghats · Temples',
    duration: '1 Night / 2 Days',
    nights: 1,
    price: '₹4,999',
    priceNote: 'per person · Min 2 Pax',
    cities: ['Varanasi'],
    tag: 'Budget',
    tagColor: '#5A3F28',
    category: 'varanasi',
    photo: '1571536802807-30451e3955d8',
    desc: 'The most affordable way to experience Kashi — temple darshans, boat ride, Ganga Aarti, all covered in 2 days.',
    highlights: ['Boat ride', 'Ganga Aarti', 'Temple darshans', 'Ghats walk'],
  },
  {
    slug: 'varanasi-group-tour-itinerary',
    title: 'Varanasi Group Tour',
    subtitle: 'Families · Societies · Pilgrim Groups',
    duration: '1 Night / 2 Days',
    nights: 1,
    price: 'Custom Quote',
    priceNote: 'per vehicle · Min 10 Pax',
    cities: ['Varanasi'],
    tag: 'Groups 10+',
    tagColor: '#1A5276',
    category: 'group',
    photo: '1627894483216-2138af692e32',
    desc: 'AC Tempo Traveller, Mini Bus or Volvo Coach — tailored group yatras with dedicated guide and VIP darshan assistance.',
    highlights: ['Tempo / Mini Bus / Volvo', 'Dedicated guide', 'VIP darshan', 'Group hotel'],
  },
]

const FILTERS = [
  { id: 'all',       label: 'All Packages' },
  { id: 'varanasi',  label: 'Varanasi Only' },
  { id: 'duo',       label: 'Varanasi + Ayodhya' },
  { id: 'multi',     label: 'Multi-City' },
  { id: 'group',     label: 'Group Tours' },
]

/* ── Sub-components ───────────────────────────────────── */
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
      <svg viewBox="0 0 24 24" width="14" height="14" fill="#C49225">
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
        <rect x="438" y="130" width="36" height="18" /><polygon points="456,108 438,130 474,130" /><polygon points="456,92 445,108 467,108" /><rect x="454" y="84" width="4" height="9" /><circle cx="456" cy="81" r="3.5" />
        <rect x="502" y="98" width="82" height="50" /><polygon points="543,50 502,98 584,98" /><polygon points="543,28 525,50 561,50" /><polygon points="543,12 534,28 552,28" /><rect x="540" y="0" width="6" height="13" /><circle cx="543" cy="-2" r="6" /><rect x="498" y="112" width="16" height="36" /><polygon points="506,98 498,112 514,112" /><rect x="568" y="112" width="16" height="36" /><polygon points="576,98 568,112 584,112" /><rect x="492" y="142" width="102" height="6" />
        <rect x="618" y="126" width="36" height="22" /><ellipse cx="636" cy="126" rx="18" ry="11" /><rect x="634" y="114" width="4" height="13" /><circle cx="636" cy="111" r="3.5" />
        <rect x="668" y="130" width="28" height="18" /><ellipse cx="682" cy="130" rx="14" ry="9" /><rect x="680" y="120" width="4" height="11" /><circle cx="682" cy="117" r="3" />
        <rect x="728" y="114" width="56" height="34" /><polygon points="756,74 728,114 784,114" /><polygon points="756,56 742,74 770,74" /><rect x="754" y="44" width="5" height="13" /><circle cx="756" cy="41" r="4.5" /><rect x="724" y="128" width="12" height="20" /><rect x="786" y="128" width="12" height="20" />
        <rect x="830" y="132" width="30" height="16" /><polygon points="845,114 830,132 860,132" /><rect x="843" y="94" width="4" height="21" /><polygon points="847,94 847,106 857,100" /><circle cx="845" cy="91" r="3" />
        <rect x="882" y="120" width="16" height="28" /><rect x="936" y="120" width="16" height="28" /><rect x="882" y="107" width="70" height="15" /><polygon points="917,80 882,107 952,107" /><rect x="914" y="67" width="6" height="14" /><circle cx="917" cy="64" r="5" />
        <rect x="980" y="128" width="34" height="20" /><ellipse cx="997" cy="128" rx="17" ry="10" /><rect x="995" y="117" width="4" height="12" /><circle cx="997" cy="114" r="3.5" />
        <rect x="1044" y="116" width="54" height="32" /><polygon points="1071,76 1044,116 1098,116" /><polygon points="1071,58 1057,76 1085,76" /><rect x="1068" y="46" width="6" height="13" /><circle cx="1071" cy="43" r="5" />
        <rect x="1122" y="130" width="34" height="18" /><polygon points="1139,110 1122,130 1156,130" /><rect x="1137" y="102" width="4" height="9" /><circle cx="1139" cy="99" r="3.5" />
      </g>
    </svg>
  )
}

/* ── Landscape card — alternates image side every card ── */
function PackageCard({ pkg, index }) {
  const reversed = index % 2 !== 0   // odd-indexed cards: content left, image right
  const waMsg = `${WA_BASE}?text=${encodeURIComponent(`Namaste! I am interested in the ${pkg.title} tour package (${pkg.duration}). Please share details.`)}`

  return (
    <article className={`lcard${reversed ? ' lcard-rev' : ''}`}>

      {/* ── Image panel ── */}
      <div className="lcard-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={U(pkg.photo)} alt={pkg.title} loading="lazy" className="lcard-img" />

        {/* dark gradient on image */}
        <div className="lcard-img-overlay" />

        {/* Circular nights badge — top-left */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px', zIndex: 2,
          width: '54px', height: '54px', borderRadius: '50%',
          background: 'linear-gradient(135deg,#B5421A,#6B2509)',
          border: '2.5px solid #C49225',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 14px rgba(0,0,0,.45)',
        }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: '1.15rem', color: '#FAF5E0', lineHeight: 1 }}>{pkg.nights}</span>
          <span style={{ fontSize: '.52rem', color: 'rgba(250,245,224,.8)', letterSpacing: '.07em', textTransform: 'uppercase', marginTop: '2px' }}>nights</span>
        </div>

        {/* Duration pill — bottom */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px', zIndex: 2,
          background: 'rgba(10,3,0,.75)',
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(244,168,29,.4)',
          borderRadius: '30px', padding: '4px 12px',
          fontSize: '.72rem', fontWeight: 700, color: '#F4C87A', letterSpacing: '.04em',
        }}>{pkg.duration}</div>
      </div>

      {/* ── Content panel ── */}
      <div className="lcard-body">

        {/* Tag badge — inside content, above city trail */}
        {pkg.tag && (
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: pkg.tagColor, color: '#FAF5E0',
            borderRadius: '3px', padding: '2px 10px',
            fontSize: '.68rem', fontWeight: 700,
            letterSpacing: '.1em', textTransform: 'uppercase',
            marginBottom: '8px', alignSelf: 'flex-start',
            boxShadow: '0 2px 6px rgba(0,0,0,.18)',
          }}>{pkg.tag}</div>
        )}

        {/* City trail */}
        <div className="lcard-city-trail" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '8px' }}>
          {pkg.cities.map((city, i) => (
            <span key={city} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{
                background: 'rgba(181,66,26,.1)', border: '1px solid rgba(181,66,26,.28)',
                color: '#8B2A10', borderRadius: '20px',
                padding: '2px 10px', fontSize: '.72rem', fontWeight: 700,
                letterSpacing: '.04em', fontFamily: "'Tiro Devanagari Hindi', serif",
              }}>{city}</span>
              {i < pkg.cities.length - 1 && (
                <span style={{ color: '#C49225', fontSize: '.75rem', fontWeight: 700 }}>›</span>
              )}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="lcard-title" style={{
          fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800,
          fontSize: 'clamp(1.05rem,2.5vw,1.65rem)', color: '#3A1A08',
          lineHeight: 1.15, marginBottom: '2px',
        }}>{pkg.title}</h3>

        {/* Cities as plain text — hidden on desktop, shown on mobile */}
        <div className="lcard-cities-text" style={{
          display: 'none',
          fontSize: '.72rem', color: '#B5421A', fontWeight: 600,
          marginBottom: '4px', letterSpacing: '.02em',
        }}>{pkg.cities.join(' · ')}</div>

        <div className="lcard-subtitle" style={{
          fontFamily: "'Tiro Devanagari Hindi',serif",
          fontSize: '.8rem', color: '#8B5E1A', marginBottom: '10px',
        }}>{pkg.subtitle}</div>

        <GoldRule margin="0 0 10px" />

        {/* Description */}
        <p className="lcard-desc" style={{
          fontFamily: "'Mukta',sans-serif", fontSize: '.94rem',
          color: '#4A2E12', lineHeight: 1.55, marginBottom: '12px',
        }}>{pkg.desc}</p>

        {/* Highlights */}
        <div className="lcard-highlights" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
          {pkg.highlights.map(h => (
            <span key={h} style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: '#FAF5E0', border: '1px solid rgba(196,146,37,.4)',
              color: '#5A3F28', borderRadius: '4px',
              padding: '3px 9px', fontSize: '.76rem', fontWeight: 600,
            }}>
              <span style={{ color: '#B5421A', fontSize: '.62rem' }}>◆</span>
              {h}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px dashed rgba(196,146,37,.4)', marginBottom: '14px' }} />

        {/* Price + actions row */}
        <div className="lcard-price-row" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>

          {/* Price block */}
          <div style={{ minWidth: '100px' }}>
            <div className="lcard-from-label" style={{ fontSize: '.66rem', color: '#8B5E1A', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '1px' }}>Starting from</div>
            <div className="lcard-price-num" style={{
              fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900,
              fontSize: 'clamp(1.25rem,3vw,1.8rem)', color: '#B5421A', lineHeight: 1,
            }}>{pkg.price}</div>
            <div style={{ fontSize: '.68rem', color: '#8B5E1A', marginTop: '2px' }}>{pkg.priceNote}</div>
          </div>

          {/* CTA buttons */}
          <div className="lcard-ctas" style={{ display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
            <a
              href={`/tour-packages/${pkg.slug}`}
              className="lcard-view-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'linear-gradient(135deg,#7A5018,#4A3010)',
                color: '#FAF5E0', borderRadius: '3px',
                padding: '9px 16px', fontSize: '.87rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '.02em',
                boxShadow: '0 3px 10px rgba(0,0,0,.2)',
                whiteSpace: 'nowrap',
              }}
            >
              View Details
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#FAF5E0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a
              href={waMsg}
              target="_blank" rel="noopener"
              className="lcard-enquire"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                background: 'linear-gradient(135deg,#B5421A,#7A2E0E)',
                color: '#FAF5E0', borderRadius: '3px',
                padding: '9px 16px', fontSize: '.87rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '.02em',
                boxShadow: '0 3px 10px rgba(181,66,26,.25)',
                whiteSpace: 'nowrap',
              }}
            >
              <WaIcon size={15} color="#FAF5E0" /> Enquire
            </a>
          </div>

        </div>
      </div>
    </article>
  )
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function TourPackagesPage() {
  const [navOpen, setNavOpen]         = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? PACKAGES
    : PACKAGES.filter(p => p.category === activeFilter)

  const waEnquire = `${WA_BASE}?text=${encodeURIComponent('Namaste! I would like to know more about your tour packages. Please guide me.')}`

  return (
    <div style={{
      background: '#F5E8AE',
      backgroundImage: GRAIN,
      minHeight: '100vh',
      color: '#2B1A0E',
      fontFamily: "'Mukta',system-ui,sans-serif",
    }}>

      {/* ─── Global styles ─── */}
      <style>{`
        /* Landscape card */
        .lcard {
          display: flex;
          flex-direction: row;
          background: #FAF0CC;
          background-image: ${GRAIN};
          border: 1.5px solid rgba(196,146,37,.4);
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(43,26,14,.14);
          transition: box-shadow .25s, transform .25s;
          min-height: 280px;
        }
        .lcard:hover {
          box-shadow: 0 16px 52px rgba(43,26,14,.26);
          transform: translateY(-3px);
        }
        /* Image panel — 40% */
        .lcard-img-wrap {
          position: relative;
          width: 42%;
          flex-shrink: 0;
          overflow: hidden;
        }
        .lcard-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform .55s ease;
        }
        .lcard:hover .lcard-img { transform: scale(1.06); }
        .lcard-img-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(90deg, rgba(12,3,0,0) 55%, rgba(12,3,0,.35) 100%);
        }
        /* Reversed card: image goes to right */
        .lcard-rev { flex-direction: row-reverse; }
        .lcard-rev .lcard-img-overlay {
          background: linear-gradient(270deg, rgba(12,3,0,0) 55%, rgba(12,3,0,.35) 100%);
        }
        /* Content panel — 58% */
        .lcard-body {
          flex: 1;
          padding: clamp(20px,3vw,32px) clamp(20px,3vw,36px);
          display: flex; flex-direction: column; justify-content: center;
        }
        /* Mobile: keep landscape, keep image width fixed, tighten padding */
        @media (max-width: 600px) {
          .lcard { min-height: 160px; }
          .lcard-body { padding: 12px 12px; }
          .lcard-subtitle { display: none !important; }
        }

        /* Filter bar */
        .pkg-filter-bar {
          display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
        }
        .pkg-filter-btn {
          padding: 8px 20px; border-radius: 30px;
          font-family: 'Mukta', sans-serif; font-weight: 700;
          font-size: .88rem; cursor: pointer; transition: all .18s;
          border: 1.5px solid rgba(196,146,37,.5);
          background: rgba(250,240,204,.8); color: #5A3F28;
        }
        .pkg-filter-btn.active {
          background: linear-gradient(135deg, #B5421A, #7A2E0E);
          color: #FAF5E0; border-color: transparent;
          box-shadow: 0 4px 14px rgba(181,66,26,.3);
        }
        .pkg-filter-btn:hover:not(.active) {
          background: rgba(250,240,204,1);
          border-color: #C49225; color: #3A1A08;
        }

        /* Cards list */
        .pkg-list {
          display: flex; flex-direction: column; gap: 20px;
        }

        /* Hide non-essential content at very small sizes */
        @media (max-width: 600px) {
          .lcard-highlights { display: none; }
          .lcard-desc { display: none !important; }
          .lcard-price-row { flex-wrap: nowrap !important; align-items: center !important; gap: 8px !important; }
          .lcard-price-num { font-size: 1.15rem !important; }
          .lcard-ctas { flex: 0 !important; }
          .lcard-view-btn { padding: 8px 10px !important; font-size: 0 !important; border-radius: 4px !important; }
          .lcard-view-btn svg { width: 16px !important; height: 16px !important; }
          .lcard-enquire { display: none !important; }
          .lcard-city-trail { display: none !important; }
          .lcard-cities-text { display: block !important; }
          .lcard-title { font-size: 1rem !important; }
          .lcard-subtitle { font-size: .74rem !important; }
          .lcard-from-label { display: none; }
        }

        /* Why grid */
        .why-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 20px;
        }
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .why-grid { grid-template-columns: 1fr; gap: 14px; } }

        /* Nav */
        .hide-sm { display: inline; }
        @media (max-width: 480px) { .hide-sm { display: none; } }

        /* Hero */
        .pkg-hero {
          position: relative; overflow: hidden;
          background: url('/images/background-theme1.jpg') center / cover no-repeat;
        }
        .pkg-hoverlay {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: linear-gradient(180deg,
            rgba(12,3,0,.6) 0%, rgba(12,3,0,.3) 40%,
            rgba(12,3,0,.3) 65%, rgba(12,3,0,.55) 100%);
        }
        .pkg-hinner {
          position: relative; z-index: 2;
          padding: clamp(40px,7vw,80px) clamp(16px,5vw,48px) clamp(40px,7vw,72px);
          text-align: center; max-width: 800px; margin: 0 auto;
        }
      `}</style>

      {/* ── Topbar ── */}
      <div className="topbar" style={{ background: '#6B2509' }}>
        <div className="wrap">
          <span className="hi">हर हर महादेव · जय श्री राम · जय माँ गंगे</span>
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
            <a href="/tour-packages" style={{ borderBottom: '2px solid #B5421A' }}>Packages</a>
            <a href="/#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="/#ghats" onClick={() => setNavOpen(false)}>Ghats</a>
            <a href="/#stories" onClick={() => setNavOpen(false)}>Stories</a>
          </nav>
          <a href={waEnquire} target="_blank" rel="noopener" className="btn" style={{ background: '#B5421A' }}>Plan my yatra</a>
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
        <section className="pkg-hero">
          <div className="pkg-hoverlay" />
          <div className="pkg-hinner">

            <nav style={{ fontSize:'.76rem', color:'rgba(255,255,255,.9)', marginBottom:'18px', display:'flex', gap:'5px', flexWrap:'wrap', justifyContent:'center' }}>
              <a href="/" style={{ color:'#FFF', textDecoration:'underline', textUnderlineOffset:'3px' }}>Home</a>
              <span>›</span>
              <span>Tour Packages</span>
            </nav>

            <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'clamp(1.2rem,3vw,1.6rem)', color:'#FF9933', fontWeight:700, textShadow:'0 1px 6px rgba(0,0,0,.5)', marginBottom:'10px' }}>
              हर हर महादेव · जय श्री राम
            </div>

            <GoldRule margin="0 0 14px" />

            <h1 style={{
              fontFamily:"'Fraunces',Georgia,serif", fontWeight:900,
              fontSize:'clamp(2.6rem,7vw,4.8rem)', color:'#FFFFFF',
              textShadow:'0 3px 24px rgba(0,0,0,.7)', lineHeight:1, marginBottom:'14px',
              textTransform:'uppercase', letterSpacing:'-.01em',
            }}>Tour Packages</h1>

            <p style={{ fontFamily:"'Mukta',sans-serif", fontSize:'clamp(1rem,2.2vw,1.15rem)', color:'rgba(255,255,255,.88)', maxWidth:'44rem', margin:'0 auto 28px', lineHeight:1.55 }}>
              Sacred yatras to Kashi, Ayodhya, Prayagraj &amp; beyond — handcrafted itineraries, AC cabs, hotel stays, and darshan passes. Arranged by people who live here.
            </p>

            {/* Stats strip */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'0',
              background:'rgba(10,3,0,.5)', backdropFilter:'blur(8px)',
              border:'1px solid rgba(244,168,29,.3)', borderRadius:'40px',
              overflow:'hidden', flexWrap:'wrap', justifyContent:'center',
            }}>
              {[
                { num: '9',    label: 'Packages' },
                { num: '5',    label: 'Cities' },
                { num: '500+', label: 'Pilgrims' },
              ].map((s, i) => (
                <>
                  {i > 0 && <div key={`d${i}`} style={{ width:'1px', height:'44px', background:'rgba(244,168,29,.25)' }} />}
                  <div key={s.label} style={{ textAlign:'center', padding:'10px 22px' }}>
                    <div style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,1.7rem)', color:'#F4C87A', lineHeight:1 }}>{s.num}</div>
                    <div style={{ fontSize:'.68rem', color:'rgba(255,255,255,.7)', letterSpacing:'.1em', textTransform:'uppercase', marginTop:'2px' }}>{s.label}</div>
                  </div>
                </>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FILTER BAR
        ══════════════════════════════════════════════ */}
        <div style={{ padding:'40px 0 0' }}>
          <div className="wrap">
            <div style={{ textAlign:'center', marginBottom:'18px' }}>
              <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'.9rem', color:'#8B5E1A', marginBottom:'3px' }}>यात्रा चुनें</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:'1.05rem', color:'#6B2509' }}>Filter by destination</div>
            </div>
            <div className="pkg-filter-bar">
              {FILTERS.map(f => {
                const count = f.id === 'all' ? PACKAGES.length : PACKAGES.filter(p => p.category === f.id).length
                return (
                  <button
                    key={f.id}
                    className={`pkg-filter-btn${activeFilter === f.id ? ' active' : ''}`}
                    onClick={() => setActiveFilter(f.id)}
                  >
                    {f.label}
                    {activeFilter !== f.id && (
                      <span style={{ marginLeft:'5px', opacity:.55, fontSize:'.76rem' }}>({count})</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            PACKAGES LIST  (landscape cards, alternating)
        ══════════════════════════════════════════════ */}
        <section style={{ padding:'28px 0 80px' }}>
          <div className="wrap">
            {filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'60px 0', color:'#8B5E1A', fontSize:'1.1rem' }}>
                No packages found.{' '}
                <button onClick={() => setActiveFilter('all')} style={{ color:'#B5421A', background:'none', border:'none', cursor:'pointer', fontWeight:700, fontSize:'1rem' }}>
                  Show all
                </button>
              </div>
            ) : (
              <div className="pkg-list">
                {filtered.map((pkg, i) => (
                  <PackageCard key={pkg.slug} pkg={pkg} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            WHY YATRA KE SAATHI
        ══════════════════════════════════════════════ */}
        <section style={{ padding:'0 0 80px', background:'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage:GRAIN }}>
          <div style={{ overflow:'hidden' }}>
            <TempleSkyline fill="#C49225" opacity={0.35} />
          </div>
          <div className="wrap" style={{ paddingTop:'60px' }}>
            <div style={{ textAlign:'center', marginBottom:'46px' }}>
              <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1rem', color:'#8B5E1A', marginBottom:'6px' }}>हमें क्यों चुनें</div>
              <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(2rem,4vw,3rem)', color:'#6B2509', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.08, marginBottom:'8px' }}>
                Why Yatra Ke Saathi?
              </h2>
              <p style={{ color:'#5A3F28', fontSize:'1rem', maxWidth:'44rem', margin:'0 auto' }}>
                We are locals — born and raised in Kashi. Every route, every ghat, every darshan shortcut — we know it by heart.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>
            <div className="why-grid">
              {[
                { icon:'🛕', title:'Temple-First Planning',  desc:'Darshan timings and crowd patterns factored into every itinerary.' },
                { icon:'🚐', title:'AC Vehicles Always',     desc:'Clean, well-maintained AC cabs and buses — from solo to 50+ groups.' },
                { icon:'🤝', title:'Local Expertise',        desc:'Varanasi-based team who know every ghat, lane, and shortcut.' },
                { icon:'📱', title:'WhatsApp Support',       desc:'24/7 reachable on WhatsApp. No IVR, no waiting — real people.' },
                { icon:'💰', title:'Transparent Pricing',    desc:'No hidden charges. What you see is what you pay.' },
                { icon:'⭐', title:'5-Star Reviews',         desc:'Hundreds of happy pilgrims from across India and beyond.' },
                { icon:'🛏️', title:'Curated Hotels',        desc:'Handpicked hotels near temples with clean rooms and good food.' },
                { icon:'🔄', title:'Flexible Itineraries',   desc:'All packages can be extended, shortened, or customised for you.' },
              ].map(w => (
                <div key={w.title} style={{
                  background:'#FAF0CC', backgroundImage:GRAIN,
                  border:'1.5px solid rgba(196,146,37,.35)',
                  borderRadius:'5px', padding:'22px 20px',
                  boxShadow:'0 4px 16px rgba(43,26,14,.1)',
                }}>
                  <div style={{ fontSize:'2rem', marginBottom:'10px' }}>{w.icon}</div>
                  <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'1rem', color:'#3A1A08', marginBottom:'6px' }}>{w.title}</div>
                  <div style={{ fontSize:'.88rem', color:'#5A3F28', lineHeight:1.5 }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════ */}
        <section style={{ padding:'60px 0 80px' }}>
          <div className="wrap">
            <div style={{
              background:'linear-gradient(135deg,#6B2509 0%,#3A1408 100%)',
              backgroundImage:GRAIN, borderRadius:'8px',
              padding:'clamp(36px,6vw,64px) clamp(24px,6vw,80px)',
              border:'1.5px solid rgba(196,146,37,.3)',
              boxShadow:'0 16px 48px rgba(43,26,14,.35)',
              position:'relative', overflow:'hidden', textAlign:'center',
            }}>
              <div style={{ position:'absolute', right:'-20px', top:'-30px', fontSize:'14rem', opacity:.04, color:'#FAF5E0', fontFamily:"'Tiro Devanagari Hindi',serif", lineHeight:1, pointerEvents:'none', userSelect:'none' }}>ॐ</div>
              <div style={{ fontFamily:"'Tiro Devanagari Hindi',serif", fontSize:'1.1rem', color:'#F4C87A', marginBottom:'10px' }}>हर यात्रा का भरोसेमंद साथी</div>
              <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:900, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#FAF5E0', textTransform:'uppercase', letterSpacing:'-1px', marginBottom:'12px' }}>
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p style={{ color:'rgba(255,255,255,.8)', fontSize:'clamp(.95rem,2vw,1.1rem)', marginBottom:'32px', maxWidth:'42rem', margin:'0 auto 32px' }}>
                Tell us your travel dates, group size, and budget — we&apos;ll craft a custom pilgrimage itinerary just for you.
              </p>
              <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
                <a href={waEnquire} target="_blank" rel="noopener" style={{
                  display:'inline-flex', alignItems:'center', gap:'10px',
                  background:'linear-gradient(135deg,#e8701a,#C4520C)', color:'#FAF5E0',
                  borderRadius:'4px', padding:'14px 28px', fontWeight:700, fontSize:'1rem',
                  textDecoration:'none', boxShadow:'0 4px 20px rgba(232,112,26,.4)',
                }}>
                  <WaIcon size={20} color="#FAF5E0" /> Plan a Custom Yatra
                </a>
                <a href="tel:+919277472279" style={{
                  display:'inline-flex', alignItems:'center', gap:'10px',
                  background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.3)',
                  color:'#FAF5E0', borderRadius:'4px', padding:'14px 28px', fontWeight:700, fontSize:'1rem',
                  textDecoration:'none',
                }}>
                  📞 Call Us Now
                </a>
              </div>
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
              <a href="/" className="logo" style={{ marginBottom:'14px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height:'60px', width:'auto', display:'block' }} />
              </a>
              <p style={{ fontSize:'.93rem', maxWidth:'22rem', color:'#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
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
                <li><a href="/tour-packages/golden-triangle-varanasi-ayodhya-prayagraj">Golden Triangle (4D)</a></li>
                <li><a href="/tour-packages/divya-dham-yatra">Divya Dham Yatra (5D)</a></li>
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

    </div>
  )
}
