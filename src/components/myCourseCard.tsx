'use client';
import Image from "next/image";
import Link from "next/link";
import { preload } from "swr";





export default function MyCourseCard({course}:{course:any}){


    const handleMouseEnter = () => {
        preload(`/api/courses/${course.id}`, async(url) => 
            await fetch(url).then(res => res.json())
        );
    };
 
    return(

        <Link prefetch 
        onMouseEnter={handleMouseEnter}
        href={`/my-courses/${course.id}`} key={course.id} className="bg-white rounded-lg shadow p-2 border border-gray-200"
        
        > 
            <div className="relative w-full h-44">
                <Image
                    src={course.thumbnail}
                    alt={"Course thumbnail"}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYyIiAvPjwvc3ZnPg=="
                    className="w-full h-40 object-cover rounded"
                />
            </div>
            <h3 className="mt-2 text-md font-semibold">
                {course.course_name}
            </h3>
            <p className="text-sm text-gray-600 pt-1">By {course.mentor_name}</p>

            <p className="mt-2 text-gray-700 text-sm line-clamp-2">{course.course_description}</p>

            <div className="mt-2">
                <div className="bg-gray-200 h-2 rounded-full">
                <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                ></div>
                </div>
            </div>
            
        </Link>

    )
}
       