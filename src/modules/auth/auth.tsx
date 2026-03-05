import type { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./auth.module.scss";

const Auth: FC = () => {
  return (
    <section>
      <div className={styles.authContainer}>
        <Outlet />
      </div>
    </section>
  );
};

export default Auth;
