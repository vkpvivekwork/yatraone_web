'use client'
import { useState, useEffect, useRef } from 'react'

const WA_NUMBER = '919277472279'
const WA_BASE   = `https://wa.me/${WA_NUMBER}`
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/* ── Vintage torn-paper SVG background for the form ───── */
function generateTornPaperSVG() {
  const W = 600, H = 760
  let seed = 21
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const r = (a, b) => a + rand() * (b - a)
  const corners = [0, 1, 2, 3].map(() => rand() < 0.75 ? { span: r(28, 70), slope: r(0.6, 1.5) } : { span: r(4, 10), slope: 1 })
  function edge(x1, y1, x2, y2, nx, ny, cStart, cEnd, skipStart = 0, skipEnd = 0) {
    const len = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len
    const shelves = []; let s = 0
    while (s < len) { const w = r(25, 120), k = rand(); shelves.push({ from: s, to: s + w, depth: k < 0.3 ? r(18, 34) : k < 0.65 ? r(8, 18) : r(0, 7) }); s += w }
    const shelfAt = t => shelves.find(sh => t >= sh.from && t < sh.to) || shelves[shelves.length - 1]
    const bites = []; let b = r(25, 70)
    while (b < len - 30) { if (rand() < 0.75) bites.push({ at: b, w: r(14, 55), depth: r(20, 46), skew: r(-0.5, 0.5) }); b += r(55, 140) }
    const rips = []; let q = r(60, 160)
    while (q < len - 50) { if (rand() < 0.5) rips.push({ at: q, depth: r(35, 85), lean: r(-18, 18), w: r(3, 7) }); q += r(120, 260) }
    const pts = []; let t = 0, depth = shelfAt(0).depth
    while (t <= len) {
      const target = shelfAt(t).depth; depth += (target - depth) * 0.3
      let off = depth + r(0, 3.5); if (rand() < 0.12) off += r(3, 9)
      const bite = bites.find(bt => t >= bt.at && t <= bt.at + bt.w)
      if (bite) { const f = (t - bite.at) / bite.w; const shape = Math.sin(Math.PI * Math.min(1, f * 1.4)) * (1 + bite.skew * (f - 0.5)); off = Math.max(off, bite.depth * Math.min(1, shape * 1.6) + r(-4, 4)) }
      if (len - t < Math.max(cEnd.span * cEnd.slope, skipEnd)) break
      if (t < skipStart) { t += r(1.5, 3.5); continue }
      if (t < cStart.span) off = Math.max(off, (cStart.span - t) * cStart.slope + r(-2, 4))
      pts.push([x1 + ux * t + nx * off, y1 + uy * t + ny * off])
      if (pts.length === 1) pts.firstOff = off; pts.lastOff = off
      const rip = rips.find(rp => t <= rp.at && t + 4 > rp.at)
      if (rip) {
        const bx = x1 + ux * t, by = y1 + uy * t; rip.depth = off + rip.depth * 0.75; const steps = 5
        for (let i = 1; i <= steps; i++) { const f = i / steps; pts.push([bx + ux * (rip.lean * f + r(-2, 2)) + nx * (off + (rip.depth - off) * f), by + uy * (rip.lean * f + r(-2, 2)) + ny * (off + (rip.depth - off) * f)]) }
        for (let i = steps - 1; i >= 0; i--) { const f = i / steps; pts.push([bx + ux * (rip.lean * f + rip.w * (1 - f * 0.7) + r(-1.5, 1.5)) + nx * (off + (rip.depth - off) * f), by + uy * (rip.lean * f + rip.w * (1 - f * 0.7) + r(-1.5, 1.5)) + ny * (off + (rip.depth - off) * f)]) }
        t += rip.w + 1; continue
      }
      t += r(1.5, 3.5)
    }
    return pts
  }
  const m = 3
  const top = edge(m, m, W - m, m, 0, 1, corners[0], corners[1])
  const right = edge(W - m, m, W - m, H - m, -1, 0, corners[1], corners[2], top.lastOff + 2)
  const bottom = edge(W - m, H - m, m, H - m, 0, -1, corners[2], corners[3], right.lastOff + 2)
  const left = edge(m, H - m, m, m, 1, 0, corners[3], corners[0], bottom.lastOff + 2, top.firstOff + 2)
  const pts = [...top, ...right, ...bottom, ...left]
  const d = 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + ' Z'
  let stains = ''
  for (let i = 0; i < 26; i++) { const side = Math.floor(r(0, 4)); let cx = r(0, W), cy = r(0, H); const inset = r(0, 70); if (side === 0) cy = inset; else if (side === 1) cx = W - inset; else if (side === 2) cy = H - inset; else cx = inset; stains += `<ellipse cx="${cx}" cy="${cy}" rx="${r(20, 70)}" ry="${r(15, 55)}" fill="#c98a45" opacity="${r(0.08, 0.2)}" filter="url(#tp-soft)"/>` }
  for (let i = 0; i < 6; i++) stains += `<ellipse cx="${r(80, W - 80)}" cy="${r(80, H - 80)}" rx="${r(25, 60)}" ry="${r(20, 50)}" fill="#d9a060" opacity="${r(0.04, 0.09)}" filter="url(#tp-soft)"/>`
  let creases = ''
  function crease(x, y, ang, segs, depth) {
    let pd = `M${x.toFixed(1)} ${y.toFixed(1)}`
    for (let i = 0; i < segs; i++) { ang += r(-0.45, 0.45); const l = r(10, 32); x += Math.cos(ang) * l; y += Math.sin(ang) * l; pd += ` L${x.toFixed(1)} ${y.toFixed(1)}`; if (depth < 2 && rand() < 0.18) crease(x, y, ang + r(-1.2, 1.2), Math.floor(r(2, 5)), depth + 1) }
    const o = r(0.25, 0.5); creases += `<path d="${pd}" stroke="#fff4dc" stroke-width="${r(0.6, 1.3).toFixed(2)}" opacity="${o.toFixed(2)}" fill="none" stroke-linejoin="round"/>`; creases += `<path d="${pd}" transform="translate(0.9 0.9)" stroke="#a87440" stroke-width="0.6" opacity="${(o * 0.35).toFixed(2)}" fill="none" stroke-linejoin="round"/>`
  }
  for (let i = 0; i < 55; i++) crease(r(0, W), r(0, H), r(0, Math.PI * 2), Math.floor(r(3, 9)), 0)
  return `<svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="tp-tear"><path d="${d}"/></clipPath><radialGradient id="tp-base" cx="52%" cy="48%" r="70%"><stop offset="0%" stop-color="#ffe9bf"/><stop offset="45%" stop-color="#fce1b2"/><stop offset="78%" stop-color="#f0c993"/><stop offset="100%" stop-color="#e3b073"/></radialGradient><linearGradient id="tp-sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="45%" stop-color="#fff6e0" stop-opacity="0.35"/><stop offset="60%" stop-color="#fff" stop-opacity="0"/></linearGradient><filter id="tp-crumple" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.018 0.024" numOctaves="4" seed="5" result="n"/><feDiffuseLighting in="n" surfaceScale="2.2" lighting-color="#ffffff"><feDistantLight azimuth="225" elevation="62"/></feDiffuseLighting><feColorMatrix type="matrix" values="1 0 0 0 0  0 0.92 0 0 0  0 0 0.8 0 0  0 0 0 1 0"/></filter><filter id="tp-wrinkle" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" seed="13" result="n"/><feDiffuseLighting in="n" surfaceScale="1.2" lighting-color="#ffffff"><feDistantLight azimuth="225" elevation="70"/></feDiffuseLighting></filter><filter id="tp-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.36  0 0 0 0 0.15  0 0 0 0.5 0"/></filter><filter id="tp-blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="11"/><feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.52  0 0 0 0 0.24  1.6 0 0 0 -0.7"/></filter><filter id="tp-patchy" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.2 0 0 0 -0.6"/></filter><mask id="tp-patchMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" filter="url(#tp-patchy)"/></mask><filter id="tp-fray" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="2" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="tp-edgeGlow"><feGaussianBlur stdDeviation="10"/></filter><filter id="tp-rim"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="tp-soft"><feGaussianBlur stdDeviation="12"/></filter></defs><g filter="url(#tp-fray)"><g clip-path="url(#tp-tear)"><rect width="${W}" height="${H}" fill="url(#tp-base)"/><rect width="${W}" height="${H}" filter="url(#tp-blotch)" opacity="0.35"/>${stains}<rect width="${W}" height="${H}" filter="url(#tp-crumple)" opacity="0.18" style="mix-blend-mode:multiply"/><rect width="${W}" height="${H}" filter="url(#tp-wrinkle)" opacity="0.07" style="mix-blend-mode:multiply"/>${creases}<rect width="${W}" height="${H}" fill="url(#tp-sheen)"/><rect width="${W}" height="${H}" filter="url(#tp-grain)" opacity="0.28"/><path d="${d}" fill="none" stroke="#d6a466" stroke-width="50" opacity="0.4" filter="url(#tp-edgeGlow)"/><path d="${d}" fill="none" stroke="#d29a55" stroke-width="80" opacity="0.38" filter="url(#tp-edgeGlow)" mask="url(#tp-patchMask)"/><path d="${d}" fill="none" stroke="#c0843c" stroke-width="26" opacity="0.4" filter="url(#tp-rim)" mask="url(#tp-patchMask)"/><path d="${d}" fill="none" stroke="#b3773a" stroke-width="5" opacity="0.55" filter="url(#tp-rim)"/><path d="${d}" fill="none" stroke="#9a6128" stroke-width="1.4" opacity="0.35"/><path d="${d}" fill="none" stroke="#fff1d6" stroke-width="2.6" opacity="0.55" stroke-dasharray="14 6 30 4 8 10" mask="url(#tp-patchMask)"/></g></g></svg>`
}
const TORN_PAPER_SVG = generateTornPaperSVG()

