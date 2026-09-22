import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProductInList } from '../store/slices/adminProductSlice';
import { X, Upload, Plus, Trash2, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { supabase } from '../config/supabase';

export default function ProductModal({ isOpen, onClose, editingProduct = null }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    sku: '',
    brand: 'SUGAR',
    categoryName: 'Cleanser',
    price: '',
    mrp: '',
    stock: '50',
    volume: '59ml',
    description: '',
    ingredients: '',
    isFeatured: true,
    images: [],
    variants: [
      { name: '59ml', price: '219', mrp: '299', stock: '50', sku: 'CET-59ML' },
      { name: '118ml', price: '415', mrp: '550', stock: '30', sku: 'CET-118ML' },
    ],
  });

  const [uploading, setUploading] = useState(false);
  const [imageInputUrl, setImageInputUrl] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        id: editingProduct.id,
        title: editingProduct.title || '',
        slug: editingProduct.slug || '',
        sku: editingProduct.sku || '',
        brand: editingProduct.brand || 'SUGAR',
        categoryName: editingProduct.category?.name || 'Skincare',
        price: editingProduct.price || '',
        mrp: editingProduct.mrp || '',
        stock: editingProduct.stock || '50',
        volume: editingProduct.volume || '50ml',
        description: editingProduct.description || '',
        ingredients: editingProduct.ingredients || '',
        isFeatured: editingProduct.isFeatured || false,
        images: editingProduct.images || [],
        variants: editingProduct.variants || [],
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        sku: '',
        brand: 'SUGAR',
        categoryName: 'Cleanser',
        price: '',
        mrp: '',
        stock: '50',
        volume: '59ml',
        description: '',
        ingredients: '',
        isFeatured: true,
        images: [],
        variants: [
          { name: '59ml', price: '219', mrp: '299', stock: '50', sku: 'CET-59ML' },
          { name: '118ml', price: '415', mrp: '550', stock: '30', sku: 'CET-118ML' },
        ],
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  // Auto-generate Slug & SKU as Title changes
  const handleTitleChange = (val) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const generatedSku = (val.substring(0, 3).toUpperCase() || 'PRD') + '-' + Math.floor(1000 + Math.random() * 9000);

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : generatedSlug,
      sku: prev.sku ? prev.sku : generatedSku,
    }));
  };

  // Calculate live discount percentage preview
  const sellingPrice = Number(formData.price) || 0;
  const originalMrp = Number(formData.mrp) || 0;
  const liveDiscount =
    originalMrp > sellingPrice ? Math.round(((originalMrp - sellingPrice) / originalMrp) * 100) : 0;

  // Handle Supabase File Upload
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImageUrls = [...formData.images];

    for (let file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const rawFileName = `img_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Upload directly to product-images bucket root
        let targetPath = rawFileName;
        let { data, error } = await supabase.storage
          .from('product-images')
          .upload(rawFileName, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (error) {
          console.error('Supabase Upload Error:', error);
          alert(`Supabase Storage Error: ${error.message}\n\nPlease ensure your bucket policy allows INSERT or is set to Public.`);
          const objectUrl = URL.createObjectURL(file);
          newImageUrls.push(objectUrl);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(targetPath);

          if (publicUrlData && publicUrlData.publicUrl) {
            newImageUrls.push(publicUrlData.publicUrl);
          }
        }
      } catch (err) {
        console.error('Upload catch error:', err);
        const objectUrl = URL.createObjectURL(file);
        newImageUrls.push(objectUrl);
      }
    }

    setFormData({ ...formData, images: newImageUrls });
    setUploading(false);
  };

  const handleAddImageUrl = () => {
    if (imageInputUrl.trim()) {
      setFormData({ ...formData, images: [...formData.images, imageInputUrl.trim()] });
      setImageInputUrl('');
    }
  };

  const handleRemoveImage = (idx) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== idx),
    });
  };

  // Variant Manager Handlers
  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { name: '236ml', price: '', mrp: '', stock: '20', sku: `SKU-${Date.now().toString().slice(-4)}` },
      ],
    });
  };

  const handleUpdateVariant = (idx, field, val) => {
    const updated = [...formData.variants];
    updated[idx][field] = val;
    setFormData({ ...formData, variants: updated });
  };

  const handleRemoveVariant = (idx) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productPayload = {
      id: formData.id || `prod-${Date.now()}`,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: formData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      brand: formData.brand,
      category: { name: formData.categoryName, slug: formData.categoryName.toLowerCase() },
      price: parseFloat(formData.price) || 0,
      mrp: parseFloat(formData.mrp) || parseFloat(formData.price) || 0,
      discountPercent: liveDiscount,
      stock: parseInt(formData.stock, 10) || 0,
      volume: formData.volume,
      description: formData.description,
      ingredients: formData.ingredients,
      isFeatured: formData.isFeatured,
      images:
        formData.images.length > 0
          ? formData.images
          : ['https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80'],
      variants: formData.variants,
    };

    if (formData.id) {
      dispatch(updateProductInList(productPayload));
    } else {
      dispatch(addProduct(productPayload));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl my-8 p-6 space-y-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 sticky top-0 bg-slate-900 z-10">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              {formData.id ? 'Edit Cosmetic Product' : 'Add New Cosmetic Product'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure product catalog fields, pricing, variants, and Supabase images
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Title & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Product Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 font-medium"
                placeholder="e.g. Cetaphil Gentle Skin Cleanser"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                placeholder="Cetaphil / SUGAR"
              />
            </div>
          </div>

          {/* Slug & SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1 flex items-center justify-between">
                <span>URL Slug</span>
                <span className="text-[10px] text-amber-400 font-normal">Auto-Generated</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                placeholder="cetaphil-gentle-skin-cleanser"
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1 flex items-center justify-between">
                <span>SKU (Stock Keeping Unit)</span>
                <span className="text-[10px] text-amber-400 font-normal">Barcode / Inventory</span>
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                placeholder="CET-59ML-001"
              />
            </div>
          </div>

          {/* Category, Selling Price, MRP & Live Discount */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Category
              </label>
              <select
                value={formData.categoryName}
                onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Skincare">Skincare</option>
                <option value="Cleanser">Cleanser</option>
                <option value="Fragrance">Fragrance</option>
                <option value="Moisturizer">Moisturizer</option>
                <option value="Lip Care">Lip Care</option>
              </select>
            </div>

            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Selling Price (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="1"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                placeholder="219"
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Original MRP (₹)
              </label>
              <input
                type="number"
                step="1"
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-400 font-medium focus:outline-none focus:border-amber-500"
                placeholder="299"
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Stock Units
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-500"
                  placeholder="50"
                />
                {liveDiscount > 0 && (
                  <span className="bg-teal-500/20 text-teal-300 font-extrabold px-2 py-1.5 rounded-lg border border-teal-500/30 text-[10px] shrink-0">
                    {liveDiscount}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Supabase Storage Image Uploader */}
          <div className="space-y-3 bg-slate-800/30 p-4 rounded-2xl border border-slate-800">
            <label className="block uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Product Images (Supabase Storage)</span>
              <span className="text-[10px] text-slate-400 font-normal">Supports .avif, .webp, .png, .jpg</span>
            </label>

            {/* Drag & Drop File Picker */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="flex-1 w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 border-2 border-dashed border-slate-700 hover:border-amber-500 p-4 rounded-2xl cursor-pointer transition-colors text-slate-300">
                <Upload className="w-5 h-5 text-amber-400" />
                <span className="font-bold">
                  {uploading ? 'Uploading to Supabase...' : 'Upload Image Files'}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*,.jpeg,.jpg,.png,.webp,.avif"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Direct Image URL input */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={imageInputUrl}
                  onChange={(e) => setImageInputUrl(e.target.value)}
                  placeholder="Or paste image URL"
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-3 py-2 rounded-xl text-xs"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Uploaded Images Preview Thumbnails */}
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {formData.images.map((imgUrl, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 group bg-slate-800">
                    <img src={imgUrl} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute inset-0 bg-slate-950/70 text-rose-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Size / Shade Variant Manager */}
          <div className="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="uppercase font-bold text-slate-400 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Product Variant Options (e.g., 59ml, 118ml, 236ml, 1Ltr)</span>
              </span>
              <button
                type="button"
                onClick={handleAddVariant}
                className="bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold px-3 py-1 rounded-xl text-[10px] uppercase tracking-wider flex items-center space-x-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Variant</span>
              </button>
            </div>

            {/* Variants Table */}
            <div className="space-y-2">
              {formData.variants.map((variant, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Variant (e.g. 59ml)"
                      value={variant.name}
                      onChange={(e) => handleUpdateVariant(idx, 'name', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-bold"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={variant.price}
                      onChange={(e) => handleUpdateVariant(idx, 'price', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-amber-400 font-bold"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="MRP (₹)"
                      value={variant.mrp}
                      onChange={(e) => handleUpdateVariant(idx, 'mrp', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-400 font-medium"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="SKU"
                      value={variant.sku}
                      onChange={(e) => handleUpdateVariant(idx, 'sku', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-300 text-[11px] font-mono"
                    />
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Ingredients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Usage Description
              </label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                placeholder="Product benefits, skin types, and directions..."
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1">
                Botanical Key Ingredients
              </label>
              <textarea
                rows="3"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                placeholder="e.g. Niacinamide, Panthenol, Hydrating Glycerin..."
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 w-4 h-4"
            />
            <label htmlFor="isFeatured" className="text-slate-300 font-bold cursor-pointer">
              Mark as Featured Product / Bestseller
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold uppercase tracking-wider shadow-lg flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Product to Database</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
