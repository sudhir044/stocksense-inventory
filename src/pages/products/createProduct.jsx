import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Package,
    Hash,
    DollarSign,
    Layers,
    Boxes
} from 'lucide-react';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        price: '',
        stock: '',
        description: ''
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
            // Simulate API call to save product
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect back to products list on success
            navigate('/products');
        } catch (err) {
            console.error('Failed to create product', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-8">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/products"
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Add New Product</h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Fill in the information below to add a new item to your inventory.
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800/80 backdrop-blur-md p-6 sm:p-8 shadow-xl border border-slate-700/50 rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Product Name */}
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                                    Product Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Package className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="e.g. MacBook Pro 16&quot;"
                                    />
                                </div>
                            </div>

                            {/* SKU */}
                            <div>
                                <label htmlFor="sku" className="block text-sm font-medium text-slate-300">
                                    SKU (Stock Keeping Unit)
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Hash className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        name="sku"
                                        id="sku"
                                        required
                                        value={formData.sku}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="e.g. LAP-001"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-300">
                                    Category
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Layers className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <select
                                        name="category"
                                        id="category"
                                        required
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                                    >
                                        <option value="" disabled className="text-slate-500">Select a category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Software">Software</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-slate-300">
                                    Price
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Initial Stock */}
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-slate-300">
                                    Initial Stock Quantity
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Boxes className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="number"
                                        name="stock"
                                        id="stock"
                                        required
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-slate-300">
                                    Product Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="block w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                                        placeholder="Brief details about the product..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-slate-700/50 flex items-center justify-end gap-4">
                            <Link
                                to="/products"
                                className="py-2.5 px-4 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </Link>
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
                                        Save Product
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;