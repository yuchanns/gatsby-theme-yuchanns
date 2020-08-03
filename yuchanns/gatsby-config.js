module.exports = (options = {}) => {
  return {
    siteMetadata: {
      title: 'Gatsby Theme - Yuchanns',
      description: 'Yuchanns - A Blog Theme for Gatsby',
      card: {
        name: 'yuchanns',
        avatar: '/yuchanns.jpg',
        job: 'What\'s the job',
        location: 'Guess where',
        desc: 'Nothing here',
      }
    },
    plugins: [
      `gatsby-plugin-smoothscroll`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          cssLoaderOptions: {
            localIdentName: '[hash:base64:20]'
          },
        },
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: "gatsby-remark-custom-blocks",
              options: {
                blocks: {
                  snippet: {
                    classes: "snippet"
                  },
                },
              },
            }
          ],
        },
      },
    ].filter(Boolean),
  }
}