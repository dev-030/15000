'use client'
import React, { useEffect, useState } from 'react';
import { PlayCircle, UploadCloud, Trash2 } from 'lucide-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { useParams } from 'next/navigation';
import VideoSectionsUI from './videoUi';



const value  = {
    "id": "1",
    "title": "Money Management",
    "subtitle": "Learn how to save money, create a budget, and invest wisely with industry-expert guidance.",
    "course_content": {
      "total_sections": 4,
      "total_lectures": 32,
      "total_length": "1h 26m",
      "sections": [
        {
          "title": "Best Habits",
          "lectures": 5,
          "length": "8",
          "videos": [
            { "id": 1, "title": "Welcome to the course", "length": "1m" },
            { "id": 2, "title": "What is a habit?", "length": "2m" },
            { "id": 3, "title": "How to create a habit?", "length": "2m" },
            { "id": 4, "title": "Habits and their benefits", "length": "2m" }
          ]
        },
        {
          "title": "Best Practices and Planning",
          "lectures": 10,
          "length": "20",
          "videos": [
            { "id": 5, "title": "Welcome to the course", "length": "1m" },
            { "id": 6, "title": "What is a habit?", "length": "2m" },
            { "id": 7, "title": "How to create a habit?", "length": "2m" },
            { "id": 8, "title": "Habits and their benefits", "length": "2m" }
          ]
        },
        {
          "title": "Advanced Budget Strategies",
          "lectures": 8,
          "length": "30",
          "videos": [
            { "id": 9, "title": "Welcome to the course", "length": "1m" },
            { "id": 10, "title": "What is a habit?", "length": "2m" },
            { "id": 11, "title": "How to create a habit?", "length": "2m" },
            { "id": 12, "title": "Habits and their benefits", "length": "2m" }
          ]
        },
        {
          "title": "Investment Fundamentals",
          "lectures": 9,
          "length": "28",
          "videos": [
            { "id": 13, "title": "Welcome to the course", "length": "1m" },
            { "id": 14, "title": "What is a habit?", "length": "2m" },
            { "id": 15, "title": "How to create a habit?", "length": "2m" },
            { "id": 16, "title": "Habits and their benefits", "length": "2m" }
          ]
        }
      ]              
    } 
  }

