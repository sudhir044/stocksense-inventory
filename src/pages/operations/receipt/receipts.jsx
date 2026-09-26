import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  PackageCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Calendar,
  Building2,
  ArrowDownLeft,
  Truck,
} from 'lucide-react';

const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Sample incoming receipt (goods received) data
  const receiptOrders = [
    {
      id: 'WH/IN/00104',
      sourceDocument: 'PO-2026-089',
      supplier: 'TechSupplies Inc.',
      destinationWarehouse: 'Main Warehouse (WH-A)',
      scheduledDate: '2026-09-26',
      itemsCount: 5,
      totalQuantity: 120,
      status: 'Ready',
      receivedBy: 'Alex Morgan',
    },
    {
      id: 'WH/IN/00103',
      sourceDocument: 'PO-2026-085',
      supplier: 'LogiParts Co.',
      destinationWarehouse: 'Secondary Hub (WH-B)',
      scheduledDate: '2026-09-25',
      itemsCount: 8,
      totalQuantity: 240,
      status: 'Done',
      receivedBy: 'John Doe',
    },
    {
      id: 'WH/IN/00102',
      sourceDocument: 'PO-2026-082',
      supplier: 'Apex Components Ltd.',
      destinationWarehouse: 'Main Warehouse (WH-A)',
      scheduledDate: '2026-09-27',
      itemsCount: 3,
      totalQuantity: 45,
      status: 'Waiting',
      receivedBy: 'Unassigned',
    },
    {
      id: 'WH/IN/00101',
      sourceDocument: 'PO-2026-078',
      supplier: 'Global Electro Ltd.',
      destinationWarehouse: 'Cold Storage (WH-C)',
      scheduledDate: '2026-09-24',
      itemsCount: 14,
      totalQuantity: 500,
      status: 'Done',
      receivedBy: 'Michael Scott',
    },
    {
      id: 'WH/IN/00100',
      sourceDocument: 'PO-2026-074',
      supplier: 'Precision Tools LLC',
      destinationWarehouse: 'Main Warehouse (WH-A)',
      scheduledDate: '2026-09-28',
      itemsCount: 2,
      totalQuantity: 15,
      status: 'Draft',
      receivedBy: 'Unassigned',
    },
  ];

  // Filtering logic
  const filteredReceipts = receiptOrders.filter((receipt) => {
    const matchesSearch =
      receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.sourceDocument.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.destinationWarehouse.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || receipt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Incoming Receipts
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage incoming purchase deliveries, supplier goods receipts, and stock put-aways.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            to="/operations/receipts/create"
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Receipt Order
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Total Receipts</div>
          <div className="text-2xl font-extrabold text-white mt-1">38</div>
          <div className="text-[11px] text-slate-500 mt-1">Active this month</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Ready to Receive</div>
          <div className="text-2xl font-extrabold text-blue-400 mt-1">6</div>
          <div className="text-[11px] text-slate-500 mt-1">Dock arrival pending</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Waiting Supplier</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">4</div>
          <div className="text-[11px] text-slate-500 mt-1">In transit / Delayed</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Completed (Done)</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">28</div>
          <div className="text-[11px] text-slate-500 mt-1">Stock validated</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search receipt ID, PO, supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer w-full"
            >
              <option value="ALL" className="bg-slate-900">All Receipts</option>
              <option value="Draft" className="bg-slate-900">Draft</option>
              <option value="Waiting" className="bg-slate-900">Waiting Supplier</option>
              <option value="Ready" className="bg-slate-900">Ready for Receive</option>
              <option value="Done" className="bg-slate-900">Done (Received)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Receipt Ref</th>
                <th className="py-3.5 px-4">Source PO</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Destination WH</th>
                <th className="py-3.5 px-4">Expected Date</th>
                <th className="py-3.5 px-4 text-center">Items / Qty</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredReceipts.length > 0 ? (
                filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-semibold">
                      {receipt.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                      {receipt.sourceDocument}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-100">{receipt.supplier}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 max-w-xs truncate">
                      {receipt.destinationWarehouse}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {receipt.scheduledDate}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-xs">
                      <span className="text-slate-200 font-bold">{receipt.itemsCount}</span> lines ({receipt.totalQuantity} pcs)
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          receipt.status === 'Done'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : receipt.status === 'Ready'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : receipt.status === 'Waiting'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-700 text-slate-300 border border-slate-600'
                        }`}
                      >
                        {receipt.status === 'Done' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {receipt.status === 'Ready' && <PackageCheck className="w-3 h-3 mr-1" />}
                        {receipt.status === 'Waiting' && <Clock className="w-3 h-3 mr-1" />}
                        {receipt.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/operations/receipts/details`}
                        className="inline-flex items-center p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500 text-sm">
                    No receipt orders found matching your search criteria.
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

export default Receipts;