import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Auth Pages
import login from './pages/auth/login';
import signup from './pages/auth/signup';

// Dashboard Page
import dashboard from './pages/dashboard/dashboard';

// Move History Page
import moveHistory from './pages/moveHistory/moveHistory';

// Products Page
import products from './pages/products/products';
import createProduct from './pages/products/createProduct';
import productDetails from './pages/products/productDetails';

// Profile Page
import profile from './pages/profile/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<login />} />
        <Route path="/login" element={<login />} />
        <Route path="/signup" element={<signup />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<dashboard />} />

        {/* Move History Route */}
        <Route path="/move-history" element={<moveHistory />} />

        {/* Products Route */}
        <Route path="/products" element={<products />} />

        {/* Create Product Route */}
        <Route path="/products/create" element={<createProduct />} />

        {/* Product Details Route */}
        <Route path="/products/:id" element={<productDetails />} />

        {/* Profile Route */}
        <Route path="/profile" element={<profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;