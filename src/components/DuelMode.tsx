import React, { useState } from 'react';
import { MagnifierViewer } from './MagnifierViewer';
import { RoundFeedback } from './RoundFeedback';
import { ArtifactClue, DuelPair } from '../types';
import { Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface DuelModeProps {
  pair: DuelPair;
  roundIndex: number;
  totalRounds: number;
  onAnswer: (choseGan: boolean, isCorrect: boolean) => void;
  onNextRound: () => void;
}

export const DuelMode: React.FC<DuelModeProps> = ({
  pair,
  roundIndex,
  totalRounds,
  onAnswer,
  onNextRound
}) => {
  // Randomize which side gets the GAN image per round (left or right)
  // We use stable deterministic or state based position
  const [leftIsGan] = useState(() => Math.random() > 0.5);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);
  const [activeClue, setActiveClue] = useState<ArtifactClue | null>(null);

  const leftImage = leftIsGan ? pair.ganImage : pair.realImage;
  const rightImage = leftIsGan ? pair.realImage : pair.ganImage;

  const hasAnswered = selectedSide !== null;
  const userChoseGan = (selectedSide === 'left' && leftIsGan) || (selectedSide === 'right' && !leftIsGan);
  const isCorrect = userChoseGan;

  const handleChoose = (side: 'left' | 'right') => {
    if (hasAnswered) return;
    setSelectedSide(side);
    soundManager.playClick();

    const selectedImageIsGan = side === 'left' ? leftIsGan : !leftIsGan;
    if (selectedImageIsGan) {
      soundManager.playCorrect();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      soundManager.playWrong();
    }

    onAnswer(selectedImageIsGan, selectedImageIsGan);
  };

  const handleNext = () => {
    setSelectedSide(null);
    setActiveClue(null);
    onNextRound();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title & prompt header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vòng {roundIndex + 1} / {totalRounds} • Chế độ Đối đầu</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Bức ảnh nào dưới đây được tạo ra bởi GAN?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg mx-auto flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-cyan-400 inline" />
          <span>Gợi ý: {pair.comparisonHint}</span>
        </p>
      </div>

      {/* Side-by-side images */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Image Option */}
        <div className="flex flex-col items-center">
          <MagnifierViewer
            idPrefix="duel-left"
            imageUrl={leftImage.url}
            alt={leftImage.title}
            showClues={hasAnswered && leftIsGan}
            clues={leftIsGan ? leftImage.clues : []}
            activeClueId={activeClue?.id}
            onSelectClue={(c) => setActiveClue(c)}
            badgeText={
              hasAnswered
                ? leftIsGan
                  ? '🤖 AI / GAN TẠO DỰNG'
                  : '📷 ẢNH CHỤP THẬT'
                : 'Lựa chọn [A]'
            }
            badgeType={
              hasAnswered
                ? leftIsGan
                  ? 'gan'
                  : 'real'
                : selectedSide === 'left'
                ? 'choice'
                : 'default'
            }
            isInteractive={!hasAnswered}
            onClickImage={() => handleChoose('left')}
            isSelected={selectedSide === 'left'}
            isCorrectSelection={
              hasAnswered
                ? selectedSide === 'left'
                  ? leftIsGan
                  : null
                : null
            }
          />

          {!hasAnswered && (
            <button
              type="button"
              id="choose-left-btn"
              onClick={() => handleChoose('left')}
              className="mt-3 w-full py-2.5 px-4 bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-cyan-400 rounded-xl font-bold text-xs transition-all shadow-md"
            >
              Chọn Ảnh [A] là GAN
            </button>
          )}
        </div>

        {/* Right Image Option */}
        <div className="flex flex-col items-center">
          <MagnifierViewer
            idPrefix="duel-right"
            imageUrl={rightImage.url}
            alt={rightImage.title}
            showClues={hasAnswered && !leftIsGan}
            clues={!leftIsGan ? rightImage.clues : []}
            activeClueId={activeClue?.id}
            onSelectClue={(c) => setActiveClue(c)}
            badgeText={
              hasAnswered
                ? !leftIsGan
                  ? '🤖 AI / GAN TẠO DỰNG'
                  : '📷 ẢNH CHỤP THẬT'
                : 'Lựa chọn [B]'
            }
            badgeType={
              hasAnswered
                ? !leftIsGan
                  ? 'gan'
                  : 'real'
                : selectedSide === 'right'
                ? 'choice'
                : 'default'
            }
            isInteractive={!hasAnswered}
            onClickImage={() => handleChoose('right')}
            isSelected={selectedSide === 'right'}
            isCorrectSelection={
              hasAnswered
                ? selectedSide === 'right'
                  ? !leftIsGan
                  : null
                : null
            }
          />

          {!hasAnswered && (
            <button
              type="button"
              id="choose-right-btn"
              onClick={() => handleChoose('right')}
              className="mt-3 w-full py-2.5 px-4 bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-cyan-400 rounded-xl font-bold text-xs transition-all shadow-md"
            >
              Chọn Ảnh [B] là GAN
            </button>
          )}
        </div>
      </div>

      {/* Answer feedback card */}
      {hasAnswered && (
        <RoundFeedback
          isCorrect={isCorrect}
          userSelectionLabel={selectedSide === 'left' ? 'Ảnh [A]' : 'Ảnh [B]'}
          ganImage={pair.ganImage}
          realImage={pair.realImage}
          activeClue={activeClue}
          onSelectClue={(c) => setActiveClue(c)}
          onNext={handleNext}
        />
      )}
    </div>
  );
};
