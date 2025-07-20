"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { UserAvatar } from "../UserAvatar";
import { UserInfo } from "../UserInfo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../client/auth/actions";
import { IUser } from "@/types/users";
import { Button } from "../button";

type Props = {
  user: IUser;
};

export function UserMenu({ user }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error al cerrar sesión:", result.error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center justify-center rounded-full bg-neutral-100 p-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          aria-label="Abrir menú de usuario"
        >
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-50 rounded-lg px-4 border border-neutral-200 bg-white shadow-lg"
      >
        {/* Encabezado con datos del usuario */}
        <div>
          <UserInfo user={user} />
        </div>

        <DropdownMenuSeparator />

        {/* Navegación */}
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="block w-full py-2 text-sm font-medium text-pink-600 hover:bg-pink-50"
          >
            Ver perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Cierre de sesión */}
        <DropdownMenuItem>
          <button
            onClick={handleLogout}
            className="w-full text-left  py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Desconectar
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
