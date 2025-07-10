'use client';

import TipTap from "@/components/TipTap";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, DollarSign, Plus, X, Trash2, ArrowRight, CloudUpload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { mutate } from "swr";
import { z } from "zod";
import imageCompression from "browser-image-compression";
import { CreateSession } from "@/lib/actions/actions";

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';








export default function CreateSessionPage() {

    const [selectedDays, setSelectedDays] = useState<Day[]>([]);
    const [activeDay, setActiveDay] = useState<Day>('Mon');
    const [currentTime, setCurrentTime] = useState("");
    const [amPm, setAmPm] = useState("AM");

    const [isLoading, setIsLoading] = useState(false);


    const [imageFile, setImageFile] = useState<{ file: File; url: string } | null>(null);
    
    const imageInputRef = useRef<HTMLInputElement>(null);
    

    const router = useRouter();


    const schema = z.object({
        title: z.string().min(5),
        price: z.coerce.number().min(1, 'Price must be at least 1'),
        duration: z.string().min(1, "Duration is required"),
        description: z.string().min(10),
        richDescription: z.string().min(10, "Rich description is required"),
        thumbnail: z
        .custom<FileList>((file)=> file instanceof FileList && file.length > 0,{
            message: "Please upload an image"
        })
        .refine((files)=> {
            return files?.[0] && ['image/jpeg', 'image/png', 'image/jpg'].includes(files?.[0].type);
        },{ message: "Only JPG, PNG, JPEG images are allowed" }),
        timeSlots: z
        .record(z.array(z.string()))
        .refine((data) => Object.values(data).some((arr) => arr.length > 0), {
            message: "At least one time slot is required"
        }),
    });
  
  
  
    const {register, unregister, handleSubmit, control, formState: {errors}} = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            richDescription: '',
        },
    });
      


    const weekdays: Day[] = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    const toggleDay = (day: Day) => {
        setActiveDay(day);
        setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [day]);  // only one day selected
    };

    const handleTimeChange = (value: string) => {
        setCurrentTime(value);
        const hour = parseInt(value.split(":")[0], 10);
        setAmPm(hour >= 12 ? "PM" : "AM");
    };

    const handlePeriodChange = (period: string) => {
        if (!currentTime) return setAmPm(period);
        let [hour, minute] = currentTime.split(':').map(Number);
        if (period === 'PM' && hour < 12) hour += 12;
        if (period === 'AM' && hour >= 12) hour -= 12;
        setCurrentTime(hour.toString().padStart(2,'0') + ':' + minute.toString().padStart(2,'0'));
        setAmPm(period);
    };




    const onSubmit = async(values: z.infer<typeof schema>) => {

        setIsLoading(true);

        const compressedImage = async(file:File) => {
            return await imageCompression.getDataUrlFromFile(
                await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                initialQuality: 0.7,
            }));          
        }

        const filteredDays = Object.entries(values.timeSlots)
        .filter(([_, slots]) => slots.length > 0)
        .map(([day, slots]) => ({
            day_of_week: day,
            time_blocks: slots
        }));

        const data = {
            title: values.title,
            description: values.description,
            rich_description: values.richDescription, 
            duration: values.duration,
            price: values.price,
            days: filteredDays,
            uploaded_thumbnail: await compressedImage(values.thumbnail[0]),
        }

        try {
            const response = await CreateSession(data);
            console.log(response)
            if(response === 201){
                router.push(`/mentor/session-management`);
            }
        }catch(error){
            console.error(error);
            toast.error('Something went wrong.');
        }finally {
            setIsLoading(false);
        }
  
    }
  



//   const handleSubmit = async(e: any) => {

//     e.preventDefault();
//     setIsLoading(true);

//     const filteredDays = Object.entries(daySlots)
//     .filter(([_, slots]) => slots.length > 0)
//     .map(([day, slots]) => ({
//         day_of_week: day,
//         time_blocks: slots
//     }));

//     const data = {
//       title: e.target.title.value,
//       description: e.target.description.value,
//       duration: parseInt(e.target.duration.value, 10),
//       price: parseFloat(e.target.price.value),
//       days: filteredDays,
//       uploaded_thumbnail: imageBase64,
//     };
    
//     try {
//       const response = await CreateSession(data);
//       console.log(response)
//       if(response === 201){
//         toast.success('Session created successfully.');  
//         mutate('/api/session-list');
//       }
//     }catch(error){
//       console.error(error);
//       toast.error('Something went wrong.');
//     }finally {
//       setIsLoading(false);
//     }

