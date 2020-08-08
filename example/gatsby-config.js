module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme - Yuchanns',
    description: 'Yuchanns - A Blog Theme for Gatsby',
    card: {
      name: 'yuchanns',
      avatar: '/yuchanns.jpg',
      nick: '科学搜查官',
      job: 'Backend Developer',
      location: 'Shenzhen, China',
      desc: 'Too much want to know, so little time to learn.',
    },
    nav: [
      { 'name': '首页', 'url': '/' },
      { 'name': '关于', 'url': '/readme' }
    ],
    siteUrl: 'https://github.com/yuchanns'
  },
  plugins: [
    {
      resolve: `gatsby-theme-yuchanns`,
      options: {},
    },
  ],
}