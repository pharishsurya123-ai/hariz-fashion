import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, ChevronRight, Lock } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckoutClick: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutClick,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShippingThreshold = subtotal > 1500;
  const shippingCost = subtotal === 0 ? 0 : (isFreeShippingThreshold ? 0 : 150);
  const total = subtotal + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100]"
            id="cart-backdrop"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-[101] flex flex-col"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-stone-950" />
                <h2 className="font-sans text-sm font-black uppercase tracking-widest text-stone-950">
                  Your Wardrobe Bag ({cartItems.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-stone-950 hover:bg-white rounded-full border border-transparent hover:border-stone-200 transition-all"
                aria-label="Close cart"
                id="close-cart-drawer-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" id="cart-drawer-items-list">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="p-4 bg-stone-50 border border-stone-100 rounded-full mb-4">
                    <ShoppingBag className="w-8 h-8 text-stone-300" />
                  </div>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-800">
                    Your bag is completely empty
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 max-w-[250px] leading-relaxed">
                    Explore our curated premium shirts, tees, jeans, and sneakers to upgrade your signature style.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    className="mt-6 bg-stone-950 hover:bg-stone-800 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-colors"
                    id="cart-empty-shop-btn"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => {
                  const productTotal = item.product.price * item.quantity;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-4 border-b border-stone-100 pb-5"
                      id={`cart-item-${item.product.id}-${item.selectedSize.toLowerCase()}`}
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 aspect-[3/4] bg-stone-50 overflow-hidden rounded-lg border border-stone-200/50 shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover filter grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-sans text-xs font-bold text-stone-900 uppercase tracking-wide line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                              title="Remove item"
                              id={`remove-cart-item-${item.product.id}-${item.selectedSize.toLowerCase()}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <p className="text-[10px] text-stone-400 uppercase font-mono mt-1">
                            Size: <span className="text-stone-900 font-bold font-sans">{item.selectedSize}</span>
                          </p>
                          <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                            ₹{item.product.price.toLocaleString('en-IN')} each
                          </p>
                        </div>

                        {/* Qty Modifier & Subtotal */}
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 overflow-hidden scale-90 origin-left">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="px-2.5 py-1 text-stone-500 hover:text-stone-950 hover:bg-stone-100 transition-colors font-bold"
                              id={`qty-dec-${item.product.id}-${item.selectedSize.toLowerCase()}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 font-mono font-bold text-stone-950 text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="px-2.5 py-1 text-stone-500 hover:text-stone-950 hover:bg-stone-100 transition-colors font-bold"
                              id={`qty-inc-${item.product.id}-${item.selectedSize.toLowerCase()}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-sans text-xs font-bold text-stone-950">
                            ₹{productTotal.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Bottom calculation & checkout trigger */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50" id="cart-drawer-summary">
                
                {/* Shipping threshold announcement */}
                <div className="mb-4">
                  {isFreeShippingThreshold ? (
                    <p className="text-[10px] text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded text-center font-bold uppercase tracking-wider">
                      🎉 Your order qualifies for free shipping!
                    </p>
                  ) : (
                    <p className="text-[10px] text-stone-500 bg-stone-100 py-1.5 px-3 rounded text-center font-mono uppercase tracking-wider">
                      Add <span className="font-bold font-sans text-stone-950">₹{(1500 - subtotal).toLocaleString('en-IN')}</span> more for FREE SHIPPING
                    </p>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Subtotal</span>
                    <span className="font-mono text-stone-800 font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Shipping Courier</span>
                    <span className="font-mono text-stone-800 font-bold">
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div className="border-t border-stone-200/60 pt-2.5 flex justify-between text-sm text-stone-900 font-bold">
                    <span className="uppercase tracking-widest font-sans text-xs">Total Estimation</span>
                    <span className="font-mono text-lg font-black">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={onCheckoutClick}
                  className="w-full bg-stone-950 hover:bg-stone-800 text-white font-sans text-xs font-bold uppercase tracking-[0.25em] py-4.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  id="cart-checkout-btn"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Proceed to Secure Checkout
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-stone-400 font-mono text-center mt-3 uppercase tracking-wider">
                  Guaranteed safe checkout & express deliveries
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
