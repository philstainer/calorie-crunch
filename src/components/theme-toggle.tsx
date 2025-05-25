import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "#/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#/components/ui/tooltip";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">(
    "system"
  );

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center rounded-lg border p-1 max-w-fit">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Light mode"
              variant={theme === "light" ? "default" : "ghost"}
              size="sm"
              onClick={() => setThemeState("light")}
              className="h-8 w-8 p-0"
            >
              <Sun className="h-4 w-4" />
              <span className="sr-only">Light mode</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Light mode</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Dark mode"
              variant={theme === "dark" ? "default" : "ghost"}
              size="sm"
              onClick={() => setThemeState("dark")}
              className="h-8 w-8 p-0"
            >
              <Moon className="h-4 w-4" />
              <span className="sr-only">Dark mode</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dark mode</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="System mode"
              variant={theme === "system" ? "default" : "ghost"}
              size="sm"
              onClick={() => setThemeState("system")}
              className="h-8 w-8 p-0"
            >
              <Monitor className="h-4 w-4" />
              <span className="sr-only">System mode</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>System mode</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
