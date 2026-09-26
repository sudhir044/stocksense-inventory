import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  Warehouse,
  Boxes,
  Layers,
  Edit2,
  Trash2,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Tag,
} from 'lucide-react';

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Sample locations list data
  const [locations, setLocations] = useState([
    {
      id: 'LOC-001',
      name: 'Aisle 1 - Rack A (Top)',
      code: 'WH-A-A1-RA',
      warehouse: 'Main Central Hub (WH-A)',
      type: 'Pallet Rack',
      maxCapacity: 100,
      occupiedUnits: 72,
      productsCount: 4,
      status: 'Active',
    },
    {
      id: 'LOC-002',
      name: 'Aisle 1 - Rack B (Middle)',
      code: 'WH-A-A1-RB',
      warehouse: 'Main Central Hub (WH-A)',
      type: 'Pallet Rack',
      maxCapacity: 100,
      occupiedUnits: 98,
      productsCount: 6,
      status: 'Near Full',
    },
    {
      id: 'LOC-003',
      name: 'Bin Section C-04',
      code: 'WH-A-SEC-C04',
      warehouse: 'Main Central Hub (WH-A)',
      type: 'Small Parts Bin',
      maxCapacity: 50,
      occupiedUnits: 15,
      productsCount: 2,
      status: 'Active',
    },
    {
      id: 'LOC-004',
      name: 'Cold Zone Shelf 2',
      code: 'WH-B-CZ-S2',
      warehouse: 'Secondary Hub Dallas (WH-B)',
      type: 'Cold Storage',
      maxCapacity: 40,
      occupiedUnits: 38,
      productsCount: 3,
      status: 'Near Full',
    },
    {
      id: 'LOC-005',
      name: 'Floor Staging Bay 3',
      code: 'WH-B-FL-03',
      warehouse: 'Secondary Hub Dallas (WH-B)',
      type: 'Floor Bulk',
      maxCapacity: 250,
      occupiedUnits: 45,
      productsCount: 1,
      status: 'Active',
    },
    {
      id: 'LOC-006',
      name: 'Receiving Dock Quarantine',
      code: 'WH-C-QA-01',
      warehouse: 'West Coast Depository (WH-C)',
      type: 'Quarantine Bay',
      maxCapacity: 60,
      occupiedUnits: 0,
      productsCount: 0,
      status: 'Empty',
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this storage location?')) {
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
    }
  };

  // Filter calculations
  const filteredLocations = locations.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWarehouse =
      warehouseFilter === 'ALL' || loc.warehouse === warehouseFilter;

    const matchesType = typeFilter === 'ALL' || loc.type === typeFilter;

    return matchesSearch && matchesWarehouse && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header & Primary Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Warehouse Locations & Bins
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure aisles, racks, cold storage zones, and specific storage bins across all facilities.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/settings/locations/create"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </Link>
        </div>
      </div>

      {/* KPI Overview Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Storage Locations
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {locations.length} Locations
            </div>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Occupied Units
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {locations.reduce((acc, curr) => acc + curr.occupiedUnits, 0)} Units
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <Boxes className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              High Capacity Bins (≥ 80%)
            </div>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {
                locations.filter(
                  (loc) => (loc.occupiedUnits / loc.maxCapacity) >= 0.8
                ).length
              }{' '}
              Bins
            </div>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search location name, code, or aisle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Warehouse Filter */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
            <Warehouse className="w-4 h-4 text-slate-400" />
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Warehouses</option>
              <option value="Main Central Hub (WH-A)" className="bg-slate-900">
                Main Central Hub (WH-A)
              </option>
              <option value="Secondary Hub Dallas (WH-B)" className="bg-slate-900">
                Secondary Hub Dallas (WH-B)
              </option>
              <option value="West Coast Depository (WH-C)" className="bg-slate-900">
                West Coast Depository (WH-C)
              </option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Types</option>
              <option value="Pallet Rack" className="bg-slate-900">Pallet Rack</option>
              <option value="Small Parts Bin" className="bg-slate-900">Small Parts Bin</option>
              <option value="Cold Storage" className="bg-slate-900">Cold Storage</option>
              <option value="Floor Bulk" className="bg-slate-900">Floor Bulk</option>
              <option value="Quarantine Bay" className="bg-slate-900">Quarantine Bay</option>
            </select>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Location & Code</th>
                <th className="py-3.5 px-4">Warehouse Facility</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4 text-center">SKU Count</th>
                <th className="py-3.5 px-4">Capacity Utilization</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc) => {
                  const percent = Math.round((loc.occupiedUnits / loc.maxCapacity) * 100);
                  return (
                    <tr key={loc.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-100">{loc.name}</div>
                        <div className="font-mono text-xs text-indigo-400 mt-0.5">
                          {loc.code}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {loc.warehouse}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {loc.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium">
                        {loc.productsCount} SKUs
                      </td>
                      <td className="py-3.5 px-4 w-56">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400 font-mono">
                            {loc.occupiedUnits} / {loc.maxCapacity} units
                          </span>
                          <span
                            className={`font-semibold ${
                              percent >= 90
                                ? 'text-rose-400'
                                : percent >= 75
                                ? 'text-amber-400'
                                : 'text-emerald-400'
                            }`}
                          >
                            {percent}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              percent >= 90
                                ? 'bg-rose-500'
                                : percent >= 75
                                ? 'bg-amber-500'
                                : 'bg-indigo-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            loc.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : loc.status === 'Near Full'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}
                        >
                          {loc.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Location"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(loc.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Delete Location"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 text-sm">
                    No warehouse locations found matching your filter criteria.
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

export default Locations;