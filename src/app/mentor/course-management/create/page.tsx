'use client'

import axios from "axios";
import Link from "next/link";
import { act, useEffect, useState } from "react";
import * as tus from 'tus-js-client'; 
import crypto from 'crypto-js';
import { ArrowLeft, ArrowRight, CalendarDays, CircleAlert, CircleChevronLeft, CloudUpload, MonitorUp, Trash2, UploadCloud, UserRoundPen } from "lucide-react";
import { useRouter } from 'next/navigation';
import { CreateCourseData } from "@/lib/actions/actions";
import ReactDOM from 'react-dom/client'
import { useForm } from '@tanstack/react-form'
import { useClientSession } from "@/context/sessionProvider";



export default function CreateCourse(){

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState<{ file: File; url: string } | null>(null);
    const [videoFile, setVideoFile] = useState<{ file: File; url: string } | null>(null);
    const router = useRouter();
    const [toggles, setToggles] = useState({showVideoError: false, showImageError: false});
    const [tags, setTags] = useState(['UI Design', 'UI Design Fundamental']);
    const [open, setOpen] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [activeOption, setActiveOption] = useState<'true'|'false'>('true');
    const [modalOption, setModalOption] = useState<'1'|'2'|'3'>('1');
    const session = useClientSession();



    const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

        if (!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.type)) {
            alert('Only image files are allowed.');
            e.target.value = '';
            return;
        }
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageFile({ file, url: imageUrl });
            setToggles((prev) => ({ ...prev, showImageError: !prev.showImageError}))
        }
        e.target.value = '';
    };


    const handleIntroVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files?.[0];
        const allowedExtensions = ['.mp4', '.mov', '.avi'];
        const allowedMimeTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    
        if (!allowedExtensions.includes(file.name.slice(file.name.lastIndexOf('.'))) || !allowedMimeTypes.includes(file.type)) {
            alert('Only video files are allowed.');
            e.target.value = '';
            return;
        }
        if(file){
            const mediaUrl = URL.createObjectURL(file);
            setVideoFile({ file, url: mediaUrl });
            setToggles((prev) => ({ ...prev, showVideoError: !prev.showVideoError}))
        }


        e.target.value = '';

    };



    
    const handleUpload = async (val:any) => {

        if (!videoFile) return;

        setUploading(true);
        setMessage('');
        setModalOption('2');

        try {            

            const upload = new tus.Upload(videoFile.file, {
                endpoint: 'https://video.bunnycdn.com/tusupload',
                retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
                headers: {
                    AuthorizationSignature: val.uploadSignature,
                    AuthorizationExpire: val.uploadExpire,
                    LibraryId: val?.libraryId,
                    VideoId: val?.videoId,
                },
                metadata: {
                    filetype: videoFile.file.type,
                    title: videoFile.file.name,
                    collection: val.collectionId, // Optional collection ID
                },  
                onError: function(error) {
                    console.log(error)
                },
                onProgress: function(bytesUploaded, bytesTotal) {
                    const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
                    setPercentage(percentage);
                },
                onSuccess: () => {
                    router.push(`/mentor/course-management/${val.course_id}`);
                },
            })

            upload.findPreviousUploads().then((previousUploads) => {
                if (previousUploads.length) {
                  upload.resumeFromPreviousUpload(previousUploads[0]);
                }
                upload.start();
            });

        } catch (err) {
            console.error(err);
            setMessage('Something went wrong during upload.');
        } finally {
            setUploading(false);
        }
    };


    // useEffect(() => {
    // const handler = (e: KeyboardEvent) => {
    //     if (e.key === 'Escape') setOpen(false);
    // };
    // if (open) window.addEventListener('keydown', handler);
    // return () => window.removeEventListener('keydown', handler);
    // }, [open]);


    const form = useForm({
        defaultValues: {
          title: '',
          description: '',
          category: '',
          price: '',
        },
        validators: {
          onSubmitAsync: async ({ value }) => {

            if (!imageFile?.file) {
               return setToggles((prev) => ({ ...prev, showImageError: true }))
            }

            
            if (activeOption === 'true' && !videoFile?.file) {
                return setToggles((prev) => ({ ...prev, showVideoError: true }))
            }
            

            const convertToBase64 = (file:any) => {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file); // reads as base64
                  reader.onload = () => resolve(reader.result); // base64 string
                  reader.onerror = (error) => reject(error);
                });
            };

            const base64Image = await convertToBase64(imageFile.file);

            const formData = new FormData();

            formData.append("uploaded_thumbnail", base64Image as string);
            formData.append("course_name", value.title);
            {activeOption === 'true' && formData.append("course_price", value.price);}
            formData.append("course_description", value.description);
            formData.append("category", value.category);
            formData.append("is_paid", activeOption);

            setOpen(true);
            setModalOption('1');

            const response = await CreateCourseData(formData)

            if(response.error === 'Mentor profile incomplete.'){
                setModalOption('3');
            }

            if(response.course_id){
                {activeOption === 'true' ? handleUpload(response) :  router.push(`/mentor/course-management/${response.course_id}`)}
            }
            
          },
        },
      })

  
    return(

        <div className="p-6 max-w-7xl mx-auto bg-white">

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">

                    <div className="bg-white p-6 sm:p-8 rounded-xl w-fit relative">                        
                        
                        {modalOption === '1' && (
                            <div className="flex items-center gap-3">
                                <h1 className="text-base font-semibold text-gray-800">Creating course</h1>
                                <div className="w-3.5 h-3.5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}

                        {modalOption === '2' && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-slate-700">Uploading Video</h3>
                                    <span className="text-sm font-medium text-slate-600">{percentage}%</span>
                                </div>

                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                                <div className="mt-6 flex items-center text-xs text-yellow-500 gap-2">
                                    <CircleAlert size={15} />
                                    <span>Please don’t close the window while uploading</span>
                                </div>
                            </div>
                        )}

                        {modalOption === '3' && (
                            <div className="grid place-content-center">
                                <div className="flex flex-col items-center justify-center gap-2">

                                    <button className="absolute top-1.5 right-3 text-xl text-gray-400 hover:text-gray-600 cursor-pointer" onClick={()=> router.back()}>
                                        ×
                                    </button>

                                    <UserRoundPen className="mx-auto h-20 w-20 text-blue-500 mb-4" />

                                    <h1 className="text-gray-700 text-base font-medium mb-2">
                                        Complete Your Profile
                                    </h1>

                                    <p className="text-sm text-gray-500 mb-6">
                                        Please complete your profile before creating a course.
                                    </p>

                                    <Link href={`/profile/edit/${session?.user?.username}`} className="group px-4 py-2 flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-3xl font-medium overflow-hidden relative border border-blue-600">
                                    <span className="relative z-10">Go to profile</span>
                                    <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                    </Link>
                                </div>
                            </div>
                            
                        )}
                        
                    </div>

                </div>

            )}
            

            <h2 className="text-2xl font-bold mb-6">Course Management</h2>
            <p className="text-sm text-gray-500 mb-6"> <Link href={"/mentor/courses"}>Course Management</Link> / <strong>Create Course</strong></p>


            <div className="mt-6 flex justify-end gap-4 my-2">
                <button className="px-4 py-2 font-semibold rounded hover:bg-gray-100 text-blue-500 bg-blue-50 cursor-pointer" 
                onClick={()=>router.back()}
                >Cancel</button>

                <div className="flex items-center p-[3px] border border-blue-300 text-blue-500 rounded-lg">
                    <button className={`p-2 px-3 rounded-md cursor-pointer ${activeOption === 'true' ? 'bg-blue-500 text-white w-full' : ''}`}
                    onClick={()=>setActiveOption('true')}
                    >Paid</button>
                    <button className={`p-2 px-3 rounded-md cursor-pointer ${activeOption === 'false' ? 'bg-blue-500 text-white w-full' : ''}`}
                    onClick={()=>setActiveOption('false')}
                    >Free</button>
                </div>
                
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer" onClick={() => form.handleSubmit()}
                >Save & Continue</button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                {/* Form Inputs */}
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
                    
                    {activeOption === 'true' && 
                        <div>
                            <form.Field 
                                name="price"
                                validators={{
                                    onChange: ({ value }) => undefined,
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
                    }



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


                        {/* <form.Field 
                            name="title"
                            validators={{
                                onChange: ({ value }) =>
                                !value
                                    ? 'A title is required'
                                    : value.length < 5
                                    ? 'Title must be at least 3 characters'
                                    : undefined,
                            }}
                            children={(field) => (
                                <div>
                                    <label className="block mb-1 font-medium">Course Tag</label>
                                    <input
                                        className="w-full border border-gray-300 p-2 rounded"
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
                        <div className="mt-2 flex gap-2 flex-wrap">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{tag}</span>
                            ))}
                        </div> */}
                    </div>

                    <div>
                        <form.Field 
                            name="description"
                            validators={{
                                onChange: ({ value }) =>
                                !value
                                    ? 'A description is required'
                                    : value.length < 150
                                    ? 'Minimum 150 characters and maximum of 250 chars required'
                                    :value.length > 250 ? 'Maximum 250 characters' : undefined,
                            }}
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
            
                {/* Uploads + Takeaways */}
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
                            
                            <input id="thumbnail" type="file" accept="image/*" className="hidden" onChange={handleThumbnail}/>

                            <p className="text-xs text-orange-500 mt-1">{toggles.showImageError && "Please upload a valid image file"}</p>
                        </div>

                        {activeOption === 'true' && (
                        <div className="w-1/2">
                            <h1 className="block mb-1 font-medium">Upload Intro Video</h1>
                            {videoFile ? (
                                <div className="border-2 border-gray-200 w-full aspect-square relative">
                                    {/* <img src={image.url} alt="Thumbnail" className="object-cover w-full h-full rounded-md"/> */}
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
                            
                            <input id="introVideo" type="file" accept="video/*" className="hidden" onChange={handleIntroVideo}/>
                            <p className="text-xs text-orange-500 mt-1">{toggles.showVideoError && "Please upload a valid video file"}</p>
                        </div>
                        )}

                    </div>

                    {/* Takeaways */}
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
            
            


            {/* <form
                onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void form.handleSubmit()
                }}
            > */}


            


                {/* <form.Field 
                    name="age"
                    validators={{
                        onChange: ({ value }) =>
                          !value 
                            ? 'A first name is required'
                            : value.length < 3
                              ? 'First name must be at least 3 characters'
                              : undefined,
                    }}
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                        <label htmlFor={field.name}>Course Title</label>
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-fit"
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            type="text"
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid && (
                            <p className="text-xs text-rose-400">{field.state.meta.errors}</p>
                        )}
                        </div>
                    )}
                /> */}

                






      {/* <button
        type="submit"
        onClick={() => form.handleSubmit()}
        className="bg-blue-500 text-white p-3 font-semibold rounded-lg cursor-pointer mt-3"
      >
        Submit and back to menu
      </button> */}






            {/* <div className="flex items-center gap-4 w-fit mt-10">

                <div className="w-64 mx-auto">
                    <h1 className="font-semibold mb-2">Upload Thumbnail</h1>
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
                    
                    <input id="thumbnail" type="file" accept="image/*" className="hidden" onChange={handleThumbnail}/>

                    <p className="text-xs text-red-500">{toggles.showImageError && "Please upload a valid image file"}</p>
                </div>

                <div className="w-64 mx-auto">
                    <h1 className="font-semibold mb-2">Upload Intro Video</h1>
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
                            <p className="text-xs text-orange-500">*Upload landscape image</p>
                        </label>
                    )}
                    
                    <input id="introVideo" type="file" accept="video/*" className="hidden" onChange={handleIntroVideo}/>
                </div>

            </div> */}




            {/* <div className="flex items-center gap-2 w-fit mt-10">
                <button className="bg-slate-100 text-blue-400 font-semibold p-3 rounded-lg cursor-pointer">Cancel</button>
                <button className="bg-blue-400 text-white p-3 font-semibold rounded-lg cursor-pointer">Create Course</button>
            </div> */}

            {/* <div className="min-h-screen p-10">     
                <h1 className="text-3xl font-bold mb-6">Upload a Course Video</h1>

                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFile}
                    disabled={uploading}
                    className="mb-4 border border-gray-300 p-1.5 cursor-pointer"
                />

                <button
                    onClick={handleUpload}
                    disabled={!videoFile || uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>

                {message && <p className="mt-4 text-lg">{message}</p>}

                <button className="text-white bg-blue-500 p-3 text-xl" onClick={()=>handleUpload()}>upload</button> 
            </div> */}

        </div>

    )
}