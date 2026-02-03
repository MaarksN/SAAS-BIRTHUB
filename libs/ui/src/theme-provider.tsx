import * as React from "react";

// In a real app, this would use next-themes
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
