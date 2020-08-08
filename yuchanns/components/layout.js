import React from 'react'
import Background from './background'
import Card from './card'
import styles from '../styles/common.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={`${styles.container} ${styles.bodyContainer}`}>
      <Background />
      <div className={styles.headInner}>
        <Card />
        <div className={`${styles.block} ${styles.headBlockNav} ${styles.mainContainer}`}>
        {children}
        </div>
      </div>
    </div>
  )
}

export default Layout