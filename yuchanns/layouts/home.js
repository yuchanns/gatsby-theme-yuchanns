import React from 'react'
import Head from '../components/head'
import Layout from '../components/layout'
import SEO from '../components/seo'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <Layout>
          <SEO title="Home" />
        </Layout>
      </React.Fragment>
    )
  }
}

export default Home