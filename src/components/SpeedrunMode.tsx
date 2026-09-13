import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Bot, Zap, Flame, Award } from 'lucide-react';
import { ImageItem } from '../types';
import { soundManager } from '../utils/audio';

interface SpeedrunModeProps {
  images: ImageItem[];
  onFinishSpeedrun: (finalScore: number, correctCount: number, maxStreak: number, totalAnswered: number) => void;
}

export const SpeedrunMode: React.FC<SpeedrunModeProps> = ({
  images,
  onFinishSpeedrun
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);

  const currentImage = images[currentIndex % images.length];

  // Start speedrun on mount or restart
  const startSpeedrun = useCallback(() => {
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setTotalAnswered(0);
    setCurrentIndex(0);
    setLastResult(null);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    startSpeedrun();
  }, [startSpeedrun]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          soundManager.playGameOver();
          onFinishSpeedrun(score, correctCount, maxStreak, totalAnswered);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, score, correctCount, maxStreak, totalAnswered, onFinishSpeedrun]);

  const handleGuess = (guessGan: boolean) => {
    if (!isRunning) return;

    const isCorrect = guessGan === currentImage.isGAN;
    const newTotal = totalAnswered + 1;
    setTotalAnswered(newTotal);

    if (isCorrect) {
      soundManager.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      const points = 100 * multiplier;
      setScore((s) => s + points);
      setCorrectCount((c) => c + 1);
      setLastResult('correct');
    } else {
      soundManager.playWrong();
      setStreak(0);
      setLastResult('wrong');
    }

    // Flash result and immediately advance
    setTimeout(() => {
      setLastResult(null);
      setCurrentIndex((idx) => (idx + 1) % images.length);
    }, 280);
  };

  // Keyboard shortcut listener: Left arrow / A = Real, Right arrow / D = GAN
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isRunning) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleGuess(false);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleGuess(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, currentImage, totalAnswered, streak, maxStreak]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top HUD */}
      <div className="w-full max-w-md flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2.5 mb-4 shadow-lg">
        {/* Timer */}
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${timeLeft <= 10 ? 'bg-rose-500/20 text-rose-400 animate-ping' : 'bg-amber-500/20 text-amber-400'}`}>
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Thời gian</span>
            <span className={`text-base font-mono font-bold ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Multiplier / Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800">
          <Flame className={`w-4 h-4 ${streak >= 3 ? 'text-orange-400 animate-bounce' : 'text-slate-500'}`} />
          <span className="text-xs font-bold text-orange-300">
            Combo x{streak >= 5 ? '3' : streak >= 3 ? '2' : '1'} ({streak})
          </span>
        </div>

        {/* Speedrun Score */}
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Điểm</span>
          <span className="text-base font-mono font-bold text-cyan-300">{score}</span>
        </div>
      </div>

      {/* Speedrun Image Card */}
      <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-2 bg-slate-900 shadow-2xl transition-all">
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="w-full h-full object-cover"
        />

        {/* Rapid flash feedback overlay */}
        {lastResult === 'correct' && (
          <div className="absolute inset-0 bg-emerald-500/30 border-4 border-emerald-400 flex items-center justify-center animate-in fade-in duration-100">
            <span className="text-2xl font-black text-emerald-300 bg-slate-950/80 px-4 py-2 rounded-2xl border border-emerald-400">
              ĐÚNG! +{streak >= 5 ? 300 : streak >= 3 ? 200 : 100}
            </span>
          </div>
        )}
        {lastResult === 'wrong' && (
          <div className="absolute inset-0 bg-rose-500/30 border-4 border-rose-400 flex items-center justify-center animate-in fade-in duration-100">
            <span className="text-2xl font-black text-rose-300 bg-slate-950/80 px-4 py-2 rounded-2xl border border-rose-400">
              SAI RỒI!
            </span>
          </div>
        )}

        {/* Key hint badges */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] text-slate-300 font-mono">
          Phím [A] hoặc [◀]: Thật
        </div>
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] text-slate-300 font-mono">
          Phím [D] hoặc [▶]: GAN
        </div>
      </div>

      {/* Speedrun Action Buttons */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mt-4">
        <button
          type="button"
          id="speedrun-real-btn"
          onClick={() => handleGuess(false)}
          className="py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-sm transition-all shadow-lg shadow-emerald-950/40 flex flex-col items-center justify-center gap-1 border border-emerald-400/40"
        >
          <Camera className="w-5 h-5" />
          <span>ẢNH THẬT [A]</span>
        </button>

        <button
          type="button"
          id="speedrun-gan-btn"
          onClick={() => handleGuess(true)}
          className="py-4 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-extrabold text-sm transition-all shadow-lg shadow-rose-950/40 flex flex-col items-center justify-center gap-1 border border-rose-400/40"
        >
          <Bot className="w-5 h-5" />
          <span>ẢNH GAN [D]</span>
        </button>
      </div>

      <div className="text-center mt-3 text-xs text-slate-400 flex items-center justify-center gap-2">
        <Award className="w-3.5 h-3.5 text-cyan-400" />
        <span>Phản xạ càng nhanh, điểm thưởng combo càng cao!</span>
      </div>
    </div>
  );
};
