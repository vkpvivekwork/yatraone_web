export { U } from './constants.js'

export const SERVICES = {
  tour: {
    title: "Plan a tour",
    fields: [
      { id: "Package", type: "select", w: 2, req: true, options: ["Kashi Darshan (1 Day)","Kashi + Sarnath (2 Days)","Kashi Spiritual Retreat (3 Days)","Kashi–Prayagraj–Ayodhya (5 Days)","Festival trip (Dev Deepawali etc.)","Custom package"] },
      { id: "Start date", type: "date", req: true },
      { id: "Travellers", type: "number", min: 1, value: 2, req: true },
      { id: "Hotel needed", type: "select", options: ["Yes","No"] },
      { id: "Arriving at", type: "select", options: ["Varanasi Jn (BSB)","Banaras Stn (BSBS)","Airport (VNS)","Already in Varanasi"] },
    ],
  },
  cab: {
    title: "Book a cab",
    fields: [
      { id: "Trip type", type: "select", req: true, options: ["City Tour","Intercity","Full Day (8 hr / 80 km)","One-way Drop","Airport / Railway Pickup","Round Trip"] },
      { id: "Car type", type: "select", options: ["Hatchback (4)","Sedan – Dzire/Etios (4)","SUV – Ertiga (6)","Innova Crysta (7)","Tempo Traveller (12+)"] },
      { id: "Date", type: "date", req: true },
      { id: "Pickup time", type: "time", req: true },
      { id: "Pickup", type: "text", w: 2, req: true, ph: "Station, hotel or area" },
      { id: "Drop", type: "text", w: 2, ph: "e.g. Sarnath, Prayagraj" },
    ],
  },
  boat: {
    title: "Book a boat",
    fields: [
      { id: "Boat package", type: "select", req: true, options: ["Boat Ride (₹399 / person)","Morning Boat (₹1,499 / boat)","Aarti Boat Ride (₹1,999 / boat)","Ghat Ride + Reel (₹3,499 / booking)"] },
      { id: "Time slot", type: "select", req: true, options: ["Sunrise (5:30–7:30 AM)","Morning","Evening Ganga Aarti","Custom time"] },
      { id: "Date", type: "date", req: true },
      { id: "People", type: "number", min: 1, value: 2, req: true },
      { id: "Route", type: "select", w: 2, options: ["Assi → Manikarnika","Dashashwamedh round","All major ghats","Not sure, suggest one"] },
    ],
  },
  hotel: {
    title: "Find a hotel",
    fields: [
      { id: "Check-in", type: "date", req: true },
      { id: "Check-out", type: "date", req: true },
      { id: "Rooms", type: "number", min: 1, value: 1, req: true },
      { id: "Guests", type: "number", min: 1, value: 2, req: true },
      { id: "Meal plan", type: "select", options: ["Room only","Bed & Breakfast (B&B)","Breakfast + Dinner"] },
      { id: "Budget / night", type: "select", options: ["Under ₹1,500","₹1,500–3,000","₹3,000–6,000","₹6,000+"] },
      { id: "Area", type: "select", w: 2, options: ["Near Dashashwamedh / Godowlia","Assi Ghat","Near Kashi Vishwanath","Cantt / Station","Any"] },
    ],
  },
};

export const GHATS = [
  ["Assi Ghat","अस्सी घाट","Southern end, where the Assi meets the Ganga. Mornings start with Subah-e-Banaras."],
  ["Tulsi Ghat","तुलसी घाट","Linked with Tulsidas and the Ramcharitmanas. Home to the Nag Nathaiya festival."],
  ["Harishchandra Ghat","हरिश्चंद्र घाट","One of two cremation ghats. Visit quietly and respectfully, without cameras."],
  ["Kedar Ghat","केदार घाट","Striped red-and-white steps and the Kedareshwar temple."],
  ["Dashashwamedh Ghat","दशाश्वमेध घाट","The heart of Kashi and home to the grand evening Ganga Aarti."],
  ["Manikarnika Ghat","मणिकर्णिका घाट","The main cremation ghat, whose fires are said never to go out. Best seen from a boat."],
  ["Panchganga Ghat","पंचगंगा घाट","Where five rivers are believed to meet. In Kartik, lamps are raised on tall poles."],
  ["Namo Ghat","नमो घाट","The new riverfront at the northern end, near Raj Ghat. Good at sunset."],
];

export const PHOTOS = [
  ["1561359313-0639aad49ca6","Ghats & temples"],
  ["1627894483216-2138af692e32","Ganga Aarti"],
  ["1571536802807-30451e3955d8","Morning boats"],
  ["1608412525537-662195e817c5","Along the ghats"],
  ["1705952484283-19c31e37e0e4","Lamps by the river"],
  ["1596097825168-c9b773f404ff","Sunset ride"],
  ["1561361058-c24cecae35ca","Boats at the steps"],
  ["1665413791167-6718dcf36773","Aarti music"],
  ["1634920540678-df0e179c5243","Colours of Kashi"],
  ["1613445607898-f46e51645acf","On the Ganga"],
  ["1599831069477-b2acdc0bcb91","Evening aarti"],
  ["1565354785692-9e7523e5a87b","By the river"],
];

