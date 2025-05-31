'use client'
import Navbar from "@/components/navbar";
import RootSideBar from "@/components/rootSidebar";
import { usePathname } from "next/navigation";



export default function AppLayout({children}:{children:React.ReactNode}){

    const pathname = usePathname();

    const showSidebar = pathname === '/' || pathname === '/courses' || pathname === '/mentors' || pathname === '/my-courses' || pathname === '/sessions' || pathname === '/saved';

    return(
        <div className="">

            <div className="border-b-[1px] border-b-gray-300 fixed top-0 left-0 right-0 bg-white z-10 py-1.5">
                <Navbar/>
            </div>

            <div className="flex mt-13.5">

                <div className="fixed overflow-y-auto min-h-full border-r-[1px] border-r-gray-300">
                    {showSidebar && <RootSideBar/>}
                </div>

                <main className={`flex-1 ${showSidebar ? 'ml-60' : 'ml-0'} transition-all duration-100 bg-gray-50`}>
                    <div className="p-4 container mx-auto">
                        {children}
                    </div>        
                </main>

            </div>
  
        </div>
        
    )
}