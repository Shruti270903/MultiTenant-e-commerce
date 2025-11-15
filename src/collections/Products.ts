// import type {CollectionConfig} from "payload";
// export const Products: CollectionConfig={
//     slug: "products",
//     fields:[
//         {name:"name",
//             type:"text",
//             required:true,
//         },
//         {
//             name:"description",
//             type:"text",
//         },
//         {
//             name:"price",
//             type:"number",
//             required:true,
//             admin: {
//                 description:"price in USD"
//             }
//         }, 
//         {
//             name:"category", 
//             type:"relationship",
//             relationTo:"categories",
//             hasMany:false,
//         },
//         {
//             name:"tags", 
//             type:"relationship",
//             relationTo:"tags",
//             hasMany:true,
//         },
//         {
//             name:"image",
//             type:"upload",
//             relationTo:"media",
//         },
//         {
//             name:"refundPolicy",
//             type:"select",
//             options:["30-day", "14-day", "3-day", "1-day", "no-refunds"],
//             defaultValue:"30-day",
//         }
//     ],
// };

import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },

  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
  ],
};

export default Products;
