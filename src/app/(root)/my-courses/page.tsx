import Link from "next/link";
import { auth } from "@/lib/auth";
import MyCoursesComponent from "@/components/myCourses";
import { Suspense } from "react";
import { ArrowRight, Lock, MonitorPause, TvMinimalPlay, Youtube } from "lucide-react";



export default async function MyCourses() {

  const user = await auth();


  return (
    <div className="min-h-screen">

      {user ? (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
        }>
          <MyCoursesComponent/>
        </Suspense>
      ):(
        <div className="grid place-content-center min-h-screen mt-[-5.5rem]">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-5xl text-blue-500">         
              <MonitorPause className="h-20 w-20 text-blue-500 mb-4" />
            </div>
            <p className="text-lg font-semibold mb-2">
              Sign in to access your courses
            </p>
            <p className="text-sm text-gray-600 mb-4 w-2/3 text-center">
              Please sign in to view your enrolled courses and continue your learning journey.
            </p>
            <Link href={`/login`} className="group px-4 py-2 flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-3xl font-medium overflow-hidden relative border border-blue-600">
              <span className="relative z-10">Sign In</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
        )
      }

    </div>
  )
}



