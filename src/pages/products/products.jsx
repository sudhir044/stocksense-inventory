import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, MoreVertical, Package, Edit, Trash2 } from 'lucide-react';

const Products = () => {
    // Dummy data - replace with your actual API fetch later
    const [products] = useState([
        { id: 1, name: 'MacBook Pro 16"', sku: 'LAP-001', category: 'Electronics', price: '$2,499', stock: 45, status: 'In Stock' },
        { id: 2, name: 'Ergonomic Office Chair', sku: 'FUR-042', category: 'Furniture', price: '$299', stock: 12, status: 'Low Stock' },
        { id: 3, name: 'Wireless Noise-Canceling Headphones', sku: 'AUD-009', category: 'Electronics', price: '$349', stock: 0, status: 'Out of Stock' },
        { id: 4, name: 'Mechanical Keyboard', sku: 'ACC-112', category: 'Accessories', price: '$129', stock: 85, status: 'In Stock' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'Low Stock': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'Out of Stock': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Package className="h-6 w-6 text-indigo-500" />
                            Products Inventory
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Manage your stock, pricing, and product details.
                        </p>
                    </div>
                    <Link
                        to="/products/create"
                        className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Link>
                </div>

                {/* Toolbar (Search & Filters) */}
                <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products by name, SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                        />
                    </div>
                    <button className="w-full sm:w-auto inline-flex items-center justify-center py-2 px-4 border border-slate-700 rounded-lg shadow-sm text-sm font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white focus:outline-none transition-all duration-200">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </button>
                </div>

                {/* Products Table */}
                <div className="bg-slate-800/80 backdrop-blur-md shadow-xl border border-slate-700/50 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-700/50">
                            <thead className="bg-slate-900/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Product Name</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">SKU</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Stock</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-700/20 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-white">{product.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {product.sku}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {product.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-3">
                                                <button className="text-indigo-400 hover:text-indigo-300 transition-colors" title="Edit">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="text-red-400 hover:text-red-300 transition-colors" title="Delete">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                                <button className="text-slate-400 hover:text-slate-300 transition-colors" title="More">
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (Optional/Visual) */}
                    <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700/50 flex items-center justify-between sm:px-6">
                        <div className="text-sm text-slate-400">
                            Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">4</span> of <span className="font-medium text-white">4</span> results
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-700 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-1 border border-slate-700 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Products;