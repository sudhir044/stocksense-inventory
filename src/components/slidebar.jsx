import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  ArrowRightLeft,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Package,
  Layers,
  LogOut,
  Settings,
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Navigation Links Definition
  const navigationSections = [
    {
      title: 'Main',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Products Stock', path: '/inventory/products', icon: Boxes },
      ],
    },
    {
      title: 'Operations',
      items: [
        { name: 'Stock Transfers', path: '/operations/transfers', icon: ArrowRightLeft },
        { name: 'Adjustments', path: '/operations/adjustments', icon: SlidersHorizontal },
      ],
    },
    {
      title: 'Management',
      items: [
        { name: 'Warehouses', path: '/warehouses', icon: Layers },
        { name: 'Settings', path: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`relative min-h-screen bg-slate-950 border-r border-slate-800 text-slate-300 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header / Brand */}
      <div>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
              <Package className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-wide leading-none">
                  StockHub
                </span>
                <span className="text-[10px] text-indigo-400 font-mono mt-0.5">
                  INVENTORY OS
                </span>
              </div>
            )}
          </div>

          {/* Toggle Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-6">
          {navigationSections.map((section, idx) => (
            <div key={idx}>
              {!collapsed && (
                <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  {section.title}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                      }`}
                      title={collapsed ? item.name : undefined}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                      {!collapsed && <span className="ml-3 truncate">{item.name}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-800/80">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-2 rounded-lg bg-slate-900/60 border border-slate-800/50`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center font-bold text-xs justify-center shadow-md">
              AM
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-white truncate">Alex Morgan</span>
                <span className="text-[10px] text-slate-400 truncate">Inventory Lead</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;