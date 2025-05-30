'use client'

import { logOut } from "@/lib/auth";
import { useClientSession } from "@/context/sessionProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogOut, Rss, Search, UserRound } from "lucide-react";
import { FaCoins } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";


export default function Navbar() {

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
        <div>
            <div className="flex justify-between items-center mx-7 py-0.5">

                <a href="/" className="text-blue-400 text-3xl font-bold">edcluster</a>

                <div className="relative ">
                    <input 
                        type="text" 
                        placeholder="Search courses, mentors, topics..." 
                        className="w-2xl pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                <div className="flex items-center gap-2">
                    {!session && (
                        <>
                            <Link href="/login" className="bg-blue-500 text-white font-semibold border border-blue-500  rounded-md text-sm px-2.5 py-2">
                                Login
                            </Link>
                            <Link href="/register" className="font-semibold text-gray-600 border border-gray-600 rounded-md text-sm px-2.5 py-2">
                                Register
                            </Link>
                        </>
                    )}
                    {session && (
                        <>
                            <div className="relative" ref={dropdownRef}>

                                <button onClick={() => setActiveDropdown(activeDropdown === "userMenu" ? null : "userMenu")} 
                                    className=" flex flex-row items-center gap-1 cursor-pointer">
                                    <img src={session.user?.profile_pic} className="h-10 w-10 rounded-full" alt="profile_pic"/>
                                </button>

                                <div className={`absolute z-[10] right-3 mt-2 w-60 mr-[-13px] origin-top-right bg-white border border-gray-200 divide-y rounded-medium transform transition-all duration-100
                                ${activeDropdown === "userMenu" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                                    <div className="flex flex-col items-center gap-2 p-3">
                                        <Link href="/mentor/dashboard">
                                            Dashboard
                                        </Link>
                                        <button onClick={()=> logOut()} className="flex items-center gap-3 px-3 py-1.5 cursor-pointer">
                                            <LogOut size={20}/> logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}