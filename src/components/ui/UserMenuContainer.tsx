import { UserIcon } from "lucide-react";
import { UserMenu } from "./UserMenu";
import Link from "next/link";
import { IUser } from "@/types/users";

interface Props {
  user: IUser;
}
export async function UserMenuContainer({ user }: Props) {
  if (user) {
    return <UserMenu user={user} />;
  } else {
    return (
      <Link href="/login" className="h-6 w-6 flex-shrink-0">
        <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">Log in</span>
      </Link>
    );
  }
}
