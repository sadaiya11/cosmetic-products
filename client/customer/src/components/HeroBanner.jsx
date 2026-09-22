import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

import heroIndian1 from '../assets/hero_indian_1.jpg';
import heroIndian2 from '../assets/hero_indian_2.jpg';
import heroIndian3 from '../assets/hero_indian_3.jpg';

const SLIDES = [
  {
    id: 1,
    tag: 'Curated By Aurora',
    title: 'Your Curated Beauty',
    highlightTitle: 'Destination.',
    image: heroIndian1,
  },
  {
    id: 2,
    tag: 'The Perfect Finish',
    title: 'Soft Glam. Bold',
    highlightTitle: 'Presence.',
    image: heroIndian2,
  },
  {
    id: 3,
    tag: 'Meet Your Match',
    title: 'Color That Melts Into',
    highlightTitle: 'Skin.',
    image: heroIndian3,
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
      className="relative bg-stone-950 text-white overflow-hidden h-[480px] sm:h-[580px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Smooth Crossfade */}
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
            className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-7000"
          />
          {/* Subtle Ambient Overlay for Maximum Photo Warmth & Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/20" />
        </div>
      ))}

      {/* Hero Content Overlay - Positioned Compactly at Bottom Right */}
      <div className="absolute bottom-16 right-6 sm:right-16 z-20 max-w-xs sm:max-w-sm w-full">
        <div className="bg-stone-950/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl space-y-2">
          {/* Slide Tag Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-amber-500/20 border border-amber-500/40 rounded-full px-3 py-1 text-amber-300 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            <span>{SLIDES[currentSlide].tag}</span>
          </div>

          {/* Compact Title Text */}
          <h2 className="font-serif text-lg sm:text-2xl font-normal leading-snug tracking-wide text-white drop-shadow-md">
            {SLIDES[currentSlide].title}{' '}
            <span className="italic font-light text-amber-300 block">
              {SLIDES[currentSlide].highlightTitle}
            </span>
          </h2>
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
                ? 'w-8 h-2.5 bg-amber-500 shadow-md'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
