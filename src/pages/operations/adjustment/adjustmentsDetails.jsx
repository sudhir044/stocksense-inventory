import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  Download,
  CheckCircle2,
  Clock,
  User,
  Building,
  Calendar,
  FileText,
  AlertCircle,
  Package,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

const AdjustmentsDetails = () => {
  const navigate = useNavigate();

  // Sample data for a specific adjustment record
  const [adjustment] = useState({
    id: 'ADJ-00053',
    date: '2026-09-25 02:15 PM',
    warehouse: 'Main Warehouse (WH-A)',
    location: 'Aisle 3 - Shelf B',
    reason: 'Damaged Goods',
    user: 'Sarah Jenkins',
    approver: 'David Miller (Warehouse Manager)',
    status: 'Done',
    notes:
      'Items were damaged during forklift transfer near Bay 4. Scrapped units according to standard safety disposal policy.',
    items: [
      {
        id: 1,
        product: 'Noise Cancelling Headphones',
        sku: 'HP-9011',
        category: 'Electronics',
        systemQty: 45,
        countedQty: 43,
        variance: -2,
        unitCost: '$120.00',
        totalImpact: '-$240.00',
      },
      {
        id: 2,
        product: 'Ergonomic Vertical Mouse',
        sku: 'MS-3310',
        category: 'Peripherals',
        systemQty: 10,
        countedQty: 10,
        variance: 0,
        unitCost: '$45.00',
        totalImpact: '$0.00',
      },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Adjustments
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2 text-indigo-400" />
            Print
          </button>
          <button className="inline-flex items-center px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors">
            <Download className="w-4 h-4 mr-2 text-indigo-400" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold font-mono text-indigo-400">
                {adjustment.id}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${adjustment.status === 'Done'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
              >
                {adjustment.status === 'Done' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                ) : (
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                )}
                {adjustment.status}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Recorded on {adjustment.date}
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-700/60 px-4 py-2.5 rounded-lg">
            <span className="text-xs text-slate-400">Reason Category:</span>
            <span className="text-sm font-semibold text-slate-200">
              {adjustment.reason}
            </span>
          </div>
        </div>
      </div>

      {/* Overview Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Warehouse</div>
            <div className="text-sm font-semibold text-slate-200">
              {adjustment.warehouse}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Location Tag</div>
            <div className="text-sm font-semibold text-slate-200">
              {adjustment.location}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Created By</div>
            <div className="text-sm font-semibold text-slate-200">
              {adjustment.user}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Approved By</div>
            <div className="text-sm font-semibold text-slate-200">
              {adjustment.approver}
            </div>
          </div>
        </div>
      </div>

      {/* Adjusted Items Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Adjusted Line Items</h2>
          <span className="text-xs text-slate-400">
            {adjustment.items.length} items evaluated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4 text-center">System Quantity</th>
                <th className="py-3.5 px-4 text-center">Counted Quantity</th>
                <th className="py-3.5 px-4 text-center">Variance (Delta)</th>
                <th className="py-3.5 px-4 text-right">Unit Cost</th>
                <th className="py-3.5 px-4 text-right">Total Cost Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {adjustment.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100">{item.product}</div>
                    <div className="text-xs text-slate-500 font-mono">
                      SKU: {item.sku} | {item.category}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-300">
                    {item.systemQty}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-100 font-semibold">
                    {item.countedQty}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs ${item.variance < 0
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : item.variance > 0
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                    >
                      {item.variance < 0 ? (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      ) : item.variance > 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : null}
                      {item.variance > 0 ? `+${item.variance}` : item.variance}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    {item.unitCost}
                  </td>
                  <td
                    className={`py-3.5 px-4 text-right font-mono font-bold ${item.variance < 0 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                  >
                    {item.totalImpact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes & Remarks Card */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 text-indigo-400 mb-2">
          <FileText className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Notes & Remarks
          </h3>
        </div>
        <p className="text-sm text-slate-300 bg-slate-900/60 p-4 rounded-lg border border-slate-700/50 leading-relaxed">
          {adjustment.notes}
        </p>
      </div>
    </div>
  );
};

export default AdjustmentsDetails;