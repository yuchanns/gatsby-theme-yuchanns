const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  createPage({
    path: '/',
    component: path.resolve(__dirname, 'layouts/home.js')
  })
}