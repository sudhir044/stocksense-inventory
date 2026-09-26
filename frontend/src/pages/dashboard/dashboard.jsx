import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ArrowRightLeft,
  Boxes,
  LogOut,
  User,
  History,
} from 'lucide-react';
import dashboardService from '../../services/dashboard.service';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      totalProducts: 0,
      totalStock: 0,
      lowStock: 0,
      outOfStock: 0,
      pendingReceipts: 0,
      pendingDeliveries: 0,
      scheduledTransfers: 0,
    },
    recentMovements: [],
  });

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getDashboard();
      if (data) {
        setDashboardData({
          metrics: {
            totalProducts: data.metrics?.totalProducts ?? 0,
            totalStock: data.metrics?.totalStock ?? 0,
            lowStock: data.metrics?.lowStock ?? 0,
            outOfStock: data.metrics?.outOfStock ?? 0,
            pendingReceipts: data.metrics?.pendingReceipts ?? 0,
            pendingDeliveries: data.metrics?.pendingDeliveries ?? 0,
            scheduledTransfers: data.metrics?.scheduledTransfers ?? 0,
          },
          recentMovements: data.recentMovements || [],
        });
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to connect to API server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // KPI metrics mapped from live backend data
  const stats = [
    {
      title: 'Total Products',
      value: Number(dashboardData.metrics.totalProducts).toLocaleString(),
      change: 'Active in catalog',
      isPositive: true,
      icon: Package,
      color: 'indigo',
      link: '/products',
    },
    {
      title: 'Total Stock Quantity',
      value: Number(dashboardData.metrics.totalStock).toLocaleString(),
      change: 'Units on-hand',
      isPositive: true,
      icon: TrendingUp,
      color: 'emerald',
      link: '/stock',
    },
    {
      title: 'Low Stock Items',
      value: Number(dashboardData.metrics.lowStock).toLocaleString(),
      change: `${dashboardData.metrics.outOfStock} out of stock`,
      isPositive: dashboardData.metrics.lowStock === 0,
      icon: AlertTriangle,
      color: 'amber',
      link: '/stock',
    },
    {
      title: 'Pending Deliveries',
      value: Number(dashboardData.metrics.pendingDeliveries).toLocaleString(),
      change: `${dashboardData.metrics.pendingReceipts} pending receipts`,
      isPositive: true,
      icon: Truck,
      color: 'blue',
      link: '/operations/deliveries',
    },
  ];

  // Filter recent movements by search term
  const filteredMovements = dashboardData.recentMovements.filter((move) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      move.product_name?.toLowerCase().includes(term) ||
      move.sku?.toLowerCase().includes(term) ||
      move.movement_type?.toLowerCase().includes(term) ||
      move.reference_type?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Top Navigation Bar with Quick Links & User Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="flex items-center space-x-2 text-white font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Boxes className="w-5 h-5" />
            </div>
            <span>StockSense</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-slate-400">
            <Link to="/dashboard" className="text-white hover:text-indigo-400 transition-colors">
              Dashboard
            </Link>
            <Link to="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <Link to="/stock" className="hover:text-white transition-colors">
              Stock
            </Link>
            <Link to="/operations/receipts" className="hover:text-white transition-colors">
              Receipts
            </Link>
            <Link to="/operations/deliveries" className="hover:text-white transition-colors">
              Deliveries
            </Link>
            <Link to="/operations/transfers" className="hover:text-white transition-colors">
              Transfers
            </Link>
            <Link to="/operations/adjustments" className="hover:text-white transition-colors">
              Adjustments
            </Link>
            <Link to="/move-history" className="hover:text-white transition-colors">
              Move History
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchDashboard}
            disabled={loading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>

          {user && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-200 font-medium">{user.name || user.email}</span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px]">
                {user.role}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Inventory Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time live overview of stock levels, movements, and operational tasks from PostgreSQL backend.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
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
          <Link
            to="/operations/deliveries/create"
            className="inline-flex items-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-lg text-sm transition-all"
          >
            <Truck className="w-4 h-4 mr-2 text-emerald-400" />
            New Delivery
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchDashboard} className="underline font-semibold hover:text-rose-300">
            Retry
          </button>
        </div>
      )}

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={idx}
              to={item.link}
              className="bg-slate-800/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
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
                  {loading ? '...' : item.value}
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <span
                    className={`font-semibold ${
                      item.isPositive ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid: Recent Movements & Operations Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Recent Operations */}
        <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" />
                Recent Operations
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Live audit log of receipts, deliveries, transfers, and adjustments from ledger.
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
                  <th className="py-3 px-4">Movement</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Location / Warehouse</th>
                  <th className="py-3 px-4 text-right">Quantity</th>
                  <th className="py-3 px-4">Performed By</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading live operations...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredMovements.length > 0 ? (
                  filteredMovements.slice(0, 7).map((move) => {
                    const isPositive = Number(move.quantity_change) > 0;
                    return (
                      <tr key={move.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${
                              move.movement_type === 'receipt'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : move.movement_type === 'delivery'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                : move.movement_type === 'transfer_in' || move.movement_type === 'transfer_out'
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {move.movement_type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-200">{move.product_name}</div>
                          <div className="text-xs text-slate-500 font-mono">SKU: {move.sku}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-400">
                          <div>{move.warehouse_name || 'Main Warehouse'}</div>
                          <div className="text-slate-500">{move.location_name || 'Stock'}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold">
                          <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                            {isPositive ? `+${move.quantity_change}` : move.quantity_change}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-400">
                          {move.performed_by_name || 'System'}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                          {move.created_at ? new Date(move.created_at).toLocaleDateString() : 'Recent'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                      No stock movements recorded yet. Create receipts or adjustments to begin tracking.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Operations Quick Launch & Status */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Operations Center</h2>
              </div>
              <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-semibold">
                Live Status
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Track open and pending inventory workflow actions.
            </p>

            <div className="space-y-4">
              <Link
                to="/operations/receipts"
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-700/50 rounded-lg p-3.5 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Goods Receipts</div>
                    <div className="text-xs text-slate-500">Incoming vendor shipments</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-400 font-bold font-mono">
                    {dashboardData.metrics.pendingReceipts} Pending
                  </div>
                </div>
              </Link>

              <Link
                to="/operations/deliveries"
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-700/50 rounded-lg p-3.5 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Customer Deliveries</div>
                    <div className="text-xs text-slate-500">Outgoing customer orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-400 font-bold font-mono">
                    {dashboardData.metrics.pendingDeliveries} Active
                  </div>
                </div>
              </Link>

              <Link
                to="/operations/transfers"
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-700/50 rounded-lg p-3.5 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Internal Transfers</div>
                    <div className="text-xs text-slate-500">Inter-warehouse movements</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-400 font-bold font-mono">
                    {dashboardData.metrics.scheduledTransfers} Scheduled
                  </div>
                </div>
              </Link>

              <Link
                to="/operations/adjustments"
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-700/50 rounded-lg p-3.5 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Stock Adjustments</div>
                    <div className="text-xs text-slate-500">Cycle counts & loss reconciliation</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-amber-400 font-bold font-mono">
                    Audit
                  </div>
                </div>
              </Link>
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