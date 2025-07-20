import { IUser } from "@/types/users";
import { UserAvatar } from "./UserAvatar";

type Props = {
  user: IUser;
};

export const UserInfo = ({ user }: Props) => {
  const userName = user.nombre?.trim();
  const userEmail = user.correo?.trim();

  return (
    <div className="flex items-center gap-3 py-2">
      <UserAvatar user={user} />

      <div className="min-w-0">
        {userName && (
          <p className="text-sm font-semibold text-neutral-900 truncate">
            {userName}
          </p>
        )}
        <p className="text-xs text-neutral-500 truncate">{userEmail}</p>
      </div>
    </div>
  );
};
