import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tag,
  Plus,
  Search,
  Layers,
  Boxes,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  FolderTree,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Initial categories list
  const [categories, setCategories] = useState([
    {
      id: 'CAT-001',
      name: 'Electronics & Gadgets',
      code: 'ELEC',
      parentCategory: 'None',
      productCount: 142,
      totalStockUnits: 3450,
      description: 'Laptops, components, circuit boards, and battery peripherals.',
      status: 'Active',
    },
    {
      id: 'CAT-002',
      name: 'Computer Peripherals',
      code: 'PERI',
      parentCategory: 'Electronics & Gadgets',
      productCount: 88,
      totalStockUnits: 1820,
      description: 'Mice, mechanical keyboards, webcams, and USB accessories.',
      status: 'Active',
    },
    {
      id: 'CAT-003',
      name: 'Office Supplies & Furniture',
      code: 'OFFC',
      parentCategory: 'None',
      productCount: 64,
      totalStockUnits: 980,
      description: 'Desks, ergonomic chairs, paper supplies, and desk organizers.',
      status: 'Active',
    },
    {
      id: 'CAT-004',
      name: 'Cables & Networking Gear',
      code: 'NETW',
      parentCategory: 'Electronics & Gadgets',
      productCount: 95,
      totalStockUnits: 5120,
      description: 'Ethernet cables, routers, switches, patch panels, and adapters.',
      status: 'Active',
    },
    {
      id: 'CAT-005',
      name: 'Packaging & Warehouse Logistics',
      code: 'LOGI',
      parentCategory: 'None',
      productCount: 31,
      totalStockUnits: 14200,
      description: 'Cardboard boxes, bubble wrap, packing tapes, and pallet wraps.',
      status: 'Active',
    },
    {
      id: 'CAT-006',
      name: 'Seasonal Inventory',
      code: 'SEAS',
      parentCategory: 'None',
      productCount: 0,
      totalStockUnits: 0,
      description: 'Archived promotional goods and discontinued holiday lines.',
      status: 'Inactive',
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    parentCategory: 'None',
    description: '',
    status: 'Active',
  });

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setEditingCategory(cat);
      setFormData({
        name: cat.name,
        code: cat.code,
        parentCategory: cat.parentCategory,
        description: cat.description,
        status: cat.status,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        code: '',
        parentCategory: 'None',
        description: '',
        status: 'Active',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-suggest 4-letter uppercase code if typing name and not editing
      if (name === 'name' && !editingCategory) {
        const cleanName = value.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase();
        if (cleanName.length >= 3) {
          updated.code = cleanName;
        }
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) return;

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCat = {
        id: `CAT-00${categories.length + 1}`,
        name: formData.name,
        code: formData.code.toUpperCase(),
        parentCategory: formData.parentCategory,
        productCount: 0,
        totalStockUnits: 0,
        description: formData.description,
        status: formData.status,
      };
      setCategories((prev) => [newCat, ...prev]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category? Associated items may become uncategorized.')) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Filter logic
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Product Categories
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Organize inventory into taxonomy levels, assign SKUs, and manage product families.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Categories
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {categories.length} Categories
            </div>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <Tag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Categorized Products
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {categories.reduce((acc, curr) => acc + curr.productCount, 0)} SKUs
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <Boxes className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Stock In Categories
            </div>
            <div className="text-2xl font-bold text-indigo-400 mt-1">
              {categories.reduce((acc, curr) => acc + curr.totalStockUnits, 0).toLocaleString()} Units
            </div>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-6 shadow-lg">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search category name, code, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{cat.name}</h3>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="font-mono text-xs text-indigo-400">
                        {cat.code}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span
                        className={`text-[10px] px-2 py-0.2 rounded-full font-medium ${
                          cat.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {cat.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenModal(cat)}
                    className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 mt-4 line-clamp-2">
                {cat.description || 'No description provided.'}
              </p>

              {/* Parent Category info */}
              {cat.parentCategory !== 'None' && (
                <div className="mt-3 flex items-center space-x-1.5 text-xs text-slate-400">
                  <FolderTree className="w-3.5 h-3.5 text-slate-500" />
                  <span>Subcategory of:</span>
                  <span className="text-slate-300 font-medium">{cat.parentCategory}</span>
                </div>
              )}
            </div>

            {/* Bottom Meta */}
            <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                <strong className="text-white">{cat.productCount}</strong> Products
                <span className="mx-2 text-slate-600">•</span>
                <strong className="text-slate-300">{cat.totalStockUnits.toLocaleString()}</strong> Units
              </span>
              <Link
                to={`/products?category=${cat.code}`}
                className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center"
              >
                Browse <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Storage Accessories"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Code / Prefix <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    required
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g. ACCS"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Parent Category (Optional)
                </label>
                <select
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="None">None (Root Category)</option>
                  {categories
                    .filter((c) => !editingCategory || c.id !== editingCategory.id)
                    .map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Summary of product types that belong in this group..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                  {editingCategory ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;