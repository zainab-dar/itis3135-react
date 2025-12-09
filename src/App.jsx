import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import Pages
import Home from './Home';
import Introduction from './Introduction';
import Contract from './Contract';
import Students from './StudentList';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/contract" element={<Contract />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;