import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  Warehouse,
  Calendar,
  FileText,
  Download,
  Package,
  UserCheck,
  ArrowRight,
} from 'lucide-react';

const TransferDetails = () => {
  const navigate = useNavigate();

  // Sample data for an internal stock transfer order
  const [transfer, setTransfer] = useState({
    id: 'WH/INT/00204',
    sourceLocation: 'Main WH / Stock (WH-A)',
    destinationLocation: 'Secondary Hub / Rack B (WH-B)',
    scheduledDate: '2026-09-26',
    assignedTo: 'Alex Morgan',
    status: 'Ready', // Options: 'Draft', 'Waiting', 'Ready', 'Done', 'Cancelled'
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
      {
        id: 4,
        product: 'Wireless Ergonomic Keyboard',
        sku: 'KB-8821',
        category: 'Peripherals',
        sourceQty: 120,
        transferQty: 45,
      },
    ],
  });

  // Action Handler to Validate/Complete Transfer
  const handleValidateTransfer = () => {
    setTransfer((prev) => ({
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
          Back to Transfers
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2 text-indigo-400" />
            Print Transfer Slip
          </button>

          <button className="inline-flex items-center px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors">
            <Download className="w-4 h-4 mr-2 text-indigo-400" />
            Download PDF
          </button>

          {transfer.status === 'Ready' && (
            <button
              onClick={handleValidateTransfer}
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Validate & Complete Transfer
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
                {transfer.id}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  transfer.status === 'Done'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : transfer.status === 'Ready'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : transfer.status === 'Waiting'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-700 text-slate-300 border border-slate-600'
                }`}
              >
                {transfer.status === 'Done' && <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />}
                {transfer.status === 'Ready' && <ArrowRightLeft className="w-3.5 h-3.5 mr-1.5" />}
                {transfer.status === 'Waiting' && <Clock className="w-3.5 h-3.5 mr-1.5" />}
                {transfer.status}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Created: {transfer.createdDate}
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-700/60 px-4 py-2.5 rounded-lg">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-400">Scheduled Date:</span>
            <span className="text-sm font-semibold text-slate-200">
              {transfer.scheduledDate}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Route & Logistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Source Location */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md">
          <div className="flex items-center text-indigo-400 mb-3 font-semibold text-sm">
            <Warehouse className="w-4 h-4 mr-2" />
            Source Location
          </div>
          <div className="font-bold text-white text-base">
            {transfer.sourceLocation}
          </div>
          <div className="text-xs text-slate-400 mt-1">Origin Stock Room</div>
        </div>

        {/* Transfer Route Indicator */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md flex items-center justify-between">
          <div>
            <div className="flex items-center text-indigo-400 mb-1 font-semibold text-sm">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Movement Route
            </div>
            <div className="text-xs text-slate-400">Internal Relocation</div>
          </div>
          <div className="p-3 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* Destination Location */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md">
          <div className="flex items-center text-indigo-400 mb-3 font-semibold text-sm">
            <Warehouse className="w-4 h-4 mr-2" />
            Destination Location
          </div>
          <div className="font-bold text-white text-base">
            {transfer.destinationLocation}
          </div>
          <div className="text-xs text-slate-400 mt-1">Target Storage Rack</div>
        </div>
      </div>

      {/* Logistics Handler Details */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md mb-6">
        <div className="flex items-center text-indigo-400 mb-2 font-semibold text-sm">
          <UserCheck className="w-4 h-4 mr-2" />
          Assigned Logistics Officer
        </div>
        <div className="text-sm">
          <span className="text-slate-400">Handler:</span>{' '}
          <span className="text-slate-200 font-semibold">{transfer.assignedTo}</span>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center">
            <Package className="w-5 h-5 text-indigo-400 mr-2" />
            Transferred Items
          </h2>
          <span className="text-xs text-slate-400">
            {transfer.items.length} items listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4 text-center">Source Stock</th>
                <th className="py-3.5 px-4 text-center">Transfer Qty</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {transfer.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100">{item.product}</div>
                    <div className="text-xs text-slate-500 font-mono">
                      SKU: {item.sku} | {item.category}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                    {item.sourceQty} pcs
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-indigo-400 font-bold">
                    {item.transferQty} pcs
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Reserved
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer Notes */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 text-indigo-400 mb-2">
          <FileText className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Transfer Remarks & Handling Notes
          </h3>
        </div>
        <p className="text-sm text-slate-300 bg-slate-900/60 p-4 rounded-lg border border-slate-700/50 leading-relaxed">
          {transfer.notes}
        </p>
      </div>
    </div>
  );
};

export default TransferDetails;