import { apiService } from '@/lib/actions/api';
import { NextRequest } from 'next/server';



export async function GET(request: NextRequest, {params}:{params: Promise<{videoId:string}>}) {

    const { videoId } = await params;

    try {
        
        const response = await apiService.get(`/course/video-link/${videoId}/`, {
            requiresAuth: true,
            cache: 'no-cache',
        });
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error: any) {
        console.error({ ERROR: error.message });

        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

}



