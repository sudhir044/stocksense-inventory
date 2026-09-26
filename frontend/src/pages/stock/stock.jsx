import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  Download,
  Plus,
  Layers,
  Building2,
  DollarSign,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import stockService from '../../services/stock.service';

const Stock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchStock = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockService.getStock();
      setStockItems(data || []);
    } catch (err) {
      console.error('Failed to fetch stock:', err);
      setError(err.response?.data?.message || 'Failed to load stock data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  // Compute status
  const getItemStatus = (item) => {
    const qty = Number(item.quantity);
    if (qty <= 0) return 'Out of Stock';
    if (qty <= 10) return 'Low Stock';
    return 'In Stock';
  };

  // Metrics
  const uniqueSkus = new Set(stockItems.map((item) => item.product_id)).size;
  const totalOnHand = stockItems.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
  const totalReserved = stockItems.reduce((acc, item) => acc + Number(item.reserved_quantity || 0), 0);
  const criticalItems = stockItems.filter((item) => Number(item.quantity) <= 10).length;

  // Warehouses list for filter
  const warehouses = Array.from(
    new Set(stockItems.map((item) => item.warehouse_name).filter(Boolean))
  );

  // Filter items
  const filteredItems = stockItems.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (item.product_name || '').toLowerCase().includes(term) ||
      (item.sku || '').toLowerCase().includes(term) ||
      (item.location_name || '').toLowerCase().includes(term) ||
      (item.warehouse_name || '').toLowerCase().includes(term);

    const matchesWarehouse =
      warehouseFilter === 'ALL' || item.warehouse_name === warehouseFilter;

    const status = getItemStatus(item);
    const matchesStatus =
      statusFilter === 'ALL' || status === statusFilter;

    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Page Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <Link
            to="/dashboard"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Stock Inventory
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time on-hand quantities, availability, and inventory allocations across warehouses.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchStock}
            disabled={loading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh Stock"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
          <Link
            to="/operations/adjustments/create"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Stock Adjustment
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchStock} className="underline font-semibold hover:text-rose-300">
            Retry
          </button>
        </div>
      )}

      {/* KPI Metric Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total SKU Locations
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? '...' : stockItems.length}
            </div>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <Boxes className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total On-Hand Units
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {loading ? '...' : `${totalOnHand} units`}
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Reserved Units
            </div>
            <div className="text-2xl font-bold text-blue-400 mt-1">
              {loading ? '...' : `${totalReserved} units`}
            </div>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Critical / Low Stock
            </div>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {loading ? '...' : `${criticalItems} locations`}
            </div>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Warehouse Selector */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
            <Building2 className="w-4 h-4 text-slate-400" />
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">
                All Warehouses
              </option>
              {warehouses.map((wh) => (
                <option key={wh} value={wh} className="bg-slate-900">
                  {wh}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">
                All Statuses
              </option>
              <option value="In Stock" className="bg-slate-900">
                In Stock
              </option>
              <option value="Low Stock" className="bg-slate-900">
                Low Stock
              </option>
              <option value="Out of Stock" className="bg-slate-900">
                Out of Stock
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Product & SKU</th>
                <th className="py-3.5 px-4">Warehouse & Location</th>
                <th className="py-3.5 px-4 text-right">On Hand</th>
                <th className="py-3.5 px-4 text-right">Reserved</th>
                <th className="py-3.5 px-4 text-right">Available</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading real-time stock balances...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const status = getItemStatus(item);
                  return (
                    <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-100">{item.product_name}</div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-mono">
                          <span>SKU: {item.sku}</span>
                          <span>•</span>
                          <span className="text-slate-400">{item.unit || 'pcs'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-300 font-medium">{item.warehouse_name || 'Warehouse'}</div>
                        <div className="text-xs text-slate-500">
                          {item.location_name} {item.location_code ? `(${item.location_code})` : ''}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        {item.quantity}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                        {item.reserved_quantity}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">
                        {item.free_to_use}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            status === 'In Stock'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : status === 'Low Stock'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <Link
                          to={`/products/${item.product_id}`}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          View Product
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500 text-sm">
                    No stock inventory found. Receive or adjust stock to initialize balances.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stock;