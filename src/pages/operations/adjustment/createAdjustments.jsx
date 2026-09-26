import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  AlertCircle,
  Building,
  Calendar,
  FileText,
  Package,
} from 'lucide-react';

const CreateAdjustment = () => {
  const navigate = useNavigate();

  // Form Header State
  const [warehouse, setWarehouse] = useState('Main Warehouse (WH-A)');
  const [reason, setReason] = useState('Damaged Goods');
  const [adjustmentDate, setAdjustmentDate] = useState('2026-09-26');
  const [notes, setNotes] = useState('');

  // Sample Product Options for Selection
  const availableProducts = [
    { id: 'p1', name: 'Wireless Ergonomic Keyboard', sku: 'KB-8821', currentStock: 120, unitCost: 45.0 },
    { id: 'p2', name: '27" 4K Gaming Monitor', sku: 'MN-4K27', currentStock: 35, unitCost: 280.0 },
    { id: 'p3', name: 'USB-C Docking Station', sku: 'DK-3310', currentStock: 80, unitCost: 65.0 },
    { id: 'p4', name: 'Noise Cancelling Headphones', sku: 'HP-9011', currentStock: 43, unitCost: 120.0 },
    { id: 'p5', name: 'Ergonomic Vertical Mouse', sku: 'MS-3310', currentStock: 200, unitCost: 25.0 },
  ];

  // Items State
  const [items, setItems] = useState([
    {
      productId: 'p4',
      productName: 'Noise Cancelling Headphones',
      sku: 'HP-9011',
      systemQty: 43,
      physicalQty: 41,
      variance: -2,
      unitCost: 120.0,
    },
  ]);

  // Handle Product Selection Change for a Specific Row
  const handleProductChange = (index, productId) => {
    const selectedProd = availableProducts.find((p) => p.id === productId);
    if (!selectedProd) return;

    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      productId: selectedProd.id,
      productName: selectedProd.name,
      sku: selectedProd.sku,
      systemQty: selectedProd.currentStock,
      physicalQty: selectedProd.currentStock, // Default physical count equals system count
      variance: 0,
      unitCost: selectedProd.unitCost,
    };
    setItems(updatedItems);
  };

  // Handle Physical Count Quantity Change
  const handlePhysicalQtyChange = (index, count) => {
    const updatedItems = [...items];
    const newPhysical = parseInt(count, 10) || 0;
    updatedItems[index].physicalQty = newPhysical;
    updatedItems[index].variance = newPhysical - updatedItems[index].systemQty;
    setItems(updatedItems);
  };

  // Add Row
  const handleAddItem = () => {
    const defaultProduct = availableProducts[0];
    setItems([
      ...items,
      {
        productId: defaultProduct.id,
        productName: defaultProduct.name,
        sku: defaultProduct.sku,
        systemQty: defaultProduct.currentStock,
        physicalQty: defaultProduct.currentStock,
        variance: 0,
        unitCost: defaultProduct.unitCost,
      },
    ]);
  };

  // Remove Row
  const handleRemoveItem = (index) => {
    if (items.length === 1) return; // Maintain at least one row
    setItems(items.filter((_, i) => i !== index));
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      warehouse,
      reason,
      adjustmentDate,
      notes,
      items,
    };
    console.log('Submitting Adjustment:', payload);
    // Redirect back to list after creation
    navigate('/operations/adjustment');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Adjustments
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Page Title & Save Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Create Inventory Adjustment
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Reconcile physical stock counts with system inventory.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg border border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Adjustment
            </button>
          </div>
        </div>

        {/* General Information Section */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Building className="w-5 h-5 text-indigo-400 mr-2" />
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Warehouse Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Warehouse Location
              </label>
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Main Warehouse (WH-A)">Main Warehouse (WH-A)</option>
                <option value="Secondary Hub (WH-B)">Secondary Hub (WH-B)</option>
                <option value="Cold Storage (WH-C)">Cold Storage (WH-C)</option>
              </select>
            </div>

            {/* Reason Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Reason Category
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Damaged Goods">Damaged Goods</option>
                <option value="Stock Audit / Recount">Stock Audit / Recount</option>
                <option value="Lost / Missing">Lost / Missing</option>
                <option value="Expired Item">Expired Item</option>
                <option value="Found Item">Found Item</option>
              </select>
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Adjustment Date
              </label>
              <input
                type="date"
                value={adjustmentDate}
                onChange={(e) => setAdjustmentDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Adjust Items Section */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Package className="w-5 h-5 text-indigo-400 mr-2" />
              Items to Adjust
            </h2>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Product Row
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3.5 px-4 w-1/3">Product</th>
                  <th className="py-3.5 px-4 text-center">System Stock</th>
                  <th className="py-3.5 px-4 text-center w-36">Physical Count</th>
                  <th className="py-3.5 px-4 text-center">Variance (Delta)</th>
                  <th className="py-3.5 px-4 text-right">Unit Cost Impact</th>
                  <th className="py-3.5 px-4 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                    {/* Product Select */}
                    <td className="py-3 px-4">
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        {availableProducts.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.sku})
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* System Stock */}
                    <td className="py-3 px-4 text-center font-mono text-slate-400">
                      {item.systemQty}
                    </td>

                    {/* Physical Count Input */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        value={item.physicalQty}
                        onChange={(e) => handlePhysicalQtyChange(index, e.target.value)}
                        className="w-full text-center bg-slate-900 border border-slate-700 rounded-lg py-1.5 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>

                    {/* Variance Display */}
                    <td className="py-3 px-4 text-center font-mono font-bold">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs ${
                          item.variance < 0
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : item.variance > 0
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {item.variance > 0 ? `+${item.variance}` : item.variance}
                      </span>
                    </td>

                    {/* Total Cost Impact */}
                    <td
                      className={`py-3 px-4 text-right font-mono font-bold ${
                        item.variance < 0 ? 'text-rose-400' : item.variance > 0 ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      ${(item.variance * item.unitCost).toFixed(2)}
                    </td>

                    {/* Remove Action */}
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
                        title="Delete row"
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

        {/* Remarks & Notes */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
            <FileText className="w-4 h-4 text-indigo-400 mr-2" />
            Notes & Remarks
          </label>
          <textarea
            rows="4"
            placeholder="Provide context or explanation for this adjustment..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CreateAdjustment;