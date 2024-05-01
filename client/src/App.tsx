import './App.css'
import { Route, Routes } from 'react-router-dom';

import Header from './common/el/header/header';
import Footer from './common/el/footer/footer';

import Main from './pages/mainPage/mainPage';
import Catalogue from './pages/cataloguePage/cataloguePage';
import AuthPage from './pages/authPage/authPage';
import FavouritesPage from './pages/favoritesPage/favourites';
import RouteProtector from './RouteProtector';

function App() {
return (
    <div className="main-container">
      <Header />

      <div className="body-container">
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/favourite" element={<RouteProtector needProtection={<FavouritesPage />} />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App
