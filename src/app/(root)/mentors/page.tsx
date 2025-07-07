import { Suspense } from 'react';
import MentorFilters from '@/components/mentorFilters';
import MentorList from '@/components/MentorList';
import TopMentors from '@/components/TopMentors';
import MentorCardsSkeleton from '@/components/MentorCardsSkeletorn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';





export default async function MentorsPage({ searchParams }: any) {
 
  const params = await searchParams;

  return (
    <main className="min-h-screen">

      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Mentorships</h2>
        <p className="text-gray-600 text-sm">Book 1:1 sessions with experts across various skills</p>
      </div>

      {/* <Suspense  fallback={<p>Loading filters…</p>}>
        <MentorFilters searchParams={params}/>
      </Suspense> */}

      <Suspense  fallback={<MentorCardsSkeleton/>}>
        <TopMentors /> 
      </Suspense>


      <Suspense fallback={<MentorCardsSkeleton/>}>
        <MentorList params={params} />
      </Suspense>


      <div className="flex justify-center mt-12">
        <nav className="flex items-center gap-1">
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 flex items-center justify-center border border-gray-300 bg-blue-500 text-white rounded-md text-sm">
            1
          </button>
          <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100">
            2
          </button>
          <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100">
            12
          </button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
      

      <div className="mt-14 bg-blue-500 rounded-lg px-4 py-2 text-white flex justify-between items-center">
        <div>
          <h3 className="font-medium text-sm mb-1">Become a Mentor</h3>
          <p className="text-xs text-indigo-100">Share your expertise, help others grow, and earn additional income!</p>
        </div>
        <Link href="/onboarding" className="bg-white text-blue-600 hover:bg-gray-100 text-xs font-medium py-2 px-4 rounded">
          Apply Now
        </Link>
      </div>

    </main>
  );
}