const WA_ENQUIRE = `${WA_BASE}?text=${encodeURIComponent('Namaste! I am interested in the Kashi Darshan (1 Day Temple Circuit). Please share details and pricing.')}`
const WA_STD     = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Standard Kashi Darshan package. Please confirm availability.')}`
const WA_PRE     = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Premium Kashi Darshan package with VIP darshan. Please confirm.')}`

const ITINERARY = [
  { time: 'Morning', title: 'Sunrise Boat Ride & Ghats', items: ['Pickup from hotel / station', 'Sunrise boat ride — see all 84 ghats from the Ganga', 'Assi Ghat morning aarti', 'Walk along the ghats with local guide'] },
  { time: 'Late Morning', title: 'Temple Circuit', items: ['Kashi Vishwanath Temple darshan', 'Maa Annapurna Devi Temple', 'Kal Bhairav Temple darshan', 'Vishwanath Gali — banarasi chai & kachori'] },
  { time: 'Afternoon', title: 'Old City Walk', items: ['Sankat Mochan Hanuman Temple', 'Durga Mata Mandir (Durgakund)', 'Old city lanes — silk & spice markets', 'Resto stop & lunch (own cost)'] },
  { time: 'Evening', title: 'Ganga Aarti', items: ['Reach Dashashwamedh Ghat before sunset', 'Ganga Aarti from the ghat steps (or private boat)', 'Flower diya floating on the Ganga', 'Drop-off at hotel / station'] },
]

