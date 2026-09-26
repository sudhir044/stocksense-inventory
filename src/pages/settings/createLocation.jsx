import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ArrowLeft,
  Save,
  Warehouse,
  Boxes,
  Layers,
  Sparkles,
  Barcode,
  CheckCircle2,
  AlertCircle,
  Thermometer,
  ShieldAlert,
} from 'lucide-react';

const CreateLocation = () => {
  const navigate = useNavigate();

  // Warehouse list for selection
  const warehouses = [
    { code: 'WH-A', name: 'Main Central Hub (WH-A)' },
    { code: 'WH-B', name: 'Secondary Hub Dallas (WH-B)' },
    { code: 'WH-C', name: 'West Coast Depository (WH-C)' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    warehouseCode: 'WH-A',
    aisle: 'A1',
    rack: 'R1',
    shelf: 'S1',
    bin: 'B01',
    locationCode: 'WH-A-A1-R1-S1-B01',
    type: 'PALLET_RACK',
    status: 'ACTIVE',
    maxCapacityUnits: '100',
    maxWeightKg: '500',
    zone: 'GENERAL_STORAGE',
    isTemperatureControlled: false,
    temperatureRange: '',
    isHazardousAllowed: false,
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Auto-generate code when warehouse, aisle, rack, shelf or bin changes
  const updateGeneratedCode = (updatedFields) => {
    const wh = updatedFields.warehouseCode ?? formData.warehouseCode;
    const aisle = (updatedFields.aisle ?? formData.aisle).trim().toUpperCase();
    const rack = (updatedFields.rack ?? formData.rack).trim().toUpperCase();
    const shelf = (updatedFields.shelf ?? formData.shelf).trim().toUpperCase();
    const bin = (updatedFields.bin ?? formData.bin).trim().toUpperCase();

    const generated = [wh, aisle, rack, shelf, bin].filter(Boolean).join('-');
    return generated;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: val };
      if (['warehouseCode', 'aisle', 'rack', 'shelf', 'bin'].includes(name)) {
        updated.locationCode = updateGeneratedCode({ [name]: val });
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.locationCode.trim()) {
      setError('Location Name and Location Code are required.');
      return;
    }

    setLoading(true);

    try {
      // Simulate API create location call
      // Example: await locationService.create(formData);
      await new Promise((resolve) => setTimeout(resolve, 900));

      setSuccess(true);
      setTimeout(() => {
        navigate('/settings/locations');
      }, 1200);
    } catch (err) {
      setError('Failed to create storage location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header and Back Link */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          to="/settings/locations"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Locations
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <MapPin className="w-6 h-6" />
              </span>
              Create Storage Location
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Register a specific aisle, shelf slot, or bin for precision stock placement.
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
            <span>Location created successfully! Redirecting...</span>
          </div>
        )}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* 1. Facility & Hierarchical Identifier */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Warehouse className="w-4 h-4 text-indigo-400" />
            Facility & Coordinate Hierarchy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Warehouse <span className="text-rose-400">*</span>
              </label>
              <select
                name="warehouseCode"
                value={formData.warehouseCode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {warehouses.map((wh) => (
                  <option key={wh.code} value={wh.code}>
                    {wh.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Location Display Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aisle 1 - Top Shelf Bin A"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Coordinate sub-fields */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Aisle
              </label>
              <input
                type="text"
                name="aisle"
                value={formData.aisle}
                onChange={handleChange}
                placeholder="A1"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 text-center uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Rack
              </label>
              <input
                type="text"
                name="rack"
                value={formData.rack}
                onChange={handleChange}
                placeholder="R1"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 text-center uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Shelf / Level
              </label>
              <input
                type="text"
                name="shelf"
                value={formData.shelf}
                onChange={handleChange}
                placeholder="S1"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 text-center uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Bin Slot
              </label>
              <input
                type="text"
                name="bin"
                value={formData.bin}
                onChange={handleChange}
                placeholder="B01"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 text-center uppercase font-mono"
              />
            </div>
          </div>

          {/* Auto-computed Code Badge */}
          <div className="mt-4 p-3.5 bg-slate-900/80 border border-slate-700 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Barcode className="w-5 h-5 text-indigo-400" />
              <span className="text-xs text-slate-400">Generated Code / Barcode:</span>
              <span className="font-mono text-sm font-bold text-indigo-300">
                {formData.locationCode}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 italic">Auto-calculated</span>
          </div>
        </div>

        {/* 2. Type & Physical Dimensions */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Storage Specs & Capacity Limits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Location Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="PALLET_RACK">Pallet Rack</option>
                <option value="SMALL_PARTS_BIN">Small Parts Bin</option>
                <option value="FLOOR_BULK">Floor Bulk Staging</option>
                <option value="CANTILEVER_RACK">Cantilever Rack</option>
                <option value="QUARANTINE_BAY">Quarantine Bay</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Max Unit Capacity
              </label>
              <input
                type="number"
                name="maxCapacityUnits"
                value={formData.maxCapacityUnits}
                onChange={handleChange}
                placeholder="100"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Weight Limit (kg)
              </label>
              <input
                type="number"
                name="maxWeightKg"
                value={formData.maxWeightKg}
                onChange={handleChange}
                placeholder="500"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Zone Categorization
              </label>
              <select
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="GENERAL_STORAGE">General Fast-Moving</option>
                <option value="BULK_RESERVE">Bulk Reserve</option>
                <option value="PACKING_STAGING">Packing & Outbound Staging</option>
                <option value="RETURNS_PROCESSING">Returns & QA</option>
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
                <option value="ACTIVE">Active (Accepts Inventory)</option>
                <option value="LOCKED">Locked / Maintenance</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Safety & Environmental Flags */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-indigo-400" />
            Environmental & Safety Controls
          </h2>

          <div className="flex items-center justify-between py-2 border-b border-slate-700/60">
            <div>
              <div className="text-sm font-medium text-slate-200">
                Temperature Sensitive Storage
              </div>
              <div className="text-xs text-slate-400">
                Enable if this bin resides in a climate or refrigerated room.
              </div>
            </div>
            <input
              type="checkbox"
              name="isTemperatureControlled"
              checked={formData.isTemperatureControlled}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700 rounded cursor-pointer"
            />
          </div>

          {formData.isTemperatureControlled && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Required Temperature Range
              </label>
              <input
                type="text"
                name="temperatureRange"
                value={formData.temperatureRange}
                onChange={handleChange}
                placeholder="e.g. 2°C to 8°C"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-slate-200">
                Hazardous Materials Permitted
              </div>
              <div className="text-xs text-slate-400">
                Designate this bin for flammable, corrosive, or Hazmat SKUs.
              </div>
            </div>
            <input
              type="checkbox"
              name="isHazardousAllowed"
              checked={formData.isHazardousAllowed}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-4 pb-12">
          <Link
            to="/settings/locations"
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
            {loading ? 'Creating...' : 'Save Location'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLocation;