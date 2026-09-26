import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  PackageCheck,
  CheckCircle2,
  Clock,
  Building2,
  Warehouse,
  Calendar,
  FileText,
  Download,
  AlertCircle,
  Hash,
  UserCheck,
} from 'lucide-react';

const ReceiptDetails = () => {
  const navigate = useNavigate();

  // Sample data for an incoming goods receipt order
  const [receipt, setReceipt] = useState({
    id: 'WH/IN/00104',
    sourcePO: 'PO-2026-089',
    supplier: 'TechSupplies Inc.',
    contactPerson: 'Robert Chen (+1 555-0144)',
    destinationWarehouse: 'Main Warehouse (WH-A)',
    receivingBay: 'Loading Dock 2',
    scheduledDate: '2026-09-26',
    receivedBy: 'Alex Morgan',
    status: 'Ready', // Options: 'Draft', 'Waiting', 'Ready', 'Done', 'Cancelled'
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

  // Action Handler to Validate/Complete Stock Ingestion
  const handleValidateReceipt = () => {
    setReceipt((prev) => ({
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
          Back to Receipts
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2 text-indigo-400" />
            Print Receipt Slip
          </button>

          <button className="inline-flex items-center px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors">
            <Download className="w-4 h-4 mr-2 text-indigo-400" />
            Download PDF
          </button>

          {receipt.status === 'Ready' && (
            <button
              onClick={handleValidateReceipt}
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Validate & Receive Stock
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
                {receipt.id}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  receipt.status === 'Done'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : receipt.status === 'Ready'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : receipt.status === 'Waiting'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-700 text-slate-300 border border-slate-600'
                }`}
              >
                {receipt.status === 'Done' && <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />}
                {receipt.status === 'Ready' && <PackageCheck className="w-3.5 h-3.5 mr-1.5" />}
                {receipt.status === 'Waiting' && <Clock className="w-3.5 h-3.5 mr-1.5" />}
                {receipt.status}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Source PO Reference: <span className="font-mono text-slate-200 font-semibold">{receipt.sourcePO}</span> | Created: {receipt.createdDate}
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-700/60 px-4 py-2.5 rounded-lg">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-400">Expected Arrival Date:</span>
            <span className="text-sm font-semibold text-slate-200">
              {receipt.scheduledDate}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Supplier & Warehouse Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Supplier Information */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md">
          <div className="flex items-center text-indigo-400 mb-3 font-semibold text-sm">
            <Building2 className="w-4 h-4 mr-2" />
            Supplier Details
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-white text-base">{receipt.supplier}</div>
            <div className="text-slate-400 text-xs">{receipt.contactPerson}</div>
          </div>
        </div>

        {/* Destination Warehouse */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md">
          <div className="flex items-center text-indigo-400 mb-3 font-semibold text-sm">
            <Warehouse className="w-4 h-4 mr-2" />
            Destination Location
          </div>
          <div className="space-y-1 text-sm">
            <div className="font-semibold text-slate-200">{receipt.destinationWarehouse}</div>
            <div className="text-xs text-slate-400">Dock / Bay: {receipt.receivingBay}</div>
          </div>
        </div>

        {/* Receiving Staff */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-md">
          <div className="flex items-center text-indigo-400 mb-3 font-semibold text-sm">
            <UserCheck className="w-4 h-4 mr-2" />
            Operations Inspector
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400">Assigned Officer:</span>{' '}
              <span className="text-slate-200 font-semibold">{receipt.receivedBy}</span>
            </div>
            <div>
              <span className="text-slate-400">Quality Check:</span>{' '}
              <span className="text-emerald-400 font-semibold">Passed Initial Gate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center">
            <PackageCheck className="w-5 h-5 text-indigo-400 mr-2" />
            Received Line Items
          </h2>
          <span className="text-xs text-slate-400">
            {receipt.items.length} items listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4 text-center">Ordered Qty</th>
                <th className="py-3.5 px-4 text-center">Received Qty</th>
                <th className="py-3.5 px-4 text-center">Inspection Status</th>
                <th className="py-3.5 px-4 text-right">Unit Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {receipt.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100">{item.product}</div>
                    <div className="text-xs text-slate-500 font-mono">
                      SKU: {item.sku} | {item.category}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                    {item.orderedQty} pcs
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-emerald-400 font-semibold">
                    {item.receivedQty} pcs
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      QC Verified
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
            Receiving Notes & Quality Remarks
          </h3>
        </div>
        <p className="text-sm text-slate-300 bg-slate-900/60 p-4 rounded-lg border border-slate-700/50 leading-relaxed">
          {receipt.notes}
        </p>
      </div>
    </div>
  );
};

export default ReceiptDetails;