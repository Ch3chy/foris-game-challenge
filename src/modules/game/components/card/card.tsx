import type { FC } from "react";
import styles from "./card.module.scss";
import { rickAndMortyBack } from "@/assets";
import type { Character } from "@/domain/character";

interface CardProps {
  character: Character;
  flip?: boolean;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ character, flip, onClick }) => {
  const cardClasses = [
    styles.card,
    !flip && styles.flip,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClasses} onClick={onClick}>
      <div className={styles.inner}>
        <div className={`${styles.face} ${styles.front}`}>
          <img
            src={character.image}
            alt={character.name}
            className={styles.image}
          />
          <div className={styles.info}>
            <h3 className={styles.name}>{character.name}</h3>
            <p className={styles.status}>
              {character.status} - {character.species}
            </p>
          </div>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <img
            src={rickAndMortyBack}
            alt="Back of card"
            className={styles.image}
          />
        </div>
      </div>
    </article>
  );
};

export default Card;
