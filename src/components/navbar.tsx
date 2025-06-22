'use client'

import { logOut } from "@/lib/auth";
import { useClientSession } from "@/context/sessionProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlignJustify, LayoutDashboard, LogOut, Menu, Rss, Search, User, UserRound } from "lucide-react";



export default function Navbar({state, setState}:{state:boolean, setState:React.Dispatch<React.SetStateAction<boolean>>}) {

    const session = useClientSession(); 
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [activeDropdown, setActiveDropdown] = useState<"userMenu" | null>(null);

    // ---------- handle click outside ----------
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      };
        document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    
    return (
        <nav className="flex justify-between items-center py-0.5">

            <div className="hidden max-[700px]:block">
                <AlignJustify onClick={()=> setState(!state)} size={25} className="text-gray-700 font-bold"/>
            </div>

            <a href="/" className="text-blue-600 text-3xl font-bold ">edcluster</a>

            {/* <div className="relative max-w-4xl">
                <input 
                    type="text" 
                    placeholder="Search courses, mentors, topics..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div> */}

            <div className="flex items-center gap-2">

                
                {!session ? (
                    <>
                        <Link href="/login" className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Login
                        </Link>
                        {/* <Link href="/register" className="text-gray-700 text-sm font-medium border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                            Register
                        </Link> */}
                    </>
                    ):(
                    <>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() =>
                                    setActiveDropdown(activeDropdown === "userMenu" ? null : "userMenu")
                                }
                                className="flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
                                >
                                <img
                                    src={session.user?.profile_pic}
                                    alt="profile"
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                            </button>

                            <div className={`absolute right-0 mt-2.5 w-56 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden transition-all duration-150 z-50 
                            ${ activeDropdown === "userMenu" ? "opacity-100 pointer-events-auto": "opacity-0 pointer-events-none"}`}>
                                <div className="flex flex-col px-4 py-3 space-y-2">
                                    <Link href="#" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition py-2 hover:bg-slate-100 px-3 rounded-md">
                                        <User size={18} /> Profile
                                    </Link>

                                    <Link href="/mentor/dashboard" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition py-2 hover:bg-slate-100 px-3 rounded-md">
                                        <LayoutDashboard size={18} /> Dashboard
                                    </Link>
                                    
                                    <button onClick={() => logOut()} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition py-2 hover:bg-slate-100 px-3 rounded-md cursor-pointer">
                                        <LogOut size={18} /> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </nav>
    )
}