import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Eye,
  Warehouse,
  FileSpreadsheet,
  AlertTriangle,
} from 'lucide-react';

const Adjustments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Sample inventory adjustment data
  const adjustmentOrders = [
    {
      id: 'WH/ADJ/00054',
      reason: 'Annual Stock Audit',
      warehouse: 'Main Warehouse (WH-A)',
      date: '2026-09-26',
      itemsCount: 12,
      netDifferenceQty: -14,
      status: 'Validated',
      adjustedBy: 'Alex Morgan',
    },
    {
      id: 'WH/ADJ/00053',
      reason: 'Damaged Goods Clearance',
      warehouse: 'Secondary Hub (WH-B)',
      date: '2026-09-25',
      itemsCount: 3,
      netDifferenceQty: -8,
      status: 'Validated',
      adjustedBy: 'John Doe',
    },
    {
      id: 'WH/ADJ/00052',
      reason: 'Cycle Count Reconciliation',
      warehouse: 'Main Warehouse (WH-A)',
      date: '2026-09-27',
      itemsCount: 8,
      netDifferenceQty: +5,
      status: 'In Progress',
      adjustedBy: 'Michael Scott',
    },
    {
      id: 'WH/ADJ/00051',
      reason: 'Supplier Packaging Correction',
      warehouse: 'Cold Storage (WH-C)',
      date: '2026-09-24',
      itemsCount: 2,
      netDifferenceQty: +20,
      status: 'Validated',
      adjustedBy: 'Alex Morgan',
    },
    {
      id: 'WH/ADJ/00050',
      reason: 'Routine Spot Check',
      warehouse: 'Secondary Hub (WH-B)',
      date: '2026-09-28',
      itemsCount: 5,
      netDifferenceQty: 0,
      status: 'Draft',
      adjustedBy: 'Unassigned',
    },
  ];

  // Filtering logic
  const filteredAdjustments = adjustmentOrders.filter((adj) => {
    const matchesSearch =
      adj.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.adjustedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || adj.status === statusFilter;

    return matchesSearch && matchesStatus;
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
            Reconcile physical stock counts with system quantities and log write-offs.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            to="/operations/adjustments/create"
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Inventory Adjustment
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Total Adjustments</div>
          <div className="text-2xl font-extrabold text-white mt-1">18</div>
          <div className="text-[11px] text-slate-500 mt-1">Logged this month</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Pending Audits</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">3</div>
          <div className="text-[11px] text-slate-500 mt-1">Draft & In-Progress</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Validated Stock Claims</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">15</div>
          <div className="text-[11px] text-slate-500 mt-1">Stock ledger updated</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Net Write-off Qty</div>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">-17 pcs</div>
          <div className="text-[11px] text-slate-500 mt-1">Net stock discrepancy</div>
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
              placeholder="Search adjustment ID, reason, warehouse..."
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
              <option value="ALL" className="bg-slate-900">All Adjustments</option>
              <option value="Draft" className="bg-slate-900">Draft</option>
              <option value="In Progress" className="bg-slate-900">In Progress</option>
              <option value="Validated" className="bg-slate-900">Validated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Adjustment Ref</th>
                <th className="py-3.5 px-4">Reason / Audit Type</th>
                <th className="py-3.5 px-4">Warehouse</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-center">Items Audited</th>
                <th className="py-3.5 px-4 text-center">Net Discrepancy</th>
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
                    <td className="py-3.5 px-4 font-medium text-slate-100">{adj.reason}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 max-w-xs truncate">
                      {adj.warehouse}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {adj.date}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-xs">
                      <span className="text-slate-200 font-bold">{adj.itemsCount}</span> lines
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-xs font-bold">
                      <span
                        className={
                          adj.netDifferenceQty < 0
                            ? 'text-rose-400'
                            : adj.netDifferenceQty > 0
                            ? 'text-emerald-400'
                            : 'text-slate-400'
                        }
                      >
                        {adj.netDifferenceQty > 0 ? `+${adj.netDifferenceQty}` : adj.netDifferenceQty} pcs
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          adj.status === 'Validated'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : adj.status === 'In Progress'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-700 text-slate-300 border border-slate-600'
                        }`}
                      >
                        {adj.status === 'Validated' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {adj.status === 'In Progress' && <Clock className="w-3 h-3 mr-1" />}
                        {adj.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/operations/adjustments/details`}
                        className="inline-flex items-center p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="View Adjustment Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500 text-sm">
                    No adjustment records found matching your search criteria.
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