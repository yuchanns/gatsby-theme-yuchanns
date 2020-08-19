module.exports = (options = {}) => {
  return {
    siteMetadata: {
      title: 'Gatsby Theme - Yuchanns',
      description: 'Yuchanns - A Blog Theme for Gatsby',
      card: {
        name: 'yuchanns',
        nick: '科学搜查官',
        avatar: '/yuchanns.jpg',
        job: 'What\'s the job',
        location: 'Guess where',
        desc: 'Nothing here',
      },
      nav: [
        { 'name': '首页', 'url': '/' }
      ],
      siteUrl: 'https://github.com/yuchanns'
    },
    plugins: [
      `gatsby-theme-blog-core`,
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
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            `gatsby-remark-flowchart`,
            {
              resolve: "gatsby-remark-custom-blocks",
              options: {
                blocks: {
                  snippet: {
                    classes: "snippet"
                  },
                },
              },
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 590,
                showCaptions: true,
              },
            },
            {
              resolve: `gatsby-remark-highlight-code`,
              options: {
                terminal: 'none',
              }
            },
          ],
        },
      },
    ].filter(Boolean),
  }
}