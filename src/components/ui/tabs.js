import * as React from "react"

export function Tabs({ children, ...props }) {
  return <div {...props}>{children}</div>
}
export function TabsList({ children, ...props }) {
  return <div className="flex border-b mb-4" {...props}>{children}</div>
}
export function TabsTrigger({ children, ...props }) {
  return <button className="px-4 py-2 font-semibold border-b-2 border-transparent hover:border-primary focus:border-primary" {...props}>{children}</button>
}
export function TabsContent({ children, ...props }) {
  return <div className="py-4" {...props}>{children}</div>
}
