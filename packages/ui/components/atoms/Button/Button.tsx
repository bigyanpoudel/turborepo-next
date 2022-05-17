import React, { useEffect, useState } from "react";

export interface ButtonProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  appearance?: ButtonAppearance;
  shape?: "square" | "circle";
  active?: boolean;
  outline?: boolean;
  dashed?: boolean;
  wide?: boolean;
  block?: boolean;
  disabled?: boolean;
  noAnimation?: boolean;
  loading?: boolean;
  progress?: boolean;
  addTimeout?: boolean;
  tabIndex?: number;
  children: React.ReactNode;
  onClick?: (...arg: any) => void;
}

export type ButtonAppearance =
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "link";

const types = {
  default: "",
  primary: "btn-primary",
  secondary: "btn-secondary",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
  ghost: "btn-ghost",
  link: "btn-link",
};
const sizes = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

const shapes = {
  square: "btn-square",
  circle: "btn-circle",
};

export const Button = ({
  className = "",
  size = "md",
  shape,
  appearance = "default",
  active,
  outline,
  dashed,
  wide,
  block,
  disabled,
  noAnimation = false,
  loading: loadingProp,
  progress,
  addTimeout,
  children,
  tabIndex,
  onClick,
}: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof loadingProp !== "undefined") {
      setLoading(loadingProp);
    }
  }, [loadingProp]);

  let btnClasses: string[] | string = [];

  btnClasses.push(sizes[size]);

  if (appearance) btnClasses.push(types[appearance]);
  if (active) btnClasses.push("btn-active");
  if (outline) btnClasses.push("btn-outline");
  if (dashed) btnClasses.push("btn-dashed");
  if (wide) btnClasses.push("btn-wide");
  if (block) btnClasses.push("btn-block");
  if (shape) btnClasses.push(shapes[shape]);
  if (noAnimation) btnClasses.push("no-animation");
  if (loading) btnClasses.push("loading");

  btnClasses = btnClasses.join(" ");

  const next = () => {
    setLoading(false);
  };

  const handleOnClick = (e: any) => {
    if (progress && !loading) {
      setLoading(true);

      /* after few seconds button will be enabled */
      if (addTimeout) {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      }

      onClick && onClick(next, e);
    } else {
      if (!(progress && loading) && onClick) {
        e.preventDefault();
        onClick(next, e);
      }
    }
  };

  return (
    <button
      className={`btn ${btnClasses} ${className}`}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};
