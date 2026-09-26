import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import ForgotPassword from './pages/auth/forgotPassword';
import VerifyOtp from './pages/auth/verifyOtp';
import ResetPassword from './pages/auth/resetPassword';

// Dashboard Page
import Dashboard from './pages/dashboard/dashboard';

// Move History Page
import MoveHistory from './pages/moveHistory/moveHistory';

// Operations - Adjustments
import Adjustments from './pages/operations/adjustment/adjustments';
import AdjustmentsDetails from './pages/operations/adjustment/adjustmentsDetails';
import CreateAdjustments from './pages/operations/adjustment/createAdjustments';

// Operations - Deliveries
import Deliveries from './pages/operations/deliveries/deliveries';
import CreateDelivery from './pages/operations/deliveries/createDelivery';
import DeliveryDetails from './pages/operations/deliveries/deliveryDetails';

// Operations - Receipts
import Receipts from './pages/operations/receipt/receipts';
import ReceiptDetails from './pages/operations/receipt/receiptDetails';
import CreateReceipt from './pages/operations/receipt/createReceipt';

// Operations - Transfers
import Transfers from './pages/operations/transfers/transfer';
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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/move-history"
            element={
              <ProtectedRoute>
                <MoveHistory />
              </ProtectedRoute>
            }
          />

          {/* Operations - Adjustments */}
          <Route
            path="/operations/adjustment"
            element={
              <ProtectedRoute>
                <Adjustments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/adjustments"
            element={
              <ProtectedRoute>
                <Adjustments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/adjustment/:id"
            element={
              <ProtectedRoute>
                <AdjustmentsDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/adjustments/:id"
            element={
              <ProtectedRoute>
                <AdjustmentsDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/adjustment/create"
            element={
              <ProtectedRoute>
                <CreateAdjustments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/adjustments/create"
            element={
              <ProtectedRoute>
                <CreateAdjustments />
              </ProtectedRoute>
            }
          />

          {/* Operations - Deliveries */}
          <Route
            path="/operations/deliveries"
            element={
              <ProtectedRoute>
                <Deliveries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/deliveries/create"
            element={
              <ProtectedRoute>
                <CreateDelivery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/deliveries/details"
            element={
              <ProtectedRoute>
                <DeliveryDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/deliveries/:id"
            element={
              <ProtectedRoute>
                <DeliveryDetails />
              </ProtectedRoute>
            }
          />

          {/* Operations - Receipts */}
          <Route
            path="/operations/receipts"
            element={
              <ProtectedRoute>
                <Receipts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/receipts/create"
            element={
              <ProtectedRoute>
                <CreateReceipt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/receipts/details"
            element={
              <ProtectedRoute>
                <ReceiptDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/receipts/:id"
            element={
              <ProtectedRoute>
                <ReceiptDetails />
              </ProtectedRoute>
            }
          />

          {/* Operations - Transfers */}
          <Route
            path="/operations/transfers"
            element={
              <ProtectedRoute>
                <Transfers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/transfers/create"
            element={
              <ProtectedRoute>
                <CreateTransfer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/transfers/details"
            element={
              <ProtectedRoute>
                <TransferDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/transfers/:id"
            element={
              <ProtectedRoute>
                <TransferDetails />
              </ProtectedRoute>
            }
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/warehouses"
            element={
              <ProtectedRoute>
                <Warehouses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/warehouses/create"
            element={
              <ProtectedRoute>
                <CreateWarehouse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/location"
            element={
              <ProtectedRoute>
                <Locations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/locations/create"
            element={
              <ProtectedRoute>
                <CreateLocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />

          {/* Stock */}
          <Route
            path="/stock"
            element={
              <ProtectedRoute>
                <Stock />
              </ProtectedRoute>
            }
          />

          {/* Products */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/create"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;