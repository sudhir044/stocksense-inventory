import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  SlidersHorizontal,
  CheckCircle2,
  Calendar,
  Warehouse,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PageHeader } from '../../../components/ui/PageHeader';

export const AdjustmentsDetails = () => {
  const navigate = useNavigate();

  const [adjustment, setAdjustment] = useState({
    id: 'ADJ-00912',
    location: 'Main Warehouse / Staging Rack A',
    reason: 'Annual Physical Cycle Count Discrepancy',
    scheduledDate: '2026-09-26',
    auditor: 'Alex Morgan',
    status: 'ready',
    createdDate: '2026-09-24 14:00 PM',
    notes: 'Reconciled after physical barcode audit of aisle 4.',
    items: [
      {
        id: 1,
        product: 'USB-C Docking Station',
        sku: 'DK-3310',
        systemQty: 100,
        countedQty: 96,
        difference: -4,
      },
      {
        id: 2,
        product: 'Noise Cancelling Headphones',
        sku: 'HP-9011',
        systemQty: 40,
        countedQty: 42,
        difference: +2,
      },
    ],
  });

  const handleApplyAdjustment = () => {
    setAdjustment((prev) => ({
      ...prev,
      status: 'done',
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title={`Stock Adjustment: ${adjustment.id}`}
        subtitle="Physical inventory reconciliation audit sheet."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Adjustments', path: '/operations/adjustments' },
          { label: adjustment.id },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Link to="/operations/adjustments">
              <Button variant="secondary" size="sm" icon={ArrowLeft}>
                Back
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              icon={Printer}
              onClick={() => window.print()}
            >
              Print Audit Sheet
            </Button>
            {adjustment.status !== 'done' && (
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={handleApplyAdjustment}
              >
                Validate Adjustment
              </Button>
            )}
          </div>
        }
      />

      {/* Metadata Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Location & Bay</div>
          <div className="text-sm font-bold text-slate-900">{adjustment.location}</div>
          <div className="text-xs text-slate-500 mt-1">Auditor: {adjustment.auditor}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Audit Reason</div>
          <div className="text-sm font-bold text-slate-900">{adjustment.reason}</div>
          <div className="text-xs text-slate-500 mt-1">Scheduled: {adjustment.scheduledDate}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Adjustment Status</div>
          <div className="mt-1">
            <Badge variant={adjustment.status} size="md">
              {adjustment.status}
            </Badge>
          </div>
          <div className="text-xs text-slate-400 mt-2">Recorded: {adjustment.createdDate}</div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-bold text-slate-900">Counted Variance Lines</h3>
          <p className="text-xs text-slate-500 mt-0.5">Variance values that will update stock on ledger validation.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Product Name</th>
                <th className="py-2.5 px-4">SKU</th>
                <th className="py-2.5 px-4 text-right">System Balance</th>
                <th className="py-2.5 px-4 text-right">Counted Quantity</th>
                <th className="py-2.5 px-4 text-right">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {adjustment.items.map((item) => {
                const isPositive = item.difference > 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-900">{item.product}</td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-500">{item.sku}</td>
                    <td className="py-3 px-4 font-mono text-right text-slate-600">{item.systemQty}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-right text-slate-900">{item.countedQty}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-right">
                      <span className={isPositive ? 'text-emerald-700' : 'text-rose-700'}>
                        {isPositive ? `+${item.difference}` : item.difference}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {adjustment.notes && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-900">Auditor Notes:</strong> {adjustment.notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdjustmentsDetails;