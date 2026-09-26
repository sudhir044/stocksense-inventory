import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Warehouse as WarehouseIcon,
  MapPin,
  Plus,
  Search,
  Phone,
  User,
  X,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';

export const Warehouses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      status: 'active',
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
      status: 'active',
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
      totalProducts: 145,
      status: 'active',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    manager: '',
    phone: '',
    totalCapacity: 20000,
  });

  const handleAddWarehouse = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    const newWh = {
      id: `WH-0${warehouses.length + 1}`,
      name: formData.name,
      code: formData.code.toUpperCase(),
      address: formData.address || 'Standard Logistics Depot',
      manager: formData.manager || 'Site Lead',
      phone: formData.phone || '+1 555-0100',
      totalCapacity: Number(formData.totalCapacity) || 10000,
      usedCapacity: 0,
      totalLocations: 4,
      totalProducts: 0,
      status: 'active',
    };
    setWarehouses([...warehouses, newWh]);
    setIsModalOpen(false);
    setFormData({ name: '', code: '', address: '', manager: '', phone: '', totalCapacity: 20000 });
  };

  const filtered = warehouses.filter((w) =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Warehouses & Facilities"
        subtitle="Manage logistics depots, fulfillment centers, and storage capacity limits."
        breadcrumbs={[
          { label: 'Settings', path: '/settings' },
          { label: 'Warehouses' },
        ]}
        action={
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            Add Warehouse
          </Button>
        }
      />

      {/* Search Toolbar */}
      <div className="bg-white border border-slate-200 rounded-[8px] p-3 shadow-2xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search warehouse code, name, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="text-xs text-slate-500">
          Total: <strong className="text-slate-900">{filtered.length}</strong> facilities
        </div>
      </div>


      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Code</th>
                <th className="py-2.5 px-4">Facility Name & Address</th>
                <th className="py-2.5 px-4">Manager Contact</th>
                <th className="py-2.5 px-4 text-right">Capacity Usage</th>
                <th className="py-2.5 px-4 text-center">Locations</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((wh) => {
                const pct = Math.round((wh.usedCapacity / wh.totalCapacity) * 100);
                return (
                  <tr key={wh.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-600">
                      {wh.code}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{wh.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {wh.address}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <div className="font-medium text-slate-900">{wh.manager}</div>
                      <div className="text-slate-400 text-[11px]">{wh.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="text-xs font-mono font-semibold text-slate-900">
                        {wh.usedCapacity.toLocaleString()} / {wh.totalCapacity.toLocaleString()} ({pct}%)
                      </div>
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full ml-auto mt-1 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-xs font-semibold text-slate-700">
                      {wh.totalLocations} bays
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
              <h3 className="text-sm font-bold text-slate-900">Add Warehouse Facility</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddWarehouse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Warehouse Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Northeast Regional Depot"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Facility Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WH-D"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Physical Address
                </label>
                <input
                  type="text"
                  placeholder="123 Logistics Way, City, State"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
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
                  Save Warehouse
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouses;