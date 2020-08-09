import React from 'react'
import Head from '../components/head'
import Layout from '../components/layout'
import Top from '../components/top'
import Search from '../components/search'
import Archive from '../components/archive'
import SEO from '../components/seo'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <Layout>
          <SEO title="Home" />
          <Top />
          <Search />
          <Archive />
        </Layout>
      </React.Fragment>
    )
  }
}

export default Home