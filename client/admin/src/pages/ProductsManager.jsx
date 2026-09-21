import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductFromList } from '../store/slices/adminProductSlice';
import ProductModal from '../components/ProductModal';
import { Plus, Trash2, Edit, Package } from 'lucide-react';

export default function ProductsManager() {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.adminProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">
            Products Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, inspect, and update cosmetic product inventory
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 uppercase font-semibold text-slate-400">
              <tr>
                <th className="p-4">Product Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/30">
                  <td className="p-4 font-medium text-white flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400">
                      <Package className="w-4 h-4" />
                    </div>
                    <span>{p.title}</span>
                  </td>
                  <td className="p-4 text-slate-400">{p.category?.name || 'Skincare'}</td>
                  <td className="p-4 font-bold text-amber-400">${p.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.stock > 10
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-4">
                    {p.isFeatured ? (
                      <span className="text-amber-400 font-bold">Yes</span>
                    ) : (
                      <span className="text-slate-500">No</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => dispatch(deleteProductFromList(p.id))}
                      className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Product"
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

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
