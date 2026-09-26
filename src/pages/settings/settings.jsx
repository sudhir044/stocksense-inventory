import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Warehouse,
  MapPin,
  Tag,
  Bell,
  Shield,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [savedNotification, setSavedNotification] = useState(false);

  // General Settings state
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'StockSense Logistics Inc.',
    defaultCurrency: 'USD ($)',
    timezone: 'UTC-05:00 (Eastern Time)',
    emailNotifications: true,
    lowStockAlerts: true,
    reorderEmail: 'operations@stocksense.com',
  });

  // Warehouses list state
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: 'Main Central Hub (WH-A)', code: 'WH-A', address: '104 Industrial Pkwy, Chicago, IL', totalCapacity: '25,000 sq ft', status: 'Active' },
    { id: 2, name: 'Secondary Hub (WH-B)', code: 'WH-B', address: '88 Commerce Blvd, Dallas, TX', totalCapacity: '12,000 sq ft', status: 'Active' },
  ]);

  // Categories list state
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', count: 48, code: 'ELEC' },
    { id: 2, name: 'Peripherals', count: 112, code: 'PERI' },
    { id: 3, name: 'Accessories', count: 74, code: 'ACCS' },
    { id: 4, name: 'Cables & Power', count: 32, code: 'CABL' },
  ]);

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          System Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage system configurations, warehouse nodes, inventory categories, and notification preferences.
        </p>
      </div>

      {savedNotification && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg flex items-center space-x-2 text-sm shadow-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1 bg-slate-800/80 backdrop-blur-md border border-slate-700/60 p-2 rounded-xl">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'general'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`}
            >
              <SettingsIcon className="w-4 h-4 mr-3" />
              General Preferences
            </button>

            <button
              onClick={() => setActiveTab('warehouses')}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'warehouses'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`}
            >
              <Warehouse className="w-4 h-4 mr-3" />
              Warehouses
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'categories'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`}
            >
              <Tag className="w-4 h-4 mr-3" />
              Product Categories
            </button>
          </nav>
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1">
          {/* 1. GENERAL PREFERENCES */}
          {activeTab === 'general' && (
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-6">General Preferences</h2>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={generalSettings.companyName}
                      onChange={handleGeneralChange}
                      className="mt-1 block w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Default Currency
                    </label>
                    <select
                      name="defaultCurrency"
                      value={generalSettings.defaultCurrency}
                      onChange={handleGeneralChange}
                      className="mt-1 block w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm cursor-pointer"
                    >
                      <option value="USD ($)">USD ($) - US Dollar</option>
                      <option value="EUR (€)">EUR (€) - Euro</option>
                      <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                      <option value="GBP (£)">GBP (£) - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      System Timezone
                    </label>
                    <select
                      name="timezone"
                      value={generalSettings.timezone}
                      onChange={handleGeneralChange}
                      className="mt-1 block w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm cursor-pointer"
                    >
                      <option value="UTC-05:00 (Eastern Time)">UTC-05:00 (Eastern Time)</option>
                      <option value="UTC+00:00 (London)">UTC+00:00 (London)</option>
                      <option value="UTC+05:30 (IST)">UTC+05:30 (India Standard Time)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Low Stock Notification Email
                    </label>
                    <input
                      type="email"
                      name="reorderEmail"
                      value={generalSettings.reorderEmail}
                      onChange={handleGeneralChange}
                      className="mt-1 block w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-200">Automated Low Stock Alerts</div>
                      <div className="text-xs text-slate-400">Receive instant alerts when inventory falls below minimum safety stock levels.</div>
                    </div>
                    <input
                      type="checkbox"
                      name="lowStockAlerts"
                      checked={generalSettings.lowStockAlerts}
                      onChange={handleGeneralChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-200">Email Movement Summaries</div>
                      <div className="text-xs text-slate-400">Receive daily summary emails for receipts and outbound delivery orders.</div>
                    </div>
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={generalSettings.emailNotifications}
                      onChange={handleGeneralChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. WAREHOUSES MANAGEMENT */}
          {activeTab === 'warehouses' && (
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Warehouses & Storage Hubs</h2>
                  <p className="text-xs text-slate-400">Manage all warehouse facilities and storage depots.</p>
                </div>
                <button className="inline-flex items-center px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Warehouse
                </button>
              </div>

              <div className="space-y-4">
                {warehouses.map((wh) => (
                  <div
                    key={wh.id}
                    className="p-4 bg-slate-900/60 border border-slate-700/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg">
                        <Warehouse className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white text-sm">{wh.name}</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                            {wh.code}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{wh.address}</span>
                          <span className="text-slate-600">•</span>
                          <span>Cap: {wh.totalCapacity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PRODUCT CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Product Categories</h2>
                  <p className="text-xs text-slate-400">Classify inventory products into high-level categories.</p>
                </div>
                <button className="inline-flex items-center px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 bg-slate-900/60 border border-slate-700/60 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-800 text-indigo-400 rounded-lg border border-slate-700">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{cat.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          Code: {cat.code} • {cat.count} products
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-rose-400 hover:text-rose-300 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;