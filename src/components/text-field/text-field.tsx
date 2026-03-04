import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./text-field.module.scss";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      helperText,
      type = "text",
      disabled,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const inputId = id || props.name;

    const containerClasses = [styles.container, className]
      .filter(Boolean)
      .join(" ");

    const inputWrapperClasses = [
      styles.inputWrapper,
      error && styles.hasError,
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={inputWrapperClasses}>
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={styles.input}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={togglePassword}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && (
          <span id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}

        {helperText && !error && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
