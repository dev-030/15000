import { apiService } from '@/lib/actions/api';
import { NextRequest } from 'next/server';



export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url);

  try {

    const response = await apiService.get(`/mentor/update-gig/?session_id=${searchParams.get("consultancy_id")}`,  {
      requiresAuth: true,
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

