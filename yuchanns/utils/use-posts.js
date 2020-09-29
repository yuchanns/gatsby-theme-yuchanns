import { useStaticQuery, graphql } from 'gatsby'
import moment from 'moment'

export const usePosts = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query PostsData {
        allMarkdownRemark {
          nodes {
            excerpt(format: HTML, pruneLength: 400)
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
    `
  )
  const originPosts = allMarkdownRemark.nodes
  const timelinePosts = {}
  const topPosts = []
  const setOfCatetory = new Set()
  const setOfTag = new Set()
  originPosts.forEach(post => {
    const fileName = post.fileAbsolutePath.split('/')
    post.frontmatter.path = `/r/${post.frontmatter.category}/${fileName[fileName.length - 2]}`
    setOfCatetory.add(post.frontmatter.category)
    post.frontmatter.tags.forEach(tag => {
      setOfTag.add(tag)
    })
    const year = moment(post.frontmatter.date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format('YYYY')
    if (!timelinePosts.hasOwnProperty(year)) {
      timelinePosts[year] = [];
    };
    timelinePosts[year].push(post);
    if (post.frontmatter.tags.includes('top')) {
      topPosts.push(post)
    }
  })
  let timeline = Object.keys(timelinePosts);
  timeline.sort((a, b) => {
    return b - a;
  });
  let finalPosts = {}
  timeline.forEach(time => {
    var posts = timelinePosts[time];
    posts.sort((a, b) => {
      var btimestamp = new Date(b.frontmatter.date).valueOf();
      var atimestamp = new Date(a.frontmatter.date).valueOf();
      return btimestamp - atimestamp;
    });
    finalPosts[time] = posts;
  })

  return {
    posts: finalPosts,
    timeline: timeline,
    topPost: topPosts.length > 0 ? topPosts[0] : {},
    categories: setOfCatetory,
    tags: setOfTag,
  }
}