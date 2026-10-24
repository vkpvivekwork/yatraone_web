'use client'
import { useEffect } from 'react'
import './page.css'
import { WHATSAPP_NUMBER, U } from '@/lib/constants'

const DHAMS = [
  { id:'kashi',     name:'Kashi',        hi:'काशी · वाराणसी',    icon:'d-kashi',     img:'1561359313-0639aad49ca6',text:'The city of Shiva on the Ganga: Kashi Vishwanath darshan, 84 ghats and the evening Ganga Aarti.', from:'Our home base' },
  { id:'ayodhya',   name:'Ayodhya',      hi:'अयोध्या',            icon:'d-ayodhya',   img:'1672398760212-08ce34b88c62',text:'Birthplace of Shri Ram: Ram Janmabhoomi, Hanuman Garhi and aarti on the Saryu.', from:'~4–5 hrs from Kashi' },
  { id:'prayagraj', name:'Prayagraj',    hi:'प्रयागराज',           icon:'d-prayag',    img:'1742316963892-2b6fee25dfc5',text:'Triveni Sangam where Ganga, Yamuna and the unseen Saraswati meet. Take a holy dip by boat.', from:'~3 hrs from Kashi' },
  { id:'ujjain',    name:'Ujjain',       hi:'उज्जैन',              icon:'d-ujjain',    img:'1658730487395-dcc99f5d997c',text:'Mahakaleshwar Jyotirlinga, the dawn Bhasma Aarti and the ghats of the Kshipra.', from:'By train or flight' },
  { id:'vrindavan', name:'Vrindavan',    hi:'वृन्दावन · मथुरा',   icon:'d-vrindavan', img:'1742022165140-d890e51ae33b',text:"Krishna's Braj: Banke Bihari, Prem Mandir, Govardhan, and a Holi like nowhere else.", from:'By train or flight' },
  { id:'haridwar',  name:'Haridwar',     hi:'हरिद्वार · ऋषिकेश', icon:'d-haridwar',  img:'1511754863001-18d44abd0a93',text:'Gateway to the Himalaya: Ganga Aarti at Har Ki Pauri, Rishikesh ashrams and ghats.', from:'By train or flight' },
  { id:'kedarnath', name:'Kedarnath',    hi:'केदारनाथ',            icon:'d-kedarnath', img:'p:12151764',             text:"Shiva's Himalayan jyotirlinga at 3583m — heli or the sacred trek to the snow shrine.", from:'Heli/trek, Gaurikund' },
  { id:'badrinath', name:'Badrinath',    hi:'बद्रीनाथ',            icon:'d-badrinath', img:'p:28933384',             text:"Badri Vishal's shrine in the Alaknanda valley — one of the Char Dhams at 3133m.", from:'By road from Rishikesh' },
  { id:'amritsar',  name:'Amritsar',     hi:'अमृतसर',              icon:'d-amritsar',  img:'p:5458388',             text:'Harmandir Sahib (Golden Temple) — the spiritual centre of the Sikh faith, glowing on the sarovar.', from:'By flight or train' },
  { id:'tirupati',  name:'Tirupati',     hi:'तिरुपति · बालाजी',   icon:'d-tirupati',  img:'p:28310432',            text:'Tirumala Venkateswara — the most visited pilgrimage on Earth, atop the Seshachalam hills.', from:'By flight to Tirupati' },
  { id:'shirdi',    name:'Shirdi',       hi:'शिर्डी',              icon:'d-shirdi',    img:'p:13444609',            text:"Sai Baba's samadhi mandir — millions visit for blessings of unity, faith and charity.", from:'Near Nashik / Pune' },
  { id:'pushkar',   name:'Pushkar',      hi:'पुष्कर',              icon:'d-pushkar',   img:'p:19160122',            text:"The only Brahma temple in the world, on Rajasthan's sacred Pushkar lake.", from:'Near Ajmer, Rajasthan' },
  { id:'dwaraka',   name:'Dwaraka',      hi:'द्वारका',              icon:'d-dwaraka',   img:'p:11325210',            text:"Krishna's legendary city on the Arabian Sea — Dwarkadhish temple and Bet Dwarka island.", from:'By train to Dwarka' },
  { id:'vaishno',   name:'Vaishno Devi', hi:'वैष्णो देवी',         icon:'d-vaishno',   img:'p:16660010',            text:"Mata Vaishno Devi's sacred cave in the Trikuta hills — one of India's holiest shrines.", from:'Katra base camp, J&K' },
  { id:'gaya',      name:'Gaya',         hi:'गया · बोधगया',        icon:'d-gaya',      img:'p:6480363',             text:"Vishnupad temple for pind daan, and Bodh Gaya's Mahabodhi tree where the Buddha attained enlightenment.", from:'~2.5 hrs from Kashi' },
]

