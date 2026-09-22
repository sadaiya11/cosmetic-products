import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    street: '123 Luxury Lane',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <CheckCircle className="w-16 h-16 text-amber-600 mx-auto mb-6" />
        <h1 className="font-serif text-3xl font-semibold text-stone-900 mb-3">
          Thank You for Your Order!
        </h1>
        <p className="text-stone-600 text-sm mb-8 leading-relaxed">
          Your order has been received and is being prepared with natural care. We will send you tracking updates shortly.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-amber-900 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider text-xs transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-semibold text-stone-900 mb-8">
        Checkout & Shipping
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif text-lg font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Shipping Address
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                required
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-900 hover:bg-amber-800 text-white font-bold py-4 rounded-xl uppercase tracking-wider text-xs transition-colors mt-6 shadow-md"
            >
              Place Order (₹{totalAmount.toLocaleString('en-IN')})
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 h-fit space-y-4">
          <h3 className="font-serif text-base font-semibold text-stone-900 border-b border-stone-200 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <span className="text-stone-700 font-medium">
                  {item.title} (x{item.quantity})
                </span>
                <span className="font-bold text-stone-900">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span className="text-amber-700 font-bold uppercase">Free</span>
            </div>
            <div className="flex justify-between text-stone-900 font-bold text-base pt-2 border-t border-stone-200">
              <span>Total</span>
              <span>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-stone-500 pt-4 border-t border-stone-200">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Encrypted 256-bit checkout SSL secure.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