const SERVICES = [
  { hi: 'मंदिर दर्शन', en: 'Temple Darshan',   photo: '1665413791167-6718dcf36773' },
  { hi: 'नौका विहार',  en: 'Boat Ride',         photo: '1571536802807-30451e3955d8' },
  { hi: 'गंगा आरती',  en: 'Ganga Aarti',        photo: '1627894483216-2138af692e32' },
  { hi: 'कैब सेवा',   en: 'AC Cab',             photo: '1449965408869-eaa3f722e40d' },
  { hi: 'स्थानीय गाइड', en: 'Local Guide',      photo: '1634920540678-df0e179c5243' },
  { hi: 'पिकअप-ड्रॉप', en: 'Pickup & Drop',     photo: '1561359313-0639aad49ca6' },
]

const FAQS = [
  { q: 'What temples are covered?', a: 'Kashi Vishwanath, Maa Annapurna, Kal Bhairav, Sankat Mochan Hanuman, and Durga Mata (Durgakund) are all included in a single day circuit.' },
  { q: 'Is the Ganga Aarti boat ride included?', a: 'Standard includes ghat-side Ganga Aarti viewing. Premium includes a private boat during the aarti for a closer, more immersive experience.' },
  { q: 'What is not included?', a: 'Train / flight tickets to Varanasi, lunch & dinner, monument entry fees, personal expenses, and 5% GST are excluded.' },
  { q: 'Do I need to book a VIP pass separately?', a: 'No. Premium package includes a VIP darshan arrangement at Kashi Vishwanath. Standard includes guided darshan assistance.' },
  { q: 'Can I start early in the morning?', a: 'Yes. We recommend a 5:00–5:30 AM start for the sunrise boat ride. Pickup from your hotel or Varanasi Junction is arranged accordingly.' },
  { q: 'Is this suitable for senior travellers?', a: 'Yes. Our local guide manages pacing, queue navigation, and rest stops throughout the day. Let us know if you need extra support.' },
]

const WHO_FOR = [
  { icon: '🙏', title: 'Solo Pilgrims',      desc: 'We pair you with same-day groups. Pandit booking and guide arranged so you never feel alone.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Families & Groups', desc: 'Veg-only meals on request, child-friendly pace, and dedicated support for elders throughout.' },
  { icon: '🧓', title: 'Senior Citizens',    desc: 'Wheelchair access at ghats, porter support, and priority darshan queues — we set the pace for you.' },
  { icon: '🤝', title: 'With Friends',       desc: 'Small group rates, flexible timing, and custom stops — travel your way.' },
]

const HOW_IT_WORKS = [
  { step: '01', icon: '💬', title: 'WhatsApp Us',           desc: 'Send your travel dates & group size. No payment needed — just a free conversation.' },
  { step: '02', icon: '📋', title: 'Receive Custom Quote',  desc: 'Within hours we share a detailed plan, pickup time and transparent all-in pricing.' },
  { step: '03', icon: '✅', title: 'Book with 50% Advance', desc: 'Lock your date with 50% advance. Remaining 50% is paid on the day of the tour.' },
  { step: '04', icon: '🚗', title: 'We Handle Everything',  desc: 'Cab, guide, darshan passes, boat — you just arrive and experience Kashi.' },
]

const REVIEWS = [
  { name: 'Priya Verma',    city: 'Mumbai',    stars: 5, text: 'The Ganga Aarti arrangements were flawless. Our driver knew every shortcut and the hotel was spotless.' },
  { name: 'Ramesh Agarwal', city: 'Jaipur',    stars: 5, text: 'My elderly parents did Kashi Vishwanath darshan comfortably. No rush, no crowd stress. Truly trustworthy.' },
  { name: 'Sunita Devi',    city: 'Delhi',     stars: 5, text: 'The VIP darshan pass saved us 2+ hours. Sunrise boat ride was the highlight of the trip.' },
  { name: 'Vikram Singh',   city: 'Lucknow',   stars: 5, text: 'Booked for family of 6. Exact price as quoted, zero hidden charges. 100% recommend.' },
  { name: 'Anita Sharma',   city: 'Ahmedabad', stars: 5, text: 'Travelled solo — they arranged everything perfectly. Felt completely safe the entire day.' },
]

const TRIP_DIARIES = [
  { place: 'Ganga Aarti · Dashashwamedh', photo: '1627894483216-2138af692e32', stars: 5, reviewer: 'Priya Verma',    city: 'Mumbai' },
  { place: 'Kashi Vishwanath Temple',     photo: '1665413791167-6718dcf36773', stars: 5, reviewer: 'Ramesh Agarwal', city: 'Jaipur' },
  { place: 'Sunrise Boat Ride · Ganga',  photo: '1571536802807-30451e3955d8', stars: 5, reviewer: 'Sunita Devi',    city: 'Delhi' },
  { place: 'Varanasi Ghats at Dawn',      photo: '1608412525537-662195e817c5', stars: 5, reviewer: 'Vikram Singh',   city: 'Lucknow' },
  { place: 'Old City Lanes · Kashi',      photo: '1634920540678-df0e179c5243', stars: 5, reviewer: 'Anita Sharma',   city: 'Ahmedabad' },
  { place: 'Diya Floating · Holy Ganga',  photo: '1561359313-0639aad49ca6',   stars: 5, reviewer: 'Meera Gupta',    city: 'Pune' },
]

