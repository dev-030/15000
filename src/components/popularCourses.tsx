import { Star } from "lucide-react";
import Link from "next/link";
import CourseCard from "./courseCard";
import { apiService } from "@/lib/actions/api";




export default async function PopularCourses(){

  const data = await apiService.get('/client/courses/').catch((error) => {
      console.error({"ERROR":error.message});
  })

  return(

      <div className="mt-8">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700 pb-4">Popular Courses</h2>
      </div>

      <div className="grid grid-cols-1 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
        {data?.map((course:any) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <CourseCard course={course}/>
            </Link>
          ))}
      </div>

    </div>
  )
}