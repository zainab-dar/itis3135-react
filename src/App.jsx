import { Link } from 'react-router-dom'

function App() {
  return (
    <main>
      <h1>Welcome to My Portfolio</h1>
      <p>This is the home page content.</p>
      
      {/* Add navigation links */}
      <nav>
        <Link to="/introduction">View Introduction</Link>
        <Link to="/contract">View Contract</Link>
      </nav>
    </main>
  )
}

export default App