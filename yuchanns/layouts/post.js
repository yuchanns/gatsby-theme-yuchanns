import React from 'react'
import SEO from '../components/seo'
import PostItem from '../components/post'

class Post extends React.Component {
    render() {
        const post = this.props.pageContext.post
        return (
            <React.Fragment>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description}
                    keywords={post.frontmatter.tags}
                />
                <PostItem post={post} detail={true} />
            </React.Fragment>
        )
    }
}

export default Post