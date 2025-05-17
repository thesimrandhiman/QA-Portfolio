import * as React from "react"

export function Avatar({ children, className = "", ...props }) {
  return (
    <span className={"inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 " + className} {...props}>
      {children}
    </span>
  )
}
