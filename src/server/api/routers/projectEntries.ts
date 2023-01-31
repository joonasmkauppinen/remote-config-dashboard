import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectEntriesRouter = createTRPCRouter({
  findByProjectId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.tableEntry.findMany({
        where: {
          projectId: input.id,
        },
      });
    }),

  addEntry: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        role: z.string(),
        group: z.string(),
        notificationChannel: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.tableEntry.create({ data: input });
    }),
});
