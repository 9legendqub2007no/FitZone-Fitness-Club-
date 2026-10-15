import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/workout")({
  server: { handlers: { POST: async ({ request }) => {
    const { handleWorkout } = await import("@/server/ai/workout.server");
    return handleWorkout(request);
  } } },
});