const STD = {
  label: 'Standard', price: '₹1,999', note: 'per person · Min 2 Pax',
  inclusions: ['AC Cab — all-day Varanasi sightseeing', 'Sunrise boat ride on the Ganga', 'Full temple circuit with darshan guide', 'Evening Ganga Aarti (ghat-side)', 'Flower diya floating', 'Pickup & drop at hotel / station'],
  exclusions: ['Train / flight tickets to Varanasi', 'Meals (breakfast, lunch, dinner)', 'VIP darshan pass', 'Personal expenses', '5% GST'],
}

const PRE = {
  label: 'Premium', price: '₹3,499', note: 'per person · Min 2 Pax',
  inclusions: ['AC Cab — all-day Varanasi sightseeing', 'Sunrise boat ride + private Aarti boat', 'VIP Kashi Vishwanath darshan pass', 'Full temple circuit with expert guide', 'Pickup & drop at hotel / station', 'Morning chai & kachori included'],
  exclusions: ['Train / flight tickets to Varanasi', 'Lunch & dinner', 'Personal expenses', '5% GST'],
}

/* ── Sub-components ── */

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
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#C49225"><path d="M12 2l1.8 5.4H20l-4.9 3.6 1.8 5.4L12 13l-4.9 3.4 1.8-5.4L4 7.4h6.2z" /></svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} />
    </div>
  )
}

function PkgCard({ data, waLink }) {
  const isPremium = data.label === 'Premium'
  return (
    <div style={{ flex: 1, minWidth: '280px', background: '#FAF0CC', backgroundImage: GRAIN, border: isPremium ? '2px solid #B5421A' : '1.5px solid rgba(196,146,37,.45)', borderRadius: '5px', padding: '32px 26px 26px', position: 'relative', boxShadow: isPremium ? '0 10px 36px rgba(181,66,26,.22)' : '0 6px 24px rgba(43,26,14,.14)' }}>
      <div style={{ position: 'absolute', top: '-14px', left: '24px', background: isPremium ? '#B5421A' : '#7A5018', color: '#FAF5E0', borderRadius: '3px', padding: '3px 16px', fontSize: '.76rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{isPremium ? 'BEST VALUE' : 'STANDARD'}</div>
      <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '1.3rem', color: '#2B1A0E', marginBottom: '4px' }}>{data.label} Package</div>
      <GoldRule margin="10px 0 12px" />
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontWeight: 700, color: '#3A6B2E', fontSize: '.88rem', marginBottom: '8px' }}>What&apos;s Included</div>
        {data.inclusions.map(item => <div key={item} style={{ display: 'flex', gap: '8px', padding: '5px 0', borderBottom: '1px dashed rgba(58,107,46,.2)', fontSize: '.9rem' }}><span style={{ color: '#3A6B2E', flexShrink: 0, marginTop: '2px' }}>✔</span><span>{item}</span></div>)}
      </div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontWeight: 700, color: '#8B2020', fontSize: '.88rem', marginBottom: '8px' }}>Not Included</div>
        {data.exclusions.map(item => <div key={item} style={{ display: 'flex', gap: '8px', padding: '5px 0', borderBottom: '1px dashed rgba(139,32,32,.18)', fontSize: '.9rem' }}><span style={{ color: '#8B2020', flexShrink: 0, marginTop: '2px' }}>✖</span><span>{item}</span></div>)}
      </div>
      <a href={waLink} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: isPremium ? 'linear-gradient(135deg,#B5421A,#7A2E0E)' : 'linear-gradient(135deg,#7A5018,#4A3010)', color: '#FAF5E0', borderRadius: '4px', padding: '13px 20px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
        <WaIcon color="#FAF5E0" /> Book {data.label} on WhatsApp
      </a>
    </div>
  )
}

function FaqItem({ faq, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '4px', overflow: 'hidden' }}>
      <button onClick={() => setOpen(v => !v)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', padding: '16px 20px', cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: "'Mukta',sans-serif", fontWeight: 700, fontSize: 'clamp(.95rem,1.8vw,1.05rem)', color: '#2B1A0E', lineHeight: 1.4 }} aria-expanded={open}>
        <span>{faq.q}</span>
        <span style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', background: open ? '#B5421A' : '#C49225', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF5E0', fontSize: '.8rem', fontWeight: 900 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding: '0 20px 18px', paddingTop: '14px', fontFamily: "'Mukta',sans-serif", fontSize: '.97rem', color: '#4A2E12', lineHeight: 1.65, borderTop: '1px solid rgba(196,146,37,.3)' }}>{faq.a}</div>}
    </div>
  )
}

/* ── Page ── */

