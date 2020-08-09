import React, { useState, useMemo } from 'react'
import { usePosts } from '../utils/use-posts'
import TimeLine from './timeline'
import Posts from './posts'
import styles from '../styles/common.module.scss'

const Archive = () => {
  const { posts, timeline } = usePosts()
  const [selectedTime, setSelectedTime] = useState(timeline.length > 0 ? timeline[0] : 0)
  const timePosts = useMemo(() => {
    return posts.hasOwnProperty(selectedTime) ? posts[selectedTime] : []
  }, [selectedTime, posts])

  return (
    <div className={styles.postsContainer}>
      <div style={{ display: 'flex' }}>
        <Posts posts={timePosts} />
        <TimeLine timeline={timeline} setTime={setSelectedTime} time={selectedTime} />
      </div>
    </div>
  )
}

export default Archive