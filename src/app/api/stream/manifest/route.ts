// import { NextResponse } from 'next/server';

// // API route that serves the video manifest.m3u8 file
// export async function GET(req: Request) {
//   const manifestUrl = 'https://your-bunny-cdn-url/manifest.m3u8'; // Replace with your Bunny Stream URL

//   console.log("got hit 🟢")
//   try {
//     const response = await fetch(manifestUrl);
//     if (!response.ok) {
//       return new Response('Error fetching manifest', { status: 500 });
//     }

//     const manifestContent = await response.text();
//     return new Response(manifestContent, {
//       headers: {
//         'Content-Type': 'application/vnd.apple.mpegurl',
//       },
//     });
//   } catch (error) {
//     return new Response('Error', { status: 500 });
//   }
// }






// app/api/stream/manifest/route.ts

import { NextResponse } from 'next/server';

export async function GET() {

  console.log("got hit 🟢")
  // const manifestUrl = 'https://your-bunny-stream-url/manifest.m3u8'; // Replace with the actual URL of your Bunny Stream video manifest

  // try {
  //   const response = await fetch(manifestUrl);

  //   if (!response.ok) {
  //     return NextResponse.json({ error: 'Failed to fetch manifest' }, { status: 500 });
  //   }

  //   const manifestContent = await response.text();

  //   return new NextResponse(manifestContent, {
  //     headers: {
  //       'Content-Type': 'application/vnd.apple.mpegurl',
  //       'Access-Control-Allow-Origin': '*', // Allow cross-origin requests
  //     },
  //   });
  // } catch (error) {
  //   console.error('Error fetching manifest:', error);
  //   return NextResponse.json({ error: 'Error fetching manifest' }, { status: 500 });
  // }

  return NextResponse.json({ success: true });

}
