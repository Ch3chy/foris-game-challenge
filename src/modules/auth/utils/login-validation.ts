import * as Yup from "yup";

export const VALIDATION_SCHEMA = Yup.object({
  username: Yup.string()
    .required("El usuario es requerido")
    .min(3, "El usuario debe tener al menos 3 caracteres"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
