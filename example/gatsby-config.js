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
      desc: '咖啡、代码与键盘',
    },
    nav: [
      { 'name': '首页', 'url': '/' },
      { 'name': 'Awesome', 'url': '/r/readme/awesome' },
      { 'name': 'Sina News', 'url': '/r/news/sina' },
      { 'name': 'Yuc\'s Anime', 'url': '//yuc.wiki/', 'external': true }
    ],
    siteUrl: 'https://www.yuchanns.xyz'
  },
  plugins: [
    {
      resolve: `gatsby-theme-yuchanns`,
      options: {},
    },
    `gatsby-plugin-sitemap`,
  ],
}
