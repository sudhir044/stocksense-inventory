import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Calendar,
  User,
  ArrowUpRight,
  PackageCheck,
  XCircle,
} from 'lucide-react';

const Deliveries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Sample outgoing delivery order data
  const deliveryOrders = [
    {
      id: 'DEL-00412',
      customer: 'Acme Corporation',
      destination: '123 Business Park, Building 4',
      scheduledDate: '2026-09-26',
      itemsCount: 4,
      totalQuantity: 28,
      status: 'Ready',
      assignedDriver: 'John Doe',
    },
    {
      id: 'DEL-00411',
      customer: 'Global Logistics Hub',
      destination: '789 Freight Terminal Ave',
      scheduledDate: '2026-09-25',
      itemsCount: 12,
      totalQuantity: 150,
      status: 'Done',
      assignedDriver: 'Michael Scott',
    },
    {
      id: 'DEL-00410',
      customer: 'Apex Technologies',
      destination: '45 Tech Plaza, Suite 200',
      scheduledDate: '2026-09-27',
      itemsCount: 2,
      totalQuantity: 10,
      status: 'Waiting',
      assignedDriver: 'Unassigned',
    },
    {
      id: 'DEL-00409',
      customer: 'Starlight Retailers',
      destination: '55 Commerce Blvd',
      scheduledDate: '2026-09-24',
      itemsCount: 8,
      totalQuantity: 65,
      status: 'Done',
      assignedDriver: 'John Doe',
    },
    {
      id: 'DEL-00408',
      customer: 'Vanguard Systems',
      destination: '90 Industry Way',
      scheduledDate: '2026-09-28',
      itemsCount: 1,
      totalQuantity: 5,
      status: 'Draft',
      assignedDriver: 'Unassigned',
    },
  ];

  // Filtering logic
  const filteredDeliveries = deliveryOrders.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.assignedDriver.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || delivery.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Outgoing Deliveries
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage customer dispatch orders, delivery status, and shipment fulfillments.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            to="/operations/deliveries/create"
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Delivery Order
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Total Orders</div>
          <div className="text-2xl font-extrabold text-white mt-1">42</div>
          <div className="text-[11px] text-slate-500 mt-1">Active this month</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Ready to Dispatch</div>
          <div className="text-2xl font-extrabold text-blue-400 mt-1">8</div>
          <div className="text-[11px] text-slate-500 mt-1">Staged in WH-A</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Waiting Stock</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">3</div>
          <div className="text-[11px] text-slate-500 mt-1">Pending replenishment</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 shadow-md">
          <div className="text-xs font-medium text-slate-400">Completed (Done)</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">31</div>
          <div className="text-[11px] text-slate-500 mt-1">Delivered to client</div>
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
              placeholder="Search delivery ID, customer, address..."
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
              <option value="ALL" className="bg-slate-900">All Deliveries</option>
              <option value="Draft" className="bg-slate-900">Draft</option>
              <option value="Waiting" className="bg-slate-900">Waiting Stock</option>
              <option value="Ready" className="bg-slate-900">Ready</option>
              <option value="Done" className="bg-slate-900">Done (Completed)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Delivery Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Destination Address</th>
                <th className="py-3.5 px-4">Scheduled Date</th>
                <th className="py-3.5 px-4 text-center">Items / Qty</th>
                <th className="py-3.5 px-4">Driver / Carrier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((del) => (
                  <tr key={del.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-indigo-400 font-semibold">
                      {del.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-100">{del.customer}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 max-w-xs truncate">
                      {del.destination}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {del.scheduledDate}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-xs">
                      <span className="text-slate-200 font-bold">{del.itemsCount}</span> lines ({del.totalQuantity} pcs)
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{del.assignedDriver}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          del.status === 'Done'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : del.status === 'Ready'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : del.status === 'Waiting'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-700 text-slate-300 border border-slate-600'
                        }`}
                      >
                        {del.status === 'Done' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {del.status === 'Ready' && <Truck className="w-3 h-3 mr-1" />}
                        {del.status === 'Waiting' && <Clock className="w-3 h-3 mr-1" />}
                        {del.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/operations/deliveries/details`}
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
                    No delivery orders found matching your criteria.
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

export default Deliveries;