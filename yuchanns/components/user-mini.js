import React from 'react'
import { useSiteMetadata } from '../utils/use-site-metadata'
import LazyImg from './lazy-img'
import styles from '../styles/common.module.scss'

const UserMini = ({ isShow }) => {
  const { card: { name, avatar } } = useSiteMetadata()
  return (
    <div className={styles.cardStickyBar} style={{display: isShow ? 'block' : 'none'}}>
      <div className={styles.cardUserMini}>
        <span className={styles.cardAvatarMini}>
          <LazyImg className={styles.cardAvatar} width="32" height="32" src={avatar} alt={name} />
        </span>
        <span className={styles.cardNameMini}>
          <strong>{name}</strong>
        </span>
      </div>
    </div>
  )
}

export default UserMini