import type { FC } from "react";
import styles from "./characters-grid.module.scss";
import { Card } from "../card";
import type { Character } from "@/domain/character";

interface CharactersGridProps {
  characters: Character[];
}

const CharactersGrid: FC<CharactersGridProps> = ({ characters }) => {
  return (
    <section className={styles.charactersGrid}>
      <div className={styles.grid}>
        {characters.map((character) => (
          <Card key={`card-${character.id}`} character={character} />
        ))}
      </div>
    </section>
  );
};

export default CharactersGrid;
