import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            nav {
              name
              url
              external
            }
            description
            card {
              avatar
              nick
              desc
              job
              location
              name
            }
            title
          }
        }
      }
    `
  )

  return site.siteMetadata
}