import React, { useState, useMemo, useEffect } from 'react'
import { usePosts } from '../utils/use-posts'
import TimeLine from './timeline'
import Posts from './posts'
import scrollTo from 'gatsby-plugin-smoothscroll'
import styles from '../styles/common.module.scss'

const Archive = ({
  selectedTime,
  setSelectedTime,
  selectedCategory,
  selectedTag,
}) => {
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
    let allPosts = []

    if (displayAllPosts) {
      timeline.forEach(time => {
        allPosts.push.apply(allPosts, posts[time])
      })
    } else {
      allPosts = posts.hasOwnProperty(selectedTime) ? posts[selectedTime] : []
    }

    const filteredPosts = []
    const strCategory = String(selectedCategory)
    const strTag = String(selectedTag)

    allPosts.forEach(post => {
      if (
        (strCategory === 'All' && strTag === 'All') ||
        (strTag === 'All' && post.frontmatter.category === strCategory) ||
        (strCategory === 'All' && post.frontmatter.tags.includes(strTag)) ||
        (post.frontmatter.category === strCategory && post.frontmatter.tags.includes(strTag))
      ) {
        filteredPosts.push(post)
      }
    })

    return filteredPosts
  }, [selectedTime, posts, displayAllPosts, timeline, selectedCategory, selectedTag])

  return (
    <div className={styles.postsContainer}>
      <div style={{ display: 'flex' }}>
        <Posts posts={timePosts} pathname={`${selectedTime} ${selectedCategory} ${selectedTag}`} />
        <TimeLine timeline={timeline} setTime={(time) => {
          window.setTimeout(() => scrollTo('#searchBar'), 500)
          setSelectedTime(time)
        }} time={selectedTime} />
      </div>
    </div>
  )
}

export default Archive