import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
  History,
} from 'lucide-react';
import ledgerService from '../../services/ledger.service';

const MoveHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [moveLogs, setMoveLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLedger = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ledgerService.getLedger();
      setMoveLogs(data || []);
    } catch (err) {
      console.error('Failed to fetch ledger:', err);
      setError(err.response?.data?.message || 'Failed to load stock ledger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  // Filtering logic
  const filteredLogs = moveLogs.filter((log) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (log.product_name || '').toLowerCase().includes(term) ||
      (log.sku || '').toLowerCase().includes(term) ||
      (log.reference_type || '').toLowerCase().includes(term) ||
      (log.performed_by_name || '').toLowerCase().includes(term) ||
      (log.movement_type || '').toLowerCase().includes(term);

    const matchesType =
      typeFilter === 'ALL' ||
      (log.movement_type || '').toUpperCase() === typeFilter.toUpperCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header & Title */}
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
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-2">
              <History className="h-7 w-7 text-indigo-400" />
              Stock Move History
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Complete audit ledger of all inventory receipts, transfers, deliveries, and adjustments.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchLedger}
            disabled={loading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchLedger} className="underline font-semibold hover:text-rose-300">
            Retry
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search product, SKU, user, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">
                  All Operations
                </option>
                <option value="RECEIPT" className="bg-slate-900">
                  Receipts
                </option>
                <option value="DELIVERY" className="bg-slate-900">
                  Deliveries
                </option>
                <option value="TRANSFER_IN" className="bg-slate-900">
                  Transfers In
                </option>
                <option value="TRANSFER_OUT" className="bg-slate-900">
                  Transfers Out
                </option>
                <option value="ADJUSTMENT" className="bg-slate-900">
                  Adjustments
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Move History Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Operation</th>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Warehouse & Location</th>
                <th className="py-3.5 px-4 text-right">Quantity</th>
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4">Performed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading stock movements from ledger...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const isPositive = Number(log.quantity_change) > 0;
                  return (
                    <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                        {log.created_at ? new Date(log.created_at).toLocaleString() : 'N/A'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center text-xs px-2.5 py-1 rounded-md font-semibold uppercase ${
                            log.movement_type === 'receipt'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : log.movement_type === 'delivery'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : log.movement_type?.includes('transfer')
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {log.movement_type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-100">{log.product_name}</div>
                        <div className="text-xs text-slate-500 font-mono">SKU: {log.sku}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">
                        <div>{log.warehouse_name || 'Warehouse'}</div>
                        <div className="text-slate-500">{log.location_name || 'Location'}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold">
                        <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                          {isPositive ? `+${log.quantity_change}` : log.quantity_change}{' '}
                          <span className="text-xs text-slate-400">{log.unit || 'pcs'}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-indigo-400">
                        {log.reference_type ? `${log.reference_type} #${(log.reference_id || '').slice(0, 8)}` : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">
                        {log.performed_by_name || 'System'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500 text-sm">
                    No movement records found in the stock ledger.
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

export default MoveHistory;