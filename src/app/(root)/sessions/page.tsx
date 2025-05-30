import MySessionsCard from '@/components/MySessionsCard';
import { Suspense } from 'react';



export default function Sessions () {


  return (
    <div className="min-h-screen">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Sessions</h2>
        <p className="text-gray-600 text-sm">Explore expert-led courses across various skills</p>
      </div>

      <Suspense fallback={<div>Loading the contents.....</div>}>
        <MySessionsCard/>
      </Suspense>

    </div>
  );
};

