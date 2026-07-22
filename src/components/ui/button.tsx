import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const styles = { primary: "button button-primary", secondary: "button button-secondary", ghost: "button button-ghost" };
export function Button({ variant = "primary", className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof styles; children: ReactNode }) {
  return <button className={cn(styles[variant], className)} {...props}>{children}</button>;
}
export function ButtonLink({ variant = "primary", className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: keyof typeof styles; children: ReactNode }) {
  return <a className={cn(styles[variant], className)} {...props}>{children}</a>;
}
