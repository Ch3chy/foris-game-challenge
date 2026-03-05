import { create } from "zustand";
import { getCharacters } from "../services/characterService";
import { getRandomElements, shuffleArray } from "@/utils/array.utils";
import type { CardState, GameState } from "./state";

export const useGameStore = create<GameState>((set, get) => ({
  // Estado inicial
  characters: [],
  cards: [],
  flippedIndices: [],
  matchedPairs: [],
  turns: 0,
  isLoading: false,
  error: null,
  isGameStarted: false,
  isGameCompleted: false,

  fetchCharacters: async () => {
    set({ isLoading: true, error: null });

    try {
      const characters = await getCharacters();
      set({ characters, isLoading: false });
      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
      return false;
    }
  },

  initGame: () => {
    const { characters } = get();

    if (characters.length < 6) {
      set({ error: "No hay suficientes personajes para iniciar el juego" });
      return;
    }

    const selectedCharacters = getRandomElements(characters, 6);

    const cardPairs = selectedCharacters.flatMap((character) => [
      character,
      character,
    ]);

    const cards: CardState[] = cardPairs.map((character) => ({
      character,
      isFlipped: true,
      isMatched: false,
    }));

    set({
      cards,
      flippedIndices: [],
      matchedPairs: [],
      turns: 0,
      isGameStarted: false,
      isGameCompleted: false,
      error: null,
    });
  },

  startGame: () => {
    const { cards: cardPairs } = get();

    const cards = shuffleArray(cardPairs);

    const newState = {
      cards,
      flippedIndices: [],
      matchedPairs: [],
      turns: 0,
      isGameStarted: false,
      isGameCompleted: false,
      error: null,
    };
    set(newState);

    setTimeout(() => {
      const hiddenCards = cards.map((card) => ({
        ...card,
        isFlipped: false,
      }));
      set({ cards: hiddenCards, isGameStarted: true });
    }, 3000);
  },

  flipCard: (index: number) => {
    const { cards, flippedIndices, matchedPairs, turns } = get();

    if (
      flippedIndices.length >= 2 ||
      flippedIndices.includes(index) ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    const newFlippedIndices = [...flippedIndices, index];

    set({ cards: newCards, flippedIndices: newFlippedIndices });

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      const firstCard = newCards[firstIndex];
      const secondCard = newCards[secondIndex];

      if (firstCard.character.id === secondCard.character.id) {
        const updatedCards = [...newCards];
        updatedCards[firstIndex] = {
          ...updatedCards[firstIndex],
          isMatched: true,
        };
        updatedCards[secondIndex] = {
          ...updatedCards[secondIndex],
          isMatched: true,
        };

        const newMatchedPairs = [...matchedPairs, firstCard.character.id];
        const isGameCompleted = newMatchedPairs.length === 6;

        set({
          cards: updatedCards,
          flippedIndices: [],
          matchedPairs: newMatchedPairs,
          turns: turns + 1,
          isGameCompleted,
        });
      } else {
        setTimeout(() => {
          const resetCards = [...get().cards];
          resetCards[firstIndex] = {
            ...resetCards[firstIndex],
            isFlipped: false,
          };
          resetCards[secondIndex] = {
            ...resetCards[secondIndex],
            isFlipped: false,
          };

          set({
            cards: resetCards,
            flippedIndices: [],
            turns: turns + 1,
          });
        }, 1000);
      }
    }
  },

  resetGame: () => {
    set({
      cards: [],
      flippedIndices: [],
      matchedPairs: [],
      turns: 0,
      isGameStarted: false,
      isGameCompleted: false,
      error: null,
    });
  },
}));
