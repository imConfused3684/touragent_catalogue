import './App.css'
import { Route, Routes } from 'react-router-dom';

import Header from './common/el/header/header';
import Footer from './common/el/footer/footer';

import Main from './pages/mainPage/mainPage';
import Catalogue from './pages/cataloguePage/cataloguePage';

function App() {
return (
    <div className="main-container">Ц
      <Header />

      <div className="body-container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/catalogue" element={<Catalogue />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App
