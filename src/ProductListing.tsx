import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../data';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductListingProps {
  products: Product[];
  initialCategory: string; // From home clicks
  genderFilter: 'all' | 'men' | 'women';
  searchQuery: string;
  onAddToCart: (product: Product, size: string) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductListing({
  products,
  initialCategory,
  genderFilter,
  searchQuery,
  onAddToCart,
  onViewDetails,
}: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women' | 'unisex'>(genderFilter);
  const [priceRange, setPriceRange] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync category if initialized from somewhere else (e.g., hero bento links)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [initialCategory]);

  // Sync gender filter if changed from header clicks
  useEffect(() => {
    setSelectedGender(genderFilter);
  }, [genderFilter]);

  const categories = [
    { label: 'All Garments', id: 'all' },
    { label: 'Shirts', id: 'shirts' },
    { label: 'T-Shirts', id: 't-shirts' },
    { label: 'Jeans', id: 'jeans' },
    { label: 'Shoes', id: 'shoes' },
    { label: 'Accessories', id: 'accessories' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Gender filter
      if (selectedGender !== 'all') {
        if (selectedGender === 'men') {
          // Men's filter allows men's items and unisex
          if (p.gender !== 'men' && p.gender !== 'unisex') return false;
        } else if (selectedGender === 'women') {
          // Women's filter allows women's items and unisex
          if (p.gender !== 'women' && p.gender !== 'unisex') return false;
        }
      }
      // Price range filter
      if (p.price > priceRange) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // default: featured or featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedGender, priceRange, sortBy, searchQuery]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
    setPriceRange(6000);
    setSortBy('featured');
  };

  return (
    <div className="bg-white min-h-screen py-10" id="product-listing-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Area */}
        <div className="border-b border-stone-100 pb-6 mb-8 flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-400">Hariz Atelier Collection</p>
            <h1 className="font-sans text-3xl font-black uppercase tracking-wider text-stone-950 mt-1">
              {selectedCategory === 'all' ? 'All Wardrobe Capsule' : `${selectedCategory}`}
            </h1>
            {searchQuery && (
              <p className="text-xs text-stone-500 mt-1 font-mono">
                Showing search coordinates for: "{searchQuery}"
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono uppercase text-stone-500">
            <span>{filteredProducts.length} Premium Articles</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2.5 pb-5 mb-8 no-scrollbar scroll-smooth" id="shop-category-tabs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2.5 px-6 font-sans text-[11px] font-bold uppercase tracking-widest rounded-lg border transition-all shrink-0 ${
                  isSelected 
                    ? 'bg-stone-950 text-white border-stone-950 shadow-sm' 
                    : 'bg-white text-stone-900 border-stone-200/80 hover:border-stone-400'
                }`}
                id={`cat-tab-${cat.id}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Filters Pane (3 cols) */}
          <aside className="lg:col-span-3 hidden lg:block" id="desktop-filters-sidebar">
            <div className="border border-stone-200/60 rounded-xl p-6 bg-stone-50/50 space-y-8 sticky top-28">
              
              <div className="flex justify-between items-center border-b border-stone-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-stone-900" />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-stone-950">Filters</span>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="text-[10px] text-stone-400 hover:text-stone-950 font-mono uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Gender Filter */}
              <div>
                <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-3.5">
                  GENDER FILTER
                </h4>
                <div className="space-y-2.5 text-xs text-stone-800">
                  {['all', 'men', 'women'].map((gender) => (
                    <label key={gender} className="flex items-center gap-3.5 cursor-pointer font-sans select-none" id={`filter-gender-${gender}`}>
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === gender}
                        onChange={() => setSelectedGender(gender as any)}
                        className="h-4 w-4 rounded border-stone-300 text-stone-950 focus:ring-stone-950 bg-white"
                      />
                      <span className="uppercase tracking-wider text-stone-600 hover:text-stone-950 font-medium">
                        {gender === 'all' ? 'All Genders' : gender}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Cap Slider */}
              <div>
                <div className="flex justify-between items-center mb-3.5">
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-stone-500">
                    PRICE CAP
                  </h4>
                  <span className="font-mono text-xs font-bold text-stone-900 bg-white border border-stone-200/60 px-2 py-0.5 rounded">
                    ₹{priceRange.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={800}
                  max={6000}
                  step={200}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-stone-950 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                  id="filter-price-slider"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1.5 uppercase">
                  <span>Min ₹800</span>
                  <span>Max ₹6000</span>
                </div>
              </div>

              {/* Sorting Filter */}
              <div>
                <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-3.5">
                  SORT ARTICLES
                </h4>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border border-stone-200/80 px-3 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-stone-950 bg-white font-sans text-stone-800"
                  id="filter-sort-select"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

            </div>
          </aside>

          {/* RIGHT COLUMN: Grid Area (9 cols) */}
          <main className="lg:col-span-9" id="shop-articles-grid-area">
            
            {/* Mobile Filters toggle bar */}
            <div className="flex lg:hidden justify-between items-center gap-4 bg-stone-50 border border-stone-200/60 p-4 rounded-xl mb-6">
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-stone-950"
                id="mobile-filters-toggle-btn"
              >
                <Filter className="w-4 h-4" />
                <span>Adjust filters</span>
              </button>
              
              <div className="flex items-center gap-1 font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{filteredProducts.length} items</span>
              </div>
            </div>

            {/* Collapsed Mobile Filters Box */}
            <AnimatePresence>
              {showFiltersMobile && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden bg-stone-50 border border-stone-200/60 rounded-xl p-5 space-y-6 mb-6 overflow-hidden"
                  id="mobile-filters-panel"
                >
                  {/* Gender */}
                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Gender</h4>
                    <div className="flex gap-4 flex-wrap">
                      {['all', 'men', 'women'].map((g) => (
                        <button
                          key={g}
                          onClick={() => setSelectedGender(g as any)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider ${
                            selectedGender === g 
                              ? 'bg-stone-950 text-white border-stone-950' 
                              : 'bg-white text-stone-850 border-stone-200'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-500">Max Price</h4>
                      <span className="font-mono text-xs font-bold text-stone-900">₹{priceRange.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={800}
                      max={6000}
                      step={200}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-stone-950"
                    />
                  </div>

                  {/* Sort */}
                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs bg-white"
                    >
                      <option value="featured">Featured First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-stone-200/60">
                    <button onClick={resetAllFilters} className="text-xs font-mono uppercase tracking-widest text-stone-400 py-2 px-3">
                      Reset
                    </button>
                    <button
                      onClick={() => setShowFiltersMobile(false)}
                      className="bg-stone-950 text-white text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-stone-50 rounded-2xl border border-stone-200/50 p-16 text-center shadow-inner" id="empty-results-stage">
                <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-4" />
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-800">
                  No matching wardrobe styles found
                </h3>
                <p className="text-xs text-stone-400 mt-2 max-w-[280px] mx-auto leading-relaxed">
                  Adjust your sliders, filter categories, or clear coordinates to explore other premium styles.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-6 bg-stone-950 hover:bg-stone-800 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-colors"
                  id="empty-results-reset-btn"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="shop-products-grid">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
