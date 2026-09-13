import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { ArtifactClue, ImageItem } from '../types';

interface RoundFeedbackProps {
  isCorrect: boolean;
  userSelectionLabel: string;
  ganImage: ImageItem;
  realImage?: ImageItem;
  activeClue: ArtifactClue | null;
  onSelectClue: (clue: ArtifactClue) => void;
  onNext: () => void;
}

export const RoundFeedback: React.FC<RoundFeedbackProps> = ({
  isCorrect,
  userSelectionLabel,
  ganImage,
  realImage,
  activeClue,
  onSelectClue,
  onNext
}) => {
  return (
    <div
      id="round-feedback-card"
      className={`w-full max-w-3xl mx-auto mt-4 p-5 rounded-2xl border transition-all animate-in fade-in slide-in-from-bottom-3 duration-300 ${
        isCorrect
          ? 'bg-emerald-950/40 border-emerald-500/40 shadow-xl shadow-emerald-950/20'
          : 'bg-rose-950/40 border-rose-500/40 shadow-xl shadow-rose-950/20'
      }`}
    >
      {/* Header result banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-center ${
              isCorrect
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              {isCorrect ? 'Phán đoán chính xác! 🎉' : 'Phán đoán chưa chính xác! 🧐'}
            </h3>
            <p className="text-xs text-slate-300">
              Bạn đã chọn: <span className="font-semibold text-slate-100">{userSelectionLabel}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          id="btn-next-round"
          onClick={onNext}
          className="self-end sm:self-auto px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2"
        >
          <span>Câu Tiếp Theo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Forensic breakdown body */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: GAN Image Analysis */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              ẢNH TỔNG HỢP BỞI AI / GAN
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
              {ganImage.modelOrSource}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {ganImage.explanation}
          </p>

          {/* Clues interactive chips */}
          {ganImage.clues.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Các dấu vết vi mô đã phát hiện (Nhấn để soi trên ảnh):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ganImage.clues.map((clue) => {
                  const isActive = activeClue?.id === clue.id;
                  return (
                    <button
                      key={clue.id}
                      type="button"
                      onClick={() => onSelectClue(clue)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                          : 'bg-slate-950/70 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      <span>🔍 {clue.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active clue expansion */}
          {activeClue && (
            <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
              <span className="font-bold text-amber-300">Chi tiết dấu vết: </span>
              {activeClue.detail}
            </div>
          )}
        </div>

        {/* Right: Real Image Analysis (if duel mode) */}
        {realImage ? (
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ẢNH CHỤP THỰC TẾ (REAL)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                {realImage.modelOrSource}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {realImage.explanation}
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>Ghi chú Thám tử:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hãy tập trung quan sát đốm sáng trong hai con ngươi (Catchlights) và sự cân đối của các chi tiết nhỏ như khuyên tai, sợi râu và viền gọng kính. Mạng GAN thường xử lý từng vùng cục bộ nên khó đạt được sự nhất quán toàn cục.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
