import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  RefreshCw,
  Check,
} from 'lucide-react';
import adjustmentService from '../../../services/adjustment.service';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ErrorAlert, EmptyState, LoadingState } from '../../../components/ui/Feedback';

export const Adjustments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validatingId, setValidatingId] = useState(null);

  const fetchAdjustments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adjustmentService.getAdjustments();
      setAdjustments(data || []);
    } catch (err) {
      console.error('Failed to fetch adjustments:', err);
      setError(err.response?.data?.message || 'Failed to load adjustments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdjustments();
  }, []);

  const handleValidate = async (id, ref) => {
    if (!window.confirm(`Validate adjustment ${ref}? This will adjust physical inventory levels in the database.`)) {
      return;
    }
    try {
      setValidatingId(id);
      await adjustmentService.validateAdjustment(id);
      await fetchAdjustments();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to validate adjustment');
    } finally {
      setValidatingId(null);
    }
  };

  // KPIs
  const totalCount = adjustments.length;
  const draftCount = adjustments.filter((a) => a.status === 'draft').length;
  const waitingCount = adjustments.filter((a) => a.status === 'waiting' || a.status === 'ready').length;
  const doneCount = adjustments.filter((a) => a.status === 'done').length;

  const filteredAdjustments = adjustments.filter((adj) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (adj.reference || '').toLowerCase().includes(term) ||
      (adj.reason || '').toLowerCase().includes(term) ||
      (adj.warehouse_name || '').toLowerCase().includes(term) ||
      (adj.location_name || '').toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'ALL' ||
      (adj.status || '').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Adjustments"
        subtitle="Perform physical inventory counts, reconcile variance, and audit shrinkage."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Adjustments' },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={loading}
              onClick={fetchAdjustments}
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

      <ErrorAlert message={error} onRetry={fetchAdjustments} />

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Adjustments</div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            {loading ? '—' : totalCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Recorded audits</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Draft Status</div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            {loading ? '—' : draftCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Physical count underway</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Awaiting Approval</div>
          <div className="text-2xl font-bold tracking-tight text-blue-600 mt-1">
            {loading ? '—' : waitingCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Ready for ledger post</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Applied (Done)</div>
          <div className="text-2xl font-bold tracking-tight text-emerald-700 mt-1">
            {loading ? '—' : doneCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Reconciled to ledger</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-[8px] p-3 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reference, reason, location..."
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
            <option value="ALL">All Adjustments</option>
            <option value="draft">Draft</option>
            <option value="waiting">Waiting</option>
            <option value="ready">Ready</option>
            <option value="done">Done (Applied)</option>
          </select>
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Reference</th>
                <th className="py-2.5 px-4">Warehouse & Location</th>
                <th className="py-2.5 px-4">Reason / Purpose</th>
                <th className="py-2.5 px-4">Recorded Date</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12">
                    <LoadingState text="Loading stock adjustments..." />
                  </td>
                </tr>
              ) : filteredAdjustments.length > 0 ? (
                filteredAdjustments.map((adj) => (
                  <tr key={adj.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-600">
                      {adj.reference}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div className="font-medium text-slate-900">{adj.warehouse_name || 'Warehouse'}</div>
                      <div className="text-slate-400 text-[11px]">{adj.location_name || 'Stock'}</div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-700">
                      <span className="font-medium">{adj.reason || 'Inventory Rebalance'}</span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {adj.created_at ? new Date(adj.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={adj.status} size="sm">
                        {adj.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {adj.status !== 'done' && adj.status !== 'canceled' ? (
                        <Button
                          variant="secondary"
                          size="xs"
                          icon={Check}
                          loading={validatingId === adj.id}
                          onClick={() => handleValidate(adj.id, adj.reference)}
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
                      title="No adjustments found"
                      description="Create a stock adjustment to align system counts with physical warehouse audit."
                      actionLabel="New Adjustment"
                      onAction={() => window.location.assign('/operations/adjustments/create')}
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

export default Adjustments;