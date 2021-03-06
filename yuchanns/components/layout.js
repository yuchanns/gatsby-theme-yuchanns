import React, { useState } from 'react'
import Background from './background'
import Card from './card'
import { usePosts } from '../utils/use-posts'
import { SelectStateCtx } from '../utils/use-context'
import styles from '../styles/common.module.scss'

const Layout = ({ children }) => {
  const { timeline } = usePosts()
  const [selectedTime, setSelectedTime] = useState(timeline.length > 0 ? timeline[0] : 0)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState('All')

  return (
    <div className={`${styles.container} ${styles.bodyContainer}`}>
      <Background />
      <div className={styles.headInner}>
        <Card />
        <div className={`${styles.block} ${styles.headBlockNav} ${styles.mainContainer}`}>
          <SelectStateCtx.Provider value={{
            selectedTime: selectedTime,
            setSelectedTime: setSelectedTime,
            selectedCategory: selectedCategory,
            setSelectedCategory: setSelectedCategory,
            selectedTag: selectedTag,
            setSelectedTag: setSelectedTag,
          }}>
            {children}
          </SelectStateCtx.Provider>
        </div>
      </div>
    </div>
  )
}

export default Layout