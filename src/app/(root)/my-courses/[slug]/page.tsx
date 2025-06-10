// 'use client' 
// import { useEffect, useRef } from 'react';
// import Plyr from 'plyr';
// import 'plyr/dist/plyr.css';
// import shaka from 'shaka-player';

import VideoList from "@/components/VideoList";
import { redirect } from "next/navigation";





export default async function CoursePage({ params, searchParams }: {params: { courseId: string }, searchParams: { video?: string }}) {

    const { slug } = await params;
    const {video} = await searchParams;

    // console.log({slug, video})

    //   if (!video && courseData.videos.length > 0) {
    //     redirect(`/my-courses/${params.courseId}?video=${courseData.videos[0].id}`);
    //   }


    // if there aren't any search params and there are videos, redirect to the first video
    if (!video) {
        redirect(`/my-courses/${slug}?video=2kne398`);
    }

    console.log(!video)

    return(

        <div className="min-h-screen flex items-center gap-3 w-full">

            <div className="relative bg-amber-100 border border-amber-300 p-10 rounded-md w-4/5">
                <iframe src="https://iframe.mediadelivery.net/embed/450619/49644ba1-3e50-47e6-9cd7-cb3374cf8537?autoplay=true&loop=false&muted=false&preload=true&responsive=true" loading="lazy" className="border-none top-0 h-96 w-full" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen></iframe>
            </div>


            <div className="bg-gray-100 border border-gray-300 p-10 rounded-md max-w-1/5">
                <h1>Video play list sections</h1>
                <h1>course id : {slug}</h1>
                <h1>video id : {video}</h1>

                <VideoList currentVideoId={video}/>
            </div>  
            
        </div>
        
    )
}






