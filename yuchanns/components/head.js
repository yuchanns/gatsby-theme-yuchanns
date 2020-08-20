import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import { useSiteMetadata } from '../utils/use-site-metadata'
import { useMathJax } from '../utils/use-mathjax'
import styles from '../styles/common.module.scss'

const Head = () => {
  const { nav }= useSiteMetadata()
  useMathJax()
  return (
    <div className={styles.head}>
      <div className={styles.container}>
        <div className={styles.headInner}>
          <Helmet>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>
          </Helmet>
          <div className={`${styles.headBlock} ${styles.headBlockUser}`}></div>
          <div className={`${styles.headBlock} ${styles.headBlockNav}`}>
            <div className={styles.navContainer}>
              <nav className={styles.navBody}>
              {nav.map(item => {
                if (item.hasOwnProperty('external') && item['external'] === true) {
                  return (
                    <a className={styles.navItem} href={item.url} activeClassName={styles.navItemSelected} key={item.name}>{item.name}</a>
                  )
                }
                return (
                  <Link className={styles.navItem} to={item.url} activeClassName={styles.navItemSelected} key={item.name}>{item.name}</Link>
                )
              })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Head