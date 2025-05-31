import SideBar from "@/components/sideBar";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";




export default async function MentorLayout({children}:{children:React.ReactNode}){

    const role = await auth()

    if (role?.user.role !== 'mentor') {
      redirect('/');  
    }
  
    return(
        <div className="flex">
            
            <div className="fixed overflow-y-auto min-h-full border-r-[1px] border-r-gray-300">
                <SideBar/>
            </div>

            <main className="ml-60 w-screen">
                
                <div className="sticky top-0 z-50 bg-white flex justify-end w-full gap-2 py-2 border-b-[1px] border-b-gray-300">
                    <div className="flex items-center gap-2 ml-full pr-3">
                        <img src={role.user.profile_pic} className="h-10 w-10 rounded-3xl" />
                        <h1>{role.user.full_name}</h1>
                    </div>
                </div>
                <div>
                     {children}
                </div>

            </main>
        </div>
    )
}