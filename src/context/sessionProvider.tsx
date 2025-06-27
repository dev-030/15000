'use client'
import { createContext, useContext } from "react";

interface SessionData {
  user?: {
    username: string;
    user_id: string;
    profile_pic: string;
    role: string;
    full_name: string;
  } | null;
}

export const context = createContext<SessionData | null>(null);

export function SessionProvider({children, session}:{children:React.ReactNode, session:any}) {

  return (
    <context.Provider value={session}>
      {children}
    </context.Provider>
  )
}

export const useClientSession = (): SessionData | null => useContext(context);
