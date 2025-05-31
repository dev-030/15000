import BookedSessions from '@/components/bookedSessions';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { Suspense } from 'react';



export default async function Sessions () {

  const user = await auth();


  return (
    <div className="min-h-screen">

       {user ? (
        <Suspense fallback={<p>Loading...</p>}>
          <BookedSessions/>
        </Suspense>
      ):(
        <div className="grid place-content-center min-h-screen mt-[-5.5rem]">

          <div className="flex flex-col gap-4 place-items-center bg-white p-10 rounded-lg shadow-sm">
            <h1 className="text-gray-500 text-base mb-2">
              Please sign in to view your booked sessions
            </h1>
            <Link href="/login" className="bg-blue-500 text-white font-semibold border border-blue-500  rounded-md text-sm px-2.5 py-2">
              Login
            </Link>
          </div>

        </div>
        )
      }

    </div>
  );
};

