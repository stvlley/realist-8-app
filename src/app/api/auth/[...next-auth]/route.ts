import { headers } from 'next/headers'
 
export async function GET() {
  const headersList = await headers()
  const referer = headersList.get('referer')
 
  return new Response('Hello, stvlley!', {
    status: 200,
    headers: { referer: referer ?? '' },
  })
}