import { fetchSinaNews } from './utils/use-sina'
import { baiduPush } from './utils/use-baidu'

export const onRouteUpdate = ({ location }) => {
  fetchSinaNews(location)
  baiduPush()
}