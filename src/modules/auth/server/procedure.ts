import { headers as getHeaders} from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
// import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  // --- SESSION ---
  session: baseProcedure.query(async ({ ctx }) => {
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

  // --- REGISTER ---
  register: baseProcedure
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
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, // TODO: Hash password before saving
        },
      });
      return { success: true };
    }),

  // --- LOGIN ---
  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data?.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }

    // http://localhost:3004/
    
    // const cookies = await getCookies();
    // cookies.set({
    //   name: `${ctx.db.config.cookiePrefix}-token`,  //payload token by default
    //   value: data.token,
    //   httpOnly: true,
    //   path: "/",
    //   // sameSite: "none",
    //   // domain: ".funroad.com", // if needed for cross-subdomain auth
    // });

    await generateAuthCookie({
      prefix:ctx.db.config.cookiePrefix,
      value:data.token
    });
    return data;
  }),
});
