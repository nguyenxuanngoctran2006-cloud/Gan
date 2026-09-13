import React, { useState } from 'react';
import { X, Eye, Sparkles, Glasses, Smile, Wind, Droplet, Lightbulb, CheckCircle2 } from 'lucide-react';
import { GAN_FIELD_GUIDE } from '../data/dataset';

interface FieldGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FieldGuideModal: React.FC<FieldGuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(GAN_FIELD_GUIDE[0].id);

  if (!isOpen) return null;

  const currentGuide = GAN_FIELD_GUIDE.find((g) => g.id === selectedGuideId) || GAN_FIELD_GUIDE[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Glasses':
        return <Glasses className="w-5 h-5 text-indigo-400" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-emerald-400" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-sky-400" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-rose-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        id="field-guide-modal"
        className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Sổ Tay Thám Tử GAN</h2>
              <p className="text-xs text-slate-400">
                6 dấu hiệu vi mô kinh điển giúp bóc trần ảnh tổng hợp bằng AI / StyleGAN
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-guide-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left menu column */}
          <div className="md:col-span-5 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Danh sách dấu hiệu
            </span>
            <div className="flex flex-col gap-1.5">
              {GAN_FIELD_GUIDE.map((guide) => {
                const isSelected = guide.id === selectedGuideId;
                return (
                  <button
                    key={guide.id}
                    type="button"
                    onClick={() => setSelectedGuideId(guide.id)}
                    className={`text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-white shadow-sm'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <div className="mt-0.5">{getIcon(guide.icon)}</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{guide.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{guide.summary}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right detail view column */}
          <div className="md:col-span-7 bg-slate-950/60 rounded-xl p-5 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  {getIcon(currentGuide.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{currentGuide.title}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{currentGuide.summary}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed mt-4">
                <div>
                  <h5 className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Cơ chế kỹ thuật đằng sau:
                  </h5>
                  <p className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-slate-300">
                    {currentGuide.detail}
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-lg text-amber-200">
                  <h5 className="font-bold text-amber-300 mb-1 flex items-center gap-1.5 text-xs">
                    💡 Mẹo quan sát nhanh khi chơi:
                  </h5>
                  <p className="text-xs text-amber-100/90">{currentGuide.tip}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Đã hiểu, quay lại trò chơi!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