//   };




  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">      

        <h2 className="text-2xl font-bold mb-6">Session Management</h2>
        <p className="text-sm text-gray-500 mb-6"> <Link href={"/mentor/session-management"}>Session Management</Link> 
            / <strong>Create Session</strong>
        </p>



        <div className="mt-6 flex justify-end gap-4 my-2">
            <button className="px-4 py-2 font-semibold rounded hover:bg-gray-100 text-blue-500 bg-blue-50 cursor-pointer" 
            onClick={()=>router.back()} disabled={isLoading}
            >Cancel</button>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer" 
            onClick={handleSubmit(onSubmit)} disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <span>Creating</span>
                        <div className="w-3.5 h-3.5 border-2 border-white border-l-transparent rounded-full animate-spin" />
                    </div>
                ):("Create Session")}
                
            </button>
        </div>




        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">

            <div className="space-y-4">                    

                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-medium text-gray-800">Session Title</label>
                    <input {...register("title")} type="text" 
                    className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500" />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>


                <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="font-medium text-gray-800">Duration</label>
                    <select id="category" {...register("duration")} defaultValue=""
                        className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500"
                    >
                        <option value="" disabled>Select Duration</option>
                        <option value="60">60</option>
                        <option value="40">40</option>
                        <option value="20">20</option>
                    </select>
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
                </div>


                <div className="flex flex-col gap-1">
                    <label htmlFor="price" className="font-medium text-gray-800">Price</label>
                    <input {...register("price")} type="number" className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500" />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="font-medium text-gray-800">Short description</label>
                    <textarea rows={7} {...register("description")} className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500" />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>                

            </div>
        


            <div className="space-y-6">

                <div className="flex flex-col gap-4">



                    <Controller
                        name="timeSlots"
                        control={control}
                        defaultValue={{ Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] }}
                        render={({ field, fieldState }) => {
                            const value = field.value;
                            const set = (newData: typeof value) => field.onChange(newData);

                            const addTimeSlot = () => {
                            if (!currentTime || !activeDay) return;
                            const [hrStr, minStr] = currentTime.split(':');
                            let hr = parseInt(hrStr, 10);
                            const displayHr = hr % 12 === 0 ? 12 : hr % 12;
                            const formatted = `${displayHr}:${minStr} ${amPm}`;
                            set({
                                ...value,
                                [activeDay]: [...value[activeDay], formatted],
                            });
                            setCurrentTime("");
                            };

                            const removeTimeSlot = (day: Day, index: number) => {
                            const updated = [...value[day]];
                            updated.splice(index, 1);
                            set({
                                ...value,
                                [day]: updated,
                            });
                            };

                            const clearDay = (day: Day) => {
                            set({
                                ...value,
                                [day]: [],
                            });
                            };

                            return (
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                                <div className="flex flex-wrap gap-2">
                                {weekdays.map((day) => (
                                    <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    className={`px-3 py-1 rounded border cursor-pointer ${
                                        selectedDays.includes(day)
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-700'
                                    }`}
                                    >
                                    {day}
                                    </button>
                                ))}
                                </div>

                                {selectedDays.includes(activeDay) && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Add time for {activeDay}</label>
                                    <div className="flex gap-2 flex-wrap">
                                    <div className="relative">
                                        <input
                                        type="time"
                                        value={currentTime}
                                        onChange={(e) => handleTimeChange(e.target.value)}
                                        className="border border-gray-300 rounded px-3 text-gray-700 focus:ring-1 focus:ring-indigo-500 py-2"
                                        />
                                    </div>
                                    <select
                                        value={amPm}
                                        onChange={(e) => handlePeriodChange(e.target.value)}
                                        className="border border-gray-300 rounded text-gray-700 px-2 py-2"
                                    >
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={addTimeSlot}
                                        className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded flex items-center gap-1"
                                    >
                                        <Plus size={16} /> Add
                                    </button>
                                    </div>
                                </div>
                                )}

                                <div>
                                <label className="text-sm font-medium text-gray-700 mb-2">Time Slots</label>
                                <div className="border border-gray-200 rounded p-4 max-h-[400px] overflow-auto">
                                    {Object.entries(value)
                                    .filter(([_, slots]) => slots.length > 0)
                                    .map(([day, slots]) => (
                                        <div key={day} className="mb-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="text-sm font-semibold text-indigo-600">{day}</h4>
                                            <button
                                            type="button"
                                            onClick={() => clearDay(day as Day)}
                                            className="text-red-500 hover:text-red-700 text-xs"
                                            >
                                            Clear All
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {slots.map((s, i) => (
                                            <span
                                                key={i}
                                                className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                            >
                                                {s}
                                                <button
                                                type="button"
                                                onClick={() => removeTimeSlot(day as Day, i)}
                                                className="ml-1 text-red-500 hover:text-red-700"
                                                >
                                                <X size={12} />
                                                </button>
                                            </span>
                                            ))}
                                        </div>
                                        </div>
                                    ))}
                                    {Object.values(value).every((slots) => slots.length === 0) && (
                                    <p className="text-sm text-gray-500 italic">No time slots added.</p>
                                    )}
                                </div>
                                </div>

                                {fieldState.error && (
                                <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                                )}
                            </div>
                            );
                        }}
                    />





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


                    


                </div>


                
            </div>
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
  )

}





