import React from 'react'
import Top from '../components/top'
import Search from '../components/search'
import Archive from '../components/archive'
import SEO from '../components/seo'
import { SelectStateCtx } from '../utils/use-context'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SEO title="Home" />
        <Top />
        <Search />
        <SelectStateCtx.Consumer>
          {ctx => (
            <Archive selectedTime={ctx.selectedTime} setSelectedTime={ctx.setSelectedTime} />
          )}
        </SelectStateCtx.Consumer>
      </React.Fragment>
    )
  }
}

export default Home