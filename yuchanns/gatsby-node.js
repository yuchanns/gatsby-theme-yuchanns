const path = require('path')
const usePosts = require('./utils/use-path')

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  createPage({
    path: '/',
    component: path.resolve(__dirname, 'layouts/home.js')
  })

  const posts = await usePosts(graphql)
  const postComponent = path.resolve(__dirname, 'layouts/post.js')

  posts.forEach(post => {
    console.log(post.frontmatter.path)
    createPage({
      path: post.frontmatter.path,
      component: postComponent,
      context: {
        post: post
      },
    })
  })
}