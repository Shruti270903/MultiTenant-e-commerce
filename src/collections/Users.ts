// import type { CollectionConfig } from 'payload'
// import { Tenants } from './Tenants';
// import {tenantsArrayField} from "@payloadcms/plugin-multi-tenant/fields";
// const defaultTenantArrayField= tenantsArrayField({
//   tenantsArrayFieldName:"tenants",
//    tenantsCollectionSlug: "tenants",
//    tenantsArrayTenantFieldName: "tenant",
//    arrayFieldAccess: {
//      read:()=>true,
//      create:()=>true,
//      update:()=>true,
//    },
//   tenantFieldAccess: {
//     read:()=>true,
//     create:()=>true,
//     update:()=>true,
//   },
// })
// export const Users: CollectionConfig = {
//   slug: 'users',
//   admin: {
//     useAsTitle: 'email',
//   },
//   auth: true,
//   fields: [
//     {
//       name:"username",
//       required:true,
//       unique: true,
//       type:"text",
//     },
//     {
//       admin: {
//       position:"sidebar",
//       },
//       name: "roles",
//       type:"select",
//       defaultValue:["user"],
//       hasMany:true,
//       options: ["super-admin", "user"],
//     },
//      {
//       ...defaultTenantArrayField,
//       admin: {
//         ...(defaultTenantArrayField?.admin || {}),
//         position: "sidebar",
//        },
//     },
//   ],
// };



import type { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },

  fields: [
    {
      name: "username",
      type: "text",
      required: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Super Admin", value: "super-admin" },
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "tenants",
      type: "array",
      fields: [
        {
          name: "tenant",
          type: "relationship",
          relationTo: "tenants",
          required: true,
        },
      ],
    },
  ],
};

export default Users;
