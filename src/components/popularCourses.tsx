import { Star } from "lucide-react";
import Link from "next/link";
import CourseCard from "./courseCard";
import { apiService } from "@/lib/actions/api";




export default async function PopularCourses({data}:{data:any}){

  return(

    <div className="mt-8">

      <h2 className="text-xl font-semibold text-gray-700 mb-2">Popular Courses</h2>
      <p className="text-gray-500 text-sm mb-5">Expand your skills with our top-rated courses</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {data.map((course:any) => (
           <Link href={`/courses/${course.id}`} key={course.id}>
            <CourseCard course={course}/>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center mt-10 text-sm">
        <Link href={"/courses"} className="bg-blue-500 text-white p-2 px-5 rounded-full text-center shadow-sm">View All Courses</Link>
      </div>

    </div>
  )
}