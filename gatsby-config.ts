module.exports = {
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    title: `Discover Treasure`,
    headline: `Queensland Mint`,
    siteUrl: `https://bullionmark.netlify.app`,
    description: `Discover treasure at the Queensland Mint. Biggest range of Australian gold and silver coins. Public welcome. Buy & sell QMINT Direct and save. Visit us Instore, buy online or call 07 3184 8300.`,
    author: `@QMint`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     icon: `src/assets/favicon.ico`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-J4PT6SWF19", // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    // `gatsby-plugin-image`,
    // `gatsby-plugin-sharp`,
    // `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    // `gatsby-plugin-preact`,
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     printRejected: true, // Print removed selectors and processed file names
    //     develop: false, // Enable purging in development. Defaults to false.
    //     tailwind: true, // Enable tailwindcss support if you're using it
    //     whitelistPatterns: [
    //       // Example whitelisted patterns
    //       /^slick-/, // Whitelist classes used by Slick Carousel
    //       /Mui/, // Whitelist classes used by Material-UI components
    //     ],
    //     purgeOnly: [
    //       "/bootstrap/dist/css/bootstrap.min.css", // Bootstrap CSS file
    //       "src/**/*.scss", // All SCSS files in src directory
    //     ],
    //   },
    // },
    'gatsby-plugin-react-helmet',
  ],
};
