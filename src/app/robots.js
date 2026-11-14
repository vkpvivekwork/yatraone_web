export default function robots() {
  return {
    rules: [
      // Default: allow public website crawling
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/demo/'],
      },

      // Traditional search engines
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'DuckDuckBot',
        ],
        allow: '/',
        disallow: ['/demo/'],
      },

      // AI search crawlers
      {
        userAgent: [
          'OAI-SearchBot',
          'Claude-SearchBot',
          'PerplexityBot',
        ],
        allow: '/',
        disallow: ['/demo/'],
      },

      // User-requested AI page fetching
      {
        userAgent: [
          'ChatGPT-User',
          'Claude-User',
          'Perplexity-User',
        ],
        allow: '/',
        disallow: ['/demo/'],
      },

      // BLOCK: OpenAI training
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },

      // BLOCK: Anthropic training
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
      },

      // BLOCK: Common Crawl datasets
      {
        userAgent: 'CCBot',
        disallow: '/',
      },

      // BLOCK: Google extended AI use
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },

      // BLOCK: Apple extended AI use
      {
        userAgent: 'Applebot-Extended',
        disallow: '/',
      },

      // BLOCK: Meta AI training crawler
      {
        userAgent: 'meta-externalagent',
        disallow: '/',
      },
    ],

    sitemap: 'https://yatraksathi.com/sitemap.xml',
  }
}




// export default function robots() {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '/',
//       disallow: ['/demo/'],
//     },
//     sitemap: 'https://yatraksathi.com/sitemap.xml',
//   }
// }