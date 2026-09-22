import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Sparkles, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import cosmeticVideo from '../assets/cosmetic-video.mp4';

export default function CampaignVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="bg-stone-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-800 grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Side: Video Player Container */}
        <div className="lg:col-span-7 relative aspect-video bg-stone-900 group overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          >
            <source src={cosmeticVideo} type="video/webm" />
            <source src={cosmeticVideo} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* Video Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Play/Pause & Mute Floating Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-stone-900/80 hover:bg-amber-600 text-white hover:text-stone-950 backdrop-blur-md border border-white/20 transition-all shadow-lg flex items-center space-x-2 text-xs font-bold uppercase tracking-wider"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Campaign' : 'Play Campaign'}</span>
            </button>

            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-stone-900/80 hover:bg-amber-600 text-white hover:text-stone-950 backdrop-blur-md border border-white/20 transition-all shadow-lg"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right Side: SUGAR Indian Model Campaign Info */}
        <div className="lg:col-span-5 p-8 sm:p-10 space-y-6 flex flex-col justify-center">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1 text-amber-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SUGAR x Aurora Beauty Campaign</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-white">
            Bold Matte Lip Crayons{' '}
            <span className="italic text-amber-300 font-light block">
              Made for Indian Skin Tones.
            </span>
          </h2>

          <p className="text-stone-300 text-sm leading-relaxed font-light">
            Watch Indian beauty icons showcase 16-hour transfer-proof matte lipsticks and intense pigment formulations designed for daily glam.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/shop?category=skincare"
              className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg"
            >
              <span>Shop Campaign Range</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
