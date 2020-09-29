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
        <SelectStateCtx.Consumer>
          {ctx => (
            <React.Fragment>
              <Search
                category={ctx.selectedCategory}
                tag={ctx.selectedTag}
                setCategory={ctx.setSelectedCategory}
                setTag={ctx.setSelectedTag}
              />
              <Archive
                selectedTime={ctx.selectedTime}
                setSelectedTime={ctx.setSelectedTime}
                selectedCategory={ctx.selectedCategory}
                selectedTag={ctx.selectedTag}
              />
            </React.Fragment>
          )}
        </SelectStateCtx.Consumer>
      </React.Fragment>
    )
  }
}

export default Home