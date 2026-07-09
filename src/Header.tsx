import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, ShoppingBag, Menu, X, ArrowRight, UserCheck } from 'lucide-react';
import { ActiveView } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cartItemsCount: number;
  onCartOpen: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAccountOpen: () => void;
  userEmail?: string;
}

export default function Header({
  activeView,
  setActiveView,
  cartItemsCount,
  onCartOpen,
  searchQuery,
  setSearchQuery,
  onAccountOpen,
  userEmail,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const navItems: { label: string; view: ActiveView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop All', view: 'shop' },
    { label: 'Men', view: 'men' },
    { label: 'Women', view: 'women' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100 shadow-sm" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-stone-900 p-2 focus:outline-none"
              aria-label="Open menu"
              id="mobile-menu-btn"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <button
              onClick={() => handleNavClick('home')}
              className="flex flex-col items-center md:items-start group focus:outline-none"
              id="logo-button"
            >
              <span className="font-sans text-xl sm:text-2xl font-black tracking-[0.25em] text-stone-950 uppercase group-hover:text-stone-700 transition-colors">
                HARIZ
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] font-medium tracking-[0.55em] text-stone-500 uppercase -mt-1 pl-[0.2em]">
                FASHION
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12">
            {navItems.map((item) => {
              // Highlight based on current view matching
              const isActive = 
                activeView === item.view || 
                (item.view === 'shop' && activeView === 'product-details');
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`font-sans text-xs uppercase tracking-widest font-semibold py-2 transition-all relative ${
                    isActive ? 'text-stone-950' : 'text-stone-400 hover:text-stone-950'
                  }`}
                  id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-950"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Search Icon */}
            <button
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="p-2.5 text-stone-950 hover:bg-stone-50 rounded-full transition-all relative"
              aria-label="Search items"
              id="search-toggle-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              onClick={onAccountOpen}
              className={`p-2.5 rounded-full transition-all relative ${
                userEmail ? 'text-emerald-700 bg-emerald-50' : 'text-stone-950 hover:bg-stone-50'
              }`}
              aria-label="User account"
              id="user-account-btn"
            >
              {userEmail ? <UserCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={onCartOpen}
              className="p-2.5 text-stone-950 hover:bg-stone-50 rounded-full transition-all relative"
              aria-label="Shopping bag"
              id="shopping-cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-950 text-[9px] font-bold text-white ring-2 ring-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Expanded Search Bar */}
      <AnimatePresence>
        {showSearchBar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-stone-50 border-t border-stone-100"
            id="search-bar-panel"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for Shirts, T-Shirts, Jeans, Shoes, Accessories..."
                  className="w-full bg-transparent border-none text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-0 text-sm font-sans"
                  autoFocus
                  id="search-input-field"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveView('shop');
                    }}
                    className="text-xs text-stone-400 hover:text-stone-900 font-semibold"
                    id="clear-search-btn"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowSearchBar(false);
                    if (searchQuery) setActiveView('shop');
                  }}
                  className="bg-stone-950 text-white text-xs px-4 py-2 font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                  id="search-submit-btn"
                >
                  Search
                </button>
                <button
                  onClick={() => {
                    setShowSearchBar(false);
                    setSearchQuery('');
                  }}
                  className="text-stone-400 hover:text-stone-950 p-1"
                  id="close-search-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
              id="mobile-drawer-backdrop"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col md:hidden"
              id="mobile-drawer-panel"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="font-sans text-lg font-black tracking-widest text-stone-950 uppercase">
                    HARIZ
                  </span>
                  <span className="font-sans text-[8px] font-semibold tracking-[0.4em] text-stone-400 uppercase -mt-1 pl-[0.1em]">
                    FASHION
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-950 hover:bg-stone-50 rounded-full"
                  aria-label="Close menu"
                  id="close-mobile-menu-btn"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 flex flex-col space-y-6">
                {navItems.map((item, idx) => {
                  const isActive = activeView === item.view;
                  return (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.label}
                      onClick={() => handleNavClick(item.view)}
                      className={`text-left font-sans text-sm uppercase tracking-widest font-semibold flex justify-between items-center py-2 ${
                        isActive ? 'text-stone-950 pl-2 border-l-2 border-stone-950' : 'text-stone-400'
                      }`}
                      id={`mobile-nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom Info */}
              <div className="mt-auto pt-6 border-t border-stone-100">
                <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1">
                  Premium Craft Wear
                </p>
                <p className="text-xs font-semibold text-stone-800">
                  pharishsurya123@gmail.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
