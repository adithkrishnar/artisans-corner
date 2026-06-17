import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VendorRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (!user.isVendor) return <Navigate to="/become-seller" replace />;

  return <Outlet />;
};

export default VendorRoute;