const BASE = 'https://yatraksathi.com'

export default function sitemap() {
  const now = new Date()

  const routes = [
    { url: `${BASE}`,                                                       priority: 1.0,  changeFrequency: 'weekly' },
    { url: `${BASE}/tours`,                                                 priority: 0.9,  changeFrequency: 'weekly' },
    { url: `${BASE}/tours/varanasi-tour-package-3-days-2-nights`,           priority: 0.95, changeFrequency: 'monthly' },
    { url: `${BASE}/tours/varanasi-complete-tour-package`,                  priority: 0.95, changeFrequency: 'monthly' },
    { url: `${BASE}/tours/varanasi-ayodhya-prayagraj-tour-package`,         priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE}/tours/varanasi-temple-darshan`,                         priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/tours/heritage-walk`,                                   priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/golden-triangle`,                                        priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE}/services`,                                               priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/services/cab`,                                           priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/services/boat`,                                          priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE}/services/hotel`,                                         priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/services/tour`,                                          priority: 0.85, changeFrequency: 'monthly' },

    // { url: `${BASE}/tour-packages`,                                         priority: 0.9,  changeFrequency: 'weekly' },
    // { url: `${BASE}/tour-packages/kashi-ayodhya`,                           priority: 0.9,  changeFrequency: 'monthly' },
    // { url: `${BASE}/tour-packages/kashi-prayagraj-ayodhya`,                 priority: 0.9,  changeFrequency: 'monthly' },
    // { url: `${BASE}/tour-packages/divya-dham-yatra`,                        priority: 0.85, changeFrequency: 'monthly' },
    // { url: `${BASE}/tour-packages/varanasi-tour-2-days-1-night`,            priority: 0.85, changeFrequency: 'monthly' },
    // { url: `${BASE}/tour-packages/varanasi-2-days`,                         priority: 0.85, changeFrequency: 'monthly' },
    // { url: `${BASE}/tour-packages/varanasi-3-days`,                         priority: 0.85, changeFrequency: 'monthly' },
    // { url: `${BASE}/tour-packages/varanasi-group-tour-itinerary`,           priority: 0.8,  changeFrequency: 'monthly' },
    // { url: `${BASE}/hotels`,                                                 priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/boating`,                                                priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/boat-rides`,                                             priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/cab`,                                                    priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/sightseeing`,                                            priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/plan-yatra`,                                             priority: 0.85, changeFrequency: 'weekly' },
    { url: `${BASE}/travel-itinerary`,                                       priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE}/about`,                                                  priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${BASE}/contact`,                                                priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE}/testimonials`,                                           priority: 0.65, changeFrequency: 'monthly' },
    { url: `${BASE}/legal/privacy-policy`,                                   priority: 0.3,  changeFrequency: 'yearly' },
    { url: `${BASE}/legal/terms-and-conditions`,                             priority: 0.3,  changeFrequency: 'yearly' },
    { url: `${BASE}/legal/cancellation-policy`,                              priority: 0.3,  changeFrequency: 'yearly' },
    { url: `${BASE}/legal/disclaimer`,                                       priority: 0.3,  changeFrequency: 'yearly' },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
