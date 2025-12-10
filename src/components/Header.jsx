import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
          <h1>Zainab Dar's Zen Dolphin | ITIS 3135</h1>
          <p className="tagline">Come along as I learn how to build my first webpage!</p>            <nav>
                <Link to="/">Home</Link> 
                <Link to="/introduction">Introduction</Link> 
                <Link to="/contract">Contract</Link> 
                <Link to="/students">Student List</Link>
                {/* The rest of the links are omitted as per assignment instructions */}
            </nav>
        </header>
    );
}

export default Header;