import { apiService } from '@/lib/actions/api';



export async function GET() {
  try {

    const response = await apiService.get('/mentor/gig-list/', {
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