export default function CourseManagement () {


    // const { slug } = await params;

    const params = useParams();

    // /course/detail/?course_id=0ac48526-42c8-44fe-8bc0-dbc0291cd7dd


    // const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/instructor/${slug}`, {
    //   method: 'GET',
    //   cache: 'no-cache', 
    // }).then((res) => res.json());
  
    // const [showInput, setShowInput] = useState(false);
    // const [showVideoInput, setVideoInput] = useState(false);

    // const [sectionName, setSectionName] = useState('');
    // const [sections, setSections] = useState([]);

    // const [videoTitle, setVideoTitle] = useState('');
    // const [videoFile, setVideoFile] = useState(null);
  
    const [courseTitle, setCourseTitle] = useState('Design Principles 101');
    const [category, setCategory] = useState('Design');
    const [tags, setTags] = useState(['UI Design', 'UI Design Fundamental']);
    const [description, setDescription] = useState('This course introduces the foundational concepts of UI design including principles, patterns, and usability.');
    const [thumbnail, setThumbnail] = useState<{ file: File; url: string } | null>(null);
    const [video, setVideo] = useState<{ file: File; url: string } | null>(null);




  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === 'thumbnail') setThumbnail({ file, url });
    if (type === 'video') setVideo({ file, url });
    e.target.value = '';
  };

  const handleRemove = (type: 'thumbnail' | 'video') => {
    if (type === 'thumbnail') setThumbnail(null);
    if (type === 'video') setVideo(null);
  };


    // const handleSectioinCreate = async () => {

    //     try {

    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/create-section/`,{
    //             course: params.slug,
    //             section_name: sectionName
    //         });
        
    //         const newSection = {
    //             id: response.data.id,
    //             title: sectionName,
    //             lectures: 0,
    //             videos: []
    //         };

    //         setSections(prev => [...prev, newSection]); 

    //         setSectionName('');
    //         setShowInput(false);
            
    //     } catch (error) {
    //         console.error('Failed to create section:', error);
    //     }

    // };



//   const handleUploadVideo = async (courseId:any) => {

//     if (!videoTitle || !videoFile) {
//         alert('Please enter title and select a video');
//         return;
//     }

//     // console.log(courseId, videoTitle, videoFile);

//     try {
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/add-video/`,{
//             title: videoTitle,
//             section_id: courseId,
//         });
//         console.log(response.data)
//     } catch (error) {
//         console.error('Failed to upload video:', error);
//     }
//   };


//   console.log(sections)

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">

    <h2 className="text-2xl font-bold mb-6">Course Management</h2>
    <p className="text-sm text-gray-500 mb-6"> Course Management</p>


    <Tabs>
        
        <TabList>
            <Tab>Basic info</Tab>
            <Tab>Course content</Tab>
        </TabList>

        <TabPanel>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">

                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Course Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 p-2 rounded">
                        <option>Select category</option>
                        <option value="Design">Design</option>
                        <option value="Development">Development</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Course Title</label>
                        <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="w-full border border-gray-300 p-2 rounded" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Course Tag</label>
                        <input type="text" placeholder="Add tag" className="w-full border border-gray-300 p-2 rounded" />
                        <div className="mt-2 flex gap-2 flex-wrap">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{tag}</span>
                        ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Course Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 p-2 rounded h-24" />
                        <p className="text-xs text-orange-500 mt-1">Minimum 150 characters and maximum of 250 chars required.</p>
                    </div>
                </div>


                <div className="space-y-6">
                    <div className="flex gap-4">
                        {/* Intro Video */}
                        <div className="w-1/2">
                        <label className="block mb-1 font-medium">Intro Video</label>
                        <label htmlFor="introVideo" className="cursor-pointer border-2 border-dashed border-gray-300 w-full aspect-video flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 relative">
                            {video ? (
                            <>
                                <video src={video.url} className="w-full h-full object-cover pointer-events-none" muted preload="metadata" />
                                <button type="button" onClick={() => handleRemove('video')} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                                <Trash2 size={18} className="text-red-500" />
                                </button>
                            </>
                            ) : (
                            <>
                                <PlayCircle size={32} />
                                <p className="text-sm">Upload intro video</p>
                                <p className="text-xs text-red-500">Max file size is 5mb</p>
                            </>
                            )}
                        </label>
                        <input id="introVideo" type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} className="hidden" />
                        </div>

                        {/* Upload Thumbnail */}
                        <div className="w-1/2">
                        <label className="block mb-1 font-medium">Upload Thumbnail</label>
                        <label htmlFor="thumbnail" className="cursor-pointer border-2 border-dashed border-gray-300 w-full aspect-video flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 relative">
                            {thumbnail ? (
                            <>
                                <img src={thumbnail.url} alt="thumbnail" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => handleRemove('thumbnail')} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                                <Trash2 size={18} className="text-red-500" />
                                </button>
                            </>
                            ) : (
                            <>
                                <UploadCloud size={32} />
                                <p className="text-sm">Upload thumbnail</p>
                                <p className="text-xs text-orange-500">*Upload landscape image</p>
                            </>
                            )}
                        </label>
                        <input id="thumbnail" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'thumbnail')} className="hidden" />
                        </div>
                    </div>


                    <div>
                        <h2 className="font-medium mb-2">Take Aways</h2>
                        <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                        <li>Clearly define the specific knowledge or skills that participants will gain by the end of the course.</li>
                        <li>Create content that is interactive, visually appealing, and varied to keep participants engaged and motivated throughout the course.</li>
                        <li>Organise the course content in a logical and sequential manner to ensure a smooth learning experience and progression of concepts.</li>
                        <li>Provide real-world examples and case studies to help participants understand how the course material can be applied in practical scenarios.</li>
                        <li>Include quizzes, assignments, or practical exercises to assess participants' understanding and provide them with valuable feedback.</li>
                        <li>Keep the course up-to-date by regularly reviewing and updating the content to ensure its relevance and accuracy.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Cancel</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save & Continue</button>
            </div>

        </TabPanel>




        <TabPanel>


            {/* <div className="space-y-4">
                {sections.map((section, index) => (
                    <div key={index} className="border border-slate-300 p-4 rounded">

                        <h2>{section.title}</h2>
                    
                        {section.videos.length !== 0 ? (
                            section.videos.map((videos,index) => (
                                <div key={index}>
                                    <h3>{videos.title}</h3>
                                    hello
                                </div>
                            ))
                        ):(
                            <div>

                                {showVideoInput && (
                                    <div className="flex items-center gap-2 border border-slate-400 p-3 my-3">

                                        <input
                                            type="text"
                                            value={videoTitle}
                                            onChange={(e) => setVideoTitle(e.target.value)}
                                            placeholder="Enter video name"
                                            className="border border-gray-300 px-4 py-1 w-full"
                                        />

                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => setVideoFile(e.target.files[0])}
                                            />

                                            <button
                                                onClick={()=>handleUploadVideo(section.id)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                            >
                                                Upload
                                            </button>

                                        </div>

                                       
                                        
                                    </div>
                                )}

                                <button onClick={() => setVideoInput(true)} className="bg-blue-500 text-white px-4 py-1 rounded">Upload video</button>
                            </div>
                        )}
                        
                    </div>
                    // <div key={section.id} className="border border-slate-300 p-4 rounded">
                    //     <h2 className="text-lg font-semibold">{section.name}</h2>
                    //     <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                    //         Upload Video
                    //     </button>
                    // </div>
                ))}

                {showInput && (
                    <div className="flex items-center gap-2 bg-white border border-slate-300 py-3 px-2 w-64 rounded shadow mt-4">
                        <input
                            type="text"
                            value={sectionName}
                            onChange={(e) => setSectionName(e.target.value)}
                            placeholder="Enter section name"
                            className="border border-gray-300 px-2 py-1 w-full"
                        />
                        <button onClick={handleSectioinCreate} className="bg-blue-500 text-white px-4 py-1 rounded">
                            Create
                        </button>
                    </div>
                )}

                <div
                    className="border border-slate-300 py-3 px-5 w-fit cursor-pointer"
                    onClick={() => setShowInput(true)}
                >
                    <h1>+ Add section</h1>
                </div>
                </div> */}



            <VideoSectionsUI courseId={params}/>


                

        </TabPanel>

    </Tabs>



      
    </div>
  );
};
