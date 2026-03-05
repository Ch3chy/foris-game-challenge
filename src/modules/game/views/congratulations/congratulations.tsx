import type { FC } from "react";
import styles from "./congratulations.module.scss";
import { useGameStore } from "@/stores";
import { Button } from "@/components/button";

const Congratulations: FC = () => {
  const { turns, resetGame } = useGameStore();

  return (
    <section className={styles.congratulations}>
      <div>
        <h1 className={styles.title}>¡Felicidades!</h1>
        <p className={styles.subtitle}>
          Terminaste el juego con {turns} turnos
        </p>
      </div>
      <footer className={styles.footer}>
        <Button onClick={resetGame}>Repetir</Button>
        <Button color="secondary">Inicio</Button>
      </footer>
    </section>
  );
};

export default Congratulations;
