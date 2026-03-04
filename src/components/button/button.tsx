import { forwardRef, type ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "accent";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "primary",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const buttonClasses = [
      styles.button,
      styles[color],
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} />}
        <span className={styles.label}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
