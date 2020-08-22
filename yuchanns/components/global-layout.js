import React from 'react'
import Head from '../components/head'
import Layout from '../components/layout'

class GlobalLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <Layout>
          {this.props.children}
        </Layout>
      </React.Fragment>
    )
  }
}

export default GlobalLayout