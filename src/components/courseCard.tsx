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
    <div className="max-w-72 rounded-lg overflow-hidden border border-gray-200 bg-white cursor-pointer flex flex-col h-full">

      <div className="w-full h-40 relative">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
      </div>

      <div className="px-3 py-3 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 text-[16px] my-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{course.instructor}</p>

        <div className="mt-auto pt-2 flex items-center justify-between text-gray-500">
          <Rating score={course.rating} reviews={course.reviews} />
          <div className="font-md text-md">{course.price.toFixed(2)}$</div>
        </div>
      </div>
    </div>
  );
};