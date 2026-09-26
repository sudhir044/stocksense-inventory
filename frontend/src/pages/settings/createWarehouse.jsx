import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Warehouse,
  ArrowLeft,
  Save,
  Building,
  MapPin,
  User,
  Layers,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { ErrorAlert } from '../../components/ui/Feedback';

export const CreateWarehouse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'DISTRIBUTION_CENTER',
    status: 'ACTIVE',
    managerName: '',
    managerPhone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    totalCapacitySqFt: '50000',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.code.trim()) {
      setError('Warehouse Name and Unique Code are required fields.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      navigate('/settings/warehouses');
    } catch (err) {
      setError('Failed to create warehouse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Create Warehouse Facility"
        subtitle="Provision a new physical distribution center or regional fulfillment hub."
        breadcrumbs={[
          { label: 'Settings', path: '/settings' },
          { label: 'Warehouses', path: '/settings/warehouses' },
          { label: 'New Warehouse' },
        ]}
        action={
          <Link to="/settings/warehouses">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Warehouses
            </Button>
          </Link>
        }
      />

      <ErrorAlert message={error} onDismiss={() => setError('')} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Facility Identification</h3>
            <p className="text-xs text-slate-500 mt-0.5">Primary facility code and operating designation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Facility Name *
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Northeast Regional Center"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Warehouse Code *
              </label>
              <input
                type="text"
                required
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. WH-D"
                className="w-full px-3 py-2 text-sm font-mono uppercase bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Warehouse Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
              >
                <option value="DISTRIBUTION_CENTER">Distribution Center</option>
                <option value="FULFILLMENT_NODE">Fulfillment Node</option>
                <option value="RAW_MATERIALS">Raw Materials Depot</option>
                <option value="TRANSIT_HUB">Transit Cross-Dock Hub</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Total Capacity (sq ft)
              </label>
              <input
                type="number"
                name="totalCapacitySqFt"
                value={formData.totalCapacitySqFt}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Location & Manager Contact</h3>
            <p className="text-xs text-slate-500 mt-0.5">Physical street address and facility manager coordinates.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="100 Logistics Blvd, Suite 200"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Facility Manager Name
              </label>
              <input
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                placeholder="Alex Morgan"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Manager Phone
              </label>
              <input
                type="text"
                name="managerPhone"
                value={formData.managerPhone}
                onChange={handleChange}
                placeholder="+1 555-0199"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2.5">
          <Link to="/settings/warehouses">
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="sm" icon={Save} loading={loading}>
            Save Warehouse
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateWarehouse;