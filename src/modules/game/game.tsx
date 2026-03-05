import { type FC } from "react";
import styles from "./game.module.scss";
import { rickAndMorty } from "@/assets";
import { GameBoard } from "./views/game-board";
import { Congratulations } from "./views/congratulations";
import { useGameStore } from "./stores";

const Game: FC = () => {
  const { isGameCompleted } = useGameStore();

  return (
    <section>
      <div className={styles.gameContainer}>
        <header className={styles.header}>
          <img src={rickAndMorty} alt="Rick and Morty" />
          <h1 className={styles.title}>Juego de memoria</h1>
        </header>
        <div className={`principalContainer ${styles.gameBoard}`}>
          {!isGameCompleted ? <GameBoard /> : <Congratulations />}
        </div>
      </div>
    </section>
  );
};

export default Game;
