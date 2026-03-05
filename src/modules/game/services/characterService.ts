import type { Character } from "@/domain/character";
import type { CharactersResponse } from "../types/character.types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = async (page = 1): Promise<Character[]> => {
  const response = await fetch(`${API_BASE_URL}/character?page=${page}`);

  if (!response.ok) {
    throw new Error(`Error fetching characters: ${response.status}`);
  }

  const data: CharactersResponse = await response.json();
  return data.results;
};
