import type { FC } from "react";
import styles from "./auth.module.scss";
import Login from "./views/login/login";

const Auth: FC = () => {
  return (
    <section>
      <div className={styles.authContainer}>
        <Login />
      </div>
    </section>
  );
};

export default Auth;
