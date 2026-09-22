import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'Organic Botanical Elixirs',
    title: 'Illuminate Your Natural',
    highlightTitle: 'Radiance.',
    description:
      'Discover clinical-grade botanical formulations crafted with bio-active plant concentrates to restore, hydrate, and rejuvenate your skin barrier.',
    primaryBtnText: 'Explore Collection',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Discover Serums',
    secondaryBtnLink: '/shop?category=skincare',
    image:
      'https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    tag: 'Cellular Hydration Nectar',
    title: 'Deep Moisture & Skin',
    highlightTitle: 'Vitality.',
    description:
      'Infused with triple-weight hyaluronic acid and snow mushroom extract for 72-hour intense cellular hydration.',
    primaryBtnText: 'Shop Hydration',
    primaryBtnLink: '/shop?category=skincare',
    secondaryBtnText: 'View Best Sellers',
    secondaryBtnLink: '/shop',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 3,
    tag: 'Artisanal Perfumery',
    title: 'Warm Amber & Golden',
    highlightTitle: 'Sandalwood.',
    description:
      'An intoxicating eau de parfum blending wild Mysore sandalwood, golden amber resin, and hand-harvested jasmine.',
    primaryBtnText: 'Explore Fragrance',
    primaryBtnLink: '/shop?category=fragrance',
    secondaryBtnText: 'Discover Notes',
    secondaryBtnLink: '/shop',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 4,
    tag: 'Velvet Cleansers',
    title: 'Nourishing Milk & Oil',
    highlightTitle: 'Rituals.',
    description:
      'Gently melt away waterproof makeup and environmental impurities while drenching your skin in cold-pressed seed oils.',
    primaryBtnText: 'Shop Cleansers',
    primaryBtnLink: '/shop?category=cleanser',
    secondaryBtnText: 'Explore All',
    secondaryBtnLink: '/shop',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=80',
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div
      className="relative bg-stone-950 text-white overflow-hidden min-h-[560px] sm:min-h-[640px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Crossfade */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="max-w-2xl">
          {/* Slide Tag Badge */}
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md transition-all duration-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SLIDES[currentSlide].tag}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight tracking-wide mb-6 min-h-[120px] sm:min-h-[150px]">
            {SLIDES[currentSlide].title}{' '}
            <span className="italic font-light text-amber-300 block sm:inline">
              {SLIDES[currentSlide].highlightTitle}
            </span>
          </h1>

          {/* Description */}
          <p className="text-stone-300 text-base sm:text-lg mb-8 leading-relaxed font-light min-h-[72px]">
            {SLIDES[currentSlide].description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to={SLIDES[currentSlide].primaryBtnLink}
              className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-amber-500/25"
            >
              <span>{SLIDES[currentSlide].primaryBtnText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={SLIDES[currentSlide].secondaryBtnLink}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center backdrop-blur-md transition-all border border-white/20"
            >
              {SLIDES[currentSlide].secondaryBtnText}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 z-30 p-3 rounded-full bg-stone-900/40 hover:bg-amber-600 text-white hover:text-stone-950 backdrop-blur-md border border-white/10 transition-all shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 z-30 p-3 rounded-full bg-stone-900/40 hover:bg-amber-600 text-white hover:text-stone-950 backdrop-blur-md border border-white/10 transition-all shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center space-x-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? 'w-8 h-2.5 bg-amber-500'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
