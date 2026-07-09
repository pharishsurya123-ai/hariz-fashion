import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, ShieldAlert, Truck, Check, HelpCircle as FaqIcon } from 'lucide-react';

/* ==========================================================================
   ABOUT US PAGE COMPONENT
   ========================================================================== */
export function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-16" id="about-us-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-stone-400">Our Manifesto</p>
          <h1 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-wider text-stone-950 mt-2 mb-6">
            The Hariz Philosophy
          </h1>
          <div className="h-[2px] w-12 bg-stone-950 mx-auto mb-6" />
          <p className="text-stone-600 text-sm leading-relaxed font-light">
            Founded with a vision to redefine ready-to-wear minimalism, Hariz Fashion blends functional utility with premium structural lines. We strip away the unnecessary noise of fast-fashion to deliver quiet confidence.
          </p>
        </div>

        {/* Brand Collage / Image */}
        <div className="aspect-[16/9] bg-stone-100 rounded-2xl overflow-hidden mb-16 border border-stone-200/50 shadow-sm relative">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80"
            alt="Hariz Atelier Studio"
            className="w-full h-full object-cover filter grayscale contrast-115"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-950/20 mix-blend-multiply" />
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-stone-600 leading-relaxed font-light mb-16">
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-950 mb-3">Our Craftsmanship</h3>
            <p className="mb-4">
              We source our raw textiles exclusively from legendary mills. Our loopback heavy cotton jersey is knit on slow vintage loops in Wakayama, Japan, producing a material of unparalleled strength and luxurious softness.
            </p>
            <p>
              Each seam is reinforced with high-density lock stitching, and every button is sourced from natural, sustainable mother-of-pearl or Corozo nuts. A garment from Hariz is built for a lifetime.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-950 mb-3">Ethical Manufacture</h3>
            <p className="mb-4">
              We believe architectural luxury shouldn't come at the cost of human dignity or ecological balance. We maintain absolute transparency in our supply chain, working only with certified boutique factories.
            </p>
            <p>
              All our tailors and craft artisans are compensated with premier fair wages, provided comprehensive healthcare, and work under pristine, climate-controlled conditions.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-stone-50 rounded-2xl border border-stone-100 p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <span className="block font-sans text-2xl font-black text-stone-950">100%</span>
            <span className="block text-[10px] text-stone-400 font-mono uppercase tracking-wider mt-1">Traceable Cotton</span>
          </div>
          <div className="border-t sm:border-t-0 sm:border-x border-stone-200/60 py-4 sm:py-0">
            <span className="block font-sans text-2xl font-black text-stone-950">Okayama</span>
            <span className="block text-[10px] text-stone-400 font-mono uppercase tracking-wider mt-1">Selvedge Denim</span>
          </div>
          <div>
            <span className="block font-sans text-2xl font-black text-stone-950">Ethical</span>
            <span className="block text-[10px] text-stone-400 font-mono uppercase tracking-wider mt-1">Certified Guilds</span>
          </div>
        </div>

      </div>
    </div>
  );
}


/* ==========================================================================
   CONTACT PAGE COMPONENT
   ========================================================================== */
