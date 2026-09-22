import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents navigating to product details when clicking Add to Cart
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleCategoryClick = (e) => {
    e.stopPropagation(); // Prevents navigating to product details when clicking Category badge
    navigate(`/shop?category=${categorySlug}`);
  };

  const categoryName = product.category?.name || 'Skincare';
  const categorySlug = product.category?.slug || 'skincare';

  const defaultImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80';

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          <img
            src={defaultImage}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Badge - Clickable */}
          <button
            onClick={handleCategoryClick}
            className="absolute top-3 left-3 bg-stone-900/80 hover:bg-amber-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md transition-colors"
          >
            {categoryName}
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex items-center space-x-1 mb-2 text-amber-500">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-xs font-semibold text-stone-700">
              {product.rating || 5.0}
            </span>
            <span className="text-stone-400 text-xs font-normal">
              ({product.numReviews || 12})
            </span>
          </div>

          <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1 mb-1">
            {product.title}
          </h3>

          <p className="text-stone-500 text-xs line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Price & Visible Add to Cart Button */}
      <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-semibold text-stone-400 block">
            {product.volume || '50 ml'}
          </span>
          <span className="text-stone-900 font-bold text-lg">
            ${parseFloat(product.price).toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
            added
              ? 'bg-emerald-700 text-white'
              : 'bg-amber-900 hover:bg-amber-800 text-white active:scale-95'
          }`}
          title="Add to Cart"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
