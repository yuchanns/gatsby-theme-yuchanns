import React from 'react'
import styles from '../styles/common.module.scss'

const TimeLine = ({ timeline, time, setTime }) => {
  return (
    <div className={styles.yearsContainer}>
      <div className={styles.yearsBlock}>
        <div className={styles.yearsTimeline}>
          <ul className={styles.yearsList}>
          {timeline.map(currentTime => {
            var timeClass = styles.yearsItem;
            if (currentTime === time) {
              timeClass = `${timeClass} ${styles.selected}`;
            }
            return (
              <li key={currentTime}>
                <span
                  className={timeClass}
                  onClick={() => {
                    setTime(currentTime)
                  }}
                  onKeyDown={() => {
                    setTime(currentTime)
                  }}
                  role="button"
                  tabIndex="0"
                >{currentTime}</span>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TimeLine