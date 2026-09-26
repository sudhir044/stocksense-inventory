import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  Warehouse,
  Boxes,
  X,
  Save,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';

export const Locations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [locations, setLocations] = useState([
    {
      id: 'LOC-001',
      name: 'Aisle 1 - Rack A (Top)',
      code: 'WH-A-A1-RA',
      warehouse: 'Main Central Hub',
      type: 'Pallet Rack',
      maxCapacity: 100,
      occupiedUnits: 72,
      productsCount: 4,
      status: 'active',
    },
    {
      id: 'LOC-002',
      name: 'Aisle 1 - Rack B (Middle)',
      code: 'WH-A-A1-RB',
      warehouse: 'Main Central Hub',
      type: 'Pallet Rack',
      maxCapacity: 100,
      occupiedUnits: 98,
      productsCount: 6,
      status: 'active',
    },
    {
      id: 'LOC-003',
      name: 'Bin Section C-04',
      code: 'WH-B-BIN-04',
      warehouse: 'Secondary Hub Dallas',
      type: 'Small Parts Bin',
      maxCapacity: 50,
      occupiedUnits: 15,
      productsCount: 2,
      status: 'active',
    },
    {
      id: 'LOC-004',
      name: 'Bay 2 Receiving Dock',
      code: 'WH-A-RCV-02',
      warehouse: 'Main Central Hub',
      type: 'Staging Bay',
      maxCapacity: 200,
      occupiedUnits: 45,
      productsCount: 12,
      status: 'active',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    warehouse: 'Main Central Hub',
    type: 'Pallet Rack',
    maxCapacity: 100,
  });

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    const newLoc = {
      id: `LOC-00${locations.length + 1}`,
      name: formData.name,
      code: formData.code.toUpperCase(),
      warehouse: formData.warehouse,
      type: formData.type,
      maxCapacity: Number(formData.maxCapacity) || 100,
      occupiedUnits: 0,
      productsCount: 0,
      status: 'active',
    };
    setLocations([...locations, newLoc]);
    setIsModalOpen(false);
    setFormData({ name: '', code: '', warehouse: 'Main Central Hub', type: 'Pallet Rack', maxCapacity: 100 });
  };

  const filtered = locations.filter((l) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      l.name.toLowerCase().includes(term) ||
      l.code.toLowerCase().includes(term) ||
      l.warehouse.toLowerCase().includes(term);
    const matchesWarehouse = warehouseFilter === 'ALL' || l.warehouse === warehouseFilter;
    return matchesSearch && matchesWarehouse;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Warehouse Locations"
        subtitle="Manage bin numbers, storage zones, pallet racks, and receiving bays."
        breadcrumbs={[
          { label: 'Settings', path: '/settings' },
          { label: 'Locations' },
        ]}
        action={
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            Add Location
          </Button>
        }
      />

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-[8px] p-3 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search location code, name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Warehouse:</span>
          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="text-xs font-medium bg-white border border-slate-200 rounded-[6px] px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="ALL">All Warehouses</option>
            <option value="Main Central Hub">Main Central Hub</option>
            <option value="Secondary Hub Dallas">Secondary Hub Dallas</option>
          </select>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Location Code</th>
                <th className="py-2.5 px-4">Name / Shelf</th>
                <th className="py-2.5 px-4">Facility / Warehouse</th>
                <th className="py-2.5 px-4">Storage Type</th>
                <th className="py-2.5 px-4 text-right">Capacity Usage</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((loc) => {
                const pct = Math.round((loc.occupiedUnits / loc.maxCapacity) * 100);
                return (
                  <tr key={loc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-600">
                      {loc.code}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {loc.name}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Warehouse className="w-3.5 h-3.5 text-slate-400" />
                        {loc.warehouse}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {loc.type}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="text-xs font-mono font-semibold text-slate-900">
                        {loc.occupiedUnits} / {loc.maxCapacity} ({pct}%)
                      </div>
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full ml-auto mt-1 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="ready" size="sm">
                        Active
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[8px] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Add Storage Location</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddLocation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Location Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aisle 3 - Pallet Rack 4"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Location Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WH-A-A3-R4"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Warehouse
                </label>
                <select
                  value={formData.warehouse}
                  onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Main Central Hub">Main Central Hub</option>
                  <option value="Secondary Hub Dallas">Secondary Hub Dallas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Storage Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Pallet Rack">Pallet Rack</option>
                  <option value="Small Parts Bin">Small Parts Bin</option>
                  <option value="Staging Bay">Staging Bay</option>
                  <option value="Cold Storage Zone">Cold Storage Zone</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={Save}>
                  Save Location
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;