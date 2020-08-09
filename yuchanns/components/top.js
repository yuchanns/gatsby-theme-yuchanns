import React from 'react'
import { usePosts } from '../utils/use-posts'
import styles from '../styles/common.module.scss'

const Top = () => {
  const { topPost } = usePosts()
  return (
    <div>
    {Object.keys(topPost).length > 0 && (
      <div className={`${styles.aboutContainer} ${styles.headBlock} ${styles.bodyBorder}`}>
        <div className={styles.aboutBox}>
          <div className={styles.aboutTitle}>
            <div className={styles.titleText}>
              {topPost.frontmatter.title}<span className={styles.textGrayLight}>.md</span>
            </div>
          </div>
          <article
            className={`${styles.aboutContent} ${styles.mask} markdown-body`}
            style={{ overflowY: 'hidden' }}
            dangerouslySetInnerHTML={{ __html: topPost.excerpt }}>
          </article>
        </div>
      </div>
    )}
    </div>
  )
}

export default Top