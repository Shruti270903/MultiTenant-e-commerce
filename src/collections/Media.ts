// import type { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   access: {
//     read: () => true,
//   },
//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       required: true,
//     },
//   ],
//   upload: true,
// }
    import type { CollectionConfig } from "payload";

const Media: CollectionConfig = {
  slug: "media",
  upload: true,

  admin: {
    useAsTitle: "filename",
  },

  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};

export default Media;
