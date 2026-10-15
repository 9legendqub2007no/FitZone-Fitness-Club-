import { z } from "zod";

export const workoutInput = z.object({
  goals: z.string().trim().min(10, "Describe your goals in at least 10 characters.").max(1500),
  experience: z.enum(["Beginner", "Intermediate", "Advanced"]),
  equipment: z.array(z.enum(["Bodyweight", "Dumbbells", "Resistance bands", "Barbell & rack", "Gym machines", "Cardio equipment", "Yoga mat"])).min(1).max(7),
  equipmentNotes: z.string().trim().max(500),
  days: z.number().int().min(1).max(6),
  minutes: z.number().int().min(15).max(90),
  limitations: z.string().trim().max(1000),
});
export type WorkoutInput = z.infer<typeof workoutInput>;