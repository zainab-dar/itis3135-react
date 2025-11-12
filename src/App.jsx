import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <h2>Introduction</h2>
        <p> mini intro </p>
      </main>
      <footer>
        <p>hello</p>
      </footer>
      <Footer />
    </>
  )
}

export default App