'use client'
import Navbar from "@/components/navbar";
import RootSideBar from "@/components/rootSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";



export default function AppLayout({children}:{children:React.ReactNode}){

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const showSidebar =
    windowWidth <= 700 ||
    pathname === '/' ||
    pathname === '/courses' ||
    pathname === '/mentors' ||
    pathname === '/my-courses' ||
    pathname === '/sessions' ||
    pathname === '/saved';

    useEffect(() => {
        function handleResize() {
        setWindowWidth(window.innerWidth);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(

        <div>

            <div className="px-4 fixed top-0 left-0 right-0 bg-white z-10 py-1.5">
                <Navbar state={isOpen} setState={setIsOpen}/>
            </div>

            <div className="flex mt-[3.3rem]">

                <div className={`fixed overflow-y-auto min-h-full bg-white z-50 transition-transform duration-300 ease-in-out
                    ${showSidebar ? `${windowWidth <=700 ? `${isOpen ? 'translate-x-0':'-translate-x-full'}`:''}`:'hidden'}`}>
                    <RootSideBar state={isOpen} setState={setIsOpen}/>
                </div>



                {isOpen && showSidebar && (
                    <div className="fixed inset-0 z-30 bg-black/50 min-[700px]:hidden mt-13.5"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                <main className={`flex-1 ${showSidebar ? 'ml-0 min-[700px]:ml-60' : 'ml-0'} transition-all duration-100`}>
                    <div className="p-4 container mx-auto">
                        {children}
                    </div>        
                </main>

            </div>
  
        </div>
        
    )
}