import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Auth Pages
import login from './pages/auth/login';
import signup from './pages/auth/signup';

// Dashboard Page
import dashboard from './pages/dashboard/dashboard';

// Move History Page
import MoveHistory from './pages/moveHistory/moveHistory';

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
        <Route path="/move-history" element={<MoveHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;