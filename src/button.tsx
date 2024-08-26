import { type ComponentProps, type ElementRef, forwardRef } from "react";

export const Button = forwardRef<
  ElementRef<"button">,
  ComponentProps<"button">
>((props, ref) => {
  return <button ref={ref} {...props} />;
});

Button.displayName = "Button";
