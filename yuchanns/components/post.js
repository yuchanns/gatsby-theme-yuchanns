import React from 'react'
import moment from 'moment'
import { Link } from 'gatsby'
import { SelectStateCtx } from '../utils/use-context'
import { navigate } from "@reach/router"  
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
          <div className={styles.postsInfoContainer}>
            <div className={styles.postsInfoBlock}>
              <div className={styles.postsInfoDate}>
                <SelectStateCtx.Consumer>
                  {ctx => (
                    <button
                      className={styles.postsInfoCategory}
                      onClick={() => {
                          ctx.setSelectedCategory(post.frontmatter.category)
                          navigate('/')
                      }}>
                      <span
                        className={styles.postsInfoCategoryIcon}
                        style={{ backgroundColor: post.frontmatter.categoryIconColor }} />
                      <span className={styles.postsInfoCategoryText}>{post.frontmatter.category}</span>
                    </button>
                  )}
                </SelectStateCtx.Consumer>
                <span className={styles.postsInfoDateText}>Posted {format(post.frontmatter.date)}</span>
              </div>
            </div>
        </div>
        <Link to={post.frontmatter.path}>
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
            <SelectStateCtx.Consumer>
              {ctx => {
                return post.frontmatter.tags.map(tag => (
                  <button
                    className={styles.postsTopicsTag}
                    to='/'
                    key={tag}
                    onClick={() => {
                      ctx.setSelectedTag(tag)
                      navigate('/')
                    }}
                  >{tag}</button>
                ))
              }}
            </SelectStateCtx.Consumer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post