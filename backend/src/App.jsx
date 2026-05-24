import Layout from './components/Layout.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import useScrollToTop from './hooks/useScrollToTop.js'
import './index.css'

function App() {
  useScrollToTop()

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default App
