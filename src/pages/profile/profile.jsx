import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Building,
    Camera,
    Save,
    Lock,
    Shield
} from 'lucide-react';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'Alex',
        lastName: 'Morgan',
        email: 'alex.morgan@stocksense.com',
        phone: '+1 (555) 123-4567',
        department: 'Operations',
        role: 'Inventory Manager'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call to update profile
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Add success notification logic here
        } catch (err) {
            console.error('Failed to update profile', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Section */}
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <User className="h-6 w-6 text-indigo-500" />
                        Profile Settings
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Manage your account settings and personal preferences.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-800/80 backdrop-blur-md p-6 shadow-xl border border-slate-700/50 rounded-2xl flex flex-col items-center text-center">

                            <div className="relative mb-4">
                                <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-slate-800">
                                    {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                                </div>
                                <button className="absolute bottom-0 right-0 bg-slate-700 p-2 rounded-full border border-slate-600 text-white hover:bg-slate-600 transition-colors">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-white">
                                {formData.firstName} {formData.lastName}
                            </h2>
                            <p className="text-sm text-indigo-400 font-medium mt-1">
                                {formData.role}
                            </p>

                            <div className="w-full mt-6 pt-6 border-t border-slate-700/50 space-y-3 text-sm">
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="flex items-center gap-2 text-slate-400">
                                        <Shield className="h-4 w-4" /> Access Level
                                    </span>
                                    <span>Admin</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="flex items-center gap-2 text-slate-400">
                                        <Building className="h-4 w-4" /> Department
                                    </span>
                                    <span>{formData.department}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Edit Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800/80 backdrop-blur-md shadow-xl border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-700/50">
                                <h3 className="text-lg font-medium text-white">Personal Information</h3>
                                <p className="text-sm text-slate-400 mt-1">Update your personal details and contact information.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-300">
                                            First Name
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-300">
                                            Last Name
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                            Email Address
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
                                            Phone Number
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Role */}
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-slate-300">
                                            Role / Job Title
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Building className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="text"
                                                name="role"
                                                id="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Password Change Prompt */}
                                <div className="pt-6 mt-6 border-t border-slate-700/50 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-white">Password</h4>
                                        <p className="text-sm text-slate-400 mt-1">Change your password to keep your account secure.</p>
                                    </div>
                                    <button type="button" className="inline-flex items-center justify-center py-2 px-4 border border-slate-700 rounded-lg shadow-sm text-sm font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white focus:outline-none transition-all duration-200">
                                        <Lock className="mr-2 h-4 w-4" />
                                        Change Password
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-6 mt-6 border-t border-slate-700/50 flex items-center justify-end gap-4">
                                    <button
                                        type="button"
                                        className="py-2.5 px-4 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex justify-center items-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;