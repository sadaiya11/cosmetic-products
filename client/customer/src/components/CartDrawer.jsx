import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import {
  toggleCartDrawer,
  removeFromCart,
  updateQuantity,
} from '../store/slices/cartSlice';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isDrawerOpen } = useSelector((state) => state.cart);

  if (!isDrawerOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(toggleCartDrawer());
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(toggleCartDrawer())}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-stone-900">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="font-serif text-lg font-semibold uppercase tracking-wider">
                Shopping Cart ({items.length})
              </h2>
            </div>
            <button
              onClick={() => dispatch(toggleCartDrawer())}
              className="text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 stroke-1" />
                <p className="text-base font-medium">Your cart is empty</p>
                <p className="text-xs mt-1">Explore our luxury skincare rituals.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-4 border-b border-stone-100 pb-4"
                >
                  <img
                    src={
                      item.images && item.images[0]
                        ? item.images[0]
                        : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80'
                    }
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl bg-stone-100 border border-stone-200"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-stone-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-amber-800 font-bold text-sm mt-0.5">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-600">Subtotal</span>
                <span className="text-xl font-bold text-stone-900">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-stone-400 text-xs text-center">
                Taxes and shipping calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-amber-900 hover:bg-amber-800 text-white font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider text-xs transition-colors shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
