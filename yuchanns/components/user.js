import React from 'react'
import { useSiteMetadata } from '../utils/use-site-metadata'
import LazyImg from './lazy-img'
import styles from '../styles/common.module.scss'

const User = () => {
  const { card: { avatar, name, nick, desc } } = useSiteMetadata()
  const avatarLength = 260
  return (
    <React.Fragment>
      <div className={`${styles.clearfix} ${styles.cardUser}`}>
        <div className={styles.cardAvatarContainer}>
          <LazyImg className={styles.cardAvatar} width={avatarLength} height={avatarLength} src={avatar} alt={name} />
        </div>
        <div className={styles.cardNameContainer} id="card-name-container">
          <h1 className={styles.cardNames}>
            <span className={styles.cardName}>{nick}</span>
            <span className={styles.cardNickname}>{name}</span>
          </h1>
        </div>
      </div>
      <div className={styles.cardNote}>
        <div>{desc}</div>
      </div>
    </React.Fragment>
  )
}

export default User