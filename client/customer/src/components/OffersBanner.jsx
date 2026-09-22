import React, { useState, useEffect } from 'react';
import { Tag, ChevronLeft, ChevronRight, Check, Copy } from 'lucide-react';

const OFFERS = [
  {
    id: 'offer-1',
    bgGradient: 'from-pink-600 via-rose-600 to-fuchsia-600',
    title: 'Get Extra 15% Off',
    subtitle: 'On Your 1st Purchase',
    code: 'NEW15',
    tagColor: 'bg-emerald-300 text-stone-900',
  },
  {
    id: 'offer-2',
    bgGradient: 'from-amber-600 via-orange-600 to-rose-600',
    title: 'Buy 2 Get 1 Free',
    subtitle: 'On All Botanical Serums',
    code: 'GLOWFREE',
    tagColor: 'bg-amber-200 text-amber-950',
  },
  {
    id: 'offer-3',
    bgGradient: 'from-emerald-700 via-teal-700 to-stone-900',
    title: 'Flat ₹500 Off',
    subtitle: 'On Orders Above ₹2,999',
    code: 'LUXE500',
    tagColor: 'bg-teal-200 text-teal-950',
  },
  {
    id: 'offer-4',
    bgGradient: 'from-purple-700 via-indigo-700 to-slate-900',
    title: 'Free Express Shipping',
    subtitle: '& Luxury Samples On Prepaid Orders',
    code: 'FREESHIP',
    tagColor: 'bg-purple-200 text-purple-950',
  },
];

export default function OffersBanner() {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % OFFERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % OFFERS.length);
  };

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + OFFERS.length) % OFFERS.length);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const offer = OFFERS[currentOffer];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
      <div className="relative group">
        {/* Main Offer Banner Pill */}
        <div
          className={`w-full bg-gradient-to-r ${offer.bgGradient} rounded-2xl sm:rounded-full p-4 sm:p-5 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 relative overflow-hidden`}
        >
          {/* Coupon Ticket Graphic Cutout / Left Section */}
          <div className="flex items-center space-x-3 z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
              <Tag className="w-6 h-6 transform -rotate-12" />
            </div>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {offer.title}
                </span>
                <span className="text-xs sm:text-sm font-medium text-white/90">
                  {offer.subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Coupon Code Badge & Copy Action */}
          <div className="flex items-center space-x-3 z-10 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleCopyCode(offer.code)}
              className={`${offer.tagColor} font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md hover:scale-105 active:scale-95 transition-all`}
              title="Click to copy coupon code"
            >
              <span>USE CODE</span>
              <span className="font-extrabold text-sm">{offer.code}</span>
              {copiedCode === offer.code ? (
                <Check className="w-4 h-4 text-emerald-800 ml-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 ml-1 opacity-70" />
              )}
            </button>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevOffer}
          aria-label="Previous Offer"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-lg border border-stone-200 text-stone-700 hover:text-amber-800 flex items-center justify-center transition-transform hover:scale-110"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextOffer}
          aria-label="Next Offer"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-lg border border-stone-200 text-stone-700 hover:text-amber-800 flex items-center justify-center transition-transform hover:scale-110"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
