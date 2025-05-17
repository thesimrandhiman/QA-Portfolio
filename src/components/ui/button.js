import * as React from "react"

export const Button = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseStyle = "px-4 py-2 rounded font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
    outline: "border border-primary/20 hover:border-primary/40 text-primary hover:bg-primary/5",
    ghost: "hover:bg-primary/5 text-primary"
  }
  
  return (
    <button
      ref={ref}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    />
  )
})
Button.displayName = "Button"
