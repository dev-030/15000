'use client'

import { logOut } from "@/lib/auth";
import { useClientSession } from "@/context/sessionProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlignJustify, LogOut, Menu, Rss, Search, UserRound } from "lucide-react";



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
        <nav className="flex justify-between items-center py-0.5 sm:px-6 md:px-10">

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

                
                {/* {!session ? (
                    <>
                        <Link href="/login" className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Login
                        </Link>
                        <Link href="/register" className="text-gray-700 text-sm font-medium border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                            Register
                        </Link>
                    </>
                    ):(
                    <>
                        <div className="relative" ref={dropdownRef}>
                            <button
                            onClick={() =>
                                setActiveDropdown(activeDropdown === "userMenu" ? null : "userMenu")
                            }
                            className="flex items-center gap-2 hover:opacity-90 transition"
                            >
                            <img
                                src={session.user?.profile_pic}
                                alt="profile"
                                className="h-9 w-9 rounded-full object-cover"
                            />
                            </button>

                            <div
                            className={`absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden transition-all duration-150 z-50 ${
                                activeDropdown === "userMenu"
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                            }`}
                            >
                            <div className="flex flex-col px-4 py-3 space-y-2">
                                <Link
                                href="/mentor/dashboard"
                                className="text-sm text-gray-700 hover:text-blue-600 transition"
                                >
                                Dashboard
                                </Link>
                                <button
                                onClick={() => logOut()}
                                className="flex items-center text-sm gap-2 text-red-600 hover:text-red-700 transition"
                                >
                                <LogOut size={18} /> Logout
                                </button>
                            </div>
                            </div>
                        </div>
                    </>
                )} */}


                {!session && (
                    <>
                        <Link href="/login" className="bg-blue-500 text-white text-sm font-medium max-[400px]:px-2 px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Login
                        </Link>
                        <Link href="/register" className="text-gray-700 text-sm font-medium border border-gray-400 max-[400px]:px-2 px-4 py-2  rounded-md hover:bg-gray-100 transition">
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
        </nav>



    )
}