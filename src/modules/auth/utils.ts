import "server-only";

import {cookies as getCookies} from "next/headers";
interface Props{
    prefix:string;
    value:string;
};

export const generateAuthCookie= async({
    value,
    prefix,
    }: Props)=>{
     const cookies = await getCookies();
        cookies.set({
          name: `${prefix}-token`,  //payload token by default
          value: value,
          httpOnly: true,
          path: "/",
        });
    }