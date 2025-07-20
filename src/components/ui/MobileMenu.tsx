"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../dropdown-menu";
import { useMobileMenu } from "./useMobileMenu";
import type { ReactNode } from "react";
import { Menu } from "lucide-react";

type Props = {
  children: ReactNode;
};

export const MobileMenu = ({ children }: Props) => {
  const { isOpen, openMenu, closeMenu } = useMobileMenu();

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => (open ? openMenu() : closeMenu())}
    >
      <DropdownMenuTrigger asChild>
        <Menu
          className="h-6 w-6 cursor-pointer md:hidden text-neutral-600 hover:text-pink-600 transition-colors"
          aria-label="Abrir menú"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-[150px] max-w-xs rounded-xl border border-neutral-300 bg-white shadow-xl transition-all z-50"
        id="mobile-menu"
      >
        <ul className="flex flex-col divide-y divide-neutral-200 px-4 py-3 [&>li]:py-3 [&>li]:text-sm [&>li]:text-neutral-700 [&>li]:hover:bg-neutral-100 [&>li]:rounded-md">
          {children}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
