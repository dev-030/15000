import { apiService } from '@/lib/actions/api';




export async function GET() {
  try {

    console.log("from booked sessions route", new Date().getMilliseconds())

    const response = await apiService.get<{ results: [] }>('/client/booked-sessions/', {
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

