import { Suspense } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseFilters from "@/components/courseFilters";
import CourseList from "@/components/courseList";




export default async function Courses() {

  // const params = await searchParams;

  return (
    <>
      <main className="min-h-screen">

        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
          <p className="text-gray-600 text-sm">Explore expert-led courses across various skills</p>
        </div>


        {/* <Suspense  fallback={<p>Loading filters…</p>}>  
          <CourseFilters searchParams={params}/>
        </Suspense> */}

        {/* <Suspense fallback={<p>Loading courses…</p>}>  
          <CourseList params={params}/>
        </Suspense> */}


        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-1">
            <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-300 bg-blue-500 text-white rounded-md text-sm">
              1
            </button>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              2
            </button>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              3
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              12
            </button>
            <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>

      </main>
    </>
  );
}



