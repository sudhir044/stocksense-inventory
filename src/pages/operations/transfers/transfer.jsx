import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Building2,
  Boxes,
  Truck,
} from 'lucide-react';

const Transfers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Sample internal inventory transfer data
  const transferOrders = [
    {
      id: 'WH/INT/00204',
      sourceLocation: 'Main WH / Stock (WH-A)',
      destinationLocation: 'Secondary Hub / Rack B (WH-B)',
      scheduledDate: '2026-09-26',
      itemsCount: 4,
      totalQuantity: 85,
      status: 'Ready',
      assignedTo: 'Alex Morgan',
    },
    {
      id: 'WH/INT/00203',
      sourceLocation: 'Main WH / Stock (WH-A)',
      destinationLocation: 'Cold Storage / Zone C (WH-C)',
      scheduledDate: '2026-09-25',
      itemsCount: 2,
      totalQuantity: 150,
      status: 'Done',
      assignedTo: 'John Doe',
    },
    {
      id: 'WH/INT/00202',
      sourceLocation: 'Secondary Hub / Rack A (WH-B)',
      destinationLocation: 'Main WH / Packing (WH-A)',
      scheduledDate: '2026-09-27',
      itemsCount: 6,
      totalQuantity: 40,
      status: 'Waiting',
      assignedTo: 'Unassigned',
    },
    {
      id: 'WH/INT/00201',
      sourceLocation: 'Cold Storage / Zone C (WH-C)',
      destinationLocation: 'Main WH / Stock (WH-A)',
      scheduledDate: '2026-09-24',
      itemsCount: 1,
      totalQuantity: 12,
      status: 'Done',
      assignedTo: 'Michael Scott',
    },
    {
      id: 'WH/INT/00200',
      sourceLocation: 'Main WH / Stock (WH-A)',
      destinationLocation: 'Production Floor / Bay 1',
      scheduledDate: '2026-09-28',
      itemsCount: 3,
      totalQuantity: 60,
      status: 'Draft',
      assignedTo: 'Unassigned',
    },
  ];

  // Filtering logic
  const filteredTransfers = transferOrders.filter((transfer) => {
    const matchesSearch =
      transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.sourceLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.destinationLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || transfer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Internal Stock Transfers
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage inventory movements between warehouses, racks, and internal production zones.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            to="/operations/transfers/create"
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Transfer Order
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Total Transfers</div>
          <div className="text-2xl font-extrabold text-white mt-1">24</div>
          <div className="text-[11px] text-slate-500 mt-1">Scheduled this month</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Ready to Move</div>
          <div className="text-2xl font-extrabold text-blue-400 mt-1">5</div>
          <div className="text-[11px] text-slate-500 mt-1">Items reserved in stock</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Waiting Stock</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">3</div>
          <div className="text-[11px] text-slate-500 mt-1">Pending replenish</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Completed (Done)</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">16</div>
          <div className="text-[11px] text-slate-500 mt-1">Moved & validated</div>
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
              placeholder="Search transfer ID, location, user..."
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
              <option value="ALL" className="bg-slate-900">All Statuses</option>
              <option value="Draft" className="bg-slate-900">Draft</option>
              <option value="Waiting" className="bg-slate-900">Waiting Availability</option>
              <option value="Ready" className="bg-slate-900">Ready to Transfer</option>
              <option value="Done" className="bg-slate-900">Done (Transferred)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transfers Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Transfer Ref</th>
                <th className="py-3.5 px-4">Source Location</th>
                <th className="py-3.5 px-4 text-center"></th>
                <th className="py-3.5 px-4">Destination Location</th>
                <th className="py-3.5 px-4">Scheduled Date</th>
                <th className="py-3.5 px-4 text-center">Lines / Qty</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredTransfers.length > 0 ? (
                filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-semibold">
                      {transfer.id}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-200">
                      {transfer.sourceLocation}
                    </td>
                    <td className="py-3.5 px-2 text-center text-slate-500">
                      <ArrowRight className="w-4 h-4 mx-auto text-indigo-400" />
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-200">
                      {transfer.destinationLocation}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {transfer.scheduledDate}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-xs">
                      <span className="text-slate-200 font-bold">{transfer.itemsCount}</span> lines ({transfer.totalQuantity} pcs)
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          transfer.status === 'Done'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : transfer.status === 'Ready'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : transfer.status === 'Waiting'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-700 text-slate-300 border border-slate-600'
                        }`}
                      >
                        {transfer.status === 'Done' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {transfer.status === 'Ready' && <ArrowRightLeft className="w-3 h-3 mr-1" />}
                        {transfer.status === 'Waiting' && <Clock className="w-3 h-3 mr-1" />}
                        {transfer.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/operations/transfers/details`}
                        className="inline-flex items-center p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="View Transfer Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500 text-sm">
                    No transfer orders found matching your search criteria.
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

export default Transfers;