import { apiService } from "@/lib/actions/api";


export async function GET(req: Request, { params }: { params: Promise<{ slug: string }>}) {

  const { slug } = await params;


    // const courseDetails = [
    //     {
    //       "id": "1",
    //       "title": "Money Management",
    //       "subtitle": "Learn how to save money, create a budget, and invest wisely with industry-expert guidance.",
    //       "rating": {
    //         "value": 4.5,
    //         "count": 206
    //       },
    //       "card_content":{
    //         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDyVJG4cBhgkj6ufiYoq4u7EyW0Z4EnWQ-lw&s",
    //         "price": 2500,
    //         "highlights": {
    //           "total_enrolled": 580,
    //           "duration": "30h",
    //           "videos": 70,
    //           "course_validity": "Lifetime"
    //         },
    //       },
    //       "course_content": {
    //         "total_sections": 4,
    //         "total_lectures": 32,
    //         "total_length": "1h 26m",
    //         "sections": [
    //           { "title": "Best Habits", "lectures": 5, "length": "8", 
    //             "videos":[
    //               {"title":"Welcome to the course", "length":"1m"},
    //               {"title":"What is a habit?", "length":"2m"},
    //               {"title":"How to create a habit?", "length":"2m"},
    //               {"title":"Habits and their benefits", "length":"2m"},
    //             ],
    //           },
    //           { "title": "Best Practices and Planning", "lectures": 10, "length": "20",
    //             "videos":[
    //               {"title":"Welcome to the course", "length":"1m"},
    //               {"title":"What is a habit?", "length":"2m"},
    //               {"title":"How to create a habit?", "length":"2m"},
    //               {"title":"Habits and their benefits", "length":"2m"},
    //             ],
    //           },
    //           { "title": "Advanced Budget Strategies", "lectures": 8, "length": "30",
    //             "videos":[
    //               {"title":"Welcome to the course", "length":"1m"},
    //               {"title":"What is a habit?", "length":"2m"},
    //               {"title":"How to create a habit?", "length":"2m"},
    //               {"title":"Habits and their benefits", "length":"2m"},
    //             ],
    //           },
    //           { "title": "Investment Fundamentals", "lectures": 9, "length": "28",
    //             "videos":[
    //               {"title":"Welcome to the course", "length":"1m"},
    //               {"title":"What is a habit?", "length":"2m"},
    //               {"title":"How to create a habit?", "length":"2m"},
    //               {"title":"Habits and their benefits", "length":"2m"},
    //             ],
    //           }
    //         ]
    //       },
    //       "instructor": {
    //         "name": "Jamil Hossain",
    //         "title":"Full-stack developer",
    //         "avatar_url": "https://example.com/avatars/jamil.jpg",
    //         "instructor_rating": 4.5,
    //         "total_students": 483920,
    //         "total_courses": 16,
    //         "bio": "Hi, I'm Jamil Hossain. I’ve trained over half a million students in personal finance and budgeting strategies.",
    //       },
    //       "reviews": {
    //         "count": 124,
    //         "average_rating": 4.5,
    //         "reviewers": [
    //           {
    //             "reviewer": "Nadia Karim",
    //             "rating": 5,
    //             "time_ago": "1 week ago",
    //             "comment": "Practical tips, very clear, and easy to follow!"
    //           },
    //           {
    //             "reviewer": "Arif Chowdhury",
    //             "rating": 4,
    //             "time_ago": "3 weeks ago",
    //             "comment": "Good overview, but could use more case studies."
    //           }
    //         ]
    //       }
    //     },


  try {

    const response = await apiService.get(`/course/course-info-all-users/${slug}/`, {
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
  