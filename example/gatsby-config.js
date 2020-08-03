module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme - Yuchanns',
      description: 'Yuchanns - A Blog Theme for Gatsby',
      card: {
        name: 'yuchanns',
        avatar: '/yuchanns.jpg',
        job: 'Backend Developer',
        location: 'Shenzhen, China',
        desc: 'Too much want to know, so little time to learn.',
      }
  },
  plugins: [
    {
      resolve: `gatsby-theme-yuchanns`,
      options: {},
    },
  ],
}