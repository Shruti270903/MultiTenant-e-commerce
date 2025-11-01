// import type { CollectionConfig } from 'payload'

// export const Users: CollectionConfig = {
//   slug: 'users',
//   admin: {
//     useAsTitle: 'email',
//   },
//   auth: true,
//   fields: [
   
//   ],
// }

import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}

export default Users;
