import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig={
    slug:"categories",
    // access:{
    // create:()=>false,
    // update:()=>false,
    // },                               //block update and creating categories section in admin/collection/categories area
    fields:[
        {
            name:"name",
            type:"text",
            required:true,
        },
    ],
};