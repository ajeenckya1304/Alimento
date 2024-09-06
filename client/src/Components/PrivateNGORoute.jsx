import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateNGORoute() {
  const { currentNGOUser } = useSelector((state) => state.user);
  return currentNGOUser ? <Outlet /> : <Navigate to='/NGOsignin' />;
}
