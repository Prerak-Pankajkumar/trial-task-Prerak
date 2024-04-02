import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

interface CustomContext {
  db: {
    session: {
      create: (args: {
        data: { sessionToken: string; expires: string };
      }) => Promise<unknown>;
      findById: (args: { sessionToken: string }) => Promise<unknown>;
      updateById: (args: {
        data: { sessionToken: string; expires: string };
      }) => Promise<unknown>;
    };
  };
}

export const sessionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ sessionToken: z.string(), expires: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return (ctx.db as unknown as CustomContext['db']).session.create({
        data: {
          sessionToken: input.sessionToken,
          expires: input.expires,
        },
      });
    }),

  findById: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return (ctx.db as unknown as CustomContext['db']).session.findById({
        sessionToken: input.sessionId,
      });
    }),

  updateById: publicProcedure
    .input(z.object({ sessionId: z.string(), expires: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return (ctx.db as unknown as CustomContext['db']).session.updateById({
        data: {
            sessionToken: input.sessionId,
            expires: input.expires,
          }
      });
    }),
});
