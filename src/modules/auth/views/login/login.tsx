import type { FC } from "react";

import styles from "./login.module.scss";
import { rickAndMorty } from "@/assets";
import { LoginForm } from "../../components/login-form";

const Login: FC = () => {
  return (
    <section className={`principalContainer ${styles.container}`}>
      <header className={styles.header}>
        <img src={rickAndMorty} alt="Rick and Morty" />
      </header>
      <div>
        <LoginForm />
      </div>
      <footer className={styles.footer}>
        <a href="#">¿Olvidaste tu usuario o contraseña?</a>
      </footer>
    </section>
  );
};

export default Login;