export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'support', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please provide a valid email';
    if (!formData.message.trim()) newErrors.message = 'Please write a message';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'support', message: '' });
    setErrors({});
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white min-h-screen py-16" id="contact-us-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-stone-400">Get in Touch</p>
          <h1 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-wider text-stone-950 mt-2 mb-4">
            Contact Us
          </h1>
          <p className="text-stone-500 text-xs font-mono uppercase tracking-widest">
            We reply within 12 standard business hours
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-8 space-y-6">
              <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-stone-950 border-b border-stone-200 pb-3">
                Atelier Coordinates
              </h3>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white rounded-lg border border-stone-200/50 text-stone-900 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Email Inquiry</h4>
                  <p className="text-xs text-stone-500 mt-1">support@harizfashion.com</p>
                  <p className="text-xs text-stone-400">concierge@harizfashion.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white rounded-lg border border-stone-200/50 text-stone-900 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Call Concierge</h4>
                  <p className="text-xs text-stone-500 mt-1">+91 98765 43210</p>
                  <p className="text-xs text-stone-400">Mon - Sat: 10:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white rounded-lg border border-stone-200/50 text-stone-900 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">HQ Address</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Hariz Fashion House, 4th Floor Studio, 88 luxury Boulevard, Bandra West, Mumbai, Maharashtra - 400050, India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-stone-950 mb-6 pb-2 border-b border-stone-100">
                Send a Message
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-6 text-center"
                >
                  <Check className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-bold text-sm uppercase tracking-wider">Message Sent Successfully</h4>
                  <p className="text-xs text-emerald-600 mt-1">
                    Thank you. A Hariz concierge representative will contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSend} className="space-y-5" id="contact-feedback-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="e.g. Harish Surya"
                        className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                          errors.name ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950'
                        }`}
                        id="contact-input-name"
                      />
                      {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="name@domain.com"
                        className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                          errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950'
                        }`}
                        id="contact-input-email"
                      />
                      {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                      Subject Matter
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-stone-200 px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-950 bg-white"
                      id="contact-select-subject"
                    >
                      <option value="support">Customer Support & Returns</option>
                      <option value="custom">Bespoke Fitting & Sizing</option>
                      <option value="press">Press & Collaboration</option>
                      <option value="bulk">Retail / Corporate Bulk</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      rows={5}
                      placeholder="Write your query or message in detail here..."
                      className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                        errors.message ? 'border-rose-400 focus:ring-rose-500' : 'border-stone-200 focus:ring-stone-950'
                      }`}
                      id="contact-textarea-message"
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-stone-950 hover:bg-stone-800 text-white font-sans text-xs font-bold uppercase tracking-[0.25em] py-4 rounded-xl transition-all shadow flex items-center justify-center gap-2 group"
                    id="contact-submit-btn"
                  >
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    Send Secure Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}


/* ==========================================================================
   FAQ PAGE COMPONENT
   ========================================================================== */
export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you ship all across India?',
      a: 'Yes, we provide expedited delivery services to over 24,000 PIN codes across India. All orders are shipped via trusted secure courier partners such as BlueDart, Delhivery, and DHL, ensuring premium handling and tracking telemetry.'
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer a seamless 14-day premium return and exchange period. If a garment does not fit exactly to your satisfaction, simply trigger a return via our concierge portal. We will arrange a free door-step pickup, and package must be sealed in its original custom Hariz box.'
    },
    {
      q: 'How do I care for raw selvedge denim jeans?',
      a: 'Raw selvedge denim is designed to be worn frequently and washed rarely. For the first 6 months, we recommend dry-brushing or spot-cleaning. When a wash is inevitable, hand-wash inside-out in cold water with mild organic detergents and line dry. Avoid tumble dryers.'
    },
    {
      q: 'Are your t-shirts and shirts pre-shrunk?',
      a: 'Yes, all our linen shirts, organic heavy cotton t-shirts, and knit mock necks are pre-shrunk and garment dyed during manufacturing. This ensures the structural silhouette remains precise and does not deform after household washes.'
    },
    {
      q: 'Can I request custom tailoring or custom sizing?',
      a: 'Yes, we provide custom bespoke tailoring services on select coats, blazers, and raw denim cuts. You can schedule a virtual consultation with a Hariz artisan or email concierge@harizfashion.com with your exact body dimensions.'
    }
  ];

  return (
    <div className="bg-white min-h-screen py-16" id="faq-page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-stone-400">FAQS & ASSISTANCE</p>
          <h1 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-wider text-stone-950 mt-2">
            Frequently Asked Questions
          </h1>
          <div className="h-[2px] w-12 bg-stone-950 mx-auto mt-4" />
        </div>

        <div className="space-y-4" id="faq-accordion-group">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-stone-200/70 rounded-xl overflow-hidden bg-white shadow-sm"
                id={`faq-accordion-item-${index}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaqIcon className="w-4.5 h-4.5 text-stone-500 shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <span className="text-stone-400 font-bold text-lg leading-none select-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-stone-100 text-xs text-stone-600 leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}


