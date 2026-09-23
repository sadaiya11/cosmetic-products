import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProductInList } from '../store/slices/adminProductSlice';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Tag,
  Layers,
  CheckCircle2,
  Package,
  DollarSign,
  Image as ImageIcon,
  Sliders,
  Sparkles,
  Truck,
  Globe,
  Star,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { supabase } from '../config/supabase';

export default function ProductModal({ isOpen, onClose, editingProduct = null }) {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('basic');
  const [uploading, setUploading] = useState(false);
  const [imageInputUrl, setImageInputUrl] = useState('');

  const [formData, setFormData] = useState({
    // 1. Basic Info
    title: '',
    slug: '',
    sku: '',
    brand: 'Cosmetify',
    categoryName: 'Cleanser',
    subCategory: 'Face Wash',
    productType: 'Simple',
    shortDescription: '',
    fullDescription: '',

    // 2. Pricing & Tax
    price: '',
    mrp: '',
    taxGst: '18',
    costPrice: '',

    // 3. Media / Images
    mainImage: '',
    images: [],
    thumbnail: '',

    // 4. Inventory / Stock
    stock: '50',
    lowStockThreshold: '10',
    stockStatus: 'In Stock',
    allowBackorder: false,

    // 5. Variants
    variants: [
      { name: '59ml', price: '219', mrp: '299', stock: '50', sku: 'CET-59ML', weight: '80g', image: '' },
      { name: '118ml', price: '415', mrp: '550', stock: '30', sku: 'CET-118ML', weight: '150g', image: '' },
    ],

    // 6. Cosmetic Specifications
    skinType: 'All Skin Types',
    concern: 'Hydration & Cleansing',
    ingredients: '',
    benefits: '',
    howToUse: '',
    netQuantity: '59ml',
    fragrance: 'Fragrance-Free',
    countryOfOrigin: 'India',
    shelfLife: '24 Months',
    expiryDate: '',
    manufacturer: 'Cosmetify Skincare Pvt Ltd',
    manufacturedBy: 'Cosmetify Labs India',

    // 7. Shipping Information
    weight: '0.15',
    packageLength: '12',
    packageWidth: '6',
    packageHeight: '6',
    shippingClass: 'Standard Express',

    // 8. SEO Settings
    seoTitle: '',
    seoDescription: '',
    seoKeywords: 'hydrating cleanser, cetaphil face wash, sensitive skincare',

    // 9. Reviews & Ratings (Transactional List)
    reviews: [
      {
        id: 'rev-1',
        customerName: 'Ananya Sharma',
        customerEmail: 'ananya@example.com',
        rating: 5,
        reviewTitle: 'Best cleanser for sensitive skin!',
        reviewBody: 'Extremely gentle and hydrating. Does not strip skin moisture.',
        isVerifiedPurchase: true,
        createdAt: '2026-09-20',
      },
      {
        id: 'rev-2',
        customerName: 'Priya Patel',
        customerEmail: 'priya@example.com',
        rating: 4,
        reviewTitle: 'Great daily face wash',
        reviewBody: 'Dermatologist recommended, works well for dry skin in winters.',
        isVerifiedPurchase: true,
        createdAt: '2026-09-21',
      },
    ],

    isFeatured: true,
  });

  // Review Form State inside Tab 9
  const [newReview, setNewReview] = useState({
    customerName: '',
    rating: 5,
    reviewTitle: '',
    reviewBody: '',
    isVerifiedPurchase: true,
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        id: editingProduct.id,
        title: editingProduct.title || '',
        slug: editingProduct.slug || '',
        sku: editingProduct.sku || '',
        brand: editingProduct.brand || 'Cosmetify',
        categoryName: editingProduct.category?.name || 'Cleanser',
        subCategory: editingProduct.subCategory || 'Face Wash',
        productType: editingProduct.productType || 'Simple',
        shortDescription: editingProduct.shortDescription || '',
        fullDescription: editingProduct.description || editingProduct.fullDescription || '',

        price: editingProduct.price || '',
        mrp: editingProduct.mrp || '',
        taxGst: editingProduct.taxGst || '18',
        costPrice: editingProduct.costPrice || '',

        mainImage: editingProduct.images ? editingProduct.images[0] : '',
        images: editingProduct.images || [],
        thumbnail: editingProduct.thumbnail || (editingProduct.images ? editingProduct.images[0] : ''),

        stock: editingProduct.stock || '50',
        lowStockThreshold: editingProduct.lowStockThreshold || '10',
        stockStatus: editingProduct.stockStatus || 'In Stock',
        allowBackorder: editingProduct.allowBackorder || false,

        variants: editingProduct.variants || [],

        skinType: editingProduct.skinType || 'All Skin Types',
        concern: editingProduct.concern || 'Hydration',
        ingredients: editingProduct.ingredients || '',
        benefits: editingProduct.benefits || '',
        howToUse: editingProduct.howToUse || '',
        netQuantity: editingProduct.netQuantity || editingProduct.volume || '50ml',
        fragrance: editingProduct.fragrance || 'Fragrance-Free',
        countryOfOrigin: editingProduct.countryOfOrigin || 'India',
        shelfLife: editingProduct.shelfLife || '24 Months',
        expiryDate: editingProduct.expiryDate || '',
        manufacturer: editingProduct.manufacturer || 'Cosmetify Skincare Pvt Ltd',
        manufacturedBy: editingProduct.manufacturedBy || 'Cosmetify Labs India',

        weight: editingProduct.weight || '0.15',
        packageLength: editingProduct.packageLength || '12',
        packageWidth: editingProduct.packageWidth || '6',
        packageHeight: editingProduct.packageHeight || '6',
        shippingClass: editingProduct.shippingClass || 'Standard Express',

        seoTitle: editingProduct.seoTitle || editingProduct.title || '',
        seoDescription: editingProduct.seoDescription || editingProduct.shortDescription || '',
        seoKeywords: editingProduct.seoKeywords || '',

        reviews: editingProduct.reviews || [
          {
            id: 'rev-1',
            customerName: 'Ananya Sharma',
            rating: 5,
            reviewTitle: 'Best cleanser for sensitive skin!',
            reviewBody: 'Extremely gentle and hydrating.',
            isVerifiedPurchase: true,
            createdAt: '2026-09-20',
          },
        ],

        isFeatured: editingProduct.isFeatured || false,
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  // Auto-generate Slug, SKU & SEO title as Title changes
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
      seoTitle: prev.seoTitle ? prev.seoTitle : `${val} - Buy Online at Cosmetify`,
    }));
  };

  // Transactional Rating Calculation
  const totalReviews = formData.reviews ? formData.reviews.length : 0;
  const sumRatings = formData.reviews ? formData.reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) : 0;
  const calculatedAverageRating = totalReviews > 0 ? (sumRatings / totalReviews).toFixed(1) : '5.0';

  // Live discount percentage preview
  const sellingPrice = Number(formData.price) || 0;
  const originalMrp = Number(formData.mrp) || 0;
  const liveDiscount =
    originalMrp > sellingPrice ? Math.round(((originalMrp - sellingPrice) / originalMrp) * 100) : 0;

  // Supabase File Upload
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImageUrls = [...formData.images];

    for (let file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const rawFileName = `img_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const targetPath = `products/${rawFileName}`;

        const { data, error } = await supabase.storage
          .from('products-img')
          .upload(targetPath, file, {
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
            .from('products-img')
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

    setFormData({
      ...formData,
      images: newImageUrls,
      mainImage: formData.mainImage || newImageUrls[0],
      thumbnail: formData.thumbnail || newImageUrls[0],
    });
    setUploading(false);
  };

  const handleAddImageUrl = () => {
    if (imageInputUrl.trim()) {
      const updated = [...formData.images, imageInputUrl.trim()];
      setFormData({
        ...formData,
        images: updated,
        mainImage: formData.mainImage || updated[0],
        thumbnail: formData.thumbnail || updated[0],
      });
      setImageInputUrl('');
    }
  };

  const handleRemoveImage = (idx) => {
    const updated = formData.images.filter((_, i) => i !== idx);
    setFormData({
      ...formData,
      images: updated,
      mainImage: updated[0] || '',
      thumbnail: updated[0] || '',
    });
  };

  // Variant Manager Handlers
  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { name: '236ml', price: '', mrp: '', stock: '20', sku: `SKU-${Date.now().toString().slice(-4)}`, weight: '250g', image: '' },
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

  // Add Review Handler (Tab 9)
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.customerName || !newReview.reviewTitle) return;

    const created = {
      id: `rev-${Date.now()}`,
      customerName: newReview.customerName,
      rating: Number(newReview.rating),
      reviewTitle: newReview.reviewTitle,
      reviewBody: newReview.reviewBody,
      isVerifiedPurchase: newReview.isVerifiedPurchase,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setFormData({
      ...formData,
      reviews: [created, ...(formData.reviews || [])],
    });

    setNewReview({
      customerName: '',
      rating: 5,
      reviewTitle: '',
      reviewBody: '',
      isVerifiedPurchase: true,
    });
  };

  const handleRemoveReview = (idx) => {
    setFormData({
      ...formData,
      reviews: formData.reviews.filter((_, i) => i !== idx),
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
      subCategory: formData.subCategory,
      productType: formData.productType,

      price: parseFloat(formData.price) || 0,
      mrp: parseFloat(formData.mrp) || parseFloat(formData.price) || 0,
      discountPercent: liveDiscount,
      taxGst: parseFloat(formData.taxGst) || 18,
      costPrice: parseFloat(formData.costPrice) || 0,

      images:
        formData.images.length > 0
          ? formData.images
          : ['https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80'],
      mainImage: formData.mainImage || (formData.images && formData.images[0]),
      thumbnail: formData.thumbnail || (formData.images && formData.images[0]),

      stock: parseInt(formData.stock, 10) || 0,
      lowStockThreshold: parseInt(formData.lowStockThreshold, 10) || 10,
      stockStatus: formData.stockStatus,
      allowBackorder: formData.allowBackorder,

      variants: formData.variants,

      skinType: formData.skinType,
      concern: formData.concern,
      ingredients: formData.ingredients,
      benefits: formData.benefits,
      howToUse: formData.howToUse,
      netQuantity: formData.netQuantity,
      fragrance: formData.fragrance,
      countryOfOrigin: formData.countryOfOrigin,
      shelfLife: formData.shelfLife,
      expiryDate: formData.expiryDate,
      manufacturer: formData.manufacturer,
      manufacturedBy: formData.manufacturedBy,

      weight: formData.weight,
      packageLength: formData.packageLength,
      packageWidth: formData.packageWidth,
      packageHeight: formData.packageHeight,
      shippingClass: formData.shippingClass,

      seoTitle: formData.seoTitle,
      seoDescription: formData.seoDescription,
      seoKeywords: formData.seoKeywords,

      reviews: formData.reviews,
      rating: parseFloat(calculatedAverageRating),
      numReviews: totalReviews,

      description: formData.fullDescription || formData.shortDescription,
      isFeatured: formData.isFeatured,
    };

    if (formData.id) {
      dispatch(updateProductInList(productPayload));
    } else {
      dispatch(addProduct(productPayload));
    }
    onClose();
  };

  const TABS = [
    { id: 'basic', label: '1. Basic Info', icon: Package },
    { id: 'pricing', label: '2. Pricing & GST', icon: DollarSign },
    { id: 'media', label: '3. Media / Images', icon: ImageIcon },
    { id: 'inventory', label: '4. Inventory', icon: Sliders },
    { id: 'variants', label: '5. Variants', icon: Layers },
    { id: 'specs', label: '6. Cosmetic Specs', icon: Sparkles },
    { id: 'shipping', label: '7. Shipping', icon: Truck },
    { id: 'seo', label: '8. SEO Settings', icon: Globe },
    { id: 'reviews', label: '9. Reviews & Ratings', icon: Star },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl my-6 p-6 space-y-6 text-slate-100 shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 shrink-0">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              {formData.id ? 'Edit Cosmetic Product' : 'Add New Cosmetic Product'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Full control over basic info, pricing, media, stock, variants, cosmetic specs, shipping, SEO & reviews
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin shrink-0">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 space-y-6 text-xs scrollbar-thin">
          
          {/* TAB 1: BASIC PRODUCT INFORMATION */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
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
                    placeholder="e.g. Cetaphil Gentle Skin Cleanser For Normal, Dry Skin"
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
                    placeholder="Cosmetify / Cetaphil / SUGAR"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    URL Slug
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
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Product SKU Code
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

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Product Type
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Simple">Simple Product</option>
                    <option value="Variant-based">Variant-based (Multiple Sizes/Shades)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.categoryName}
                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 font-medium"
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
                    Sub-Category
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    placeholder="Face Wash / Night Serum"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-bold text-slate-400 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Hypoallergenic facial cleanser for sensitive skin..."
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-slate-400 mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows="4"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Dermatologist recommended formula with Niacinamide and Vitamin B5..."
                />
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & TAX */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-amber-400 font-extrabold text-base focus:outline-none focus:border-amber-500"
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
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-400 font-bold focus:outline-none focus:border-amber-500"
                    placeholder="299"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Live Discount Preview
                  </label>
                  <div className="h-10 bg-slate-800 border border-slate-700 rounded-xl px-3.5 flex items-center justify-between">
                    <span className="text-slate-400">Discount Rate:</span>
                    <span className="bg-teal-500/20 text-teal-300 font-extrabold px-3 py-1 rounded-lg border border-teal-500/30 text-xs">
                      {liveDiscount}% OFF
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    GST / Tax Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={formData.taxGst}
                    onChange={(e) => setFormData({ ...formData, taxGst: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 font-bold"
                    placeholder="18"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Cost Price / COGS (₹) <span className="text-slate-500 font-normal">(Optional for margin tracking)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-300 focus:outline-none focus:border-amber-500"
                    placeholder="120"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCT IMAGES (SUPABASE STORAGE) */}
          {activeTab === 'media' && (
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <label className="block uppercase font-bold text-slate-400 flex items-center justify-between">
                <span>Product Images (Supabase Storage: products-img/products/)</span>
                <span className="text-[10px] text-slate-400 font-normal">Supports .jpeg, .jpg, .png, .webp, .avif</span>
              </label>

              {/* Drag & Drop File Picker */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="flex-1 w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 border-2 border-dashed border-slate-700 hover:border-amber-500 p-5 rounded-2xl cursor-pointer transition-colors text-slate-300">
                  <Upload className="w-5 h-5 text-amber-400" />
                  <span className="font-bold">
                    {uploading ? 'Uploading to Supabase Storage...' : 'Upload Image Files'}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.jpeg,.jpg,.png,.webp,.avif"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

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
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Gallery Thumbnails List */}
              {formData.images.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase text-slate-400 block">Uploaded Gallery Images:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {formData.images.map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 group bg-slate-800">
                        <img src={imgUrl} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute inset-0 bg-slate-950/70 text-rose-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INVENTORY & STOCK */}
          {activeTab === 'inventory' && (
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Stock Quantity Units
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-amber-500"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Low Stock Alert Threshold
                  </label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Stock Status
                  </label>
                  <select
                    value={formData.stockStatus}
                    onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="On Backorder">On Backorder</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="allowBackorder"
                  checked={formData.allowBackorder}
                  onChange={(e) => setFormData({ ...formData, allowBackorder: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 w-4 h-4"
                />
                <label htmlFor="allowBackorder" className="text-slate-300 font-bold cursor-pointer">
                  Allow Backorders (Allow customers to buy when out of stock)
                </label>
              </div>
            </div>
          )}

          {/* TAB 5: VARIANTS MANAGER */}
          {activeTab === 'variants' && (
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="uppercase font-bold text-slate-300 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Product Variant Manager (Sizes / Shades / Packs)</span>
                </span>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider flex items-center space-x-1 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Variant</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.variants.map((variant, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <div className="col-span-3">
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Variant Name</label>
                      <input
                        type="text"
                        placeholder="e.g. 59ml"
                        value={variant.name}
                        onChange={(e) => handleUpdateVariant(idx, 'name', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-bold"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Price (₹)</label>
                      <input
                        type="number"
                        placeholder="219"
                        value={variant.price}
                        onChange={(e) => handleUpdateVariant(idx, 'price', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-amber-400 font-bold"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">MRP (₹)</label>
                      <input
                        type="number"
                        placeholder="299"
                        value={variant.mrp}
                        onChange={(e) => handleUpdateVariant(idx, 'mrp', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-400 font-medium"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">SKU Code</label>
                      <input
                        type="text"
                        placeholder="SKU"
                        value={variant.sku}
                        onChange={(e) => handleUpdateVariant(idx, 'sku', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-300 text-[11px] font-mono"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Stock</label>
                      <input
                        type="number"
                        placeholder="50"
                        value={variant.stock}
                        onChange={(e) => handleUpdateVariant(idx, 'stock', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-bold"
                      />
                    </div>
                    <div className="col-span-1 text-right pt-4">
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
          )}

          {/* TAB 6: COSMETIC SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Skin Type
                  </label>
                  <select
                    value={formData.skinType}
                    onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium"
                  >
                    <option value="All Skin Types">All Skin Types</option>
                    <option value="Sensitive Skin">Sensitive Skin</option>
                    <option value="Normal to Dry">Normal to Dry</option>
                    <option value="Oily & Acne-Prone">Oily & Acne-Prone</option>
                    <option value="Combination">Combination</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Beauty Concern
                  </label>
                  <input
                    type="text"
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    placeholder="Hydration, Acne, Anti-Aging"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Fragrance Type
                  </label>
                  <input
                    type="text"
                    value={formData.fragrance}
                    onChange={(e) => setFormData({ ...formData, fragrance: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    placeholder="Fragrance-Free / Rose / Sandalwood"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Net Quantity
                  </label>
                  <input
                    type="text"
                    value={formData.netQuantity}
                    onChange={(e) => setFormData({ ...formData, netQuantity: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                    placeholder="59ml / 100g"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Country of Origin
                  </label>
                  <input
                    type="text"
                    value={formData.countryOfOrigin}
                    onChange={(e) => setFormData({ ...formData, countryOfOrigin: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                    placeholder="India"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Shelf Life
                  </label>
                  <input
                    type="text"
                    value={formData.shelfLife}
                    onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    placeholder="24 Months"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-bold text-slate-400 mb-1">
                  Key Formulation Ingredients
                </label>
                <textarea
                  rows="2"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  placeholder="Water, Niacinamide, Panthenol, Hydrating Glycerin..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    How to Use (Directions)
                  </label>
                  <textarea
                    rows="2"
                    value={formData.howToUse}
                    onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                    placeholder="Apply to damp skin, massage gently, rinse with warm water..."
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Manufacturer & Marketer
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    placeholder="Cosmetify Skincare Pvt Ltd"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SHIPPING & PACKAGE DIMENSIONS */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Product Net Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                    placeholder="0.15"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Shipping Class / Handling
                  </label>
                  <select
                    value={formData.shippingClass}
                    onChange={(e) => setFormData({ ...formData, shippingClass: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                  >
                    <option value="Standard Express">Standard Express Delivery</option>
                    <option value="Fragile Glass">Fragile Glass Container (Extra Protection)</option>
                    <option value="Heavy Freight">Heavy Package Freight</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Package Length (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.packageLength}
                    onChange={(e) => setFormData({ ...formData, packageLength: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium"
                    placeholder="12"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Package Width (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.packageWidth}
                    onChange={(e) => setFormData({ ...formData, packageWidth: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium"
                    placeholder="6"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-slate-400 mb-1">
                    Package Height (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.packageHeight}
                    onChange={(e) => setFormData({ ...formData, packageHeight: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium"
                    placeholder="6"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SEARCH ENGINE OPTIMIZATION (SEO) */}
          {activeTab === 'seo' && (
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="uppercase font-bold text-slate-300 flex items-center space-x-1.5">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Google Search Result Snippet Preview</span>
                </span>
                <span className="text-[10px] text-amber-400 font-mono">
                  https://cosmetify.in/product/{formData.slug || 'product-slug'}
                </span>
              </div>

              {/* Google Snippet Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>https://cosmetify.in › product › {formData.slug || 'product-slug'}</span>
                </div>
                <h4 className="text-blue-400 text-sm font-medium hover:underline cursor-pointer">
                  {formData.seoTitle || formData.title || 'Product Meta Title'}
                </h4>
                <p className="text-slate-400 text-xs line-clamp-2">
                  {formData.seoDescription || formData.shortDescription || 'Product Meta Description snippet displayed on Google search results...'}
                </p>
              </div>

              <div>
                <label className="block uppercase font-bold text-slate-400 mb-1 flex items-center justify-between">
                  <span>SEO Meta Title</span>
                  <span className="text-[10px] text-slate-500">{formData.seoTitle.length} / 60 chars</span>
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Cetaphil Gentle Cleanser - Buy Online at Cosmetify India"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-slate-400 mb-1 flex items-center justify-between">
                  <span>SEO Meta Description</span>
                  <span className="text-[10px] text-slate-500">{formData.seoDescription.length} / 160 chars</span>
                </label>
                <textarea
                  rows="3"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Buy Cetaphil Gentle Cleanser online in India. Hypoallergenic, dermatologist-tested formula with Niacinamide & Vitamin B5..."
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-slate-400 mb-1">
                  SEO Target Keywords <span className="text-slate-500 font-normal">(Comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.seoKeywords}
                  onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                  placeholder="hydrating cleanser, cetaphil face wash, sensitive skincare, niacinamide cleanser"
                />
              </div>
            </div>
          )}

          {/* TAB 9: REVIEWS & RATINGS (TRANSACTIONAL SYSTEM) */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              
              {/* Dynamic Transactional Rating Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-800 p-4 rounded-2xl border border-slate-700 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-xl">
                    {calculatedAverageRating}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(parseFloat(calculatedAverageRating))
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                      <span className="text-white font-bold text-xs ml-1">({calculatedAverageRating} / 5)</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Computed transactionally from {totalReviews} verified customer reviews
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Verified Buyer Reviews</span>
                </div>
              </div>

              {/* Add Customer Review Form */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
                <span className="uppercase font-bold text-amber-400 text-xs block">
                  Add / Simulate Customer Review:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Customer Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ananya Sharma"
                      value={newReview.customerName}
                      onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Star Rating (1 - 5)</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold"
                    >
                      <option value={5}>5 Stars (⭐⭐⭐⭐⭐)</option>
                      <option value={4}>4 Stars (⭐⭐⭐⭐)</option>
                      <option value={3}>3 Stars (⭐⭐⭐)</option>
                      <option value={2}>2 Stars (⭐⭐)</option>
                      <option value={1}>1 Star (⭐)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Review Headline</label>
                    <input
                      type="text"
                      placeholder="e.g. Amazing for sensitive skin!"
                      value={newReview.reviewTitle}
                      onChange={(e) => setNewReview({ ...newReview, reviewTitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Review Body / Feedback</label>
                  <input
                    type="text"
                    placeholder="Full detailed review text..."
                    value={newReview.reviewBody}
                    onChange={(e) => setNewReview({ ...newReview, reviewBody: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 text-slate-300 font-medium cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={newReview.isVerifiedPurchase}
                      onChange={(e) => setNewReview({ ...newReview, isVerifiedPurchase: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                    />
                    <span>Mark as Verified Purchase</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleAddReview}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center space-x-1 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Review</span>
                  </button>
                </div>
              </div>

              {/* Existing Reviews List */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase text-slate-400 block">Existing Customer Reviews ({totalReviews}):</span>
                {formData.reviews && formData.reviews.length > 0 ? (
                  <div className="space-y-2.5">
                    {formData.reviews.map((rev, idx) => (
                      <div key={rev.id || idx} className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-xs">{rev.customerName}</span>
                            {rev.isVerifiedPurchase && (
                              <span className="bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full text-[9px] border border-emerald-500/30 flex items-center space-x-1">
                                <Check className="w-2.5 h-2.5" />
                                <span>Verified Buyer</span>
                              </span>
                            )}
                            <span className="text-slate-500 text-[10px]">{rev.createdAt}</span>
                          </div>

                          <div className="flex items-center space-x-1 text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                              />
                            ))}
                            <span className="text-white font-bold text-xs ml-1">{rev.reviewTitle}</span>
                          </div>

                          <p className="text-slate-300 text-xs font-normal leading-relaxed">{rev.reviewBody}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveReview(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors shrink-0"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-xs py-4 text-center border border-dashed border-slate-800 rounded-2xl">
                    No reviews submitted yet for this product.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Featured Bestseller Checkbox Toggle */}
          <div className="flex items-center space-x-2 pt-2 bg-slate-800/30 p-3 rounded-xl border border-slate-800">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 w-4 h-4"
            />
            <label htmlFor="isFeatured" className="text-slate-300 font-bold cursor-pointer">
              Mark as Bestseller / Featured Product on Storefront
            </label>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold uppercase tracking-wider shadow-lg flex items-center space-x-2 text-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Product to Catalog</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
