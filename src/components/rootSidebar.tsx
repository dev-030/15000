'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { GraduationCap, House, MonitorPlay, BookText, CalendarCheck, Bookmark, SquareUserRound } from "lucide-react";
import { useClientSession } from "@/context/sessionProvider";



type LinkItem = {
    name: string;
    href: string;
    icon: IconType;
    requiresAuth?: boolean;
};


const links: LinkItem[] = [
    { name: "Home", href: "/", icon: House },
    { name: "Courses", href: "/courses", icon: BookText },
    { name: "Mentorships", href: "/mentors", icon: GraduationCap },
    { name: "My Courses", href: "/my-courses", icon: MonitorPlay },
    { name: "Booked Sessions", href: "/sessions", icon: CalendarCheck },
    { name: "Saved", href: "/saved", icon: Bookmark },
    { name: "Become a Mentor", href: "/onboarding", icon: SquareUserRound, requiresAuth: true }
];

export default function RootSideBar({state, setState}:{state:boolean, setState:React.Dispatch<React.SetStateAction<boolean>>}){

    const user = useClientSession();

    const pathname = usePathname();

    const visibleLinks = links.filter(link => {
        if (link.requiresAuth && !user) return false;
        if (link.href === "/onboarding" && user?.user?.role === 'mentor') return false;
        return true;
    });

    return(
        <>
            <aside className="w-60 px-3 pt-4">

                <nav className="flex flex-col gap-2">
                   {visibleLinks.map((link) => (
                        <Link onClick={()=> setState(!state)}
                        key={link.name}
                        href={link.href}
                        className={clsx("flex items-center gap-2 py-2.5 px-3 rounded-md text-[15px] hover:bg-slate-50",
                            (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ? "bg-[#eff6ff] text-blue-700" : "text-gray-600"
                        )}
                    >
                        <link.icon size={20}/>
                        <h1>{link.name}</h1>
                    </Link>
                    )
                   )}
                </nav>

                {!user && (
                    <div className="grid gap-2 mt-10">

                        <Link href="/login" className="bg-blue-500 text-white text-center text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Login
                        </Link>

                        <Link href="/register" className="text-gray-700 text-sm text-center font-medium border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                            Register
                        </Link>

                    </div>
                )}
                
                 

            </aside>
        </>
    )
}