import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import ProductDetails from './page/ProductDetails';
import Cart from './page/Cart';
import Checkout from './page/Checkout';
import Login from './page/Login';
import UserProfile from './page/UserProfile';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 
import Register from './page/Register';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (all children of this route are protected) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
