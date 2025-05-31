import Link from "next/link";
import { auth } from "@/lib/auth";
import MyCoursesComponent from "@/components/myCourses";
import { Suspense } from "react";



export default async function MyCourses() {

  const user = await auth();

  return (
    <div className="min-h-screen">

      {user ? (
        <Suspense fallback={<p>Loading...</p>}>
          <MyCoursesComponent/>
        </Suspense>
      ):(
        <div className="grid place-content-center min-h-screen mt-[-5.5rem]">

          <div className="flex flex-col gap-4 place-items-center bg-white p-10 rounded-lg shadow-sm">
            <h1 className="text-gray-500 text-base mb-2">
              Please sign in to view and manage your enrolled courses
            </h1>
            <Link href="/login" className="bg-blue-500 text-white font-semibold border border-blue-500  rounded-md text-sm px-2.5 py-2">
              Login
            </Link>
          </div>

        </div>
        )
      }

    </div>
  )
}



