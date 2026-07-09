import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Instagram, Twitter, Compass } from 'lucide-react';
import { ActiveView } from '../types';

interface FooterProps {
  onNavClick: (view: ActiveView, initialCategory?: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-8" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="border-b border-stone-800 pb-16 mb-16" id="newsletter-segment">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 text-left">
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-stone-500">Join the Guild</p>
              <h3 className="font-sans text-2xl font-black uppercase tracking-wider text-white mt-1.5 mb-2">
                Newsletter subscription
              </h3>
              <p className="text-stone-400 text-xs font-light leading-relaxed max-w-sm">
                Receive exclusive capsules, architectural style releases, and priority sizing previews directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-7">
              {subscribed ? (
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex items-center justify-center gap-3 text-emerald-400">
                  <Check className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    Subscription successful. Check your inbox.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3" id="newsletter-form">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Your premium email address"
                      className={`w-full bg-stone-900/60 border rounded-xl pl-12 pr-4 py-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                        error ? 'border-rose-500/60' : 'border-stone-800'
                      }`}
                      id="newsletter-email-input"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white hover:bg-stone-200 text-stone-950 font-sans text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 sm:py-0 rounded-xl transition-all flex items-center justify-center gap-2"
                    id="newsletter-subscribe-btn"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              {error && <p className="text-xs text-rose-400 mt-2 pl-2 font-mono">{error}</p>}
            </div>

          </div>
        </div>

        {/* 4-Column Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16" id="footer-links-grid">
          
          {/* Col 1: Brand coordinates */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => onNavClick('home')}
              className="flex flex-col items-start focus:outline-none mb-5"
              id="footer-logo-btn"
            >
              <span className="font-sans text-xl font-black tracking-[0.25em] text-white uppercase">
                HARIZ
              </span>
              <span className="font-sans text-[8px] font-semibold tracking-[0.55em] text-stone-400 uppercase -mt-1 pl-[0.1em]">
                FASHION
              </span>
            </button>
            <p className="text-stone-400 text-xs leading-relaxed font-light mb-6 max-w-[200px]">
              Modern, responsive ready-to-wear minimalism crafted with Okayama Japanese textiles.
            </p>
            <div className="flex space-x-3.5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 hover:bg-white hover:text-stone-950 rounded-full text-stone-400 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 hover:bg-white hover:text-stone-950 rounded-full text-stone-400 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 hover:bg-white hover:text-stone-950 rounded-full text-stone-400 transition-all">
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Wardrobe Categories */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-5">
              The Wardrobe
            </h4>
            <ul className="space-y-3.5 text-xs font-light text-stone-400">
              <li>
                <button onClick={() => onNavClick('shop', 'shirts')} className="hover:text-white transition-colors">
                  Linen Shirts
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('shop', 't-shirts')} className="hover:text-white transition-colors">
                  Oversized Tees
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('shop', 'jeans')} className="hover:text-white transition-colors">
                  Selvedge Denim
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('shop', 'shoes')} className="hover:text-white transition-colors">
                  Craft Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('shop', 'accessories')} className="hover:text-white transition-colors">
                  Minimal Watches
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-5">
              Assistance
            </h4>
            <ul className="space-y-3.5 text-xs font-light text-stone-400">
              <li>
                <button onClick={() => onNavClick('faq')} className="hover:text-white transition-colors">
                  FAQs & Sizing
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('shipping-policy')} className="hover:text-white transition-colors">
                  Shipping Logistics
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Coordinates
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('contact')} className="hover:text-white transition-colors">
                  Atelier Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Manifesto details */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-5">
              Atelier HQ
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed font-light mb-4">
              Hariz Fashion House <br />
              4th Floor Studio, Bandra West <br />
              Mumbai, Maharashtra - 400050
            </p>
            <p className="text-stone-500 font-mono text-[10px] uppercase tracking-wider">
              EST. Mumbai 2026
            </p>
          </div>

        </div>

        {/* Bottom Bar: copyright and payment tokens */}
        <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" id="footer-bottom-bar">
          <p className="text-[10px] text-stone-500 font-mono uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} HARIZ FASHION HOUSE. All architectural rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-2.5 items-center justify-center text-[9px] font-mono uppercase tracking-wider text-stone-500">
            <span className="bg-stone-900 px-2 py-1 rounded border border-stone-850">UPI</span>
            <span className="bg-stone-900 px-2 py-1 rounded border border-stone-850">RuPay</span>
            <span className="bg-stone-900 px-2 py-1 rounded border border-stone-850">Visa</span>
            <span className="bg-stone-900 px-2 py-1 rounded border border-stone-850">Mastercard</span>
            <span className="bg-stone-900 px-2 py-1 rounded border border-stone-850">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
