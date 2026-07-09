import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, LogOut, Package, ShieldCheck, Mail, Edit2, Check } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  userName: string;
  setUserName: (name: string) => void;
}

export default function AccountModal({
  isOpen,
  onClose,
  userEmail,
  setUserEmail,
  userName,
  setUserName,
}: AccountModalProps) {
  const [inputEmail, setInputEmail] = useState(userEmail || '');
  const [inputName, setInputName] = useState(userName || '');
  const [isEditing, setIsEditing] = useState(!userEmail);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim() || !inputName.trim()) return;

    setUserEmail(inputEmail.trim());
    setUserName(inputName.trim());
    setIsEditing(false);
    setSuccessMsg('Profile coordinates updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLogout = () => {
    setUserEmail('');
    setUserName('');
    setInputEmail('');
    setInputName('');
    setIsEditing(true);
  };

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
            className="fixed inset-0 bg-black/60 z-[200]"
            id="account-backdrop"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="fixed inset-0 m-auto h-fit max-h-[90vh] w-full max-w-md bg-white rounded-2xl shadow-2xl z-[201] p-6 sm:p-8 overflow-y-auto border border-stone-100"
            id="account-modal-box"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-stone-900" />
                <h3 className="font-sans text-sm font-black uppercase tracking-widest text-stone-950">
                  Your Hariz Account
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-stone-950 hover:bg-stone-50 rounded-full border border-transparent hover:border-stone-200 transition-all"
                id="close-account-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {successMsg && (
              <div className="mb-4 bg-emerald-50 border border-emerald-150 text-emerald-800 text-xs py-3 px-4 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {isEditing ? (
              /* LOGIN/REGISTER MODE */
              <form onSubmit={handleSave} className="space-y-4" id="account-login-form">
                <p className="text-xs text-stone-500 leading-relaxed font-light mb-4">
                  Please identify yourself to enable concierge priority packing, historic order tracking, and custom tailored configurations.
                </p>

                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="e.g. Harish Surya"
                    className="w-full rounded-lg border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-stone-950 bg-white text-stone-900"
                    id="account-input-name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full rounded-lg border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-stone-950 bg-white text-stone-900"
                    id="account-input-email"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-950 hover:bg-stone-800 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] py-3.5 rounded-lg transition-all shadow"
                  id="account-save-profile-btn"
                >
                  Access Atelier Account
                </button>
              </form>
            ) : (
              /* REGISTERED PROFILE VIEW */
              <div className="space-y-6" id="account-profile-view">
                <div className="flex items-center gap-4 bg-stone-50 border border-stone-100 p-4 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-stone-900 flex items-center justify-center text-white text-sm font-black uppercase tracking-widest">
                    {userName ? userName[0] : 'H'}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-stone-900">{userName}</h4>
                    <p className="text-xs text-stone-500 line-clamp-1">{userEmail}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 hover:bg-white border border-transparent hover:border-stone-200 rounded-lg transition-all text-stone-500"
                    title="Edit profile details"
                    id="edit-profile-trigger-btn"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Account Details Box */}
                <div className="space-y-3 text-xs border border-stone-200/50 rounded-xl p-4">
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-2">
                    Priority Perks
                  </h4>
                  <div className="flex items-start gap-3 text-stone-600 font-light">
                    <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                    <p>Verified Atelier member: Elite Priority Dispatch</p>
                  </div>
                  <div className="flex items-start gap-3 text-stone-600 font-light">
                    <Package className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                    <p>Free packing, premium monochrome box covers</p>
                  </div>
                </div>

                {/* Purchase History Mock */}
                <div className="space-y-3">
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-stone-500">
                    Your Active Orders
                  </h4>
                  <div className="border border-stone-100 rounded-xl p-4 text-center bg-stone-50/50">
                    <Package className="w-6 h-6 text-stone-300 mx-auto mb-2" />
                    <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                      No past orders captured on this browser session
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-stone-100 pt-5">
                  <button
                    onClick={handleLogout}
                    className="flex-1 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold uppercase tracking-widest py-3 transition-colors flex items-center justify-center gap-1.5"
                    id="account-logout-btn"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-stone-950 hover:bg-stone-800 text-white rounded-lg text-xs font-bold uppercase tracking-widest py-3 transition-colors"
                  >
                    Close Pane
                  </button>
                </div>
              </div>
            )}

            {/* Support Coordination */}
            <div className="mt-8 border-t border-stone-100 pt-4 text-center">
              <span className="text-[9px] text-stone-400 font-mono uppercase tracking-widest block">
                concierge: support@harizfashion.com
              </span>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
