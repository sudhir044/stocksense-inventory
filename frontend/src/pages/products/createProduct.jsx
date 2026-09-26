import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Package,
  Hash,
  DollarSign,
  Layers,
  Boxes,
  AlertCircle,
} from 'lucide-react';
import productService from '../../services/product.service';
import categoryService from '../../services/category.service';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: '',
    unit: 'pcs',
    costPrice: '',
    reorderLevel: '10',
    description: '',
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        categoryId: formData.categoryId || null,
        unit: formData.unit || 'pcs',
        costPrice: parseFloat(formData.costPrice) || 0,
        reorderLevel: parseInt(formData.reorderLevel, 10) || 0,
        description: formData.description.trim() || null,
      };

      await productService.createProduct(payload);
      navigate('/products');
    } catch (err) {
      console.error('Failed to create product:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create product');
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
              Fill in the information below to add a new item to your inventory catalog.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-slate-800/80 backdrop-blur-md p-6 sm:p-8 shadow-xl border border-slate-700/50 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Product Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                  Product Name *
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
                    placeholder="e.g. Wireless Ergonomic Keyboard"
                  />
                </div>
              </div>

              {/* SKU */}
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-slate-300">
                  SKU (Stock Keeping Unit) *
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
                    placeholder="e.g. KB-8821"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-slate-300">
                  Category
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Layers className="h-5 w-5 text-slate-500" />
                  </div>
                  <select
                    name="categoryId"
                    id="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                  >
                    <option value="">Select a category (Optional)</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cost Price */}
              <div>
                <label htmlFor="costPrice" className="block text-sm font-medium text-slate-300">
                  Cost Price ($)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="number"
                    name="costPrice"
                    id="costPrice"
                    min="0"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Unit & Reorder Level */}
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-slate-300">
                  Unit of Measure
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="block w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. pcs, kg, box"
                  />
                </div>
              </div>

              {/* Reorder Level */}
              <div>
                <label htmlFor="reorderLevel" className="block text-sm font-medium text-slate-300">
                  Reorder Level Threshold
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Boxes className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="number"
                    name="reorderLevel"
                    id="reorderLevel"
                    min="0"
                    value={formData.reorderLevel}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="10"
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
                    placeholder="Brief details about the product specifications..."
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