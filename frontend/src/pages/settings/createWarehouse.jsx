import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Warehouse,
  ArrowLeft,
  Save,
  Building,
  MapPin,
  User,
  Phone,
  Mail,
  Layers,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

const CreateWarehouse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'DISTRIBUTION_CENTER',
    status: 'ACTIVE',
    managerName: '',
    managerEmail: '',
    managerPhone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    totalCapacitySqFt: '',
    maxWeightTons: '',
    defaultDockDoors: '',
    temperatureControlled: false,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

    // Quick validation check
    if (!formData.name.trim() || !formData.code.trim()) {
      setError('Warehouse Name and Unique Code are required fields.');
      return;
    }

    setLoading(true);

    try {
      // Add your API service call here
      // Example: await warehouseService.create(formData);

      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setTimeout(() => {
        navigate('/settings/warehouses');
      }, 1200);
    } catch (err) {
      setError('Failed to create warehouse. Please verify inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header and Back Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          to="/settings/warehouses"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Warehouses
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <Warehouse className="w-6 h-6" />
              </span>
              Create New Warehouse
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Add a new storage depot, fulfillment node, or transit hub to your logistics network.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="max-w-4xl mx-auto mb-6">
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Warehouse created successfully! Redirecting...</span>
          </div>
        )}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* 1. Basic Information */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-400" />
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Warehouse Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. North East Fulfillment Hub"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Warehouse Code / Identifier <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="code"
                required
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. WH-NE-01"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Warehouse Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="DISTRIBUTION_CENTER">Distribution Center</option>
                <option value="FULFILLMENT_NODE">Fulfillment Node</option>
                <option value="RAW_MATERIALS">Raw Materials Depot</option>
                <option value="COLD_STORAGE">Cold Storage Facility</option>
                <option value="TRANSIT_HUB">Transit Cross-Dock Hub</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Operational Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="ACTIVE">Active (Available for moves)</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                <option value="INACTIVE">Inactive / Decommissioned</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Facility Manager / Contact */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            Contact & Supervisory Person
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Supervisor / Manager Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  name="managerPhone"
                  value={formData.managerPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 234-5678"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  name="managerEmail"
                  value={formData.managerEmail}
                  onChange={handleChange}
                  placeholder="amorgan@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Physical Address */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            Physical Location & Address
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="e.g. 500 Industrial Expressway, Suite 100"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Chicago"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="IL"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Postal / ZIP Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="60601"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Capacity & Specifications */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Storage Dimensions & Logistics Specs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Total Capacity (sq ft)
              </label>
              <input
                type="number"
                name="totalCapacitySqFt"
                value={formData.totalCapacitySqFt}
                onChange={handleChange}
                placeholder="e.g. 45000"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Weight Limit (Tons)
              </label>
              <input
                type="number"
                name="maxWeightTons"
                value={formData.maxWeightTons}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Loading Dock Doors
              </label>
              <input
                type="number"
                name="defaultDockDoors"
                value={formData.defaultDockDoors}
                onChange={handleChange}
                placeholder="e.g. 8"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-200">
                Temperature Controlled Zone
              </div>
              <div className="text-xs text-slate-400">
                Check this option if this facility supports HVAC / refrigeration controls.
              </div>
            </div>
            <input
              type="checkbox"
              name="temperatureControlled"
              checked={formData.temperatureControlled}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-4 pb-12">
          <Link
            to="/settings/warehouses"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Creating...' : 'Create Warehouse'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWarehouse;