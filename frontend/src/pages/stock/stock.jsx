import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Boxes,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Building2,
  Package,
} from 'lucide-react';
import stockService from '../../services/stock.service';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import { ErrorAlert, EmptyState, LoadingState } from '../../components/ui/Feedback';

export const Stock = () => {
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

  const getItemStatus = (item) => {
    const qty = Number(item.quantity);
    if (qty <= 0) return 'Out of Stock';
    if (qty <= 10) return 'Low Stock';
    return 'In Stock';
  };

  const totalOnHand = stockItems.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
  const totalReserved = stockItems.reduce((acc, item) => acc + Number(item.reserved_quantity || 0), 0);
  const totalAvailable = stockItems.reduce((acc, item) => acc + Number(item.free_to_use || 0), 0);
  const lowStockCount = stockItems.filter((item) => Number(item.quantity) <= 10).length;

  const warehouses = Array.from(
    new Set(stockItems.map((item) => item.warehouse_name).filter(Boolean))
  );

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
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Stock Balances"
        subtitle="Real-time multi-location inventory levels, allocations, and availability."
        action={
          <div className="flex items-center space-x-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={loading}
              onClick={fetchStock}
            >
              Refresh
            </Button>
            <Link to="/operations/adjustments/create">
              <Button variant="primary" size="sm" icon={Plus}>
                New Adjustment
              </Button>
            </Link>
          </div>
        }
      />

      <ErrorAlert message={error} onRetry={fetchStock} />

      {/* Metric Summary Ribbon - Clean, compact enterprise stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-[6px] p-3 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Locations
          </span>
          <span className="text-xl font-bold font-mono text-slate-900 mt-0.5 block">
            {loading ? '—' : stockItems.length}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-[6px] p-3 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total On-Hand
          </span>
          <span className="text-xl font-bold font-mono text-slate-900 mt-0.5 block">
            {loading ? '—' : Number(totalOnHand).toLocaleString()}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-[6px] p-3 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Reserved
          </span>
          <span className="text-xl font-bold font-mono text-slate-600 mt-0.5 block">
            {loading ? '—' : Number(totalReserved).toLocaleString()}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-[6px] p-3 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Available to Promise
          </span>
          <span className="text-xl font-bold font-mono text-blue-600 mt-0.5 block">
            {loading ? '—' : Number(totalAvailable).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-[8px] p-3 flex flex-col md:flex-row gap-3 items-center justify-between shadow-2xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by product, SKU, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-[6px] px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
          >
            <option value="ALL">All Warehouses</option>
            {warehouses.map((wh) => (
              <option key={wh} value={wh}>
                {wh}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-[6px] px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Product Name</th>
                <th className="py-2.5 px-4">SKU</th>
                <th className="py-2.5 px-4">Warehouse</th>
                <th className="py-2.5 px-4">Bin / Location</th>
                <th className="py-2.5 px-4 text-right">On Hand</th>
                <th className="py-2.5 px-4 text-right">Reserved</th>
                <th className="py-2.5 px-4 text-right">Available</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <LoadingState message="Calculating real-time inventory balances..." />
                  </td>
                </tr>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const status = getItemStatus(item);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4">
                        <Link
                          to={`/products/${item.product_id}`}
                          className="font-medium text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          {item.product_name}
                        </Link>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs text-blue-600 whitespace-nowrap">
                        {item.sku}
                      </td>
                      <td className="py-2.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                        {item.warehouse_name || 'Warehouse'}
                      </td>
                      <td className="py-2.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] border border-slate-200">
                          {item.location_name} {item.location_code ? `(${item.location_code})` : ''}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-xs font-bold text-slate-900 whitespace-nowrap">
                        {item.quantity} <span className="text-[10px] text-slate-400 font-normal">{item.unit || 'pcs'}</span>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-xs text-slate-500 whitespace-nowrap">
                        {item.reserved_quantity}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-xs font-semibold text-blue-600 whitespace-nowrap">
                        {item.free_to_use}
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <Badge size="sm">{status}</Badge>
                      </td>
                      <td className="py-2.5 px-4 text-right text-[11px] text-slate-400 whitespace-nowrap">
                        {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="p-8">
                    <EmptyState
                      title="No stock records found"
                      description="No inventory matches the selected criteria. Post a goods receipt to initialize balances."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Total entries: <strong className="text-slate-800">{filteredItems.length}</strong>
          </span>
          <span className="text-[11px] text-slate-400">All locations synced</span>
        </div>
      </div>
    </div>
  );
};

export default Stock;