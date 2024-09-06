import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [userType, setUserType] = useState(null); // New state variable

  const handleRestaurantClick = () => {
    setUserType('Restaurant');
  };

  const handleNGOClick = () => {
    setUserType('NGO');
  };

  return (
    <header className='bg-slate-200 shadow-md navig'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Ali</span>
            <span className='text-slate-700'>Mento</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          {userType !== 'NGO' && (
            <Link to='/restaurantsignIn' onClick={handleRestaurantClick}>
              <li className='hidden sm:inline text-slate-700 hover:underline'>
                Restaurant
              </li>
            </Link>
          )}
          {userType !== 'Restaurant' && (
            <Link to='/NGOsignIn' onClick={handleNGOClick}>
              <li className='hidden sm:inline text-slate-700 hover:underline'>
                NGO
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
