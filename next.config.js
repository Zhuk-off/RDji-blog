/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'ru-RU'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'ru-RU',
    // // This is a list of locale domains and the default locale they
    // // should handle (these are only required when setting up domain routing)
    // // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en-US',
    //   },
    //   {
    //     domain: 'example.nl',
    //     defaultLocale: 'nl-NL',
    //   },
    //   {
    //     domain: 'example.fr',
    //     defaultLocale: 'fr',
    //     // an optional http field can also be used to test
    //     // locale domains locally with http instead of https
    //     http: true,
    //   },
    // ],
  },
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