// use signed url to get the video url





    // const videoRef = useRef(null);

    // useEffect(() => {

    //     const player = new Plyr(videoRef.current, {
    //         keyboard: { focused: true, global: true } // Enable global keyboard controls[8]
    //     });  
      
    //     // Custom key bindings
    //     const handleKeyDown = (e) => {
    //     if (!player.playing) return; // Only respond when playing
    
    //         switch(e.key.toLowerCase()) {
    //             case 'f':
    //             player.fullscreen.toggle();
    //             break;
                
    //             case 'arrowleft':
    //             player.rewind(5); // 10-second rewind[2][8]
    //             break;
                
    //             case 'arrowright':
    //             player.forward(5); // 10-second skip[2][8]
    //             break;
    //         }
    //     };
      
    //     window.addEventListener('keydown', handleKeyDown);
        
    //     return () => {
    //     window.removeEventListener('keydown', handleKeyDown);
    //     player.destroy();
    //     };

    // }, []);


    // const playerRef = useRef(null);

    // useEffect(() => {
    //   // Make sure the DOM is fully loaded
    //   if (typeof window === 'undefined' || !playerRef.current) return;
  
    //   // Wait a bit to ensure everything is ready
    //   const timer = setTimeout(() => {
    //     try {
    //       // This is the most reliable structure for YouTube with Plyr
    //       const player = new Plyr('#player', {
    //         debug: true, // Enable debug mode to see errors
    //         youtube: {
    //           noCookie: true,
    //           rel: 0,
    //           showinfo: 0,
    //           iv_load_policy: 3,
    //           modestbranding: 1
    //         }
    //       });
  
    //       console.log('Plyr initialized:', player);
          
    //       // Add event listeners to track player state
    //       player.on('ready', () => console.log('Player is ready'));
    //       player.on('error', (error) => console.error('Player error:', error));
    //     } catch (error) {
    //       console.error('Error initializing Plyr:', error);
    //     }
    //   }, 100);
  
    //   return () => {
    //     clearTimeout(timer);
    //   };
    // }, []);
    

    // const videoRef = useRef<HTMLVideoElement>(null)
    // const playerRef = useRef<shaka.Player>(null)
  
    // useEffect(() => {
    //     // // 1. Install polyfills
    //     // shaka.polyfill.installAll()
    
    //     // // 2. Check browser support
    //     // if (!shaka.Player.isBrowserSupported()) {
    //     //     console.error('Browser not supported!')
    //     //     return
    //     // }
    
    //     // // 3. Initialize player
    //     // playerRef.current = new shaka.Player(videoRef.current)
        
    //     // // 4. Error handling
    //     // playerRef.current.addEventListener('error', (error:any) => {
    //     //     console.error('Shaka Player Error:', error.detail)
    //     // })

    //     // // 5. shaka configuration
    //     // playerRef.current.configure({
    //     //     streaming: {
    //     //         bufferingGoal: 3600, // Maintain 60-second buffer
    //     //         rebufferingGoal: 3600, // Resume playback when 2s buffered
    //     //         bufferBehind: 30 // Keep 30s buffer behind current time
    //     //     }
    //     // })
  
    //     // // 5. Load video
    //     // playerRef.current.load('https://vz-2cc3073c-80d.b-cdn.net/f0b47d63-5225-4584-8e40-2315699992b7/playlist.m3u8')
    //     //     .then(() => console.log('Video loaded successfully'))
    //     //     .catch(console.error)
    

    //     const initPlayer = async () => {
    //         shaka.polyfill.installAll();
            
    //         if (!shaka.Player.isBrowserSupported() || !videoRef.current) {
    //           console.error('Browser not supported');
    //           return;
    //         }
      
    //         const player = new shaka.Player(videoRef.current);
    //         playerRef.current = player;
      
    //         // Rewrite all requests through proxy
    //         player.getNetworkingEngine().registerRequestFilter((type, request) => {
    //           const url = new URL(request.uris[0]);
    //           const path = encodeURIComponent(url.pathname.slice(1));
    //           request.uris = [`/api/segment?path=${path}`];
    //         });
      
    //         // Error handling
    //         player.addEventListener('error', (error:any) => {
    //           console.error('Error code', error.detail.code, 'URI:', error.detail.uri);
    //         });
      
    //         try {
    //           // Load through proxy
    //           await player.load('/api/segment?path=f0b47d63-5225-4584-8e40-2315699992b7/playlist.m3u8');
    //         } catch (error) {
    //           console.error('Load failed:', error);
    //         }
    //       };
      
    //       initPlayer();
    //     // 6. Cleanup
    //      return () => {
    //         playerRef.current?.destroy();
    //     };
    // }, [])


//     const videoRef = useRef<HTMLVideoElement>(null);
//     const playerRef = useRef<shaka.Player>(null);

//   useEffect(() => {
//     // Initialize Shaka Player
//     const initPlayer = async () => {
//       if (videoRef.current && !playerRef.current) {
//         // Install polyfills
//         shaka.polyfill.installAll();

//         if (shaka.Player.isBrowserSupported()) {
//           const player = new shaka.Player(videoRef.current);
//           playerRef.current = player;

//           // Error handling
//           player.addEventListener('error', (error:any) => {
//             console.error('Error code', error.detail.code, 'object', error.detail);
//           });

//           player.configure({
//             streaming: {
//                 bufferingGoal: 3600, // Maintain 60-second buffer
//                 rebufferingGoal: 3600, // Resume playback when 2s buffered
//                 bufferBehind: 30 // Keep 30s buffer behind current time
//             }
//           })

//           try {
//             await player.load('/api/stream/manifest.m3u8').catch(console.error);

//           } catch (e) {
//             console.error('Failed to load manifest:', e);
//           }
//         } else {
//           console.error('Browser not supported!');
//         }
//       }
//     };

//     initPlayer();

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.destroy();
//       }
//     };
//   }, []);
  
// const videoRef = useRef<HTMLVideoElement>(null);
//   const playerRef = useRef<shaka.Player>();

//   useEffect(() => {
//     const initPlayer = async () => {
//       if (!videoRef.current) return;

//       shaka.polyfill.installAll();
//       if (!shaka.Player.isBrowserSupported()) return;

//       const player = new shaka.Player(videoRef.current);
//       playerRef.current = player;

//       // Rewrite all requests to go through proxy
//       player.getNetworkingEngine().registerRequestFilter((type, request) => {
//         const originalUrl = request.uris[0];
//         const path = encodeURIComponent(new URL(originalUrl).pathname.slice(1));
//         request.uris = [`/api/segment?path=${path}`];
//       });

//       // Load initial manifest through proxy
//       try {
//         await player.load('/api/segment?path=f0b47d63-5225-4584-8e40-2315699992b7/playlist.m3u8');
//       } catch (error) {
//         console.error('Load failed:', error);
//       }
//     };

//     initPlayer();
//     return () => playerRef.current?.destroy();
//   }, []);



// first get how many collection access the user has. then take the collection id and get the video in. a collection will have multiple videos.

// const videoRef = useRef<HTMLVideoElement>(null);
// const playerRef = useRef<shaka.Player | null>(null);

// // The original manifest URL you want to proxy segments for
// const manifestUri = 'https://vz-2cc3073c-80d.b-cdn.net/f0b47d63-5225-4584-8e40-2315699992b7/playlist.m3u8';

// useEffect(() => {
//     // Ensure shaka is available (might be loaded async)
//     if (!shaka) {
//         console.error('Shaka Player library not loaded.');
//         return;
//     }

//     // 1. Install polyfills
//     shaka.polyfill.installAll();

//     // 2. Check browser support
//     if (!shaka.Player.isBrowserSupported()) {
//         console.error('Browser not supported!');
//         return;
//     }

//     // 3. Initialize player
//     if (!videoRef.current) {
//         console.error('Video element ref not available');
//         return;
//     }
//     const player = new shaka.Player(videoRef.current);
//     playerRef.current = player;

//     // 4. Error handling
//     player.addEventListener('error', (event: any) => { // Use specific event type if known
//         console.error('Shaka Player Error:', event.detail);
//     });

//     // *** --- Request Filter --- ***
//     // Register a request filter to intercept segment requests
//     player.getNetworkingEngine()?.registerRequestFilter(
//         (type: shaka.net.NetworkingEngine.RequestType, request: shaka.extern.Request) => {
//             // Get the original URL
//             const originalUrl = request.uris[0];
            
//             // Add authentication to all requests
//             // This could be a session token from your auth system
//             const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
//             if (authToken) {
//                 request.headers['Authorization'] = `Bearer ${authToken}`;
//             }
            
//             // Add user fingerprint if available
//             // This helps track who is accessing the video
//             const userFingerprint = localStorage.getItem('userFingerprint');
//             if (userFingerprint) {
//                 request.headers['X-User-Fingerprint'] = userFingerprint;
//             }
            
//             // Proxy both manifest and segment requests
//             if (type === shaka.net.NetworkingEngine.RequestType.SEGMENT || 
//                 type === shaka.net.NetworkingEngine.RequestType.MANIFEST) {
                
//                 // Construct the URL to your Next.js API proxy endpoint
//                 const proxyUrl = `/api/segment?url=${encodeURIComponent(originalUrl)}`;
                
//                 // Modify the request to point to your proxy
//                 request.uris = [proxyUrl];
//             }
//         }
//     );
//     // *** --- End Request Filter --- ***


//     // 5. Shaka configuration (optional, keeping yours)
//     player.configure({
//         streaming: {
//             bufferingGoal: 20,
//             rebufferingGoal: 5,
//             bufferBehind: 60
//         }
//     });

//     // 6. Load video manifest
//     // Shaka will fetch this manifest directly initially.
//     // The filter above will then intercept subsequent SEGMENT requests derived from this manifest.
//     player.load(manifestUri)
//         .then(() => console.log('Manifest loaded successfully'))
//         .catch((error: any) => {
//             console.error('Error loading manifest:', error);
//         });

