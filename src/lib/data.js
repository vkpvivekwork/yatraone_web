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
      { id: "Boat type", type: "select", req: true, options: ["Shared rowing boat","Private rowing boat","Private motor boat","Bajra (large group)"] },
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
  { text: "The aarti boat, the cab from the station and the hotel near the ghat were all sorted with one phone call. Our parents felt completely looked after.", name: "Guest name", trip: "City · Spiritual Retreat", sample: true },
  { text: "Our guide had a story for every lane. The sunrise boat from Assi was the calmest morning of the whole trip.", name: "Guest name", trip: "City · Kashi Darshan", sample: true },
  { text: "We came for Dev Deepawali and they had a boat and a terrace room ready weeks ahead. Unforgettable.", name: "Guest name", trip: "City · Festival trip", sample: true },
  { text: "Our driver on the Prayagraj–Ayodhya circuit was patient with our elders and knew every temple's timings.", name: "Guest name", trip: "City · Teerth Circuit", sample: true },
];

export const PACKAGES = [
  { days: "1 day", title: "Kashi Darshan", img: "1665413791167-6718dcf36773", imgAlt: "Musicians at the evening aarti", price: "₹2,499", features: ["Kashi Vishwanath darshan","Sunrise boat ride","Old-city walk","Evening Ganga Aarti"], pkg: "Kashi Darshan (1 Day)", popular: false },
  { days: "2 days", title: "Kashi + Sarnath", img: "1649876674933-a5b3b39b4da1", imgAlt: "Stupa at Sarnath among trees", price: "₹6,999", features: ["Everything in Kashi Darshan","Dhamek Stupa & deer park","Sarnath museum","1 night stay"], pkg: "Kashi + Sarnath (2 Days)", popular: false },
  { days: "3 days", title: "Spiritual Retreat", img: "1715193678341-31634700f56b", imgAlt: "Devotees holding lamps", price: "₹12,500", features: ["Rudrabhishek puja","Meditation on the ghats","Temple trail & food walk","2 nights, Ganga view"], pkg: "Kashi Spiritual Retreat (3 Days)", popular: true },
  { days: "5 days", title: "Teerth Circuit", img: "1706186829065-ede677efe384", imgAlt: "The Ganga with the city in the background", price: "₹18,999", features: ["Kashi darshan & aarti","Prayagraj Sangam snan","Ayodhya Ram Mandir","Private cab throughout"], pkg: "Kashi–Prayagraj–Ayodhya (5 Days)", popular: false },
];

export const FESTIVALS = [
  { month: "Oct – Nov", title: "Dev Deepawali", hindi: "देव दीपावली", desc: "On Kartik Purnima, every ghat is lit with lamps.", img: "1635192592106-77a5aacbe1a3", imgAlt: "Circle of lit lamps" },
  { month: "Feb – Mar", title: "Mahashivratri", hindi: "महाशिवरात्रि", desc: "The great night of Shiva, with processions and all-night darshan.", img: "1627894483216-2138af692e32", imgAlt: "Fire ritual on the ghats" },
  { month: "May – Jun", title: "Ganga Dussehra", hindi: "गंगा दशहरा", desc: "Celebrates Ganga's descent to earth with holy dips and a grand aarti.", img: "1705952484283-19c31e37e0e4", imgAlt: "Lamps on the banks of the Ganga" },
  { month: "Oct – Nov", title: "Nag Nathaiya", hindi: "नाग नथैया", desc: "Krishna's victory over the serpent Kaliya, re-enacted at Tulsi Ghat.", img: "1627938823193-fd13c1c867dd", imgAlt: "Boat at a ghat" },
];
