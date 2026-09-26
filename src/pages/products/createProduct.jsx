import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
} from 'lucide-react';

const Adjustments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reasonFilter, setReasonFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Sample inventory adjustment data
  const adjustmentRecords = [
    {
      id: 'ADJ-00053',
      date: '2026-09-25',
      warehouse: 'Main Warehouse (WH-A)',
      productCount: 2,
      reason: 'Damaged Goods',
      user: 'Sarah Jenkins',
      status: 'Done',
      totalDelta: '-2 units',
    },
    {
      id: 'ADJ-00052',
      date: '2026-09-24',
      warehouse: 'Secondary Hub (WH-B)',
      productCount: 5,
      reason: 'Stock Audit / Recount',
      user: 'Mike Ross',
      status: 'Done',
      totalDelta: '+14 units',
    },
    {
      id: 'ADJ-00051',
      date: '2026-09-22',
      warehouse: 'Main Warehouse (WH-A)',
      productCount: 1,
      reason: 'Lost / Missing',
      user: 'Alex Vance',
      status: 'Pending Approval',
      totalDelta: '-5 units',
    },
    {
      id: 'ADJ-00050',
      date: '2026-09-20',
      warehouse: 'Cold Storage (WH-C)',
      productCount: 3,
      reason: 'Expired Item',
      user: 'Sarah Jenkins',
      status: 'Done',
      totalDelta: '-12 units',
    },
    {
      id: 'ADJ-00049',
      date: '2026-09-18',
      warehouse: 'Secondary Hub (WH-B)',
      productCount: 1,
      reason: 'Found Item',
      user: 'Mike Ross',
      status: 'Done',
      totalDelta: '+8 units',
    },
  ];

  // Filtering logic
  const filteredAdjustments = adjustmentRecords.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesReason =
      reasonFilter === 'ALL' || item.reason.toLowerCase().includes(reasonFilter.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

    return matchesSearch && matchesReason && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Inventory Adjustments
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manually fix quantity discrepancies, record damaged stock, or process physical audit counts.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            to="/operations/adjustment/create"
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Adjustment
          </Link>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Total Adjustments</div>
          <div className="text-2xl font-extrabold text-white mt-1">128</div>
          <div className="text-[11px] text-slate-500 mt-1">Recorded this month</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Pending Approvals</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">3</div>
          <div className="text-[11px] text-slate-500 mt-1">Requires manager sign-off</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Net Quantity Adjusted</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">+3 units</div>
          <div className="text-[11px] text-slate-500 mt-1">Net variance balance</div>
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
              placeholder="Search ref ID, warehouse, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Reason Filter */}
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
                className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">All Reasons</option>
                <option value="Damaged" className="bg-slate-900">Damaged Goods</option>
                <option value="Audit" className="bg-slate-900">Stock Audit / Recount</option>
                <option value="Lost" className="bg-slate-900">Lost / Missing</option>
                <option value="Expired" className="bg-slate-900">Expired Item</option>
                <option value="Found" className="bg-slate-900">Found Item</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">All Statuses</option>
                <option value="Done" className="bg-slate-900">Done</option>
                <option value="Pending Approval" className="bg-slate-900">Pending Approval</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Ref Number</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Warehouse Location</th>
                <th className="py-3.5 px-4">Reason Category</th>
                <th className="py-3.5 px-4 text-center">Items Changed</th>
                <th className="py-3.5 px-4 text-right">Net Change</th>
                <th className="py-3.5 px-4">Responsible User</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredAdjustments.length > 0 ? (
                filteredAdjustments.map((adj) => (
                  <tr key={adj.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-semibold">
                      {adj.id}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{adj.date}</td>
                    <td className="py-3.5 px-4 text-slate-200 font-medium">{adj.warehouse}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700">
                        {adj.reason}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">{adj.productCount}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">
                      <span
                        className={
                          adj.totalDelta.startsWith('+')
                            ? 'text-emerald-400'
                            : 'text-rose-400'
                        }
                      >
                        {adj.totalDelta}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{adj.user}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          adj.status === 'Done'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {adj.status === 'Done' ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {adj.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/operations/adjustment/details`}
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
                  <td colSpan={9} className="text-center py-8 text-slate-500 text-sm">
                    No adjustments found matching your search.
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

export default Adjustments;