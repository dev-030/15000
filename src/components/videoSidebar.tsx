import { ChevronDown, CirclePlay } from "lucide-react";
import Link from "next/link";



export default function VideoSidebar(data:any){

    return (
        <div className='container mx-auto'>
                <div className="w-full max-w-md mx-auto mt-10 divide-y-[0.3px] divide-gray-600 border-[0.3px] border-gray-600">
                    {data.data.course_content.sections.map((item:any) => (

                        <details key={item.title} className="group motion-safe:transition-all motion-safe:duration-300">

                            <summary className="flex items-center justify-between cursor-pointer list-none p-4">
                                <div className="flex items-center gap-2">
                                    <span className="ml-2 text-gray-500 transition-transform motion-safe:duration-300 group-open:rotate-180">
                                        <ChevronDown />           
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {item.title}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <p>{item.lectures} lectures</p>
                                    <p>{item.length}min</p>
                                </div>
                            </summary>

                            <div className=" text-gray-600 space-y-4 bg-white p-4 border-t-[0.3px]">
                                {item.videos.map((content:any) => (
                                    <Link href={`/my-courses/2/${content.id}`} key={content.title} className="flex items-center justify-between gap-2 text-sm ml-10">
                                        <div className="flex items-center gap-2">
                                            <CirclePlay size={20}/>
                                            <h1>{content.title}</h1>
                                        </div>
                                        <p>{content.length}</p>
                                    </Link>
                                ))}
                            
                            </div>
                        </details>
                    ))}
                </div>

            </div> 
    )
}