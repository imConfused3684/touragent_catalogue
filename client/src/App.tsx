import './App.css'
import { Route, Routes } from 'react-router-dom';

import Header from './common/el/header/header';
import Footer from './common/el/footer/footer';

import Main from './pages/pageMain/pageMain';
import Catalogue from './pages/pageCatalogue/pageCatalogue';

function App() {
return (
    <div className="main-container">
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
