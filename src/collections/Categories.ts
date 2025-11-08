import type { CollectionConfig } from "payload";

const Categories: CollectionConfig={
    slug:"categories" ,
  admin:{
   useAsTitle:"name",
  },
    fields:[
        {
            name:"name",
            type:"text",
            required:true,
        },
        {
            name:"slug",
            type:"text",
            required:true,
            unique:true,
            index:true,
        },
        {
            name:"color",
            type:"text",
        },
        {
           name:"parent",
           type:"relationship",
           relationTo: "categories" as any,
           hasMany:false,
        },
        {
         name:"subcategories",
         type:"join",
         collection:"categories" as any,
         on:"parent",
         hasMany:true,     
        },
    ],
};
export default Categories;