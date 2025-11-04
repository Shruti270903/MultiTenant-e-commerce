// import z, { email } from "zod";
// import {headers as getHeaders, cookies as getCookies} from "next/headers";
// import { baseProcedure, createTRPCRouter } from "@/trpc/init";
// import {TRPCError} from "@trpc/server";
// import { AUTH_COOKIE } from "../constants";
// export const authRouter= createTRPCRouter({
//     session:baseProcedure.query(async({ctx})=>{
//       const headers = await getHeaders();
      
//       const session = await ctx.db.auth({headers});
//       return session;
//     }),
//     logout: baseProcedure.mutation(async()=>{
//         const cookies = await getCookies();
//         cookies.delete(AUTH_COOKIE);
//     })
//     register: baseProcedure
//     .input(
//         z.object({
//         email:z.string().email(),
//         password:z.string().min(6),
//         username:z
//         .string()
//        .min(3, "Username must be at least 3 characters")
//        .max(63, "Username must be less than 63 characters")
//        .regex(
//         /^[a-z0-9] [a-z0-9-]*[a-z0-9]$/,
//         "Username can only contain lowercase letters, numbers and hyphens. It must start and end with a letter or number"
//        )
//        .refine(
//         (val) => !val.includes("--"),
//         "Username cannot contain consecutive hyphens"
//        )
//        .transform((val)=>val.toLowerCase()),
//         })
//     )
//     .mutation(async ({input, ctx})=>{
//         await ctx.db.create({
//             collection:"users",
//             data:{
//                 email:input.email,
//                 username:input.username,
//                 password:input.password, //This will be hashed
//             },
//         });
//          login: baseProcedure
//     .input(
//         z.object({
//         email:z.string().email(),
//         password:z.string(),
       
//         })
//     )
//     .mutation(async ({input, ctx})=>{
//      const data = await ctx.db.login({
//         collection:"user",
//         data:{
//             email:input.email,
//             password:input.password,
//         },
//      });
//      if(!data.token){
//         throw new TRPCError({
//             code:"UNAUTHORIZED",
//             message:"Failed to login",
//         });
//      }
// const cookies = await getCookies();
// cookies.set({
//     name:AUTH_COOKIE,
//     value:data.token,
//     httpOnly:true,
//     path:"/",
//     // sameSite:"none",
//     // domain:"",
//     //TODO: Ensure cross-domain cookie sharing
//     //funroad.com //initial cookie
//     //shruti.funroad.com//cookie does not exist here
// });
//     }),

//      login: baseProcedure
//     .input(
//         z.object({
//         email:z.string().email(),
//         password:z.string(),
       
//         })
//     )
//     .mutation(async ({input, ctx})=>{
//      const data = await ctx.db.login({
//         collection:"user",
//         data:{
//             email:input.email,
//             password:input.password,
//         },
//      });
//      if(!data.token){
//         throw new TRPCError({
//             code:"UNAUTHORIZED",
//             message:"Failed to login",
//         });
//      }
// const cookies = await getCookies();
// cookies.set({
//     name:AUTH_COOKIE,
//     value:data.token,
//     httpOnly:true,
//     path:"/",
//     // sameSite:"none",
//     // domain:"",
//     //TODO: Ensure cross-domain cookie sharing
//     //funroad.com //initial cookie
//     //shruti.funroad.com//cookie does not exist here
// });
// return data;
//     }),
//  });

import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";

export const authRouter = createTRPCRouter({
  // --- SESSION ---
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });
 


    return session;
  }),
  

  // --- LOGOUT ---
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
    return { success: true };
  }),

  // --- REGISTER ---
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {

      const existingData = await ctx.db.find({
        collection:"users",
        limit:1,
        where:{
          username:{
            equals:input.username,
          },
        },
      });

      const existingUser = existingData.docs[0];
      if(existingUser){
        throw new TRPCError({
          code:"BAD_REQUEST",
          message:"Username already taken",
        })
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
  login: baseProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
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

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // sameSite: "none",
        // domain: ".funroad.com", // if needed for cross-subdomain auth
      });

      return data;
    }),
});
