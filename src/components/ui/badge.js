import * as React from "react"

export function Badge({ children, className = "", variant = "outline", ...props }) {
  const base = "inline-block px-2 py-1 rounded text-xs font-semibold ";
  const variants = {
    outline: "border border-primary text-primary bg-white",
    secondary: "bg-gray-200 text-gray-800",
  };
  return (
    <span className={base + (variants[variant] || "") + " " + className} {...props}>{children}</span>
  )
}
