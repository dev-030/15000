import { ArrowRight, CircleAlert, Link, UserRoundPen } from "lucide-react";
import { useEffect } from "react";







export default function CreateCoursePopUp({modalOption, router, session, percentage}:{modalOption:string, router:any, session:any, percentage:number}){     

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const trapTab = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', trapTab);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', trapTab);
        };
    }, []);


    return(
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
    )
}