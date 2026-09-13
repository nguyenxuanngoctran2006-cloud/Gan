import React from 'react';
import { ShieldCheck, Flame, Heart, Volume2, VolumeX, BookOpen, RotateCcw, Zap } from 'lucide-react';
import { GameMode } from '../types';

interface NavbarProps {
  score: number;
  streak: number;
  lives: number;
  maxLives: number;
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
  onRestart: () => void;
  speedrunTimeLeft?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  score,
  streak,
  lives,
  maxLives,
  currentMode,
  onSelectMode,
  isSoundOn,
  onToggleSound,
  onOpenGuide,
  onRestart,
  speedrunTimeLeft
}) => {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand logo & tagline */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                GAN Detective
              </h1>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                AI vs THẬT
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Trò chơi soi dấu vết & kiểm chứng ảnh Deepfake
            </p>
          </div>
        </div>

        {/* Mode selector pills */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            type="button"
            id="nav-mode-duel"
            onClick={() => onSelectMode('duel')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              currentMode === 'duel'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚔️ Đối đầu (2 ảnh)</span>
          </button>
          <button
            type="button"
            id="nav-mode-single"
            onClick={() => onSelectMode('single')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              currentMode === 'single'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔍 Thẩm định (1 ảnh)</span>
          </button>
          <button
            type="button"
            id="nav-mode-speedrun"
            onClick={() => onSelectMode('speedrun')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              currentMode === 'speedrun'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Tốc biến 60s</span>
          </button>
        </div>

        {/* Stats & Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Speedrun timer or Lives */}
          {currentMode === 'speedrun' ? (
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg text-amber-300 font-mono font-bold text-sm">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{speedrunTimeLeft ?? 60}s</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
              {Array.from({ length: maxLives }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-all ${
                    i < lives
                      ? 'text-rose-500 fill-rose-500 scale-100'
                      : 'text-slate-700 fill-slate-800 scale-90'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Streak indicator */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
              streak >= 3
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 animate-pulse shadow-sm shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
            title="Chuỗi phán đoán chính xác liên tiếp"
          >
            <Flame className={`w-3.5 h-3.5 ${streak >= 3 ? 'text-orange-400' : 'text-slate-500'}`} />
            <span>x{streak}</span>
          </div>

          {/* Score */}
          <div className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-xs font-semibold text-slate-200">
            <span className="text-slate-400 text-[10px] block uppercase leading-none">Điểm</span>
            <span className="text-sm font-mono text-cyan-300 font-bold">{score}</span>
          </div>

          {/* Guide button */}
          <button
            type="button"
            id="nav-guide-btn"
            onClick={onOpenGuide}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="Mở cẩm nang soi dấu vết GAN"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            id="nav-sound-btn"
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title={isSoundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Restart button */}
          <button
            type="button"
            id="nav-restart-btn"
            onClick={onRestart}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title="Chơi lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
