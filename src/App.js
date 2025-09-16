import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import ProductDetails from './page/ProductDetails'; // nhớ tạo file này
import './index.css';
import Cart from './page/Cart';
import Checkout from './page/Checkout';
import Login from './page/Login';
import UserProfile from './page/UserProfile';
import { AuthProvider } from './AuthContext';
import ProtectedRoute   from './components/ProtectedRoute';
import Register from './page/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
    </Routes>
  </AuthProvider>
  );
}

export default App;
