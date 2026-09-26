import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ArrowLeft,
  Save,
  Warehouse,
  Boxes,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { ErrorAlert } from '../../components/ui/Feedback';

export const CreateLocation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    warehouse: 'Main Central Hub (WH-A)',
    locationCode: 'WH-A-A1-R1',
    type: 'PALLET_RACK',
    maxCapacityUnits: '100',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.locationCode.trim()) {
      setError('Location name and code are required.');
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      navigate('/settings/location');
    } catch (err) {
      setError('Failed to create storage location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Create Storage Location"
        subtitle="Define a new bin, shelf, pallet rack, or staging zone."
        breadcrumbs={[
          { label: 'Settings', path: '/settings' },
          { label: 'Locations', path: '/settings/location' },
          { label: 'New Location' },
        ]}
        action={
          <Link to="/settings/location">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Locations
            </Button>
          </Link>
        }
      />

      <ErrorAlert message={error} onDismiss={() => setError('')} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Location Identification</h3>
            <p className="text-xs text-slate-500 mt-0.5">Define bin identifier code and storage type.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Location Name / Shelf *
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aisle 3 - Pallet Rack 4"
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
                name="locationCode"
                value={formData.locationCode}
                onChange={handleChange}
                placeholder="e.g. WH-A-A3-R4"
                className="w-full px-3 py-2 text-sm font-mono uppercase bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Facility / Warehouse
              </label>
              <select
                name="warehouse"
                value={formData.warehouse}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
              >
                <option value="Main Central Hub (WH-A)">Main Central Hub (WH-A)</option>
                <option value="Secondary Hub Dallas (WH-B)">Secondary Hub Dallas (WH-B)</option>
                <option value="West Coast Depository (WH-C)">West Coast Depository (WH-C)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Storage Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
              >
                <option value="PALLET_RACK">Pallet Rack</option>
                <option value="SMALL_PARTS_BIN">Small Parts Bin</option>
                <option value="STAGING_BAY">Staging Bay</option>
                <option value="COLD_STORAGE">Cold Storage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Max Units Capacity
              </label>
              <input
                type="number"
                name="maxCapacityUnits"
                value={formData.maxCapacityUnits}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2.5">
          <Link to="/settings/location">
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="sm" icon={Save} loading={loading}>
            Save Location
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateLocation;