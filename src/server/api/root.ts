import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { userRouter } from "./routers/users";
import { projectsRouter } from "./routers/projects";
import { projectEntriesRouter } from "./routers/projectEntries";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  project: projectsRouter,
  projectEntries: projectEntriesRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
