import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.scss";
import { rickAndMorty } from "@/assets";
import { LoginForm } from "../../components/login-form";
import { useAuthStore } from "../../stores";

const Login: FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (username: string, password: string) => {
    const success = await login(username, password);
    if (success) {
      navigate("/game");
    }
  };

  return (
    <section className={`principalContainer ${styles.container}`}>
      <header className={styles.header}>
        <img src={rickAndMorty} alt="Rick and Morty" />
      </header>
      <div>
        <LoginForm
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
      <footer className={styles.footer}>
        <a href="#">¿Olvidaste tu usuario o contraseña?</a>
      </footer>
    </section>
  );
};

export default Login;
