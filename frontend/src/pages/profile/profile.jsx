import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, CheckCircle2, Building, LogOut, KeyRound } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="User Profile"
        subtitle="Manage your operator profile, security credentials, and organization permissions."
        breadcrumbs={[
          { label: 'System' },
          { label: 'Profile' },
        ]}
        action={
          <Button variant="danger" size="sm" icon={LogOut} onClick={logout}>
            Sign Out
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Quick Info */}
        <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-2xs text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-2xl mb-4 border-2 border-blue-600">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'OP'}
          </div>
          <h2 className="text-base font-bold text-slate-900">{user?.name || 'Operator'}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{user?.email || 'operator@stocksense.com'}</p>

          <div className="mt-4 flex items-center gap-2">
            <Badge variant="ready" size="sm">
              Active Operator
            </Badge>
          </div>

          <div className="w-full pt-6 mt-6 border-t border-slate-100 text-left space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Security Clearance</span>
              <span className="font-semibold text-slate-900">Level 3 (Full Access)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Assigned Branch</span>
              <span className="font-semibold text-slate-900">Main Central Hub</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Audit Status</span>
              <span className="font-semibold text-emerald-700">Verified</span>
            </div>
          </div>
        </div>


        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-2xs space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Personal & Organization Details</h3>
              <p className="text-xs text-slate-500 mt-0.5">Primary identity attributes stored in PostgreSQL authentication table.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="text-sm font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-[6px] border border-slate-200">
                  {user?.name || 'Inventory Manager'}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Work Email Address
                </label>
                <div className="text-sm font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-[6px] border border-slate-200">
                  {user?.email || 'manager@company.com'}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  System Role
                </label>
                <div className="text-sm font-semibold text-slate-900 bg-slate-50 px-3 py-2 rounded-[6px] border border-slate-200 capitalize">
                  {user?.role?.replace('_', ' ') || 'Inventory Manager'}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Account Status
                </label>
                <div className="text-sm font-semibold text-emerald-700 bg-emerald-50/50 px-3 py-2 rounded-[6px] border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Active / Authorized
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-2xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Security & Authentication</h3>
              <p className="text-xs text-slate-500 mt-0.5">Password management and active session controls.</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-[6px] border border-slate-200">
              <div>
                <div className="text-xs font-semibold text-slate-900">Password & Two-Factor OTP</div>
                <div className="text-[11px] text-slate-500">Need to update your password? Use the OTP verification flow.</div>
              </div>
              <Link to="/forgot-password">
                <Button variant="secondary" size="xs" icon={KeyRound}>
                  Reset Password
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
