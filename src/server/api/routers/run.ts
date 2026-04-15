import { z } from "zod";

import { getMockRun } from "~/lib/tasks/arc/mock-data";
import { getAllTasks, getTaskConfig } from "~/lib/tasks/registry";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const runRouter = createTRPCRouter({
  current: publicProcedure.query(() => getMockRun()),
  byTask: publicProcedure
    .input(z.object({ task: z.string() }))
    .query(({ input }) => {
      const task = getTaskConfig(input.task);
      if (!task) throw new Error(`Unknown task: ${input.task}`);
      return task.getData();
    }),
  list: publicProcedure.query(() => {
    return getAllTasks().map((task) => ({
      id: task.id,
      name: task.name,
      description: task.description,
    }));
  }),
  byId: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(({ input }) => {
      const run = getMockRun();
      if (input.sessionId !== run.sessionId) {
        throw new Error(`Unknown session: ${input.sessionId}`);
      }
      return run;
    }),
});