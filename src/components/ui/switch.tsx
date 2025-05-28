"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

function Switch({
  className,
  checked,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { checked?: boolean }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative peer inline-flex  items-center justify-between px-1 rounded-full border border-transparent shadow-xs transition-colors duration-300 outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-gray-300" : "bg-zinc-700 dark:bg-zinc-900",
        className
      )}
      checked={checked}
      {...props}
    >
    {/* Static icons aligned center */}
<div className="flex items-center justify-center w-5 h-5 z-10">
  <Moon className="h-4 w-4 text-gray-900 " fill="white" />
</div>
<div className="flex items-center justify-center w-5 h-5 z-10">
  <Sun className="h-4 w-4 text-yellow-400" />
</div>

{/* Thumb (ball) */}
<SwitchPrimitive.Thumb
  data-slot="switch-thumb"
  className={cn(
    "absolute top-0.7 left-0.5 z-0 h-7 w-7 rounded-full bg-gray-900 dark:bg-black shadow-md transition-transform duration-300 ease-in-out",
    checked ? "translate-x-8" : "translate-x-0"
  )}
/>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
