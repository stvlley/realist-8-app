"use client";

import Layout from '@/app/layout/page';

import { SignUp } from '@clerk/nextjs'


export default function Page() {




  return (
    <Layout>

        <SignUp />
    </Layout>
  );
}