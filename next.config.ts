import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Legal pages — old short URLs Google indexed
      { source: '/terms',   destination: '/legal/terms-and-conditions', permanent: true },
      { source: '/privacy', destination: '/legal/privacy-policy',       permanent: true },

      // Boating sub-page that never existed
      { source: '/boating/events', destination: '/boating', permanent: true },

      // Taxi URLs — redirect to cab page
      { source: '/taxi/:path*', destination: '/cab', permanent: true },

      // Old packages URL
      { source: '/packages/:path*', destination: '/tour-packages', permanent: true },

      // Sightseeing sub-pages that never existed
      { source: '/sightseeing/activities/morning-boat-ride', destination: '/boat-rides',  permanent: true },
      { source: '/sightseeing/activities',                   destination: '/sightseeing', permanent: true },
      { source: '/sightseeing/temples',                      destination: '/sightseeing', permanent: true },

      // Blog — redirect to home until a blog exists
      { source: '/blog', destination: '/', permanent: false },
    ]
  },
};

export default nextConfig;
