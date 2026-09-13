/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DuelMode } from './components/DuelMode';
import { SingleInspectMode } from './components/SingleInspectMode';
import { SpeedrunMode } from './components/SpeedrunMode';
import { FieldGuideModal } from './components/FieldGuideModal';
import { GameOverModal } from './components/GameOverModal';
import { DUEL_PAIRS, IMAGE_DATABASE } from './data/dataset';
import { GameMode } from './types';
import { soundManager } from './utils/audio';
import { Eye, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('duel');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const MAX_LIVES = 3;

  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Index pointers
  const [duelRoundIndex, setDuelRoundIndex] = useState<number>(0);
  const [singleRoundIndex, setSingleRoundIndex] = useState<number>(0);

  // Modals & Sound
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  // Handle answers in Duel mode
  const handleDuelAnswer = (_choseGan: boolean, isCorrect: boolean) => {
    setTotalAnswered((prev) => prev + 1);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const bonus = newStreak >= 3 ? 50 : 0;
      setScore((s) => s + 100 + bonus);
    } else {
      setStreak(0);
      setLives((l) => {
        const next = l - 1;
        if (next <= 0) {
          setTimeout(() => {
            soundManager.playGameOver();
            setIsGameOver(true);
          }, 600);
        }
        return Math.max(0, next);
      });
    }

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNextDuelRound = () => {
    if (duelRoundIndex + 1 >= DUEL_PAIRS.length) {
      // Finished all duel pairs
      setIsGameOver(true);
    } else {
      setDuelRoundIndex((idx) => idx + 1);
    }
  };

  // Handle answers in Single Inspect mode
  const handleSingleAnswer = (_userGuessIsGan: boolean, isCorrect: boolean) => {
    setTotalAnswered((prev) => prev + 1);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const bonus = newStreak >= 3 ? 50 : 0;
      setScore((s) => s + 100 + bonus);
      setCorrectCount((c) => c + 1);
    } else {
      setStreak(0);
      setLives((l) => {
        const next = l - 1;
        if (next <= 0) {
          setTimeout(() => {
            soundManager.playGameOver();
            setIsGameOver(true);
          }, 600);
        }
        return Math.max(0, next);
      });
    }
  };

  const handleNextSingleRound = () => {
    if (singleRoundIndex + 1 >= IMAGE_DATABASE.length) {
      setIsGameOver(true);
    } else {
      setSingleRoundIndex((idx) => idx + 1);
    }
  };

  // Handle Speedrun finish
  const handleFinishSpeedrun = (
    finalScore: number,
    correct: number,
    streakMax: number,
    total: number
  ) => {
    setScore(finalScore);
    setCorrectCount(correct);
    setMaxStreak(streakMax);
    setTotalAnswered(total);
    setIsGameOver(true);
  };

  // Restart game
  const handleRestart = () => {
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setLives(MAX_LIVES);
    setTotalAnswered(0);
    setCorrectCount(0);
    setDuelRoundIndex(0);
    setSingleRoundIndex(0);
    setIsGameOver(false);
  };

  // Switch mode
  const handleSelectMode = (mode: GameMode) => {
    setCurrentMode(mode);
    handleRestart();
  };

  const toggleSound = () => {
    const updated = soundManager.toggleSound();
    setIsSoundOn(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        score={score}
        streak={streak}
        lives={lives}
        maxLives={MAX_LIVES}
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        isSoundOn={isSoundOn}
        onToggleSound={toggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
        onRestart={handleRestart}
      />

      {/* Main Game Stage */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 flex flex-col items-center justify-start">
        {currentMode === 'duel' && (
          <DuelMode
            key={`duel-round-${duelRoundIndex}`}
            pair={DUEL_PAIRS[duelRoundIndex % DUEL_PAIRS.length]}
            roundIndex={duelRoundIndex}
            totalRounds={DUEL_PAIRS.length}
            onAnswer={handleDuelAnswer}
            onNextRound={handleNextDuelRound}
          />
        )}

        {currentMode === 'single' && (
          <SingleInspectMode
            key={`single-round-${singleRoundIndex}`}
            imageItem={IMAGE_DATABASE[singleRoundIndex % IMAGE_DATABASE.length]}
            roundIndex={singleRoundIndex}
            totalRounds={IMAGE_DATABASE.length}
            onAnswer={handleSingleAnswer}
            onNextRound={handleNextSingleRound}
          />
        )}

        {currentMode === 'speedrun' && (
          <SpeedrunMode
            images={IMAGE_DATABASE}
            onFinishSpeedrun={handleFinishSpeedrun}
          />
        )}

        {/* Quick Tips Footer Banner */}
        <div className="w-full max-w-3xl mt-10 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200 block">
                Mẹo Thám tử nhanh:
              </span>
              <span>
                Soi kỹ 2 con ngươi mắt: nếu góc phản chiếu ánh sáng khác nhau thì 99% là GAN tạo dựng!
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold border border-slate-700 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Xem 6 mẹo GAN</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          <span>GAN Detective • Trò chơi tương tác rèn luyện thị giác phân biệt AI Deepfake & Người Thật</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </footer>

      {/* Modals */}
      <FieldGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <GameOverModal
        isOpen={isGameOver}
        score={score}
        maxStreak={maxStreak}
        correctCount={correctCount}
        totalAnswered={totalAnswered}
        mode={currentMode}
        onRestart={handleRestart}
        onSwitchMode={handleSelectMode}
      />
    </div>
  );
}
