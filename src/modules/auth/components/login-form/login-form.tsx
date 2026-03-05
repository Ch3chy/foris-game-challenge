import type { FC } from "react";
import { useFormik } from "formik";
import { TextField } from "@/components/text-field";
import styles from "./login-form.module.scss";
import { Button } from "@/components/button";
import { VALIDATION_SCHEMA } from "../../utils/login-validation";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      onSubmit(values.username, values.password);
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}

      <TextField
        name="username"
        label="Usuario"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username ? formik.errors.username : undefined}
      />

      <TextField
        name="password"
        type="password"
        label="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password ? formik.errors.password : undefined}
      />

      <Button
        color="accent"
        type="submit"
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? "Iniciando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
