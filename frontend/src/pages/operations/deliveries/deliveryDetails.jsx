import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Calendar,
  FileText,
  PackageCheck,
  AlertTriangle,
  Download,
  Building,
} from 'lucide-react';

const DeliveryDetails = () => {
  const navigate = useNavigate();

  // Sample data for an outgoing delivery order
  const [delivery, setDelivery] = useState({
    id: 'DEL-00412',
    customer: 'Acme Corporation',
    contactPerson: 'Jane Doe (+1 555-0198)',
    deliveryAddress: '123 Business Park, Building 4, Suite 100, San Francisco, CA',
    scheduledDate: '2026-09-26',
    sourceWarehouse: 'Main Warehouse (WH-A)',
    assignedDriver: 'John Doe (Vehicle: Delivery Van #3)',
    status: 'Ready', // Options: 'Draft', 'Waiting', 'Ready', 'Done', 'Cancelled'
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
        inStock: true,
      },
      {
        id: 2,
        product: 'Wireless Ergonomic Keyboard',
        sku: 'KB-8821',
        category: 'Peripherals',
        demandQty: 13,
        reservedQty: 13,
        unitCost: '$45.00',
        inStock: true,
      },
    ],
  });

  // Action Handler to Validate/Complete Delivery
  const handleMarkAsDone = () => {
    setDelivery((prev) => ({
      ...prev,
      status: 'Done',
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Top Navigation & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Deliveries
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2 text-indigo-400" />
            Print Delivery Slip
          </button>

          <button className="inline-flex items-center px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors">
            <Download className="w-4 h-4 mr-2 text-indigo-400" />
            Download PDF
          </button>

          {delivery.status === 'Ready' && (
            <button
              onClick={handleMarkAsDone}
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Validate & Complete Delivery
            </button>
          )}
        </div>
      </div>

      {/* Main Header Status Card */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold font-mono text-indigo-400">
                {delivery.id}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  delivery.status === 'Done'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : delivery.status === 'Ready'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : delivery.status === 'Waiting'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-700 text-slate-300 border border-slate-600'
                }`}
              >
                {delivery.status === 'Done' && <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />}
                {delivery.status === 'Ready' && <Truck className="w-3.5 h-3.5 mr-1.5" />}
                {delivery.status === 'Waiting' && <Clock className="w-3.5 h-3.5 mr-1.5" />}
                {delivery.status}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Created on {delivery.createdDate}
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-700/60 px-4 py-2.5 rounded-lg">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-400">Scheduled Date:</span>
            <span className="text-sm font-semibold text-slate-200">
              {delivery.scheduledDate}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Dispatch & Delivery Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Customer Information */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md">
          <div className="flex items-center text-indigo-400 mb-3 font-semibold text-sm">
            <User className="w-4 h-4 mr-2" />
            Customer Information
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-white text-base">{delivery.customer}</div>
            <div className="text-slate-400 text-xs">{delivery.contactPerson}</div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md">
          <div className="flex items-center text-indigo-400 mb-3 font-semibold text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            Destination Address
          </div>
          <div className="text-sm text-slate-300 leading-relaxed">
            {delivery.deliveryAddress}
          </div>
        </div>

        {/* Source & Driver Details */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md">
          <div className="flex items-center text-indigo-400 mb-3 font-semibold text-sm">
            <Building className="w-4 h-4 mr-2" />
            Fulfillment Details
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400">Source:</span>{' '}
              <span className="text-slate-200 font-semibold">{delivery.sourceWarehouse}</span>
            </div>
            <div>
              <span className="text-slate-400">Driver / Carrier:</span>{' '}
              <span className="text-slate-200 font-semibold">{delivery.assignedDriver}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center">
            <PackageCheck className="w-5 h-5 text-indigo-400 mr-2" />
            Items to Dispatch
          </h2>
          <span className="text-xs text-slate-400">
            {delivery.items.length} items listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4 text-center">Demand Qty</th>
                <th className="py-3.5 px-4 text-center">Reserved Qty</th>
                <th className="py-3.5 px-4 text-center">Stock Status</th>
                <th className="py-3.5 px-4 text-right">Unit Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {delivery.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100">{item.product}</div>
                    <div className="text-xs text-slate-500 font-mono">
                      SKU: {item.sku} | {item.category}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                    {item.demandQty} pcs
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-emerald-400 font-semibold">
                    {item.reservedQty} pcs
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Available
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    {item.unitCost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Special Instructions & Notes */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 text-indigo-400 mb-2">
          <FileText className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Special Instructions & Driver Notes
          </h3>
        </div>
        <p className="text-sm text-slate-300 bg-slate-900/60 p-4 rounded-lg border border-slate-700/50 leading-relaxed">
          {delivery.notes}
        </p>
      </div>
    </div>
  );
};

export default DeliveryDetails;