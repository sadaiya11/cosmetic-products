import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { MOCK_PRODUCTS, getPriceDetails, getProductVariants } from '../data/mockProducts';
import {
  Star,
  Shield,
  RefreshCw,
  ShoppingBag,
  Plus,
  Minus,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Tag,
  Truck,
  CheckCircle2,
  Heart,
  Share2,
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Pincode Delivery State
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let currentProd = null;
        if (data && data.id) {
          currentProd = data;
        } else {
          const found = MOCK_PRODUCTS.find((p) => p.id === id);
          currentProd = found || MOCK_PRODUCTS[0];
        }
        setProduct(currentProd);
        const prodVariants = getProductVariants(currentProd);
        setVariants(prodVariants);
        setSelectedVariantIndex(0);
        setActiveImageIndex(0);
      })
      .catch(() => {
        const found = MOCK_PRODUCTS.find((p) => p.id === id);
        const fallbackProd = found || MOCK_PRODUCTS[0];
        setProduct(fallbackProd);
        const prodVariants = getProductVariants(fallbackProd);
        setVariants(prodVariants);
        setSelectedVariantIndex(0);
        setActiveImageIndex(0);
      });
  }, [id]);

  if (!product) return null;

  const currentVariant = variants[selectedVariantIndex] || {
    name: product.volume || 'Standard',
    price: product.price,
    mrp: product.mrp,
    discountPercent: product.discountPercent,
    images: product.images || [],
  };

  // Get current active variant price details
  const { price, mrp, discountPercent } = getPriceDetails(currentVariant);

  // Current active gallery images for selected variant
  const currentImages =
    currentVariant.images && currentVariant.images.length > 0
      ? currentVariant.images
      : product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80'];

  const mainImage = currentImages[activeImageIndex] || currentImages[0];

  const handleSelectVariant = (index) => {
    setSelectedVariantIndex(index);
    setActiveImageIndex(0); // Reset gallery preview image to first thumbnail of selected variant
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        title: `${product.title} (${currentVariant.name})`,
        price: currentVariant.price,
        volume: currentVariant.name,
        quantity,
      })
    );
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 6) {
      setDeliveryStatus({
        success: true,
        message: `Express Delivery Available to ${pincode}! Est. delivery in 2-3 Days.`,
      });
    } else {
      setDeliveryStatus({
        success: false,
        message: 'Please enter a valid 6-digit Pincode.',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-stone-500 hover:text-stone-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Collection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Product Image Gallery with Vertical Carousel Strip */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-start">
          
          {/* Vertical Thumbnail Carousel Strip */}
          <div className="flex sm:flex-col items-center gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] w-full sm:w-20 shrink-0 pb-2 sm:pb-0 scrollbar-thin">
            {currentImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-stone-50 ${
                  activeImageIndex === idx
                    ? 'border-pink-600 ring-2 ring-pink-500/20 scale-105 shadow-md'
                    : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Hero Product Image Display */}
          <div className="relative flex-1 aspect-square bg-stone-100 rounded-3xl overflow-hidden shadow-lg border border-stone-200 group w-full">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />

            {/* Top Right Action Icons (Wishlist & Share) */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
              <button className="p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-pink-600 hover:text-white text-stone-700 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-stone-900 hover:text-white text-stone-700 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bestseller Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-pink-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                #1 BESTSELLER
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details, Variant Selection & Order Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Title & Rating Summary */}
          <div>
            <span className="text-pink-600 text-xs font-bold uppercase tracking-widest block mb-1">
              {product.category?.name || 'Skincare Ritual'}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-semibold leading-snug">
              {product.title}
            </h1>
            <p className="text-stone-500 text-xs font-medium mt-1">
              ({currentVariant.name})
            </p>

            <div className="flex items-center space-x-3 mt-3">
              <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg text-amber-900">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="text-xs font-extrabold">{product.rating || 4.8} / 5</span>
              </div>
              <span className="text-stone-400 text-xs">
                {product.numReviews || 433484} ratings & 15687 reviews
              </span>
            </div>
          </div>

          {/* Pricing Display matching Nykaa */}
          <div className="flex items-baseline space-x-3 flex-wrap bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <span className="text-3xl font-black text-stone-950">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {mrp > price && (
              <span className="text-xl text-stone-400 line-through font-medium">
                ₹{mrp.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-base font-extrabold text-teal-600">
                {discountPercent}% OFF
              </span>
            )}
            <span className="text-[11px] text-stone-500 block w-full mt-1 font-medium">
              Inclusive of all taxes
            </span>
          </div>

          {/* Coupon Offers Card */}
          <div className="bg-pink-50/60 border border-pink-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-pink-600 text-white rounded-xl">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Collect Multiple Coupons</h4>
                <p className="text-[11px] text-pink-700 font-medium">
                  Extra 15% Off upto ₹300 on prepaid orders.
                </p>
              </div>
            </div>
            <span className="bg-white border border-pink-300 text-pink-600 font-extrabold px-3 py-1 rounded-lg text-xs tracking-wider">
              NEW15
            </span>
          </div>

          {/* Dynamic Variant Selector Pills matching Nykaa */}
          {variants.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-stone-800">
                  Select Size / Variant: <span className="text-pink-600 font-bold">{currentVariant.name}</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {variants.map((variant, idx) => (
                  <button
                    key={variant.id || idx}
                    onClick={() => handleSelectVariant(idx)}
                    className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 border ${
                      selectedVariantIndex === idx
                        ? 'bg-stone-950 text-white border-stone-950 shadow-md scale-105 ring-2 ring-stone-950/20'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-stone-950 hover:bg-stone-50'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Add to Bag */}
          <div className="flex items-center space-x-4 pt-2">
            <div className="flex items-center border border-stone-300 rounded-2xl bg-white p-1 shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-extrabold text-stone-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-pink-600 hover:bg-pink-700 active:scale-[0.99] text-white font-extrabold py-4 px-6 rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-pink-600/30"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>
          </div>

          {/* Pincode Delivery Options Checker */}
          <div className="border border-stone-200 rounded-2xl p-4 bg-white space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-800">
              <Truck className="w-4 h-4 text-pink-600" />
              <span>Delivery Options</span>
            </div>

            <form onSubmit={handleCheckPincode} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:border-pink-600 font-medium"
              />
              <button
                type="submit"
                className="bg-stone-900 hover:bg-pink-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Check
              </button>
            </form>

            {deliveryStatus && (
              <p
                className={`text-xs font-semibold flex items-center space-x-1.5 ${
                  deliveryStatus.success ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {deliveryStatus.success && <CheckCircle2 className="w-4 h-4 inline shrink-0" />}
                <span>{deliveryStatus.message}</span>
              </p>
            )}
          </div>

          {/* Product Description & Ingredients */}
          <div className="space-y-4 pt-2 border-t border-stone-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                Product Description
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            {product.ingredients && (
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                <h4 className="text-xs font-bold uppercase text-stone-700 tracking-wider mb-1">
                  Key Formulation Ingredients
                </h4>
                <p className="text-xs text-stone-500 italic leading-normal">
                  {product.ingredients}
                </p>
              </div>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-200 text-center">
            <div className="p-3 bg-stone-50 rounded-xl">
              <Shield className="w-5 h-5 mx-auto text-pink-600 mb-1" />
              <span className="text-[10px] font-bold text-stone-700 block">100% Genuine</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl">
              <RefreshCw className="w-5 h-5 mx-auto text-pink-600 mb-1" />
              <span className="text-[10px] font-bold text-stone-700 block">Easy Return</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl">
              <Truck className="w-5 h-5 mx-auto text-pink-600 mb-1" />
              <span className="text-[10px] font-bold text-stone-700 block">Free Express Shipping</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
