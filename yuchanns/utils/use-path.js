module.exports = async graphql => {
    const { data: { allMarkdownRemark: { nodes: originPosts } } } = await graphql(`
      {
        allMarkdownRemark {
          nodes {
            html
            frontmatter {
              category
              date
              description
              tags
              title
              wip
            }
            timeToRead
            fileAbsolutePath
          }
        }
      }
    `)
  
    const hashStringToColor = str => {
      let hash = 5381
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i)
      }
      let r = (hash & 0xFF0000) >> 16
      let g = (hash & 0x00FF00) >> 8
      let b = hash & 0x0000FF
      return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2)
    }

    return originPosts.map(post => {
      const fileName = post.fileAbsolutePath.split('/')
      post.frontmatter.path = `/r/${post.frontmatter.category}/${fileName[fileName.length - 2]}`
      delete post.fileAbsolutePath
      post.frontmatter.categoryIconColor = hashStringToColor(post.frontmatter.category)

      return post
    })
}