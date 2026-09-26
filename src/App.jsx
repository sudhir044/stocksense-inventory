import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Auth Pages
import login from './pages/auth/login';
import signup from './pages/auth/signup';

// Dashboard Page
import dashboard from './pages/dashboard/dashboard';

// Move History Page
import moveHistory from './pages/moveHistory/moveHistory';

import adjustments from './pages/operations/adjustment/adjustments';

import adjustmentsDetails from './pages/operations/adjustment/adjustmentsDetails'; 

import createAdjustment from './pages/operations/adjustment/createAdjustment';

import deliveries from './pages/operations/deliveries/deliveries';

import createDelivery from './pages/operations/deliveries/createDelivery';

import deliveryDetails from './pages/operations/deliveries/deliveryDetails';

import receipts from './pages/operations/receipts/receipts';

import receiptDetails from './pages/operations/receipts/receiptDetails';

import createReceipt from './pages/operations/receipts/createReceipt';

import transfers from './pages/operations/transfers/transfers';

import createTransfer from './pages/operations/transfers/createTransfer';

import transferDetails from './pages/operations/transfers/transferDetails';
// Setting
import Settings from './pages/settings/settings';
import Warehouses from './pages/settings/warehouses';
import CreateWarehouse from './pages/settings/createWarehouse';
import Locations from './pages/settings/location';
import CreateLocation from './pages/settings/createLocation';
import Categories from './pages/settings/categories';

// Stock
import Stock from './pages/stock/stock';


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

        <Route path="/operations/adjustment" element={<adjustments />} />

        <Route path="/operations/adjustment/:id" element={<adjustmentsDetails />} />

        <Route path="/operations/adjustment/create" element={<createAdjustment />} />

        <Route path="/operations/deliveries" element={<deliveries />} />

        <Route path="/operations/deliveries/create" element={<createDelivery />} />

        <Route path="/operations/deliveries/details" element={<deliveryDetails />} />

        <Route path="/operations/receipts" element={<receipts />} />

        <Route path="/operations/receipts/details" element={<receiptDetails />} />

        <Route path="/operations/receipts/create" element={<createReceipt />} />

        <Route path="/operations/transfers" element={<transfers />} />

        <Route path="/operations/transfers/create" element={<createTransfer />} />

        <Route path="/operations/transfers/details" element={<transferDetails />} />
        

        {/* Settings Route */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/warehouses" element={<Warehouses />} />
        <Route path="/settings/warehouses/create" element={<CreateWarehouse />} />
        <Route path="/settings/location" element={<Locations />} />
        <Route path="/settings/locations/create" element={<CreateLocation />} />
        <Route path="/settings/categories" element={<Categories />} />

        {/* Stock Route */}
        <Route path="/stock" element={<Stock />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;