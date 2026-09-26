import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  ArrowUpDown,
  Download,
  Plus,
  Layers,
  Building2,
  DollarSign,
} from 'lucide-react';

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Stock items dataset
  const stockItems = [
    {
      id: 'STK-001',
      name: 'Wireless Ergonomic Keyboard',
      sku: 'KB-8821',
      category: 'Electronics',
      warehouse: 'Main Warehouse (WH-A)',
      location: 'Aisle 3, Rack B',
      onHand: 142,
      reserved: 12,
      available: 130,
      minStock: 25,
      unitCost: '$45.00',
      totalValue: '$6,390.00',
      status: 'In Stock',
    },
    {
      id: 'STK-002',
      name: '27" 4K Gaming Monitor',
      sku: 'MN-4K27',
      category: 'Peripherals',
      warehouse: 'Main Warehouse (WH-A)',
      location: 'Aisle 1, Rack D',
      onHand: 28,
      reserved: 5,
      available: 23,
      minStock: 10,
      unitCost: '$280.00',
      totalValue: '$7,840.00',
      status: 'In Stock',
    },
    {
      id: 'STK-003',
      name: 'Ergonomic Vertical Mouse',
      sku: 'MS-3310',
      category: 'Electronics',
      warehouse: 'Secondary Hub (WH-B)',
      location: 'Aisle 2, Rack A',
      onHand: 4,
      reserved: 2,
      available: 2,
      minStock: 15,
      unitCost: '$22.50',
      totalValue: '$90.00',
      status: 'Low Stock',
    },
    {
      id: 'STK-004',
      name: 'USB-C Docking Station 12-in-1',
      sku: 'DK-3310',
      category: 'Accessories',
      warehouse: 'Main Warehouse (WH-A)',
      location: 'Aisle 4, Rack C',
      onHand: 65,
      reserved: 0,
      available: 65,
      minStock: 20,
      unitCost: '$65.00',
      totalValue: '$4,225.00',
      status: 'In Stock',
    },
    {
      id: 'STK-005',
      name: 'Thunderbolt 4 Pro Cable (2m)',
      sku: 'CB-9941',
      category: 'Cables',
      warehouse: 'Secondary Hub (WH-B)',
      location: 'Aisle 1, Rack A',
      onHand: 0,
      reserved: 0,
      available: 0,
      minStock: 10,
      unitCost: '$18.00',
      totalValue: '$0.00',
      status: 'Out of Stock',
    },
  ];

  // Filter items
  const filteredItems = stockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWarehouse =
      warehouseFilter === 'ALL' || item.warehouse === warehouseFilter;

    const matchesStatus =
      statusFilter === 'ALL' || item.status === statusFilter;

    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Page Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Stock Inventory
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time on-hand quantities, availability, and inventory valuations across warehouses.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/operations/adjustment/create"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Stock Adjustment
          </Link>
          <button className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors">
            <Download className="w-4 h-4 mr-2 text-indigo-400" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Metric Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total SKU Count
            </div>
            <div className="text-2xl font-bold text-white mt-1">5 Items</div>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <Boxes className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total On-Hand Units
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">239 units</div>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Stock Valuation
            </div>
            <div className="text-2xl font-bold text-white mt-1">$18,545.00</div>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Critical / Low Stock
            </div>
            <div className="text-2xl font-bold text-amber-400 mt-1">2 SKUs</div>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Warehouse Selector */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
            <Building2 className="w-4 h-4 text-slate-400" />
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Warehouses</option>
              <option value="Main Warehouse (WH-A)" className="bg-slate-900">Main Warehouse (WH-A)</option>
              <option value="Secondary Hub (WH-B)" className="bg-slate-900">Secondary Hub (WH-B)</option>
            </select>
          </div>

          {/* Status Selector */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Statuses</option>
              <option value="In Stock" className="bg-slate-900">In Stock</option>
              <option value="Low Stock" className="bg-slate-900">Low Stock</option>
              <option value="Out of Stock" className="bg-slate-900">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Product & SKU</th>
                <th className="py-3.5 px-4">Warehouse & Bin</th>
                <th className="py-3.5 px-4 text-right">On Hand</th>
                <th className="py-3.5 px-4 text-right">Reserved</th>
                <th className="py-3.5 px-4 text-right">Available</th>
                <th className="py-3.5 px-4 text-right">Unit Cost</th>
                <th className="py-3.5 px-4 text-right">Total Value</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100">{item.name}</div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-mono">
                        <span>SKU: {item.sku}</span>
                        <span>•</span>
                        <span className="text-slate-400">{item.category}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-300 font-medium">{item.warehouse}</div>
                      <div className="text-xs text-slate-500">{item.location}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                      {item.onHand}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                      {item.reserved}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">
                      {item.available}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                      {item.unitCost}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-200">
                      {item.totalValue}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.status === 'In Stock'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : item.status === 'Low Stock'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-500 text-sm">
                    No stock items matched your search or filters.
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

export default Stock;