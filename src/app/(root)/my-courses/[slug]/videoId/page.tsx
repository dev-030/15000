import { GetVideo } from "@/lib/actions/actions";




export default async function page({ params }: { params: Promise<{ courseId: string; videoId: string }>}){

    const { courseId, videoId } = await params;

    const video = await GetVideo(courseId, videoId);

    console.log(video)
    // console.log(courseId)
    // console.log(videoId)

    return (
        <div>
            <h1>course id {courseId}</h1>
            <h1>video id {videoId}</h1>
        </div>
    )
}