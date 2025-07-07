'use client'

import { createContext, useContext, useEffect, useState } from "react";

interface SessionData {
  user?: {
    username: string;
    user_id: string;
    profile_pic: string;
    role: string;
    full_name: string;
  } | null;
  loading: boolean;
}

export const context = createContext<SessionData | null>(null);

export function SessionProvider({ children }:{children:React.ReactNode}) {

  const [session, setSession] = useState<SessionData>({ user: null, loading: true });

  useEffect(() => {
    fetch('/api/auth/session')
    .then(res => res.json())
    .then(data => {
      setSession({ user: data.user, loading: false });
    })
    .catch(() => {
      setSession({ user: null, loading: false });
    });
  }, []);

  return (
    <context.Provider value={session}>
      {children}
    </context.Provider>
  )
}

export const useClientSession = (): SessionData | null => useContext(context);
