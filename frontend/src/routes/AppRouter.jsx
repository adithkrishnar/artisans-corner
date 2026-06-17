import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import VendorRoute from './VendorRoute';

import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import VendorDashboard from '../pages/vendor/VendorDashboard';
import AddProduct from '../pages/vendor/AddProduct';
import EditProduct from '../pages/vendor/EditProduct';
import BecomeSeller from '../pages/vendor/BecomeSeller';
import Checkout from '../pages/buyer/Checkout';
import OrderSuccess from '../pages/buyer/OrderSuccess';
import OrderHistory from '../pages/buyer/OrderHistory';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Route>

          <Route element={<VendorRoute />}>
            <Route path="/dashboard/seller" element={<VendorDashboard />} />
            <Route path="/dashboard/seller/add-product" element={<AddProduct />} />
            <Route path="/dashboard/seller/edit-product/:id" element={<EditProduct />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;