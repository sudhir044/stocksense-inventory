import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Auth Pages
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';

// Dashboard Page
import Dashboard from './pages/dashboard/dashboard';

// Move History Page
import MoveHistory from './pages/moveHistory/moveHistory';

// Products Page
import Products from './pages/products/products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Move History Route */}
        <Route path="/move-history" element={<MoveHistory />} />

        {/* Products Route */}
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;