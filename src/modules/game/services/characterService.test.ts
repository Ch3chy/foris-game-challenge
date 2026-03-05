import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getCharacters } from "./characterService";

const mockCharacters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    image: "https://example.com/rick.jpg",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    image: "https://example.com/morty.jpg",
  },
];

describe("characterService", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("getCharacters", () => {
    it("fetches characters from API", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: mockCharacters }),
      } as Response);

      const result = await getCharacters();

      expect(fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character?page=1"
      );
      expect(result).toEqual(mockCharacters);
    });

    it("fetches characters with custom page", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: mockCharacters }),
      } as Response);

      await getCharacters(3);

      expect(fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character?page=3"
      );
    });

    it("throws error when response is not ok", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(getCharacters()).rejects.toThrow(
        "Error fetching characters: 404"
      );
    });

    it("throws error when fetch fails", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

      await expect(getCharacters()).rejects.toThrow("Network error");
    });
  });
});
