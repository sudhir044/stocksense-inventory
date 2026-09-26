import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  PackageCheck,
  CheckCircle2,
  Calendar,
  Warehouse,
  FileText,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PageHeader } from '../../../components/ui/PageHeader';

export const ReceiptDetails = () => {
  const navigate = useNavigate();

  const [receipt, setReceipt] = useState({
    id: 'WH/IN/00104',
    sourcePO: 'PO-2026-089',
    supplier: 'TechSupplies Inc.',
    contactPerson: 'Robert Chen (+1 555-0144)',
    destinationWarehouse: 'Main Warehouse (WH-A)',
    receivingBay: 'Loading Dock 2',
    scheduledDate: '2026-09-26',
    receivedBy: 'Alex Morgan',
    status: 'ready',
    createdDate: '2026-09-22 11:15 AM',
    notes: 'Ensure all shipments undergo visual check for pallet seal integrity upon arrival.',
    items: [
      {
        id: 1,
        product: 'USB-C Docking Station',
        sku: 'DK-3310',
        category: 'Electronics',
        orderedQty: 50,
        receivedQty: 50,
        unitCost: '$65.00',
        qcPassed: true,
      },
      {
        id: 2,
        product: 'Noise Cancelling Headphones',
        sku: 'HP-9011',
        category: 'Audio',
        orderedQty: 70,
        receivedQty: 70,
        unitCost: '$120.00',
        qcPassed: true,
      },
    ],
  });

  const handleValidateReceipt = () => {
    setReceipt((prev) => ({
      ...prev,
      status: 'done',
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title={`Goods Receipt: ${receipt.id}`}
        subtitle="Inbound shipment verification and receiving dock validation."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Receipts', path: '/operations/receipts' },
          { label: receipt.id },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Link to="/operations/receipts">
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
              Print Receipt
            </Button>
            {receipt.status !== 'done' && (
              <Button
                variant="primary"
                size="sm"
                icon={PackageCheck}
                onClick={handleValidateReceipt}
              >
                Validate Receipt
              </Button>
            )}
          </div>
        }
      />

      {/* Metadata Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Vendor & PO</div>
          <div className="text-sm font-bold text-slate-900">{receipt.supplier}</div>
          <div className="text-xs text-slate-600 mt-1">Ref: {receipt.sourcePO}</div>
          <div className="text-xs text-slate-400 mt-1">{receipt.contactPerson}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Destination Bay</div>
          <div className="text-sm font-bold text-slate-900">{receipt.destinationWarehouse}</div>
          <div className="text-xs text-slate-600 mt-1">{receipt.receivingBay}</div>
          <div className="text-xs text-slate-400 mt-1">Receiver: {receipt.receivedBy}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Order Status</div>
          <div className="mt-1">
            <Badge variant={receipt.status} size="md">
              {receipt.status}
            </Badge>
          </div>
          <div className="text-xs text-slate-400 mt-2">Scheduled: {receipt.scheduledDate}</div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-bold text-slate-900">Inbound Inventory Items</h3>
          <p className="text-xs text-slate-500 mt-0.5">Verified quantities checked at receiving dock.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Product Name</th>
                <th className="py-2.5 px-4">SKU</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4 text-right">Ordered Qty</th>
                <th className="py-2.5 px-4 text-right">Received Qty</th>
                <th className="py-2.5 px-4 text-right">Unit Cost</th>
                <th className="py-2.5 px-4 text-center">QC Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receipt.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-900">{item.product}</td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-500">{item.sku}</td>
                  <td className="py-3 px-4 text-xs text-slate-600">{item.category}</td>
                  <td className="py-3 px-4 font-mono text-right text-slate-600">{item.orderedQty}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-right text-blue-600">{item.receivedQty}</td>
                  <td className="py-3 px-4 font-mono text-right text-slate-600">{item.unitCost}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Passed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {receipt.notes && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-900">Dock Notes:</strong> {receipt.notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptDetails;