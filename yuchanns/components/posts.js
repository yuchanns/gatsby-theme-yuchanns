import React from 'react'
import Post from './post'
import Transition from "./transition"
import styles from '../styles/common.module.scss'

const Posts = ({ posts, pathname }) => {
  const location = { pathname: pathname }
  return (
    <div className={styles.postsList}>
      <div className={styles.postsBox}>
      <Transition location={location}>
      {posts.map(post => (
        <Post post={post} key={post.frontmatter.title} />
      ))}
      </Transition>
      </div>
    </div>
  )
}

export default Posts