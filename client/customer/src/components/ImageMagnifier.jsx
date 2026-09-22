import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export default function ImageMagnifier({
  src,
  alt = 'Product image',
  zoomLevel = 2.5,
}) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [zoomPos, setZoomPos] = useState({ xPercent: 0, yPercent: 0 });

  const LENS_WIDTH = 120;
  const LENS_HEIGHT = 120;

  const handleMouseMove = (e) => {
    const elem = e.currentTarget;
    const { left, top, width, height } = elem.getBoundingClientRect();

    // Calculate cursor position relative to the image
    let x = e.clientX - left;
    let y = e.clientY - top;

    // Clamp coordinates within bounds
    x = Math.max(0, Math.min(x, width));
    y = Math.max(0, Math.min(y, height));

    // Calculate percentage (0% to 100%)
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    // Lens position (centered around cursor)
    const lensX = Math.max(0, Math.min(x - LENS_WIDTH / 2, width - LENS_WIDTH));
    const lensY = Math.max(0, Math.min(y - LENS_HEIGHT / 2, height - LENS_HEIGHT));

    setLensPos({ x: lensX, y: lensY });
    setZoomPos({ xPercent, yPercent });
  };

  return (
    <div className="relative w-full h-full select-none">
      {/* Main Product Image Container */}
      <div
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseMove}
        className="relative w-full h-full cursor-crosshair overflow-hidden rounded-3xl bg-stone-100 border border-stone-200 shadow-lg group"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Hover Hint Badge */}
        {!showMagnifier && (
          <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center space-x-1.5 z-10 pointer-events-none shadow-md">
            <ZoomIn className="w-3.5 h-3.5 text-pink-400" />
            <span>Hover to zoom</span>
          </div>
        )}

        {/* Translucent Tracking Lens Box */}
        {showMagnifier && (
          <div
            className="absolute border-2 border-pink-500 bg-white/30 backdrop-blur-[1px] pointer-events-none rounded-xl shadow-md z-20 transition-all duration-75"
            style={{
              left: `${lensPos.x}px`,
              top: `${lensPos.y}px`,
              width: `${LENS_WIDTH}px`,
              height: `${LENS_HEIGHT}px`,
            }}
          />
        )}
      </div>

      {/* Floating Magnified Zoom Window Overlay matching Nykaa */}
      {showMagnifier && (
        <div
          className="absolute top-0 left-0 lg:left-[102%] z-50 w-full sm:w-[450px] lg:w-[520px] h-full sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-500/40 bg-white pointer-events-none transition-opacity duration-200 hidden sm:block"
          style={{
            backgroundImage: `url("${src}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: `${zoomPos.xPercent}% ${zoomPos.yPercent}%`,
          }}
        >
          {/* Zoom Overlay Indicator Badge */}
          <div className="absolute top-4 right-4 bg-stone-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md z-10 shadow-md">
            HD Magnifier {zoomLevel}x
          </div>
        </div>
      )}
    </div>
  );
}
