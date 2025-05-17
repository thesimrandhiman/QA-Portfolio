import * as React from "react"

export const Textarea = React.forwardRef(({ className = "", error, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`px-3 py-2 border rounded w-full transition duration-200
      bg-background resize-none
      focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : 'border-border hover:border-primary/50'}
      ${className}`}
    {...props}
  />
))
Textarea.displayName = "Textarea"
