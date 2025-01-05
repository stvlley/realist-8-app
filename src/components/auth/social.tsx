// components/auth/social.tsx

"use client";
import { signIn } from "next-auth/react"// Correct import
import React from 'react'
import { Button } from '../ui/button';
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

type Props = {}

const Social = (props: Props) => {

    const handleOnClick = async (provider: string) => {

        await signIn(provider)
    }

    return (
        <div className='flex items-center gap-4 my-6 justify-between w-full'>
            <Button
                size="lg"
                className='w-full'
                variant="outline"
                onClick={() => handleOnClick('google')}>
                <FaGoogle className='w-6 h-6' />
            </Button>
            <Button
                size="lg"
                className='w-full'
                variant="outline"
                onClick={() => handleOnClick('linkedin')}>
                <FaLinkedin className='w-6 h-6' />
            </Button>
            <Button
                size="lg"
                className='w-full'
                variant="outline"
                onClick={() => handleOnClick('github')}>
                <FaGithub className='w-6 h-6' />
            </Button>
        </div>
    )
}

export default Social