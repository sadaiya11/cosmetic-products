import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FLASH_OFFERS = [
  {
    id: 'flash-1',
    categorySlug: 'skincare',
    bgColor: 'bg-[#d8effd]',
    borderColor: 'border-sky-200',
    ribbonBg: 'bg-[#004b93]',
    ribbonTextColor: 'text-white',
    brandName: 'NYKAA',
    subBrand: 'mom & baby',
    brandColor: 'text-[#e80071]',
    subBrandColor: 'text-[#d97706]',
    discountPrefix: 'UPTO',
    discountAmount: '40%',
    discountLabel: 'OFF',
    discountTarget: 'ON MOTHER & BABY CARE',
    targetColor: 'text-[#003865]',
    dividerColor: 'bg-[#003865]/40',
  },
  {
    id: 'flash-2',
    categorySlug: 'cleanser',
    bgColor: 'bg-[#fde0f7]',
    borderColor: 'border-pink-200',
    ribbonBg: 'bg-[#700b68]',
    ribbonTextColor: 'text-white',
    brandName: 'VEGA',
    subBrand: 'BEAUTY LUXE',
    brandColor: 'text-[#111827]',
    subBrandColor: 'text-[#6b21a8]',
    discountPrefix: 'UP TO',
    discountAmount: '60%',
    discountLabel: 'OFF',
    discountTarget: 'BESTSELLING COSMETICS',
    targetColor: 'text-[#4c0519]',
    dividerColor: 'bg-[#700b68]/40',
  },
  {
    id: 'flash-3',
    categorySlug: 'fragrance',
    bgColor: 'bg-[#fef3c7]',
    borderColor: 'border-amber-200',
    ribbonBg: 'bg-[#78350f]',
    ribbonTextColor: 'text-white',
    brandName: 'SUGAR',
    subBrand: 'MATTE LIPSTICKS',
    brandColor: 'text-[#92400e]',
    subBrandColor: 'text-[#b45309]',
    discountPrefix: 'FLAT',
    discountAmount: '50%',
    discountLabel: 'OFF',
    discountTarget: 'ON ALL LIP CARE & GLOSS',
    targetColor: 'text-[#451a03]',
    dividerColor: 'bg-[#78350f]/40',
  }
];

export default function FlashSaleOffers() {
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(2 * 3600 + 42 * 60 + 26); // 02h 42m 26s

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 2 * 3600 + 45 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const hStr = String(hrs).padStart(2, '0');
    const mStr = String(mins).padStart(2, '0');
    const sStr = String(secs).padStart(2, '0');
    return `Ends In: ${hStr}h ${mStr}m ${sStr}s`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FLASH_OFFERS.map((offer) => (
          <div
            key={offer.id}
            onClick={() => navigate(`/shop?category=${offer.categorySlug}`)}
            className={`relative ${offer.bgColor} border ${offer.borderColor} rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group`}
          >
            {/* Top-Left Ticking Timer Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-stone-800/80 backdrop-blur-md text-white font-mono text-[11px] font-medium px-2.5 py-1 rounded-md shadow-sm border border-stone-700/50 tracking-wide">
                {formatTimer(secondsRemaining)}
              </span>
            </div>

            {/* Main Content Body */}
            <div className="pt-12 pb-6 px-6 flex items-center justify-between min-h-[160px]">
              {/* Left Brand / Category Logo Area */}
              <div className="w-1/2 pr-3 flex flex-col justify-center">
                <h4
                  className={`font-black text-2xl tracking-tighter leading-none ${offer.brandColor} group-hover:scale-105 transition-transform origin-left`}
                >
                  {offer.brandName}
                </h4>
                <p className={`font-serif italic text-sm font-semibold mt-1 ${offer.subBrandColor}`}>
                  {offer.subBrand}
                </p>
              </div>

              {/* Center Divider Line */}
              <div className={`w-[2px] h-20 ${offer.dividerColor} shrink-0`} />

              {/* Right Discount Info */}
              <div className="w-1/2 pl-4 flex flex-col justify-center text-left">
                <div className="flex items-baseline space-x-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {offer.discountPrefix}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900 leading-none">
                    {offer.discountAmount}
                  </span>
                  <span className="text-xs font-black uppercase text-stone-900">
                    {offer.discountLabel}
                  </span>
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mt-1.5 ${offer.targetColor} leading-tight`}
                >
                  {offer.discountTarget}
                </p>
              </div>
            </div>

            {/* Bottom Ticker Marquee Ribbon */}
            <div className={`${offer.ribbonBg} ${offer.ribbonTextColor} text-[10px] font-extrabold uppercase tracking-widest py-1.5 px-3 overflow-hidden whitespace-nowrap shadow-inner border-t border-black/10`}>
              <div className="flex items-center space-x-4 animate-pulse">
                <span>FLASH SALE</span>
                <span>•</span>
                <span>FLASH SALE</span>
                <span>•</span>
                <span>FLASH SALE</span>
                <span>•</span>
                <span>FLASH SALE</span>
                <span>•</span>
                <span>FLASH SALE</span>
                <span>•</span>
                <span>FLASH SALE</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
