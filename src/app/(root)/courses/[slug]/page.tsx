'use client'
import { BuyCourse } from "@/lib/actions/actions";
import { ChevronDown, CirclePlay, Heart, Star } from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";




export default function CourseDetails(){

    const params = useParams();
    
    const {data} = useSWR(`/api/courses/${params.slug}`, (url: string) =>
        fetch(url).then((res) => res.json())
    );

    return(

        <div className="flex gap-10 w-full">

            <div className="bg-white p-20 rounded-xl border border-gray-400 w-2/3">
                <h1>{data?.course_name}</h1>
                <p>{data?.course_description}</p>
                <div className="flex bg-amber-500 gap-2 items-center">   
                    {/* <p>{data?.rating.value}</p> 
                    <p>{data?.rating.count}</p> */}
                </div>
                
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
                                        <div className="flex items-center gap-2">
                                            <CirclePlay size={20}/>
                                            <h1>{content.video_title}</h1>
                                        </div>
                                        <p>{content?.length}</p>
                                    </div>
                                ))}
                            
                            </div>
                        </details>
                    ))}
                </div>


            </div>

            <div className="bg-white p-20 rounded-xl border border-gray-400">
                <h1>right part</h1>
                <button onClick={()=>BuyCourse({course_id:data.id})} className="bg-blue-600 p-3 rounded-lg text-white mt-2 cursor-pointer">Buy Course</button>
            </div>


        </div>
    )
}