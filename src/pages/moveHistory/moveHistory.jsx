import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Sliders,
  Calendar,
  Download,
  FileSpreadsheet,
} from 'lucide-react';

const MoveHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Sample movement log data
  const moveLogs = [
    {
      id: 'MH-9021',
      reference: 'REC-00982',
      date: '2026-09-26 10:45 AM',
      product: 'Wireless Ergonomic Keyboard',
      sku: 'KB-8821',
      type: 'RECEIPT',
      from: 'Vendor (Logitech Corp)',
      to: 'Main Warehouse (WH-A)',
      quantity: 120,
      unit: 'pcs',
      user: 'Sarah Jenkins',
      status: 'Completed',
    },
    {
      id: 'MH-9020',
      reference: 'DEL-00412',
      date: '2026-09-26 09:12 AM',
      product: '27" 4K Gaming Monitor',
      sku: 'MN-4K27',
      type: 'DELIVERY',
      from: 'Main Warehouse (WH-A)',
      to: 'Customer (Acme Ltd)',
      quantity: -15,
      unit: 'pcs',
      user: 'Mike Ross',
      status: 'In Transit',
    },
    {
      id: 'MH-9019',
      reference: 'TRN-00104',
      date: '2026-09-25 04:30 PM',
      product: 'USB-C Docking Station',
      sku: 'DK-3310',
      type: 'TRANSFER',
      from: 'Main Warehouse (WH-A)',
      to: 'Secondary Hub (WH-B)',
      quantity: 50,
      unit: 'pcs',
      user: 'Alex Vance',
      status: 'Processing',
    },
    {
      id: 'MH-9018',
      reference: 'ADJ-00053',
      date: '2026-09-25 02:15 PM',
      product: 'Noise Cancelling Headphones',
      sku: 'HP-9011',
      type: 'ADJUSTMENT',
      from: 'Main Warehouse (WH-A)',
      to: 'Scrap / Damaged',
      quantity: -2,
      unit: 'pcs',
      user: 'Sarah Jenkins',
      status: 'Completed',
    },
    {
      id: 'MH-9017',
      reference: 'REC-00981',
      date: '2026-09-24 11:00 AM',
      product: 'Ergonomic Vertical Mouse',
      sku: 'MS-3310',
      type: 'RECEIPT',
      from: 'Vendor (Razer Inc)',
      to: 'Secondary Hub (WH-B)',
      quantity: 200,
      unit: 'pcs',
      user: 'Mike Ross',
      status: 'Completed',
    },
  ];

  // Filtering logic
  const filteredLogs = moveLogs.filter((log) => {
    const matchesSearch =
      log.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'ALL' || log.type === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Stock Move History
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete audit trail of all inventory receipts, transfers, deliveries, and adjustments.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors">
            <Download className="w-4 h-4 mr-2 text-indigo-400" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference, product, SKU, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">All Operations</option>
                <option value="RECEIPT" className="bg-slate-900">Receipts</option>
                <option value="DELIVERY" className="bg-slate-900">Deliveries</option>
                <option value="TRANSFER" className="bg-slate-900">Transfers</option>
                <option value="ADJUSTMENT" className="bg-slate-900">Adjustments</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">All Statuses</option>
                <option value="Completed" className="bg-slate-900">Completed</option>
                <option value="In Transit" className="bg-slate-900">In Transit</option>
                <option value="Processing" className="bg-slate-900">Processing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Move History Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Ref Code</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Operation</th>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">From</th>
                <th className="py-3.5 px-4">To</th>
                <th className="py-3.5 px-4 text-right">Quantity</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-semibold">
                      {log.reference}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {log.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center text-xs px-2.5 py-1 rounded-md font-semibold ${
                          log.type === 'RECEIPT'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : log.type === 'DELIVERY'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : log.type === 'TRANSFER'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-100">{log.product}</div>
                      <div className="text-xs text-slate-500 font-mono">SKU: {log.sku}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{log.from}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{log.to}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">
                      <span className={log.quantity > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {log.quantity > 0 ? `+${log.quantity}` : log.quantity} {log.unit}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium ${
                          log.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : log.status === 'In Transit'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{log.user}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-500 text-sm">
                    No movement records found matching your criteria.
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

export default MoveHistory;