export const TESTIMONIALS = [
  {
    text: "The aarti boat, the cab from the station and the hotel near the ghat were all sorted with one phone call. Our elderly parents felt completely looked after the entire trip.",
    name: "Ramesh & Sunita Sharma",
    city: "Indore",
    trip: "Varanasi · Spiritual Retreat",
    stars: 5,
  },
  {
    text: "Our guide had a story for every lane and every ghat. The sunrise boat from Assi Ghat was the calmest, most beautiful two hours of the entire journey to Kashi.",
    name: "Ananya Krishnan",
    city: "Bengaluru",
    trip: "Varanasi · Kashi Darshan",
    stars: 5,
  },
  {
    text: "We came for Dev Deepawali and they had a boat and a terrace-view room ready three weeks in advance. The whole evening on the Ganga was something we will never forget.",
    name: "Vikram & Priya Mehta",
    city: "Ahmedabad",
    trip: "Varanasi · Festival Trip",
    stars: 5,
  },
  {
    text: "Our driver on the Prayagraj–Ayodhya circuit was endlessly patient with our elderly parents and knew every temple's timing, queue shortcut, and prasad stall by heart.",
    name: "Suresh Agarwal",
    city: "Jaipur",
    trip: "Kashi · Prayagraj · Ayodhya",
    stars: 5,
  },
  {
    text: "Booked the Innova for a full-day city tour. On time, AC, clean — and the driver suggested the best lassi stall near Manikarnika. Exactly the kind of local knowledge you need.",
    name: "Pradeep Nair",
    city: "Mumbai",
    trip: "Varanasi · Cab Service",
    stars: 5,
  },
  {
    text: "They found us a Ganga-view room at mid-range prices that wasn't listed on any booking website. The personal recommendation made all the difference for our group.",
    name: "Kavita Rao",
    city: "Hyderabad",
    trip: "Varanasi · Hotel Booking",
    stars: 5,
  },
  {
    text: "Booked the Aarti Boat Ride for our family of six. Watching the Ganga Aarti from the water with lamps reflected all around us — no words can fully describe it.",
    name: "Deepak Verma & Family",
    city: "Nagpur",
    trip: "Varanasi · Aarti Boat Ride",
    stars: 5,
  },
  {
    text: "First time in Varanasi, knew nobody. One WhatsApp message and everything was arranged — pickup, hotel, guide, and the Vishwanath darshan VIP pass. Truly a sathi.",
    name: "Meena Pillai",
    city: "Chennai",
    trip: "Varanasi · 3-Day Package",
    stars: 5,
  },
];

export const PACKAGES = [
  { days: "3 days", title: "Kashi Tours", sub: "Varanasi 3 Days 2 Nights", href: "/tours/varanasi-tour-package-3-days-2-nights", desc: "A full-day guided circuit of Kashi's most sacred temples, ghats, and the grand evening Ganga Aarti — the complete first-time experience.", img: "1627894483216-2138af692e32", imgAlt: "Priests performing Ganga Aarti at Dashashwamedh Ghat", features: ["Kashi Vishwanath darshan","Sunrise boat ride","Old-city walk","Evening Ganga Aarti"], pkg: "Kashi Darshan (1 Day)", popular: false },
  { days: "4 days", title: "Varanasi Ayodhya Prayagraj", sub: "Tri-city Yatra · 3 Nights", href: "/tours/varanasi-ayodhya-prayagraj-tour-package", desc: "Three of India's holiest cities in one journey — Kashi, Ayodhya, and Prayagraj. Private cab, guided darshan, and Sangam snan included.", img: "1561359313-0639aad49ca6", imgAlt: "Boats on the Ganga before the ghats and temples of Varanasi", features: ["Kashi darshan & aarti","Prayagraj Sangam snan","Ayodhya Ram Mandir","Private cab throughout"], pkg: "Triveni Yatra – Kashi · Ayodhya · Prayagraj (5 Days)", popular: false },
  { days: "2 hrs", title: "Sunrise on the Ganga", sub: "Ganga boat ride", href: "/boat-rides", desc: "Step into a wooden boat before dawn and watch Kashi wake up from the river — the quietest, most memorable two hours you'll spend here.", img: "1571536802807-30451e3955d8", imgAlt: "Wooden boats on the Ganga in the early morning light", features: ["Sunrise boat ride","Ganga Aarti view","Local boatman guide","Flower diya floating"], pkg: "Sunrise on the Ganga (Boat Ride)", popular: true },
  { days: "3 hrs", title: "Subah-e-Banaras", sub: "Heritage walk · Kashi", href: "/tours/heritage-walk", desc: "An early morning walk through the living heart of the city — ghats, old lanes, chai stalls, and stories that no guidebook carries.", img: "1634920540678-df0e179c5243", imgAlt: "Colourful morning life in the lanes of Kashi", features: ["Early morning ghat walk","Chai & kachori stop","Silk & spice lanes","Local heritage guide"], pkg: "Subah-e-Banaras Heritage Walk", popular: false },
];

export const FESTIVALS = [
  { month: "Oct – Nov", title: "Dev Deepawali", hindi: "देव दीपावली", desc: "On Kartik Purnima, every ghat is lit with lamps.", img: "1635192592106-77a5aacbe1a3", imgAlt: "Circle of lit lamps" },
  { month: "Feb – Mar", title: "Mahashivratri", hindi: "महाशिवरात्रि", desc: "The great night of Shiva, with processions and all-night darshan.", img: "1627894483216-2138af692e32", imgAlt: "Fire ritual on the ghats" },
  { month: "May – Jun", title: "Ganga Dussehra", hindi: "गंगा दशहरा", desc: "Celebrates Ganga's descent to earth with holy dips and a grand aarti.", img: "1705952484283-19c31e37e0e4", imgAlt: "Lamps on the banks of the Ganga" },
  { month: "Oct – Nov", title: "Nag Nathaiya", hindi: "नाग नथैया", desc: "Krishna's victory over the serpent Kaliya, re-enacted at Tulsi Ghat.", img: "1627938823193-fd13c1c867dd", imgAlt: "Boat at a ghat" },
];
