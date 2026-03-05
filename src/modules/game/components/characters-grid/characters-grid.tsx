import type { FC } from "react";
import styles from "./characters-grid.module.scss";
import { Card } from "../card";
import type { CardState } from "../../stores";

interface CharactersGridProps {
  cards: CardState[];
  onCardClick: (index: number) => void;
}

const CharactersGrid: FC<CharactersGridProps> = ({ cards, onCardClick }) => {
  return (
    <section className={styles.charactersGrid}>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <Card
            key={`card-${index}`}
            character={card.character}
            flip={card.isFlipped || card.isMatched}
            onClick={() => onCardClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default CharactersGrid;
