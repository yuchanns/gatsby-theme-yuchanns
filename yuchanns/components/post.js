import React from 'react'
import moment from 'moment'
import { Link } from 'gatsby'
import styles from '../styles/common.module.scss'

const Post = ({ post, detail=false }) => {
  const format = date => {
    return moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').fromNow()
  }
  let postClassName = `${styles.postsMainBlock}`
  if (!detail) {
    postClassName = `${postClassName} ${styles.postsMainLimit} ${styles.mask}`
  }
  return (
    <div className={styles.postsItem}>
      <div className={styles.postsContent}>
        <Link to={post.frontmatter.path}>
          <div className={styles.postsInfoContainer}>
            <div className={styles.postsInfoBlock}>
              <div className={styles.postsInfoDate}>
                <span className={styles.postsInfoDateText}>Posted {format(post.frontmatter.date)}</span>
              </div>
            </div>
          </div>
          <div className={styles.postsTitleContainer}>
            <div className={styles.postsTitleBlock}>
              <div className={styles.postsTitleBox}>
                <h3 className={styles.postsTitleText}>{post.frontmatter.title}</h3>
              </div>
            </div>
          </div>
        </Link>
        <div className={styles.postsMainContainer}>
          <div className={postClassName}>
            <div className={`markdown-body`} dangerouslySetInnerHTML={{__html: detail ? post.html : post.excerpt}}></div>
          </div>
        </div>
        <div className={styles.postsTopicsContainer}>
          <div className={styles.postsTopicsBlock}>
          {post.frontmatter.tags.map(tag => (
            <Link className={styles.postsTopicsTag} to='/' key={tag}>{tag}</Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post