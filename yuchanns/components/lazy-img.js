import React from 'react'
import styles from '../styles/common.module.scss'

class LazyImg extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoad: false,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      const avatarImg = new Image()
      avatarImg.src = this.props.src
      avatarImg.onload = () => {
        this.setState({
          isLoad: true
        })
      }
    }, 1000)
  }
  render() {
    const minWidth = Math.min(this.props.width, this.props.height)
    return (
      <React.Fragment>
        {this.state.isLoad ?
          (<img
            className={`${styles.lazyImage} ${this.props.className}`}
            width={this.props.width}
            height={this.props.height}
            src={this.props.src}
            alt={this.props.alt} />) :
          (<svg
            className={`${styles.lazyImagePlaceholder} ${this.props.className}`}
            xmlns="http://www.w3.org/2000/svg"
            width={minWidth}
            height={minWidth}
            viewBox={`0 0 ${minWidth} ${minWidth}`}
          >
            <rect fill="#ddd" width={minWidth} height={minWidth} />
            <text
              fill="rgba(0,0,0,0.5)"
              fontFamily="sans-serif"
              fontSize="30"
              dy="10.5"
              fontWeight="bold"
              x="50%"
              y="50%"
              textAnchor="middle"
            >{this.props.width}×{this.props.height}</text>
          </svg>)
        }
      </React.Fragment>
    )
  }
}

export default LazyImg