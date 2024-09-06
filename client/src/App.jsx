import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './Components/Header';
import About from './pages/About';
import Restaurantsignin from './pages/RestaurantsignIn';
import NGOsignin from './pages/NGOsignIn';
import NGOsignup from './pages/NGOsignup';
import Restaurantsignup from './pages/Restaurantsignup';
import NGOForgotPassword from './pages/NGOForgotpassword';
import NGOotp from './pages/NGOotp';
import { useState } from 'react';
import NGONewPasswordForm from './pages/NGONewPasswordForm';
import RestaurantForgotpassword from './pages/RestaurantForgotpassword';
import Restaurantotp from './pages/Restaurantotp';
import RestaurantNewPasswordForm from './pages/RestaurantNewPasswordForm';
import NGODashboard from './pages/NGODashboard';
import FoodDonatePage from './pages/FoodDonatePage';
import NGOProfile from './pages/NGOProfile';
import RestaurantProfile from './pages/RestaurantProfile';
import ShowDonation from './pages/ShowDonation';
import DonationDetails from './pages/DonationDetails';
import PrivateNGORoute from './Components/PrivateNGORoute';
import PrivateRestaurantRoute from './Components/PrivateRestaurantRoute';


export default function App() {
  const [email, setemail] = useState('');
  return(
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/restaurantsignin' element={<Restaurantsignin />} />
    <Route path='/NGOsignin' element={<NGOsignin />} />
    <Route path='/NGOsignup' element={<NGOsignup />} />
    <Route path='/Restaurantsignup' element={<Restaurantsignup />} />
    <Route path='/NGOForgotpassword' element={<NGOForgotPassword email={email} setEmail={setemail}/>} />
    <Route path='/NGOotp' element={<NGOotp email={email} />} />
    <Route path='/NGONewPasswordForm' element={<NGONewPasswordForm />} />
    <Route path='/RestaurantForgotpassword' element={<RestaurantForgotpassword email={email} setEmail={setemail}/>} />
    <Route path='/Restaurantotp' element={<Restaurantotp email={email} />} />
    <Route path='/RestaurantNewPasswordForm' element={<RestaurantNewPasswordForm />} />
    <Route path='/NGODashboard' element={<NGODashboard />} />
    <Route path='/FoodDonatePage' element={<FoodDonatePage />} />
    <Route path='/ShowDonation' element={<  ShowDonation />} />
    <Route path='/DonationDetails/:id' element={<  DonationDetails />} />
    <Route path='/RestaurantProfile' element={< RestaurantProfile />} />
    <Route path='/NGOProfile' element={<  NGOProfile />} />

  </Routes>
</BrowserRouter>
  );
}
