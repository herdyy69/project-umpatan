import 'animate.css'
import '@/styles/global.css'

if (typeof window !== 'undefined') {
  require('flowbite/dist/flowbite.js')
}

const App = ({ Component, pageProps }) => <Component {...pageProps} />

export default App
