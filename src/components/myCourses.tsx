import { Landmark } from "lucide-react";
import Link from "next/link";
import CourseCard from "./courseCard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";



export default async function MyCoursesComponent(){

    const user = await auth();

    if(!user) return redirect('/login');

    const data = await fetch('https://frontend.edcluster.com/api/courses',{
        method: 'GET',
    })
    .then((res) => res.json())
    .catch((error) => {
        console.log(error, '🔴');
    })
      
      
  return(
    <div>
      
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
          <p className="text-gray-600 text-sm">Access your learning anytime</p>
        </div>

        {data ? (
            <div className="grid grid-cols-1 min-[830px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
                {data?.map((course:any) => (
                    <div key={course.id} className="bg-white rounded-lg shadow p-2 border border-gray-200">
                        <div className="relative">
                            <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-40 object-cover rounded"
                            />
                            <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${
                            course.status === 'In Progress'
                                ? 'bg-green-200 text-green-800'
                                : course.status === 'New Started'
                                ? 'bg-yellow-200 text-yellow-800'
                                : course.status === 'Completed'
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-gray-200 text-gray-800'
                            }`}>
                            {course.status}
                            </span>
                        </div>
                        <h3 className="mt-2 text-md font-semibold">
                            {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 pt-2">By {course.instructor}</p>
                        <div className="mt-2 text-sm text-gray-500">
                            {course.status === 'Completed' && course.completedAt && (
                            <p>Completed: {course.completedAt}</p>
                            )}
                            {course.status !== 'Completed' && course.lastAccessed && (
                            <p>Last accessed: {course.lastAccessed}</p>
                            )}
                        </div>
                        <div className="mt-2">
                            <div className="bg-gray-200 h-2 rounded-full">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                            ></div>
                            </div>
                        </div>
                        <button className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded">
                            {course.status === 'Completed' ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center mt-14">

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
                        {data.map((course:any) => (
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