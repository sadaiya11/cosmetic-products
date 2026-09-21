import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, User, Search, Sparkles, LogOut } from 'lucide-react';
import { toggleCartDrawer } from '../store/slices/cartSlice';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 glass-effect border-b border-stone-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-amber-900/10 flex items-center justify-center text-amber-700 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-serif tracking-widest uppercase font-bold text-stone-900 block">
                AURORA
              </span>
              <span className="text-[10px] tracking-widest text-amber-700 uppercase block font-medium">
                Botanicals & Luxe
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-stone-700">
            <Link to="/" className="hover:text-amber-700 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="hover:text-amber-700 transition-colors">
              Shop All
            </Link>
            <Link to="/shop?category=skincare" className="hover:text-amber-700 transition-colors">
              Skincare
            </Link>
            <Link to="/shop?category=fragrance" className="hover:text-amber-700 transition-colors">
              Fragrance
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/shop" className="text-stone-700 hover:text-amber-700 transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            {/* User Account / Auth */}
            {user ? (
              <div className="flex items-center space-x-3 text-sm">
                <span className="font-medium text-stone-800 hidden sm:inline">
                  Hi, {user.name}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="text-stone-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-stone-700 hover:text-amber-700 transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={() => dispatch(toggleCartDrawer())}
              className="relative p-2 text-stone-800 hover:text-amber-700 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
