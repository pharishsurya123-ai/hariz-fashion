import { motion } from 'motion/react';
import { ActiveView } from '../types';
import { Shirt, Footprints, ShieldAlert, Award, ArrowDown, ChevronRight } from 'lucide-react';

interface HeroProps {
  onShopClick: (view: ActiveView, initialCategory?: string) => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  const categories = [
    { name: 'Shirts', id: 'shirts', count: '12 Items', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80&fit=crop' },
    { name: 'T-Shirts', id: 't-shirts', count: '8 Items', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80&fit=crop' },
    { name: 'Jeans', id: 'jeans', count: '15 Items', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80&fit=crop' },
    { name: 'Shoes', id: 'shoes', count: '10 Items', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80&fit=crop' },
    { name: 'Accessories', id: 'accessories', count: '6 Items', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&fit=crop' },
  ];

  return (
    <div className="relative bg-white text-stone-900" id="hero-section">
      {/* Editorial Hero Banner */}
      <div className="relative h-[85vh] min-h-[500px] w-full bg-stone-950 flex items-center overflow-hidden">
        {/* Decorative Gradients & Image Overlay */}
        <div className="absolute inset-0 opacity-45 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&auto=format&fit=crop&q=80"
            alt="Hariz High Fashion Editorial Model"
            className="w-full h-full object-cover object-center scale-105 filter grayscale contrast-125"
            referrerPolicy="no-referrer"
            id="hero-bg-img"
          />
        </div>
        
        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent md:to-stone-950/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 mb-4"
              id="hero-badge"
            >
              <div className="h-[1px] w-8 bg-white/60" />
              <span className="font-sans text-xs tracking-[0.4em] text-stone-300 uppercase font-semibold">
                New Summer / Autumn '26
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]"
              id="hero-heading"
            >
              Upgrade <br />
              <span className="font-extrabold text-stone-100">Your Style</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-stone-300 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-md leading-relaxed"
              id="hero-description"
            >
              Discover the art of minimal luxury. Handcrafted pieces, premium Japanese raw fabrics, and clean monochrome silhouettes designed to stand the test of time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-4"
              id="hero-actions"
            >
              <button
                onClick={() => onShopClick('shop')}
                className="group relative inline-flex items-center gap-3 bg-white text-stone-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-stone-100 transition-all shadow-lg hover:shadow-xl"
                id="hero-shop-now-btn"
              >
                Shop Now
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onShopClick('about')}
                className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
                id="hero-about-btn"
              >
                Our Manifesto
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[9px] text-stone-400 font-mono tracking-[0.3em] uppercase">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 text-white animate-bounce" />
        </div>
      </div>

      {/* Brand Value Props */}
      <section className="bg-stone-50 border-b border-stone-100 py-10" id="brand-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border border-stone-100 rounded-lg shadow-sm text-stone-950 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-950">Ethically Made</h3>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  Every product is crafted with safe working conditions, fair wages, and natural high-grade materials.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border border-stone-100 rounded-lg shadow-sm text-stone-950 shrink-0">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-950">Japanese Fabrics</h3>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  We import direct premium selvedge denim and loopback jersey knit from Okayama & Wakayama, Japan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border border-stone-100 rounded-lg shadow-sm text-stone-950 shrink-0">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-950">Free Shipping & Returns</h3>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  Fast delivery across India on all orders, with a hassle-free 14-day premium monochrome return package.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Category Bento Section */}
      <section className="py-20 bg-white" id="category-bento">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-400">Curated Collections</p>
              <h2 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-wider text-stone-950 mt-1">
                Browse categories
              </h2>
            </div>
            <button 
              onClick={() => onShopClick('shop')} 
              className="text-stone-950 hover:text-stone-600 font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-1 group"
              id="browse-all-cats-btn"
            >
              View All Wardrobe
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, idx) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={cat.id}
                onClick={() => onShopClick('shop', cat.id)}
                className="relative h-72 rounded-xl overflow-hidden cursor-pointer group shadow-sm bg-stone-100 border border-stone-200/40"
                id={`category-card-${cat.id}`}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[9px] font-mono text-stone-300 uppercase tracking-widest">{cat.count}</span>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider mt-1 group-hover:underline">{cat.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
