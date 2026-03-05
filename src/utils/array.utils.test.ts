import { describe, it, expect } from "vitest";
import { shuffleArray, getRandomElements } from "./array.utils";

describe("array.utils", () => {
  describe("shuffleArray", () => {
    it("returns an array with the same length", () => {
      const input = [1, 2, 3, 4, 5];

      const result = shuffleArray(input);

      expect(result).toHaveLength(input.length);
    });

    it("contains all original elements", () => {
      const input = [1, 2, 3, 4, 5];

      const result = shuffleArray(input);

      expect(result.sort()).toEqual(input.sort());
    });

    it("does not mutate the original array", () => {
      const input = [1, 2, 3, 4, 5];
      const originalInput = [...input];

      shuffleArray(input);

      expect(input).toEqual(originalInput);
    });

    it("returns a new array instance", () => {
      const input = [1, 2, 3, 4, 5];

      const result = shuffleArray(input);

      expect(result).not.toBe(input);
    });

    it("handles empty array", () => {
      const result = shuffleArray([]);

      expect(result).toEqual([]);
    });

    it("handles single element array", () => {
      const result = shuffleArray([1]);

      expect(result).toEqual([1]);
    });

    it("shuffles the array (probabilistic test)", () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let differentOrderCount = 0;

      // Run multiple times to verify shuffling happens
      for (let i = 0; i < 10; i++) {
        const result = shuffleArray(input);
        if (JSON.stringify(result) !== JSON.stringify(input)) {
          differentOrderCount++;
        }
      }

      // At least some shuffles should produce different order
      expect(differentOrderCount).toBeGreaterThan(0);
    });
  });

  describe("getRandomElements", () => {
    it("returns the correct number of elements", () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const result = getRandomElements(input, 5);

      expect(result).toHaveLength(5);
    });

    it("returns elements from the original array", () => {
      const input = [1, 2, 3, 4, 5];

      const result = getRandomElements(input, 3);

      result.forEach((element) => {
        expect(input).toContain(element);
      });
    });

    it("does not mutate the original array", () => {
      const input = [1, 2, 3, 4, 5];
      const originalInput = [...input];

      getRandomElements(input, 3);

      expect(input).toEqual(originalInput);
    });

    it("returns empty array when count is 0", () => {
      const input = [1, 2, 3, 4, 5];

      const result = getRandomElements(input, 0);

      expect(result).toEqual([]);
    });

    it("returns all elements when count equals array length", () => {
      const input = [1, 2, 3, 4, 5];

      const result = getRandomElements(input, 5);

      expect(result.sort()).toEqual(input.sort());
    });

    it("returns all elements when count exceeds array length", () => {
      const input = [1, 2, 3];

      const result = getRandomElements(input, 10);

      expect(result.sort()).toEqual(input.sort());
    });

    it("handles empty array", () => {
      const result = getRandomElements([], 5);

      expect(result).toEqual([]);
    });

    it("returns unique elements (no duplicates)", () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const result = getRandomElements(input, 5);
      const uniqueElements = new Set(result);

      expect(uniqueElements.size).toBe(result.length);
    });

    it("works with objects", () => {
      const input = [
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 3, name: "c" },
      ];

      const result = getRandomElements(input, 2);

      expect(result).toHaveLength(2);
      result.forEach((element) => {
        expect(input).toContainEqual(element);
      });
    });
  });
});
