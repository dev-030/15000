'use client'
import React, { useEffect, useState } from 'react';
import { PlayCircle, UploadCloud, Trash2, MonitorUp, CloudUpload } from 'lucide-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams, useRouter } from 'next/navigation';
import VideoSectionsUI from './videoUi';
import useSWR from 'swr';
import { useForm } from '@tanstack/react-form';




export default function CourseManagement () {


    const params = useParams();


    const {data, isLoading} = useSWR(`/api/course_list_detail?course_id=${params.slug}`, (url: string) =>
        fetch(url).then((res) => res.json())
    );


    const router = useRouter();

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [videoFile, setVideoFile] = useState<{ file: File; url: string } | null>(null);
    const [toggles, setToggles] = useState({showVideoError: false, showImageError: false});
    const [open, setOpen] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [activeOption, setActiveOption] = useState<'true'|'false'>('true');
    const [modalOption, setModalOption] = useState<'1'|'2'|'3'>('1');
    const [imageFile, setImageFile] = useState<{ file?: File; url: string } | null>(null);
    

    useEffect(() => {
    if (data?.thumbnail) {
        setImageFile({ url: data.thumbnail });
    }
    }, [data?.thumbnail]);

  
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



    const form = useForm({
          defaultValues: {
            title: data?.course_name,
            description: data?.course_description,
            category: data?.category,
            price: data?.course_price,
        },
        //   validators: {
        //     onSubmitAsync: async ({ value }) => {
  
  
        //       if (!imageFile?.file) {
        //          return setToggles((prev) => ({ ...prev, showImageError: true }))
        //       }
  
        //       if (!videoFile?.file) {
        //           return setToggles((prev) => ({ ...prev, showVideoError: true }))
        //       }
  
        //       const convertToBase64 = (file:any) => {
        //           return new Promise((resolve, reject) => {
        //             const reader = new FileReader();
        //             reader.readAsDataURL(file); // reads as base64
        //             reader.onload = () => resolve(reader.result); // base64 string
        //             reader.onerror = (error) => reject(error);
        //           });
        //       };
  
        //       const base64Image = await convertToBase64(imageFile.file);
  
        //       const formData = new FormData();
  
        //       formData.append("uploaded_thumbnail", base64Image as string);
        //       formData.append("course_name", value.title);
        //       formData.append("course_price", value.price);
        //       formData.append("course_description", value.description);
        //       formData.append("category", value.category);
        //       formData.append("is_paid", activeOption);
  
        //       setOpen(true);
        //       setModalOption('1');
  
        //       const response = await CreateCourseData(formData)
  
        //       if(response.error === 'Mentor profile incomplete.'){
        //           setModalOption('3');
        //       }
  
        //       if(response.uploadSignature){
        //           handleUpload(response);
        //       }
              
        //     },
        //   },
        })


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
    
            <div className="mt-6 flex justify-end gap-4 my-2">
                <button className="px-4 py-2 bg-blue-400 text-white rounded" onClick={() => form.handleSubmit()} disabled={true}
                >Save & Continue</button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">

                <div className="space-y-4">

                    <div>
                        <form.Field 
                            name="title"
                            validators={{
                                onChange: ({ value }) =>
                                !value
                                    ? 'A title is required'
                                    : value.length < 5
                                    ? 'Title must be at least 5 characters'
                                    : undefined,
                            }}
                            children={(field) => (  
                                <div>
                                    <label className="block mb-1 font-medium">Course Title</label>
                                    <input
                                        className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        type="text"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {!field.state.meta.isValid && (
                                        <p className="text-xs text-orange-500 mt-1">{field.state.meta.errors}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <form.Field 
                            name="price"
                            validators={{
                                onChange: ({ value }) =>
                                !value
                                    ? 'A Price is required'
                                    : undefined,
                            }}
                            children={(field) => (  
                                <div>
                                    <label className="block mb-1 font-medium">Course Price</label>
                                    <input
                                        className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        type="number"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {!field.state.meta.isValid && (
                                        <p className="text-xs text-orange-500 mt-1">{field.state.meta.errors}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <form.Field 
                            name="category"
                            validators={{
                                onChange: ({ value }) =>
                                !value ? 'A category is required' : undefined,
                            }}
                            children={(field) => (
                                <div>
                                    <label className="block mb-1 font-medium">Course Category</label>

                                    <select 
                                        id={field.name}
                                        name={field.name}
                                        className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    >
                                        <option>Select category</option>
                                        <option value="Design">Design</option>
                                        <option value="Development">Development</option>
                                    </select>
                                    
                                    {!field.state.meta.isValid && (
                                        <p className="text-xs text-orange-500 mt-1">{field.state.meta.errors}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    

                    <div>
                        
                        <label className="block mb-1 font-medium">Course Tag</label>
                        <input type="text" placeholder="Add tag" className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500" />
                        <div className="mt-2 flex gap-2 flex-wrap">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{tag}</span>
                            ))}
                        </div>

                    </div>

                    <div>
                        <form.Field 
                            name="description"
                            children={(field) => (
                                <div>
                                    <label className="block mb-1 font-medium">Course Description</label>
                                    <textarea
                                        className="w-full border border-gray-300 p-2 rounded h-40 outline-none focus:border-gray-500"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {!field.state.meta.isValid && (
                                        <p className="text-xs text-orange-500 mt-1">{field.state.meta.errors}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>
            

                <div className="space-y-6">
                
                    <div className="flex gap-4">

                        <div className="w-1/2">
                            <h1 className="block mb-1 font-medium">Upload Thumbnail</h1>
                            {imageFile ? (
                                <div className="border-2 border-gray-200 w-full aspect-square relative">
                                    <img src={imageFile.url} alt="Thumbnail" className="object-cover w-full h-full rounded-md"/>
                                    <button type="button" onClick={()=>setImageFile(null)} className="absolute cursor-pointer top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100">
                                        <Trash2 size={20} className="text-red-500" />
                                    </button>
                                </div>
                            ) : (
                                <label
                                htmlFor="thumbnail"
                                className="cursor-pointer border-2 border-dashed border-gray-300 w-full aspect-square flex flex-col justify-center items-center gap-2 text-gray-500 hover:border-gray-400 transition-all"
                                >
                                    <CloudUpload size={32} />
                                    <p className="text-sm">Upload thumbnai</p>
                                    <p className="text-xs text-orange-500">*Upload landscape image</p>
                                </label>
                            )}
                            
                            <input id="thumbnail" type="file" accept="image/*" className="hidden" />

                            <p className="text-xs text-orange-500 mt-1">{toggles.showImageError && "Please upload a valid image file"}</p>
                        </div>

                        {data?.is_paid && (
                        <div className="w-1/2">
                            <h1 className="block mb-1 font-medium">Upload Intro Video</h1>
                            {videoFile ? (
                                <div className="border-2 border-gray-200 w-full aspect-square relative">
                                    <video
                                        src={videoFile.url}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                    <button type="button" onClick={()=>setVideoFile(null)} className="absolute cursor-pointer top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100">
                                        <Trash2 size={20} className="text-red-500" />
                                    </button>
                                </div>
                            ) : (
                                <label
                                htmlFor="introVideo"
                                className="cursor-pointer border-2 border-dashed border-gray-300 w-full aspect-square flex flex-col justify-center items-center gap-2 text-gray-500 hover:border-gray-400 transition-all"
                                >
                                    <MonitorUp size={32} />
                                    <p className="text-sm">Upload intro video</p>
                                </label>
                            )}
                            
                            <input id="introVideo" type="file" accept="video/*" className="hidden" />
                            <p className="text-xs text-orange-500 mt-1">{toggles.showVideoError && "Please upload a valid video file"}</p>
                        </div>
                        )}

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


        </TabPanel>




        <TabPanel>

            <VideoSectionsUI courseId={params.slug as string} data={data}/>     

        </TabPanel>

    </Tabs> 



      
    </div>
  );
};
