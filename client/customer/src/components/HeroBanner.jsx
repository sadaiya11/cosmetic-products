import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative bg-stone-900 text-white overflow-hidden py-24 sm:py-32">
      {/* Background Image with Dark Glow Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Cosmetics Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Organic Botanical Elixirs</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight tracking-wide mb-6">
            Illuminate Your Natural <span className="italic font-light text-amber-300">Radiance.</span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg mb-8 leading-relaxed font-light">
            Discover clinical-grade botanical formulations crafted with bio-active plant concentrates to restore, hydrate, and rejuvenate your skin barrier.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/shop"
              className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-amber-500/25"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop?category=skincare"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center backdrop-blur-md transition-all border border-white/20"
            >
              Discover Serums
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
