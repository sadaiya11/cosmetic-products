import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import bannerImg from '../assets/science_backed_banner.png';
import brandsImg from '../assets/science_backed_brands.png';

const SCIENCE_BRANDS = [
  {
    id: 'lakme',
    name: 'LAKMÉ',
    subtitle: 'SKIN',
    bgColor: 'bg-sky-100',
    hoverBorder: 'hover:border-sky-400',
    category: 'skincare',
    textColor: 'text-stone-900',
    fontStyle: 'font-black tracking-wider',
  },
  {
    id: 'ponds',
    name: "POND'S",
    subtitle: 'DERMA CARE',
    bgColor: 'bg-sky-100',
    hoverBorder: 'hover:border-sky-400',
    category: 'moisturizer',
    textColor: 'text-sky-950',
    fontStyle: 'font-serif font-bold tracking-tight',
  },
  {
    id: 'simple',
    name: 'Simple',
    subtitle: 'KIND TO SKIN',
    bgColor: 'bg-sky-100',
    hoverBorder: 'hover:border-emerald-400',
    category: 'cleanser',
    textColor: 'text-emerald-700',
    fontStyle: 'font-sans font-extrabold tracking-tight',
  },
  {
    id: 'vaseline',
    name: 'Vaseline',
    subtitle: 'HEALTHY BRIGHT',
    bgColor: 'bg-sky-100',
    hoverBorder: 'hover:border-blue-500',
    category: 'skincare',
    textColor: 'text-blue-700',
    fontStyle: 'font-sans font-black italic tracking-wide',
  },
  {
    id: 'novology',
    name: 'NOVOLOGY',
    subtitle: 'CO-CREATED WITH DERMATOLOGISTS',
    bgColor: 'bg-sky-100',
    hoverBorder: 'hover:border-indigo-400',
    category: 'skincare',
    textColor: 'text-stone-900',
    fontStyle: 'font-sans font-bold tracking-widest text-xs',
  },
];

const CALLOUT_PRODUCTS = [
  {
    id: 'p1',
    title: 'Hyaluronic Moisturizer',
    brand: "Pond's Super Light Gel",
    benefit: '72hr hydration & oil-free glow',
  },
  {
    id: 'p2',
    title: 'AHA - BHA Lotion',
    brand: 'Vaseline Gluta-Hya',
    benefit: 'Gentle exfoliating skin renewal',
  },
  {
    id: 'p3',
    title: 'Peptide Lip balm',
    brand: 'Lakmé Lip Love',
    benefit: 'Intense 24h nourishment',
  },
  {
    id: 'p4',
    title: 'Pro-ceramide Facewash',
    brand: 'Simple Barrier Repair',
    benefit: 'Strengthens moisture barrier',
  },
  {
    id: 'p5',
    title: 'Bi-Phasic Serum',
    brand: 'Novology Pigmentation',
    benefit: 'Targets dark spots & hyperpigmentation',
  },
];

export default function ScienceBackedSection() {
  const navigate = useNavigate();
  const [activeBrand, setActiveBrand] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Main Container with Customizable Sky Blue Science-Backed Theme */}
      <div className="bg-gradient-to-br from-[#d9f2ff] via-[#e8f7ff] to-[#cbe9fc] rounded-3xl p-6 sm:p-10 shadow-xl border border-sky-200/80 overflow-hidden relative">
        
        {/* Top Header & Banner Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side Typography & CTA */}
          <div className="lg:col-span-4 space-y-5 z-10">
            <div className="inline-flex items-center space-x-2 bg-sky-900/10 border border-sky-900/20 rounded-full px-3.5 py-1 text-sky-900 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" />
              <span>Dermatologist Approved</span>
            </div>

            <div>
              <h2 className="font-serif italic font-extrabold text-3xl sm:text-4xl text-sky-950 leading-tight tracking-tight">
                Science-Backed Essentials
              </h2>
              <p className="text-sky-900 text-lg sm:text-xl font-bold mt-2">
                Up To 50% Off On Bestsellers
              </p>
            </div>

            <p className="text-sky-800 text-xs sm:text-sm font-medium leading-relaxed max-w-sm">
              Formulated with high-potency Hyaluronic Acid, Peptides, Pro-Ceramides & AHA-BHA for visible skin transformation.
            </p>

            {/* Circular Right Arrow Action Button */}
            <div className="pt-2">
              <button
                onClick={() => navigate('/shop?category=skincare')}
                className="group flex items-center space-x-3 bg-stone-950 hover:bg-sky-900 text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-sky-900/30"
              >
                <span>Explore Science Range</span>
                <div className="w-8 h-8 rounded-full bg-white text-stone-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Side: High-Res Banner Showcase Image */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden group shadow-md border border-sky-200 bg-white/40">
            <img
              src={bannerImg}
              alt="Science-Backed Essentials - Hyaluronic Moisturizer, AHA-BHA Lotion, Peptide Lip Balm, Pro-Ceramide Facewash, Bi-Phasic Serum"
              className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700"
            />
          </div>
        </div>

        {/* Interactive Product Callout Pills */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 border-t border-sky-300/40">
          {CALLOUT_PRODUCTS.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/shop?category=skincare')}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-3.5 border border-sky-200 hover:border-sky-400 hover:bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 block mb-0.5">
                {item.title}
              </span>
              <h4 className="font-serif font-bold text-xs text-stone-900 line-clamp-1 group-hover:text-sky-900">
                {item.brand}
              </h4>
              <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                {item.benefit}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Logos Strip Section */}
        <div className="mt-8 pt-6 border-t border-sky-300/60">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-900 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              <span>Featured Science Brands</span>
            </span>
            <span className="text-[11px] font-semibold text-sky-700">Click brand to view formulations</span>
          </div>

          {/* Brand Logo Grid matching attached design */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SCIENCE_BRANDS.map((brand) => (
              <div
                key={brand.id}
                onClick={() => navigate(`/shop?category=${brand.category}`)}
                onMouseEnter={() => setActiveBrand(brand.id)}
                onMouseLeave={() => setActiveBrand(null)}
                className={`bg-white rounded-2xl p-4 border border-sky-200 ${brand.hoverBorder} shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center h-24 group relative overflow-hidden`}
              >
                {/* Inner Light Blue Container Pill */}
                <div className="w-full h-full bg-[#d8effd] rounded-xl flex flex-col items-center justify-center p-2 group-hover:bg-[#c3e8ff] transition-colors">
                  <h4 className={`${brand.fontStyle} ${brand.textColor} group-hover:scale-105 transition-transform`}>
                    {brand.name}
                  </h4>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-stone-500 mt-1 line-clamp-1">
                    {brand.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
