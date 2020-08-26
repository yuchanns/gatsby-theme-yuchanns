import React from 'react'
import Head from './head'
import Layout from './layout'
import Transition from "./transition"

class GlobalLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <Layout>
          <Transition location={this.props.location}>{this.props.children}</Transition>
        </Layout>
      </React.Fragment>
    )
  }
}

export default GlobalLayout