import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductFromList } from '../store/slices/adminProductSlice';
import ProductModal from '../components/ProductModal';
import { Plus, Trash2, Edit, Package, Layers, Tag } from 'lucide-react';

export default function ProductsManager() {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.adminProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">
            Cosmetic Products Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage product metadata, URL slugs, inventory SKUs, variants, and Supabase images
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Inventory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 uppercase font-semibold text-slate-400">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category & Brand</th>
                <th className="p-4">SKU Code</th>
                <th className="p-4">Price & MRP</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Variants</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => {
                const price = Number(p.price) || 0;
                const mrp = Number(p.mrp) || price;
                const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
                const skuCode = p.sku || `SKU-${p.id.substring(0, 6).toUpperCase()}`;

                return (
                  <tr key={p.id} className="hover:bg-slate-800/30">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                          <img
                            src={
                              p.images && p.images[0]
                                ? p.images[0]
                                : 'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=200&q=80'
                            }
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-white line-clamp-1">{p.title}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">
                            /{p.slug || p.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="text-white font-semibold block">{p.brand || 'SUGAR'}</span>
                      <span className="text-slate-400 text-[11px]">{p.category?.name || 'Cleanser'}</span>
                    </td>

                    <td className="p-4">
                      <span className="bg-slate-800 text-amber-300 font-mono text-[10px] font-bold px-2 py-1 rounded-md border border-slate-700">
                        {skuCode}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-baseline space-x-1.5">
                        <span className="font-bold text-amber-400 text-sm">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        {mrp > price && (
                          <span className="text-slate-500 line-through text-[11px]">
                            ₹{mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="text-teal-400 text-[10px] font-bold">
                            ({discount}%)
                          </span>
                        )}
                      </div>
                    </td>

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
                      <span className="inline-flex items-center space-x-1 bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-lg border border-slate-700">
                        <Layers className="w-3 h-3 text-amber-400" />
                        <span>{p.variants ? p.variants.length : 1} Sizes</span>
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => dispatch(deleteProductFromList(p.id))}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingProduct={editingProduct}
      />
    </div>
  );
}
