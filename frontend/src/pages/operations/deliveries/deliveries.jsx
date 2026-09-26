import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Truck,
  CheckCircle2,
  Clock,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
  Check,
} from 'lucide-react';
import deliveryService from '../../../services/delivery.service';

const Deliveries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validatingId, setValidatingId] = useState(null);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await deliveryService.getDeliveries();
      setDeliveries(data || []);
    } catch (err) {
      console.error('Failed to fetch deliveries:', err);
      setError(err.response?.data?.message || 'Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleValidate = async (id, ref) => {
    if (!window.confirm(`Validate delivery ${ref}? This will reduce stock from the source location.`)) {
      return;
    }
    try {
      setValidatingId(id);
      await deliveryService.validateDelivery(id);
      await fetchDeliveries();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to validate delivery');
    } finally {
      setValidatingId(null);
    }
  };

  // KPIs
  const totalCount = deliveries.length;
  const draftCount = deliveries.filter((d) => d.status === 'draft').length;
  const waitingCount = deliveries.filter((d) => d.status === 'waiting' || d.status === 'ready').length;
  const doneCount = deliveries.filter((d) => d.status === 'done').length;

  // Filter
  const filteredDeliveries = deliveries.filter((delivery) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (delivery.reference || '').toLowerCase().includes(term) ||
      (delivery.customer_name || '').toLowerCase().includes(term) ||
      (delivery.warehouse_name || '').toLowerCase().includes(term) ||
      (delivery.source_location_name || '').toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'ALL' ||
      (delivery.status || '').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header Bar */}
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
              Outgoing Deliveries
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage outgoing stock dispatches, sales order fulfillments, and customer shipments.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchDeliveries}
            disabled={loading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
          <Link
            to="/operations/deliveries/create"
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Delivery Order
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
          <button onClick={fetchDeliveries} className="underline font-semibold hover:text-rose-300">
            Retry
          </button>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Total Deliveries</div>
          <div className="text-2xl font-extrabold text-white mt-1">
            {loading ? '...' : totalCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Active deliveries</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Draft Status</div>
          <div className="text-2xl font-extrabold text-slate-300 mt-1">
            {loading ? '...' : draftCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Not yet dispatched</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Waiting / Ready</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">
            {loading ? '...' : waitingCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">In fulfillment queue</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Completed (Done)</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">
            {loading ? '...' : doneCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Stock deducted & delivered</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference, customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer w-full"
            >
              <option value="ALL" className="bg-slate-900">All Deliveries</option>
              <option value="draft" className="bg-slate-900">Draft</option>
              <option value="waiting" className="bg-slate-900">Waiting</option>
              <option value="ready" className="bg-slate-900">Ready</option>
              <option value="done" className="bg-slate-900">Done (Dispatched)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Delivery Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Source Location</th>
                <th className="py-3.5 px-4">Scheduled Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading deliveries...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-semibold">
                      {delivery.reference}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-100">
                      {delivery.customer_name || 'Customer'}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-300">
                      <div>{delivery.warehouse_name || 'Warehouse'}</div>
                      <div className="text-slate-500">{delivery.source_location_name || 'Stock'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {delivery.scheduled_date ? new Date(delivery.scheduled_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium uppercase ${
                          delivery.status === 'done'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : delivery.status === 'ready'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : delivery.status === 'waiting'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-700 text-slate-300 border border-slate-600'
                        }`}
                      >
                        {delivery.status === 'done' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {delivery.status === 'ready' && <Truck className="w-3 h-3 mr-1" />}
                        {delivery.status === 'waiting' && <Clock className="w-3 h-3 mr-1" />}
                        {delivery.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {delivery.status !== 'done' && delivery.status !== 'canceled' ? (
                        <button
                          onClick={() => handleValidate(delivery.id, delivery.reference)}
                          disabled={validatingId === delivery.id}
                          className="inline-flex items-center px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          {validatingId === delivery.id ? 'Validating...' : 'Validate'}
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-400 font-medium">Validated</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500 text-sm">
                    No delivery orders found. Click "Create Delivery Order" to create one.
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

export default Deliveries;