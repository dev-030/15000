"use server"
import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { redirect } from "next/navigation";
 


export async function auth() {

  const access_token = (await cookies()).get("access_token")?.value;

  try {
    const { username, user_id, profile_pic } = jwtDecode<JwtPayload & { username: string; user_id: string; profile_pic: string }>(access_token as string);
    return { user: { username, user_id, profile_pic, role: "mentor" } };
  } catch (err) {
    return null;
  }

}




// ------- User Logout method ---------
export async function logOut() {

  const cookieStore = await cookies();

  cookieStore.delete({
    name: "access_token",
    path: "/",
    domain: ".edcluster.com",
    sameSite: "lax",
    secure: true,
    httpOnly: true,
  });

  cookieStore.delete({
    name: "refresh_token",
    path: "/",
    domain: ".edcluster.com",
    sameSite: "lax",
    secure: true,
    httpOnly: true,
  });

  console.log("Successfully logged out");
  redirect("/");
  
}




