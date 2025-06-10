'use client'

import { useRouter } from "next/navigation"




export default function VideoList({currentVideoId}:{currentVideoId:string}){


    const router = useRouter();


    return(
        <div>
        
        hello

            <button
            className="p-2 m-2 bg-blue-600 rounded-md text-white cursor-pointer"
             onClick={()=> router.push(`/my-courses/383928?video=${new Date().getMilliseconds()}`)}>new one</button>

        </div>
    )
}