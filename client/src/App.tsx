import './App.css'
import { Route, Routes } from 'react-router-dom';

import Header from './common/el/header/header';
import Footer from './common/el/footer/footer';

import Main from './pages/mainPage/mainPage';
import Catalogue from './pages/cataloguePage/cataloguePage';
import AuthPage from './pages/authPage/authPage';
import FavouritesPage from './pages/favoritesPage/favourites';
import RouteProtector from './RouteProtector';
import HotelPage from './pages/hotelPage/hotelPage';
import AddPage from './pages/addPage/addPage';
import AboutPage from './pages/aboutPage/aboutPage';


function App() {
return (
    <div className="main-container">
      <Header />

      <div className="body-container">
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/favourite" element={<RouteProtector needProtection={<FavouritesPage />} needAdminStatus={false}/>} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/add" element={<RouteProtector needProtection={<AddPage />} needAdminStatus={true}/>} />
          <Route path="/add/:id" element={<RouteProtector needProtection={<AddPage />} needAdminStatus={true}/>} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App
