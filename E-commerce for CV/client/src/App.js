import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import FavouriteProvider from './Pages/Context/FavouriteContext';
function App() {
  return (
    <>
      <FavouriteProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </FavouriteProvider>
    </>
  );
}

export default App;
