import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  Search,
  User,
  ShieldCheck,
  Bell,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TopHeader = ({ setMobileOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Generate clean section title from route
  const getRouteTitle = () => {
    const p = location.pathname;
    if (p.includes('/products/create')) return 'Catalog / Add Product';
    if (p.includes('/products/')) return 'Catalog / Product Details';
    if (p.startsWith('/products')) return 'Inventory / Products Catalog';
    if (p.startsWith('/stock')) return 'Inventory / Stock Balances';
    if (p.includes('/receipts/create')) return 'Operations / New Goods Receipt';
    if (p.startsWith('/operations/receipts')) return 'Operations / Receipts';
    if (p.includes('/deliveries/create')) return 'Operations / New Outgoing Delivery';
    if (p.startsWith('/operations/deliveries')) return 'Operations / Deliveries';
    if (p.includes('/transfers/create')) return 'Operations / New Internal Transfer';
    if (p.startsWith('/operations/transfers')) return 'Operations / Transfers';
    if (p.includes('/adjustments/create') || p.includes('/adjustment/create')) return 'Operations / New Stock Adjustment';
    if (p.startsWith('/operations/adjustments') || p.startsWith('/operations/adjustment')) return 'Operations / Adjustments';
    if (p.startsWith('/move-history')) return 'Audit / Stock Move History';
    if (p.startsWith('/settings/categories')) return 'Settings / Categories';
    if (p.startsWith('/settings/warehouses') || p.includes('/createWarehouse')) return 'Settings / Warehouses';
    if (p.startsWith('/settings/location') || p.includes('/createLocation')) return 'Settings / Locations';
    if (p.startsWith('/settings')) return 'Settings / Overview';
    if (p.startsWith('/profile')) return 'Account / User Profile';
    return 'Overview / Inventory Dashboard';
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">


      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-[6px]"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
          {getRouteTitle()}
        </div>
      </div>


      <div className="flex items-center space-x-3">

        <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>API Connected</span>
        </div>


        {user && (
          <Link
            to="/profile"
            className="flex items-center space-x-2 pl-2 pr-3 py-1 rounded-[6px] border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
              {user.name ? user.name.slice(0, 1).toUpperCase() : 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-semibold text-slate-800 leading-none">{user.name || user.email}</span>
              <span className="block text-[10px] text-slate-500 uppercase font-mono mt-0.5">{user.role || 'Member'}</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
