import React, { useState } from 'react';
import { ShippingDetails, CartItem } from '../types';
import { ChevronLeft, CreditCard, ShieldCheck, CheckCircle, Package, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface CheckoutProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onClearCart: () => void;
  userEmail?: string;
  userName?: string;
}

export default function Checkout({ cartItems, onBackToCart, onClearCart, userEmail = '', userName = '' }: CheckoutProps) {
  const [details, setDetails] = useState<ShippingDetails>({
    name: userName || '',
    email: userEmail || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shippingCost;

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir'
  ].sort();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingDetails]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingDetails, string>> = {};
    if (!details.name.trim()) newErrors.name = 'Full name is required';
    if (!details.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      newErrors.email = 'Invalid email address format';
    }
    if (!details.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(details.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!details.address.trim()) newErrors.address = 'Delivery address is required';
    if (!details.city.trim()) newErrors.city = 'City name is required';
    if (!details.state) newErrors.state = 'State selection is required';
    if (!details.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(details.pinCode.trim())) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      const generatedOrderId = 'HZ-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      onClearCart();
    }, 1500);
  };

  if (isSubmitted) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const dateFormatted = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div className="bg-stone-50 min-h-screen py-16 flex items-center" id="checkout-success-stage">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-100 shadow-xl text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>

            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-emerald-600 font-bold mb-1">
              Order Confirmed
            </p>
            <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-wider text-stone-950 mb-4">
              Thank you for your purchase
            </h1>
            <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed mb-8">
              We have received your order. A digital invoice and real-time tracking link have been dispatched to <span className="font-bold text-stone-900">{details.email}</span>.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-5 text-left mb-8 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-stone-200/60">
                <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider">Order Reference</span>
                <span className="text-xs font-mono font-black text-stone-900 bg-stone-200 px-2.5 py-1 rounded">
                  {orderId}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Items summary</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Premium custom packaging • Hand-vetted items
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Estimated Delivery ETA</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
                    {dateFormatted} (Express Courier Service)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Shipping Address</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {details.name}, {details.address}, {details.city}, {details.state} - {details.pinCode}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-stone-950 hover:bg-stone-800 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-xl transition-all shadow"
                id="success-continue-shopping-btn"
              >
                Explore New Arrivals
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12" id="checkout-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back control */}
        <button
          onClick={onBackToCart}
          className="group inline-flex items-center gap-2 text-stone-500 hover:text-stone-950 font-sans text-xs font-bold uppercase tracking-wider mb-8 transition-colors"
          id="checkout-back-btn"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Modify Wardrobe Bag
        </button>

        <h1 className="font-sans text-3xl font-black uppercase tracking-wider text-stone-950 mb-10">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Billing and Shipping Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200/60 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-6">
                <div className="p-2 bg-stone-50 border border-stone-150 rounded-lg text-stone-900">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-900">
                    Shipping & Delivery Information
                  </h2>
                  <p className="text-[11px] text-stone-400 font-mono uppercase tracking-wider mt-0.5">
                    Standard courier options
                  </p>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-5" id="shipping-checkout-form">
                
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                      errors.name ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500' : 'border-stone-200 focus:ring-stone-950 focus:border-stone-950'
                    }`}
                    placeholder="Enter your first and last name"
                    id="checkout-input-name"
                  />
                  {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={details.email}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                        errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950 focus:border-stone-950'
                      }`}
                      placeholder="e.g. name@domain.com"
                      id="checkout-input-email"
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={details.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                        errors.phone ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950'
                      }`}
                      id="checkout-input-phone"
                    />
                    {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={details.address}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                      errors.address ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950'
                    }`}
                    placeholder="Apartment, suite, unit, building, street detail"
                    id="checkout-input-address"
                  />
                  {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address}</p>}
                </div>

                {/* City, State and Pin Code Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={details.city}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                        errors.city ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950'
                      }`}
                      placeholder="City name"
                      id="checkout-input-city"
                    />
                    {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                      State *
                    </label>
                    <select
                      name="state"
                      value={details.state}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-3 text-sm focus:outline-none focus:ring-1 bg-white ${
                        errors.state ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950'
                      }`}
                      id="checkout-select-state"
                    >
                      <option value="">Select State</option>
                      {indianStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    {errors.state && <p className="text-xs text-rose-500 mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={details.pinCode}
                      onChange={handleChange}
                      maxLength={6}
                      placeholder="6-digit PIN"
                      className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                        errors.pinCode ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950'
                      }`}
                      id="checkout-input-pincode"
                    />
                    {errors.pinCode && <p className="text-xs text-rose-500 mt-1">{errors.pinCode}</p>}
                  </div>
                </div>

                {/* Secure Notice */}
                <div className="flex gap-3 bg-stone-50 p-4 border border-stone-200/50 rounded-xl mt-6">
                  <ShieldCheck className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-stone-500 leading-normal">
                    <span className="font-bold text-stone-900 uppercase">Cash on Delivery Available</span>. Due to local security guidelines, full tracking telemetry is enabled on COD packaging. There are no additional transaction fees.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full mt-6 bg-stone-950 hover:bg-stone-800 text-white font-sans text-xs font-bold uppercase tracking-[0.25em] py-4.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-55 disabled:pointer-events-none flex items-center justify-center gap-2"
                  id="checkout-place-order-btn"
                >
                  {isSubmitting ? 'Verifying Coordinates...' : 'Place Order (Cash on Delivery)'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 shadow-sm sticky top-28">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-950 border-b border-stone-200/60 pb-3 mb-4">
                Order Summary ({cartItems.length} styles)
              </h3>

              <div className="max-h-72 overflow-y-auto space-y-4 mb-6 pr-1" id="checkout-items-summary-list">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3 items-center justify-between pb-3 border-b border-stone-200/30">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 aspect-[3/4] bg-stone-100 rounded-md overflow-hidden shrink-0 border border-stone-200/40">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover filter grayscale" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide line-clamp-1 max-w-[180px]">
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] text-stone-400 mt-0.5">
                          Size {item.selectedSize} • Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-950 font-mono">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price list */}
              <div className="space-y-2 border-b border-stone-200 pb-4 mb-4 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Cart Subtotal</span>
                  <span className="font-mono text-stone-800 font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Premium Courier Duty</span>
                  <span className="font-mono text-stone-800 font-bold">
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline text-stone-900 font-bold mb-4">
                <span className="uppercase text-xs tracking-widest font-sans">Final Payable</span>
                <span className="font-mono text-xl font-black">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className="text-[10px] text-stone-400 font-mono space-y-1 mt-6 uppercase tracking-wider">
                <p>✓ Fast delivery dispatch in 24 hours</p>
                <p>✓ Sealed tamper-proof premium package</p>
                <p>✓ Easy 14-day standard return policy</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
