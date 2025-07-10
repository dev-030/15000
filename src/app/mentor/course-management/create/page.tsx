'use client'

import axios from "axios";
import Link from "next/link";
import { act, useEffect, useRef, useState } from "react";
import * as tus from 'tus-js-client'; 
import crypto from 'crypto-js';
import { ArrowLeft, ArrowRight, CalendarDays, CircleAlert, CircleChevronLeft, CloudUpload, MonitorUp, Trash2, UploadCloud, UserRoundPen } from "lucide-react";
import { useRouter } from 'next/navigation';
import { CreateCourseData } from "@/lib/actions/actions";
import ReactDOM from 'react-dom/client'
import { useClientSession } from "@/context/sessionProvider";
import { string, z } from "zod";
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
import CreateCoursePopUp from "@/components/createCoursePopUp";
// import dynamic from 'next/dynamic';
// import TipTap from "@/components/TipTap";
import dynamic from 'next/dynamic';

const TipTap = dynamic(() => import('@/components/TipTap'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-800">Course Description</label>
            <div className="border border-gray-300 rounded-md p-4 mb-30">
                <div className="control-group mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="border border-gray-300 p-2 bg-gray-50 rounded-md text-gray-700 text-sm opacity-50">
                            Loading editor...
                        </div>
                    </div>
                </div>
                <div className="min-h-[120px] bg-white p-4 border border-gray-200 rounded-md opacity-50 flex items-center justify-center">
                    <span className="text-gray-500">Loading editor...</span>
                </div>
            </div>
        </div>
    )
});





export default function CreateCourse(){

    const [imageFile, setImageFile] = useState<{ file: File; url: string } | null>(null);
    const [videoFile, setVideoFile] = useState<{ file: File; url: string } | null>(null);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [isPaid, setIsPaid] = useState<boolean>(true);
    const [modalOption, setModalOption] = useState<'1'|'2'|'3'>('1');
    const session = useClientSession();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);






    
    const handleUpload = async (val:any) => {

        if (!videoFile) return;
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
                    router.push(`/mentor/course-management/${val.id}`);
                },
            })

            upload.start();

        } catch (err) {
            console.error(err);
        }
    };




    const schema = z.object({
        title: z.string().min(5),
        price: isPaid === false ? z.coerce.number().optional() : z.coerce.number().min(1, 'Price must be at least 1'),
        category: z.string().min(1, "At least one category is required"),
        tags: z.array(z.string().min(1, "Tag cannot be empty")).min(1, "At least one tag is required"),
        description: z.string().min(10),
        richDescription: z.string().min(10, "Rich description is required"),
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



    const {register, unregister, handleSubmit, control, formState: {errors}} = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            tags: [],
            richDescription: '',
        },
    });
    


    const onSubmit = async(values: z.infer<typeof schema>) => {

        // const data = {
        //         course_name: values.title,
        //         is_paid: isPaid,
        //         course_description: values.description,
        //         rich_description: values.richDescription, // Add this line
        //         category: values.category,
        //         ...(isPaid && { course_price: values.price })
        // }

        setOpen(true);
        setModalOption('1');

        const compressedImage = async(file:File) => {
            return await imageCompression.getDataUrlFromFile(
                await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                initialQuality: 0.7,
            }));          
        }

        const data = {
            course_name: values.title,
            is_paid: isPaid,
            course_description: values.description,
            category: values.category,
            uploaded_thumbnail: await compressedImage(values.thumbnail[0]),
            ...(isPaid && { course_price: values.price })
            // tags: values.tags,
        }

        const response = await CreateCourseData(data);


        if(response.error === 'Mentor profile incomplete.'){
            setModalOption('3');
        }

        if(response.id){
            {isPaid === true ? handleUpload(response) : router.push(`/mentor/course-management/${response.id}`)}
        }

    }



    useEffect(() => {
        if (isPaid === false) {
            unregister(['price','introVideo']);
        }
    }, [isPaid, unregister]);


    return(

        <div className="p-6 max-w-7xl mx-auto bg-white">

            {open && (
                <CreateCoursePopUp modalOption={modalOption} router={router} session={session} percentage={percentage}/>
            )}
            

            <h2 className="text-2xl font-bold mb-6">Course Management</h2>
            <p className="text-sm text-gray-500 mb-6"> <Link href={"/mentor/courses"}>Course Management</Link> 
                / <strong>Create Course</strong>
            </p>




            <div className="mt-6 flex justify-end gap-4 my-2">
                <button className="px-4 py-2 font-semibold rounded hover:bg-gray-100 text-blue-500 bg-blue-50 cursor-pointer" 
                onClick={()=>router.back()}
                >Cancel</button>

                <div className="flex items-center p-[3px] border border-blue-300 text-blue-500 rounded-lg">
                    <button className={`p-2 px-3 rounded-md cursor-pointer ${isPaid === true ? 'bg-blue-500 text-white w-full' : ''}`}
                    onClick={()=>setIsPaid(true)}
                    >Paid</button>
                    <button className={`p-2 px-3 rounded-md cursor-pointer ${isPaid === false ? 'bg-blue-500 text-white w-full' : ''}`}
                    onClick={()=>setIsPaid(false)}
                    >Free</button>
                </div>
                
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer" 
                onClick={handleSubmit(onSubmit)}
                >Save & Continue</button>
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



                    


                    <Controller
                        name="richDescription"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TipTap
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    

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
                                        <button type="button"
                                            className="absolute cursor-pointer top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                                            onClick={() => {
                                                field.onChange(undefined); 
                                                setImageFile(null);
                                                imageInputRef.current!.value = '';
                                            }}
                                        >
                                            <Trash2 size={20} className="text-red-500" />
                                        </button>
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

           
        </div>

    )
}

