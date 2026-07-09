import React, { useState, useEffect } from 'react';
import { ActiveView, CartItem, Product } from './types';
import { MOCK_PRODUCTS } from './data';

// Component Imports
import Header from './Header';
import Hero from './Hero';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';
import ProductListing from './ProductListing';
import CartDrawer from './CartDrawer';
import Checkout from './Checkout';
import AccountModal from './AccountModal';
import Footer from './Footer';

// Info Pages Imports
import {
  AboutPage,
  ContactPage,
  FAQPage,
  ShippingPolicyPage,
  PrivacyPolicyPage,
} from './InfoPages';

export default function App() {
  // Global View Routing
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialCategoryFilter, setInitialCategoryFilter] = useState<string>('all');
  const [genderListingFilter, setGenderListingFilter] = useState<'all' | 'men' | 'women'>('all');

  // Search Context
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State (Persisted in LocalStorage during session)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('hariz_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // User Profile State (Simulated Account)
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('hariz_user_email') || '';
  });
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('hariz_user_name') || '';
  });

  // UI Drawer / Modal Toggles
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('hariz_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hariz_user_email', userEmail);
    localStorage.setItem('hariz_user_name', userName);
  }, [userEmail, userName]);

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart((prevCart) => {
      // Check if product with identical size is already present
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedSize: size, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBuyNow = (product: Product, size: string, quantity: number = 1) => {
    handleAddToCart(product, size, quantity);
    setActiveView('checkout');
  };

  // Nav Handlers
  const handleShopNavigation = (view: ActiveView, initialCategory: string = 'all') => {
    setInitialCategoryFilter(initialCategory);
    
    if (view === 'men') {
      setGenderListingFilter('men');
      setActiveView('shop');
    } else if (view === 'women') {
      setGenderListingFilter('women');
      setActiveView('shop');
    } else {
      setGenderListingFilter('all');
      setActiveView(view);
    }

    // Scroll to top of content on navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View Details trigger
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products for Home screen Featured panel
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans select-none" id="hariz-app-root">
      
      {/* Header element */}
      <Header
        activeView={activeView}
        setActiveView={(view) => handleShopNavigation(view)}
        cartItemsCount={totalCartCount}
        onCartOpen={() => setCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q.trim()) setActiveView('shop');
        }}
        onAccountOpen={() => setAccountOpen(true)}
        userEmail={userEmail}
      />

      {/* Main Content Stage */}
      <main className="flex-grow" id="app-main-stage">
        
        {/* Router Stage */}
        {activeView === 'home' && (
          <div id="home-view-group">
            {/* Hero banner */}
            <Hero onShopClick={(view, cat) => handleShopNavigation(view, cat)} />

            {/* Featured Section */}
            <section className="py-20 bg-white" id="featured-products-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-16">
                  <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-stone-400">Atelier Selection</p>
                  <h2 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-wider text-stone-950 mt-1 mb-4">
                    Featured Masterpieces
                  </h2>
                  <div className="h-[2px] w-12 bg-stone-950 mx-auto" />
                  <p className="text-stone-500 text-xs font-light leading-relaxed mt-4">
                    Explore our preeminent design pieces, synthesized from heavy loopback organic knitwear and Japanese indigo selvedge raw weaves.
                  </p>
                </div>

                {/* Featured Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="featured-grid">
                  {featuredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAddToCart={(prod, size) => handleAddToCart(prod, size, 1)}
                      onViewDetails={handleViewProductDetails}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Middle manifesto showcase */}
            <section className="bg-stone-950 text-white py-24 relative overflow-hidden" id="manifesto-promo-section">
              <div className="absolute inset-0 opacity-15">
                <img
                  src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1600&q=80"
                  alt="Aesthetic black and white flatlay"
                  className="w-full h-full object-cover grayscale filter contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
                <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-stone-400">Atelier Manifesto</p>
                <h2 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-widest text-white mt-4 mb-6">
                  quiet luxury. no logos.
                </h2>
                <p className="text-stone-300 text-sm font-light leading-relaxed max-w-2xl mx-auto mb-10">
                  "Fashion passes, style remains." At Hariz, we operate on a philosophy of architectural honesty. We exclude loud external logos and visual clatter to let the supreme structural drapes and Japanese selvedge seams speak for themselves. Quiet confidence in every thread.
                </p>
                <button
                  onClick={() => handleShopNavigation('about')}
                  className="border border-white/40 hover:border-white text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all bg-transparent hover:bg-white hover:text-stone-950"
                  id="manifesto-read-more-btn"
                >
                  Read Our Manifesto
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Product Listing Page */}
        {activeView === 'shop' && (
          <ProductListing
            products={MOCK_PRODUCTS}
            initialCategory={initialCategoryFilter}
            genderFilter={genderListingFilter}
            searchQuery={searchQuery}
            onAddToCart={(prod, size) => handleAddToCart(prod, size, 1)}
            onViewDetails={handleViewProductDetails}
          />
        )}

        {/* Product Details Page */}
        {activeView === 'product-details' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onBack={() => setActiveView('shop')}
          />
        )}

        {/* Secure Checkout Page */}
        {activeView === 'checkout' && (
          <Checkout
            cartItems={cart}
            onBackToCart={() => {
              setActiveView('shop');
              setCartOpen(true);
            }}
            onClearCart={handleClearCart}
            userEmail={userEmail}
            userName={userName}
          />
        )}

        {/* Static Content / Statutory Pages */}
        {activeView === 'about' && <AboutPage />}
        {activeView === 'contact' && <ContactPage />}
        {activeView === 'faq' && <FAQPage />}
        {activeView === 'shipping-policy' && <ShippingPolicyPage />}
        {activeView === 'privacy-policy' && <PrivacyPolicyPage />}

      </main>

      {/* Cart Drawer Panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutClick={() => {
          setCartOpen(false);
          setActiveView('checkout');
        }}
      />

      {/* Account Profile Modal */}
      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userName={userName}
        setUserName={setUserName}
      />

      {/* Professional Footer */}
      <Footer onNavClick={(view, cat) => handleShopNavigation(view, cat)} />

    </div>
  );
}
