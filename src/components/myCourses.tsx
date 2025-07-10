import { Landmark } from "lucide-react";
import Link from "next/link";
import CourseCard from "./courseCard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { apiService } from "@/lib/actions/api";
import MyCourseCard from "./myCourseCard";



export default async function MyCoursesComponent(){

    const user = await auth();

    if(!user) return redirect('/login');


    const data = await apiService.get('/client/my-courses/',{
        requiresAuth: true
    })
    .catch((error) => {
        console.error({"ERROR":error.message});
    })

    console.log(data);

      
  return(
    <div>

        {data?.length > 0 ? (
            <div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                    <p className="text-gray-600 text-sm">Access your learning anytime</p>
                </div>

                <div className="grid grid-cols-1 min-[830px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
                    {data?.map((course:any) => (
                        <MyCourseCard course={course} key={course.id}/>
                    ))}
                </div>
            </div>

        ) : (
            <div className="text-center mt-20">

                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-5xl text-blue-500">         
                        <Landmark className="h-50 w-50 text-blue-500 mb-4 text-center" />
                    </div>
                    <p className="text-lg font-semibold mb-2">
                        You haven’t bought any courses yet
                    </p>
                    <p className="text-sm text-gray-600 mb-4 w-1/3">
                        Explore our courses and start learning today! We have a wide range of
                        courses to help you develop new skills.
                    </p>
                    <Link href={`/courses`} className="px-6 py-2 bg-blue-600 text-white rounded">
                        Browse Courses
                    </Link>
                </div>

                <div className="mt-10">
                    <h3 className="text-left text-lg font-semibold mb-2">Recommended for you</h3>
                    <div className="grid grid-cols-1 min-[830px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
                        {data?.map((course:any) => (
                            <Link href={`/courses/${course.id}`} key={course.id}>
                                <CourseCard course={course}/>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        )}
    </div>
  );
}