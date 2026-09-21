import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { Sparkles, ShieldCheck, Leaf, RefreshCw } from 'lucide-react';

import { API_BASE_URL } from '../config/api';

export default function Home() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?featured=true`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProducts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-20 pb-20">
      <HeroBanner />

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-amber-900/5 p-8 rounded-3xl border border-amber-900/10">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-900/10 rounded-2xl text-amber-900">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900">100% Organic</h4>
              <p className="text-xs text-stone-500">Pure botanical cold-pressed extracts</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-900/10 rounded-2xl text-amber-900">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900">Dermatologist Tested</h4>
              <p className="text-xs text-stone-500">Formulated for sensitive skin types</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-900/10 rounded-2xl text-amber-900">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900">Cruelty-Free</h4>
              <p className="text-xs text-stone-500">Ethically sourced without animal testing</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-900/10 rounded-2xl text-amber-900">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900">Sustainable Glass</h4>
              <p className="text-xs text-stone-500">Recyclable luxury packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest block mb-2">
              Curated Essentials
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-semibold">
              Featured Botanical Formulations
            </h2>
          </div>
          <a
            href="/shop"
            className="mt-4 md:mt-0 text-xs uppercase font-bold tracking-widest text-amber-900 hover:text-amber-700 underline underline-offset-8 transition-colors"
          >
            View All Products &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
