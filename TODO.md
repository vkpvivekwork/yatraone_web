# YatraWeb — To Do / Notes

## Must Do Before Running Ads

- [x] Replace `YOUR_META_PIXEL_ID` in `src/app/layout.jsx` with real Pixel ID — 1668345884790438

- [ ] Replace `YOUR_GOOGLE_TAG_ID` in `src/app/layout.jsx` and
      `src/app/tours/varanasi-ayodhya-prayagraj-tour-package/page.jsx`
      Get it from: Google Ads → Tools → Audience Manager → Your data sources

- [ ] Add price to the Varanasi-Ayodhya-Prayagraj page (starting from Rs X,XXX per person)
      File: `src/app/tours/varanasi-ayodhya-prayagraj-tour-package/page.jsx`

## Ads Setup (Do Once)

- [ ] Create retargeting audience in Meta Ads Manager
      Custom Audience → Website → URL contains `varanasi-ayodhya-prayagraj` → 30 days

- [ ] Create retargeting audience in Google Ads
      Audience Manager → Website visitors → URL contains `varanasi-ayodhya-prayagraj`

- [ ] UTM URLs ready to paste into each ad platform:
      Google:    /tours/varanasi-ayodhya-prayagraj-tour-package?utm_source=google&utm_medium=cpc&utm_campaign=varanasi-ayodhya-tour
      Meta:      /tours/varanasi-ayodhya-prayagraj-tour-package?utm_source=meta&utm_medium=paid_social&utm_campaign=varanasi-ayodhya-tour
      Instagram: /tours/varanasi-ayodhya-prayagraj-tour-package?utm_source=instagram&utm_medium=paid_social&utm_campaign=varanasi-ayodhya-tour
      WhatsApp:  /tours/varanasi-ayodhya-prayagraj-tour-package?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=varanasi-ayodhya-tour

## Page Improvements (Nice to Have)

- [ ] Add real price to hero section
- [ ] Make WhatsApp the primary CTA in hero (before Book This Tour button)
- [ ] Replace remaining Unsplash photo IDs with real ImageKit photos
- [ ] Add seasonal urgency banner for Kumbh / Ram Navami / Diwali

## Notes

- Booking API: https://yatra.pythonanywhere.com/api/bookings/
- WhatsApp number: 919277472279
- Google Maps: https://www.google.com/maps/place/Yatra+k+Sathi/@25.288805,82.9929543
- Main ads landing page: /tours/varanasi-ayodhya-prayagraj-tour-package
- Real traveller photos: https://ik.imagekit.io/yatraksathi/TravelStories/
