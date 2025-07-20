"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../button";

interface Props {
  tipo_usuario: string;
}

const navItemsClienta = [
  { id: "1", label: "Inicio", href: "/" },
  { id: "2", label: "Mis Reservas", href: "/books/my-books" },
];

const navItemsManicura = [
  { id: "1", label: "Inicio", href: "/" },
  { id: "2", label: "Agenda", href: "/agenda" },
  { id: "3", label: "Reservas", href: "/reservas" },
];
const navItemsAdmin = [
  { id: "1", label: "Dashboard", href: "/admin" },
  { id: "2", label: "Usuarios", href: "/admin/usuarios" },
  { id: "3", label: "Servicios", href: "/admin/servicios" },
];
export const NavLinks = ({ tipo_usuario }: Props) => {
  let navItems;

  if (tipo_usuario === "manicura") {
    navItems = navItemsManicura;
  } else if (tipo_usuario === "administrador") {
    navItems = navItemsAdmin;
  } else {
    navItems = navItemsClienta;
  }

  return (
    <nav className="flex flex-col gap-2 md:flex-row md:gap-4 lg:gap-6 items-center">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "px-4 py-2 rounded-md text-sm font-medium text-neutral-600 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-200"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
