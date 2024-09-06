import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRestaurantRoute() {
  const { currentRestaurantUser } = useSelector((state) => state.user);
  return currentRestaurantUser ? <Outlet /> : <Navigate to='/Restaurantsignin' />;
}
