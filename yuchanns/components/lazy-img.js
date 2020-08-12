import React from 'react'

class LazyImg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoad: false,
    }
  }
  componentWillMount() {
    const avatarImg = new Image()
    avatarImg.src = this.props.src
    avatarImg.onload = () => {
      this.setState({
        isLoad: true
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isLoad ?
          (<img
            className={this.props.className}
            width={this.props.width}
            height={this.props.height}
            src={this.props.src}
            alt={this.props.alt} />) :
          (<div
            className={this.props.className}
            style={{
              width: `${this.props.width}px`,
              height: `${this.props.height}px`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <div className={`lds-roller`}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>)
        }
      </React.Fragment>
    )
  }
}

export default LazyImg