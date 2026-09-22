import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import OffersBanner from '../components/OffersBanner';
import FlashSaleOffers from '../components/FlashSaleOffers';
import CampaignVideoSection from '../components/CampaignVideoSection';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { Sparkles, ShieldCheck, Leaf, RefreshCw, ArrowRight, Grid } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const CATEGORIES = [
  {
    id: 'cat-skincare',
    name: 'Skincare Serums',
    slug: 'skincare',
    subtitle: 'Bio-active elixirs & night oils',
    image: 'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-cleanser',
    name: 'Botanical Cleansers',
    slug: 'cleanser',
    subtitle: 'Nourishing oil-to-milk balms',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-fragrance',
    name: 'Artisanal Perfumes',
    slug: 'fragrance',
    subtitle: 'Mysore sandalwood & amber',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-moisturizer',
    name: 'Rich Moisturizers',
    slug: 'moisturizer',
    subtitle: 'Triple-weight hyaluronic creams',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAllProducts(data);
      })
      .catch(() => {});
  }, []);

  const displayedProducts = allProducts.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category && p.category.slug.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-16 pb-20">
      <HeroBanner />
      <OffersBanner />
      <FlashSaleOffers />
      <CampaignVideoSection />

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

      {/* Product Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest block mb-2">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-semibold">
              Explore By Product Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs uppercase font-bold tracking-widest text-amber-900 hover:text-amber-700 underline underline-offset-8 transition-colors flex items-center space-x-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 inline" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/shop?category=${cat.slug}`)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-stone-200"
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Backdrop Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent group-hover:from-stone-950/95 transition-all" />

              {/* Text Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end">
                <span className="text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-xl font-semibold mb-1 group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-stone-300 text-xs font-light line-clamp-1 mb-3">
                  {cat.subtitle}
                </p>
                <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products with Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest block mb-2">
              Signature Formulations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-semibold">
              Featured Products
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { label: 'All Products', value: 'all' },
              { label: 'Skincare', value: 'skincare' },
              { label: 'Cleansers', value: 'cleanser' },
              { label: 'Fragrance', value: 'fragrance' },
              { label: 'Moisturizers', value: 'moisturizer' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === tab.value
                    ? 'bg-amber-900 text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 text-stone-400">
            <Grid className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-base font-medium">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
