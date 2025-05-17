import * as React from "react"

export function Card({ className = "", ...props }) {
  return (
    <div 
      className={`rounded-lg border border-border/40 bg-background/80 backdrop-blur-sm 
        shadow-lg hover:shadow-xl transition-shadow duration-300 
        hover:border-primary/20 ${className}`} 
      {...props} 
    />
  )
}
