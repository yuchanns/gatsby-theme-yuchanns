import React from 'react'
import UserMini from './user-mini'
import User from './user'
import Profile from './profile'
import styles from '../styles/common.module.scss'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const cardNameContainer = document.querySelector('#card-name-container')
      const showResult = cardNameContainer.getBoundingClientRect().bottom <= 0
      if (this.state.isShow !== showResult) {
        this.setState({
          isShow: showResult
        })
      }
    });
  }

  render() {
    return (
      <div className={styles.headBlockUser}>
        <div className={`${styles.block} ${styles.headBlock} ${styles.bodyBorder}`}>
          <div className={styles.card}>
            <UserMini isShow={this.state.isShow} />
            <User />
            <Profile />
          </div>
        </div>
      </div>
    )
  }
}

export default Card