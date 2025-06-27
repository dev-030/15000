import { Star } from "lucide-react";
import Image from "next/image";


const Rating = ({ score, reviews }:any) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score - fullStars >= 0.5;
    const starCount = hasHalfStar ? fullStars + 1 : fullStars;
    
    return (
      <div className="flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              size={15} 
              className={i < starCount ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
            />
          ))}
        </div>
        <span className="ml-1 text-sm font-md">{score}</span>
        <span className="ml-1 text-sm text-gray-500">({reviews})</span>
      </div>
    );
};


export default function CourseCard ({ course }:any){
  return (
     <div className="max-w-full rounded-md overflow-hidden border border-gray-200 bg-white shadow-xs hover:shadow-sm transition-shadow duration-300 cursor-pointer flex flex-col h-full">
      
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={course?.thumbnail}
          alt={course.course_name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-700 text-base line-clamp-2">{course.course_name}</h3>
        <p className="text-sm text-gray-500 mt-1">{course?.instructor}</p>

        <div className="mt-auto pt-4 flex items-center justify-between text-gray-600 text-sm">
          <Rating score={course?.rating} reviews={course?.reviews} />
          <span className="font-semibold text-gray-800">${course.course_price}</span>
        </div>
      </div>
    </div>
  );
};