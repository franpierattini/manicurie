import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IUser } from "@/types/users";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Phone, User } from "lucide-react";

export function ManicuristaCard({ user }: { user: IUser }) {
  return (
    <Link href={`/profile/${user.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-all border border-gray-100 rounded-xl bg-white">
        <CardHeader className="p-0">
          <AspectRatio ratio={1 / 1}>
            {user.perfil_url ? (
              <Image
                src={user.perfil_url}
                alt={`Foto de ${user.nombre}`}
                width={512}
                height={412}
                className=" w-full h-full"
              />
            ) : (
              <Image
                src="/default-avatar.webp"
                alt="Avatar por defecto"
                width={512}
                height={412}
                className=" w-full h-full"
              />
            )}
          </AspectRatio>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                <User size={16} className="text-pink-500" />
                {user.nombre}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <BadgeCheck size={14} className="text-pink-400" />
                {user.tipo_usuario.toLocaleLowerCase()}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
              <Phone size={14} className="text-gray-500" />
              {user.telefono}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
