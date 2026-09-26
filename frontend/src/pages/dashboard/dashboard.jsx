import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Truck,
  FileText,
  ArrowRightLeft,
  SlidersHorizontal,
  RefreshCw,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';
import dashboardService from '../../services/dashboard.service';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import { ErrorAlert, LoadingState } from '../../components/ui/Feedback';

export const Dashboard = () => {
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
      console.error('Failed to load dashboard:', err);
      setError(err.response?.data?.message || 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const kpis = [
    {
      title: 'Total Products',
      value: Number(dashboardData.metrics.totalProducts).toLocaleString(),
      subtext: 'Active catalog items',
      link: '/products',
      icon: Package,
    },
    {
      title: 'Total Stock Quantity',
      value: Number(dashboardData.metrics.totalStock).toLocaleString(),
      subtext: 'Units across warehouses',
      link: '/stock',
      icon: TrendingUp,
    },
    {
      title: 'Low Stock Items',
      value: Number(dashboardData.metrics.lowStock).toLocaleString(),
      subtext: 'Below reorder threshold',
      highlight: dashboardData.metrics.lowStock > 0 ? 'text-amber-600' : 'text-slate-900',
      link: '/stock',
      icon: AlertTriangle,
    },
    {
      title: 'Out of Stock',
      value: Number(dashboardData.metrics.outOfStock).toLocaleString(),
      subtext: 'Zero quantity in inventory',
      highlight: dashboardData.metrics.outOfStock > 0 ? 'text-rose-600' : 'text-slate-900',
      link: '/stock',
      icon: Layers,
    },
    {
      title: 'Pending Receipts',
      value: Number(dashboardData.metrics.pendingReceipts).toLocaleString(),
      subtext: 'Incoming supplier orders',
      link: '/operations/receipts',
      icon: FileText,
    },
    {
      title: 'Pending Deliveries',
      value: Number(dashboardData.metrics.pendingDeliveries).toLocaleString(),
      subtext: 'Customer dispatches',
      link: '/operations/deliveries',
      icon: Truck,
    },
    {
      title: 'Scheduled Transfers',
      value: Number(dashboardData.metrics.scheduledTransfers).toLocaleString(),
      subtext: 'Internal relocations',
      link: '/operations/transfers',
      icon: ArrowRightLeft,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Inventory Dashboard"
        subtitle="Real-time operational summary, stock thresholds, and live movement audit."
        action={
          <div className="flex items-center space-x-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={loading}
              onClick={fetchDashboard}
            >
              Refresh
            </Button>
            <Link to="/products/create">
              <Button variant="primary" size="sm" icon={Plus}>
                Add Product
              </Button>
            </Link>
            <Link to="/operations/receipts/create">
              <Button variant="secondary" size="sm" icon={FileText}>
                New Receipt
              </Button>
            </Link>
          </div>
        }
      />

      <ErrorAlert message={error} onRetry={fetchDashboard} />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              to={kpi.link}
              className="bg-white border border-slate-200 rounded-[8px] p-4.5 hover:border-blue-500 hover:shadow-xs transition-all block group"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-blue-600 transition-colors">
                  {kpi.title}
                </span>
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className={`text-2xl font-bold tracking-tight ${kpi.highlight || 'text-slate-900'}`}>
                {loading ? '—' : kpi.value}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {kpi.subtext}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Columns: Recent Operations (Table) & Operational Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Recent Operations Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-blue-600" />
                Recent Operations
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time stock ledger entries logged by the backend.
              </p>
            </div>
            <Link
              to="/move-history"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              View Full History →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Movement</th>
                  <th className="py-2.5 px-4">Product</th>
                  <th className="py-2.5 px-4">Location</th>
                  <th className="py-2.5 px-4 text-right">Quantity</th>
                  <th className="py-2.5 px-4">Operator</th>
                  <th className="py-2.5 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-slate-500">Loading ledger movements...</span>
                      </div>
                    </td>
                  </tr>
                ) : dashboardData.recentMovements.length > 0 ? (
                  dashboardData.recentMovements.slice(0, 7).map((move) => {
                    const isPositive = Number(move.quantity_change) > 0;
                    return (
                      <tr key={move.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 whitespace-nowrap">
                          <Badge variant={move.movement_type} size="sm">
                            {move.movement_type}
                          </Badge>
                        </td>
                        <td className="py-2.5 px-4">
                          <div className="font-medium text-slate-900">{move.product_name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">SKU: {move.sku}</div>
                        </td>
                        <td className="py-2.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                          <div>{move.warehouse_name || 'Warehouse'}</div>
                          <div className="text-slate-400 text-[11px]">{move.location_name || 'Stock'}</div>
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-semibold text-xs whitespace-nowrap">
                          <span className={isPositive ? 'text-emerald-700' : 'text-slate-900'}>
                            {isPositive ? `+${move.quantity_change}` : move.quantity_change}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                          {move.performed_by_name || 'System'}
                        </td>
                        <td className="py-2.5 px-4 text-right text-[11px] text-slate-500 whitespace-nowrap">
                          {move.created_at ? new Date(move.created_at).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                      No stock movements recorded yet. Validate a receipt to initialize ledger.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>


        <div className="bg-white border border-slate-200 rounded-[8px] p-5 shadow-2xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Operations Hub</h3>
                <p className="text-xs text-slate-500 mt-0.5">Quick access to fulfillment pipelines</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold uppercase">
                Active
              </span>
            </div>

            <div className="space-y-2.5">
              <Link
                to="/operations/receipts"
                className="flex items-center justify-between p-3 rounded-[6px] border border-slate-200 hover:border-blue-500 hover:bg-slate-50/50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-[6px] bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block group-hover:text-blue-600 transition-colors">
                      Goods Receipts
                    </span>
                    <span className="text-[11px] text-slate-500">Incoming vendor PO shipments</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {dashboardData.metrics.pendingReceipts}
                </span>
              </Link>

              <Link
                to="/operations/deliveries"
                className="flex items-center justify-between p-3 rounded-[6px] border border-slate-200 hover:border-blue-500 hover:bg-slate-50/50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-[6px] bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block group-hover:text-blue-600 transition-colors">
                      Deliveries
                    </span>
                    <span className="text-[11px] text-slate-500">Customer dispatches</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {dashboardData.metrics.pendingDeliveries}
                </span>
              </Link>

              <Link
                to="/operations/transfers"
                className="flex items-center justify-between p-3 rounded-[6px] border border-slate-200 hover:border-blue-500 hover:bg-slate-50/50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-[6px] bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block group-hover:text-blue-600 transition-colors">
                      Internal Transfers
                    </span>
                    <span className="text-[11px] text-slate-500">Relocations across bins</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {dashboardData.metrics.scheduledTransfers}
                </span>
              </Link>

              <Link
                to="/operations/adjustments"
                className="flex items-center justify-between p-3 rounded-[6px] border border-slate-200 hover:border-blue-500 hover:bg-slate-50/50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-[6px] bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block group-hover:text-blue-600 transition-colors">
                      Stock Adjustments
                    </span>
                    <span className="text-[11px] text-slate-500">Physical count audit</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700">
                  Audit
                </span>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link to="/stock" className="w-full block">
              <Button variant="secondary" size="sm" className="w-full">
                View All Stock Balances
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;