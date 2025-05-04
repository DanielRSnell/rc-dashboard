"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  collapsed?: boolean;
}

export function ThemeToggle({ collapsed = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "sm"}
      onClick={toggleTheme}
      className={cn(
        "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        collapsed && "mx-auto"
      )}
    >
      {theme === "light" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
      {!collapsed && <span className="ml-2">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
    </Button>
  );
}
