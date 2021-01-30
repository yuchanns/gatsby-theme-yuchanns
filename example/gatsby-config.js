module.exports = {
  siteMetadata: {
    title: '代码炼金工坊',
    description: '代码炼金工坊',
    card: {
      name: 'yuchanns',
      avatar: '/yuchanns.jpg',
      nick: '科学搜查官',
      job: '后端开发工程师',
      location: 'Shenzhen, China',
      desc: '追寻计算机炼金术的贤者之石',
    },
    nav: [
      { 'name': '首页', 'url': '/' },
      { 'name': 'Awesome', 'url': '/r/readme/awesome' },
      { 'name': 'RustCC', 'url': '/r/community/rustcc' },
      { 'name': 'Rust Playground', 'url': '/r/playground/playground-rust' },
      { 'name': 'Go Playground', 'url': '/r/playground/playground-go' },
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
