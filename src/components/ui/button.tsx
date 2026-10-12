import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  primary: "button button-primary",
  secondary: "button button-secondary",
  ghost: "button button-ghost",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof styles;
  children: ReactNode;
}) {
  return (
    <button className={cn(styles[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: keyof typeof styles;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn(styles[variant], className)} {...props}>
      {children}
    </Link>
  );
}
