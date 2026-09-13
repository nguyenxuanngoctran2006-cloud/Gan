import React from 'react';
import { Trophy, Award, Flame, RotateCcw, Target, Sparkles } from 'lucide-react';
import { GameMode } from '../types';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  maxStreak: number;
  correctCount: number;
  totalAnswered: number;
  mode: GameMode;
  onRestart: () => void;
  onSwitchMode: (mode: GameMode) => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  maxStreak,
  correctCount,
  totalAnswered,
  mode,
  onRestart,
  onSwitchMode
}) => {
  if (!isOpen) return null;

  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Rank determination
  let rank = {
    title: 'Học Việc Nhận Diện',
    badgeColor: 'text-slate-300 bg-slate-800 border-slate-700',
    description: 'Bạn đang bắt đầu làm quen với thế giới Deepfake. Hãy mở Sổ Tay Thám Tử để học các mẹo soi răng, mắt và khuyên tai!'
  };

  if (accuracy >= 85 && totalAnswered >= 4) {
    rank = {
      title: '👑 Bậc Thầy Giám Định GAN',
      badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/50',
      description: 'Mắt thần! Bạn có đôi mắt tinh tường không thể bị đánh lừa bởi bất kỳ thuật toán StyleGAN hay Diffusion nào!'
    };
  } else if (accuracy >= 70 && totalAnswered >= 3) {
    rank = {
      title: '🥇 Chuyên Gia Phân Tích Deepfake',
      badgeColor: 'text-cyan-300 bg-cyan-500/20 border-cyan-500/50',
      description: 'Rất ấn tượng! Bạn đã nắm vững hầu hết các dấu vết bất thường về phản xạ ánh sáng và viền tóc.'
    };
  } else if (accuracy >= 50) {
    rank = {
      title: '🥈 Thám Tử AI Nghiệp Dư',
      badgeColor: 'text-blue-300 bg-blue-500/20 border-blue-500/50',
      description: 'Khá tốt! Bạn đã nhận ra được một số đặc điểm cơ bản. Tiếp tục rèn luyện để tinh mắt hơn nữa.'
    };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div
        id="game-over-modal"
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center animate-in zoom-in-95 duration-200"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Trophy className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          {mode === 'speedrun' ? 'Hết Thời Gian!' : 'Kết Thúc Lượt Chơi!'}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Tổng kết thành tích phân biệt ảnh thật & giả của bạn
        </p>

        {/* Detective Rank Badge */}
        <div className={`w-full py-3 px-4 rounded-2xl border mb-5 ${rank.badgeColor}`}>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Cấp Bậc Thám Tử</span>
          </div>
          <div className="text-base font-extrabold">{rank.title}</div>
          <p className="text-[11px] text-slate-300/80 mt-1 leading-normal">{rank.description}</p>
        </div>

        {/* Metrics Grid */}
        <div className="w-full grid grid-cols-3 gap-2.5 mb-6">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Tổng điểm</span>
            <span className="text-lg font-mono font-bold text-cyan-300">{score}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 uppercase font-medium">
              <Target className="w-3 h-3 text-emerald-400" />
              <span>Độ chuẩn</span>
            </div>
            <span className="text-lg font-mono font-bold text-emerald-300">{accuracy}%</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 uppercase font-medium">
              <Flame className="w-3 h-3 text-orange-400" />
              <span>Chuỗi max</span>
            </div>
            <span className="text-lg font-mono font-bold text-orange-300">x{maxStreak}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-col gap-2">
          <button
            type="button"
            id="modal-play-again-btn"
            onClick={onRestart}
            className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lại Ván Mới</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onSwitchMode(mode === 'duel' ? 'single' : 'duel')}
              className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors border border-slate-700"
            >
              {mode === 'duel' ? 'Thử Chế độ Thẩm định (1 ảnh)' : 'Thử Chế độ Đối đầu (2 ảnh)'}
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode('speedrun')}
              className="flex-1 py-2.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold rounded-xl text-xs transition-colors border border-amber-500/40 flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tốc biến 60s</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
