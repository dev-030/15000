'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { RxDashboard } from "react-icons/rx";
import { IoBookOutline } from "react-icons/io5";
import { GraduationCap, House, MonitorDot, MonitorPlay, Radio, TvMinimalPlay, BookText, CalendarCheck, Bookmark, User, SquareUserRound } from "lucide-react";



type LinkItem = {
    name: string;
    href: string;
    icon: IconType;
};


const links: LinkItem[] = [
    { name: "Home", href: "/", icon: House },
    { name: "Courses", href: "/courses", icon: BookText },
    { name: "Mentorships", href: "/mentors", icon: GraduationCap },
    { name: "My Courses", href: "/my-courses", icon: MonitorPlay },
    { name: "Booked Sessions", href: "/sessions", icon: CalendarCheck },
    { name: "Saved", href: "/saved", icon: Bookmark },
    { name: "Become a Mentor", href: "/onboarding", icon: SquareUserRound },

];

export default function RootSideBar(){

    const pathname = usePathname();

    return(
        <>
            <aside className="w-60 px-3 pt-4">

                <nav className="flex flex-col gap-2">
                   {links.map((link) => (
                        <Link 
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

            </aside>
        </>
    )
}