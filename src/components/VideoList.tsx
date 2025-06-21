'use client'

import { ChevronDown, CirclePlay } from "lucide-react";
import { useRouter } from "next/navigation"




export default function VideoList({currentVideoId, data}:{currentVideoId:string, data:any}){


    const router = useRouter();

    return(
        <div>

            <div className="w-full max-w-md mx-auto mt-10 divide-y-[0.3px] divide-gray-600 border-[0.3px] border-gray-600">
                    {data?.sections.map((item:any) => (

                        <details key={item.id} className="group motion-safe:transition-all motion-safe:duration-300">

                            <summary className="flex items-center justify-between cursor-pointer list-none p-4">
                                <div className="flex items-center gap-2">
                                    <span className="ml-2 text-gray-500 transition-transform motion-safe:duration-300 group-open:rotate-180">
                                        <ChevronDown />           
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {item.section_name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <p>{item.total_lecture} lectures</p>
                                    <p>{item.total_duration}min</p>
                                </div>
                            </summary>


                            <div className="text-gray-600 space-y-4 bg-white p-4 border-t-[0.3px]">
                                {item.videos.map((content:any) => (
                                    <div key={content.id} className="flex items-center justify-between gap-2 text-sm ml-10">
                                        <button onClick={()=>router.push(`/my-courses/${data.id}?video=${content.id}`)} className="flex items-center text-nowrap gap-2 text-sm ml-10 cursor-pointer">
                                            <CirclePlay size={20}/>
                                            <h1>{content.video_title}</h1>
                                        </button>
                                        <p>{content?.length}</p>
                                    </div>
                                ))}
                            
                            </div>
                        </details>
                    ))}
                </div>
        </div>
    )
}