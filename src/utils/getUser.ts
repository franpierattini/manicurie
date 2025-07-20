"use server";

import { IUser } from "@/types/users";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function getUsuarioById(cookieStore: ReadonlyRequestCookies) {
  const userId = cookieStore.get("user_id")?.value;

  const supabase = createServerActionClient({ cookies: () => cookies() });

  const { data } = await supabase
    .from("Usuario")
    .select("*")
    .eq("id", userId)
    .single();

  return data as IUser;
}
