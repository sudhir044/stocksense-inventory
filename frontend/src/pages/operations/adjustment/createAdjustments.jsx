import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Save,
  SlidersHorizontal,
  ArrowLeft,
} from 'lucide-react';
import adjustmentService from '../../../services/adjustment.service';
import productService from '../../../services/product.service';
import stockService from '../../../services/stock.service';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ErrorAlert } from '../../../components/ui/Feedback';

export const CreateAdjustment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);

  // Form State
  const [reference, setReference] = useState(`ADJ-${Date.now().toString().slice(-6)}`);
  const [locationId, setLocationId] = useState('');
  const [reason, setReason] = useState('Damaged Goods');

  // Items State
  const [items, setItems] = useState([
    {
      productId: '',
      countedQuantity: 0,
    },
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodList, stockList] = await Promise.all([
          productService.getProducts(),
          stockService.getStock(),
        ]);
        setProducts(prodList || []);

        const locMap = new Map();
        (stockList || []).forEach((s) => {
          if (s.location_id && !locMap.has(s.location_id)) {
            locMap.set(s.location_id, {
              id: s.location_id,
              name: s.location_name,
              code: s.location_code,
              warehouse: s.warehouse_name,
            });
          }
        });
        const locArray = Array.from(locMap.values());
        setLocations(locArray);
        if (locArray.length > 0) {
          setLocationId(locArray[0].id);
        }

        if (prodList && prodList.length > 0) {
          setItems([
            {
              productId: prodList[0].id,
              countedQuantity: 0,
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to load products or locations:', err);
      }
    };
    loadData();
  }, []);

  const handleProductChange = (index, productId) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      productId,
    };
    setItems(updated);
  };

  const handleQuantityChange = (index, qty) => {
    const updated = [...items];
    updated[index].countedQuantity = parseInt(qty, 10) || 0;
    setItems(updated);
  };

  const handleAddItem = () => {
    const defaultProd = products[0];
    setItems([
      ...items,
      {
        productId: defaultProd ? defaultProd.id : '',
        countedQuantity: 0,
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!locationId) {
      setError('Please select a target location for the inventory count.');
      return;
    }

    if (!items.some((item) => item.productId)) {
      setError('Please select at least one valid product.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        reference: reference.trim(),
        locationId,
        reason: reason.trim() || 'Inventory Rebalance',
        items: items
          .filter((i) => i.productId)
          .map((i) => ({
            productId: i.productId,
            countedQuantity: Number(i.countedQuantity),
          })),
      };

      await adjustmentService.createAdjustment(payload);
      navigate('/operations/adjustments');
    } catch (err) {
      console.error('Failed to create adjustment:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create adjustment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="Create Stock Adjustment"
        subtitle="Record physical inventory count and generate variance adjustment order."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Adjustments', path: '/operations/adjustments' },
          { label: 'New Adjustment' },
        ]}
        action={
          <Link to="/operations/adjustments">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Adjustments
            </Button>
          </Link>
        }
      />

      <ErrorAlert message={error} onDismiss={() => setError(null)} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Document Header Card */}
        <div className="bg-white border border-slate-200 rounded-[8px] p-5 shadow-2xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Adjustment Parameters
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specify warehouse bin location and the audit reason.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Adjustment Reference *
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Location *
              </label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.warehouse ? `${loc.warehouse} — ` : ''}{loc.name} ({loc.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Audit Reason *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="Damaged Goods">Damaged Goods / Broken Stock</option>
                <option value="Annual Physical Count">Annual Physical Cycle Count</option>
                <option value="Shrinkage / Discrepancy">Shrinkage / Inventory Discrepancy</option>
                <option value="Quality Control Return">QC Return / Re-classification</option>
                <option value="Initial Inventory Ingestion">Initial Inventory Ingestion</option>
              </select>
            </div>
          </div>
        </div>

        {/* Line Items Card */}
        <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Physical Stock Count Rows</h3>
              <p className="text-xs text-slate-500 mt-0.5">Enter the exact verified physical count for each SKU.</p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="xs"
              icon={Plus}
              onClick={handleAddItem}
            >
              Add Item Row
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 w-12 text-center">#</th>
                  <th className="py-2.5 px-4">Product Catalog Item</th>
                  <th className="py-2.5 px-4 w-40 text-right">Physical Count (Qty)</th>
                  <th className="py-2.5 px-4 w-20 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 text-center font-mono text-xs text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (SKU: {p.sku})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <input
                        type="number"
                        min="0"
                        value={item.countedQuantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        className="w-full px-3 py-1.5 text-sm font-mono text-right bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        disabled={items.length === 1}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded disabled:opacity-30 transition-colors"
                        title="Remove row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Total lines: <strong className="text-slate-900">{items.length}</strong>
            </span>
            <div className="flex items-center space-x-2.5">
              <Link to="/operations/adjustments">
                <Button variant="secondary" size="sm">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Save}
                loading={loading}
              >
                Create Adjustment Order
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAdjustment;