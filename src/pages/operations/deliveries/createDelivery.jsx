import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Truck,
  Building,
  Calendar,
  FileText,
  Package,
  MapPin,
  UserCheck,
} from 'lucide-react';

const CreateDelivery = () => {
  const navigate = useNavigate();

  // Delivery Form State
  const [customer, setCustomer] = useState('Acme Corporation');
  const [deliveryAddress, setDeliveryAddress] = useState('123 Business Park, Building 4');
  const [scheduledDate, setScheduledDate] = useState('2026-09-27');
  const [sourceWarehouse, setSourceWarehouse] = useState('Main Warehouse (WH-A)');
  const [assignedDriver, setAssignedDriver] = useState('John Doe');
  const [notes, setNotes] = useState('');

  // Available stock mock database
  const availableProducts = [
    { id: 'p1', name: 'Wireless Ergonomic Keyboard', sku: 'KB-8821', inStock: 120, unitCost: 45.0 },
    { id: 'p2', name: '27" 4K Gaming Monitor', sku: 'MN-4K27', inStock: 35, unitCost: 280.0 },
    { id: 'p3', name: 'USB-C Docking Station', sku: 'DK-3310', inStock: 80, unitCost: 65.0 },
    { id: 'p4', name: 'Noise Cancelling Headphones', sku: 'HP-9011', inStock: 43, unitCost: 120.0 },
    { id: 'p5', name: 'Ergonomic Vertical Mouse', sku: 'MS-3310', inStock: 200, unitCost: 25.0 },
  ];

  // Delivery Items List State
  const [items, setItems] = useState([
    {
      productId: 'p2',
      productName: '27" 4K Gaming Monitor',
      sku: 'MN-4K27',
      inStock: 35,
      demandQty: 10,
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
      inStock: selectedProd.inStock,
      demandQty: 1,
    };
    setItems(updatedItems);
  };

  // Handle Ordered Quantity Change
  const handleQuantityChange = (index, qty) => {
    const updatedItems = [...items];
    updatedItems[index].demandQty = parseInt(qty, 10) || 1;
    setItems(updatedItems);
  };

  // Add Item Line
  const handleAddItem = () => {
    const defaultProduct = availableProducts[0];
    setItems([
      ...items,
      {
        productId: defaultProduct.id,
        productName: defaultProduct.name,
        sku: defaultProduct.sku,
        inStock: defaultProduct.inStock,
        demandQty: 1,
      },
    ]);
  };

  // Remove Item Line
  const handleRemoveItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      customer,
      deliveryAddress,
      scheduledDate,
      sourceWarehouse,
      assignedDriver,
      notes,
      items,
    };
    console.log('Creating Delivery Order:', payload);
    navigate('/operations/deliveries');
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
          Back to Deliveries
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title and Form Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Create Delivery Order
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Draft a new outgoing shipment order for customer fulfillment.
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
              Save Delivery Order
            </button>
          </div>
        </div>

        {/* Dispatch & Customer Information */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Truck className="w-5 h-5 text-indigo-400 mr-2" />
            Dispatch Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                required
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="e.g. Acme Corporation"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Scheduled Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Scheduled Dispatch Date
              </label>
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Source Warehouse */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Source Warehouse
              </label>
              <select
                value={sourceWarehouse}
                onChange={(e) => setSourceWarehouse(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Main Warehouse (WH-A)">Main Warehouse (WH-A)</option>
                <option value="Secondary Hub (WH-B)">Secondary Hub (WH-B)</option>
                <option value="Cold Storage (WH-C)">Cold Storage (WH-C)</option>
              </select>
            </div>

            {/* Delivery Address */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Delivery Address
              </label>
              <input
                type="text"
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Street address, city, zip code..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Driver/Carrier Assignment */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <UserCheck className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Assigned Driver / Carrier
              </label>
              <select
                value={assignedDriver}
                onChange={(e) => setAssignedDriver(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Unassigned">Unassigned</option>
                <option value="John Doe">John Doe (Internal Fleet)</option>
                <option value="Michael Scott">Michael Scott (Internal Fleet)</option>
                <option value="FedEx Express">FedEx Express</option>
                <option value="DHL Freight">DHL Freight</option>
              </select>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Package className="w-5 h-5 text-indigo-400 mr-2" />
              Products to Deliver
            </h2>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Item Row
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3.5 px-4 w-1/2">Product</th>
                  <th className="py-3.5 px-4 text-center">Available Stock</th>
                  <th className="py-3.5 px-4 text-center w-36">Demand Qty</th>
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

                    {/* Stock Available */}
                    <td className="py-3 px-4 text-center font-mono">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                          item.inStock >= item.demandQty
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {item.inStock} pcs
                      </span>
                    </td>

                    {/* Demand Quantity Input */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.demandQty}
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
            Special Shipping Instructions / Notes
          </label>
          <textarea
            rows="3"
            placeholder="Add delivery instructions or driver notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CreateDelivery;