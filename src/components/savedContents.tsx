import { apiService } from "@/lib/actions/api";
import { auth } from "@/lib/auth";
import { BookmarkX } from "lucide-react";
import { redirect } from "next/navigation";




export default async function SavedContents() {

    const user = await auth();
    
    if(!user) redirect('/login');

    const data = await apiService.get('#',{
        requiresAuth: true,
        cache: 'no-cache'
    })
    .catch(error => {
        console.error({"ERROR":error.message});
    })

    return (
        <div>
      
        {data ? (
            <div>
                the content goes here.......
            </div>
        ):(
            <div className="grid place-content-center min-h-screen  mt-[-5.5rem]">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-5xl text-blue-500">         
                    <BookmarkX className="h-20 w-20 text-blue-500 mb-4" />
                    </div>
                    <p className="text-lg font-semibold mb-2">
                        You currently don't have anything saved
                    </p>
                    <p className="text-sm text-gray-600 mb-4 w-2/3 text-center">
                        You can save courses and sessions to access them later.
                    </p>
                    
                </div>
            </div>
        )}

    </div>
    )
}