import Layout from '@/app/layout/page'
import { SignIn } from '@clerk/nextjs'


export default function Page() {
  return (
    <Layout>
      <SignIn />
    </Layout>
  )
}