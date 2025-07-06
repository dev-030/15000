'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VideoList({currentVideoId, data}:{currentVideoId:string, data:any}) {

    const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
        [data.sections[0]?.id]: true
    });

    const router = useRouter();

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };


    return (
        <div className="w-full border border-gray-200 rounded-md">
            <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-base md:text-lg font-semibold text-gray-800">Course content</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
                {data.sections.map((section:any, index:number) => (
                <div key={section.id} className="bg-white">
                    <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-800 text-sm">
                        {section.section_name}
                        </h3>
                    </div>
                    <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-1">
                        {expandedSections[section.id] ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                    </div>
                    </button>
                    
                    {expandedSections[section.id] && (
                    <div className="px-2 pb-2 space-y-1">
                        {section.videos.map((lesson:any) => (
                        <div onClick={() => router.push(`/my-courses/${data.id}?video=${lesson.id}`)}
                            key={lesson.id}
                            className={`flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded transition-colors duration-150 cursor-pointer ${currentVideoId === lesson.id ? "bg-blue-50" : ""}`}
                        >                    
                            <div className="flex items-center space-x-3">
                            <Play className="w-3 h-3 text-gray-500" />
                            <span className="text-xs md:text-sm text-gray-700">
                                {lesson.video_title}
                            </span>
                            </div>
                            <span className="text-xs text-gray-500">
                            {10} min
                            </span>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
};