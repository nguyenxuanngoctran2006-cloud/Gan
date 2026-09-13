import React, { useState, useRef } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { ArtifactClue } from '../types';

interface MagnifierViewerProps {
  idPrefix: string;
  imageUrl: string;
  alt: string;
  showClues?: boolean;
  clues?: ArtifactClue[];
  activeClueId?: string | null;
  onSelectClue?: (clue: ArtifactClue) => void;
  badgeText?: string;
  badgeType?: 'default' | 'gan' | 'real' | 'choice';
  isInteractive?: boolean;
  onClickImage?: () => void;
  isSelected?: boolean;
  isCorrectSelection?: boolean | null;
}

export const MagnifierViewer: React.FC<MagnifierViewerProps> = ({
  idPrefix,
  imageUrl,
  alt,
  showClues = false,
  clues = [],
  activeClueId,
  onSelectClue,
  badgeText,
  badgeType = 'default',
  isInteractive = true,
  onClickImage,
  isSelected = false,
  isCorrectSelection = null
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 }); // In pixels relative to container
  const [lensPercent, setLensPercent] = useState({ x: 50, y: 50 }); // In % for background positioning
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const LENS_SIZE = 140;
  const ZOOM_FACTOR = 2.4;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Clamp within image bounds
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const clampedY = Math.max(0, Math.min(y, rect.height));

    setLensPosition({
      x: clampedX,
      y: clampedY
    });

    setLensPercent({
      x: (clampedX / rect.width) * 100,
      y: (clampedY / rect.height) * 100
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const clampedX = Math.max(0, Math.min(x, rect.width));
    const clampedY = Math.max(0, Math.min(y, rect.height));

    setLensPosition({ x: clampedX, y: clampedY });
    setLensPercent({
      x: (clampedX / rect.width) * 100,
      y: (clampedY / rect.height) * 100
    });
  };

  const getBorderColor = () => {
    if (isCorrectSelection === true) return 'border-emerald-500 ring-4 ring-emerald-500/30';
    if (isCorrectSelection === false) return 'border-rose-500 ring-4 ring-rose-500/30';
    if (isSelected) return 'border-cyan-400 ring-4 ring-cyan-500/40';
    return 'border-slate-800 hover:border-slate-700';
  };

  return (
    <div className="relative group w-full flex flex-col items-center">
      {/* Top action/badge bar */}
      <div className="w-full flex items-center justify-between mb-2 px-1">
        {badgeText ? (
          <span
            id={`${idPrefix}-badge`}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
              badgeType === 'gan'
                ? 'bg-rose-500/10 text-rose-300 border-rose-500/40'
                : badgeType === 'real'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
                : badgeType === 'choice'
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            {badgeText}
          </span>
        ) : <div />}

        {/* Magnifier Toggle Button */}
        <button
          type="button"
          id={`${idPrefix}-toggle-magnifier`}
          onClick={(e) => {
            e.stopPropagation();
            setIsMagnifierActive(!isMagnifierActive);
          }}
          className={`text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all ${
            isMagnifierActive
              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
          }`}
          title="Bật/Tắt kính lúp soi chi tiết võng mạc, răng, chân tóc"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isMagnifierActive ? 'Đang soi lúp' : 'Kính lúp'}</span>
        </button>
      </div>

      {/* Main image container */}
      <div
        ref={containerRef}
        id={`${idPrefix}-image-container`}
        className={`relative w-full aspect-square rounded-2xl overflow-hidden cursor-crosshair border-2 bg-slate-900 transition-all select-none ${getBorderColor()}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => {
          setIsHovering(true);
          setIsMagnifierActive(true);
        }}
        onTouchEnd={() => setIsHovering(false)}
        onTouchMove={handleTouchMove}
        onClick={() => {
          if (!isMagnifierActive && onClickImage && isInteractive) {
            onClickImage();
          }
        }}
      >
        <img
          src={imageUrl}
          alt={alt}
          id={`${idPrefix}-img`}
          className="w-full h-full object-cover pointer-events-none transition-transform duration-300"
          loading="lazy"
        />

        {/* Magnifier Lens Float */}
        {(isHovering || isMagnifierActive) && (
          <div
            className="absolute pointer-events-none rounded-full border-2 border-cyan-400 shadow-2xl overflow-hidden z-20"
            style={{
              width: `${LENS_SIZE}px`,
              height: `${LENS_SIZE}px`,
              left: `${lensPosition.x - LENS_SIZE / 2}px`,
              top: `${lensPosition.y - LENS_SIZE / 2}px`,
              boxShadow: '0 0 0 2px rgba(6, 182, 212, 0.4), 0 20px 25px -5px rgba(0, 0, 0, 0.7)',
              backgroundImage: `url(${imageUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `${lensPercent.x}% ${lensPercent.y}%`,
              backgroundSize: `${ZOOM_FACTOR * 100}%`
            }}
          >
            {/* Crosshair inside magnifier */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-px bg-cyan-400/80" />
              <div className="h-4 w-px bg-cyan-400/80 absolute" />
            </div>
            <div className="absolute bottom-1 right-2 text-[9px] font-mono text-cyan-300 font-bold bg-slate-950/80 px-1 rounded">
              2.4x
            </div>
          </div>
        )}

        {/* Clue hotspot markers when revealing results */}
        {showClues && clues.map((clue) => {
          const isActive = activeClueId === clue.id;
          return (
            <button
              key={clue.id}
              type="button"
              id={`${idPrefix}-clue-${clue.id}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectClue) onSelectClue(clue);
              }}
              style={{
                left: `${clue.x}%`,
                top: `${clue.y}%`
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 scale-125 shadow-lg shadow-amber-400/50 ring-4 ring-amber-300/40'
                  : 'bg-rose-500 text-white hover:scale-110 shadow-md ring-2 ring-white/60 animate-pulse'
              }`}
              title={clue.label}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          );
        })}

        {/* Tap/click prompt overlay for interactive selection */}
        {isInteractive && !isMagnifierActive && (
          <div className="absolute inset-x-0 bottom-0 py-2.5 px-3 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium text-slate-200 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-sm shadow">
              Nhấn để chọn ảnh này
            </span>
          </div>
        )}
      </div>

      {/* Clue badge list below image if showing clues */}
      {showClues && clues.length > 0 && (
        <div className="w-full mt-2.5 flex flex-wrap gap-1.5 justify-center">
          {clues.map((clue) => (
            <button
              key={clue.id}
              type="button"
              onClick={() => onSelectClue && onSelectClue(clue)}
              className={`text-[11px] px-2 py-1 rounded border transition-all ${
                activeClueId === clue.id
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/60 font-semibold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              📍 {clue.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
