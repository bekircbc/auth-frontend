import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production and Docker optimization
  output: 'standalone',
  
  async headers() {
    return [
      {
        // Apply these security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Prevents Clickjacking attacks
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevents MIME-type sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Restricts referrer information
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Disables unused browser features
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://localhost:8000;", 
            // CSP: Restricts data connections only to self and backend (localhost:8000)
          }
        ],
      },
    ];
  },
};

export default nextConfig;
