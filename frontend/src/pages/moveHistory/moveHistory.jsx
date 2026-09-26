import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  RefreshCw,
  History,
  Download,
} from 'lucide-react';
import ledgerService from '../../services/ledger.service';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import { ErrorAlert, EmptyState, LoadingState } from '../../components/ui/Feedback';

export const MoveHistory = () => {
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
      setError(err.response?.data?.message || 'Failed to load stock movements ledger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const filteredLogs = moveLogs.filter((log) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (log.product_name || '').toLowerCase().includes(term) ||
      (log.sku || '').toLowerCase().includes(term) ||
      (log.reference_type || '').toLowerCase().includes(term) ||
      (log.reference_id || '').toLowerCase().includes(term) ||
      (log.performed_by_name || '').toLowerCase().includes(term) ||
      (log.movement_type || '').toLowerCase().includes(term);

    const matchesType =
      typeFilter === 'ALL' ||
      (log.movement_type || '').toUpperCase() === typeFilter.toUpperCase();

    return matchesSearch && matchesType;
  });

  // Export to CSV function
  const handleExportCSV = () => {
    if (filteredLogs.length === 0) return;
    const headers = ['Reference', 'Date', 'Product', 'SKU', 'Movement Type', 'Warehouse', 'Location', 'Quantity Change', 'Performed By'];
    const rows = filteredLogs.map((l) => [
      l.reference_type || l.reference_id || 'N/A',
      l.created_at ? new Date(l.created_at).toISOString() : '',
      `"${l.product_name || ''}"`,
      l.sku || '',
      l.movement_type || '',
      `"${l.warehouse_name || ''}"`,
      `"${l.location_name || ''}"`,
      l.quantity_change,
      `"${l.performed_by_name || 'System'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StockSense_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Move History & Stock Ledger"
        subtitle="Immutable audit log tracking every inventory transaction and quantity balance change."
        breadcrumbs={[
          { label: 'Audit' },
          { label: 'Move History' },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={loading}
              onClick={fetchLedger}
            >
              Refresh
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportCSV}
              disabled={filteredLogs.length === 0}
            >
              Export CSV
            </Button>
          </div>
        }
      />

      <ErrorAlert message={error} onRetry={fetchLedger} />

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-[8px] p-3 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU, product, operator, ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Movement:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-medium bg-white border border-slate-200 rounded-[6px] px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="ALL">All Movements</option>
            <option value="RECEIPT">Receipts</option>
            <option value="DELIVERY">Deliveries</option>
            <option value="TRANSFER_IN">Transfers In</option>
            <option value="TRANSFER_OUT">Transfers Out</option>
            <option value="ADJUSTMENT">Adjustments</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Movement</th>
                <th className="py-2.5 px-4">Reference</th>
                <th className="py-2.5 px-4">Product Catalog Item</th>
                <th className="py-2.5 px-4">Location</th>
                <th className="py-2.5 px-4 text-right">Quantity</th>
                <th className="py-2.5 px-4">Operator</th>
                <th className="py-2.5 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12">
                    <LoadingState text="Loading stock ledger records..." />
                  </td>
                </tr>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const qty = Number(log.quantity_change);
                  const isPositive = qty > 0;
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <Badge variant={log.movement_type} size="sm">
                          {log.movement_type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-700 whitespace-nowrap">
                        {log.reference_type || 'LEDGER'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900">{log.product_name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">SKU: {log.sku}</div>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600 whitespace-nowrap">
                        <div className="font-medium text-slate-900">{log.warehouse_name || 'Warehouse'}</div>
                        <div className="text-slate-400 text-[11px]">{log.location_name || 'Stock'}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-xs whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs ${
                            isPositive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-800 border border-slate-200'
                          }`}
                        >
                          {isPositive ? `+${qty}` : qty}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600 whitespace-nowrap">
                        {log.performed_by_name || 'System Operator'}
                      </td>
                      <td className="py-3 px-4 text-right text-xs text-slate-500 whitespace-nowrap">
                        {log.created_at ? new Date(log.created_at).toLocaleString() : '—'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12">
                    <EmptyState
                      title="No stock movements recorded"
                      description="Validate any receipt, delivery, transfer, or adjustment to register stock movements."
                    />
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