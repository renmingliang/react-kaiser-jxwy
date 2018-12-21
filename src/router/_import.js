import Loadable from 'react-loadable'
import LoadComponent from '../components/LoadComponent/index'

const asyncImport = file => {
  return Loadable({
    loader: () => import('../views/' + file + '/index'),
    loading: LoadComponent
  })
}
export default asyncImport