import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CharactersGrid from "./characters-grid";
import type { CardState } from "../../stores";
import type { Character } from "@/domain/character";

const createMockCard = (id: number, isFlipped = false, isMatched = false): CardState => ({
  character: {
    id,
    name: `Character ${id}`,
    status: "Alive",
    species: "Human",
    image: `https://example.com/char${id}.jpg`,
  } as Character,
  isFlipped,
  isMatched,
});

describe("CharactersGrid", () => {
  const mockCards: CardState[] = [
    createMockCard(1, true),
    createMockCard(2, false),
    createMockCard(3, true),
    createMockCard(1, false, true),
  ];

  describe("Rendering", () => {
    it("renders all cards", () => {
      render(<CharactersGrid cards={mockCards} onCardClick={vi.fn()} />);

      expect(screen.getAllByRole("article")).toHaveLength(4);
    });

    it("renders cards with correct character names", () => {
      render(<CharactersGrid cards={mockCards} onCardClick={vi.fn()} />);

      // Character 1 appears twice (as a pair)
      expect(screen.getAllByText("Character 1")).toHaveLength(2);
      expect(screen.getByText("Character 2")).toBeInTheDocument();
      expect(screen.getByText("Character 3")).toBeInTheDocument();
    });

    it("renders empty grid when no cards", () => {
      render(<CharactersGrid cards={[]} onCardClick={vi.fn()} />);

      expect(screen.queryAllByRole("article")).toHaveLength(0);
    });
  });

  describe("Card interactions", () => {
    it("calls onCardClick with correct index when card is clicked", async () => {
      const user = userEvent.setup();
      const handleCardClick = vi.fn();

      render(<CharactersGrid cards={mockCards} onCardClick={handleCardClick} />);

      const cards = screen.getAllByRole("article");
      await user.click(cards[2]);

      expect(handleCardClick).toHaveBeenCalledWith(2);
    });

    it("calls onCardClick for each card clicked", async () => {
      const user = userEvent.setup();
      const handleCardClick = vi.fn();

      render(<CharactersGrid cards={mockCards} onCardClick={handleCardClick} />);

      const cards = screen.getAllByRole("article");
      await user.click(cards[0]);
      await user.click(cards[1]);

      expect(handleCardClick).toHaveBeenCalledTimes(2);
      expect(handleCardClick).toHaveBeenNthCalledWith(1, 0);
      expect(handleCardClick).toHaveBeenNthCalledWith(2, 1);
    });
  });

  describe("Card states", () => {
    it("passes flip prop correctly based on isFlipped and isMatched", () => {
      render(<CharactersGrid cards={mockCards} onCardClick={vi.fn()} />);

      const cards = screen.getAllByRole("article");

      // Card 0: isFlipped=true -> should NOT have flip class
      expect(cards[0].className).not.toMatch(/\bflip\b/);

      // Card 1: isFlipped=false, isMatched=false -> should have flip class
      expect(cards[1].className).toContain("flip");

      // Card 2: isFlipped=true -> should NOT have flip class
      expect(cards[2].className).not.toMatch(/\bflip\b/);

      // Card 3: isFlipped=false, isMatched=true -> should NOT have flip class (matched)
      expect(cards[3].className).not.toMatch(/\bflip\b/);
    });
  });
});
