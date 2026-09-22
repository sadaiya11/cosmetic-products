import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/slices/adminProductSlice';
import { X } from 'lucide-react';

export default function ProductModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    categoryName: 'Skincare',
    volume: '50 ml',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProd = {
      id: `prod-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      category: { name: formData.categoryName },
      volume: formData.volume,
      isFeatured: formData.isFeatured,
      images: [formData.image],
    };

    dispatch(addProduct(newProd));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-6 text-slate-100 shadow-2xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h3 className="font-serif text-lg font-semibold text-white">
            Add New Product
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase font-bold text-slate-400 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              placeholder="e.g. Squalane Hydrating Mist"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                placeholder="49.00"
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Category
              </label>
              <select
                value={formData.categoryName}
                onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Skincare">Skincare</option>
                <option value="Cleanser">Cleanser</option>
                <option value="Fragrance">Fragrance</option>
                <option value="Moisturizer">Moisturizer</option>
              </select>
            </div>

            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Volume / Size
              </label>
              <input
                type="text"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                placeholder="50 ml"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-slate-400 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              placeholder="Product benefits and usage details..."
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
            />
            <label htmlFor="isFeatured" className="text-slate-300 cursor-pointer">
              Mark as Featured Product
            </label>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold uppercase tracking-wider shadow-md"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
