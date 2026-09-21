import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { Star, Shield, RefreshCw, ShoppingBag, Plus, Minus, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) setProduct(data);
        else {
          const found = MOCK_PRODUCTS.find((p) => p.id === id);
          setProduct(found || MOCK_PRODUCTS[0]);
        }
      })
      .catch(() => {
        const found = MOCK_PRODUCTS.find((p) => p.id === id);
        setProduct(found || MOCK_PRODUCTS[0]);
      });
  }, [id]);

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-stone-500 hover:text-stone-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Collection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden shadow-lg border border-stone-200">
          <img
            src={
              product.images && product.images[0]
                ? product.images[0]
                : 'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80'
            }
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest block mb-2">
              {product.category?.name || 'Skincare Ritual'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-semibold mb-3">
              {product.title}
            </h1>
            <div className="flex items-center space-x-2 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-sm font-semibold text-stone-800">
                {product.rating || 5.0}
              </span>
              <span className="text-stone-400 text-xs">
                ({product.numReviews || 18} Verified Reviews)
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold text-stone-900">
            ${parseFloat(product.price).toFixed(2)}
          </div>

          <p className="text-stone-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Volume / Size */}
          {product.volume && (
            <div>
              <span className="text-xs uppercase font-semibold text-stone-400 block mb-2">
                Volume / Size
              </span>
              <span className="inline-block border border-amber-900 bg-amber-900/5 text-amber-900 px-4 py-1.5 rounded-lg text-xs font-bold">
                {product.volume}
              </span>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
              <h4 className="text-xs font-bold uppercase text-stone-700 tracking-wider mb-1">
                Botanical Key Ingredients
              </h4>
              <p className="text-xs text-stone-500 italic leading-normal">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Quantity Selector & Add to Cart */}
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex items-center border border-stone-300 rounded-xl bg-white p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-stone-600 hover:text-stone-900"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-stone-600 hover:text-stone-900"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-amber-900 hover:bg-amber-800 text-white font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
