import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  RefreshCw,
  Check,
} from 'lucide-react';
import transferService from '../../../services/transfer.service';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ErrorAlert, EmptyState, LoadingState } from '../../../components/ui/Feedback';

export const Transfers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validatingId, setValidatingId] = useState(null);

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transferService.getTransfers();
      setTransfers(data || []);
    } catch (err) {
      console.error('Failed to fetch transfers:', err);
      setError(err.response?.data?.message || 'Failed to load internal transfers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleValidate = async (id, ref) => {
    if (!window.confirm(`Validate transfer ${ref}? This will move stock between locations.`)) {
      return;
    }
    try {
      setValidatingId(id);
      await transferService.validateTransfer(id);
      await fetchTransfers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to validate transfer');
    } finally {
      setValidatingId(null);
    }
  };

  // KPIs
  const totalCount = transfers.length;
  const draftCount = transfers.filter((t) => t.status === 'draft').length;
  const waitingCount = transfers.filter((t) => t.status === 'waiting' || t.status === 'ready').length;
  const doneCount = transfers.filter((t) => t.status === 'done').length;

  const filteredTransfers = transfers.filter((transfer) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (transfer.reference || '').toLowerCase().includes(term) ||
      (transfer.source_warehouse_name || '').toLowerCase().includes(term) ||
      (transfer.dest_warehouse_name || '').toLowerCase().includes(term) ||
      (transfer.source_location_name || '').toLowerCase().includes(term) ||
      (transfer.dest_location_name || '').toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'ALL' ||
      (transfer.status || '').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internal Transfers"
        subtitle="Move inventory across warehouses, storage zones, and staging bays."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Transfers' },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={loading}
              onClick={fetchTransfers}
            >
              Refresh
            </Button>
            <Link to="/operations/transfers/create">
              <Button variant="primary" size="sm" icon={Plus}>
                New Transfer
              </Button>
            </Link>
          </div>
        }
      />

      <ErrorAlert message={error} onRetry={fetchTransfers} />

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Transfers</div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            {loading ? '—' : totalCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Recorded orders</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Draft Status</div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            {loading ? '—' : draftCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Pending validation</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">In Transit / Ready</div>
          <div className="text-2xl font-bold tracking-tight text-blue-600 mt-1">
            {loading ? '—' : waitingCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Scheduled relocation</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Completed (Done)</div>
          <div className="text-2xl font-bold tracking-tight text-emerald-700 mt-1">
            {loading ? '—' : doneCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Stock relocated</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-[8px] p-3 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reference, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-medium bg-white border border-slate-200 rounded-[6px] px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="ALL">All Transfers</option>
            <option value="draft">Draft</option>
            <option value="waiting">Waiting</option>
            <option value="ready">Ready</option>
            <option value="done">Done (Completed)</option>
          </select>
        </div>
      </div>

      {/* Transfers Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Reference</th>
                <th className="py-2.5 px-4">Source Location</th>
                <th className="py-2.5 px-4">Destination Location</th>
                <th className="py-2.5 px-4">Scheduled Date</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12">
                    <LoadingState text="Loading internal transfers..." />
                  </td>
                </tr>
              ) : filteredTransfers.length > 0 ? (
                filteredTransfers.map((trn) => (
                  <tr key={trn.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-600">
                      {trn.reference}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div className="font-medium text-slate-900">{trn.source_warehouse_name || 'Warehouse'}</div>
                      <div className="text-slate-400 text-[11px]">{trn.source_location_name || 'Origin'}</div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div className="font-medium text-slate-900">{trn.dest_warehouse_name || 'Warehouse'}</div>
                      <div className="text-slate-400 text-[11px]">{trn.dest_location_name || 'Destination'}</div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {trn.scheduled_date ? new Date(trn.scheduled_date).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={trn.status} size="sm">
                        {trn.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {trn.status !== 'done' && trn.status !== 'canceled' ? (
                        <Button
                          variant="secondary"
                          size="xs"
                          icon={Check}
                          loading={validatingId === trn.id}
                          onClick={() => handleValidate(trn.id, trn.reference)}
                          className="hover:border-emerald-500 hover:text-emerald-700"
                        >
                          Validate
                        </Button>
                      ) : (
                        <span className="text-xs text-emerald-700 font-medium inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Validated
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12">
                    <EmptyState
                      title="No internal transfers found"
                      description="Create an internal transfer order to relocate stock between bins or warehouses."
                      actionLabel="Create Transfer"
                      onAction={() => window.location.assign('/operations/transfers/create')}
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

export default Transfers;