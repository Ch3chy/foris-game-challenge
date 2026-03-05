import type { Character } from "@/domain/character";

export interface CardState {
  character: Character;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  // Estado
  characters: Character[];
  cards: CardState[];
  flippedIndices: number[];
  matchedPairs: number[];
  turns: number;
  isGameStarted: boolean;
  isGameCompleted: boolean;
  
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCharacters: () => Promise<boolean>;
  initGame: () => void;
  startGame: () => void;
  flipCard: (index: number) => void;
  resetGame: () => void;
}
