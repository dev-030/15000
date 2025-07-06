'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Trash2, MonitorUp, CloudUpload } from 'lucide-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams, useSearchParams } from 'next/navigation';
import VideoSectionsUI from './videoUi';
import useSWR from 'swr';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';




export default function CourseManagement () {

    const params = useParams();
    const searchParams = useSearchParams();


    const initialTabIndex = Number(searchParams.get('tab')) || 0;


    const {data, isLoading} = useSWR(`/api/course_list_detail?course_id=${params.slug}`, (url: string) =>
        fetch(url).then((res) => res.json())
    );
   
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [initialFormData, setInitialFormData] = useState<any>(null);
    const [isChanged, setIsChanged] = useState(false);
    const [videoFile, setVideoFile] = useState<{ file: File; url: string } | null>(null);
    
    const [imageFile, setImageFile] = useState<{ file?: File; url: string } | null>(null);


    const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);


    const [isPaid, setIsPaid] = useState(data?.is_paid);

    const schema = z.object({
        title: z.string().min(5),
        price: isPaid === false ? z.coerce.number().optional() : z.coerce.number().min(1, 'Price must be at least 1'),
        category: z.string().min(1, "At least one category is required"),
        tags: z.array(z.string().min(1, "Tag cannot be empty")).min(1, "At least one tag is required"),
        description: z.string().min(10),
        thumbnail: z
        .custom<FileList>((file)=> file instanceof FileList && file.length > 0,{
            message: "Please upload an image"
        })
        .refine((files)=> {
            return files?.[0] && ['image/jpeg', 'image/png', 'image/jpg'].includes(files?.[0].type);
        },{ message: "Only JPG, PNG, JPEG images are allowed" }),
        introVideo: isPaid === true ? z
        .custom<FileList>((file)=> file instanceof FileList && file.length > 0,{
            message: "Please upload an video"
        })
        .refine((files)=> {
            return files?.[0] && ['video/mp4', 'video/quicktime', 'video/x-msvideo'].includes(files?.[0].type);
        },{ message: "Only MP4, Quicktime, X-msvideo videos are allowed" }) : z.optional(z.any()),
    });

    const {register, unregister, reset, watch, setValue, handleSubmit, control, formState: {errors, isDirty, dirtyFields}} = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            tags: [],
        },
    });



    useEffect(() => {

        if (!isLoading && data) {

            const initialValues = {
                title: data.course_name || '',
                price: data.course_price || undefined,
                category: data.category || '',
                tags: data.tags || [],
                description: data.course_description || '',
            };
            setValue('thumbnail', data.thumbnail);
            reset(initialValues);
            setInitialFormData(initialValues);

            if (data.thumbnail) {
                setImageFile({ url: data.thumbnail});
            }

            if (data.intro_video_url) {
                setVideoFile({ file: new File([], ''), url: data.intro_video_url });
            }

            setIsPaid(data.is_paid);
        }
    }, [data, reset, isLoading]);




    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }



    const onSubmit = async(values: z.infer<typeof schema>) => {
        console.log(values)
    }



  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">

    <h2 className="text-2xl font-bold mb-6">Course Management</h2>
    <p className="text-sm text-gray-500 mb-6"> Course Management</p>


    <Tabs selectedIndex={activeTabIndex}
        onSelect={(index) => {
            setActiveTabIndex(index);
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('tab', index.toString());
            window.history.replaceState(null, '', newUrl.toString());
        }}
    >
        
        <TabList>
            <Tab>Basic info</Tab>
            <Tab>Course content</Tab>
        </TabList>

        <TabPanel>
    
            <div className="mt-6 flex justify-end gap-4 my-2">
                <button className="px-4 py-2 bg-blue-400 text-white rounded" disabled={true}  onClick={handleSubmit(onSubmit)}
                >Save</button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">

                <div className="space-y-4">                    

                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="font-medium text-gray-800">Course Title</label>
                        <input {...register("title")} type="text" 
                        className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500" />
                         {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {isPaid === true && 
                        <div className="flex flex-col gap-1">
                            <label htmlFor="price" className="font-medium text-gray-800">Course Price</label>
                            <input {...register("price")} type="number" className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500" />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>
                    }

                    <div className="flex flex-col gap-1">
                        <label htmlFor="category" className="font-medium text-gray-800">Course Category</label>
                        <select id="category" {...register("category")} defaultValue=""
                            className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500"
                        >
                            <option value="" disabled>Select category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="obile Development">Mobile Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Backend Development">Backend Development</option>
                            <option value="Frontend Development">Frontend Development</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => {
                            const [tagInput, setTagInput] = useState('');

                            const handleAddTag = () => {
                                const newTag = tagInput.trim();
                                if (newTag && !field.value.includes(newTag)) {
                                    field.onChange([...field.value, newTag]);
                                    setTagInput('');
                                }
                            };

                            const handleRemoveTag = (tag: string) => {
                                field.onChange(field.value.filter(t => t !== tag));
                            };

                            return (
                            <div className="flex flex-col gap-1">
                                <label htmlFor="tags" className="font-medium text-gray-800">Course Tag</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        placeholder="Enter tag and press Enter"
                                        className="w-full border border-gray-300 p-2 pr-10 rounded outline-none focus:border-gray-500"

                                    />
                                    <button type="button" className="absolute bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-sm right-1.5 top-[5.5px] cursor-pointer" 
                                    onClick={handleAddTag}>Add Tag</button>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {field.value.map((tag, index) => (
                                        <div key={index} className="bg-blue-100 text-sm text-blue-800 px-2.5 py-1.5 rounded-full flex items-center gap-2">
                                            {tag}
                                            <button type="button" className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer"
                                            onClick={() => handleRemoveTag(tag)}>
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
                            </div>
                            );
                        }}
                    />


                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="font-medium text-gray-800">Course description</label>
                        <textarea rows={9} {...register("description")} className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500" />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>
                    
                </div>
            


                <div className="space-y-6">

                    <div className="flex gap-4">

                        <Controller
                            name="thumbnail"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className="w-1/2">
                                <h1 className="block mb-1 font-medium">Upload Thumbnail</h1>

                                {imageFile ? (
                                    <div className="border-2 border-gray-200 w-full aspect-square relative">
                                        <img
                                            src={imageFile.url}
                                            alt="Thumbnail"
                                            className="object-cover w-full h-full rounded-md"
                                        />
                                    </div>
                                ) : (
                                    <label htmlFor="thumbnail" className="cursor-pointer border-2 border-dashed border-gray-300 w-full aspect-square flex flex-col justify-center items-center gap-2 text-gray-500 hover:border-gray-400 transition-all"
                                    >
                                        <CloudUpload size={32} />
                                        <p className="text-sm">Upload thumbnail</p>
                                    </label>
                                )}

                                <input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    ref={imageInputRef}
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const url = URL.createObjectURL(file);
                                        setImageFile({ file, url });
                                        field.onChange(e.target.files);
                                    }}
                                />

                                {fieldState.error && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {fieldState.error.message}
                                    </p>
                                )}
                                </div>
                            )}
                        />

                        {isPaid === true && (
                        <Controller
                            name="introVideo"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className="w-1/2">
                                <h1 className="block mb-1 font-medium">Upload Intro Video</h1>

                                {videoFile ? (
                                    <div className="border-2 border-gray-200 w-full aspect-square relative">
                                        <video
                                            src={videoFile?.url}
                                            controls
                                            className="w-full h-full object-cover"
                                        />
                                        <button type="button"
                                            className="absolute cursor-pointer top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                                            onClick={() => {
                                                field.onChange(undefined); 
                                                setVideoFile(null);
                                                videoInputRef.current!.value = '';
                                            }}
                                        >
                                            <Trash2 size={20} className="text-red-500" />
                                        </button>
                                    </div>
                                ) : (
                                    <label htmlFor="introVideo" className="cursor-pointer border-2 border-dashed border-gray-300 w-full aspect-square flex flex-col justify-center items-center gap-2 text-gray-500 hover:border-gray-400 transition-all"
                                    >
                                        <MonitorUp size={32} />
                                        <p className="text-sm">Upload intro video</p>
                                    </label>
                                )}

                                <input
                                    id="introVideo"
                                    type="file"
                                    accept="video/*"
                                    ref={videoInputRef}
                                    disabled={true}
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const mediaUrl = URL.createObjectURL(file);
                                        setVideoFile({ file, url: mediaUrl });
                                        field.onChange(e.target.files);
                                    }}
                                />

                                {fieldState.error && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {fieldState.error.message}
                                    </p>
                                )}
                                </div>
                            )}
                        />
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

