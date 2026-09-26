import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  PackageCheck,
  Building2,
  Warehouse,
  Calendar,
  FileText,
  Package,
  Hash,
  UserCheck,
} from 'lucide-react';

const CreateReceipt = () => {
  const navigate = useNavigate();

  // Receipt Form State
  const [sourcePO, setSourcePO] = useState('PO-2026-092');
  const [supplier, setSupplier] = useState('TechSupplies Inc.');
  const [scheduledDate, setScheduledDate] = useState('2026-09-28');
  const [destinationWarehouse, setDestinationWarehouse] = useState('Main Warehouse (WH-A)');
  const [receivingBay, setReceivingBay] = useState('Loading Dock 1');
  const [receivedBy, setReceivedBy] = useState('Alex Morgan');
  const [notes, setNotes] = useState('');

  // Sample catalog of products for receiving
  const availableProducts = [
    { id: 'p1', name: 'USB-C Docking Station', sku: 'DK-3310', currentStock: 80, unitCost: 65.0 },
    { id: 'p2', name: 'Noise Cancelling Headphones', sku: 'HP-9011', currentStock: 43, unitCost: 120.0 },
    { id: 'p3', name: '27" 4K Gaming Monitor', sku: 'MN-4K27', currentStock: 35, unitCost: 280.0 },
    { id: 'p4', name: 'Wireless Ergonomic Keyboard', sku: 'KB-8821', currentStock: 120, unitCost: 45.0 },
    { id: 'p5', name: 'Ergonomic Vertical Mouse', sku: 'MS-3310', currentStock: 200, unitCost: 25.0 },
  ];

  // Line Items State
  const [items, setItems] = useState([
    {
      productId: 'p1',
      productName: 'USB-C Docking Station',
      sku: 'DK-3310',
      expectedQty: 50,
    },
  ]);

  // Handle Product Selection Change
  const handleProductChange = (index, productId) => {
    const selectedProd = availableProducts.find((p) => p.id === productId);
    if (!selectedProd) return;

    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      productId: selectedProd.id,
      productName: selectedProd.name,
      sku: selectedProd.sku,
      expectedQty: 1,
    };
    setItems(updatedItems);
  };

  // Handle Quantity Change
  const handleQuantityChange = (index, qty) => {
    const updatedItems = [...items];
    updatedItems[index].expectedQty = parseInt(qty, 10) || 1;
    setItems(updatedItems);
  };

  // Add Line Item
  const handleAddItem = () => {
    const defaultProduct = availableProducts[0];
    setItems([
      ...items,
      {
        productId: defaultProduct.id,
        productName: defaultProduct.name,
        sku: defaultProduct.sku,
        expectedQty: 1,
      },
    ]);
  };

  // Remove Line Item
  const handleRemoveItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      sourcePO,
      supplier,
      scheduledDate,
      destinationWarehouse,
      receivingBay,
      receivedBy,
      notes,
      items,
    };
    console.log('Creating Goods Receipt:', payload);
    navigate('/operations/receipts');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
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
              Save Receipt Order
            </button>
          </div>
        </div>

        {/* Incoming Receipt Details */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <PackageCheck className="w-5 h-5 text-indigo-400 mr-2" />
            Receipt Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Purchase Order Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Hash className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Source PO Number
              </label>
              <input
                type="text"
                required
                value={sourcePO}
                onChange={(e) => setSourcePO(e.target.value)}
                placeholder="e.g. PO-2026-092"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Supplier Name
              </label>
              <input
                type="text"
                required
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="e.g. TechSupplies Inc."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Expected Arrival Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Expected Arrival Date
              </label>
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Destination Warehouse */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Warehouse className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Destination Warehouse
              </label>
              <select
                value={destinationWarehouse}
                onChange={(e) => setDestinationWarehouse(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Main Warehouse (WH-A)">Main Warehouse (WH-A)</option>
                <option value="Secondary Hub (WH-B)">Secondary Hub (WH-B)</option>
                <option value="Cold Storage (WH-C)">Cold Storage (WH-C)</option>
              </select>
            </div>

            {/* Receiving Dock / Bay */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Receiving Bay / Dock
              </label>
              <select
                value={receivingBay}
                onChange={(e) => setReceivingBay(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Loading Dock 1">Loading Dock 1</option>
                <option value="Loading Dock 2">Loading Dock 2</option>
                <option value="Bay B3 (Heavy Goods)">Bay B3 (Heavy Goods)</option>
              </select>
            </div>

            {/* Receiving Inspector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <UserCheck className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Assigned Inspector
              </label>
              <select
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Alex Morgan">Alex Morgan</option>
                <option value="John Doe">John Doe</option>
                <option value="Michael Scott">Michael Scott</option>
                <option value="Unassigned">Unassigned</option>
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
                  <th className="py-3.5 px-4 text-center w-44">Expected Quantity</th>
                  <th className="py-3.5 px-4 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                    {/* Product Selection */}
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

                    {/* Quantity Input */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.expectedQty}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
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

        {/* Additional Notes */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
            <FileText className="w-4 h-4 text-indigo-400 mr-2" />
            Receiving Remarks & Inspection Guidelines
          </label>
          <textarea
            rows="3"
            placeholder="Add quality check instructions or carrier notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CreateReceipt;