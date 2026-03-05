import { useGameStore } from "@/stores";
import { useEffect, type FC } from "react";
import styles from "./game-board.module.scss";
import { CharactersGrid } from "../../components/characters-grid";
import { Button } from "@/components/button";

const GameBoard: FC = () => {
  const {
    cards,
    turns,
    matchedPairs,
    isLoading,
    isGameStarted,
    fetchCharacters,
    initGame,
    startGame,
    flipCard,
    resetGame,
  } = useGameStore();

  useEffect(() => {
    fetchCharacters().then((success) => {
      if (success) {
        initGame();
      }
    });
  }, [fetchCharacters, initGame]);

  const handlePlayClick = () => {
    if (isGameStarted) {
      resetGame();
    }
    startGame();
  };

  return (
    <div className={styles.gameBoard}>
      <div className={styles.titleContainer}>
        {!isGameStarted ? (
          <h2 className={styles.title}>Personajes</h2>
        ) : (
          <>
            <p className={styles.title}>Aciertos: {matchedPairs.length}</p>
            <p className={styles.title}>Turnos: {turns}</p>
          </>
        )}
      </div>
      <CharactersGrid cards={cards} onCardClick={flipCard} />
      {!isGameStarted && (
        <div className={styles.footer}>
          <Button
            onClick={handlePlayClick}
            disabled={isLoading}
            loading={isLoading}
          >
            Jugar
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
