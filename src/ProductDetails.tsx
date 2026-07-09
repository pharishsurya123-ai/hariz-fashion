import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ChevronLeft, Star, ShoppingBag, CreditCard, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onBuyNow: (product: Product, size: string, quantity: number) => void;
  onBack: () => void;
}

export default function ProductDetails({ product, onAddToCart, onBuyNow, onBack }: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');
  const [isAdded, setIsAdded] = useState(false);

  // If the product changes, reset active image and selected size
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  const handleQtyChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <div className="bg-white min-h-screen py-10" id="product-details-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-stone-500 hover:text-stone-950 font-sans text-xs font-bold uppercase tracking-wider mb-8 transition-colors"
          id="product-details-back-btn"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Wardrobe
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: Image Gallery Column (5 cols or 6 cols) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4" id="gallery-wrapper">
            
            {/* Active Primary Image */}
            <div className="flex-1 aspect-[3/4] bg-stone-50 overflow-hidden rounded-xl border border-stone-200/50">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
                id="details-primary-image"
              />
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0" id="gallery-thumbnails">
              {product.images.map((img, idx) => {
                const isActive = activeImage === img;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 md:w-24 aspect-[3/4] rounded-lg overflow-hidden bg-stone-50 border shrink-0 transition-all ${
                      isActive ? 'border-stone-950 ring-1 ring-stone-950 scale-95' : 'border-stone-200 hover:border-stone-400'
                    }`}
                    id={`details-thumbnail-${idx}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover filter grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Product Information & Controls (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start" id="details-info-column">
            
            {/* Category and Rating */}
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
              <span className="text-[10px] text-stone-400 font-mono tracking-[0.3em] uppercase">
                {product.category} • {product.gender}
              </span>
              
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-stone-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-600 font-mono mt-0.5">{product.rating}</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-wider text-stone-950 mt-4 leading-tight" id="details-product-title">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="mt-4 flex items-baseline gap-4">
              <span className="font-sans text-2xl sm:text-3xl font-black text-stone-950" id="details-product-price">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-stone-400 text-xs font-mono">Inclusive of all local duties</span>
            </div>

            {/* Brand Status Indicator */}
            <div className="mt-3 flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 py-1.5 px-3 rounded-lg w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Premium stock available</span>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Select size</span>
                <button className="text-[10px] text-stone-400 hover:text-stone-950 underline font-mono uppercase tracking-widest">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5" id="details-size-picker">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 min-w-[48px] px-4 font-sans text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                        isSelected 
                          ? 'bg-stone-950 text-white border-stone-950 shadow' 
                          : 'bg-white text-stone-900 border-stone-200 hover:border-stone-400'
                      }`}
                      id={`details-size-${size.toLowerCase()}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Modifier */}
            <div className="mt-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block mb-3">
                QUANTITY
              </span>
              <div className="flex items-center border border-stone-200 rounded-lg w-fit bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => handleQtyChange('dec')}
                  className="px-4 py-2 text-stone-500 hover:text-stone-950 hover:bg-stone-50 transition-colors font-bold text-lg"
                  id="details-qty-decrease"
                >
                  −
                </button>
                <span className="px-5 font-mono font-bold text-stone-950 text-sm" id="details-qty-display">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQtyChange('inc')}
                  className="px-4 py-2 text-stone-500 hover:text-stone-950 hover:bg-stone-50 transition-colors font-bold text-lg"
                  id="details-qty-increase"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4" id="details-actions">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 inline-flex items-center justify-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-xl transition-all border ${
                  isAdded 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    : 'bg-white text-stone-950 border-stone-950 hover:bg-stone-50'
                }`}
                id="details-add-to-bag-btn"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 animate-scale" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 inline-flex items-center justify-center gap-3 bg-stone-950 hover:bg-stone-800 text-white py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md hover:shadow-lg"
                id="details-buy-now-btn"
              >
                <CreditCard className="w-4 h-4" />
                Buy It Now
              </button>
            </div>

            {/* Product Meta Tabs */}
            <div className="mt-10 border-t border-stone-100 pt-6" id="details-tabs-section">
              <div className="flex border-b border-stone-100 mb-4 gap-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === 'description' ? 'text-stone-950 border-b-2 border-stone-950' : 'text-stone-400 hover:text-stone-950'
                  }`}
                  id="details-tab-desc"
                >
                  The Design
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`pb-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === 'specifications' ? 'text-stone-950 border-b-2 border-stone-950' : 'text-stone-400 hover:text-stone-950'
                  }`}
                  id="details-tab-specs"
                >
                  Specifications
                </button>
              </div>

              {activeTab === 'description' ? (
                <p className="text-stone-600 text-xs leading-relaxed font-light font-sans" id="details-description-text">
                  {product.description}
                </p>
              ) : (
                <ul className="space-y-2 list-none p-0" id="details-specs-list">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-stone-600 text-xs font-light font-sans">
                      <span className="text-stone-900 font-bold shrink-0 mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-stone-100 pt-6 text-[10px] font-mono text-stone-500 uppercase tracking-wider text-center">
              <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50/50 rounded-lg">
                <Truck className="w-4 h-4 text-stone-800" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50/50 rounded-lg">
                <RotateCcw className="w-4 h-4 text-stone-800" />
                <span>14 Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50/50 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-stone-800" />
                <span>Secure Checkout</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