/* ==========================================================================
   SHIPPING POLICY PAGE COMPONENT
   ========================================================================== */
export function ShippingPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-16" id="shipping-policy-page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 font-sans">
        
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-stone-400">CONCIERGE COURIER</p>
          <h1 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-wider text-stone-950 mt-2">
            Shipping & Dispatch Policy
          </h1>
          <div className="h-[2px] w-12 bg-stone-950 mx-auto mt-4" />
        </div>

        <div className="prose prose-stone text-xs sm:text-sm text-stone-600 leading-relaxed font-light space-y-6">
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-950 mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              1. Delivery Timelines
            </h3>
            <p>
              We process and ship all inventory orders within 24 standard business hours from our Mumbai central warehouse. Orders placed before 1:00 PM IST on weekdays are dispatched on the same calendar day.
            </p>
            <p className="mt-2 font-medium text-stone-800">
              • Metros (Mumbai, Delhi, Bengaluru, Chennai, Kolkata): 2 to 3 Business Days. <br />
              • Tier 2 & Tier 3 Cities: 4 to 5 Business Days. <br />
              • Remote regions (North-East, J&K): 6 to 7 Business Days.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-950 mb-2">
              2. Shipping Charges & Duty Fees
            </h3>
            <p>
              We offer <span className="font-bold text-stone-950">Free Express Shipping</span> across India on all purchases totaling ₹1,500 or above. For orders below ₹1,500, a flat nominal courier fee of ₹150 is appended during secure checkout. There are absolutely no hidden customs or surcharge duties.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-950 mb-2">
              3. Telemetry Tracking
            </h3>
            <p>
              Once your shipment has been vended out, a dispatch notification containing a secure AWB tracking link is shot to your phone number and email. You can monitor the real-time coordinates of your package via our live carrier dashboard.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-5 mt-8">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 mb-1.5">Note on Tamper Proofing:</h4>
            <p className="text-xs text-stone-500 font-light leading-normal">
              Every garment is packed in a protective bio-degradable custom storage box, sealed with smart holographic tape. Do NOT accept the package if the holographic security tape appears broken, slit, or replaced.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}


/* ==========================================================================
   PRIVACY POLICY PAGE COMPONENT
   ========================================================================== */
export function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-16" id="privacy-policy-page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 font-sans">
        
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-stone-400">DATA ETHICS</p>
          <h1 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-wider text-stone-950 mt-2">
            Privacy & Trust Policy
          </h1>
          <div className="h-[2px] w-12 bg-stone-950 mx-auto mt-4" />
        </div>

        <div className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light space-y-6">
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-950 mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              1. Information Collection
            </h3>
            <p>
              We gather necessary customer information solely to fulfill shipping logistics and deliver a curated shopping experience. This includes your billing name, dispatch address, active phone coordinates, and email. We do NOT harvest passive background location, contact listings, or unrelated cookies.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-950 mb-2">
              2. Data Storage & Zero Leakage
            </h3>
            <p>
              Your personal billing address and communication logs are stored on secure cloud databases protected by cutting-edge cryptographic layers. We strictly follow the Information Technology Act (2000) and GDPR principles. We NEVER sell, lease, or distribute our customer archives to third-party marketing companies.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-950 mb-2">
              3. Secure Financial Transactions
            </h3>
            <p>
              We utilize PCI-DSS Level 1 compliant gateway servers to process online transactions. Your credit card metrics, digital wallets, and net-banking tokens are encrypted instantaneously and are never recorded on Hariz Fashion's primary infrastructure.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-5 mt-8 text-xs text-stone-500 font-light">
            For inquiries regarding the immediate purge or correction of your private credentials from our databases, please contact our designated Data Protection Officer at <span className="font-bold text-stone-900 underline">privacy@harizfashion.com</span>.
          </div>
        </div>

      </div>
    </div>
  );
}
