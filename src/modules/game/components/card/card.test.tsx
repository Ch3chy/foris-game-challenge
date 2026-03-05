import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Card from "./card";
import type { Character } from "@/domain/character";

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

describe("Card", () => {
  describe("Rendering", () => {
    it("renders character image", () => {
      render(<Card character={mockCharacter} flip={true} />);

      const img = screen.getByAltText(mockCharacter.name);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", mockCharacter.image);
    });

    it("renders character name", () => {
      render(<Card character={mockCharacter} flip={true} />);

      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    });

    it("renders character status and species", () => {
      render(<Card character={mockCharacter} flip={true} />);

      expect(screen.getByText(`${mockCharacter.status} - ${mockCharacter.species}`)).toBeInTheDocument();
    });

    it("renders back of card image", () => {
      render(<Card character={mockCharacter} flip={false} />);

      expect(screen.getByAltText("Back of card")).toBeInTheDocument();
    });
  });

  describe("Flip state", () => {
    it("applies flip class when flip is false", () => {
      render(<Card character={mockCharacter} flip={false} />);

      const card = screen.getByRole("article");
      expect(card.className).toContain("flip");
    });

    it("does not apply flip class when flip is true", () => {
      render(<Card character={mockCharacter} flip={true} />);

      const card = screen.getByRole("article");
      expect(card.className).not.toMatch(/\bflip\b/);
    });
  });

  describe("Interactions", () => {
    it("calls onClick when card is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Card character={mockCharacter} flip={true} onClick={handleClick} />,
      );

      await user.click(screen.getByRole("article"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not throw when onClick is not provided", async () => {
      const user = userEvent.setup();

      render(<Card character={mockCharacter} flip={true} />);

      await expect(
        user.click(screen.getByRole("article")),
      ).resolves.not.toThrow();
    });
  });

  describe("Different character data", () => {
    it("renders different character correctly", () => {
      const otherCharacter: Character = {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "unknown",
          url: "",
        },
        location: {
          name: "Citadel of Ricks",
          url: "https://rickandmortyapi.com/api/location/3",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/1"],
        url: "https://rickandmortyapi.com/api/character/2",
        created: "2017-11-04T18:50:21.651Z",
      };

      render(<Card character={otherCharacter} flip={true} />);

      expect(screen.getByText(otherCharacter.name)).toBeInTheDocument();
      expect(screen.getByText(`${otherCharacter.status} - ${otherCharacter.species}`)).toBeInTheDocument();
    });
  });
});
