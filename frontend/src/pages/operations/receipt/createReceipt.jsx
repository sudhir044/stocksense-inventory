import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  PackageCheck,
  Building2,
  Warehouse,
  Calendar,
  Package,
  Hash,
  AlertCircle,
} from 'lucide-react';
import receiptService from '../../../services/receipt.service';
import productService from '../../../services/product.service';
import stockService from '../../../services/stock.service';

const CreateReceipt = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);

  // Form State
  const [reference, setReference] = useState(`REC-${Date.now().toString().slice(-6)}`);
  const [supplierName, setSupplierName] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [destinationLocationId, setDestinationLocationId] = useState('');

  // Line Items State
  const [items, setItems] = useState([
    {
      productId: '',
      quantity: 1,
      unitCost: 0,
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

        // Extract unique locations from stock records
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
          setDestinationLocationId(locArray[0].id);
        }

        if (prodList && prodList.length > 0) {
          setItems([
            {
              productId: prodList[0].id,
              quantity: 10,
              unitCost: Number(prodList[0].cost_price || 0),
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
    const selectedProd = products.find((p) => p.id === productId);
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      productId,
      unitCost: selectedProd ? Number(selectedProd.cost_price || 0) : 0,
    };
    setItems(updated);
  };

  const handleQuantityChange = (index, qty) => {
    const updated = [...items];
    updated[index].quantity = parseInt(qty, 10) || 1;
    setItems(updated);
  };

  const handleCostChange = (index, cost) => {
    const updated = [...items];
    updated[index].unitCost = parseFloat(cost) || 0;
    setItems(updated);
  };

  const handleAddItem = () => {
    const defaultProd = products[0];
    setItems([
      ...items,
      {
        productId: defaultProd ? defaultProd.id : '',
        quantity: 1,
        unitCost: defaultProd ? Number(defaultProd.cost_price || 0) : 0,
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

    if (!destinationLocationId) {
      setError('Please select a destination location.');
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
        supplierName: supplierName.trim() || 'General Supplier',
        destinationLocationId,
        scheduledDate: new Date(scheduledDate).toISOString(),
        items: items
          .filter((i) => i.productId)
          .map((i) => ({
            productId: i.productId,
            quantity: Number(i.quantity),
            unitCost: Number(i.unitCost),
          })),
      };

      await receiptService.createReceipt(payload);
      navigate('/operations/receipts');
    } catch (err) {
      console.error('Failed to create receipt:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create receipt');
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
          onClick={() => navigate('/operations/receipts')}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Receipts
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title and Form Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Create Goods Receipt
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Record a new incoming shipment order from supplier purchase orders.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/operations/receipts"
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
              Save Receipt Order
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

        {/* Incoming Receipt Details */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <PackageCheck className="w-5 h-5 text-indigo-400 mr-2" />
            Receipt Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reference */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Hash className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Receipt Reference *
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Supplier Name *
              </label>
              <input
                type="text"
                required
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="e.g. Apex Industrial Supplies"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Expected Arrival Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Scheduled Date *
              </label>
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Destination Location */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Warehouse className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Destination Location *
              </label>
              <select
                required
                value={destinationLocationId}
                onChange={(e) => setDestinationLocationId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {locations.length > 0 ? (
                  locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.warehouse ? `${loc.warehouse} — ` : ''}{loc.name} ({loc.code})
                    </option>
                  ))
                ) : (
                  <option value="">No locations detected. Create stock or warehouse locations first.</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Package className="w-5 h-5 text-indigo-400 mr-2" />
              Expected Stock Items
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
                  <th className="py-3.5 px-4 w-1/2">Product</th>
                  <th className="py-3.5 px-4 text-center w-36">Quantity</th>
                  <th className="py-3.5 px-4 text-center w-36">Unit Cost ($)</th>
                  <th className="py-3.5 px-4 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                    {/* Product Selection */}
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

                    {/* Quantity Input */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="1"
                        required
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        className="w-full text-center bg-slate-900 border border-slate-700 rounded-lg py-1.5 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>

                    {/* Unit Cost */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => handleCostChange(index, e.target.value)}
                        className="w-full text-center bg-slate-900 border border-slate-700 rounded-lg py-1.5 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>

                    {/* Delete Action */}
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

export default CreateReceipt;