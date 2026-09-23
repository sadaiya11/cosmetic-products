import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          <div>
            <div className="flex items-center space-x-2 text-amber-500 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-serif tracking-widest uppercase font-bold text-white text-lg">
                COSMETIFY
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              Pure botanical formulas designed for timeless elegance and luminous radiance. Organic, cruelty-free, and ethically sourced.
            </p>
          </div>

          <div>
            <h4 className="text-white font-serif uppercase tracking-wider text-sm font-semibold mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="/shop?category=skincare" className="hover:text-amber-400 transition-colors">Facial Serums</a></li>
              <li><a href="/shop?category=cleanser" className="hover:text-amber-400 transition-colors">Botanical Cleansers</a></li>
              <li><a href="/shop?category=moisturizer" className="hover:text-amber-400 transition-colors">Rich Hydrators</a></li>
              <li><a href="/shop?category=fragrance" className="hover:text-amber-400 transition-colors">Artisanal Perfumes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif uppercase tracking-wider text-sm font-semibold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Sustainability Commitment</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Ingredient Glossary</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif uppercase tracking-wider text-sm font-semibold mb-4">
              Newsletter
            </h4>
            <p className="text-stone-400 text-sm mb-4">
              Subscribe to receive exclusive beauty rituals and private access to new releases.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-stone-800 text-white text-sm px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500 w-full"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-xs uppercase font-bold tracking-wider rounded-r-md transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Cosmetify Beauty. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-4 md:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>for natural beauty.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
