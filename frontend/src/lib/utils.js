/**
 * Tailwind class merge helper
 * Usage: cn("base-class", condition && "conditional-class")
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
