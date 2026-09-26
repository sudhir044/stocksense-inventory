import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Warehouse as WarehouseIcon,
  MapPin,
  Plus,
  Search,
  Building,
  Layers,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Phone,
  User,
} from 'lucide-react';

const Warehouses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);

  // Warehouse list state
  const [warehouses, setWarehouses] = useState([
    {
      id: 'WH-01',
      name: 'Main Central Hub',
      code: 'WH-A',
      address: '104 Industrial Pkwy, Chicago, IL 60601',
      manager: 'Robert Vance',
      phone: '+1 (312) 555-0192',
      totalCapacity: 50000,
      usedCapacity: 34500,
      totalLocations: 24,
      totalProducts: 480,
      status: 'Active',
    },
    {
      id: 'WH-02',
      name: 'Secondary Hub Dallas',
      code: 'WH-B',
      address: '88 Commerce Blvd, Dallas, TX 75201',
      manager: 'Elena Rostova',
      phone: '+1 (214) 555-0143',
      totalCapacity: 25000,
      usedCapacity: 21500,
      totalLocations: 12,
      totalProducts: 210,
      status: 'Active',
    },
    {
      id: 'WH-03',
      name: 'West Coast Depository',
      code: 'WH-C',
      address: '420 Harbor Blvd, Oakland, CA 94607',
      manager: 'Marcus Lin',
      phone: '+1 (510) 555-0187',
      totalCapacity: 35000,
      usedCapacity: 8400,
      totalLocations: 18,
      totalProducts: 95,
      status: 'Active',
    },
    {
      id: 'WH-04',
      name: 'East Coast Reserve',
      code: 'WH-D',
      address: '15 Meadowlands Way, Newark, NJ 07102',
      manager: 'Sara Jenkins',
      phone: '+1 (973) 555-0112',
      totalCapacity: 20000,
      usedCapacity: 0,
      totalLocations: 8,
      totalProducts: 0,
      status: 'Inactive',
    },
  ]);

  // Form state for creating / editing warehouse
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    manager: '',
    phone: '',
    totalCapacity: '',
  });

  const handleOpenModal = (wh = null) => {
    if (wh) {
      setEditingWarehouse(wh);
      setFormData({
        name: wh.name,
        code: wh.code,
        address: wh.address,
        manager: wh.manager,
        phone: wh.phone,
        totalCapacity: wh.totalCapacity,
      });
    } else {
      setEditingWarehouse(null);
      setFormData({
        name: '',
        code: '',
        address: '',
        manager: '',
        phone: '',
        totalCapacity: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWarehouse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingWarehouse) {
      // Update existing warehouse
      setWarehouses((prev) =>
        prev.map((wh) =>
          wh.id === editingWarehouse.id
            ? {
                ...wh,
                ...formData,
                totalCapacity: Number(formData.totalCapacity),
              }
            : wh
        )
      );
    } else {
      // Create new warehouse
      const newWh = {
        id: `WH-0${warehouses.length + 1}`,
        name: formData.name,
        code: formData.code.toUpperCase(),
        address: formData.address,
        manager: formData.manager,
        phone: formData.phone,
        totalCapacity: Number(formData.totalCapacity) || 10000,
        usedCapacity: 0,
        totalLocations: 0,
        totalProducts: 0,
        status: 'Active',
      };
      setWarehouses((prev) => [newWh, ...prev]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this warehouse?')) {
      setWarehouses((prev) => prev.filter((wh) => wh.id !== id));
    }
  };

  // Filtered warehouses
  const filteredWarehouses = warehouses.filter((wh) =>
    wh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wh.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wh.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wh.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Warehouses
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage physical warehouses, storage hubs, assigned managers, and volumetric capacity.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Warehouse
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Facilities
            </div>
            <div className="text-2xl font-bold text-white mt-1">{warehouses.length} Active Nodes</div>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Locations / Bins
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {warehouses.reduce((acc, curr) => acc + curr.totalLocations, 0)} Bins
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Average Space Utilization
            </div>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {Math.round(
                (warehouses.reduce((acc, curr) => acc + curr.usedCapacity, 0) /
                  warehouses.reduce((acc, curr) => acc + curr.totalCapacity, 0)) *
                  100
              )}
              %
            </div>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
            <WarehouseIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search warehouse name, code, city, or manager..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Warehouse Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWarehouses.map((wh) => {
          const usagePercent = Math.round((wh.usedCapacity / wh.totalCapacity) * 100) || 0;
          return (
            <div
              key={wh.id}
              className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
                      <WarehouseIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-white">{wh.name}</h3>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-700">
                          {wh.code}
                        </span>
                      </div>
                      <span
                        className={`inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          wh.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {wh.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenModal(wh)}
                      className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Edit Warehouse"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(wh.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Delete Warehouse"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="mt-5 space-y-2 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>{wh.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>Manager: {wh.manager}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>{wh.phone}</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">Space Capacity Utilized</span>
                    <span className="text-white font-semibold">{usagePercent}% ({wh.usedCapacity.toLocaleString()} / {wh.totalCapacity.toLocaleString()} sq ft)</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        usagePercent > 80 ? 'bg-amber-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Quick Links */}
              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  <strong className="text-slate-200">{wh.totalLocations}</strong> Storage Bins
                  <span className="mx-2 text-slate-600">•</span>
                  <strong className="text-slate-200">{wh.totalProducts}</strong> Items
                </span>
                <Link
                  to={`/stock?warehouse=${wh.code}`}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  View Stock →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Warehouse Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">
                {editingWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Warehouse Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Central Depot"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Warehouse Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    required
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g. WH-E"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address, City, State, ZIP"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Facility Manager
                  </label>
                  <input
                    type="text"
                    name="manager"
                    value={formData.manager}
                    onChange={handleInputChange}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Total Floor Capacity (sq ft)
                </label>
                <input
                  type="number"
                  name="totalCapacity"
                  value={formData.totalCapacity}
                  onChange={handleInputChange}
                  placeholder="e.g. 30000"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                  {editingWarehouse ? 'Update Warehouse' : 'Save Warehouse'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouses;