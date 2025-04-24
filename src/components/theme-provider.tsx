"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// NextThemesProvider의 props 타입을 그대로 사용
export function ThemeProvider({ 
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
