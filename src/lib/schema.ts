import { z } from "zod";




export const bookingSchema = z.object({
  date: z.string().min(1, "Date is required").refine(val => !Array.isArray(val), {
    message: "Only one date can be selected"
  }),
  time: z.string().min(1, "Time is required").refine(val => !Array.isArray(val), {
    message: "Only one time can be selected"
  }),
  slug: z.string().min(1, "Slug is required"),
  note: z.string().min(1, "Note is required")
})