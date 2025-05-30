import { NextResponse } from "next/server";



export async function GET(req: Request, { params }: { params: Promise<{ slug: string }>}) {

    const { slug } = await params;

    const courseDetails = [
        {
          "id": "1",
          "title": "Money Management",
          "subtitle": "Learn how to save money, create a budget, and invest wisely with industry-expert guidance.",
          "rating": {
            "value": 4.5,
            "count": 206
          },
          "card_content":{
            "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDyVJG4cBhgkj6ufiYoq4u7EyW0Z4EnWQ-lw&s",
            "price": 2500,
            "highlights": {
              "total_enrolled": 580,
              "duration": "30h",
              "videos": 70,
              "course_validity": "Lifetime"
            },
          },
          "course_content": {
            "total_sections": 4,
            "total_lectures": 32,
            "total_length": "1h 26m",
            "sections": [
              { "title": "Best Habits", "lectures": 5, "length": "8", 
                "videos":[
                  {"title":"Welcome to the course", "length":"1m"},
                  {"title":"What is a habit?", "length":"2m"},
                  {"title":"How to create a habit?", "length":"2m"},
                  {"title":"Habits and their benefits", "length":"2m"},
                ],
              },
              { "title": "Best Practices and Planning", "lectures": 10, "length": "20",
                "videos":[
                  {"title":"Welcome to the course", "length":"1m"},
                  {"title":"What is a habit?", "length":"2m"},
                  {"title":"How to create a habit?", "length":"2m"},
                  {"title":"Habits and their benefits", "length":"2m"},
                ],
              },
              { "title": "Advanced Budget Strategies", "lectures": 8, "length": "30",
                "videos":[
                  {"title":"Welcome to the course", "length":"1m"},
                  {"title":"What is a habit?", "length":"2m"},
                  {"title":"How to create a habit?", "length":"2m"},
                  {"title":"Habits and their benefits", "length":"2m"},
                ],
              },
              { "title": "Investment Fundamentals", "lectures": 9, "length": "28",
                "videos":[
                  {"title":"Welcome to the course", "length":"1m"},
                  {"title":"What is a habit?", "length":"2m"},
                  {"title":"How to create a habit?", "length":"2m"},
                  {"title":"Habits and their benefits", "length":"2m"},
                ],
              }
            ]
          },
          "instructor": {
            "name": "Jamil Hossain",
            "title":"Full-stack developer",
            "avatar_url": "https://example.com/avatars/jamil.jpg",
            "instructor_rating": 4.5,
            "total_students": 483920,
            "total_courses": 16,
            "bio": "Hi, I'm Jamil Hossain. I’ve trained over half a million students in personal finance and budgeting strategies.",
          },
          "reviews": {
            "count": 124,
            "average_rating": 4.5,
            "reviewers": [
              {
                "reviewer": "Nadia Karim",
                "rating": 5,
                "time_ago": "1 week ago",
                "comment": "Practical tips, very clear, and easy to follow!"
              },
              {
                "reviewer": "Arif Chowdhury",
                "rating": 4,
                "time_ago": "3 weeks ago",
                "comment": "Good overview, but could use more case studies."
              }
            ]
          }
        },




        // {
        //   "id": "2",
        //   "title": "Digital Marketing Essentials",
        //   "subtitle": "Master SEO, social media, and email campaigns to grow your online presence.",
        //   "rating": {
        //     "value": 4.7,
        //     "count": 312
        //   },
        //   "price": {
        //     "amount": 3000,
        //     "currency": "BDT",
        //     "symbol": "৳"
        //   },
        //   "highlights": {
        //     "total_enrolled": 720,
        //     "duration": "25h",
        //     "videos": 85,
        //     "seo_toolkit_included": true,
        //     "certificate_of_completion": true,
        //     "course_validity": "Lifetime"
        //   },
        //   "content": {
        //     "total_sections": 5,
        //     "total_lectures": 40,
        //     "total_length": "3h 10m",
        //     "sections": [
        //       { "title": "Digital Marketing Basics", "lectures": 8, "length": "25m" },
        //       { "title": "Social Media Marketing", "lectures": 10, "length": "45m" },
        //       { "title": "SEO Fundamentals", "lectures": 9, "length": "50m" },
        //       { "title": "Email & Content Strategy", "lectures": 7, "length": "35m" },
        //       { "title": "Analytics & Reporting", "lectures": 6, "length": "35m" }
        //     ]
        //   },
        //   "instructor": {
        //     "name": "Tania Rahman",
        //     "instructor_rating": 4.8,
        //     "total_students": 251430,
        //     "total_courses": 12,
        //     "bio": "Tania has 10+ years of experience in crafting data-driven digital campaigns for top brands.",
        //     "avatar_url": "https://example.com/avatars/tania.jpg"
        //   },
        //   "reviews": {
        //     "count": 98,
        //     "average_rating": 4.7,
        //     "items": [
        //       {
        //         "reviewer": "Farhana Islam",
        //         "rating": 5,
        //         "time_ago": "2 days ago",
        //         "comment": "Loved the real-world examples and checklists!"
        //       },
        //       {
        //         "reviewer": "Kamal Uddin",
        //         "rating": 4,
        //         "time_ago": "2 weeks ago",
        //         "comment": "Very useful, though I wanted deeper analytics coverage."
        //       }
        //     ]
        //   }
        // },
        // {
        //   "id": "3",
        //   "title": "Freelancing Masterclass",
        //   "subtitle": "Start and scale your freelancing career: platform selection, client outreach, and negotiation.",
        //   "rating": {
        //     "value": 4.6,
        //     "count": 289
        //   },
        //   "price": {
        //     "amount": 2200,
        //     "currency": "BDT",
        //     "symbol": "৳"
        //   },
        //   "highlights": {
        //     "total_enrolled": 630,
        //     "duration": "20h",
        //     "videos": 60,
        //     "live_qna": true,
        //     "portfolio_template": true,
        //     "course_validity": "Lifetime"
        //   },
        //   "content": {
        //     "total_sections": 4,
        //     "total_lectures": 28,
        //     "total_length": "2h 45m",
        //     "sections": [
        //       { "title": "Introduction to Freelancing", "lectures": 6, "length": "15m" },
        //       { "title": "Platform Deep Dive", "lectures": 8, "length": "30m" },
        //       { "title": "Client Communication", "lectures": 7, "length": "25m" },
        //       { "title": "Proposal & Pricing", "lectures": 7, "length": "35m" }
        //     ]
        //   },
        //   "instructor": {
        //     "name": "Rahim Uddin",
        //     "instructor_rating": 4.6,
        //     "total_students": 178540,
        //     "total_courses": 8,
        //     "bio": "Rahim is a top-rated freelancer who’s earned 6-figures on major platforms.",
        //     "avatar_url": "https://example.com/avatars/rahim.jpg"
        //   },
        //   "reviews": {
        //     "count": 150,
        //     "average_rating": 4.6,
        //     "items": [
        //       {
        //         "reviewer": "Shabnam Sultana",
        //         "rating": 5,
        //         "time_ago": "1 month ago",
        //         "comment": "Super actionable advice—landed my first client!"
        //       },
        //       {
        //         "reviewer": "Imran Khan",
        //         "rating": 4,
        //         "time_ago": "3 weeks ago",
        //         "comment": "Good intro, wish there were more templates."
        //       }
        //     ]
        //   }
        // },
        // {
        //   "id": "4",
        //   "title": "Graphic Design for Beginners",
        //   "subtitle": "Use Canva & Photoshop to create stunning visuals and build your brand identity.",
        //   "rating": {
        //     "value": 4.8,
        //     "count": 402
        //   },
        //   "price": {
        //     "amount": 2800,
        //     "currency": "BDT",
        //     "symbol": "৳"
        //   },
        //   "highlights": {
        //     "total_enrolled": 850,
        //     "duration": "22h",
        //     "videos": 90,
        //     "downloadable_resources": true,
        //     "project_files_included": true,
        //     "course_validity": "Lifetime"
        //   },
        //   "content": {
        //     "total_sections": 6,
        //     "total_lectures": 48,
        //     "total_length": "3h 30m",
        //     "sections": [
        //       { "title": "Design Fundamentals", "lectures": 10, "length": "40m" },
        //       { "title": "Working in Canva", "lectures": 8, "length": "30m" },
        //       { "title": "Photoshop Basics", "lectures": 10, "length": "45m" },
        //       { "title": "Brand Projects", "lectures": 8, "length": "35m" },
        //       { "title": "Typography & Color", "lectures": 6, "length": "25m" },
        //       { "title": "Portfolio Showcase", "lectures": 6, "length": "35m" }
        //     ]
        //   },
        //   "instructor": {
        //     "name": "Sadia Mahmud",
        //     "instructor_rating": 4.9,
        //     "total_students": 312000,
        //     "total_courses": 10,
        //     "bio": "Sadia is a seasoned designer with 12 years of experience crafting brand identities.",
        //     "avatar_url": "https://example.com/avatars/sadia.jpg"
        //   },
        //   "reviews": {
        //     "count": 200,
        //     "average_rating": 4.8,
        //     "items": [
        //       {
        //         "reviewer": "Nusrat Jahan",
        //         "rating": 5,
        //         "time_ago": "5 days ago",
        //         "comment": "Fantastic walkthroughs—my designs look amazing now!"
        //       },
        //       {
        //         "reviewer": "Rashed Islam",
        //         "rating": 4,
        //         "time_ago": "2 weeks ago",
        //         "comment": "Great course but wish there were more Photoshop tips."
        //       }
        //     ]
        //   }
        // },
        // {
        //   "id": "5",
        //   "title": "Personal Branding Blueprint",
        //   "subtitle": "Build and grow a memorable personal brand across social media and web.",
        //   "rating": {
        //     "value": 4.4,
        //     "count": 158
        //   },
        //   "price": {
        //     "amount": 2700,
        //     "currency": "BDT",
        //     "symbol": "৳"
        //   },
        //   "highlights": {
        //     "total_enrolled": 490,
        //     "duration": "18h",
        //     "videos": 50,
        //     "bonus_templates": 3,
        //     "branding_checklist": true,
        //     "course_validity": "Lifetime"
        //   },
        //   "content": {
        //     "total_sections": 3,
        //     "total_lectures": 20,
        //     "total_length": "2h 15m",
        //     "sections": [
        //       { "title": "Brand Identity Creation", "lectures": 7, "length": "40m" },
        //       { "title": "Content Planning", "lectures": 7, "length": "35m" },
        //       { "title": "Audience Growth", "lectures": 6, "length": "30m" }
        //     ]
        //   },
        //   "instructor": {
        //     "name": "Tanvir Ahsan",
        //     "instructor_rating": 4.4,
        //     "total_students": 145700,
        //     "total_courses": 5,
        //     "bio": "Tanvir helps professionals and entrepreneurs build brands that stand out online.",
        //     "avatar_url": "https://example.com/avatars/tanvir.jpg"
        //   },
        //   "reviews": {
        //     "count": 112,
        //     "average_rating": 4.4,
        //     "items": [
        //       {
        //         "reviewer": "Moushumi Begum",
        //         "rating": 5,
        //         "time_ago": "3 days ago",
        //         "comment": "Exactly what I needed to refine my online presence."
        //       },
        //       {
        //         "reviewer": "Shahin Ahmed",
        //         "rating": 4,
        //         "time_ago": "1 week ago",
        //         "comment": "Great frameworks, but would love more live examples."
        //       }
        //     ]
        //   }
        // }
    ]
      
      
    const instructor = courseDetails .find(i => i.id === slug);
    if (!instructor) return new NextResponse("Not Found", { status: 404 });
    return NextResponse.json(instructor);  

}
  