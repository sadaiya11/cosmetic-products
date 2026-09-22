import { useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdvertisementVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="campaign-title">
      <div className="relative overflow-hidden rounded-3xl bg-stone-950 shadow-2xl isolate">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label="Aurora beauty campaign video"
        >
          <source src="/aurora-campaign.webm" type="video/webm" />
          Your browser does not support campaign videos.
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/75 to-stone-950/20" />

        <div className="relative min-h-[360px] sm:min-h-[420px] flex items-end p-7 sm:p-12">
          <div className="max-w-md text-white">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300">
              Aurora film
            </p>
            <h2 id="campaign-title" className="font-serif text-3xl sm:text-5xl leading-tight">
              Rituals made to be <span className="italic text-amber-300">seen.</span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-200 sm:text-base">
              Discover considered beauty essentials designed for your everyday glow.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex rounded-full bg-amber-400 px-5 py-3 text-xs font-bold uppercase tracking-widest text-stone-950 transition-colors hover:bg-amber-300"
            >
              Shop the edit
            </Link>
          </div>
        </div>

        <div className="absolute right-5 top-5 flex gap-2">
          <button
            type="button"
            onClick={togglePlayback}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-stone-950/55 text-white backdrop-blur transition-colors hover:bg-stone-950/80"
            aria-label={isPlaying ? 'Pause campaign video' : 'Play campaign video'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-stone-950/55 text-white backdrop-blur transition-colors hover:bg-stone-950/80"
            aria-label={isMuted ? 'Turn on campaign video sound' : 'Mute campaign video'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
