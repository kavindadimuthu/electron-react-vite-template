import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  className,
  ...props
}) => {
  const baseClasses = "btn";
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const classes = [baseClasses, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
