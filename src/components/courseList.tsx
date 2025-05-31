import axios from "axios";
import Link from "next/link";
import CourseCard from "./courseCard";





export default async function CourseList({params}:any){

    
    const data = await fetch('https://frontend.edcluster.com/api/courses',{
        method: 'GET',
    })
    .then((res) => res.json())
    .catch((error) => {
        console.log(error, '🔴');
    })


    return (
        <>
            <div className="grid grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
                {data?.map((course:any) => (
                    <Link href={`/courses/${course.id}`} key={course.id}>
                        <CourseCard course={course}/>
                    </Link>
                ))}
            </div>
        </>
    )
}