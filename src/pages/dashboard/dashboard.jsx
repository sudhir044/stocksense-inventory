import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Plus,
  Truck,
  FileText,
  Search,
  Bell,
  SlidersHorizontal,
} from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample KPI metrics
  const stats = [
    {
      title: 'Total Products',
      value: '1,248',
      change: '+12%',
      isPositive: true,
      icon: Package,
      color: 'indigo',
    },
    {
      title: 'Total Stock Quantity',
      value: '45,820',
      change: '+5.4%',
      isPositive: true,
      icon: TrendingUp,
      color: 'emerald',
    },
    {
      title: 'Low Stock Items',
      value: '14',
      change: '+3 today',
      isPositive: false,
      icon: AlertTriangle,
      color: 'amber',
    },
    {
      title: 'Pending Deliveries',
      value: '28',
      change: '-2 from yesterday',
      isPositive: true,
      icon: Truck,
      color: 'blue',
    },
  ];

  // Sample recent operations/moves
  const recentMoves = [
    {
      id: 'REC-00982',
      type: 'Receipt',
      product: 'Wireless Ergonomic Keyboard',
      qty: '+120 units',
      status: 'Done',
      time: '10 mins ago',
      user: 'Sarah Jenkins',
    },
    {
      id: 'DEL-00412',
      type: 'Delivery',
      product: '27" 4K Gaming Monitor',
      qty: '-15 units',
      status: 'In Transit',
      time: '42 mins ago',
      user: 'Mike Ross',
    },
    {
      id: 'TRN-00104',
      type: 'Transfer',
      product: 'USB-C Docking Station',
      qty: '50 units (WH-A → WH-B)',
      status: 'Processing',
      time: '2 hours ago',
      user: 'Alex Vance',
    },
    {
      id: 'ADJ-00053',
      type: 'Adjustment',
      product: 'Noise Cancelling Headphones',
      qty: '-2 units (Damaged)',
      status: 'Done',
      time: '5 hours ago',
      user: 'Sarah Jenkins',
    },
  ];

  // Sample low stock alerts
  const lowStockItems = [
    { name: 'Ultra-Slim Mechanical Keyboard', sku: 'KB-8821', stock: 4, min: 15 },
    { name: 'Ergonomic Vertical Mouse', sku: 'MS-3310', stock: 2, min: 10 },
    { name: 'Thunderbolt 4 Cable (2m)', sku: 'CB-9941', stock: 5, min: 20 },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header & Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Inventory Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Overview of stock levels, movements, and operational tasks.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            to="/products/create"
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
          <Link
            to="/operations/receipts/create"
            className="inline-flex items-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-lg text-sm transition-all"
          >
            <FileText className="w-4 h-4 mr-2 text-indigo-400" />
            New Receipt
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">
                  {item.title}
                </span>
                <div
                  className={`p-2.5 rounded-lg bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-3xl font-extrabold text-white">
                  {item.value}
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <span
                    className={`font-semibold ${
                      item.isPositive ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {item.change}
                  </span>
                  <span className="text-slate-500 ml-1.5">vs last week</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid: Recent Movements & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Recent Operations */}
        <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Operations</h2>
              <p className="text-xs text-slate-400">
                Latest stock receipts, deliveries, and adjustments.
              </p>
            </div>
            <Link
              to="/move-history"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View All History →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/60 text-xs uppercase text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {recentMoves.map((move) => (
                  <tr key={move.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-semibold">
                      {move.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium">{move.type}</td>
                    <td className="py-3.5 px-4 text-slate-200">{move.product}</td>
                    <td className="py-3.5 px-4 font-mono text-xs">{move.qty}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          move.status === 'Done'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : move.status === 'In Transit'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {move.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Low Stock Alerts Card */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Low Stock Warning</h2>
              </div>
              <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/20 font-semibold">
                {lowStockItems.length} items
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Items below minimum safety reorder thresholds.
            </p>

            <div className="space-y-4">
              {lowStockItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-3.5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-200">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      SKU: {item.sku}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-red-400 font-bold">
                      {item.stock} in stock
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Min: {item.min}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/stock"
            className="mt-6 w-full text-center py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg border border-slate-600 transition-colors block"
          >
            Manage All Stock Levels
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;