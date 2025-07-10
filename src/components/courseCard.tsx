import { Star } from "lucide-react";
import Image from "next/image";

interface Course {
  id: string;
  course_name: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  course_price: number;
  category?: string;
}

const Rating = ({ score, reviews }: { score: number; reviews: number }) => {
  const fullStars = Math.floor(score);
  const hasHalfStar = score - fullStars >= 0.5;
  const starCount = hasHalfStar ? fullStars + 1 : fullStars;
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={14} 
            className={i < starCount ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">{score}</span>
      <span className="text-sm text-gray-500">({reviews})</span>
    </div>
  );
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group w-full max-w-2xl rounded-md overflow-hidden bg-white shadow-sm transition-all duration-300 cursor-pointer border border-gray-200">
      
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={course?.thumbnail || '/placeholder-course.jpg'}
          alt={course?.course_name || 'Course thumbnail'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2IiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjE2Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=="
        />
        
        {course?.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm">
              {course.category}
            </span>
          </div>
        )}
      </div>

      <div className="py-3 px-3">
        <h3 className="font-semibold text-gray-800 text-md leading-tight line-clamp-2 mb-2">
          {course?.course_name}
        </h3>
        
        <p className="text-xs text-gray-500 mb-2">
          {course?.mentor_name}
        </p>

        <p className="text-gray-600 text-sm line-clamp-2">{course?.course_description}</p>

        <div className="flex items-center justify-between mt-2">
          <Rating score={4 || 0} reviews={2 || 0} />
          <div className="text-right">
            <span className="text-md font-bold text-gray-800">
              ${course.course_price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}