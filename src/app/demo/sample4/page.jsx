'use client'
import { useEffect } from 'react'
import './page.css'

export default function Sample4() {
  useEffect(() => {
    /* ======================= SETTINGS ======================= */
    const WHATSAPP_NUMBER = "910000000000"
    const U = (id, w=800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

    const DHAMS = [
      {id:"kashi", name:"Kashi", hi:"काशी · वाराणसी", icon:"d-kashi", img:"1561359313-0639aad49ca6",
       text:"The city of Shiva on the Ganga: Kashi Vishwanath darshan, 84 ghats and the evening Ganga Aarti.", best:"Oct – Mar", from:"Our home base"},
      {id:"ayodhya", name:"Ayodhya", hi:"अयोध्या", icon:"d-ayodhya", img:"1672398760212-08ce34b88c62",
       text:"The birthplace of Shri Ram: Ram Janmabhoomi, Hanuman Garhi and evening aarti on the Saryu.", best:"Oct – Mar", from:"~4–5 hrs from Kashi"},
      {id:"prayagraj", name:"Prayagraj", hi:"प्रयागराज", icon:"d-prayag", img:"1742316963892-2b6fee25dfc5",
       text:"Triveni Sangam, where the Ganga, the Yamuna and the unseen Saraswati meet. Take a holy dip by boat.", best:"Jan – Feb (Magh Mela)", from:"~3 hrs from Kashi"},
      {id:"ujjain", name:"Ujjain", hi:"उज्जैन", icon:"d-ujjain", img:"1658730487395-dcc99f5d997c",
       text:"Mahakaleshwar Jyotirlinga, the dawn Bhasma Aarti and the ghats of the Kshipra, with Omkareshwar nearby.", best:"Oct – Mar", from:"By train or flight"},
      {id:"vrindavan", name:"Vrindavan", hi:"वृन्दावन · मथुरा", icon:"d-vrindavan", img:"1742022165140-d890e51ae33b",
       text:"Krishna's Braj: Banke Bihari, Prem Mandir, Govardhan, and a Holi like nowhere else.", best:"Feb – Mar (Holi)", from:"By train or flight"},
      {id:"haridwar", name:"Haridwar", hi:"हरिद्वार · ऋषिकेश", icon:"d-haridwar", img:"1511754863001-18d44abd0a93",
       text:"Gateway to the Himalaya: Ganga Aarti at Har Ki Pauri, with Rishikesh's ashrams and ghats close by.", best:"Sep – Apr", from:"By train or flight"}
    ]

    const CIRCUITS = [
      {t:"Kashi Darshan", d:"1 day", r:["Kashi"], img:"1665413791167-6718dcf36773", p:"₹2,499", text:"Vishwanath darshan, sunrise boat, old-city walk and the evening Ganga Aarti.", pkg:"Kashi Darshan (1 Day)"},
      {t:"Kashi + Sarnath", d:"2 days", r:["Kashi","Sarnath"], img:"1649876674933-a5b3b39b4da1", p:"₹6,999", text:"Everything in Kashi Darshan, plus the Dhamek Stupa, the deer park and 1 night's stay.", pkg:"Kashi + Sarnath (2 Days)"},
      {t:"Spiritual Retreat", d:"3 days", r:["Kashi"], img:"1599831069477-b2acdc0bcb91", p:"₹12,500", text:"Rudrabhishek puja, meditation on the ghats, the temple trail and a Banarasi food walk.", pkg:"Kashi Spiritual Retreat (3 Days)", tag:"Most loved"},
      {t:"Teerth Circuit", d:"5 days", r:["Kashi","Prayagraj","Ayodhya"], img:"1674358596018-5b768ca9cfd1", p:"₹18,999", text:"Kashi darshan, a holy dip at the Sangam and Ram Janmabhoomi, all by private cab.", pkg:"Kashi–Prayagraj–Ayodhya (5 Days)", tag:"Tri-dham"},
      {t:"Mahakal Yatra", d:"3 days", r:["Ujjain","Omkareshwar"], img:"1658730458768-8b8cc0c00955", p:"On request", text:"Mahakaleshwar darshan, help booking the Bhasma Aarti, the Kshipra ghats and Omkareshwar.", pkg:"Ujjain Mahakal & Omkareshwar (3 Days)"},
      {t:"Braj Yatra", d:"3 days", r:["Mathura","Vrindavan","Govardhan"], img:"1662376107358-21296a9234f1", p:"On request", text:"Krishna Janmabhoomi, Banke Bihari, Prem Mandir and the Govardhan parikrama.", pkg:"Braj Yatra: Mathura–Vrindavan (3 Days)"}
    ]

    const GHATS = [
      ["Assi Ghat","अस्सी घाट","Southern end, where the Assi meets the Ganga. Mornings start with Subah-e-Banaras."],
      ["Tulsi Ghat","तुलसी घाट","Linked with Tulsidas and the Ramcharitmanas. Home to the Nag Nathaiya festival."],
      ["Harishchandra Ghat","हरिश्चंद्र घाट","One of two cremation ghats. Visit quietly and respectfully, without cameras."],
      ["Kedar Ghat","केदार घाट","Striped red-and-white steps and the Kedareshwar temple."],
      ["Dashashwamedh Ghat","दशाश्वमेध घाट","The heart of Kashi and home to the grand evening Ganga Aarti."],
      ["Manikarnika Ghat","मणिकर्णिका घाट","The main cremation ghat, whose fires are said never to go out. Best seen from a boat."],
      ["Panchganga Ghat","पंचगंगा घाट","Where five rivers are believed to meet. In Kartik, lamps are raised on tall poles."],
      ["Namo Ghat","नमो घाट","The new riverfront at the northern end, near Raj Ghat. Good at sunset."]
    ]

    const FESTS = [
      {m:"Oct – Nov",n:"Dev Deepawali",w:"Kashi",img:"1635192592106-77a5aacbe1a3",t:"On Kartik Purnima every ghat glows with lamps."},
      {m:"Oct – Nov",n:"Deepotsav",w:"Ayodhya",img:"1605292356183-a77d0a9c9d1d",t:"On Diwali, the banks of the Saryu are lit with lakhs of diyas."},
      {m:"Jan – Feb",n:"Magh Mela & Kumbh",w:"Prayagraj",img:"1742316963892-2b6fee25dfc5",t:"Every year at the Sangam; the Kumbh comes on a longer cycle."},
      {m:"Feb – Mar",n:"Mahashivratri",w:"Ujjain · Kashi",img:"1627894483216-2138af692e32",t:"The great night of Shiva, with all-night darshan at Mahakal and Vishwanath."},
      {m:"Feb – Mar",n:"Holi of Braj",w:"Vrindavan · Mathura",img:"1742022165140-d890e51ae33b",t:"Phoolon wali and Lathmar Holi, celebrated over many days."},
      {m:"May – Jun",n:"Ganga Dussehra",w:"Haridwar · Kashi",img:"1705952484283-19c31e37e0e4",t:"Celebrates Ganga's descent to earth with holy dips and a grand aarti."}
    ]

    const TESTIMONIALS = [
      {text:"The aarti boat, the cab from the station and the hotel near the ghat were all sorted with one call. Our parents felt completely looked after.",name:"Guest name",trip:"City · Kashi Spiritual Retreat",sample:true},
      {text:"Kashi, Prayagraj and Ayodhya in five days without a single worry. The driver knew every temple's timings.",name:"Guest name",trip:"City · Teerth Circuit",sample:true},
      {text:"They helped us plan Ujjain around the Bhasma Aarti and booked a stay walking distance from Mahakal.",name:"Guest name",trip:"City · Mahakal Yatra",sample:true},
      {text:"We came for Dev Deepawali and they had a boat and a terrace room ready weeks ahead. Unforgettable.",name:"Guest name",trip:"City · Festival trip",sample:true}
    ]

    const GALLERY = [
      ["1627894483216-2138af692e32","Ganga Aarti, Kashi"],
      ["1658730487395-dcc99f5d997c","Mahakal, Ujjain"],
      ["1672398760212-08ce34b88c62","Ayodhya"],
      ["1674358596018-5b768ca9cfd1","Sangam, Prayagraj"],
      ["1511754863001-18d44abd0a93","Haridwar"],
      ["1742022165140-d890e51ae33b","Holi in Braj"],
      ["1571536802807-30451e3955d8","Morning boats, Kashi"]
    ]

    const $ = s => document.querySelector(s)
    const $$ = s => document.querySelectorAll(s)
    const im = (id, w, alt, lazy=true) => `<img src="${U(id,w)}" alt="${alt}"${lazy?' loading="lazy"':''} onerror="this.remove()">`

    /* Hero dham selector */
    let dIdx = 0, dTimer

    $("#slides").innerHTML = DHAMS.map((d,i) =>
      `<div class="slide ph${i===0?" on":""}">${im(d.img,1800,d.name,i>0)}</div>`
    ).join("")

    $("#stops").insertAdjacentHTML("beforeend", DHAMS.map((d,i) =>
      `<button class="stop" data-i="${i}"><span class="dot"><svg viewBox="0 0 40 40"><use href="#${d.icon}"/></svg></span><b>${d.name}</b><small>${d.hi.split(" · ")[0]}</small><span class="bar"><i></i></span></button>`
    ).join(""))

    function showDham(i) {
      dIdx = i
      const d = DHAMS[i]
      $$(".slide").forEach((s,j) => s.classList.toggle("on", j===i))
      $$(".stop").forEach((s,j) => {
        s.classList.toggle("on", j===i)
        const b = s.querySelector(".bar i")
        b.style.animation = "none"
        b.offsetHeight
        b.style.animation = ""
      })
      const c = $("#dhamCard")
      c.classList.remove("swap")
      c.offsetHeight
      c.classList.add("swap")
      c.innerHTML = `<span class="di"><svg viewBox="0 0 40 40"><use href="#${d.icon}"/></svg></span><h3>${d.name}<small>${d.hi}</small></h3><p>${d.text}</p><div class="meta"><span>Best time: <b>${d.best}</b></span><span>${d.from}</span></div>`
      $("#heroPlan").textContent = `Plan a ${d.name} yatra`
      clearTimeout(dTimer)
      dTimer = setTimeout(() => showDham((dIdx+1) % DHAMS.length), 6000)
    }

    $$(".stop").forEach(s => s.onclick = () => showDham(+s.dataset.i))

    $("#heroPlan").onclick = e => {
      e.preventDefault()
      selectCity(DHAMS[dIdx].id, true)
      goPlanner()
    }

    showDham(0)

    /* ---------- Wizard ---------- */
    const state = {cities: new Set(), svcs: new Set(), step: 1}

    $("#cityPick").innerHTML = DHAMS.map(d =>
      `<button type="button" class="cp" data-v="${d.id}"><svg viewBox="0 0 40 40"><use href="#${d.icon}"/></svg><span><b>${d.name}</b><small>${d.hi.split(" · ")[0]}</small></span></button>`
    ).join("")

    function selectCity(id, only) {
      if(only) state.cities.clear()
      state.cities.add(id)
      syncPick()
    }

    function selectSvc(v) {
      state.svcs.add(v)
      syncPick()
    }

    function syncPick() {
      $$(".cp").forEach(b => b.classList.toggle("on", state.cities.has(b.dataset.v)))
      $$(".sp").forEach(b => b.classList.toggle("on", state.svcs.has(b.dataset.v)))
      $$("fieldset[data-for]").forEach(f => f.classList.toggle("on", state.svcs.has(f.dataset.for)))
      updatePass()
    }

    $$(".cp").forEach(b => b.onclick = () => {
      const v = b.dataset.v
      state.cities.has(v) ? state.cities.delete(v) : state.cities.add(v)
      syncPick()
      err("")
    })

    $$(".sp").forEach(b => b.onclick = () => {
      const v = b.dataset.v
      state.svcs.has(v) ? state.svcs.delete(v) : state.svcs.add(v)
      syncPick()
      err("")
    })

    const TITLES = {
      1: ["Where does your yatra go?", "Pick one or more dhams, then the services you need."],
      2: ["Tell us about your yatra", "Dates, group size and details for each service."],
      3: ["Who is the yatri?", "We'll send your plan and price here."]
    }

    function setStep(n) {
      state.step = n
      $$(".stepp").forEach(s => s.classList.toggle("on", +s.dataset.step === n))
      $$(".sb").forEach(s => {
        const k = +s.dataset.s
        s.classList.toggle("on", k === n)
        s.classList.toggle("done", k < n)
        s.querySelector("i").textContent = k < n ? "✓" : k
      })
      $("#wzTitle").textContent = TITLES[n][0]
      $("#wzSub").textContent = TITLES[n][1]
      $("#back").style.visibility = n > 1 ? "visible" : "hidden"
      $("#next").textContent = n < 3 ? "Next →" : "Get my Yatra Pass 🙏"
      err("")
    }

    function err(t) { $("#err").textContent = t }

    function validStep(n) {
      if(n === 1) {
        if(!state.cities.size) return err("Please choose at least one dham."), false
        if(!state.svcs.size) return err("Please choose at least one service."), false
      }
      if(n === 2) {
        const d = $("#startDate")
        if(!d.value) return err("Please add a start date."), d.focus(), false
      }
      if(n === 3) {
        const nm = $("#name"), ph = $("#phone")
        if(!nm.value.trim()) return err("Please add your name."), nm.focus(), false
        if(!ph.checkValidity() || !ph.value.trim()) return err("Please add a valid phone number."), ph.focus(), false
      }
      return true
    }

    $("#next").onclick = () => {
      if(!validStep(state.step)) return
      if(state.step < 3) { setStep(state.step + 1); scrollWizard() }
      else submit()
    }

    $("#back").onclick = () => {
      if(state.step > 1) { setStep(state.step - 1); scrollWizard() }
    }

    function scrollWizard() {
      if(innerWidth < 1060) $("#wizard").scrollIntoView({behavior:"smooth", block:"start"})
    }

    $$(".counter button").forEach(b => b.onclick = () => {
      const i = $("#pax")
      i.value = Math.max(1, (parseInt(i.value) || 1) + +b.dataset.c)
      updatePass()
    })

    $("#startDate").min = new Date().toISOString().slice(0, 10)

    $("#yf").addEventListener("input", updatePass)
    $("#yf").addEventListener("keydown", e => {
      if(e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault()
        $("#next").click()
      }
    })

    function updatePass() {
      const names = DHAMS.filter(d => state.cities.has(d.id)).map(d => d.name)
      $("#tRoute").innerHTML = names.length
        ? names.map(n => `<span class="c">${n}</span>`).join('<span class="arr">• • →</span>')
        : '<span class="empty">Choose your dhams…</span>'
      const dt = $("#startDate").value
      $("#tDate").textContent = dt ? new Date(dt+"T00:00").toLocaleDateString("en-IN", {day:"numeric",month:"short",year:"numeric"}) : "—"
      $("#tDays").textContent = $("#days").value
      $("#tPax").textContent = $("#pax").value || "—"
      $("#tName").textContent = $("#name").value.trim() || "Yatri"
      $("#tPhone").textContent = $("#phone").value.trim() || "—"
      $$("#tSvcs span").forEach(s => s.classList.toggle("on", state.svcs.has(s.dataset.v)))
    }

    function submit() {
      const f = $("#yf")
      const L = [
        "Namaste Yatra Ke Saathi 🙏",
        "— Yatra Pass enquiry —",
        "Dhams: " + DHAMS.filter(d => state.cities.has(d.id)).map(d => d.name).join(" → "),
        "Services: " + [...state.svcs].map(s => ({tour:"Tour package",cab:"Cab",boat:"Boat",hotel:"Hotel"})[s]).join(", ")
      ]
      f.querySelectorAll("input,select,textarea").forEach(el => {
        const fs = el.closest("fieldset")
        if(fs && !fs.classList.contains("on")) return
        if(el.name && String(el.value).trim()) L.push(`${el.name}: ${el.value}`)
      })
      const text = L.join("\n")
      $("#waLink").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
      f.style.display = "none"
      $("#done").classList.add("on")
      $("#tStamp").classList.add("on")
    }

    $("#restart").onclick = () => {
      $("#yf").reset()
      state.cities.clear()
      state.svcs.clear()
      syncPick()
      $("#yf").style.display = ""
      $("#done").classList.remove("on")
      $("#tStamp").classList.remove("on")
      setStep(1)
    }

    function goPlanner() {
      setStep(1)
      $("#planner").scrollIntoView({behavior:"smooth"})
    }

    $$(".pass,[data-go]").forEach(b => b.addEventListener("click", e => {
      e.preventDefault()
      selectSvc(b.dataset.svc || b.dataset.go)
      if(!state.cities.size) selectCity("kashi")
      goPlanner()
    }))

    /* Circuits */
    $("#circuitGrid").innerHTML = CIRCUITS.map((c,i) =>
      `<article class="cc reveal${i%3 ? " d"+(i%3) : ""}">
        <div class="img ph">${im(c.img,700,c.t)}<span class="days">${c.d}</span>${c.tag?`<span class="tag">${c.tag}</span>`:""}</div>
        <div class="body"><h3>${c.t}</h3><div class="mini-route">${c.r.map(x=>`<span>${x}</span>`).join("<i></i>")}</div><p>${c.text}</p>
        <div class="row"><span class="price">${c.p}${c.p.startsWith("₹")?" <small>/ person</small>":""}</span><button data-pick="${c.pkg}">Enquire</button></div></div>
      </article>`
    ).join("")

    $$("[data-pick]").forEach(b => b.addEventListener("click", () => {
      $("#pkg").value = b.dataset.pick
      selectSvc("tour")
      const map = {"Ujjain":"ujjain","Mathura":"vrindavan","Prayagraj":"prayagraj","Ayodhya":"ayodhya","Kashi":"kashi"}
      const c = CIRCUITS.find(x => x.pkg === b.dataset.pick)
      state.cities.clear()
      ;(c ? c.r : ["Kashi"]).forEach(r => map[r] && state.cities.add(map[r]))
      if(!state.cities.size) state.cities.add("kashi")
      syncPick()
      goPlanner()
    }))

    /* Services accordion */
    $$(".ai").forEach(a => a.addEventListener("click", e => {
      if(e.target.closest("[data-go]")) return
      $$(".ai").forEach(x => x.classList.toggle("open", x === a))
    }))

    /* Ghats, festivals, gallery */
    $("#ghats").innerHTML = GHATS.map((g,i) =>
      `<div class="gh" data-n="${String(i+1).padStart(2,"0")}"><h3>${g[0]}</h3><div class="hin">${g[1]}</div><p>${g[2]}</p></div>`
    ).join("")

    $("#fests").innerHTML = FESTS.map((f,i) =>
      `<div class="fe reveal${i%3?" d"+(i%3):""}"><div class="ph">${im(f.img,300,f.n)}</div><div class="c"><div class="m">${f.m}</div><h3>${f.n}</h3><div class="where">${f.w}</div><p>${f.t}</p></div></div>`
    ).join("")

    $("#gal").innerHTML = GALLERY.map(g =>
      `<figure class="ph">${im(g[0],700,g[1])}<figcaption>${g[1]}</figcaption></figure>`
    ).join("")

    /* Testimonials */
    let tInterval
    {
      const st = $("#tStage"), dots = $("#tDots")
      let i = 0
      st.innerHTML = TESTIMONIALS.map(x =>
        `<div class="tq">${x.sample?'<span class="sample">Sample</span>':""}<div class="stars">★★★★★</div><blockquote>"${x.text}"</blockquote><div class="who"><span class="av">${x.name[0]}</span><div><b>${x.name}</b><span>${x.trip}</span></div></div></div>`
      ).join("")
      dots.innerHTML = TESTIMONIALS.map(() => "<i></i>").join("")
      const go = n => {
        i = (n + TESTIMONIALS.length) % TESTIMONIALS.length
        ;[...st.children].forEach((c,j) => c.classList.toggle("on", j===i))
        ;[...dots.children].forEach((d,j) => d.classList.toggle("on", j===i))
      }
      const auto = () => { clearInterval(tInterval); tInterval = setInterval(() => go(i+1), 6500) }
      $("#tPrev").onclick = () => { go(i-1); auto() }
      $("#tNext").onclick = () => { go(i+1); auto() }
      go(0)
      auto()
    }

    /* Bells, reveal, misc */
    $("#bells").innerHTML = "<span></span>".repeat(Math.ceil(innerWidth/60))

    const io = new IntersectionObserver(es => es.forEach(e => {
      if(!e.isIntersecting) return
      e.target.classList.add("in")
      e.target.querySelectorAll("[data-count]").forEach(el => {
        const end = +el.dataset.count
        let s0
        const s = ts => {
          s0 = s0 || ts
          const p = Math.min((ts-s0)/1300, 1)
          el.textContent = Math.round(end*p)
          if(p < 1) requestAnimationFrame(s)
        }
        requestAnimationFrame(s)
      })
      io.unobserve(e.target)
    }), {threshold: .1})

    $$(".reveal").forEach(el => io.observe(el))

    $("#fab").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Namaste! I want to plan a teerth yatra.")}`
    $("#menuBtn").onclick = () => $("#links").classList.toggle("open")
    $$("#links a").forEach(a => a.addEventListener("click", () => $("#links").classList.remove("open")))
    $("#yr").textContent = new Date().getFullYear()

    return () => {
      clearTimeout(dTimer)
      clearInterval(tInterval)
      io.disconnect()
    }
  }, [])

  return (
    <>
      {/* ── SVG symbol defs ── */}
      <svg width="0" height="0" style={{position:'absolute'}} aria-hidden="true">
        <defs>
          {/* dham icons */}
          <symbol id="d-kashi" viewBox="0 0 40 40"><g className="ico"><path d="M20 37V12"/><path d="M11 7c0 6 3.5 9.5 9 9.5S29 13 29 7"/><path d="M20 3l-2.5 5h5z"/><path d="M11 7l-1.5 3M29 7l1.5 3"/><path d="M16 25l8 4M16 29l8-4"/></g></symbol>
          <symbol id="d-ayodhya" viewBox="0 0 40 40"><g className="ico"><path d="M13 4c11 7 11 25 0 32"/><path d="M13 4v32"/><path d="M6 20h29"/><path d="M31 16l4 4-4 4"/><path d="M6 17l3 3-3 3"/></g></symbol>
          <symbol id="d-prayag" viewBox="0 0 40 40"><g className="ico"><path d="M4 30q4-3 8 0t8 0 8 0 8 0"/><path d="M4 35q4-3 8 0t8 0 8 0 8 0"/><path d="M8 24c5-3 8-8 12-8M32 24c-5-3-8-8-12-8M20 24v-8"/><path d="M20 16V4l8 3-8 3"/></g></symbol>
          <symbol id="d-ujjain" viewBox="0 0 40 40"><g className="ico"><path d="M8 32h24M5 36h30"/><path d="M13 32c0-11 3-17 7-17s7 6 7 17"/><path d="M16 22h8M16.5 25h7M17 28h6"/><circle cx="20" cy="19" r="1"/><path d="M20 4v6M17 7h6"/></g></symbol>
          <symbol id="d-vrindavan" viewBox="0 0 40 40"><g className="ico"><path d="M5 35L31 9"/><circle cx="12" cy="28" r="1"/><circle cx="16" cy="24" r="1"/><circle cx="20" cy="20" r="1"/><path d="M28 12c2-6 7-8 9-7-1 2-3 7-9 9"/><path d="M31 10c1-1 2.5-1.5 3-1.2"/></g></symbol>
          <symbol id="d-haridwar" viewBox="0 0 40 40"><g className="ico"><path d="M14 15h12"/><path d="M13 15c-5 4-6 11-2 16 3 4 15 4 18 0 4-5 3-12-2-16"/><path d="M16 15c0-3 1.5-5 4-6 2.5 1 4 3 4 6"/><path d="M12 9c3 1 5 .5 8-2 3 2.5 5 3 8 2"/><path d="M14 36h12M15 24h10"/></g></symbol>
          {/* services */}
          <symbol id="s-tour" viewBox="0 0 40 40"><g className="ico"><path d="M20 3v4M20 7l5 2-5 2M10 36V22c0-6 4-10 10-15 6 5 10 9 10 15v14M6 36h28M17 36v-6a3 3 0 0 1 6 0v6M14 22h12"/></g></symbol>
          <symbol id="s-cab" viewBox="0 0 40 40"><g className="ico"><path d="M6 27v-6c0-2 1.5-4 4-4h20c2.5 0 4 2 4 4v6zM10 17l3-6h14l3 6M16 8h8"/><circle cx="12" cy="28" r="3.2"/><circle cx="28" cy="28" r="3.2"/></g></symbol>
          <symbol id="s-boat" viewBox="0 0 40 40"><g className="ico"><path d="M3 23h34c-2.5 6-8 8.5-17 8.5S5.5 29 3 23zM20 23V8M20 8l7 13M20 8l-7 13M6 35q3-1.6 6 0t6 0 6 0 6 0 6 0"/></g></symbol>
          <symbol id="s-hotel" viewBox="0 0 40 40"><g className="ico"><path d="M7 35V16h26v19M4 16h32M20 5l9 7H11zM16.5 35v-6a3.5 3.5 0 0 1 7 0v6M11 21h4v4h-4zM25 21h4v4h-4z"/></g></symbol>
          {/* misc */}
          <symbol id="kalash" viewBox="0 0 40 40"><g className="ico" strokeWidth="2"><path d="M14 16h12"/><path d="M13 16c-5 4-6 11-2 15 3 4 15 4 18 0 4-4 3-11-2-15"/><path d="M16 16c0-3 1.5-5 4-6 2.5 1 4 3 4 6"/><path d="M11 9c3 1 6 .5 9-3 3 3.5 6 4 9 3"/><circle cx="20" cy="4" r="1.5"/><path d="M13 24h14"/></g></symbol>
          <symbol id="foot" viewBox="0 0 18 24"><g fill="currentColor"><ellipse cx="9" cy="15" rx="5" ry="8"/><circle cx="4.5" cy="4.5" r="1.8"/><circle cx="8" cy="2.6" r="2"/><circle cx="11.6" cy="3.4" r="1.7"/><circle cx="14.2" cy="5.6" r="1.4"/></g></symbol>
          <symbol id="i-chat" viewBox="0 0 40 40"><g className="ico"><path d="M6 8h28v18H18l-8 7v-7H6z"/><path d="M12 15h16M12 20h10"/></g></symbol>
          <symbol id="i-plan" viewBox="0 0 40 40"><g className="ico"><rect x="7" y="6" width="26" height="30" rx="3"/><path d="M13 14h14M13 20h14M13 26h8M15 3v6M25 3v6"/></g></symbol>
          <symbol id="i-guide" viewBox="0 0 40 40"><g className="ico"><circle cx="20" cy="12" r="6"/><path d="M8 36c0-7 5-12 12-12s12 5 12 12"/></g></symbol>
          <symbol id="i-pin" viewBox="0 0 40 40"><g className="ico"><path d="M20 36s-11-10-11-19a11 11 0 0 1 22 0c0 9-11 19-11 19z"/><circle cx="20" cy="17" r="4"/></g></symbol>
          <symbol id="i-phone" viewBox="0 0 40 40"><g className="ico"><path d="M10 5h6l3 8-4 3c2 4 5 7 9 9l3-4 8 3v6c0 2-2 4-4 4C18 34 6 22 6 9c0-2 2-4 4-4z"/></g></symbol>
          <symbol id="i-mail" viewBox="0 0 40 40"><g className="ico"><rect x="5" y="9" width="30" height="22" rx="3"/><path d="M6 11l14 11 14-11"/></g></symbol>
          <symbol id="i-clock" viewBox="0 0 40 40"><g className="ico"><circle cx="20" cy="20" r="15"/><path d="M20 11v9l6 4"/></g></symbol>
          <symbol id="i-doc" viewBox="0 0 40 40"><g className="ico"><path d="M10 4h14l7 7v25H10z"/><path d="M24 4v7h7M15 20h11M15 26h11"/></g></symbol>
          <symbol id="i-wa" viewBox="0 0 32 32"><path fill="#fff" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></symbol>
          <symbol id="stamp" viewBox="0 0 100 100">
            <defs><path id="sc" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0"/></defs>
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3"/>
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <text fontFamily="Hind" fontSize="9.5" fontWeight="600" letterSpacing="2" fill="currentColor"><textPath href="#sc">YATRA KE SAATHI · ENQUIRY ·</textPath></text>
            <text x="50" y="56" textAnchor="middle" fontFamily="Eczar" fontWeight="700" fontSize="15" fill="currentColor">शुभ यात्रा</text>
          </symbol>
        </defs>
      </svg>

      {/* Topbar */}
      <div className="topbar">
        <div className="wrap">
          <div className="marq"><span>॥ हर हर महादेव ॥ &nbsp; जय श्री राम &nbsp; ॥ जय महाकाल ॥ &nbsp; राधे राधे &nbsp; ॥ गंगा मैया की जय ॥ &nbsp; Teerth yatras to Kashi · Ayodhya · Prayagraj · Ujjain · Vrindavan · Haridwar</span></div>
          <a href="tel:+910000000000">📞 +91 00000 00000</a>
        </div>
      </div>

      {/* Nav */}
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="logo"><span className="k"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg></span><span><b>Yatra Ke Saathi</b><small>यात्रा के साथी · तीर्थ यात्रा</small></span></a>
          <nav className="links" id="links">
            <a href="#planner">Plan Yatra</a>
            <a href="#circuits">Circuits</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#stories">Stories</a>
            <a href="#company">T&amp;C</a>
          </nav>
          <a href="#planner" className="btn">Plan my yatra</a>
          <button className="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
        </div>
      </header>

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero" style={{padding:0}}>
          <div className="slides" id="slides"></div>
          <div className="wrap hero-in">
            <div className="teerth">तीर्थ यात्रा</div>
            <h1>Every yatra needs a <span>saathi</span>.</h1>
            <p className="lead">Kashi, Ayodhya, Prayagraj, Ujjain and beyond. We plan the route, the cab, the boat, the stay and the darshan, so your journey stays a spiritual one.</p>
            <div className="dham-card" id="dhamCard"></div>
            <div className="hero-cta">
              <a href="#planner" className="btn" id="heroPlan">Plan this yatra</a>
              <a href="#circuits" className="btn ghost">See circuits</a>
            </div>
          </div>
          <div className="route">
            <div className="wrap">
              <div className="track" id="stops">
                <svg className="path" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><path d="M80 15 C200 -5 250 35 400 15 S650 -5 760 15 900 30 920 15"/></svg>
              </div>
            </div>
          </div>
        </section>

        {/* service passes */}
        <div className="wrap">
          <div className="passes reveal">
            <button className="pass" data-svc="tour"><span className="ic"><svg viewBox="0 0 40 40"><use href="#s-tour" /></svg></span><span><b>Tour Package</b><small>Darshan &amp; sightseeing</small></span><span className="go">→</span></button>
            <button className="pass" data-svc="cab"><span className="ic"><svg viewBox="0 0 40 40"><use href="#s-cab" /></svg></span><span><b>Cab</b><small>City &amp; intercity</small></span><span className="go">→</span></button>
            <button className="pass" data-svc="boat"><span className="ic"><svg viewBox="0 0 40 40"><use href="#s-boat" /></svg></span><span><b>Boat</b><small>Ganga, Sangam, Saryu</small></span><span className="go">→</span></button>
            <button className="pass" data-svc="hotel"><span className="ic"><svg viewBox="0 0 40 40"><use href="#s-hotel" /></svg></span><span><b>Hotel</b><small>Stays near the temples</small></span><span className="go">→</span></button>
          </div>
        </div>

        {/* ================= PLANNER / YATRA PASS ================= */}
        <section id="planner">
          <div className="wrap">
            <div className="center reveal" style={{marginBottom:'40px'}}>
              <span className="eyebrow"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg>Yatra Pass · यात्रा पत्र</span>
              <h2 className="title">Plan your yatra in <span>three steps</span></h2>
              <p className="lead2">Choose your dhams and services, add your dates and send it to us. Your pass fills in as you go.</p>
              <div className="foot-trail" aria-hidden="true">
                <svg viewBox="0 0 18 24"><use href="#foot" /></svg>
                <svg viewBox="0 0 18 24"><use href="#foot" /></svg>
                <svg viewBox="0 0 18 24"><use href="#foot" /></svg>
                <svg viewBox="0 0 18 24"><use href="#foot" /></svg>
                <svg viewBox="0 0 18 24"><use href="#foot" /></svg>
              </div>
            </div>

            <div className="planner">
              <div className="wizard reveal" id="wizard">
                <div className="wz-top">
                  <h3 id="wzTitle">Where does your yatra go?</h3>
                  <p id="wzSub">Pick one or more dhams, then the services you need.</p>
                  <div className="steps-bar">
                    <div className="sb on" data-s="1"><i>1</i><span>Yatra</span></div><div className="sb-line"></div>
                    <div className="sb" data-s="2"><i>2</i><span>Details</span></div><div className="sb-line"></div>
                    <div className="sb" data-s="3"><i>3</i><span>Contact</span></div>
                  </div>
                </div>
                <form id="yf" noValidate>
                  <div className="wz-body">
                    {/* step 1 */}
                    <div className="stepp on" data-step="1">
                      <div className="q">Dhams to visit <small>choose any</small></div>
                      <div className="city-pick" id="cityPick"></div>
                      <div className="q">Services needed <small>choose any</small></div>
                      <div className="svc-pick" id="svcPick">
                        <button type="button" className="sp" data-v="tour"><svg viewBox="0 0 40 40"><use href="#s-tour" /></svg><b>Tour Package</b></button>
                        <button type="button" className="sp" data-v="cab"><svg viewBox="0 0 40 40"><use href="#s-cab" /></svg><b>Cab</b></button>
                        <button type="button" className="sp" data-v="boat"><svg viewBox="0 0 40 40"><use href="#s-boat" /></svg><b>Boat</b></button>
                        <button type="button" className="sp" data-v="hotel"><svg viewBox="0 0 40 40"><use href="#s-hotel" /></svg><b>Hotel</b></button>
                      </div>
                    </div>
                    {/* step 2 */}
                    <div className="stepp" data-step="2">
                      <div className="grid-f">
                        <div><label htmlFor="startDate">Start date <span className="r">*</span></label><input type="date" id="startDate" name="Start date" required /></div>
                        <div><label htmlFor="days">Number of days</label>
                          <select id="days" name="Days" defaultValue="2">
                            <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6–7</option><option>8+</option>
                          </select>
                        </div>
                        <div><label>Yatris <span className="r">*</span></label><div className="counter"><button type="button" data-c="-1" aria-label="Fewer">−</button><input id="pax" name="Yatris" defaultValue="2" inputMode="numeric" aria-label="Number of yatris" /><button type="button" data-c="1" aria-label="More">+</button></div></div>
                        <div className="w2"><label htmlFor="from">Arriving from / at</label><input id="from" name="Arriving" placeholder="e.g. Delhi by train, Varanasi airport" /></div>
                        <div><label htmlFor="elders">Elders / kids?</label>
                          <select id="elders" name="Elders or kids">
                            <option>No</option><option>Elders travelling</option><option>Kids travelling</option><option>Both</option>
                          </select>
                        </div>
                      </div>
                      <fieldset data-for="tour"><legend><svg viewBox="0 0 40 40"><use href="#s-tour" /></svg>Tour package</legend>
                        <div className="grid-f">
                          <div className="w2"><label htmlFor="pkg">Package</label>
                            <select id="pkg" name="Package">
                              <option>Kashi Darshan (1 Day)</option><option>Kashi + Sarnath (2 Days)</option><option>Kashi Spiritual Retreat (3 Days)</option><option>Kashi–Prayagraj–Ayodhya (5 Days)</option><option>Ujjain Mahakal &amp; Omkareshwar (3 Days)</option><option>Braj Yatra: Mathura–Vrindavan (3 Days)</option><option>Custom yatra</option>
                            </select>
                          </div>
                          <div><label htmlFor="puja">Special puja?</label>
                            <select id="puja" name="Puja">
                              <option>No</option><option>Rudrabhishek</option><option>Ganga pujan</option><option>Pind daan / shraddh</option><option>Other (tell us)</option>
                            </select>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset data-for="cab"><legend><svg viewBox="0 0 40 40"><use href="#s-cab" /></svg>Cab</legend>
                        <div className="grid-f">
                          <div><label htmlFor="trip">Trip type</label>
                            <select id="trip" name="Cab trip">
                              <option>City Tour</option><option>Intercity</option><option>Full Day (8 hr / 80 km)</option><option>One-way Drop</option><option>Airport / Railway Pickup</option><option>Round Trip</option>
                            </select>
                          </div>
                          <div><label htmlFor="car">Car type</label>
                            <select id="car" name="Car">
                              <option>Hatchback (4)</option><option>Sedan – Dzire/Etios (4)</option><option>SUV – Ertiga (6)</option><option>Innova Crysta (7)</option><option>Tempo Traveller (12+)</option>
                            </select>
                          </div>
                          <div><label htmlFor="pickup">Pickup point</label><input id="pickup" name="Pickup" placeholder="Station, hotel…" /></div>
                        </div>
                      </fieldset>
                      <fieldset data-for="boat"><legend><svg viewBox="0 0 40 40"><use href="#s-boat" /></svg>Boat</legend>
                        <div className="grid-f">
                          <div><label htmlFor="boatType">Boat type</label>
                            <select id="boatType" name="Boat">
                              <option>Shared rowing boat</option><option>Private rowing boat</option><option>Private motor boat</option><option>Bajra (large group)</option>
                            </select>
                          </div>
                          <div><label htmlFor="slot">Time slot</label>
                            <select id="slot" name="Boat slot">
                              <option>Sunrise</option><option>Evening aarti</option><option>Sangam snan (Prayagraj)</option><option>Custom</option>
                            </select>
                          </div>
                          <div><label htmlFor="river">River</label>
                            <select id="river" name="River">
                              <option>Ganga – Kashi</option><option>Sangam – Prayagraj</option><option>Saryu – Ayodhya</option><option>Kshipra – Ujjain</option>
                            </select>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset data-for="hotel"><legend><svg viewBox="0 0 40 40"><use href="#s-hotel" /></svg>Hotel</legend>
                        <div className="grid-f">
                          <div><label htmlFor="rooms">Rooms</label><input id="rooms" name="Rooms" type="number" min="1" defaultValue="1" /></div>
                          <div><label htmlFor="meal">Meal plan</label>
                            <select id="meal" name="Meal plan">
                              <option>Room only</option><option>Bed &amp; Breakfast (B&amp;B)</option><option>Breakfast + Dinner</option>
                            </select>
                          </div>
                          <div><label htmlFor="budget">Budget / night</label>
                            <select id="budget" name="Budget">
                              <option>Under ₹1,500</option><option>₹1,500–3,000</option><option>₹3,000–6,000</option><option>₹6,000+</option>
                            </select>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    {/* step 3 */}
                    <div className="stepp" data-step="3">
                      <div className="grid-f">
                        <div className="w2"><label htmlFor="name">Your name <span className="r">*</span></label><input id="name" name="Name" required autoComplete="name" placeholder="Full name" /></div>
                        <div><label htmlFor="phone">Phone / WhatsApp <span className="r">*</span></label><input id="phone" name="Phone" type="tel" required pattern="[0-9+\s\-]{10,15}" autoComplete="tel" placeholder="+91" /></div>
                        <div className="w3"><label htmlFor="email">Email</label><input id="email" name="Email" type="email" autoComplete="email" placeholder="you@example.com" /></div>
                        <div className="w3"><label htmlFor="msg">Anything we should know?</label><textarea id="msg" name="Message" placeholder="Food preferences, wheelchair help, special darshan…"></textarea></div>
                      </div>
                    </div>
                  </div>
                  <div className="wz-foot" id="wzFoot">
                    <button type="button" className="btn ghost" id="back" style={{visibility:'hidden'}}>← Back</button>
                    <span className="err" id="err" role="alert"></span>
                    <button type="button" className="btn" id="next">Next →</button>
                  </div>
                </form>
                <div className="wz-done" id="done" role="status">
                  <svg className="big" viewBox="0 0 100 100"><use href="#stamp" /></svg>
                  <h3>Dhanyavaad! 🙏</h3>
                  <p style={{color:'var(--ink-soft)'}}>Your Yatra Pass is ready. Send it to us on WhatsApp and we'll reply with a plan and price.</p>
                  <div className="row">
                    <a className="btn wa" id="waLink" target="_blank" rel="noopener"><svg viewBox="0 0 32 32"><use href="#i-wa" /></svg>Send on WhatsApp</a>
                    <button className="btn ghost" id="restart" type="button">Plan another</button>
                  </div>
                </div>
              </div>

              <aside className="ticket reveal d1" aria-label="Your Yatra Pass preview">
                <div className="t-head"><small>YATRA PASS · यात्रा पत्र</small><h4 id="tName">Yatri</h4><svg className="kal" viewBox="0 0 40 40"><use href="#kalash" /></svg></div>
                <div className="t-route" id="tRoute"><span className="empty">Choose your dhams…</span></div>
                <div className="t-grid">
                  <div><small>Start</small><b id="tDate">—</b></div>
                  <div><small>Days</small><b id="tDays">2</b></div>
                  <div><small>Yatris</small><b id="tPax">2</b></div>
                  <div><small>Phone</small><b id="tPhone">—</b></div>
                </div>
                <div className="perf"></div>
                <div className="t-foot">
                  <div>
                    <small style={{fontSize:'.7rem',letterSpacing:'.14em',color:'var(--ink-soft)'}}>SERVICES</small>
                    <div className="t-svcs" id="tSvcs">
                      <span data-v="tour" title="Tour"><svg viewBox="0 0 40 40"><use href="#s-tour" /></svg></span>
                      <span data-v="cab" title="Cab"><svg viewBox="0 0 40 40"><use href="#s-cab" /></svg></span>
                      <span data-v="boat" title="Boat"><svg viewBox="0 0 40 40"><use href="#s-boat" /></svg></span>
                      <span data-v="hotel" title="Hotel"><svg viewBox="0 0 40 40"><use href="#s-hotel" /></svg></span>
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

        <div className="scallop"></div>

        {/* ================= CIRCUITS ================= */}
        <section id="circuits" className="kbg">
          <div className="wrap">
            <div className="head reveal">
              <div><span className="eyebrow"><svg viewBox="0 0 18 24"><use href="#foot" /></svg>Popular yatra circuits</span><h2 className="title">Tour <span>packages</span></h2><p className="lead2">Cab, boat, stay and a local guide are included, and every route can be changed to suit you.</p></div>
              <button className="btn ghost" data-pick="Custom yatra">Build a custom yatra</button>
            </div>
            <div className="circuits" id="circuitGrid"></div>
          </div>
        </section>

        <div className="scallop up"></div>

        {/* ================= SERVICES ================= */}
        <section id="services">
          <div className="wrap">
            <div className="center reveal" style={{marginBottom:'40px'}}>
              <span className="eyebrow"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg>What we arrange</span>
              <h2 className="title">Four services, <span>one saathi</span></h2>
              <p className="lead2">Book one service or all four. Either way, one person from our team looks after your yatra.</p>
            </div>
            <div className="acc reveal" id="acc">
              <div className="ai open" data-svc="tour">
                <img src="https://images.unsplash.com/photo-1705952484283-19c31e37e0e4?w=1200&q=75&auto=format&fit=crop" alt="Ritual with oil lamps on the banks of the Ganga" loading="lazy" onError={e => e.currentTarget.remove()} />
                <div className="vt"><i><svg viewBox="0 0 40 40"><use href="#s-tour" /></svg></i><span>Tour Packages</span></div>
                <div className="ct"><div className="hin">दर्शन और भ्रमण</div><h3>Tour Packages</h3><p>Guided darshan, aarti, heritage walks and multi-dham circuits, planned around temple timings and crowds.</p><div className="tags"><span>Kashi Darshan</span><span>Sarnath</span><span>Ayodhya</span><span>Prayagraj Sangam</span><span>Ujjain Mahakal</span><span>Custom</span></div><button className="btn haldi" data-go="tour">Plan a tour →</button></div>
              </div>
              <div className="ai" data-svc="cab">
                <img src="https://images.unsplash.com/photo-1443479788958-11faa35a5578?w=1200&q=75&auto=format&fit=crop" alt="Driver at the wheel of a car" loading="lazy" onError={e => e.currentTarget.remove()} />
                <div className="vt"><i><svg viewBox="0 0 40 40"><use href="#s-cab" /></svg></i><span>Cab Service</span></div>
                <div className="ct"><div className="hin">कैब सेवा</div><h3>Cab Service</h3><p>Clean cars with drivers who know the temple roads, for a quick drop or a week-long circuit.</p><div className="tags"><span>City tour</span><span>Intercity</span><span>Full day</span><span>One-way drop</span><span>Airport / Railway</span><span>Round trip</span></div><button className="btn haldi" data-go="cab">Book a cab →</button></div>
              </div>
              <div className="ai" data-svc="boat">
                <img src="https://images.unsplash.com/photo-1674358596018-5b768ca9cfd1?w=1200&q=75&auto=format&fit=crop" alt="Pilgrims on a boat" loading="lazy" onError={e => e.currentTarget.remove()} />
                <div className="vt"><i><svg viewBox="0 0 40 40"><use href="#s-boat" /></svg></i><span>Boat Rides</span></div>
                <div className="ct"><div className="hin">नौका विहार</div><h3>Boat Rides</h3><p>Sunrise on the Ganga, a holy dip at the Sangam, or evening aarti on the Saryu.</p><div className="tags"><span>Sunrise ride</span><span>Aarti boat</span><span>Sangam snan</span><span>Private rowing</span><span>Motor boat</span></div><button className="btn haldi" data-go="boat">Book a boat →</button></div>
              </div>
              <div className="ai" data-svc="hotel">
                <img src="https://images.unsplash.com/photo-1565354785692-9e7523e5a87b?w=1200&q=75&auto=format&fit=crop" alt="Riverside building beside ghat steps" loading="lazy" onError={e => e.currentTarget.remove()} />
                <div className="vt"><i><svg viewBox="0 0 40 40"><use href="#s-hotel" /></svg></i><span>Hotels &amp; Stays</span></div>
                <div className="ct"><div className="hin">ठहरने की व्यवस्था</div><h3>Hotels &amp; Stays</h3><p>Stays we have checked ourselves near the temples and ghats, from simple dharamshalas to river-view rooms.</p><div className="tags"><span>River view</span><span>Bed &amp; Breakfast</span><span>Near temple</span><span>Budget to premium</span></div><button className="btn haldi" data-go="hotel">Find a hotel →</button></div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="ivory">
          <div className="wrap about">
            <div className="arches reveal">
              <figure className="ph"><img src="https://images.unsplash.com/photo-1672398760212-08ce34b88c62?w=500&q=75&auto=format&fit=crop" alt="Temple in Ayodhya" loading="lazy" onError={e => e.currentTarget.remove()} /><figcaption>Ayodhya</figcaption></figure>
              <figure className="ph"><img src="https://images.unsplash.com/photo-1561359313-0639aad49ca6?w=600&q=75&auto=format&fit=crop" alt="Ghats of Varanasi" loading="lazy" onError={e => e.currentTarget.remove()} /><figcaption>Kashi</figcaption></figure>
              <figure className="ph"><img src="https://images.unsplash.com/photo-1658730487395-dcc99f5d997c?w=500&q=75&auto=format&fit=crop" alt="Mahakaleshwar temple, Ujjain" loading="lazy" onError={e => e.currentTarget.remove()} /><figcaption>Ujjain</figcaption></figure>
            </div>
            <div className="reveal d1">
              <span className="eyebrow"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg>About Yatra Ke Saathi</span>
              <h2 className="title">Born in Kashi. <span>Walking with yatris</span> across Bharat.</h2>
              <p>We grew up between the ghats and the temples of Kashi. For years, friends and relatives called us to arrange a cab, a good room and a boatman they could trust. Then they asked us for Ayodhya, Prayagraj and Ujjain too. Yatra Ke Saathi grew out of those calls.</p>
              <div className="quote">Treat every yatri the way you'd treat family visiting from home.</div>
              <p>From your pickup at the station to your last darshan, one person looks after your yatra from start to finish.</p>
              <div className="stats">
                <div><b data-count="6">6</b><span>sacred dhams</span></div>
                <div><b data-count="4">4</b><span>services, one team</span></div>
                <div><b>24×7</b><span>help on call</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <div className="scallop up haldi" style={{backgroundColor:'var(--ivory)'}}></div>
        <section className="cta">
          <div className="om" aria-hidden="true">ॐ</div>
          <div className="wrap reveal" style={{position:'relative'}}>
            <h2>एक कॉल, पूरी यात्रा।</h2>
            <p>One call and we take care of the pickup, the stay, the boat and the darshan at every dham on your route.</p>
            <div className="row"><a href="#planner" className="btn haldi">Plan my yatra</a><a href="tel:+910000000000" className="btn ghost">Call us</a></div>
          </div>
        </section>
        <div className="bells" id="bells" aria-hidden="true" style={{background:'var(--kumkum)',height:'34px'}}></div>

        {/* ================= HOW ================= */}
        <section>
          <div className="wrap">
            <div className="center reveal" style={{marginBottom:'40px'}}>
              <span className="eyebrow"><svg viewBox="0 0 18 24"><use href="#foot" /></svg>Simple as 1, 2, 3</span>
              <h2 className="title">How your <span>yatra</span> comes together</h2>
            </div>
            <div className="how">
              <div className="st reveal"><span className="n">01</span><div className="i"><svg viewBox="0 0 40 40"><use href="#i-chat" /></svg></div><h3>Tell us your plan</h3><p>Fill in the Yatra Pass or send a WhatsApp message with your dhams, dates and group size.</p></div>
              <div className="st reveal d1"><span className="n">02</span><div className="i"><svg viewBox="0 0 40 40"><use href="#i-plan" /></svg></div><h3>Get a clear quote</h3><p>We send a day-by-day plan with one all-inclusive price. Change anything you like.</p></div>
              <div className="st reveal d2"><span className="n">03</span><div className="i"><svg viewBox="0 0 40 40"><use href="#i-guide" /></svg></div><h3>Arrive &amp; relax</h3><p>We meet you at the station or airport. From there, just follow your saathi.</p></div>
            </div>
          </div>
        </section>

        {/* ================= GHATS ================= */}
        <section className="kbg" style={{paddingTop:'70px'}}>
          <div className="wrap">
            <div className="head reveal">
              <div><span className="eyebrow"><svg viewBox="0 0 40 40"><use href="#d-kashi" /></svg>Our home, Kashi</span><h2 className="title">Ghats we'll <span>walk you through</span></h2></div>
              <p className="lead2">There are 84 ghats in all. These are the eight most people ask us about. Scroll sideways to see them all.</p>
            </div>
            <div className="ghat-scroll reveal" id="ghats"></div>
          </div>
        </section>

        {/* ================= FESTIVALS ================= */}
        <section>
          <div className="wrap">
            <div className="head reveal">
              <div><span className="eyebrow"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg>Parv &amp; utsav</span><h2 className="title">Plan around the <span>festivals</span></h2></div>
              <p className="lead2">Each dham has days when it is at its most alive. Rooms and boats fill up early, so plan ahead.</p>
            </div>
            <div className="fests" id="fests"></div>
            <p style={{textAlign:'center',marginTop:'18px',fontSize:'.88rem',color:'var(--ink-soft)'}}>Festival dates follow the Hindu lunar calendar and change every year. Ask us for this year's dates.</p>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section id="stories" className="ivory">
          <div className="wrap tw">
            <div className="reveal">
              <span className="eyebrow"><svg viewBox="0 0 18 24"><use href="#foot" /></svg>Yatri stories</span>
              <h2 className="title">Words from our <span>yatris</span></h2>
              <p className="lead2">Stories from the families, friends and solo travellers we've looked after on their yatra.</p>
              <div className="t-ctrl"><button id="tPrev" aria-label="Previous">←</button><button id="tNext" aria-label="Next">→</button></div>
              <div className="t-dots" id="tDots"></div>
            </div>
            <div className="t-stage reveal d1" id="tStage"></div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section style={{paddingTop:'80px'}}>
          <div className="wrap">
            <div className="center reveal" style={{marginBottom:'34px'}}>
              <span className="eyebrow"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg>Darshan diary</span>
              <h2 className="title">Moments from the <span>dhams</span></h2>
            </div>
            <div className="gal reveal" id="gal"></div>
          </div>
        </section>

        {/* ================= COMPANY ================= */}
        <section id="company" className="kbg">
          <div className="wrap company">
            <div className="reveal">
              <span className="eyebrow"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg>The company</span>
              <h2 className="title">Yatra Ke Saathi</h2>
              <p style={{color:'var(--ink-soft)'}}>A Varanasi-based travel company offering tour packages, cab services, boat rides and hotel bookings for teerth yatras across North and Central India.</p>
              <ul className="info">
                <li className="w"><svg viewBox="0 0 40 40"><use href="#i-pin" /></svg><b>Office</b>Your address, near Dashashwamedh Ghat, Varanasi, UP</li>
                <li><svg viewBox="0 0 40 40"><use href="#i-phone" /></svg><b>Phone / WhatsApp</b>+91 00000 00000</li>
                <li><svg viewBox="0 0 40 40"><use href="#i-mail" /></svg><b>Email</b>hello@yatrakesaathi.com</li>
                <li><svg viewBox="0 0 40 40"><use href="#i-clock" /></svg><b>Hours</b>Every day, 5:30 AM – 10 PM</li>
                <li><svg viewBox="0 0 40 40"><use href="#i-doc" /></svg><b>GSTIN</b>Your registration number</li>
              </ul>
            </div>
            <div className="reveal d1">
              <span className="eyebrow">Terms &amp; conditions</span>
              <h2 className="title" style={{fontSize:'2rem'}}>Before you book</h2>
              <details open>
                <summary>Booking &amp; payment</summary>
                <ul><li>A booking is confirmed after an advance payment (e.g. 25%).</li><li>The balance is due before the service begins.</li><li>We accept UPI, bank transfer and cash.</li></ul>
              </details>
              <details>
                <summary>Cancellation &amp; refunds</summary>
                <ul><li>Full refund for cancellations 72+ hours before the trip.</li><li>50% refund for 24–72 hours before.</li><li>No refund within 24 hours or for no-shows.</li></ul>
              </details>
              <details>
                <summary>Cabs, boats &amp; hotels</summary>
                <ul><li>Tolls, parking and state tax are extra unless stated.</li><li>Boats may pause during floods or safety orders.</li><li>Hotel check-in times follow each property's policy.</li></ul>
              </details>
              <details>
                <summary>Darshan &amp; temple etiquette</summary>
                <ul><li>Special darshan and aarti passes depend on each temple's own rules and availability.</li><li>Please dress modestly for temple visits.</li><li>Photography is not allowed inside many temples or at cremation ghats.</li></ul>
              </details>
            </div>
          </div>
        </section>
      </main>

      <div className="scallop up" style={{backgroundColor:'var(--chandan-2)',backgroundImage:'radial-gradient(circle at 12px 0,transparent 11px,var(--kumkum-deep) 12px)'}}></div>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <a href="#top" className="logo" style={{marginBottom:'14px'}}><span className="k"><svg viewBox="0 0 40 40"><use href="#kalash" /></svg></span><span><b>Yatra Ke Saathi</b><small>यात्रा के साथी</small></span></a>
              <p style={{fontSize:'.95rem',maxWidth:'22rem'}}>Teerth yatras with cabs, boats, stays and darshan, arranged by people from Kashi.</p>
              <div className="dhams"><span>Kashi</span><span>Ayodhya</span><span>Prayagraj</span><span>Ujjain</span><span>Vrindavan</span><span>Haridwar</span></div>
            </div>
            <div><h4>Services</h4><ul><li><a href="#planner" data-go="tour">Tour packages</a></li><li><a href="#planner" data-go="cab">Cab booking</a></li><li><a href="#planner" data-go="boat">Boat rides</a></li><li><a href="#planner" data-go="hotel">Hotels</a></li></ul></div>
            <div><h4>Explore</h4><ul><li><a href="#circuits">Yatra circuits</a></li><li><a href="#about">About us</a></li><li><a href="#stories">Yatri stories</a></li><li><a href="#company">Terms</a></li></ul></div>
            <div><h4>Contact</h4><ul><li>Varanasi, Uttar Pradesh</li><li>+91 00000 00000</li><li>hello@yatrakesaathi.com</li></ul></div>
          </div>
          <div className="copy"><span>© <span id="yr"></span> Yatra Ke Saathi</span><span>Photos: Unsplash (replace with your own)</span></div>
        </div>
      </footer>

      <a className="fab" id="fab" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32"><use href="#i-wa" /></svg></a>
    </>
  )
}
