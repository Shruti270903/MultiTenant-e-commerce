import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    // collection: 'users',
    collection: 'categories' as any,
  })

  return Response.json(data)
}
// http://localhost:3000/my-route