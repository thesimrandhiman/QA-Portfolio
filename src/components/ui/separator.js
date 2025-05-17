import * as React from "react"

export function Separator({ className = "", ...props }) {
  return <span className={"inline-block bg-gray-300 w-px h-4 mx-2 align-middle " + className} {...props} />
}
