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
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import productService from '../../services/product.service';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import { ErrorAlert, LoadingState } from '../../components/ui/Feedback';

export const ProductDetails = () => {
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
        console.error('Failed to fetch product:', err);
        setError(err.response?.data?.message || 'Product record not found');
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
    if (window.confirm(`Are you sure you want to deactivate SKU ${product.sku}?`)) {
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

  if (loading) {
    return <LoadingState message="Loading product record..." />;
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <ErrorAlert message={error || 'Product not found'} />
        <Link to="/products">
          <Button variant="secondary" size="sm" icon={ArrowLeft}>
            Back to Products Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const status = getStatus(product);

  return (
    <div className="space-y-6">
      <PageHeader
        title={product.name}
        subtitle={`SKU: ${product.sku}`}
        breadcrumbs={[
          { label: 'Products', to: '/products' },
          { label: product.sku },
        ]}
        action={
          <div className="flex items-center space-x-2.5">
            <Link to="/products">
              <Button variant="secondary" size="sm" icon={ArrowLeft}>
                Back
              </Button>
            </Link>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              loading={deleting}
              onClick={handleDelete}
            >
              Deactivate SKU
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-[6px] bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{product.name}</h3>
                  <span className="text-xs font-mono text-slate-500 font-semibold">{product.sku}</span>
                </div>
              </div>
              <Badge>{status}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="p-3 bg-slate-50 rounded-[6px] border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Category
                </span>
                <span className="text-sm font-medium text-slate-900 mt-1 block">
                  {product.category_name || 'Unassigned'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-[6px] border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Unit of Measure
                </span>
                <span className="text-sm font-medium text-slate-900 mt-1 block">
                  {product.unit || 'pcs'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                Technical Specifications & Notes
              </span>
              <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-[6px] border border-slate-200 leading-relaxed min-h-[80px]">
                {product.description || 'No description entered for this product item.'}
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column: Inventory Summary & Metadata */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 mb-4">
              Inventory Balance
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-[6px] border border-slate-200">
                <span className="text-xs text-slate-500">Unit Cost</span>
                <span className="text-base font-bold font-mono text-slate-900">
                  ${Number(product.cost_price || 0).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-[6px] border border-slate-200">
                <span className="text-xs text-slate-500">Total Stock</span>
                <span className="text-base font-bold font-mono text-blue-600">
                  {product.total_stock ?? 0} {product.unit || 'pcs'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-[6px] border border-slate-200">
                <span className="text-xs text-slate-500">Reorder Safety Level</span>
                <span className="text-sm font-medium font-mono text-amber-700">
                  {product.reorder_level || 0} {product.unit || 'pcs'}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 mb-3">
              System Audit
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Registered</span>
                <span className="text-slate-800 font-medium">
                  {product.created_at ? new Date(product.created_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Account Status</span>
                <Badge size="sm">{product.is_active ? 'Active' : 'Deactivated'}</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;