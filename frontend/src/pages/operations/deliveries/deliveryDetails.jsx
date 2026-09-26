import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  Truck,
  CheckCircle2,
  Calendar,
  Building,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { PageHeader } from '../../../components/ui/PageHeader';

export const DeliveryDetails = () => {
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState({
    id: 'DEL-00412',
    customer: 'Acme Corporation',
    contactPerson: 'Jane Doe (+1 555-0198)',
    deliveryAddress: '123 Business Park, Building 4, Suite 100, San Francisco, CA',
    scheduledDate: '2026-09-26',
    sourceWarehouse: 'Main Warehouse (WH-A)',
    assignedDriver: 'John Doe (Vehicle: Delivery Van #3)',
    status: 'ready',
    createdDate: '2026-09-24 09:30 AM',
    notes: 'Please drop at loading dock B. Contact security upon arrival.',
    items: [
      {
        id: 1,
        product: '27" 4K Gaming Monitor',
        sku: 'MN-4K27',
        category: 'Displays',
        demandQty: 15,
        reservedQty: 15,
        unitCost: '$280.00',
      },
      {
        id: 2,
        product: 'Wireless Ergonomic Keyboard',
        sku: 'KB-8821',
        category: 'Peripherals',
        demandQty: 13,
        reservedQty: 13,
        unitCost: '$45.00',
      },
    ],
  });

  const handleMarkAsDone = () => {
    setDelivery((prev) => ({
      ...prev,
      status: 'done',
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title={`Delivery Order: ${delivery.id}`}
        subtitle="Packing slip and customer fulfillment documentation."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Deliveries', path: '/operations/deliveries' },
          { label: delivery.id },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Link to="/operations/deliveries">
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
              Print Packing Slip
            </Button>
            {delivery.status !== 'done' && (
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={handleMarkAsDone}
              >
                Validate Dispatch
              </Button>
            )}
          </div>
        }
      />

      {/* Metadata Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Customer & Dispatch</div>
          <div className="text-sm font-bold text-slate-900">{delivery.customer}</div>
          <div className="text-xs text-slate-600 mt-1">{delivery.deliveryAddress}</div>
          <div className="text-xs text-slate-400 mt-1">{delivery.contactPerson}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Warehouse Origin</div>
          <div className="text-sm font-bold text-slate-900">{delivery.sourceWarehouse}</div>
          <div className="text-xs text-slate-600 mt-1">Scheduled: {delivery.scheduledDate}</div>
          <div className="text-xs text-slate-400 mt-1">Driver: {delivery.assignedDriver}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-4 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Order Status</div>
          <div className="mt-1">
            <Badge variant={delivery.status} size="md">
              {delivery.status}
            </Badge>
          </div>
          <div className="text-xs text-slate-400 mt-2">Created: {delivery.createdDate}</div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-bold text-slate-900">Dispatched Line Items</h3>
          <p className="text-xs text-slate-500 mt-0.5">Physical items packed for carrier transport.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Product Name</th>
                <th className="py-2.5 px-4">SKU</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4 text-right">Demand Qty</th>
                <th className="py-2.5 px-4 text-right">Reserved Qty</th>
                <th className="py-2.5 px-4 text-right">Unit Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {delivery.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-900">{item.product}</td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-500">{item.sku}</td>
                  <td className="py-3 px-4 text-xs text-slate-600">{item.category}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-right text-slate-900">{item.demandQty}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-right text-blue-600">{item.reservedQty}</td>
                  <td className="py-3 px-4 font-mono text-right text-slate-600">{item.unitCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {delivery.notes && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-900">Fulfillment Instructions:</strong> {delivery.notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDetails;