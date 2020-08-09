import React from 'react'
import Post from './post'
import styles from '../styles/common.module.scss'

const Posts = ({ posts }) => {
  return (
    <div className={styles.postsList}>
      <div className={styles.postsBox}>
      {posts.map(post => (
        <Post post={post} key={post.frontmatter.title} />
      ))}
      </div>
    </div>
  )
}

export default Posts