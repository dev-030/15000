'use client';

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, PlayButton } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

export default function VideoPlayer() {

    const param = useSearchParams().get('video');

    const {data, isLoading} = useSWR(`/api/video/${param}`, (url: string) =>
        fetch(url).then((res) => res.json())
    );



    if (isLoading) {
        return (
        <div className="w-full h-full">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center shadow-md">
            <p className="text-white text-lg animate-pulse">Loading video...</p>
            </div>
        </div>
        );
    }


    

  return (
      <div className="w-full h-full flex flex-col">

        <MediaPlayer src={data.m3u8_url} className="w-full aspect-video">
            <MediaProvider />
            <PlyrLayout icons={plyrLayoutIcons} />
        </MediaPlayer>

        <div className="mt-4">
            <h2 className="text-xl md:text-2xl font-semibold">
                {data.video_title || 'Untitled Video'}
            </h2>
        </div>

    </div>
  );
}
