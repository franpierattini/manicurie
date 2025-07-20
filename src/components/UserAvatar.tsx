import { IUser } from "@/types/users";
import Image from "next/image";

type Props = {
  user: IUser;
};

export const UserAvatar = ({ user }: Props) => {
  if (user.perfil_url) {
    return (
      <Image
        className="h-8 w-8 rounded-full border"
        aria-hidden="true"
        src={user.perfil_url ?? "/default-avatar.webp"}
        width={24}
        height={24}
        alt=""
      />
    );
  }

  return (
    <Image
      className="h-8 w-8 rounded-full border"
      aria-hidden="true"
      src={"/default-avatar.webp"}
      width={24}
      height={24}
      alt=""
    />
  );
};
