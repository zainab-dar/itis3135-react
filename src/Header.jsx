import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Zainab Dar's Zen Dolphin | ITIS 3135</h1>
      <p className="tagline">Come along as I learn how to build my first webpage!</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/introduction">Introduction</Link>
        <Link to="/contract">Contract</Link>
        <Link to="/studentslist">Student List</Link>
        
      </nav>
    </header>
  );
}

export default Header;