//     // 7. Cleanup
//     return () => {
//         if (playerRef.current) {
//             playerRef.current.destroy()
//                 .then(() => console.log('Player destroyed successfully.'))
//                 .catch((error: any) => console.error('Error destroying player:', error));
//             playerRef.current = null;
//         }
//     };
// }, [manifestUri]); 










{/* 
            <iframe
            src="https://iframe.mediadelivery.net/embed/YOUR_LIBRARY_ID/11c0d792-4fb9-4514-b3ae-84aec6d99ad3"
            width="100%"
            height="360"
            style={{ border: 'none' }}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            /> */}

            {/* <div className="relative pt-[56.25%]">
            <iframe
                src="https://iframe.mediadelivery.net/embed/414419/f0b47d63-5225-4584-8e40-2315699992b7?token=f6b8682f49fe19ef3dacf0de155b5de22e1433a5f49b64a1214f630de0ded4a6&expires=1745869080&autoplay=true&loop=false&muted=false&preload=true&responsive=true"
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture encrypted-media;"
                allowFullScreen
            ></iframe>
            </div> */}

            {/* <div ><iframe src="https://iframe.mediadelivery.net/embed/414419/f0b47d63-5225-4584-8e40-2315699992b7?autoplay=true&loop=false&muted=false&preload=false&responsive=true" loading="lazy"  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"></iframe></div> */}
{/* 

            <div className="plyr__video-embed" id="player">
            <iframe
                src="https://iframe.mediadelivery.net/embed/414419/f0b47d63-5225-4584-8e40-2315699992b7?token=9c926bf45fac544978a1c802315916a536bca97747d678a8b0001bedf7e84346&expires=1746256592&autoplay=true&loop=false&muted=false&preload=true&responsive=true"
                allowFullScreen
                allowTransparency
                allow="autoplay"
            ></iframe>
            </div> */}
{/* 
            <video ref={videoRef} controls>
                <source src="/video/video.mp4" type="video/mp4" />
            </video> */}

            {/* <video id="player" playsInline controls data-poster="/path/to/poster.jpg">
                <source src="/video/video.mp4" type="video/mp4" />

                <track kind="captions" label="English captions" src="/path/to/captions.vtt" srcLang="en" default />
            </video> */}

{/* 
        <div className="mb-8">
            <div className="plyr__video-embed" id="player" ref={playerRef}>
            <iframe
                src="https://www.youtube.com/embed/SDIq26_DVLk?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
                allowFullScreen
                allow="autoplay"
            ></iframe>
            </div>
        </div> */}
        

     
       
        {/* <video ref={videoRef} className="w-full aspect-video bg-black rounded-lg" controls autoPlay/> */}
        
        













// HLS support 

// 'use client';
// import { useEffect, useRef } from 'react';
// import Plyr from 'plyr';
// import Hls from 'hls.js';
// import 'plyr/dist/plyr.css';

// export default function HlsPlayer() {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     const hls = new Hls();
    
//     hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
//     hls.attachMedia(video);
    
//     const player = new Plyr(video, {
//       quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] }
//     });

//     return () => {
//       hls.destroy();
//       player.destroy();
//     };
//   }, []);

//   return <video ref={videoRef} controls />;
// }






//  youtube integration

// 'use client';
// import { useEffect } from 'react';
// import Plyr from 'plyr';
// import 'plyr/dist/plyr.css';

// export default function YouTubePlayer() {
//   useEffect(() => {
//     const player = new Plyr('#youtube-player', {
//       youtube: { 
//         noCookie: true,
//         rel: 0 
//       }
//     });
//     return () => player.destroy();
//   }, []);

//   return (
//     <div 
//       id="youtube-player"
//       data-plyr-provider="youtube" 
//       data-plyr-embed-id="SDIq26_DVLk"
//     />
//   );
// }
