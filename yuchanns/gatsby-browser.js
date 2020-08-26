import './styles/global.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import { setMathJaxConfig } from './utils/use-mathjax'

export const onInitialClientRender = () => {
    deckDeckGoHighlightElement()
}

export const onRouteUpdate = () => {
    // the mathJax config should be set each time route update
    setMathJaxConfig()
}

export const shouldUpdateScroll = ({
    routerProps: { location },
}) => {
    const transitionDelay = 500
    if (location.action === 'PUSH') {
        window.setTimeout(() => scrollTo('html'), transitionDelay)
    } else {
        window.setTimeout(
            () => scrollTo('html'),
            transitionDelay
        )
    }
    return false
}