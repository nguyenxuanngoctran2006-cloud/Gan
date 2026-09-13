import React, { useState } from 'react';
import { MagnifierViewer } from './MagnifierViewer';
import { RoundFeedback } from './RoundFeedback';
import { ArtifactClue, ImageItem } from '../types';
import { Camera, Bot, Sparkles, ZoomIn } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface SingleInspectModeProps {
  imageItem: ImageItem;
  roundIndex: number;
  totalRounds: number;
  onAnswer: (userGuessIsGan: boolean, isCorrect: boolean) => void;
  onNextRound: () => void;
}

export const SingleInspectMode: React.FC<SingleInspectModeProps> = ({
  imageItem,
  roundIndex,
  totalRounds,
  onAnswer,
  onNextRound
}) => {
  const [userGuessIsGan, setUserGuessIsGan] = useState<boolean | null>(null);
  const [activeClue, setActiveClue] = useState<ArtifactClue | null>(null);

  const hasAnswered = userGuessIsGan !== null;
  const isCorrect = userGuessIsGan === imageItem.isGAN;

  const handleChoose = (guessGan: boolean) => {
    if (hasAnswered) return;
    setUserGuessIsGan(guessGan);
    soundManager.playClick();

    const correct = guessGan === imageItem.isGAN;
    if (correct) {
      soundManager.playCorrect();
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 }
      });
    } else {
      soundManager.playWrong();
    }

    onAnswer(guessGan, correct);
  };

  const handleNext = () => {
    setUserGuessIsGan(null);
    setActiveClue(null);
    onNextRound();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title & prompt */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vòng {roundIndex + 1} / {totalRounds} • Chế độ Thẩm định Vi mô</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Bức ảnh này là NGƯỜI THẬT hay do GAN TỔNG HỢP?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center justify-center gap-1.5">
          <ZoomIn className="w-4 h-4 text-cyan-400" />
          <span>Dùng chuột / tay rà kính lúp để soi phản quang mắt, khuyên tai và gọng kính</span>
        </p>
      </div>

      {/* Main Single Image Viewer */}
      <div className="w-full max-w-md flex flex-col items-center">
        <MagnifierViewer
          idPrefix="single-inspect"
          imageUrl={imageItem.url}
          alt={imageItem.title}
          showClues={hasAnswered && imageItem.isGAN}
          clues={imageItem.isGAN ? imageItem.clues : []}
          activeClueId={activeClue?.id}
          onSelectClue={(c) => setActiveClue(c)}
          badgeText={
            hasAnswered
              ? imageItem.isGAN
                ? '🤖 GAN / AI TẠO DỰNG'
                : '📷 ẢNH CHỤP THỰC TẾ'
              : undefined
          }
          badgeType={
            hasAnswered ? (imageItem.isGAN ? 'gan' : 'real') : 'default'
          }
          isInteractive={false}
          isCorrectSelection={hasAnswered ? isCorrect : null}
        />

        {/* Choice Action Buttons */}
        {!hasAnswered ? (
          <div className="w-full grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              id="btn-guess-real"
              onClick={() => handleChoose(false)}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-emerald-400 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <Camera className="w-4 h-4 text-emerald-400 group-hover:text-slate-950 transition-colors" />
              <span>Ảnh Chụp Thật</span>
            </button>

            <button
              type="button"
              id="btn-guess-gan"
              onClick={() => handleChoose(true)}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-rose-500 hover:text-white text-slate-200 border border-slate-700 hover:border-rose-400 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <Bot className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors" />
              <span>GAN / AI Tạo Ra</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* Answer feedback card */}
      {hasAnswered && (
        <RoundFeedback
          isCorrect={isCorrect}
          userSelectionLabel={userGuessIsGan ? 'Ảnh do GAN tạo ra' : 'Ảnh người thật'}
          ganImage={imageItem.isGAN ? imageItem : { ...imageItem, isGAN: true, modelOrSource: 'Tham chiếu AI' }}
          realImage={!imageItem.isGAN ? imageItem : undefined}
          activeClue={activeClue}
          onSelectClue={(c) => setActiveClue(c)}
          onNext={handleNext}
        />
      )}
    </div>
  );
};
