'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { RxDashboard } from "react-icons/rx";
import { IoBookOutline } from "react-icons/io5";
import { CalendarDays, LayoutGrid, LayoutPanelLeft, MonitorCog, Radio, Video, Wallet } from "lucide-react";



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

export default function SideBar(){

    const pathname = usePathname();

    return(
        <div>
            <aside className="w-60 px-3 pt-4 ">
                <a href="/mentor/dashboard" className="text-3xl font-bold text-blue-500">edcluster</a>
                <nav className="flex flex-col gap-1.5 mt-20">
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
        </div>
    )
}