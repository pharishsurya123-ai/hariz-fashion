import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onViewDetails: (product: Product) => void;
  key?: string | number;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    onAddToCart(product, size);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/50 shadow-sm hover:shadow-md transition-all relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setSelectedQuickSize(null);
      }}
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-stone-50 cursor-pointer"
        id={`product-card-image-${product.id}`}
      >
        {/* Secondary Image on Hover */}
        <img
          src={hovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105"
          referrerPolicy="no-referrer"
          id={`product-img-${product.id}`}
        />

        {/* Gender Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-stone-900 border border-stone-100 rounded">
          {product.gender}
        </span>

        {/* Out of stock cover */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-stone-950 text-white font-sans text-xs font-bold uppercase tracking-[0.25em] px-4 py-2">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick Add Overlay on Hover (Desktop) */}
        {product.inStock && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-end">
            <p className="text-[10px] font-mono text-stone-300 uppercase tracking-widest mb-2 text-center">
              Quick Add Size
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="bg-white hover:bg-stone-900 hover:text-white text-stone-950 text-[10px] font-bold h-7 px-2.5 rounded border border-stone-200 transition-colors focus:outline-none"
                  id={`quick-add-${product.id}-${size.toLowerCase()}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col" id={`product-info-${product.id}`}>
        {/* Rating and Category */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3 h-3 fill-amber-500" />
            <span className="text-[11px] font-bold text-stone-600 font-mono">{product.rating}</span>
          </div>
        </div>

        {/* Name */}
        <h3 
          onClick={() => onViewDetails(product)}
          className="font-sans text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors cursor-pointer line-clamp-1 hover:underline"
          id={`product-name-${product.id}`}
        >
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mt-2 flex items-center justify-between gap-2" id={`product-price-section-${product.id}`}>
          <span className="font-sans text-base font-bold text-stone-950">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="p-1.5 border border-stone-200 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-stone-950 transition-colors"
              title="View details"
              id={`view-details-btn-${product.id}`}
            >
              <Eye className="w-4 h-4" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add with the first size by default if quick action clicked
                handleQuickAdd(e, product.sizes[0]);
              }}
              disabled={!product.inStock}
              className={`p-1.5 rounded-lg transition-all border ${
                addedSuccess 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                  : 'border-stone-200 text-stone-800 hover:bg-stone-950 hover:text-white hover:border-stone-950'
              } disabled:opacity-50 disabled:pointer-events-none`}
              title="Quick Add First Size"
              id={`quick-add-btn-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback visual */}
        {addedSuccess && (
          <span className="text-[10px] text-emerald-600 font-medium text-center mt-2 animate-pulse">
            Added to bag successfully!
          </span>
        )}
      </div>
    </motion.div>
  );
}
