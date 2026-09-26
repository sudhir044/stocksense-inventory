import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  Package,
  Eye,
  Trash2,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import productService from '../../services/product.service';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.response?.data?.message || 'Failed to load products from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to deactivate product "${name}"?`)) {
      return;
    }
    try {
      setDeletingId(id);
      await productService.deactivateProduct(id);
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to deactivate product');
    } finally {
      setDeletingId(null);
    }
  };

  // Derive status
  const getProductStatus = (p) => {
    const stock = Number(p.total_stock ?? p.stock ?? 0);
    const min = Number(p.reorder_level ?? 0);
    if (stock <= 0) return 'Out of Stock';
    if (stock <= min) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Low Stock':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Out of Stock':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  // Unique categories for filter
  const categories = Array.from(
    new Set(products.map((p) => p.category_name).filter(Boolean))
  );

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (product.name || '').toLowerCase().includes(term) ||
      (product.sku || '').toLowerCase().includes(term) ||
      (product.category_name || '').toLowerCase().includes(term);

    const matchesCategory =
      categoryFilter === 'ALL' || product.category_name === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <Link
              to="/dashboard"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Package className="h-6 w-6 text-indigo-500" />
                Products Inventory
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Manage your live catalog, pricing, SKU codes, and stock thresholds.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            </button>
            <Link
              to="/products/create"
              className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={fetchProducts} className="underline font-semibold hover:text-rose-300">
              Retry
            </button>
          </div>
        )}

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

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-slate-800/80 backdrop-blur-md shadow-xl border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/50">
              <thead className="bg-slate-900/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Cost Price
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading products from database...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const status = getProductStatus(product);
                    const stockQty = Number(product.total_stock ?? product.stock ?? 0);
                    return (
                      <tr key={product.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/products/${product.id}`}
                            className="text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                          >
                            {product.name}
                          </Link>
                          {product.unit && (
                            <span className="ml-2 text-xs text-slate-500">({product.unit})</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-400">
                          {product.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                          {product.category_name || 'Uncategorized'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-300">
                          ${Number(product.cost_price ?? product.price ?? 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-slate-100">
                          {stockQty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-3">
                            <Link
                              to={`/products/${product.id}`}
                              className="text-indigo-400 hover:text-indigo-300 transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id, product.name)}
                              disabled={deletingId === product.id}
                              className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                              title="Deactivate"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      No products found. Click "Add Product" to add your first inventory item.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700/50 flex items-center justify-between sm:px-6">
            <div className="text-sm text-slate-400">
              Showing <span className="font-medium text-white">{filteredProducts.length}</span> of{' '}
              <span className="font-medium text-white">{products.length}</span> products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;