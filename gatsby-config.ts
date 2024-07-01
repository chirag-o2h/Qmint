module.exports = {
  siteMetadata: {
    title: `Discover Treasure`,
    headline: `Queensland Mint`,
    siteUrl: `https://kaleidoscopic-sopapillas-147291.netlify.app/`,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/assets/favicon.ico`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: 'Montserrat',
            weights: ['100..900'],
            styles: ['normal', 'italic'],
          },
          {
            family: 'Open Sans',
            weights: ['300..800'],
            styles: ['normal', 'italic'],
          },
        ],
        display: 'swap',
        preconnect: true,
      },
    },
    // {
    //   resolve: `gatsby-omni-font-loader`,
    //   options: {
    //     mode: "async",
    //     enableListener: true,
    //     preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
    //     web: [
    //       {
    //         name: 'Montserrat',
    //         file: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
    //         crossOrigin: 'anonymous',
    //       },
    //       {
    //         name: 'Open Sans',
    //         file: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
    //         crossOrigin: 'anonymous',
    //       },
    //     ],
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
  ],
};