/* India map: x = (lon-67)*10, y = (37-lat)*10 — viewBox 310×300 */
const CITY_POS = {
  kashi:[163,117], ayodhya:[152,102], prayagraj:[143,121],
  ujjain:[88,138], vrindavan:[108,95], haridwar:[108,76],
  kedarnath:[119,63], badrinath:[126,63], amritsar:[82,54],
  tirupati:[124,234], shirdi:[75,172], pushkar:[76,105],
  dwaraka:[20,148], vaishno:[79,40], gaya:[183,122],
}
const INDIA_PTS = '70,50 90,20 140,30 175,60 220,85 290,100 255,148 215,190 195,225 175,255 155,275 120,290 105,275 85,255 75,228 65,192 65,178 60,165 45,158 20,148 20,132 55,118 45,98 60,62'

const COMBOS = [
  { label:'Teerth Circuit', ids:['kashi','prayagraj','ayodhya'],             tag:'3 dhams' },
  { label:'Char Dham',      ids:['haridwar','kedarnath','badrinath','kashi'], tag:'4 dhams' },
  { label:'Krishna Yatra',  ids:['vrindavan','dwaraka','pushkar'],            tag:'3 dhams' },
  { label:'Jyotirlinga',    ids:['kashi','ujjain','kedarnath'],               tag:'3 dhams' },
  { label:'North India',    ids:['kashi','ayodhya','amritsar','haridwar'],    tag:'4 dhams' },
]

const CIRCUITS = [
  { t:'Kashi Darshan',    d:'1 day',  r:['Kashi'],                                    img:'1665413791167-6718dcf36773', p:'₹2,499',    text:'Vishwanath darshan, sunrise boat, old-city walk and the evening Ganga Aarti.',                          pkg:'Kashi Darshan (1 Day)' },
  { t:'Spiritual Retreat',d:'3 days', r:['Kashi'],                                    img:'1599831069477-b2acdc0bcb91', p:'₹12,500',   text:'Rudrabhishek puja, meditation on the ghats, the temple trail and a Banarasi food walk.',           pkg:'Kashi Spiritual Retreat (3 Days)', tag:'Most loved' },
  { t:'Teerth Circuit',   d:'5 days', r:['Kashi','Prayagraj','Ayodhya'],              img:'1674358596018-5b768ca9cfd1', p:'₹18,999',   text:'Kashi darshan, holy dip at the Sangam and Ram Janmabhoomi, all by private cab.',                   pkg:'Kashi–Prayagraj–Ayodhya (5 Days)', tag:'Tri-dham' },
  { t:'Char Dham Lite',   d:'7 days', r:['Haridwar','Kedarnath','Badrinath','Kashi'], img:'p:12151764', p:'On request', text:'Ganga Aarti at Haridwar, Kedarnath by heli, Badrinath darshan and final blessings in Kashi.',    pkg:'Char Dham Lite (7 Days)', tag:'Popular' },
  { t:'Mahakal Yatra',    d:'3 days', r:['Ujjain','Omkareshwar'],                     img:'1658730458768-8b8cc0c00955', p:'On request', text:'Mahakaleshwar darshan, Bhasma Aarti booking help, the Kshipra ghats and Omkareshwar.',           pkg:'Ujjain Mahakal & Omkareshwar (3 Days)' },
  { t:'Braj Yatra',       d:'3 days', r:['Mathura','Vrindavan','Govardhan'],          img:'1662376107358-21296a9234f1', p:'On request', text:'Krishna Janmabhoomi, Banke Bihari, Prem Mandir and the Govardhan parikrama.',                   pkg:'Braj Yatra: Mathura–Vrindavan (3 Days)' },
]

