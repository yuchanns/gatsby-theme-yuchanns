import React from 'react'
import Top from '../components/top'
import Search from '../components/search'
import Archive from '../components/archive'
import SEO from '../components/seo'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SEO title="Home" />
        <Top />
        <Search />
        <Archive />
      </React.Fragment>
    )
  }
}

export default Home