"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="icon" />}>
        <HugeiconsIcon
          icon={Sun01Icon}
          className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />
        <HugeiconsIcon
          icon={Moon02Icon}
          className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        />
        <span className="sr-only">Cambiar tema</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-36 p-1">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={() => setTheme("light")}
          >
            Claro
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={() => setTheme("dark")}
          >
            Oscuro
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={() => setTheme("system")}
          >
            Sistema
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
