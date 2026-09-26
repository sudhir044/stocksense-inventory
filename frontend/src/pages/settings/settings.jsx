import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Warehouse,
  Tag,
  Save,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [savedNotification, setSavedNotification] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'StockSense Logistics Inc.',
    defaultCurrency: 'USD ($)',
    timezone: 'UTC-05:00 (Eastern Time)',
    emailNotifications: true,
    lowStockAlerts: true,
    reorderEmail: 'operations@stocksense.com',
  });

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
    <div className="space-y-6">
      <PageHeader
        title="System Settings"
        subtitle="Manage organization parameters, currency, notifications, and master defaults."
        breadcrumbs={[
          { label: 'System' },
          { label: 'Settings' },
        ]}
      />

      {savedNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[6px] flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>System configuration updated successfully.</span>
        </div>
      )}

      {/* Tabs & Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-56 flex-shrink-0">
          <div className="bg-white border border-slate-200 rounded-[8px] p-2 space-y-1 shadow-2xs">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center px-3 py-2 text-xs font-semibold rounded-[6px] transition-colors ${
                activeTab === 'general'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <SettingsIcon className="w-4 h-4 mr-2.5" />
              General Preferences
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center px-3 py-2 text-xs font-semibold rounded-[6px] transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sliders className="w-4 h-4 mr-2.5" />
              Inventory Rules
            </button>
          </div>
        </div>

        {/* Form Panel */}
        <div className="flex-1 bg-white border border-slate-200 rounded-[8px] p-6 shadow-2xs">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                {activeTab === 'general' ? 'Enterprise Parameters' : 'Inventory Thresholds & Alerts'}
              </h3>
            </div>

            {activeTab === 'general' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={generalSettings.companyName}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Operating Currency
                  </label>
                  <select
                    name="defaultCurrency"
                    value={generalSettings.defaultCurrency}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="USD ($)">USD ($) - United States Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                    <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ledger Timezone
                  </label>
                  <select
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="UTC-05:00 (Eastern Time)">UTC-05:00 (Eastern Time)</option>
                    <option value="UTC+00:00 (London)">UTC+00:00 (London / UTC)</option>
                    <option value="UTC+05:30 (IST)">UTC+05:30 (India Standard Time)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Operations Contact Email
                  </label>
                  <input
                    type="email"
                    name="reorderEmail"
                    value={generalSettings.reorderEmail}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-[6px] border border-slate-200">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Automated Reorder Alerts</div>
                    <div className="text-[11px] text-slate-500">Flag SKUs automatically when quantity falls below reorder points.</div>
                  </div>
                  <input
                    type="checkbox"
                    name="lowStockAlerts"
                    checked={generalSettings.lowStockAlerts}
                    onChange={handleGeneralChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-[6px] border border-slate-200">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Daily Stock Movement Digest</div>
                    <div className="text-[11px] text-slate-500">Transmit summary email of validated receipts and outbound deliveries.</div>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={generalSettings.emailNotifications}
                    onChange={handleGeneralChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button type="submit" variant="primary" size="sm" icon={Save}>
                Save Preferences
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;