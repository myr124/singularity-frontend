import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: request.headers }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`[TRPC] ${path ?? "<unknown>"} failed:`, error);
          }
        : undefined,
  });

export { handler as GET, handler as POST };
