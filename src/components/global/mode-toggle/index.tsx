"use client"

import React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

import { Switch } from "@/components/ui/switch"

function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isLight = theme === "light"

  return (
    <Switch
      checked={isLight}
      onCheckedChange={() => setTheme(isLight ? "dark" : "light")}
      className="relative w-16 h-8 pl-1 "
      aria-label="Toggle dark mode"
    >
      <span className="absolute left-0 ml-[3px] flex h-4 w-4 items-center justify-center text-[10px] text-yellow-400 transition-transform duration-300 data-[state=checked]:translate-x-full">
        {isLight ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </span>
    </Switch>
  )
}

export default ThemeSwitcher
