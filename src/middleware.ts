import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;
  const publicPaths = [
    "/auth/portal",
    "/auth/client/login",
    "/auth/client/register",
    "/auth/manicure/login",
    "/auth/manicure/register",
    "/auth/admin/login",
    "/favicon.ico",
  ];

  // Si la ruta actual es pública, dejar pasar
  if (publicPaths.includes(pathname)) {
    return res;
  }
  const tipoUsuario = req.cookies.get("tipo_usuario")?.value?.trim();
  const userId = req.cookies.get("user_id")?.value?.trim();

  if (pathname.startsWith("/admin") && tipoUsuario !== "administrador") {
    return NextResponse.redirect(new URL("/auth/portal", req.url));
  }

  if (!session || !userId) {
    return NextResponse.redirect(new URL("/auth/portal", req.url));
  }
  if (tipoUsuario === "administrador" && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
