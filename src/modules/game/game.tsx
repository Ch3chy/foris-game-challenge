import type { FC } from "react";
import styles from "./game.module.scss";
import { rickAndMorty } from "@/assets";
import { CharactersGrid } from "./components/characters-grid";
import { Button } from "@/components/button";
import type { Character } from "@/domain/character";

const Game: FC = () => {
  const characters: Character[] = [];

  return (
    <section>
      <div className={styles.gameContainer}>
        <header className={styles.header}>
          <img src={rickAndMorty} alt="Rick and Morty" />
          <h1 className={styles.title}>Juego de memoria</h1>
        </header>
        <div className={`principalContainer ${styles.gameBoard}`}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Personajes</h2>
            <>
              <p className={styles.title}>Aciertos: 0</p>
              <p className={styles.title}>Turnos: 0</p>
            </>
          </div>
          <CharactersGrid characters={characters} />
          <div className={styles.footer}>
            <Button>Jugar</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
