import React from 'react'
import AlgoliaSvg from './icons/algolia'
import styles from '../styles/common.module.scss'

const Search = () => {
  return (
    <div className={`${styles.searchContainer} ${styles.bodyBorder}`}>
      <div className={styles.searchBody}>
        <div className={styles.searchBox}>
          <input type="search" className={styles.searchInput} placeholder="Find a post..." />
        </div>
        <div className={styles.searchOptions}>
          <div className={styles.searchBtnBox}><button className={styles.searchBtn}><i>Category:</i> All</button></div>
          <div className={styles.searchBtnBox}><button className={styles.searchBtn}><i>Tag:</i> All</button></div>
          <AlgoliaSvg className={styles.searchBtnBox} />
        </div>
      </div>
    </div>
  )
}

export default Search