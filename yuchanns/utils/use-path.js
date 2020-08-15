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
            }
            timeToRead
            fileAbsolutePath
          }
        }
      }
    `)

    return originPosts.map(post => {
        const fileName = post.fileAbsolutePath.split('/')
        post.frontmatter.path = `/r/${post.frontmatter.category}/${fileName[fileName.length - 2]}`
        delete post.fileAbsolutePath

        return post
    })
}