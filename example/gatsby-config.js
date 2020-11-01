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
      desc: '咖啡、代码与键盘',
    },
    nav: [
      { 'name': '首页', 'url': '/' },
      { 'name': '关于', 'url': '/r/readme/readme' },
      { 'name': '作者', 'url': '//yuchanns.org', 'external': true }
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