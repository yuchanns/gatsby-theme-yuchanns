import { fetchSinaNews } from './utils/use-sina'

export const onRouteUpdate = ({ location }) => {
  fetchSinaNews(location)
}