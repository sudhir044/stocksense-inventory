import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  RefreshCw,
  Check,
  FileText,
} from 'lucide-react';
import receiptService from '../../../services/receipt.service';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ErrorAlert, EmptyState, LoadingState } from '../../../components/ui/Feedback';

export const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validatingId, setValidatingId] = useState(null);

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await receiptService.getReceipts();
      setReceipts(data || []);
    } catch (err) {
      console.error('Failed to fetch receipts:', err);
      setError(err.response?.data?.message || 'Failed to load receipts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleValidate = async (id, ref) => {
    if (!window.confirm(`Validate receipt order ${ref}? Stock will be immediately posted to destination location.`)) {
      return;
    }
    try {
      setValidatingId(id);
      await receiptService.validateReceipt(id);
      await fetchReceipts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to validate receipt');
    } finally {
      setValidatingId(null);
    }
  };

  const filteredReceipts = receipts.filter((receipt) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (receipt.reference || '').toLowerCase().includes(term) ||
      (receipt.supplier_name || '').toLowerCase().includes(term) ||
      (receipt.destination_warehouse_name || '').toLowerCase().includes(term) ||
      (receipt.destination_location_name || '').toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'ALL' ||
      (receipt.status || '').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Goods Receipts"
        subtitle="Manage supplier purchase receipts, dock delivery check-ins, and inventory put-away."
        action={
          <div className="flex items-center space-x-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={loading}
              onClick={fetchReceipts}
            >
              Refresh
            </Button>
            <Link to="/operations/receipts/create">
              <Button variant="primary" size="sm" icon={Plus}>
                New Receipt Order
              </Button>
            </Link>
          </div>
        }
      />

      <ErrorAlert message={error} onRetry={fetchReceipts} />

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 rounded-[8px] p-3 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-2xs">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PO reference, supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-[6px] px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="waiting">Waiting</option>
            <option value="ready">Ready</option>
            <option value="done">Done (Validated)</option>
          </select>
        </div>
      </div>


      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Receipt Ref</th>
                <th className="py-2.5 px-4">Supplier</th>
                <th className="py-2.5 px-4">Destination Location</th>
                <th className="py-2.5 px-4">Scheduled Date</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <LoadingState message="Loading goods receipts..." />
                  </td>
                </tr>
              ) : filteredReceipts.length > 0 ? (
                filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-xs font-semibold text-blue-600 whitespace-nowrap">
                      {receipt.reference}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-900">
                      {receipt.supplier_name || 'General Supplier'}
                    </td>
                    <td className="py-2.5 px-4 text-xs text-slate-600">
                      <div>{receipt.destination_warehouse_name || 'Warehouse'}</div>
                      <div className="text-slate-400 text-[11px] font-mono">{receipt.destination_location_name}</div>
                    </td>
                    <td className="py-2.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {receipt.scheduled_date ? new Date(receipt.scheduled_date).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <Badge size="sm">{receipt.status}</Badge>
                    </td>
                    <td className="py-2.5 px-4 text-right whitespace-nowrap">
                      {receipt.status !== 'done' && receipt.status !== 'canceled' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Check}
                          loading={validatingId === receipt.id}
                          onClick={() => handleValidate(receipt.id, receipt.reference)}
                        >
                          Validate
                        </Button>
                      ) : (
                        <span className="text-xs text-emerald-700 font-medium font-mono">Posted</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8">
                    <EmptyState
                      icon={FileText}
                      title="No receipt orders found"
                      description="Create a purchase receipt order to track incoming shipments."
                      action={
                        <Link to="/operations/receipts/create">
                          <Button variant="primary" size="sm" icon={Plus}>
                            New Receipt Order
                          </Button>
                        </Link>
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Total orders: <strong className="text-slate-800">{filteredReceipts.length}</strong>
          </span>
          <span className="text-[11px] font-mono text-slate-400">Inventory Put-Away</span>
        </div>
      </div>
    </div>
  );
};

export default Receipts;