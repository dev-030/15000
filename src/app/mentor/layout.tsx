'use client'
import SideBar from "@/components/sideBar";
import { useClientSession } from "@/context/sessionProvider";
import { IsProfileComplete } from "@/lib/actions/actions";
import { logOut } from "@/lib/auth";
import { House, LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";




export default function MentorLayout({children}:{children:React.ReactNode}){

    const session = useClientSession();

    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<"userMenu" | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isProfileComplete, setIsProfileComplete] = useState(true);


    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 700) {
            setIsOpen(false);
        }

        const checkProfile = async () => {
            const res = await IsProfileComplete();
            setIsProfileComplete(res?.is_complete);
        }

        checkProfile();

    }, []);
   

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


    return(
        <div className="flex">
            
            <div className={`
                fixed top-0 left-0 z-40 h-full bg-white border-r border-gray-300 transition-transform duration-300 ease-in-out w-60 min-w-[240px]
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} min-[700px]:translate-x-0`}>
                <SideBar state={isOpen} setState={setIsOpen} isProfileComplete={isProfileComplete}/>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-30 bg-black/50 min-[700px]:hidden mt-13.5"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <main className=" max-[700px]:ml-0 ml-60 w-screen">
                
                <div className="sticky top-0 z-50 bg-white px-4 flex items-center max-[700px]:justify-between justify-end w-full gap-2 py-2 border-b-[1px] border-b-gray-300">

                    <Menu className="min-[700px]:hidden" onClick={()=> setIsOpen(!isOpen)} size={25}/>

                    <div className="relative" ref={dropdownRef}>

                        <button
                            onClick={() =>
                                setActiveDropdown(activeDropdown === "userMenu" ? null : "userMenu")
                            }
                            className="flex items-center gap-2 hover:opacity-90 transition cursor-pointer "
                            >
                            {session?.user?.profile_pic ? (
                                    <img
                                        src={session.user.profile_pic}
                                        alt="profile"
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
                            )}
                        </button>

                        <div className={`absolute right-0 mt-2.5 w-56 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden transition-all duration-150 z-50 
                        ${ activeDropdown === "userMenu" ? "opacity-100 pointer-events-auto": "opacity-0 pointer-events-none"}`}>
                            <div className="flex flex-col px-4 py-3 space-y-2">

                                <Link href="/" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition py-2 hover:bg-slate-100 px-3 rounded-md">
                                    <House size={18} /> Home
                                </Link>

                                <Link href={`/profile/${session?.user?.username}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition py-2 hover:bg-slate-100 px-3 rounded-md"
                                onClick={() =>
                                    setActiveDropdown(activeDropdown === "userMenu" ? null : "userMenu")
                                }
                                >
                                    <User size={18} /> Profile
                                </Link>
                                
                                <button onClick={async () => (await logOut()).success && (window.location.href='/')} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition py-2 hover:bg-slate-100 px-3 rounded-md cursor-pointer">
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {children}
                </div>

            </main>
        </div>
    )
}