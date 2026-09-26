import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Save,
  Truck,
  Calendar,
  Building,
  ArrowLeft,
} from 'lucide-react';
import deliveryService from '../../../services/delivery.service';
import productService from '../../../services/product.service';
import stockService from '../../../services/stock.service';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ErrorAlert } from '../../../components/ui/Feedback';

export const CreateDelivery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);

  // Form State
  const [reference, setReference] = useState(`DEL-${Date.now().toString().slice(-6)}`);
  const [customerName, setCustomerName] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceLocationId, setSourceLocationId] = useState('');

  // Items State
  const [items, setItems] = useState([
    {
      productId: '',
      quantity: 1,
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
          setSourceLocationId(locArray[0].id);
        }

        if (prodList && prodList.length > 0) {
          setItems([
            {
              productId: prodList[0].id,
              quantity: 1,
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
    updated[index].quantity = parseInt(qty, 10) || 1;
    setItems(updated);
  };

  const handleAddItem = () => {
    const defaultProd = products[0];
    setItems([
      ...items,
      {
        productId: defaultProd ? defaultProd.id : '',
        quantity: 1,
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

    if (!sourceLocationId) {
      setError('Please select a valid source warehouse location.');
      return;
    }

    if (!items.some((item) => item.productId)) {
      setError('Please add at least one valid product line.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        reference: reference.trim(),
        customerName: customerName.trim() || 'General Customer',
        sourceLocationId,
        scheduledDate: new Date(scheduledDate).toISOString(),
        items: items
          .filter((i) => i.productId)
          .map((i) => ({
            productId: i.productId,
            quantity: Number(i.quantity),
          })),
      };

      await deliveryService.createDelivery(payload);
      navigate('/operations/deliveries');
    } catch (err) {
      console.error('Failed to create delivery:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create delivery order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="Create Delivery Order"
        subtitle="Schedule customer shipment and prepare outbound warehouse pick list."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Deliveries', path: '/operations/deliveries' },
          { label: 'New Delivery' },
        ]}
        action={
          <Link to="/operations/deliveries">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Deliveries
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
              <Truck className="w-4 h-4 text-blue-600" />
              Delivery Document Details
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specify customer recipient, dispatch date, and fulfillment source.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Delivery Reference *
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
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Acme Corp / Retail Client"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Scheduled Date *
              </label>
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Source Location *
              </label>
              <select
                value={sourceLocationId}
                onChange={(e) => setSourceLocationId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-[6px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                {locations.length > 0 ? (
                  locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.warehouse ? `${loc.warehouse} — ` : ''}{loc.name} ({loc.code})
                    </option>
                  ))
                ) : (
                  <option value="">No locations available</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Line Items Card */}
        <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Line Items & Demand Quantities</h3>
              <p className="text-xs text-slate-500 mt-0.5">Select products to allocate and dispatch from stock.</p>
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
                  <th className="py-2.5 px-4 w-36 text-right">Quantity</th>
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
                            {p.name} (SKU: {p.sku}) — ${Number(p.cost_price || 0).toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
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
              <Link to="/operations/deliveries">
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
                Create Delivery Order
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDelivery;