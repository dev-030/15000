import { GetCourseData } from "@/lib/actions/actions";
import { ChevronDown, CirclePlay } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import VideoSidebar from "@/components/videoSidebar";





export default async function AppLayout({children, params}:{children:React.ReactNode, params: Promise<{ courseId: string }>}) {


    const {courseId} = await params;

    const data = await GetCourseData(courseId);

    // console.log(data)

    
    

      // return  redirect("/my-courses/1/1")

    // const firstVideoId = course.course_content.sections[0]?.videos[0]?.id;


    // console.log(firstVideoId)


  // redirect(`/my-courses/${2}/${firstVideoId}`);


    return(
      <>
        <div className="flex items-center gap-5">

          {children}

          <VideoSidebar data={data}/>
            
        </div>
      </>
    )
}