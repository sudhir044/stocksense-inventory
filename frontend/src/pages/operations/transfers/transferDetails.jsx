import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  ArrowRightLeft,
  CheckCircle2,
  Calendar,
  Warehouse,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PageHeader } from '../../../components/ui/PageHeader';

export const TransferDetails = () => {
  const navigate = useNavigate();

  const [transfer, setTransfer] = useState({
    id: 'WH/INT/00204',
    sourceLocation: 'Main WH / Stock (WH-A)',
    destinationLocation: 'Secondary Hub / Rack B (WH-B)',
    scheduledDate: '2026-09-26',
    assignedTo: 'Alex Morgan',
    status: 'ready',
    createdDate: '2026-09-23 09:30 AM',
    notes: 'Fragile items included. Handle with forklift attachment B-2.',
    items: [
      {
        id: 1,
        product: 'USB-C Docking Station',
        sku: 'DK-3310',
        category: 'Electronics',
        sourceQty: 80,
        transferQty: 25,
      },
      {
        id: 2,
        product: 'Noise Cancelling Headphones',
        sku: 'HP-9011',
        category: 'Audio',
        sourceQty: 43,
        transferQty: 10,
      },
      {
        id: 3,
        product: '27" 4K Gaming Monitor',
        sku: 'MN-4K27',
        category: 'Displays',
        sourceQty: 35,
        transferQty: 5,
      },
    ],
  });

  const handleMarkAsDone = () => {
    setTransfer((prev) => ({
      ...prev,
      status: 'done',
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title={`Internal Transfer: ${transfer.id}`}
        subtitle="Transfer requisition order and transit tracking."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Transfers', path: '/operations/transfers' },
          { label: transfer.id },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Link to="/operations/transfers">
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
              Print Transfer Slip
            </Button>
            {transfer.status !== 'done' && (
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={handleMarkAsDone}
              >
                Validate Transfer
              </Button>
            )}
          </div>
        }
      />

      {/* Metadata Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Origin (Source)</div>
          <div className="text-sm font-bold text-slate-900">{transfer.sourceLocation}</div>
          <div className="text-xs text-slate-500 mt-1">Operator: {transfer.assignedTo}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Destination (Target)</div>
          <div className="text-sm font-bold text-slate-900">{transfer.destinationLocation}</div>
          <div className="text-xs text-slate-500 mt-1">Scheduled: {transfer.scheduledDate}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Transfer Status</div>
          <div className="mt-1">
            <Badge variant={transfer.status} size="md">
              {transfer.status}
            </Badge>
          </div>
          <div className="text-xs text-slate-400 mt-2">Created: {transfer.createdDate}</div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-bold text-slate-900">Relocation Line Items</h3>
          <p className="text-xs text-slate-500 mt-0.5">Quantities scheduled for bin-to-bin relocation.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Product Name</th>
                <th className="py-2.5 px-4">SKU</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4 text-right">Source Available</th>
                <th className="py-2.5 px-4 text-right">Transfer Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transfer.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-900">{item.product}</td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-500">{item.sku}</td>
                  <td className="py-3 px-4 text-xs text-slate-600">{item.category}</td>
                  <td className="py-3 px-4 font-mono text-right text-slate-600">{item.sourceQty}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-right text-blue-600">{item.transferQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {transfer.notes && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-900">Special Handling Instructions:</strong> {transfer.notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferDetails;