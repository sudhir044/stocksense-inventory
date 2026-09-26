import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Boxes,
  FileText,
  Truck,
  ArrowRightLeft,
  SlidersHorizontal,
  History,
  FolderTree,
  Warehouse,
  MapPin,
  User,
  LogOut,
  ChevronDown,
  Layers,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [operationsOpen, setOperationsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(
    location.pathname.startsWith('/settings')
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center px-3 py-2 text-xs font-medium rounded-[6px] transition-colors ${isActive
      ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600 rounded-l-none'
      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  const subNavItemClass = ({ isActive }) =>
    `flex items-center pl-8 pr-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors ${isActive
      ? 'text-blue-700 font-semibold bg-blue-50/60'
      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 select-none">
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 bg-white">
        <NavLink to="/dashboard" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-blue-600 flex items-center justify-center text-white shadow-2xs">
            <Boxes className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-slate-900 uppercase">StockSense</span>
            <span className="block text-[10px] text-slate-500 font-medium tracking-wider -mt-0.5">ENTERPRISE IMS</span>
          </div>
        </NavLink>

        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 rounded-[6px]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>


      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">

        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
            Core Inventory
          </div>
          <div className="space-y-0.5">
            <NavLink to="/dashboard" className={navItemClass}>
              <LayoutDashboard className="w-4 h-4 mr-2.5 text-slate-500 shrink-0" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/products" className={navItemClass}>
              <Package className="w-4 h-4 mr-2.5 text-slate-500 shrink-0" />
              <span>Products</span>
            </NavLink>
            <NavLink to="/stock" className={navItemClass}>
              <Boxes className="w-4 h-4 mr-2.5 text-slate-500 shrink-0" />
              <span>Stock Balances</span>
            </NavLink>
          </div>
        </div>


        <div>
          <button
            onClick={() => setOperationsOpen(!operationsOpen)}
            className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 mb-1 hover:text-slate-600 cursor-pointer"
          >
            <span>Operations</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${operationsOpen ? 'rotate-180' : ''}`} />
          </button>

          {operationsOpen && (
            <div className="space-y-0.5 mt-0.5">
              <NavLink to="/operations/receipts" className={navItemClass}>
                <FileText className="w-4 h-4 mr-2.5 text-slate-500 shrink-0" />
                <span>Receipts</span>
              </NavLink>
              <NavLink to="/operations/deliveries" className={navItemClass}>
                <Truck className="w-4 h-4 mr-2.5 text-slate-500 shrink-0" />
                <span>Deliveries</span>
              </NavLink>
              <NavLink to="/operations/transfers" className={navItemClass}>
                <ArrowRightLeft className="w-4 h-4 mr-2.5 text-slate-500 shrink-0" />
                <span>Transfers</span>
              </NavLink>
              <NavLink to="/operations/adjustments" className={navItemClass}>
                <SlidersHorizontal className="w-4 h-4 mr-2.5 text-slate-500 shrink-0" />
                <span>Adjustments</span>
              </NavLink>
            </div>
          )}
        </div>


        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
            Audit Trail
          </div>
          <div className="space-y-0.5">
            <NavLink to="/move-history" className={navItemClass}>
              <History className="w-4 h-4 mr-2.5 text-slate-500 shrink-0" />
              <span>Move History</span>
            </NavLink>
          </div>
        </div>


        <div>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 mb-1 hover:text-slate-600 cursor-pointer"
          >
            <span>Settings</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`} />
          </button>

          {settingsOpen && (
            <div className="space-y-0.5 mt-0.5">
              <NavLink to="/settings/categories" className={subNavItemClass}>
                <FolderTree className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                <span>Categories</span>
              </NavLink>
              <NavLink to="/settings/warehouses" className={subNavItemClass}>
                <Warehouse className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                <span>Warehouses</span>
              </NavLink>
              <NavLink to="/settings/location" className={subNavItemClass}>
                <MapPin className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                <span>Locations</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>


      <div className="p-3 border-t border-slate-200 bg-slate-50/50">
        <NavLink
          to="/profile"
          className="flex items-center space-x-2.5 p-2 rounded-[6px] hover:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-xs font-semibold text-slate-900 truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] text-slate-500 font-mono truncate">{user?.email || 'user@stocksense.com'}</p>
          </div>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full mt-2 flex items-center justify-center px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-[6px] transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 mr-1.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>

      <aside className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>


      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
