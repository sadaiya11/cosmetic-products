import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ShoppingBag } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const defaultImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col justify-between">
      <div>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          <img
            src={defaultImage}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {product.isFeatured && (
            <span className="absolute top-3 left-3 bg-amber-900/90 text-amber-100 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md">
              Featured
            </span>
          )}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-amber-900 hover:text-white text-stone-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            title="Add to Cart"
          >
            <ShoppingBag className="w-5 h-5" />
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

          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1 mb-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-stone-500 text-xs line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-stone-50/80">
        <span className="text-xs uppercase font-medium tracking-wider text-amber-800">
          {product.volume || '50 ml'}
        </span>
        <span className="text-stone-900 font-bold text-lg">
          ${parseFloat(product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
