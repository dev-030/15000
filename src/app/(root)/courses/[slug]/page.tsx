'use client'
import { BuyCourse } from "@/lib/actions/actions";
import { ChevronDown, CirclePlay, Star, Award, BookOpen, Check } from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, PlayButton } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

export default function CourseDetails() {
    const params = useParams();
    const { data } = useSWR(`/api/courses/${params.slug}`, (url) =>
        fetch(url).then((res) => res.json())
    );

    const courseData = data;

    const totalLectures = courseData?.sections?.reduce((total, section) =>
        total + (section.total_lecture || section.videos?.length || 0), 0
    );

    const totalDuration = courseData?.sections?.reduce((total, section) =>
        total + (section.total_duration || 30), 0
    );

    return (
        <div className="min-h-screen bg-white">
                {/* Responsive grid: stack on mobile, 2 columns on md, 3 on lg */}
                <div className="flex justify-between w-full">

                    <div className="md:col-span-2 space-y-8">

                        <div>
                            <h1 className="text-2xl sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2">
                                {courseData?.course_name}
                            </h1>
                            <p className="text-gray-500 text-sm mb-4 sm:mb-6">
                                {/* {courseData?.course_description} */}
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae expedita veniam neque, voluptatum natus consequatur alias illum quam consectetur magnam!
                            </p>

                            <div className="flex items-center gap-2 mb-4 sm:mb-6">
                                <div className="flex">
                                    {[1,2,3,4,5].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <span className="text-gray-600 text-sm"> 4.8 (286 ratings)</span>
                            </div>
                        </div>

                        <div>
                            <MediaPlayer src={""} className="w-full aspect-video">
                                <MediaProvider />
                                <PlyrLayout icons={plyrLayoutIcons} />
                            </MediaPlayer>
                        </div>

                        <div className="border border-gray-200 p-4 rounded-lg">
                            <h1>What you'll learn</h1>

                            <div className="grid grid-cols-2 gap-0 space-x-1 mt-2 ">

                                <div className="flex items-center justify-start gap-2">
                                    <div className="p-[1px] bg-green-500 rounded-full w-fit ">
                                        <Check size={11} className="text-white" />
                                    </div>

                                    <p className="text-sm text-gray-700">Basics of python syntax and concepts</p>
                                </div>

                                <div className="flex items-center justify-start gap-2">
                                    <div className="p-[1px] bg-green-500 rounded-full w-fit ">
                                        <Check size={11} className="text-white" />
                                    </div>

                                    <p className="text-sm text-gray-700">Basics of python syntax and programming concepts</p>
                                </div>

                                <div className="flex items-center justify-start gap-2">
                                    <div className="p-[1px] bg-green-500 rounded-full w-fit ">
                                        <Check size={11} className="text-white" />
                                    </div>

                                    <p className="text-sm text-gray-700">Basics of python syntax and programming concepts</p>
                                </div>


                                <div className="flex items-center justify-start gap-2">
                                    <div className="p-[1px] bg-green-500 rounded-full w-fit ">
                                        <Check size={11} className="text-white" />
                                    </div>

                                    <p className="text-sm text-gray-700">Basics of python syntax and programming concepts</p>
                                </div>


                                <div className="flex items-center justify-start gap-2">
                                    <div className="p-[1px] bg-green-500 rounded-full w-fit ">
                                        <Check size={11} className="text-white" />
                                    </div>

                                    <p className="text-sm text-gray-700">Basics of python syntax and programming concepts</p>
                                </div>

                                <div className="flex items-center justify-start gap-2">
                                    <div className="p-[1px] bg-green-500 rounded-full w-fit ">
                                        <Check size={11} className="text-white" />
                                    </div>

                                    <p className="text-sm text-gray-700">Basics of python syntax and programming concepts</p>
                                </div>

                            </div>
                            
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Course content</h2>
                            <p className="text-gray-400 text-sm mb-4 sm:mb-6">
                                {courseData?.sections?.length} sections • {totalLectures} lectures • {Math.floor(totalDuration / 60)}h {totalDuration % 60}m total length
                            </p>
                            <div className="space-y-2">
                                {courseData?.sections?.map((section, index) => (
                                    <details
                                        key={section.id}
                                        className="group border border-gray-200 rounded-md overflow-hidden"
                                        open={index === 0}
                                    >
                                        <summary className="flex items-center justify-between cursor-pointer list-none p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                                                <span className="font-semibold text-sm sm:text-base">
                                                    {section.section_name}
                                                </span>
                                            </div>
                                            <span className="text-xs sm:text-sm text-gray-400">
                                                {section.total_lecture || section.videos?.length} lectures • {section.total_duration}min
                                            </span>
                                        </summary>
                                        <div className="border-t border-gray-200">
                                            {section.videos?.map((video) => (
                                                <div
                                                    key={video.id}
                                                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 pl-8 sm:pl-12 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                                >
                                                    <CirclePlay className="w-4 h-4 text-gray-400" />
                                                    <span className="flex-1 text-xs sm:text-sm">
                                                        {video.video_title}
                                                    </span>
                                                    <span className="text-xs sm:text-sm text-gray-400">
                                                        {video.duration || '15:30'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Course description</h1>

                        </div>

                        {/* Instructor */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Instructor</h2>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 border border-gray-200 p-3 rounded-md">
                                <img
                                    src={courseData?.mentor?.profile_pic}
                                    alt={courseData?.mentor?.full_name}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto sm:mx-0"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
                                        {courseData?.mentor?.full_name}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed py-2">
                                        {courseData?.mentor?.about}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4" />
                                            <span>4.3 Instructor Rating</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Award className="w-4 h-4" />
                                            <span>{courseData?.mentor?.total_students} Students</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            <span>{courseData?.mentor?.total_courses} Courses</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Reviews</h2>
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex">
                                    {[1,2,3,4,5].map((star) => (
                                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-base sm:text-lg">4.5 rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="md:col-span-1 order-first md:order-none">
                        <div className="sticky top-6 space-y-6">
                            {/* Course Preview Card */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={courseData?.thumbnail}
                                        alt={courseData?.course_name}
                                        className="w-full h-40 sm:h-48 object-cover"
                                    />
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center gap-1 text-lg font-semibold text-gray-600 mb-3 sm:mb-4">
                                        ৳ <span>{courseData?.course_price}</span>
                                    </div>
                                    <button
                                        onClick={() => BuyCourse({ course_id: courseData.id })}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded transition-colors mb-3 sm:mb-4 cursor-pointer"
                                    >
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}
