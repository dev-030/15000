'use client'
import SideBar from "@/components/sideBar";
import { useClientSession } from "@/context/sessionProvider";
import { Menu } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";




export default function MentorLayout({children}:{children:React.ReactNode}){

    const user = useClientSession();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 700) {
        setIsOpen(false);
        }
    }, []);
    
    if (user?.user.role !== 'mentor') {
      redirect('/');  
    }
  
    return(
        <div className="flex">
            
            <div className={`
                fixed top-0 left-0 z-40 h-full bg-white border-r border-gray-300 transition-transform duration-300 ease-in-out w-60 min-w-[240px]
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} min-[700px]:translate-x-0`}>
                <SideBar state={isOpen} setState={setIsOpen}/>
            </div>

            <main className=" max-[700px]:ml-0 ml-60 w-screen">
                
                <div className="sticky top-0 z-50 bg-white px-4 flex items-center max-[700px]:justify-between justify-end w-full gap-2 py-2 border-b-[1px] border-b-gray-300">
                    <Menu className="min-[700px]:hidden" onClick={()=> setIsOpen(!isOpen)} size={25}/>
                    <div className="flex items-center gap-2 ml-full pr-3">
                        <img src={user?.user.profile_pic} className="h-10 w-10 rounded-3xl" />
                        <h1>{user?.user.full_name}</h1>
                    </div>
                </div>

                <div>
                    {children}
                </div>

            </main>
        </div>
    )
}