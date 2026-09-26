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
  Check,
} from 'lucide-react';
import deliveryService from '../../../services/delivery.service';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ErrorAlert, EmptyState, LoadingState } from '../../../components/ui/Feedback';

export const Deliveries = () => {
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
      setError(err.response?.data?.message || 'Failed to load delivery orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleValidate = async (id, ref) => {
    if (!window.confirm(`Validate delivery ${ref}? This will reduce stock from the source warehouse location.`)) {
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
    <div className="space-y-6">
      <PageHeader
        title="Delivery Orders"
        subtitle="Manage customer dispatches, outbound fulfillment, and stock reductions."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Deliveries' },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={loading}
              onClick={fetchDeliveries}
            >
              Refresh
            </Button>
            <Link to="/operations/deliveries/create">
              <Button variant="primary" size="sm" icon={Plus}>
                New Delivery
              </Button>
            </Link>
          </div>
        }
      />

      <ErrorAlert message={error} onRetry={fetchDeliveries} />

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Deliveries</div>
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
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Ready / In Queue</div>
          <div className="text-2xl font-bold tracking-tight text-blue-600 mt-1">
            {loading ? '—' : waitingCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Awaiting dispatch</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-[8px] p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Completed (Done)</div>
          <div className="text-2xl font-bold tracking-tight text-emerald-700 mt-1">
            {loading ? '—' : doneCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Inventory deducted</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-[8px] p-3 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reference, customer, location..."
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
            <option value="ALL">All Orders</option>
            <option value="draft">Draft</option>
            <option value="waiting">Waiting</option>
            <option value="ready">Ready</option>
            <option value="done">Done (Dispatched)</option>
          </select>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Reference</th>
                <th className="py-2.5 px-4">Customer</th>
                <th className="py-2.5 px-4">Source Location</th>
                <th className="py-2.5 px-4">Scheduled Date</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12">
                    <LoadingState text="Loading delivery orders..." />
                  </td>
                </tr>
              ) : filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-600">
                      {delivery.reference}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {delivery.customer_name || 'General Customer'}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div className="font-medium text-slate-900">{delivery.warehouse_name || 'Warehouse'}</div>
                      <div className="text-slate-400 text-[11px]">{delivery.source_location_name || 'Stock'}</div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {delivery.scheduled_date ? new Date(delivery.scheduled_date).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={delivery.status} size="sm">
                        {delivery.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {delivery.status !== 'done' && delivery.status !== 'canceled' ? (
                        <Button
                          variant="secondary"
                          size="xs"
                          icon={Check}
                          loading={validatingId === delivery.id}
                          onClick={() => handleValidate(delivery.id, delivery.reference)}
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
                      title="No delivery orders found"
                      description="Create an outgoing delivery order to dispatch items from inventory."
                      actionLabel="Create Delivery"
                      onAction={() => window.location.assign('/operations/deliveries/create')}
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

export default Deliveries;