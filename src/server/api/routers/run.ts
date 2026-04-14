import { z } from "zod";

import { getMockRun } from "~/lib/mock-data";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const runRouter = createTRPCRouter({
  current: publicProcedure.query(() => getMockRun()),
  byId: publicProcedure.input(z.object({ sessionId: z.string() })).query(({ input }) => {
    const run = getMockRun();
    if (input.sessionId !== run.sessionId) {
      throw new Error(`Unknown session: ${input.sessionId}`);
    }
    return run;
  }),
  list: publicProcedure.query(() => {
    const run = getMockRun();
    return [{ sessionId: run.sessionId, title: run.title, subtitle: run.subtitle }];
  }),
});
