'use client';
import { Award, Calendar, Clock4, Star, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function InstructorCard({ instructor }: { instructor: any }) {
  return (
    <div className="flex flex-col border border-gray-300 bg-white rounded-md shadow-md max-w-[255px] h-[450px] overflow-hidden hover:shadow-lg transition">
      {/* Image Section */}
      <div className="relative w-[255px] h-[200px]">
        <Image
          src={instructor.image}
          alt={instructor.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-grow p-3">
        {/* Top Content */}
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div>
              <h2 className="font-semibold text-md">{instructor.name}</h2>
              <p className="text-sm text-gray-500">{instructor.title}</p>
            </div>
            <span className="text-yellow-500 text-sm flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" /> {instructor.rating}
            </span>
          </div>

          <ul className="text-xs text-gray-500 mt-3 space-y-2.5">
            <li className="flex items-center gap-1">
              <Calendar size={16} /> {instructor.experience}
            </li>
            <li className="flex items-center gap-1">
              <Video size={16} /> {instructor.sessions}
            </li>
            <li className="flex items-center gap-1">
              <Award size={16} /> {instructor.skills}
            </li>
          </ul>
        </div>

        {/* Bottom Content */}
        <div>
          <div className="flex items-center justify-between gap-2 text-gray-500 mt-0">
            <div className="flex items-center gap-1 text-sm">
              <Clock4 size={16} /> {instructor.availability}
            </div>
            <span className="font-semibold text-gray-800 text-sm">{instructor.price}</span>
          </div>
          <Link href={`/mentors/${instructor.id}`}>
            <button className="w-full mt-3 p-3 text-sm bg-black text-white rounded hover:bg-gray-800 cursor-pointer">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