export default function KashiDarshanPage() {
  const [navOpen, setNavOpen] = useState(false)
  const [form, setForm] = useState({ name: '', mobile: '', people: '', pkg: '', date: '' })
  const [sent, setSent] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)
  const videoRef = useRef(null)
  const userToggledSound = useRef(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pastHero && !userToggledSound.current && videoRef.current) {
      videoRef.current.muted = false
      setVideoMuted(false)
    }
  }, [pastHero])

  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) }

  function handleEnquire(e) {
    e.preventDefault()
    const lines = [
      `Namaste! I'd like to enquire about the Kashi Darshan (1 Day) tour.`,
      ``, `Name: ${form.name}`, `WhatsApp: ${form.mobile}`,
      `No. of Travellers: ${form.people}`,
      form.pkg  ? `Package: ${form.pkg}` : '',
      form.date ? `Travel Date: ${form.date}` : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true); setTimeout(() => setSent(false), 4000)
  }

  return (
    <div style={{ background: '#F5E8AE', backgroundImage: GRAIN, minHeight: '100vh', color: '#2B1A0E', fontFamily: "'Mukta',system-ui,sans-serif" }}>

      {/* Topbar */}
      <div className="topbar" style={{ background: '#6B2509' }}>
        <div className="wrap">
          <span className="hi">हर हर महादेव · ॐ नमः शिवाय</span>
          <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
        </div>
      </div>

      {/* Nav */}
      <header className="nav" style={{ background: 'rgba(245,232,174,.97)', borderBottom: '1px solid rgba(196,146,37,.3)' }}>
        <div className="wrap nav-inner" style={{ padding: '6px 0' }}>
          <a href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '64px', width: 'auto', display: 'block' }} />
          </a>
          <nav className={`nav-links${navOpen ? ' open' : ''}`}>
            <a href="/tour-packages" onClick={() => setNavOpen(false)}>Packages</a>
            <a href="/cab" onClick={() => setNavOpen(false)}>Cab</a>
            <a href="/boat-rides" onClick={() => setNavOpen(false)}>Boating</a>
            <a href="/about" onClick={() => setNavOpen(false)}>About</a>
          </nav>
          <a href={WA_ENQUIRE} target="_blank" rel="noopener" className="btn" style={{ background: '#B5421A' }}>Plan my yatra</a>
          <button className="menu-btn" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>☰</button>
        </div>
      </header>

      {/* Toran */}
      <div className="toran" aria-hidden="true">
        {Array.from({ length: 55 }, (_, i) => <i key={i} />)}
      </div>

      <main>

        {/* Hero */}
        <style>{`
          @keyframes kd-kenburns {
            from { transform: scale(1);    transform-origin: 60% 50%; }
            to   { transform: scale(1.08); transform-origin: 40% 55%; }
          }
          .kd-hero{position:relative;overflow:hidden;min-height:92vh;display:flex;align-items:center;}
          .kd-hero::before{content:'';position:absolute;inset:0;z-index:0;background:url('https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1400&q=80&auto=format&fit=crop') center/cover no-repeat;animation:kd-kenburns 18s ease-in-out infinite alternate;will-change:transform;}
          .kd-hero-video{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover;pointer-events:none;}
          .kd-overlay{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(to top,rgba(12,3,0,.95) 0%,rgba(12,3,0,.6) 40%,rgba(12,3,0,.2) 75%,rgba(12,3,0,.08) 100%)}
          .kd-hinner{position:relative;z-index:2;padding:clamp(80px,10vw,120px) clamp(16px,5vw,48px) clamp(48px,6vw,80px);max-width:780px;margin:0 auto;text-align:center;width:100%}
          .kd-sm-hide{display:inline}
          @media(max-width:480px){.kd-sm-hide{display:none}}
        `}</style>

        <section className="kd-hero">
          <video
            ref={videoRef}
            className="kd-hero-video"
            src="/videos/Ganga-Aarti-Varanasi-SnapYT.App.mp4"
            autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1400&q=80&auto=format&fit=crop"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          />
          <button
            onClick={() => {
              if (videoRef.current) {
                userToggledSound.current = true
                videoRef.current.muted = !videoRef.current.muted
                setVideoMuted(videoRef.current.muted)
              }
            }}
            aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
            style={{
              position: 'absolute', bottom: '24px', right: '24px', zIndex: 4,
              background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,.2)', borderRadius: '50%',
              width: '40px', height: '40px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', color: '#fff',
            }}
          >
            {videoMuted ? '🔇' : '🔊'}
          </button>
          <div className="kd-overlay" />
          <div className="kd-hinner">

            {/* Breadcrumb — pinned top */}
            <nav style={{ position: 'absolute', top: 'clamp(10px,2vw,18px)', left: '50%', transform: 'translateX(-50%)', fontSize: '.76rem', color: 'rgba(255,255,255,.7)', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 3, whiteSpace: 'nowrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Home</a>
              <span>›</span>
              <a href="/tour-packages" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Packages</a>
              <span>›</span>
              <span>Kashi Darshan</span>
            </nav>

            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '.78rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#F4A81D', textShadow: '0 1px 8px rgba(0,0,0,.6)', marginBottom: '14px' }}>
              <span>Kashi Darshan</span>
              <span style={{ color: 'rgba(244,168,29,.45)', fontSize: '.9em' }}>|</span>
              <span style={{ color: 'rgba(255,255,255,.6)', fontWeight: 400, letterSpacing: '.08em' }}>1 Day · 5 Temples · Ganga Aarti</span>
            </div>

            <GoldRule margin="0 0 14px" />

            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.8rem,7.5vw,5rem)', color: '#FFFFFF', textShadow: '0 3px 28px rgba(0,0,0,.75)', lineHeight: .95, marginBottom: '12px', letterSpacing: '-.02em' }}>Kashi Darshan</h1>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2.5vw,1.7rem)', color: 'rgba(255,255,255,.72)', marginBottom: '28px', letterSpacing: '.01em' }}>
              ॐ नमः शिवाय · काशी विश्वनाथ
            </h2>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px', justifyContent: 'center' }}>
              <a href={WA_ENQUIRE} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#25D366', color: '#fff', borderRadius: '4px', padding: '14px 28px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,.45)' }}>
                <WaIcon size={20} color="#fff" /> WhatsApp Us
              </a>
              <a href="#kd-enquiry-form" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.35)', color: '#FAF5E0', borderRadius: '4px', padding: '14px 24px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                📋 Book Now
              </a>
            </div>

            {/* Stats strip */}
            <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap', borderTop: '1px solid rgba(244,168,29,.18)', paddingTop: '20px', marginTop: '4px', justifyContent: 'center' }}>
              {[
                { num: '1',    label: 'Day' },
                { num: '5',    label: 'Temples' },
                { num: '84',   label: 'Ghats' },
                { num: '500+', label: 'Pilgrims' },
              ].map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: '1px', height: '32px', background: 'rgba(244,168,29,.2)', margin: '0 4px' }} />}
                  <div style={{ textAlign: 'center', padding: '0 18px' }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: 'clamp(1rem,2.2vw,1.3rem)', color: '#F4C87A', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.5)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '3px' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Who-for inline */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 20px', marginTop: '16px' }}>
              {[
                { icon: '🙏', title: 'Solo Pilgrims' },
                { icon: '👨‍👩‍👧‍👦', title: 'Families & Groups' },
                { icon: '🧓', title: 'Senior Citizens' },
                { icon: '🤝', title: 'With Friends' },
              ].map(w => (
                <div key={w.title} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>{w.icon}</span>
                  <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)', fontWeight: 500, whiteSpace: 'nowrap' }}>{w.title}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Trust Marquee ── */}
        <style>{`
          @keyframes kd-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
          .kd-marquee-track{display:flex;width:max-content;animation:kd-marquee 28s linear infinite}
        `}</style>
        <div style={{ background: 'linear-gradient(90deg,#3A1408,#6B2509,#3A1408)', borderBottom: '1px solid rgba(196,146,37,.3)', overflow: 'hidden', padding: '10px 0' }}>
          <div className="kd-marquee-track">
            {[...Array(2)].flatMap(() => [
              { icon: '⭐', text: '4.9★ Google Rating' },
              { icon: '👥', text: '500+ Pilgrims Served' },
              { icon: '📍', text: 'Varanasi Based' },
              { icon: '📞', text: 'Reply within 2 Hours' },
              { icon: '🛕', text: '5 Temples in 1 Day' },
              { icon: '🔒', text: 'No Advance for Quote' },
            ]).map((t, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0 36px', whiteSpace: 'nowrap', fontSize: '.85rem', color: 'rgba(250,245,224,.85)' }}>
                <span>{t.icon}</span> {t.text}
                <span style={{ color: 'rgba(196,146,37,.5)', marginLeft: '36px' }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Vintage Enquiry Form ── */}
        <section id="kd-enquiry-form" style={{ padding: '20px 0 28px' }}>
          <div className="wrap" style={{ maxWidth: '780px', position: 'relative', filter: 'drop-shadow(0 4px 22px rgba(90,50,10,0.28))' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} dangerouslySetInnerHTML={{ __html: TORN_PAPER_SVG }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(44px,7vw,72px) clamp(40px,10vw,100px) clamp(56px,8vw,88px)' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#6B2509', letterSpacing: '-1px', lineHeight: 1.08, marginBottom: '8px' }}>
                  Plan Your Kashi Darshan
                </h2>
                <GoldRule margin="18px auto 0" />
              </div>
              <style>{`
                .kd-form-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; row-gap: 22px; }
                @media (max-width: 580px) { .kd-form-grid { grid-template-columns: 1fr; } }
                .kd-vfield label { display: block; font-family: 'Tiro Devanagari Hindi', Georgia, serif; font-weight: 400; font-size: .76rem; letter-spacing: .14em; text-transform: uppercase; color: #7A4A1A; margin-bottom: 4px; }
                .kd-vfield input, .kd-vfield select { width: 100%; background: transparent; border: none; border-bottom: 1.5px solid rgba(139,94,26,0.55); border-radius: 0; padding: 7px 2px; font-family: Georgia, serif; font-size: 1rem; color: #2B1A0E; outline: none; box-sizing: border-box; transition: border-color .18s; }
                .kd-vfield input:focus, .kd-vfield select:focus { border-bottom-color: #B5421A; }
                .kd-vfield input::placeholder { color: rgba(139,94,26,0.45); font-style: italic; }
                .kd-vfield select { appearance: none; cursor: pointer; }
                .kd-vfield-full { grid-column: 1 / -1; }
                .kd-vsub-btn { display: flex; align-items: center; justify-content: center; gap: 9px; width: 100%; padding: 13px 20px; background: linear-gradient(135deg,#8B3A10,#5A2008); color: #FAF5E0; border: none; border-radius: 2px; font-family: 'Tiro Devanagari Hindi', Georgia, serif; font-weight: 700; font-size: 1rem; cursor: pointer; letter-spacing: .08em; box-shadow: 0 3px 14px rgba(139,58,16,.35); transition: opacity .18s; margin-top: 2px; }
                .kd-vsub-btn:hover { opacity: .88; }
                .kd-vsub-btn:disabled { opacity: .55; cursor: not-allowed; }
              `}</style>
              <form onSubmit={handleEnquire} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <div className="kd-form-grid">
                  <div className="kd-vfield">
                    <label htmlFor="kd-name">Full Name *</label>
                    <input id="kd-name" name="name" type="text" required placeholder="e.g. Ramesh Sharma" autoComplete="name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="kd-vfield">
                    <label htmlFor="kd-mobile">WhatsApp Number *</label>
                    <input id="kd-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" autoComplete="tel" inputMode="tel" value={form.mobile} onChange={handleChange} />
                  </div>
                  <div className="kd-vfield">
                    <label htmlFor="kd-people">No. of Travellers *</label>
                    <select id="kd-people" name="people" required value={form.people} onChange={handleChange}>
                      <option value="">Select travellers</option>
                      {['1','2','3','4','5','6','7','8','9','10','10+'].map(n => <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>)}
                    </select>
                  </div>
                  <div className="kd-vfield">
                    <label htmlFor="kd-pkg">Package Preference</label>
                    <select id="kd-pkg" name="pkg" value={form.pkg} onChange={handleChange}>
                      <option value="">Not decided yet</option>
                      <option value="Standard">Standard Package</option>
                      <option value="Premium">Premium Package</option>
                    </select>
                  </div>
                  <div className="kd-vfield-full">
                    <button type="submit" className="kd-vsub-btn" disabled={sent}>
                      <WaIcon size={20} color="#FAF5E0" />
                      {sent ? 'Opening WhatsApp…' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Itinerary */}
        <section style={{ padding: '60px 0 20px' }}>
          <div className="wrap" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>एक दिन की पवित्र यात्रा</div>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2rem,4vw,2.8rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>Day Itinerary</h2>
            <p style={{ color: '#5A3F28', maxWidth: '44rem', margin: '0 auto', fontSize: '1rem' }}>Sunrise to aarti — every moment of your Kashi day, mapped out.</p>
            <GoldRule margin="18px auto 0" />
          </div>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ITINERARY.map(({ time, title, items }) => (
              <div key={time} style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '5px', overflow: 'hidden', boxShadow: '0 6px 28px rgba(43,26,14,.16)' }}>
                <div style={{ background: 'linear-gradient(105deg,#FAF0CC,#EDD690 60%,#FAF0CC)', borderBottom: '2px solid rgba(196,146,37,.45)', padding: '16px 24px', display: 'flex', gap: '18px', alignItems: 'center' }}>
                  <div style={{ background: 'linear-gradient(135deg,#B5421A,#6B2509)', color: '#FAF5E0', borderRadius: '3px', padding: '4px 14px', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', flexShrink: 0 }}>{time}</div>
                  <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: 'clamp(.95rem,2vw,1.2rem)', color: '#5A3F28' }}>{title}</div>
                </div>
                <ul style={{ listStyle: 'none', padding: '20px 24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: 'clamp(.92rem,1.8vw,1rem)', color: '#2B1A0E', fontWeight: 600, lineHeight: 1.45 }}>
                      <span style={{ color: '#B5421A', fontSize: '.8rem', marginTop: '4px', flexShrink: 0 }}>◆</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section style={{ padding: '60px 0 70px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>हमारी सेवाएं</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>What&apos;s Covered</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <style>{`.kd-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}@media(min-width:720px){.kd-svc-grid{grid-template-columns:repeat(6,1fr)}}`}</style>
            <div className="kd-svc-grid">
              {SERVICES.map(svc => (
                <div key={svc.en} style={{ background: '#FAF5E0', padding: '4px 4px 22px', boxShadow: '0 6px 20px rgba(43,26,14,.3),inset 0 0 0 1px rgba(196,146,37,.35)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ overflow: 'hidden', aspectRatio: '1', background: '#E8D8A0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(svc.photo, 400)} alt={svc.en} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '4px', left: '6px', right: '6px', textAlign: 'center', fontSize: '.7rem', color: '#8B5E1A', fontFamily: "'Kalam',cursive", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{svc.en}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it Works ── */}
        <div style={{ padding: '28px 0', background: 'linear-gradient(180deg,#EDD690,#F5E8AE)', backgroundImage: GRAIN, borderTop: '1px solid rgba(196,146,37,.2)', borderBottom: '1px solid rgba(196,146,37,.2)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', flexWrap: 'wrap', justifyContent: 'center' }}>
              {HOW_IT_WORKS.map((h, i) => (
                <div key={h.step} style={{ display: 'flex', alignItems: 'flex-start', flex: '1 1 180px' }}>
                  <div style={{ textAlign: 'center', padding: '0 16px', flex: 1 }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{h.icon}</div>
                    <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '.88rem', color: '#6B2509', marginBottom: '3px' }}>{h.title}</div>
                    <p style={{ fontSize: '.78rem', color: '#8B5E1A', lineHeight: 1.5, margin: 0 }}>{h.desc}</p>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div style={{ color: 'rgba(196,146,37,.5)', fontSize: '1.2rem', paddingTop: '8px', flexShrink: 0 }}>›</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <section style={{ padding: '60px 0 80px', background: 'linear-gradient(180deg,#EDD690,#F5E8AE)', backgroundImage: GRAIN }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>Choose your plan</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>Packages &amp; Pricing</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px dashed #C49225', borderRadius: '4px', padding: '15px 22px', display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '.93rem', marginBottom: '34px' }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>💡</span>
              <span><strong>Payment Terms:</strong> 50% advance to confirm booking. Remaining 50% on the day of the tour.</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <PkgCard data={STD} waLink={WA_STD} />
              <PkgCard data={PRE} waLink={WA_PRE} />
            </div>
          </div>
        </section>

        {/* ── Trip Diaries ── */}
        <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: 'linear-gradient(180deg,#F5E8AE,#EDD690)', backgroundImage: GRAIN }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>यात्रियों की यादें</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>Glimpses of Past Yatras</h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '40rem', margin: '0 auto' }}>Real moments from pilgrims who experienced Kashi with Yatra Ke Saathi.</p>
              <GoldRule margin="16px auto 0" />
            </div>
            <style>{`
              .kd-diary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
              @media(max-width:720px){.kd-diary-grid{grid-template-columns:repeat(2,1fr);gap:10px}}
              .kd-diary-card{transition:box-shadow .25s}
              .kd-diary-card:hover{box-shadow:0 12px 40px rgba(0,0,0,.45),0 0 0 2px #C49225 !important}
              .kd-diary-card:hover .kd-diary-img img{transform:scale(1.07)}
              .kd-diary-img img{transition:transform .6s ease}
            `}</style>
            <div className="kd-diary-grid">
              {TRIP_DIARIES.map(t => (
                <div key={t.place} className="kd-diary-card" style={{ borderRadius: '5px', overflow: 'hidden', border: '1.5px solid rgba(196,146,37,.35)', boxShadow: '0 8px 28px rgba(0,0,0,.25)' }}>
                  <div className="kd-diary-img" style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#E8D8A0', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(t.photo, 600)} alt={t.place} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', bottom: '8px', left: '8px', display: 'flex', gap: '1px', background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(4px)', borderRadius: '3px', padding: '3px 7px' }}>
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <span key={i} style={{ color: '#F4C87A', fontSize: '.78rem' }}>★</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, padding: '10px 14px', borderTop: '1px solid rgba(196,146,37,.35)' }}>
                    <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '.85rem', color: '#3A1408' }}>{t.reviewer}</div>
                    <div style={{ fontSize: '.72rem', color: '#8B5E1A' }}>{t.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>यात्रियों के अनुभव</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>What Travellers Say</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {REVIEWS.map(r => (
                <div key={r.name} style={{ flex: '1 1 220px', background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '5px', padding: '24px 22px', boxShadow: '0 4px 18px rgba(43,26,14,.1)' }}>
                  <div style={{ color: '#C49225', fontSize: '.8rem', letterSpacing: '2px', marginBottom: '10px' }}>{'★'.repeat(r.stars)}</div>
                  <p style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: '.92rem', color: '#3A2510', lineHeight: 1.65, margin: '0 0 12px' }}>"{r.text}"</p>
                  <div style={{ fontSize: '.8rem', color: '#8B5E1A', fontWeight: 700 }}>— {r.name}, {r.city}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '0 0 80px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>सामान्य प्रश्न</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px' }}>FAQs</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '780px', margin: '0 auto' }}>
              {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '60px 0 80px', background: 'linear-gradient(180deg,#EDD690,#F5E8AE)', backgroundImage: GRAIN }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '8px' }}>हर यात्रा का भरोसेमंद साथी</div>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '18px' }}>Book Your Kashi Darshan</h2>
            <GoldRule margin="0 auto 24px" />
            <a href={WA_ENQUIRE} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#B5421A', color: '#FAF5E0', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
              <WaIcon size={20} color="#FAF5E0" /> Plan Your Yatra Now
            </a>
          </div>
        </section>

      </main>

      {/* ── Sticky Mobile Booking Bar ── */}
      <style>{`
        .kd-sticky-bar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;background:linear-gradient(105deg,#6B2509,#B5421A);padding:10px 16px;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 -4px 20px rgba(43,26,14,.35);border-top:1px solid rgba(196,146,37,.4)}
        @media(max-width:720px){.kd-sticky-bar{display:flex}}
      `}</style>
      <div className="kd-sticky-bar">
        <div style={{ color: '#FAF5E0' }}>
          <strong style={{ fontFamily: "'Fraunces',serif", fontSize: '1.1rem', display: 'block', lineHeight: 1 }}>Kashi Darshan · 1 Day</strong>
          <span style={{ fontSize: '.72rem', color: 'rgba(250,245,224,.7)' }}>5 Temples · Boat Ride · Ganga Aarti</span>
        </div>
        <a href="#kd-enquiry-form" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FAF0CC', color: '#6B2509', padding: '10px 18px', borderRadius: '4px', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          📋 Book Now
        </a>
      </div>

      {/* Footer */}
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
            <div><h4>Services</h4><ul>
              <li><a href="/tour-packages">Tour Packages</a></li>
              <li><a href="/cab">Cab Booking</a></li>
              <li><a href="/boat-rides">Boat Rides</a></li>
            </ul></div>
            <div><h4>Popular Packages</h4><ul>
              <li><a href="/tours/varanasi-temple-darshan">Kashi Darshan (1 Day)</a></li>
              <li><a href="/golden-triangle">Triveni Yatra (5 Days)</a></li>
              <li><a href="/tours/heritage-walk">Subah-e-Banaras Walk</a></li>
              <li><a href="/boat-rides">Ganga Boat Rides</a></li>
            </ul></div>
            <div><h4>Contact</h4><ul>
              <li>Varanasi, Uttar Pradesh</li>
              <li><a href="tel:+919277472279">+91 92774 72279</a></li>
              <li><a href="mailto:info@yatraksathi.com">info@yatraksathi.com</a></li>
            </ul></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
