import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Component Imports
import Sidebar from './components/slidebar';

// Auth Pages
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';

// Dashboard Page
import Dashboard from './pages/dashboard/dashboard';

// Move History Page
import MoveHistory from './pages/moveHistory/moveHistory';
<<<<<<< HEAD
=======

// Operations - Adjustments
import Adjustments from './pages/operations/adjustment/adjustments';
import AdjustmentsDetails from './pages/operations/adjustment/adjustmentsDetails';
import CreateAdjustment from './pages/operations/adjustment/createAdjustments';

// Operations - Deliveries
import Deliveries from './pages/operations/deliveries/deliveries';
import CreateDelivery from './pages/operations/deliveries/createDelivery';
import DeliveryDetails from './pages/operations/deliveries/deliveryDetails';

// Operations - Receipts
import Receipts from './pages/operations/receipts/receipts';
import ReceiptDetails from './pages/operations/receipts/receiptDetails';
import CreateReceipt from './pages/operations/receipts/createReceipt';

// Operations - Transfers
import Transfers from './pages/operations/transfers/transfers';
import CreateTransfer from './pages/operations/transfers/createTransfer';
import TransferDetails from './pages/operations/transfers/transferDetails';

// Settings
import Settings from './pages/settings/settings';
import Warehouses from './pages/settings/warehouses';
import CreateWarehouse from './pages/settings/createWarehouse';
import Locations from './pages/settings/location';
import CreateLocation from './pages/settings/createLocation';
import Categories from './pages/settings/categories';

// Stock
import Stock from './pages/stock/stock';

// Products
import Products from './pages/products/products';
import CreateProduct from './pages/products/createProduct';
import ProductDetails from './pages/products/productDetails';

// Main Application Layout (Includes Sidebar)
const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
>>>>>>> 33fe8a155ba88539e8a1a340c94487766cd35345

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (Standalone without Sidebar) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Application Routes (Wrapped in Sidebar Layout) */}
        <Route element={<MainLayout />}>
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

<<<<<<< HEAD
        {/* Move History Route */}
        <Route path="/move-history" element={<MoveHistory />} />
=======
          {/* Move History Route */}
          <Route path="/move-history" element={<MoveHistory />} />

          {/* Operations Routes */}
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

          {/* Settings Routes */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/warehouses" element={<Warehouses />} />
          <Route path="/settings/warehouses/create" element={<CreateWarehouse />} />
          <Route path="/settings/location" element={<Locations />} />
          <Route path="/settings/locations/create" element={<CreateLocation />} />
          <Route path="/settings/categories" element={<Categories />} />

          {/* Stock Route */}
          <Route path="/stock" element={<Stock />} />

          {/* Products Routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
>>>>>>> 33fe8a155ba88539e8a1a340c94487766cd35345
      </Routes>
    </BrowserRouter>
  );
}

export default App;