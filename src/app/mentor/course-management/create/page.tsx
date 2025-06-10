'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as tus from 'tus-js-client'; 
import crypto from 'crypto-js';
import { CircleChevronLeft, CloudUpload, MonitorUp, Trash2, UploadCloud } from "lucide-react";
import { useRouter } from 'next/navigation';
import { CreateCourseData } from "@/lib/actions/actions";
import ReactDOM from 'react-dom/client'
import { useForm } from '@tanstack/react-form'



export default function CreateCourse(){

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState<{ file: File; url: string } | null>(null);
    const [videoFile, setVideoFile] = useState<{ file: File; url: string } | null>(null);
    const router = useRouter();
    const [toggles, setToggles] = useState({showVideoError: false, showImageError: false});
    const [tags, setTags] = useState(['UI Design', 'UI Design Fundamental']);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState('');


    /*
        1. Create new collection, libraryid, collectionName = course name
        2. create new video, libraryid, video title, collectionId = from step 1, thumbnailTime = 1
        3. upload video, libraryid, videoId = from step 2, videoFile 

        If there are no courses the page will show no courses. and a create new course button. after clicking the button, the user will be redirected to the create course page. 

        Firsti need to create a new collection, then create a new video, then upload the video.
        The collection will use the course title and the user id as its name.   Then using the collection id and library id we have to create a new video object. then using the video id from that video object we can upload a video to that collection. 

        first on the new course page after entering the course title and description, course type, price, estimated duration,
    */




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
                    setModalData(`Uploading video.....${percentage}%`);
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
        },
        validators: {
          onSubmitAsync: async ({ value }) => {


            if (!imageFile?.file) {
               return setToggles((prev) => ({ ...prev, showImageError: true }))
            }

            if (!videoFile?.file) {
                return setToggles((prev) => ({ ...prev, showVideoError: true }))
            }

            console.log("clicked🟢")

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

            formData.append("thumbnail", base64Image as string);
            formData.append("'course_name", value.title);
            formData.append("course_description", value.description);
            formData.append("category", value.category);

            setOpen(true);
            setModalData('Creating course.....');
            const response = await CreateCourseData(formData)

            if(response.uploadSignature){
                handleUpload(response);
            }
          

            
          },
        },
      })

  
    return(
        //     title 
        //     description
        //     category
        //     thumbnail
        //     price
        //     ispaid
        //     intro video upload
        //     estimated duration
        //     course modules
        //     one-to-one support

        <div className="p-6 max-w-7xl mx-auto bg-white">

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <h1 className="text-3xl font-semibold text-amber-50">{modalData}</h1>
                </div>
            )}
            

    


            <h2 className="text-2xl font-bold mb-6">Course Management</h2>
            <p className="text-sm text-gray-500 mb-6"> <Link href={"/mentor/courses"}>Course Management</Link> / <strong>Create Course</strong></p>


            <div className="mt-6 flex justify-end gap-4 my-2">
                <button className="px-4 py-2 font-semibold rounded hover:bg-gray-100 text-blue-500 bg-blue-50 cursor-pointer">Cancel</button>
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
                                    ? 'Title must be at least 3 characters'
                                    : undefined,
                            }}
                            children={(field) => (  
                                <div>
                                    <label className="block mb-1 font-medium">Course Title</label>
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
                                        className="w-full border border-gray-300 p-2 rounded"
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
                        <input type="text" placeholder="Add tag" className="w-full border border-gray-300 p-2 rounded" />
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
                            // validators={{
                            //     onChange: ({ value }) =>
                            //     !value
                            //         ? 'A description is required'
                            //         : value.length < 150
                            //         ? 'Minimum 150 characters and maximum of 250 chars required'
                            //         :value.length > 250 ? 'Maximum 250 characters' : undefined,
                            // }}
                            children={(field) => (
                                <div>
                                    <label className="block mb-1 font-medium">Course Title</label>
                                    <textarea
                                        className="w-full border border-gray-300 p-2 rounded h-40"
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
                                    <p className="text-xs text-orange-500">*Upload landscape image</p>
                                </label>
                            )}
                            
                            <input id="introVideo" type="file" accept="video/*" className="hidden" onChange={handleIntroVideo}/>
                            <p className="text-xs text-orange-500 mt-1">{toggles.showVideoError && "Please upload a valid video file"}</p>
                        </div>

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