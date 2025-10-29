// // "use client";  
// "use server";
// import configPromise from "@payload-config";
// import { getPayload } from "payload";
// import Navbar from "./navbar";
// import { Footer } from "./footer";
// import SearchFilters from "./search-filter";
// import type { Category } from "@/payload-types";
// interface props {
//   children: React.ReactNode;
// };
// const Layout =async ({ children }: props) => {
//   const payload=await getPayload({
//     config: configPromise,
//   })
//   const data = await payload.find({
//     collection:"categories" as any,
//     depth:1,   //populate subcategories, subcategories.[0] will be a type of "category" 
//     pagination:false,
//     where:{
//       parent:{
//         exists:false,
//       },
//     },
//   });
//   interface SubCategory extends Category {
//     subcategories: undefined;
//   }

//   interface FormattedCategory extends Category {
//     subcategories: SubCategory[];
//   }

//   interface RawDoc extends Category {
//     subcategories?: {
//       docs: Category[];
//     };
//   }

//   interface DocWithSubcategories extends Category {
//     subcategories?: Category[];
//   }

//   const formattedData: FormattedCategory[] = (data.docs as RawDoc[]).map((doc: RawDoc): FormattedCategory => ({
//     ...doc,
//     subcategories: (doc.subcategories?.docs ?? []).map((doc: Category): SubCategory => ({
//       ...(doc as Category),
//       subcategories: undefined,
//     })),
//   }));
//   console.log(data, formattedData);
//   return (
//     <div className="flex flex-col min-h-screen">
//           <Navbar/>
//           {/* <SearchFilters data={data}/> */}
//           <SearchFilters data={data.docs} />
//       <div className="flex-1 bg-[#F4F4F0]">  {children}</div>
//       <Footer/>
//           </div>
//   );
// };
// export default Layout;


"use server";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import Navbar from "./navbar";
import { Footer } from "./footer";
import SearchFilters from "./search-filter";
import type { Category } from "@/payload-types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "categories" as const,
    depth: 1, // populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false, // only top-level categories
      },
    },
  });

  // --- TYPES ---
  interface SubCategory extends Category {
    subcategories?: undefined;
  }

  interface FormattedCategory extends Category {
    subcategories: SubCategory[];
  }

  interface RawDoc extends Category {
    subcategories?: {
      docs: Category[];
    };
  }

  // --- TRANSFORM PAYLOAD DATA ---
  const formattedData: FormattedCategory[] = (data.docs as RawDoc[]).map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
      ...sub,
      subcategories: undefined, // prevent nesting loops
    })),
  }));

  console.log("Formatted Data:", formattedData);

  // --- RENDER ---
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Pass cleaned data to SearchFilters */}
      <SearchFilters data={formattedData} />

      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
