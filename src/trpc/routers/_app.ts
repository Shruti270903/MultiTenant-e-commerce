import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/procedures';
import { authRouter } from '@/modules/auth/server/procedure';
export const appRouter = createTRPCRouter({
    auth:authRouter,
 categories:categoriesRouter
});

export type AppRouter = typeof appRouter;