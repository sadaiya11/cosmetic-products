import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { Filter, Search } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState(categoryParam);

  useEffect(() => {
    setSelectedCat(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProducts(data);
      })
      .catch(() => {});
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCat === 'all' ||
      (p.category && p.category.slug.toLowerCase() === selectedCat.toLowerCase());
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Shop Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-4xl text-stone-900 font-semibold mb-4">
          All Botanical Formulations
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Formulated with wild-harvested botanicals, pure seed oils, and bioactive plant concentrates designed for cellular vitality.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['all', 'skincare', 'cleanser', 'fragrance', 'moisturizer'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCat(cat);
                if (cat === 'all') searchParams.delete('category');
                else searchParams.set('category', cat);
                setSearchParams(searchParams);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedCat === cat
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-full pl-10 pr-4 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-2.5" />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <Filter className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-base font-medium">No products match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
