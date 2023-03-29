/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      // 'localhost', // Valid WP Image domain.
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      'secure.gravatar.com',
      'via.placeholder.com',
    ],
  },

  reactStrictMode: true,
  trailingSlash: true,
};
module.exports = nextConfig;
