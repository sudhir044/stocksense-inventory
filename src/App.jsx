import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Auth Pages
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';

// Dashboard Page
import Dashboard from './pages/dashboard/dashboard';

// Move History Page
import MoveHistory from './pages/moveHistory/moveHistory';

import Adjustments from './pages/operations/adjustment/adjustments';

import AdjustmentsDetails from './pages/operations/adjustment/adjustmentsDetails'; 

import CreateAdjustment from './pages/operations/adjustment/createAdjustment';

import Deliveries from './pages/operations/deliveries/deliveries';

import CreateDelivery from './pages/operations/deliveries/createDelivery';

import DeliveryDetails from './pages/operations/deliveries/deliveryDetails';

import Receipts from './pages/operations/receipts/receipts';

import ReceiptDetails from './pages/operations/receipts/receiptDetails';

import CreateReceipt from './pages/operations/receipts/createReceipt';

import Transfers from './pages/operations/transfers/transfers';

import CreateTransfer from './pages/operations/transfers/createTransfer';

import TransferDetails from './pages/operations/transfers/transferDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Move History Route */}
        <Route path="/move-history" element={<MoveHistory />} />

        <Route path="/operations/adjustment" element={<Adjustments />} />

        <Route path="/operations/adjustment/:id" element={<AdjustmentsDetails />} />

        <Route path="/operations/adjustment/create" element={<CreateAdjustment />} />

        <Route path="/operations/deliveries" element={<Deliveries />} />

        <Route path="/operations/deliveries/create" element={<CreateDelivery />} />

        <Route path="/operations/deliveries/details" element={<DeliveryDetails />} />

        <Route path="/operations/receipts" element={<Receipts />} />

        <Route path="/operations/receipts/details" element={<ReceiptDetails />} />

        <Route path="/operations/receipts/create" element={<CreateReceipt />} />

        <Route path="/operations/transfers" element={<Transfers />} />

        <Route path="/operations/transfers/create" element={<CreateTransfer />} />

        <Route path="/operations/transfers/details" element={<TransferDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;