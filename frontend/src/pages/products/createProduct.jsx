import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Package } from 'lucide-react';
import productService from '../../services/product.service';
import categoryService from '../../services/category.service';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/FormControls';
import { PageHeader } from '../../components/ui/PageHeader';
import { ErrorAlert } from '../../components/ui/Feedback';

export const CreateProduct = () => {
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
        unit: formData.unit.trim() || 'pcs',
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
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Add New Product"
        subtitle="Create an SKU record in master inventory catalog."
        breadcrumbs={[
          { label: 'Products', to: '/products' },
          { label: 'New Product' },
        ]}
        action={
          <Link to="/products">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Catalog
            </Button>
          </Link>
        }
      />

      <ErrorAlert message={error} />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Product Name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Industrial Deep Groove Ball Bearing"
              />
            </div>

            <div>
              <Input
                label="SKU (Stock Keeping Unit)"
                name="sku"
                required
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. BRG-6205-ZZ"
                className="font-mono text-xs"
              />
            </div>

            <div>
              <Select
                label="Product Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Unassigned (General)</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Input
                label="Unit Cost Price ($)"
                name="costPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.costPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="font-mono"
              />
            </div>

            <div>
              <Input
                label="Unit of Measure"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="pcs, kg, box"
              />
            </div>

            <div>
              <Input
                label="Reorder Threshold"
                name="reorderLevel"
                type="number"
                min="0"
                value={formData.reorderLevel}
                onChange={handleChange}
                helperText="System triggers low stock alert when balance reaches this count."
                className="font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <Textarea
                label="Description & Specifications"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Technical specifications, dimensions, vendor parts references..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <Link to="/products">
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              loading={loading}
            >
              Save Product
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateProduct;