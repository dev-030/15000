'use client';

import useSWR from "swr";
import { use, useEffect, useRef, useState } from "react";
import shaka from 'shaka-player';



export default function VideoPlayer({ videoId }: { videoId: string }) {

    const {data, isLoading} = useSWR(`/api/video/${videoId}`, (url: string) =>
        fetch(url).then((res) => res.json())
    );

    console.log(data);


    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<shaka.Player | null>(null);


    useEffect(() => {
        async function initPlayer() {
        shaka.polyfill.installAll();

        if (!shaka.Player.isBrowserSupported()) {
            console.error('Browser not supported!');
            return;
        }

        const video = videoRef.current;

        const player = new shaka.Player(video);

        try {
            await player.load(data?.m3u8_url);
            console.log('The video has now been loaded!');
        } catch (err) {
            console.error('Failed to load video:', err);
        }
        }

        initPlayer();

        return () => {
            playerRef.current?.destroy().catch(console.error);
        };

    }, [isLoading]);


//   if (isLoading) {
//     return (
//       <div className="w-full max-w-4xl mx-auto">
//         <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
//           <div className="aspect-video bg-gray-800 flex items-center justify-center">
//             <div className="text-center text-white">
//               {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div> */}
//               <p className="text-lg">Loading video...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
 

  return (
    <div className="w-full">

        <div className="mx-auto ">
            <h1 className="text-xl my-2">Title : {data?.video_title}</h1>

            <video
                ref={videoRef}
                className="w-full h-auto rounded-lg shadow-lg border border-gray-700 bg-black object-contain"
                controls
                autoPlay
            />

        </div>
        
        

    </div>
  );
}
