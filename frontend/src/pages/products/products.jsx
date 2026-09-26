import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Trash2,
  RefreshCw,
  Package,
} from 'lucide-react';
import productService from '../../services/product.service';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import { ErrorAlert, EmptyState, LoadingState } from '../../components/ui/Feedback';

export const Products = () => {
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
      setError(err.response?.data?.message || 'Failed to load products');
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

  const getProductStatus = (p) => {
    const stock = Number(p.total_stock ?? p.stock ?? 0);
    const min = Number(p.reorder_level ?? 0);
    if (stock <= 0) return 'Out of Stock';
    if (stock <= min) return 'Low Stock';
    return 'In Stock';
  };

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
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Products Catalog"
        subtitle="Manage master stock-keeping units, cost baselines, reorder limits, and status."
        action={
          <div className="flex items-center space-x-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={loading}
              onClick={fetchProducts}
            >
              Refresh
            </Button>
            <Link to="/products/create">
              <Button variant="primary" size="sm" icon={Plus}>
                Add Product
              </Button>
            </Link>
          </div>
        }
      />

      <ErrorAlert message={error} onRetry={fetchProducts} />


      <div className="bg-white border border-slate-200 rounded-[8px] p-3 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-2xs">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by SKU, product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-[6px] pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-[6px] px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer w-full sm:w-auto"
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


      <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">SKU</th>
                <th className="py-2.5 px-4">Product Name</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4 text-right">Cost Price</th>
                <th className="py-2.5 px-4 text-right">Reorder Level</th>
                <th className="py-2.5 px-4 text-right">Total Stock</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <LoadingState message="Loading catalog items from database..." />
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p) => {
                  const status = getProductStatus(p);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <Link
                          to={`/products/${p.id}`}
                          className="font-mono text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {p.sku}
                        </Link>
                      </td>
                      <td className="py-2.5 px-4">
                        <Link
                          to={`/products/${p.id}`}
                          className="font-medium text-slate-900 hover:text-blue-600 transition-colors block"
                        >
                          {p.name}
                        </Link>
                        {p.unit && <span className="text-[11px] text-slate-400">Unit: {p.unit}</span>}
                      </td>
                      <td className="py-2.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                        {p.category_name || <span className="text-slate-400 italic">Unassigned</span>}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-xs text-slate-900 whitespace-nowrap font-medium">
                        ${Number(p.cost_price || 0).toFixed(2)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-xs text-slate-500 whitespace-nowrap">
                        {p.reorder_level || 0}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-xs font-bold text-slate-900 whitespace-nowrap">
                        {Number(p.total_stock ?? 0)}
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <Badge size="sm">{status}</Badge>
                      </td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Link
                            to={`/products/${p.id}`}
                            className="p-1 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-[4px] transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            disabled={deletingId === p.id}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[4px] transition-colors disabled:opacity-50 cursor-pointer"
                            title="Deactivate Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-8">
                    <EmptyState
                      title="No products found"
                      description="No items match your search or filter criteria. Add a product to get started."
                      action={
                        <Link to="/products/create">
                          <Button variant="primary" size="sm" icon={Plus}>
                            Add First Product
                          </Button>
                        </Link>
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> of{' '}
            <strong className="text-slate-800">{products.length}</strong> catalog items
          </span>
          <span className="text-[11px] font-mono text-slate-400">Database: PostgreSQL</span>
        </div>
      </div>
    </div>
  );
};

export default Products;