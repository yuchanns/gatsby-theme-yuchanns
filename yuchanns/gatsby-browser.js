import './styles/global.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'

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