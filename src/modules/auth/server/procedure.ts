import { TRPCError } from "@trpc/server";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { headers as getHeaders} from "next/headers";

import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {    // --- SESSION ---
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });

    return session;
  }),

  // --- LOGOUT ---
  // logout: baseProcedure.mutation(async () => {
  //   const cookies = await getCookies();
  //   cookies.delete(AUTH_COOKIE);
  //   return { success: true };
  // }),
  register: baseProcedure  // --- REGISTER ---
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingUser = existingData.docs[0];
 
      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

      const tenant = await ctx.db.create({
        collection:"tenants",
        data:{
          name: input.username,
          slug:input.username,
          // email: input.email,
          stripeAccountId:"test"
        },
      });
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, //! TODO: Hash password before saving
tenants:[
  {
    tenant: tenant.id,
     },
   ],
 },
});
    //   return { success: true };
    // }),
    const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });
    }),
 
  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {     // --- LOGIN ---
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }
    await generateAuthCookie({
      prefix:ctx.db.config.cookiePrefix,
      value:data.token
    });
    return data;
  }),
});
