import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Trash2,
  Package,
  Hash,
  Layers,
  DollarSign,
  Box,
  Activity,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import productService from '../../services/product.service';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!product) return;
    if (window.confirm(`Are you sure you want to deactivate ${product.name}?`)) {
      try {
        setDeleting(true);
        await productService.deactivateProduct(product.id);
        navigate('/products');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to deactivate product');
      } finally {
        setDeleting(false);
      }
    }
  };

  const getStatus = (p) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <h2 className="text-xl font-bold">{error || 'Product Not Found'}</h2>
        <Link
          to="/products"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const status = getStatus(product);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                Product Details
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                View information and inventory status for {product.sku}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 sm:flex-none inline-flex items-center justify-center py-2 px-4 border border-red-500/20 rounded-lg shadow-sm text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {deleting ? 'Deactivating...' : 'Deactivate Product'}
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-md p-6 sm:p-8 shadow-xl border border-slate-700/50 rounded-2xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
              <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
                <Package className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{product.name}</h2>
                <span
                  className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                    status
                  )}`}
                >
                  {status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="flex items-center text-sm font-medium text-slate-400 mb-1">
                  <Hash className="mr-2 h-4 w-4" /> SKU
                </span>
                <p className="text-base text-slate-100 font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  {product.sku}
                </p>
              </div>

              <div>
                <span className="flex items-center text-sm font-medium text-slate-400 mb-1">
                  <Layers className="mr-2 h-4 w-4" /> Category
                </span>
                <p className="text-base text-slate-100 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  {product.category_name || 'Uncategorized'}
                </p>
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-400 mb-2">Description</span>
              <p className="text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 leading-relaxed min-h-[60px]">
                {product.description || 'No description provided.'}
              </p>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* Inventory & Pricing Card */}
            <div className="bg-slate-800/80 backdrop-blur-md p-6 shadow-xl border border-slate-700/50 rounded-2xl space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Activity className="mr-2 h-5 w-5 text-indigo-400" />
                Inventory Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <span className="flex items-center text-sm text-slate-400">
                    <DollarSign className="mr-2 h-4 w-4" /> Cost Price
                  </span>
                  <span className="text-lg font-bold text-white font-mono">
                    ${Number(product.cost_price ?? 0).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <span className="flex items-center text-sm text-slate-400">
                    <Box className="mr-2 h-4 w-4" /> Total Stock
                  </span>
                  <span className="text-lg font-bold text-white font-mono">
                    {product.total_stock ?? 0} {product.unit || 'pcs'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <span className="flex items-center text-sm text-slate-400">
                    Reorder Level
                  </span>
                  <span className="text-sm font-medium text-amber-400 font-mono">
                    {product.reorder_level ?? 0} {product.unit || 'pcs'}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-slate-800/80 backdrop-blur-md p-6 shadow-xl border border-slate-700/50 rounded-2xl space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                System Data
              </h3>

              <div className="flex justify-between items-center">
                <span className="flex items-center text-sm text-slate-400">
                  <Calendar className="mr-2 h-4 w-4" /> Added
                </span>
                <span className="text-sm text-slate-200">
                  {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                <span className="flex items-center text-sm text-slate-400">
                  <Activity className="mr-2 h-4 w-4" /> Status
                </span>
                <span className="text-sm text-emerald-400 font-medium">
                  {product.is_active ? 'Active' : 'Deactivated'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;