export default function TravelItinerary() {
  useEffect(() => {
    const $ = s => document.querySelector(s)
    const $$ = s => [...document.querySelectorAll(s)]
    const P = (id, w) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
    const im = (id, w, alt, lazy = true) => {
      const src = id.startsWith('p:') ? P(id.slice(2), w) : U(id, w)
      return `<img src="${src}" alt="${alt}"${lazy ? ' loading="lazy"' : ''} onerror="this.remove()">`
    }

    /* ── state ── */
    const state = { cities: new Set(), svcs: new Set(), step: 1 }

    /* ── city picker ── */
    $('#cityPick').innerHTML = DHAMS.map(d =>
      `<button type="button" class="cp" data-v="${d.id}" title="${d.name}">
        <div class="cp-img ph">${im(d.img, 400, d.name)}</div>
        <div class="cp-info">
          <b>${d.name}</b>
          <small>${d.hi.split(' · ')[0]}</small>
        </div>
      </button>`
    ).join('')

    /* ── combo chips ── */
    $('#combos').innerHTML = COMBOS.map(c =>
      `<button type="button" class="combo" data-ids="${c.ids.join(',')}">${c.label} <em>${c.tag}</em></button>`
    ).join('')

    $$('.combo').forEach(b => b.onclick = () => {
      const ids = b.dataset.ids.split(',')
      state.cities.clear()
      ids.forEach(id => state.cities.add(id))
      syncPick()
      err('')
      document.getElementById('svcRow')?.scrollIntoView({ behavior:'smooth', block:'nearest' })
    })

    function syncPick() {
      $$('.cp').forEach(b => b.classList.toggle('on', state.cities.has(b.dataset.v)))
      $$('.sp').forEach(b => b.classList.toggle('on', state.svcs.has(b.dataset.v)))
      updateSelectedInfo()
      updateTicket()
      /* pulse Next when both cities + services are chosen */
      const ready = state.cities.size > 0 && state.svcs.size > 0
      $('#next').classList.toggle('pulse', ready && state.step === 1)
    }

    $$('.cp').forEach(b => b.onclick = () => {
      state.cities.has(b.dataset.v) ? state.cities.delete(b.dataset.v) : state.cities.add(b.dataset.v)
      syncPick(); err('')
    })

    $$('.sp').forEach(b => b.onclick = () => {
      state.svcs.has(b.dataset.v) ? state.svcs.delete(b.dataset.v) : state.svcs.add(b.dataset.v)
      syncPick(); err('')
    })

    /* ── selected city info cards ── */
    function updateSelectedInfo() {
      const selected = DHAMS.filter(d => state.cities.has(d.id))
      const el = $('#selectedInfo')
      if (!selected.length) { el.innerHTML = ''; el.style.display = 'none'; return }
      el.style.display = 'flex'
      el.innerHTML = selected.map(d =>
        `<div class="si-card">
          <b>${d.name}</b>
          <span class="si-from">${d.from}</span>
        </div>`
      ).join('')
    }

    /* ── wizard steps (2 steps) ── */
    const TITLES = {
      1: ['Where does your yatra go?', 'Pick your dhams and what you need — combos above make it instant.'],
      2: ['Almost there!',             'Just dates, group size and your contact — done in seconds.'],
    }

    function setStep(n) {
      state.step = n
      $('#next').classList.remove('pulse')
      $$('.stepp').forEach(s => s.classList.toggle('on', +s.dataset.step === n))
      $$('.sb').forEach(s => {
        const k = +s.dataset.s
        s.classList.toggle('on', k === n)
        s.classList.toggle('done', k < n)
        s.querySelector('i').textContent = k < n ? '✓' : k
      })
      $('#wzTitle').textContent = TITLES[n][0]
      $('#wzSub').textContent   = TITLES[n][1]
      $('#back').style.visibility = n > 1 ? 'visible' : 'hidden'
      $('#next').textContent = n < 2 ? 'Next →' : 'Get my Yatra Pass 🙏'
      err('')
    }

    function err(t) { $('#err').textContent = t }

    function validStep(n) {
      if (n === 1) {
        if (!state.cities.size) return err('Please choose at least one dham.'), false
        if (!state.svcs.size)   return err('Please choose at least one service.'), false
      }
      if (n === 2) {
        const d = $('#startDate'), nm = $('#name'), ph = $('#phone')
        if (!d.value)                                return err('Please add a start date.'), d.focus(), false
        if (!nm.value.trim())                        return err('Please add your name.'), nm.focus(), false
        if (!ph.checkValidity() || !ph.value.trim()) return err('Please add a valid phone number.'), ph.focus(), false
      }
      return true
    }

    $('#next').onclick = () => {
      if (!validStep(state.step)) return
      if (state.step < 2) { setStep(state.step + 1); scrollWiz() }
      else submit()
    }
    $('#back').onclick = () => { if (state.step > 1) { setStep(state.step - 1); scrollWiz() } }

    function scrollWiz() {
      if (innerWidth < 1060) $('#wizard').scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    $$('.counter button').forEach(b => b.onclick = () => {
      const i = $('#pax')
      i.value = Math.max(1, (parseInt(i.value) || 1) + +b.dataset.c)
      updateTicket()
    })

    $('#startDate').min = new Date().toISOString().slice(0, 10)
    $('#yf').addEventListener('input', updateTicket)
    $('#yf').addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); $('#next').click() }
    })

    /* ── live ticket ── */
    function updateTicket() {
      const names = DHAMS.filter(d => state.cities.has(d.id)).map(d => d.name)
      if (!names.length) {
        $('#tRoute').innerHTML = '<span class="empty">Choose your dhams…</span>'
      } else if (names.length <= 3) {
        $('#tRoute').innerHTML = names.map(n => `<span class="c">${n}</span>`).join('<span class="arr">→</span>')
      } else {
        const shown = names.slice(0, 2)
        $('#tRoute').innerHTML = shown.map(n => `<span class="c">${n}</span>`).join('<span class="arr">→</span>')
          + `<span class="arr">→</span><span class="more-c">+${names.length - 2} more</span>`
      }
      const dt = $('#startDate').value
      $('#tDate').textContent  = dt ? new Date(dt + 'T00:00').toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—'
      $('#tDays').textContent  = $('#days').value
      $('#tPax').textContent   = $('#pax').value || '—'
      $('#tName').textContent  = $('#name').value.trim() || 'Yatri'
      $('#tPhone').textContent = $('#phone').value.trim() || '—'
      $$('#tSvcs span').forEach(s => s.classList.toggle('on', state.svcs.has(s.dataset.v)))
    }

    /* ── submit ── */
    function submit() {
      const svcNames = { tour:'Tour package', cab:'Cab', boat:'Boat', hotel:'Hotel' }
      const L = [
        'Namaste Yatra Ke Saathi 🙏',
        '— Custom Yatra Enquiry —',
        'Dhams: ' + DHAMS.filter(d => state.cities.has(d.id)).map(d => d.name).join(' → '),
        'Services: ' + [...state.svcs].map(s => svcNames[s] || s).join(', '),
      ]
      $('#yf').querySelectorAll('input,select,textarea').forEach(el => {
        if (el.name && String(el.value).trim()) L.push(`${el.name}: ${el.value}`)
      })
      $('#waLink').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(L.join('\n'))}`
      $('#yf').style.display = 'none'
      $('#done').classList.add('on')
      $('#tStamp').classList.add('on')
    }

    $('#restart').onclick = () => {
      $('#yf').reset()
      state.cities.clear(); state.svcs.clear()
      syncPick()
      $('#yf').style.display = ''
      $('#done').classList.remove('on')
      $('#tStamp').classList.remove('on')
      setStep(1)
    }

    /* ── service quick-pick passes ── */
    $$('.pass').forEach(b => b.onclick = () => {
      state.svcs.add(b.dataset.svc)
      if (!state.cities.size) state.cities.add('kashi')
      syncPick()
      $('#wizard').scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    /* ── circuit cards ── */
    $('#circuitGrid').innerHTML = CIRCUITS.map((c, i) =>
      `<article class="cc reveal${i % 3 ? ' d' + (i % 3) : ''}">
        <div class="img ph">${im(c.img, 700, c.t)}<span class="days">${c.d}</span>${c.tag ? `<span class="tag">${c.tag}</span>` : ''}</div>
        <div class="body">
          <h3>${c.t}</h3>
          <div class="mini-route">${c.r.map(x => `<span>${x}</span>`).join('')}${c.r.length > 3 ? `<span class="r-more">+${c.r.length-3} more</span>` : ''}</div>
          <div class="row">
            <span class="price">${c.p.startsWith('₹') ? c.p + ' <small>/ person</small>' : `<span class="on-req">${c.p}</span>`}</span>
            <button data-pick="${c.pkg}">Enquire</button>
          </div>
        </div>
      </article>`
    ).join('')

    $$('[data-pick]').forEach(b => b.onclick = () => {
      const map = {
        Ujjain:'ujjain', Mathura:'vrindavan', Prayagraj:'prayagraj', Ayodhya:'ayodhya',
        Kashi:'kashi', Sarnath:'kashi', Haridwar:'haridwar', Kedarnath:'kedarnath',
        Badrinath:'badrinath', Amritsar:'amritsar', Tirupati:'tirupati', Shirdi:'shirdi',
        Govardhan:'vrindavan',
      }
      const c = CIRCUITS.find(x => x.pkg === b.dataset.pick)
      state.svcs.add('tour')
      state.cities.clear()
      ;(c ? c.r : ['Kashi']).forEach(r => map[r] && state.cities.add(map[r]))
      if (!state.cities.size) state.cities.add('kashi')
      syncPick()
      setStep(1)
      $('#planner').scrollIntoView({ behavior: 'smooth' })
    })

    /* ── reveal observer ── */
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return
      e.target.classList.add('in')
      io.unobserve(e.target)
    }), { threshold: .1 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))

    setStep(1)
    updateTicket()

    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* ── SVG defs ── */}
      <svg width="0" height="0" style={{ position:'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="d-kashi"     viewBox="0 0 40 40"><g className="ico"><path d="M20 37V12"/><path d="M11 7c0 6 3.5 9.5 9 9.5S29 13 29 7"/><path d="M20 3l-2.5 5h5z"/><path d="M11 7l-1.5 3M29 7l1.5 3"/><path d="M16 25l8 4M16 29l8-4"/></g></symbol>
          <symbol id="d-ayodhya"   viewBox="0 0 40 40"><g className="ico"><path d="M13 4c11 7 11 25 0 32"/><path d="M13 4v32"/><path d="M6 20h29"/><path d="M31 16l4 4-4 4"/><path d="M6 17l3 3-3 3"/></g></symbol>
          <symbol id="d-prayag"    viewBox="0 0 40 40"><g className="ico"><path d="M4 30q4-3 8 0t8 0 8 0 8 0"/><path d="M4 35q4-3 8 0t8 0 8 0 8 0"/><path d="M8 24c5-3 8-8 12-8M32 24c-5-3-8-8-12-8M20 24v-8"/><path d="M20 16V4l8 3-8 3"/></g></symbol>
          <symbol id="d-ujjain"    viewBox="0 0 40 40"><g className="ico"><path d="M8 32h24M5 36h30"/><path d="M13 32c0-11 3-17 7-17s7 6 7 17"/><path d="M16 22h8M16.5 25h7M17 28h6"/><circle cx="20" cy="19" r="1"/><path d="M20 4v6M17 7h6"/></g></symbol>
          <symbol id="d-vrindavan" viewBox="0 0 40 40"><g className="ico"><path d="M5 35L31 9"/><circle cx="12" cy="28" r="1"/><circle cx="16" cy="24" r="1"/><circle cx="20" cy="20" r="1"/><path d="M28 12c2-6 7-8 9-7-1 2-3 7-9 9"/><path d="M31 10c1-1 2.5-1.5 3-1.2"/></g></symbol>
          <symbol id="d-haridwar"  viewBox="0 0 40 40"><g className="ico"><path d="M14 15h12"/><path d="M13 15c-5 4-6 11-2 16 3 4 15 4 18 0 4-5 3-12-2-16"/><path d="M16 15c0-3 1.5-5 4-6 2.5 1 4 3 4 6"/><path d="M12 9c3 1 5 .5 8-2 3 2.5 5 3 8 2"/><path d="M14 36h12M15 24h10"/></g></symbol>
          <symbol id="d-kedarnath" viewBox="0 0 40 40"><g className="ico"><path d="M4 34l8-14 4 5 4-10 8 5 8 14z"/><path d="M20 20v-5M18 17h4"/><circle cx="20" cy="5" r="1.5"/><path d="M20 7v8"/></g></symbol>
          <symbol id="d-badrinath" viewBox="0 0 40 40"><g className="ico"><path d="M3 35l9-16 4 6 4-12 4 6 5-8 8 24z"/><path d="M20 19a3 3 0 0 1 0-6M20 13V6"/><path d="M18 7l2-3 2 3"/></g></symbol>
          <symbol id="d-amritsar"  viewBox="0 0 40 40"><g className="ico"><path d="M13 36V25c0-4 3-6 7-6s7 2 7 6v11"/><path d="M20 19V11"/><path d="M16 15a4 4 0 0 1 8 0"/><path d="M20 11l-2 2h4z"/><path d="M8 36h24"/><path d="M6 25c0-8 6-11 14-11s14 3 14 11"/><path d="M15 25h10"/></g></symbol>
          <symbol id="d-tirupati"  viewBox="0 0 40 40"><g className="ico"><path d="M12 36V22h16v14"/><path d="M11 22l9-5 9 5"/><path d="M13 18l7-4 7 4"/><path d="M15 14l5-3 5 3"/><path d="M17 11l3-2 3 2"/><path d="M19 9l1-2 1 2"/><path d="M9 36h22"/></g></symbol>
          <symbol id="d-shirdi"    viewBox="0 0 40 40"><g className="ico"><path d="M10 36V22h20v14"/><path d="M10 22l10-9 10 9"/><path d="M16 36v-9a4 4 0 0 1 8 0v9"/><path d="M20 4v5M17 6h6"/><circle cx="20" cy="4" r="1.5"/></g></symbol>
          <symbol id="d-pushkar"   viewBox="0 0 40 40"><g className="ico"><path d="M4 30q4-2 8 0t8 0 8 0 8 0M4 35q4-2 8 0t8 0 8 0 8 0"/><path d="M20 30v-9"/><path d="M20 21c0-3 3-7 3-7s-3 2-3 7M20 21c0-3-3-7-3-7s3 2 3 7"/><path d="M16 18c-2-1-4-5-4-5s0 3 4 6"/><path d="M24 18c2-1 4-5 4-5s0 3-4 6"/></g></symbol>
          <symbol id="d-dwaraka"   viewBox="0 0 40 40"><g className="ico"><path d="M4 33q4-3 8 0t8 0 8 0 8 0M4 37q4-3 8 0t8 0 8 0 8 0"/><path d="M14 33V21h12v12"/><path d="M13 21l7-5 7 5"/><path d="M20 16V7"/><path d="M18 9l2-3 2 3"/></g></symbol>
          <symbol id="d-vaishno"   viewBox="0 0 40 40"><g className="ico"><path d="M3 36l9-14 4 6 4-10 5 6 5-10 7 22z"/><path d="M20 7v4M17 8h6M19 7l-1-2M21 7l1-2"/></g></symbol>
          <symbol id="d-gaya"      viewBox="0 0 40 40"><g className="ico"><path d="M20 36V20"/><path d="M20 24c-3-2-7-7-5-13 2 3 5 8 5 13M20 24c3-2 7-7 5-13-2 3-5 8-5 13"/><path d="M20 28c-2-1-5-5-4-9 1 2 4 5 4 9M20 28c2-1 5-5 4-9-1 2-4 5-4 9"/><path d="M14 36h12M16 33h8"/></g></symbol>
          <symbol id="s-tour"   viewBox="0 0 40 40"><g className="ico"><path d="M20 3v4M20 7l5 2-5 2M10 36V22c0-6 4-10 10-15 6 5 10 9 10 15v14M6 36h28M17 36v-6a3 3 0 0 1 6 0v6M14 22h12"/></g></symbol>
          <symbol id="s-cab"    viewBox="0 0 40 40"><g className="ico"><path d="M6 27v-6c0-2 1.5-4 4-4h20c2.5 0 4 2 4 4v6zM10 17l3-6h14l3 6M16 8h8"/><circle cx="12" cy="28" r="3.2"/><circle cx="28" cy="28" r="3.2"/></g></symbol>
          <symbol id="s-boat"   viewBox="0 0 40 40"><g className="ico"><path d="M3 23h34c-2.5 6-8 8.5-17 8.5S5.5 29 3 23zM20 23V8M20 8l7 13M20 8l-7 13M6 35q3-1.6 6 0t6 0 6 0 6 0 6 0"/></g></symbol>
          <symbol id="s-hotel"  viewBox="0 0 40 40"><g className="ico"><path d="M7 35V16h26v19M4 16h32M20 5l9 7H11zM16.5 35v-6a3.5 3.5 0 0 1 7 0v6M11 21h4v4h-4zM25 21h4v4h-4z"/></g></symbol>
          <symbol id="kalash"   viewBox="0 0 40 40"><g className="ico" strokeWidth="2"><path d="M14 16h12"/><path d="M13 16c-5 4-6 11-2 15 3 4 15 4 18 0 4-4 3-11-2-15"/><path d="M16 16c0-3 1.5-5 4-6 2.5 1 4 3 4 6"/><path d="M11 9c3 1 6 .5 9-3 3 3.5 6 4 9 3"/><circle cx="20" cy="4" r="1.5"/><path d="M13 24h14"/></g></symbol>
          <symbol id="foot"     viewBox="0 0 18 24"><g fill="currentColor"><ellipse cx="9" cy="15" rx="5" ry="8"/><circle cx="4.5" cy="4.5" r="1.8"/><circle cx="8" cy="2.6" r="2"/><circle cx="11.6" cy="3.4" r="1.7"/><circle cx="14.2" cy="5.6" r="1.4"/></g></symbol>
          <symbol id="i-wa"     viewBox="0 0 32 32"><path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></symbol>
          <symbol id="stamp"    viewBox="0 0 100 100">
            <defs><path id="sc" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0"/></defs>
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3"/>
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <text fontFamily="Hind" fontSize="9.5" fontWeight="600" letterSpacing="2" fill="currentColor"><textPath href="#sc">YATRA KE SAATHI · ENQUIRY ·</textPath></text>
            <text x="50" y="56" textAnchor="middle" fontFamily="Eczar" fontWeight="700" fontSize="15" fill="currentColor">शुभ यात्रा</text>
          </symbol>
        </defs>
      </svg>

      {/* ── topbar ── */}
      <div className="topbar">
        <div className="wrap">
          <span>॥ हर हर महादेव ॥ &nbsp; जय श्री राम &nbsp; ॥ जय महाकाल ॥</span>
          <a href={`tel:+${WHATSAPP_NUMBER}`}>+91 92774 72279</a>
        </div>
      </div>

      {/* ── nav ── */}
      <header className="nav">
        <div className="wrap nav-in">
          <a href="/" className="logo">
            <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height:'52px', width:'auto', display:'block' }} />
          </a>
          <a href="/" className="back-link">← Back to home</a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste! I want to plan a yatra.')}`}
            target="_blank" rel="noopener"
            className="btn"
          >Plan on WhatsApp</a>
        </div>
      </header>

      <main>
        {/* ── page hero ── */}
        <div className="pg-hero">
          <div className="wrap">
            <div className="eyebrow">
              <svg viewBox="0 0 40 40"><use href="#kalash" /></svg>
              Yatra Pass · यात्रा पत्र
            </div>
            <h1>Plan your <span>custom yatra</span> in two steps</h1>
            <p>Choose your dhams and services — we build the plan and send you pricing on WhatsApp.</p>
            <div className="foot-trail" aria-hidden="true">
              {[0,1,2,3,4].map(i => <svg key={i} viewBox="0 0 18 24"><use href="#foot" /></svg>)}
            </div>
          </div>
        </div>

        {/* ── service quick-pick passes ── */}
        <div className="wrap">
          <div className="passes reveal">
            <button className="pass" data-svc="tour">
              <span className="ic"><svg viewBox="0 0 40 40"><use href="#s-tour" /></svg></span>
              <span><b>Tour Package</b><small>Darshan &amp; sightseeing</small></span>
              <span className="go">→</span>
            </button>
            <button className="pass" data-svc="cab">
              <span className="ic"><svg viewBox="0 0 40 40"><use href="#s-cab" /></svg></span>
              <span><b>Cab</b><small>City &amp; intercity</small></span>
              <span className="go">→</span>
            </button>
            <button className="pass" data-svc="boat">
              <span className="ic"><svg viewBox="0 0 40 40"><use href="#s-boat" /></svg></span>
              <span><b>Boat</b><small>Ganga, Sangam, Saryu</small></span>
              <span className="go">→</span>
            </button>
            <button className="pass" data-svc="hotel">
              <span className="ic"><svg viewBox="0 0 40 40"><use href="#s-hotel" /></svg></span>
              <span><b>Hotel</b><small>Stays near the temples</small></span>
              <span className="go">→</span>
            </button>
          </div>
        </div>

        {/* ── planner: wizard + ticket ── */}
        <section id="planner" style={{ paddingTop:'48px' }}>
          <div className="wrap">
            <div className="planner">

              {/* wizard */}
              <div className="wizard reveal" id="wizard">
                <div className="wz-top">
                  <h3 id="wzTitle">Where does your yatra go?</h3>
                  <p id="wzSub">Pick your dhams and what you need — combos above make it instant.</p>
                  <div className="steps-bar">
                    <div className="sb on" data-s="1"><i>1</i><span>Yatra</span></div>
                    <div className="sb-line"></div>
                    <div className="sb" data-s="2"><i>2</i><span>Details</span></div>
                  </div>
                </div>

                <form id="yf" noValidate>
                  <div className="wz-body">

                    {/* step 1 */}
                    <div className="stepp on" data-step="1">
                      <div className="q">Popular routes <small>tap to fill instantly</small></div>
                      <div className="combos" id="combos"></div>

                      <div className="q" style={{ marginTop:'22px' }}>Dhams to visit <small>choose any</small></div>
                      <div className="city-pick" id="cityPick"></div>

                      <div className="selected-info" id="selectedInfo" style={{ display:'none' }}></div>

                      <div className="q" id="svcRow" style={{ marginTop:'6px' }}>Services needed <small>choose any</small></div>
                      <div className="svc-pick">
                        <button type="button" className="sp" data-v="tour"><svg viewBox="0 0 40 40"><use href="#s-tour" /></svg><b>Tour</b></button>
                        <button type="button" className="sp" data-v="cab"><svg viewBox="0 0 40 40"><use href="#s-cab" /></svg><b>Cab</b></button>
                        <button type="button" className="sp" data-v="boat"><svg viewBox="0 0 40 40"><use href="#s-boat" /></svg><b>Boat</b></button>
                        <button type="button" className="sp" data-v="hotel"><svg viewBox="0 0 40 40"><use href="#s-hotel" /></svg><b>Hotel</b></button>
                      </div>
                    </div>

                    {/* step 2 — details + contact combined */}
                    <div className="stepp" data-step="2">
                      <div className="grid-f">
                        <div>
                          <label htmlFor="startDate">Start date <span className="r">*</span></label>
                          <input type="date" id="startDate" name="Start date" required />
                        </div>
                        <div>
                          <label htmlFor="days">Duration</label>
                          <select id="days" name="Days" defaultValue="2">
                            <option>1</option><option>2</option><option>3</option><option>4</option>
                            <option>5</option><option>6–7</option><option>8+</option>
                          </select>
                        </div>
                        <div>
                          <label>Yatris</label>
                          <div className="counter">
                            <button type="button" data-c="-1" aria-label="Fewer">−</button>
                            <input id="pax" name="Yatris" defaultValue="2" inputMode="numeric" aria-label="Number of yatris" />
                            <button type="button" data-c="1" aria-label="More">+</button>
                          </div>
                        </div>
                        <div className="w2">
                          <label htmlFor="name">Your name <span className="r">*</span></label>
                          <input id="name" name="Name" required autoComplete="name" placeholder="Full name" />
                        </div>
                        <div>
                          <label htmlFor="phone">Phone / WhatsApp <span className="r">*</span></label>
                          <input id="phone" name="Phone" type="tel" required pattern="[0-9+\s\-]{10,15}" autoComplete="tel" placeholder="+91" />
                        </div>
                        <div className="w3">
                          <label htmlFor="msg">Anything we should know? <span className="opt">optional</span></label>
                          <textarea id="msg" name="Message" placeholder="Elders / kids, special puja, arriving from, food preferences…"></textarea>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="wz-foot">
                    <button type="button" className="btn ghost" id="back" style={{ visibility:'hidden' }}>← Back</button>
                    <span className="err" id="err" role="alert"></span>
                    <button type="button" className="btn" id="next">Next →</button>
                  </div>
                </form>

                {/* done state */}
                <div className="wz-done" id="done" role="status">
                  <svg className="big" viewBox="0 0 100 100"><use href="#stamp" /></svg>
                  <h3>Dhanyavaad! 🙏</h3>
                  <p style={{ color:'var(--ink-soft)' }}>Your Yatra Pass is ready. Send it to us on WhatsApp and we'll reply with a plan and price.</p>
                  <div className="row">
                    <a className="btn wa" id="waLink" target="_blank" rel="noopener">
                      <svg viewBox="0 0 32 32"><use href="#i-wa" /></svg>
                      Send on WhatsApp
                    </a>
                    <button className="btn ghost" id="restart" type="button">Plan another</button>
                  </div>
                </div>
              </div>

              {/* Yatra Pass ticket */}
              <aside className="ticket reveal d1" aria-label="Your Yatra Pass preview">
                <div className="t-head">
                  <small>YATRA PASS · यात्रा पत्र</small>
                  <h4 id="tName">Yatri</h4>
                  <svg className="kal" viewBox="0 0 40 40"><use href="#kalash" /></svg>
                </div>
                <div className="t-route" id="tRoute">
                  <span className="empty">Choose your dhams…</span>
                </div>
                <div className="t-grid">
                  <div><small>Start</small><b id="tDate">—</b></div>
                  <div><small>Days</small><b id="tDays">2</b></div>
                  <div><small>Yatris</small><b id="tPax">2</b></div>
                  <div><small>Phone</small><b id="tPhone">—</b></div>
                </div>
                <div className="perf"></div>
                <div className="t-foot">
                  <div>
                    <small style={{ fontSize:'.7rem', letterSpacing:'.14em', color:'var(--ink-soft)' }}>SERVICES</small>
                    <div className="t-svcs" id="tSvcs">
                      <span data-v="tour" title="Tour"><svg viewBox="0 0 40 40"><use href="#s-tour" /></svg></span>
                      <span data-v="cab"  title="Cab"><svg viewBox="0 0 40 40"><use href="#s-cab" /></svg></span>
                      <span data-v="boat" title="Boat"><svg viewBox="0 0 40 40"><use href="#s-boat" /></svg></span>
                      <span data-v="hotel"title="Hotel"><svg viewBox="0 0 40 40"><use href="#s-hotel" /></svg></span>
                    </div>
                  </div>
                  <svg className="stamp" id="tStamp" viewBox="0 0 100 100"><use href="#stamp" /></svg>
                </div>
                <div className="barcode" aria-hidden="true"></div>
                <p className="note">This is an enquiry, not a booking. We confirm everything with you personally.</p>
              </aside>

            </div>
          </div>
        </section>

        {/* ── trust strip ── */}
        <div className="trust-strip reveal">
          <div className="wrap">
            <div className="trust-stats">
              <div className="ts"><span className="ts-n">600+</span><span className="ts-l">Yatras planned</span></div>
              <div className="ts-div"></div>
              <div className="ts"><span className="ts-n">4.9 ★</span><span className="ts-l">Average rating</span></div>
              <div className="ts-div"></div>
              <div className="ts"><span className="ts-n">Free</span><span className="ts-l">No planning fees</span></div>
              <div className="ts-div"></div>
              <div className="ts"><span className="ts-n">&lt; 2 hrs</span><span className="ts-l">WhatsApp reply</span></div>
            </div>
            <div className="trust-reviews">
              <div className="tr-card">
                <div className="tr-stars">★★★★★</div>
                <p>"Planned our Kashi–Ayodhya trip in one afternoon. The team arranged everything — cab, boat, hotel — exactly as we wanted."</p>
                <span>— Ramesh P., Pune</span>
              </div>
              <div className="tr-card">
                <div className="tr-stars">★★★★★</div>
                <p>"First time visiting Kedarnath. They handled the heli booking, hotel in Sitapur, and even the puja registration. Truly saathi."</p>
                <span>— Sunita &amp; family, Delhi</span>
              </div>
              <div className="tr-card">
                <div className="tr-stars">★★★★★</div>
                <p>"Went for Prayagraj Magh Mela. They arranged the tent camp near the Sangam, boat and all darshans. Zero stress for us."</p>
                <span>— Vikram S., Jaipur</span>
              </div>
            </div>
          </div>
        </div>

        <div className="scallop"></div>

        {/* ── circuit / package info cards ── */}
        <section className="kbg" style={{ paddingTop:'70px' }}>
          <div className="wrap">
            <div className="head reveal">
              <div>
                <span className="eyebrow"><svg viewBox="0 0 18 24"><use href="#foot" /></svg>Popular yatra circuits</span>
                <h2 className="title">Choose a <span>package</span> to start</h2>
                <p className="lead2">Pick any circuit and it fills the planner above automatically. Everything can be adjusted.</p>
              </div>
              <button
                className="btn ghost"
                onClick={() => document.querySelector('#planner')?.scrollIntoView({ behavior:'smooth' })}
              >Build a custom yatra</button>
            </div>
            <div className="circuits" id="circuitGrid"></div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ivory" style={{ paddingTop:'70px', paddingBottom:'80px' }}>
          <div className="wrap">
            <div className="center reveal" style={{ marginBottom:'40px' }}>
              <span className="eyebrow"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg>Common questions</span>
              <h2 className="title">Before you <span>enquire</span></h2>
            </div>
            <div className="faq-list reveal">
              <div className="faq-item">
                <div className="faq-q">Is the planning completely free?</div>
                <div className="faq-a">Yes — 100% free. We plan your yatra, suggest options and send you a quote. You pay only if you decide to book with us. No hidden charges, no obligation.</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">How quickly will I get a reply on WhatsApp?</div>
                <div className="faq-a">Usually within 2 hours during the day (9 am – 9 pm). For urgent requests, mention it in your message and we prioritise.</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Can I change or customise the plan after sending?</div>
                <div className="faq-a">Absolutely. The Yatra Pass is just a starting point. Once we speak on WhatsApp, you can adjust dates, add or remove stops, change the hotel budget — anything.</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Do you help with temple bookings like Bhasma Aarti or Rudrabhishek?</div>
                <div className="faq-a">Yes. We assist with special darshan slots, puja bookings (Rudrabhishek, Ganga pujan, pind daan), and Kedarnath heli slots — just mention it in your enquiry.</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">We are a large family group — can you handle that?</div>
                <div className="faq-a">Very much so. We regularly plan for groups of 10–40+ yatris, with Tempo Travellers, group hotels and coordinated darshan queues.</div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── WhatsApp FAB ── */}
      <a
        className="fab"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste! I want to plan a teerth yatra.')}`}
        target="_blank" rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32"><use href="#i-wa" /></svg>
      </a>
    </>
  )
}
