import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import { getPriceDetails, getProductVariants } from '../data/mockProducts';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const { price, mrp, discountPercent } = getPriceDetails(product);
  const variants = getProductVariants(product);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const categoryName = product.category?.name || 'Skincare';

  const defaultImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80';

  const variantText = variants.length > 0 ? `${variants.length} Sizes` : (product.volume || '1 Size');

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Top Green BESTSELLER Tag */}
        <div className="px-4 pt-3 pb-1 flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-2 py-0.5 rounded">
            {product.isFeatured ? 'BESTSELLER' : 'FEATURED'}
          </span>
        </div>

        {/* Product Hero Image */}
        <div className="relative aspect-square overflow-hidden bg-white p-2">
          <img
            src={defaultImage}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-1.5 text-center">
          {/* Subtitle / Highlight */}
          <span className="text-[10px] font-extrabold uppercase text-pink-600 tracking-wider block">
            MOST REORDERED
          </span>

          {/* Product Title */}
          <h3 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-pink-600 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
            {product.title}
          </h3>

          {/* Pricing Display */}
          <div className="flex items-center justify-center space-x-2 pt-1">
            <span className="text-stone-950 font-black text-base">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {mrp > price && (
              <span className="text-stone-400 line-through text-xs font-medium">
                ₹{mrp.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-teal-600 font-extrabold text-xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Star Rating & Reviews Count */}
          <div className="flex items-center justify-center space-x-1 text-stone-700 text-xs pt-1">
            <div className="flex items-center space-x-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    s <= Math.round(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-stone-500 text-[11px] font-medium ml-1">
              ({product.numReviews || 12})
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Variant Size Indicator & Add to Bag */}
      <div className="px-4 pb-4 pt-2 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
        <span className="text-[11px] font-bold text-stone-500 bg-white border border-stone-200 px-2.5 py-1 rounded-lg">
          {variantText}
        </span>

        <button
          onClick={handleAddToCart}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
            added
              ? 'bg-emerald-700 text-white'
              : 'bg-pink-600 hover:bg-pink-700 text-white active:scale-95'
          }`}
          title="Add to Bag"
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

