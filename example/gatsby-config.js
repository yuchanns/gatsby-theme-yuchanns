module.exports = {
  siteMetadata: {
    title: '科学世纪的炼金工坊',
    description: '某个程序员的博客',
    card: {
      name: 'yuchanns',
      avatar: '/yuchanns.jpg',
      nick: '科学搜查官',
      job: '后端开发工程师',
      location: 'Shenzhen, China',
      desc: '理想的生活是纯粹地热爱技术',
    },
    nav: [
      { 'name': '首页', 'url': '/' },
      { 'name': 'Awesome', 'url': '/r/readme/awesome' },
      { 'name': 'Yuc\'s Anime', 'url': '//yuc.wiki/', 'external': true }
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
