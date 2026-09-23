import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, getPriceDetails } from '../data/mockProducts';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Check,
  Search,
  Filter,
  X,
  Star,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');

  // Accordion Toggle States
  const [openSortBy, setOpenSortBy] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openCategory, setOpenCategory] = useState(true);
  const [openRating, setOpenRating] = useState(false);

  // Active Filter States
  const [sortBy, setSortBy] = useState('popularity'); // popularity, discount, name, rating, new, price-high, price-low
  const [selectedCategories, setSelectedCategories] = useState(
    categoryParam !== 'all' ? [categoryParam] : []
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedMinRating, setSelectedMinRating] = useState(0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mobile Filter Drawer State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam !== 'all') {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  // Reset page to 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, selectedCategories, selectedPriceRanges, selectedMinRating, searchTerm]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProducts(data);
      })
      .catch(() => {});
  }, []);

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    // 1. Search filter
    const matchesSearch =
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      (p.category && selectedCategories.includes(p.category.slug.toLowerCase()));

    // 3. Price Range filter
    const { price } = getPriceDetails(p);
    let matchesPrice = selectedPriceRanges.length === 0;
    if (selectedPriceRanges.length > 0) {
      matchesPrice = selectedPriceRanges.some((rangeKey) => {
        if (rangeKey === 'under-500') return price < 500;
        if (rangeKey === '500-999') return price >= 500 && price <= 999;
        if (rangeKey === '1000-1999') return price >= 1000 && price <= 1999;
        if (rangeKey === '2000-3999') return price >= 2000 && price <= 3999;
        if (rangeKey === '4000-above') return price >= 4000;
        return true;
      });
    }

    // 4. Rating filter
    const matchesRating = selectedMinRating === 0 || (p.rating || 5) >= selectedMinRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = getPriceDetails(a).price;
    const priceB = getPriceDetails(b).price;

    if (sortBy === 'popularity') return (b.numReviews || 0) - (a.numReviews || 0);
    if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'price-low') return priceA - priceB;
    return 0;
  });

  // Pagination Slice
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleCategory = (catSlug) => {
    setSelectedCategories((prev) =>
      prev.includes(catSlug) ? prev.filter((c) => c !== catSlug) : [...prev, catSlug]
    );
  };

  const handleTogglePriceRange = (rangeKey) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeKey) ? prev.filter((r) => r !== rangeKey) : [...prev, rangeKey]
    );
  };

  const handleResetFilters = () => {
    setSortBy('popularity');
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedMinRating(0);
    setSearchTerm('');
    setSearchParams({});
    setCurrentPage(1);
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedPriceRanges.length +
    (selectedMinRating > 0 ? 1 : 0) +
    (searchTerm ? 1 : 0);

  const SORT_OPTIONS = [
    { key: 'popularity', label: 'Popularity' },
    { key: 'discount', label: 'Discount' },
    { key: 'name', label: 'Name' },
    { key: 'rating', label: 'Customer Top Rated' },
    { key: 'new', label: 'New Arrivals' },
    { key: 'price-high', label: 'Price: High To Low' },
    { key: 'price-low', label: 'Price: Low To High' },
  ];

  const PRICE_RANGES = [
    { key: 'under-500', label: 'Rs. 100 - Rs. 499' },
    { key: '500-999', label: 'Rs. 500 - Rs. 999' },
    { key: '1000-1999', label: 'Rs. 1000 - Rs. 1999' },
    { key: '2000-3999', label: 'Rs. 2000 - Rs. 3999' },
    { key: '4000-above', label: 'Rs. 4000 & Above' },
  ];

  const CATEGORIES_LIST = [
    { slug: 'cleanser', name: 'Cleanser' },
    { slug: 'skincare', name: 'Skincare' },
    { slug: 'fragrance', name: 'Fragrance' },
    { slug: 'moisturizer', name: 'Moisturizer' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold">
            Shop Cosmetify Beauty
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Showing <span className="font-bold text-stone-900">{sortedProducts.length}</span> genuine cosmetics products
          </p>
        </div>

        {/* Right Search Input & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:border-pink-600 font-medium"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden bg-pink-600 text-white p-2 rounded-xl text-xs font-bold flex items-center space-x-1"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      {/* Main Container Layout: Left Sidebar Filters (1/4) + Right Products Grid (3/4) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT SIDEBAR FILTERS PANEL (NYKAA STYLE ACCORDION) */}
        {/* ========================================================================= */}
        <aside
          className={`md:col-span-4 lg:col-span-3 space-y-4 ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          {/* Active Filter Clear Header */}
          {activeFiltersCount > 0 && (
            <div className="bg-pink-50 border border-pink-200 p-3 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold text-pink-900 flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5 text-pink-600" />
                <span>{activeFiltersCount} Filters Active</span>
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-pink-600 hover:text-pink-800 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            </div>
          )}

          {/* 1. SORT BY ACCORDION */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenSortBy(!openSortBy)}
              className="w-full p-4 text-left font-bold text-sm text-stone-900 flex items-center justify-between hover:bg-stone-50 transition-colors"
            >
              <span>
                Sort By : <span className="text-pink-600 font-extrabold">{SORT_OPTIONS.find((s) => s.key === sortBy)?.label}</span>
              </span>
              {openSortBy ? (
                <ChevronUp className="w-4 h-4 text-pink-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {openSortBy && (
              <div className="p-4 pt-0 space-y-2.5 border-t border-stone-100">
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = sortBy === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setSortBy(opt.key)}
                      className="w-full flex items-center justify-between py-1.5 text-xs text-stone-700 hover:text-pink-600 transition-colors"
                    >
                      <span className={isSelected ? 'font-bold text-stone-900' : 'font-normal'}>
                        {opt.label}
                      </span>
                      {/* Pink Radio Circle matching Nykaa */}
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-pink-600 bg-pink-600'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. PRICE ACCORDION (MATCHING NYKAA SCREENSHOT) */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenPrice(!openPrice)}
              className="w-full p-4 text-left font-bold text-sm text-stone-900 flex items-center justify-between hover:bg-stone-50 transition-colors"
            >
              <span>Price</span>
              {openPrice ? (
                <ChevronUp className="w-4 h-4 text-stone-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {openPrice && (
              <div className="p-4 pt-0 space-y-3 border-t border-stone-100">
                {PRICE_RANGES.map((r) => {
                  const isChecked = selectedPriceRanges.includes(r.key);
                  // Calculate dynamic count for each price range
                  const count = products.filter((p) => {
                    const price = getPriceDetails(p).price;
                    if (r.key === 'under-500') return price < 500;
                    if (r.key === '500-999') return price >= 500 && price <= 999;
                    if (r.key === '1000-1999') return price >= 1000 && price <= 1999;
                    if (r.key === '2000-3999') return price >= 2000 && price <= 3999;
                    if (r.key === '4000-above') return price >= 4000;
                    return true;
                  }).length;

                  return (
                    <label
                      key={r.key}
                      onClick={() => handleTogglePriceRange(r.key)}
                      className="flex items-center justify-between text-xs text-stone-700 cursor-pointer group select-none"
                    >
                      <span className="font-medium group-hover:text-stone-900 flex items-center space-x-2">
                        <span>{r.label}</span>
                        <span className="text-[11px] text-stone-400 font-mono">({count})</span>
                      </span>

                      {/* Nykaa Checkbox */}
                      <div
                        className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                          isChecked
                            ? 'bg-pink-600 border-pink-600 text-white'
                            : 'border-stone-300 bg-white group-hover:border-stone-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. CATEGORY ACCORDION */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="w-full p-4 text-left font-bold text-sm text-stone-900 flex items-center justify-between hover:bg-stone-50 transition-colors"
            >
              <span>Category</span>
              {openCategory ? (
                <ChevronUp className="w-4 h-4 text-stone-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {openCategory && (
              <div className="p-4 pt-0 space-y-3 border-t border-stone-100">
                {CATEGORIES_LIST.map((cat) => {
                  const isChecked = selectedCategories.includes(cat.slug);
                  const count = products.filter(
                    (p) => p.category && p.category.slug.toLowerCase() === cat.slug
                  ).length;

                  return (
                    <label
                      key={cat.slug}
                      onClick={() => handleToggleCategory(cat.slug)}
                      className="flex items-center justify-between text-xs text-stone-700 cursor-pointer group select-none"
                    >
                      <span className="font-medium group-hover:text-stone-900 flex items-center space-x-2">
                        <span>{cat.name}</span>
                        <span className="text-[11px] text-stone-400 font-mono">({count})</span>
                      </span>

                      <div
                        className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                          isChecked
                            ? 'bg-pink-600 border-pink-600 text-white'
                            : 'border-stone-300 bg-white group-hover:border-stone-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. AVG CUSTOMER RATING ACCORDION */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenRating(!openRating)}
              className="w-full p-4 text-left font-bold text-sm text-stone-900 flex items-center justify-between hover:bg-stone-50 transition-colors"
            >
              <span>Avg Customer Rating</span>
              {openRating ? (
                <ChevronUp className="w-4 h-4 text-stone-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {openRating && (
              <div className="p-4 pt-0 space-y-2.5 border-t border-stone-100">
                {[4, 3, 2].map((minR) => (
                  <button
                    key={minR}
                    onClick={() => setSelectedMinRating(selectedMinRating === minR ? 0 : minR)}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-xl transition-colors ${
                      selectedMinRating === minR ? 'bg-amber-50 border border-amber-200 font-bold' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center space-x-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= minR ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                      <span className="text-stone-800 text-xs ml-1 font-bold">{minR}★ & Above</span>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedMinRating === minR ? 'border-pink-600 bg-pink-600' : 'border-stone-300'
                      }`}
                    >
                      {selectedMinRating === minR && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* RIGHT SIDE PRODUCTS DISPLAY GRID & PAGINATION */}
        {/* ========================================================================= */}
        <main className="md:col-span-8 lg:col-span-9 space-y-6">
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <Filter className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-bold text-stone-800 text-base">No Products Found</h3>
              <p className="text-stone-500 text-xs">
                No cosmetics matched your active filter selections. Try clearing your filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-stone-900 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-pink-600 transition-colors inline-block mt-2"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* -------------------------------------------------------------------------- */}
              {/* PAGINATION COMPONENT (EXACT MATCH TO PROMPT SCREENSHOT) */}
              {/* -------------------------------------------------------------------------- */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-8 pb-4 border-t border-stone-200/80 mt-8">
                  {/* Left Side: Page X of Y */}
                  <span className="text-stone-700 text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  {/* Right Side: Circular Navigation Buttons */}
                  <div className="flex items-center space-x-2">
                    {/* Previous Button: White Circle Shadow with Pink Left Chevron */}
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(1, prev - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-pink-600 hover:scale-105 disabled:opacity-40 disabled:shadow-none disabled:scale-100 transition-all border border-stone-100"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[3]" />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-pink-600 text-white shadow-md scale-105'
                              : 'text-stone-700 hover:text-pink-600 hover:bg-stone-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next Button: White Circle Shadow with Pink Right Chevron */}
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-pink-600 hover:scale-105 disabled:opacity-40 disabled:shadow-none disabled:scale-100 transition-all border border-stone-100"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

    </div>
  );
}
