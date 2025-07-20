import { Suspense } from "react";
import { NavLinks } from "./NavLinks";
import { UserMenuContainer } from "./UserMenuContainer";
import { MobileMenu } from "./MobileMenu";
import { getUsuarioById } from "@/utils/getUser";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const Nav = async () => {
  const cookieStore = await cookies();
  const user = await getUsuarioById(cookieStore);

  return (
    <nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
      <ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
        <NavLinks tipo_usuario={user.tipo_usuario} />
      </ul>
      <div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
        <Suspense fallback={<div className="w-8" />}>
          <UserMenuContainer user={user} />
        </Suspense>
      </div>
      <div className="flex items-center gap-1.5">
        {/* <Suspense fallback={<div className="w-6" />}>
          <CartNavItem />
        </Suspense> */}
        <Suspense>
          <MobileMenu>
            <NavLinks tipo_usuario={user.tipo_usuario} />
          </MobileMenu>
        </Suspense>
      </div>
    </nav>
  );
};
