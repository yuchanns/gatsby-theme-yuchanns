import React, { useMemo } from 'react'
import AlgoliaSvg from './icons/algolia'
import SearchBtn from './search-btn'
import { usePosts } from '../utils/use-posts'
import styles from '../styles/common.module.scss'

const Search = ({ setCategory, setTag, category, tag }) => {
  const { categories, tags } = usePosts()
  const setOfCategory = useMemo(() => {
    const arr = Array.from(categories)
    arr.unshift('All')
    return arr
  }, [categories])
  const setOfTag = useMemo(() => {
    const arr = Array.from(tags)
    arr.unshift('All')
    return arr
  }, [tags])

  return (
    <div className={`${styles.searchContainer} ${styles.bodyBorder}`} id='searchBar'>
      <div className={styles.searchBody}>
        <div className={styles.searchBox}>
          <input type="search" className={styles.searchInput} placeholder="Find a post..." />
        </div>
        <div className={styles.searchOptions}>
          <SearchBtn
            label="Category"
            set={setOfCategory}
            setLabel={setCategory}
            selected={category} />
          <SearchBtn
            label="Tag"
            set={setOfTag}
            setLabel={setTag}
            selected={tag} />
          <AlgoliaSvg className={styles.searchBtnBox} />
        </div>
      </div>
    </div>
  )
}

export default Search