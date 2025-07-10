import Image from "next/image";
import Link from "next/link";





export default function MentorShipCard({mentor}:{mentor:any}){


    return(
        <div key={mentor.id} className="">
            <div className="group w-full max-w-2xl rounded-md overflow-hidden bg-white shadow-sm transition-all duration-300 border border-gray-200">
                
                <div className="relative w-full h-44 overflow-hidden">
                    <Image
                    src={mentor?.thumbnail_url || '/placeholder-course.jpg'}
                    alt={mentor?.title || 'Mentorship thumbnail'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2IiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjE2Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=="
                    />
                </div>
            
                <div className="py-3 px-3 flex flex-col">
                    <h3 className="font-semibold text-gray-800 text-md leading-tight line-clamp-2 mb-2">
                    {mentor?.title}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mb-2">
                    {mentor?.mentor?.full_name}
                    </p>
            
                    <p className="text-gray-600 text-sm line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas commodi suscipit possimus eveniet ratione culpa officiis, enim sint vero molestiae. Facere expedita enim, ipsam laudantium deleniti iste incidunt similique magni nobis et voluptate autem pariatur libero iure molestiae minus quisquam blanditiis suscipit iusto voluptas velit debitis, illum quis? Delectus.</p>

                    <div className="flex items-stretch gap-2 justify-between py-3">
                    <div className="bg-slate-100 rounded-md py-1.5 w-full flex flex-col gap-0.5 items-center justify-center border border-slate-200">
                        <p className="text-gray-500 text-xs">Duration</p>
                        <p className="text-gray-700 text-sm">{mentor?.duration}</p>
                    </div>
                    <div className="bg-slate-100 rounded-md py-1.5 w-full flex flex-col gap-0.5 items-center justify-center border border-slate-200">
                        <p className="text-gray-500 text-xs">Price</p>
                        <p className="text-gray-700 text-sm">{mentor?.price}</p>
                    </div>
                    <div className="bg-slate-100 rounded-md py-1.5 w-full flex flex-col gap-0.5 items-center justify-center border border-slate-200">
                        <p className="text-gray-500 text-xs">Type</p>
                        <p className="text-gray-700 text-sm">1-on-1</p>
                    </div>
                    </div>

                    <Link href={`/mentors/${mentor.id}`} className="bg-blue-600 p-2 text-center w-full rounded-full text-white text-sm">Book Now</Link>
            
                </div>
            </div>

        </div>
    )
}