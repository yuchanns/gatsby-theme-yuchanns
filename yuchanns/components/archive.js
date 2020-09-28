import React, { useState, useMemo, useEffect } from 'react'
import { usePosts } from '../utils/use-posts'
import TimeLine from './timeline'
import Posts from './posts'
import scrollTo from 'gatsby-plugin-smoothscroll'
import styles from '../styles/common.module.scss'

const Archive = ({ selectedTime, setSelectedTime }) => {
  const { posts, timeline } = usePosts()
  const [displayAllPosts, setDisplay] = useState(false)

  const watchMediaWidth = () => {
    const mq = window.matchMedia("(min-width: 768px)")
    setDisplay(!mq.matches)
  }

  useEffect(() => {
    window.addEventListener('resize', watchMediaWidth)

    return () => {
      window.removeEventListener('resize', watchMediaWidth)
    }
  })
  
  const timePosts = useMemo(() => {
    if (displayAllPosts) {
      const allPosts = []
      timeline.forEach(time => {
        allPosts.push.apply(allPosts, posts[time])
      })

      return allPosts
    }

    return posts.hasOwnProperty(selectedTime) ? posts[selectedTime] : []
  }, [selectedTime, posts, displayAllPosts, timeline])

  return (
    <div className={styles.postsContainer}>
      <div style={{ display: 'flex' }}>
        <Posts posts={timePosts} time={selectedTime} />
        <TimeLine timeline={timeline} setTime={(time) => {
          window.setTimeout(() => scrollTo('#searchBar'), 500)
          setSelectedTime(time)
        }} time={selectedTime} />
      </div>
    </div>
  )
}

export default Archive