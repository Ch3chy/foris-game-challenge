import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useGameStore } from "./useGameStore";
import * as characterService from "../services/characterService";
import type { Character } from "@/domain/character";

vi.mock("../services/characterService", () => ({
  getCharacters: vi.fn(),
}));

const mockCharacters: Character[] = [
  { id: 1, name: "Rick", status: "Alive", species: "Human", image: "rick.jpg" } as Character,
  { id: 2, name: "Morty", status: "Alive", species: "Human", image: "morty.jpg" } as Character,
  { id: 3, name: "Summer", status: "Alive", species: "Human", image: "summer.jpg" } as Character,
  { id: 4, name: "Beth", status: "Alive", species: "Human", image: "beth.jpg" } as Character,
  { id: 5, name: "Jerry", status: "Alive", species: "Human", image: "jerry.jpg" } as Character,
  { id: 6, name: "Mr. Meeseeks", status: "Unknown", species: "Humanoid", image: "meeseeks.jpg" } as Character,
  { id: 7, name: "Birdperson", status: "Dead", species: "Humanoid", image: "birdperson.jpg" } as Character,
];

describe("useGameStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useGameStore.setState({
      characters: [],
      cards: [],
      flippedIndices: [],
      matchedPairs: [],
      turns: 0,
      isLoading: false,
      error: null,
      isGameStarted: false,
      isGameCompleted: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe("initial state", () => {
    it("has correct default values", () => {
      const state = useGameStore.getState();

      expect(state.characters).toEqual([]);
      expect(state.cards).toEqual([]);
      expect(state.flippedIndices).toEqual([]);
      expect(state.matchedPairs).toEqual([]);
      expect(state.turns).toBe(0);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.isGameStarted).toBe(false);
      expect(state.isGameCompleted).toBe(false);
    });
  });

  describe("fetchCharacters", () => {
    it("sets isLoading to true when fetching", async () => {
      vi.mocked(characterService.getCharacters).mockImplementation(
        () => new Promise(() => {})
      );

      useGameStore.getState().fetchCharacters();

      expect(useGameStore.getState().isLoading).toBe(true);
    });

    it("sets characters on successful fetch", async () => {
      vi.mocked(characterService.getCharacters).mockResolvedValue(mockCharacters);

      const result = await useGameStore.getState().fetchCharacters();

      expect(result).toBe(true);
      expect(useGameStore.getState().characters).toEqual(mockCharacters);
      expect(useGameStore.getState().isLoading).toBe(false);
    });

    it("sets error on failed fetch", async () => {
      vi.mocked(characterService.getCharacters).mockRejectedValue(
        new Error("API Error")
      );

      const result = await useGameStore.getState().fetchCharacters();

      expect(result).toBe(false);
      expect(useGameStore.getState().error).toBe("API Error");
      expect(useGameStore.getState().isLoading).toBe(false);
    });
  });

  describe("initGame", () => {
    it("sets error if not enough characters", () => {
      useGameStore.setState({ characters: mockCharacters.slice(0, 3) });

      useGameStore.getState().initGame();

      expect(useGameStore.getState().error).toBe(
        "No hay suficientes personajes para iniciar el juego"
      );
    });

    it("creates 12 cards (6 pairs) from characters", () => {
      useGameStore.setState({ characters: mockCharacters });

      useGameStore.getState().initGame();

      expect(useGameStore.getState().cards).toHaveLength(12);
    });

    it("creates cards with isFlipped true initially", () => {
      useGameStore.setState({ characters: mockCharacters });

      useGameStore.getState().initGame();

      const cards = useGameStore.getState().cards;
      cards.forEach((card) => {
        expect(card.isFlipped).toBe(true);
        expect(card.isMatched).toBe(false);
      });
    });

    it("resets game state", () => {
      useGameStore.setState({
        characters: mockCharacters,
        flippedIndices: [0, 1],
        matchedPairs: [1],
        turns: 5,
        isGameStarted: true,
      });

      useGameStore.getState().initGame();

      expect(useGameStore.getState().flippedIndices).toEqual([]);
      expect(useGameStore.getState().matchedPairs).toEqual([]);
      expect(useGameStore.getState().turns).toBe(0);
      expect(useGameStore.getState().isGameStarted).toBe(false);
    });
  });

  describe("startGame", () => {
    it("shuffles cards and hides them after delay", () => {
      useGameStore.setState({ characters: mockCharacters });
      useGameStore.getState().initGame();

      useGameStore.getState().startGame();

      // Cards should still be visible before timeout
      expect(useGameStore.getState().isGameStarted).toBe(false);

      // Advance timers
      vi.advanceTimersByTime(3000);

      expect(useGameStore.getState().isGameStarted).toBe(true);
      useGameStore.getState().cards.forEach((card) => {
        expect(card.isFlipped).toBe(false);
      });
    });
  });

  describe("flipCard", () => {
    beforeEach(() => {
      useGameStore.setState({ characters: mockCharacters });
      useGameStore.getState().initGame();
      useGameStore.getState().startGame();
      vi.advanceTimersByTime(3000);
    });

    it("flips a card when clicked", () => {
      useGameStore.getState().flipCard(0);

      expect(useGameStore.getState().cards[0].isFlipped).toBe(true);
      expect(useGameStore.getState().flippedIndices).toContain(0);
    });

    it("does not flip more than 2 cards", () => {
      useGameStore.getState().flipCard(0);
      useGameStore.getState().flipCard(1);
      useGameStore.getState().flipCard(2);

      expect(useGameStore.getState().flippedIndices).toHaveLength(2);
    });

    it("does not flip already flipped card", () => {
      useGameStore.getState().flipCard(0);
      const flippedIndicesBefore = [...useGameStore.getState().flippedIndices];

      useGameStore.getState().flipCard(0);

      expect(useGameStore.getState().flippedIndices).toEqual(flippedIndicesBefore);
    });

    it("does not flip matched card", () => {
      const cards = useGameStore.getState().cards;
      cards[0] = { ...cards[0], isMatched: true };
      useGameStore.setState({ cards });

      useGameStore.getState().flipCard(0);

      expect(useGameStore.getState().flippedIndices).not.toContain(0);
    });
  });

  describe("resetGame", () => {
    it("resets all game state", () => {
      useGameStore.setState({
        characters: mockCharacters,
        cards: [{ character: mockCharacters[0], isFlipped: true, isMatched: true }],
        flippedIndices: [0],
        matchedPairs: [1],
        turns: 10,
        isGameStarted: true,
        isGameCompleted: true,
      });

      useGameStore.getState().resetGame();

      expect(useGameStore.getState().cards).toEqual([]);
      expect(useGameStore.getState().flippedIndices).toEqual([]);
      expect(useGameStore.getState().matchedPairs).toEqual([]);
      expect(useGameStore.getState().turns).toBe(0);
      expect(useGameStore.getState().isGameStarted).toBe(false);
      expect(useGameStore.getState().isGameCompleted).toBe(false);
    });
  });
});
