"use server"
import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { redirect } from "next/navigation";
 


export async function auth() {

  const access_token = (await cookies()).get("access_token")?.value;

  try {
    const { full_name, username, user_id, profile_pic, role } = jwtDecode<JwtPayload & {full_name:string, username: string; user_id: string; profile_pic: string, role:string }>(access_token as string);
    return { user: {full_name, username, user_id, profile_pic, role } };
  } catch (err) {
    return null;
  }

}




// ------- User Logout method ---------
export async function logOut() {

  const cookieStore = await cookies();

  const isProduction = process.env.NODE_ENV === 'production';

  const productionCookie = {
    path: "/",
    domain: ".edcluster.com",
    sameSite: "lax" as const,
    secure: true,
    httpOnly: true,
  };

  cookieStore.delete({
    name: "refresh_token",
    ...(isProduction ? productionCookie : {}),
  });

  cookieStore.delete({
    name: "access_token",
    ...(isProduction ? productionCookie : {}),
  });

  redirect("/");
  
}




