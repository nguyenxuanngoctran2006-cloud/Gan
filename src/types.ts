export type GameMode = 'duel' | 'single' | 'speedrun';

export type Category = 'portrait' | 'pet' | 'scenery' | 'artwork';

export interface ArtifactClue {
  id: string;
  label: string;
  detail: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface ImageItem {
  id: string;
  title: string;
  url: string;
  isGAN: boolean;
  category: Category;
  difficulty: 'easy' | 'medium' | 'hard';
  modelOrSource: string; // e.g. "StyleGAN2 (NVIDIA)", "Ảnh chụp thực tế Canon 5D", etc.
  explanation: string;
  clues: ArtifactClue[];
}

export interface DuelPair {
  id: string;
  title: string;
  category: Category;
  difficulty: 'easy' | 'medium' | 'hard';
  realImage: ImageItem;
  ganImage: ImageItem;
  comparisonHint: string;
}

export interface GameHistoryItem {
  id: string;
  title: string;
  userChoseGan: boolean;
  correct: boolean;
  imageUrl: string;
  explanation: string;
  timestamp: number;
}
