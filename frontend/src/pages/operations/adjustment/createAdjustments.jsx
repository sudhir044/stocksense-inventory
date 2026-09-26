import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  AlertCircle,
  Warehouse,
  Calendar,
  Package,
  Hash,
  SlidersHorizontal,
} from 'lucide-react';
import adjustmentService from '../../../services/adjustment.service';
import productService from '../../../services/product.service';
import stockService from '../../../services/stock.service';

const CreateAdjustment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);

  // Form Header State
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
              countedQuantity: 10,
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to load adjustment dependencies:', err);
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
      setError('Please select a stock location.');
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
        reason: reason.trim() || 'Physical Count Adjustment',
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
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => navigate('/operations/adjustments')}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Adjustments
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title and Form Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Create Stock Adjustment
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Audit physical quantities, write-offs, or correct discrepancy errors in location stock.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/operations/adjustments"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg border border-slate-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Adjustment
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Adjustment Details Card */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <SlidersHorizontal className="w-5 h-5 text-indigo-400 mr-2" />
            Adjustment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reference */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Hash className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Adjustment Ref *
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Adjustment Reason *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Damaged Goods">Damaged Goods</option>
                <option value="Annual Stock Audit">Annual Stock Audit</option>
                <option value="Cycle Count Discrepancy">Cycle Count Discrepancy</option>
                <option value="Theft or Loss">Theft or Loss</option>
                <option value="Supplier Mismatch">Supplier Mismatch</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Warehouse className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Stock Location *
              </label>
              <select
                required
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.warehouse ? `${loc.warehouse} — ` : ''}{loc.name} ({loc.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Package className="w-5 h-5 text-indigo-400 mr-2" />
              Counted Line Items
            </h2>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Product Line
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3.5 px-4 w-3/4">Product</th>
                  <th className="py-3.5 px-4 text-center w-40">Physical Counted Qty</th>
                  <th className="py-3.5 px-4 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3 px-4">
                      <select
                        required
                        value={item.productId}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="">Select a product</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.sku})
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        required
                        value={item.countedQuantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        className="w-full text-center bg-slate-900 border border-slate-700 rounded-lg py-1.5 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        disabled={items.length === 1}
                        className={`p-1.5 rounded-lg transition-colors ${
                          items.length === 1
                            ? 'text-slate-600 cursor-not-allowed'
                            : 'text-slate-400 hover:text-rose-400 hover:bg-slate-700/50'
                        }`}
                        title="Delete line"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAdjustment;