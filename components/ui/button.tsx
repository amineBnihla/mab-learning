import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-brand-orange bg-brand-orange text-on-primary shadow-sm hover:border-primary hover:bg-primary active:translate-y-px",
  secondary:
    "border-brand-orange bg-transparent text-primary hover:bg-primary-fixed active:bg-primary-fixed-dim",
};

export function Button({
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-control border px-5 py-2.5 text-label-md transition-[background-color,border-color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-45 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
