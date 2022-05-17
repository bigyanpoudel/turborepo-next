import Ripples from "material-ripple-effects";
import React, { forwardRef, ReactElement } from "react";

interface RippleProps {
  className?: string;
  children: ReactElement;
  color?: "dark" | "light";
}

export const Ripple = forwardRef(
  ({ className = "", children, color = "dark" }: RippleProps, ref) => {
    const ripple = new Ripples();

    const component = React.cloneElement(children, {
      onMouseUp: (e: any) => ripple.create(e, color),
      ref: ref,
    });

    return <span className={className}>{component}</span>;
  }
);
