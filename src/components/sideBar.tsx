'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { CalendarDays, LayoutPanelLeft, MonitorCog, Video, Wallet } from "lucide-react";



type LinkItem = {
    name: string;
    href: string;
    icon: IconType;
};


const links: LinkItem[] = [
    { name: "Dashboard", href: "/mentor/dashboard", icon: LayoutPanelLeft },
    { name: "Course Management", href: "/mentor/course-management", icon: MonitorCog },
    { name: "Session Management", href: "/mentor/session-management", icon: CalendarDays },
    { name: "Sessions", href: "/mentor/sessions", icon: Video },
    { name: "Earnings", href: "#", icon: Wallet },
];

export default function SideBar({state, setState, isProfileComplete}:{state:boolean, setState:React.Dispatch<React.SetStateAction<boolean>>, isProfileComplete:boolean}){

    const pathname = usePathname();

    return(
        <div>
            <aside className="w-60 px-3 pt-4 ">
                <a href="/mentor/dashboard" className="text-3xl font-bold text-blue-500">edcluster</a>

                <div className="text-3xl font-bold text-blue-500 pt-10 min-[700px]:hidden">
                    <a href="/mentor/dashboard" className="text-3xl font-bold text-blue-500">edcluster</a>
                </div>

                <nav className="flex flex-col gap-1.5 mt-20 max-[700px]:mt-10">
                {links.map((link) => (
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


                {!isProfileComplete &&
                    <div className="bg-red-50 border border-red-200 text-gray-500 text-sm font-medium px-4 py-4 rounded-md mt-10 flex items-center gap-2">
                        <p>Please complete your profile for creating course and mentorships.</p>
                    </div>
                }
               
            </aside>
        </div>
    )
}