import React from 'react'
import { Link } from 'gatsby'
import { useSiteMetadata } from '../utils/use-site-metadata'
import styles from '../styles/common.module.scss'

const Head = () => {
  const { nav }= useSiteMetadata()
  return (
    <div className={styles.head}>
      <div className={styles.container}>
        <div className={styles.headInner}>
          <div className={`${styles.headBlock} ${styles.headBlockUser}`}></div>
          <div className={`${styles.headBlock} ${styles.headBlockNav}`}>
            <div className={styles.navContainer}>
              <nav className={styles.navBody}>
              {nav.map(item => {
                if (item.hasOwnProperty('external') && item['external'] === true) {
                  return (
                    <a className={styles.navItem} to={item.url} activeClassName={styles.navItemSelected} key={item.name}>{item.name}</a>
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