import { createTRPCRouter } from "~/server/api/trpc";
import { battlefyFetch } from "~/server/api/routers/bfFetch";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  battlefyFetch: battlefyFetch,
});

// export type definition of API
export type AppRouter = typeof appRouter;
