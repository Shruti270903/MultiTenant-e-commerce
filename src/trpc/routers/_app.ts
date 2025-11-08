import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/procedures';
import { authRouter } from '@/modules/auth/server/procedure';
import { productsRouter } from '@/modules/products/server/procedures';
export const appRouter = createTRPCRouter({
    auth:authRouter,
    products:productsRouter,  
 categories:categoriesRouter
});

export type AppRouter = typeof appRouter;