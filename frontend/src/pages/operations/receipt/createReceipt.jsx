import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  PackageCheck,
  FileText,
} from 'lucide-react';
import receiptService from '../../../services/receipt.service';
import productService from '../../../services/product.service';
import stockService from '../../../services/stock.service';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input, Select } from '../../../components/ui/FormControls';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ErrorAlert } from '../../../components/ui/Feedback';

export const CreateReceipt = () => {
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
        console.error('Failed to load dependencies:', err);
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
      setError('Please select a destination stock location.');
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
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Create Goods Receipt"
        subtitle="Log incoming purchase order delivery from vendor."
        breadcrumbs={[
          { label: 'Operations' },
          { label: 'Receipts', to: '/operations/receipts' },
          { label: 'New Receipt' },
        ]}
        action={
          <Link to="/operations/receipts">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Receipts
            </Button>
          </Link>
        }
      />

      <ErrorAlert message={error} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Document Header Card */}
        <Card>
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 mb-4 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Document Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Receipt Reference"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="REC-XXXXXX"
                className="font-mono text-xs"
              />
            </div>

            <div>
              <Input
                label="Supplier / Vendor"
                required
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="e.g. Apex Industrial Manufacturing"
              />
            </div>

            <div>
              <Input
                label="Expected Delivery Date"
                type="date"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>

            <div>
              <Select
                label="Destination Location"
                required
                value={destinationLocationId}
                onChange={(e) => setDestinationLocationId(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.warehouse ? `${loc.warehouse} — ` : ''}{loc.name} ({loc.code})
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        {/* Expected Line Items Table */}
        <div className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Receiving Product Lines
            </span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={handleAddItem}
            >
              Add Line
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 w-1/2">Product</th>
                  <th className="py-2.5 px-4 text-center w-36">Quantity</th>
                  <th className="py-2.5 px-4 text-center w-36">Unit Cost ($)</th>
                  <th className="py-2.5 px-4 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50">
                    <td className="py-2 px-4">
                      <select
                        required
                        value={item.productId}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-[6px] px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
                      >
                        <option value="">Select a product...</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.sku})
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-2 px-4 text-center">
                      <input
                        type="number"
                        min="1"
                        required
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        className="w-24 text-center bg-white border border-slate-300 rounded-[6px] py-1 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 mx-auto block"
                      />
                    </td>

                    <td className="py-2 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => handleCostChange(index, e.target.value)}
                        className="w-24 text-center bg-white border border-slate-300 rounded-[6px] py-1 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 mx-auto block"
                      />
                    </td>

                    <td className="py-2 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        disabled={items.length === 1}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-[4px] disabled:opacity-30 cursor-pointer"
                        title="Remove line"
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

        {/* Action Controls */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <Link to="/operations/receipts">
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
            Save Receipt Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateReceipt;