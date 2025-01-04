"use client";

import React from 'react'
import { Button } from '../ui/button';import { FcGoogle } from 'react-icons/fc';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';

type Props = {}

const Social = (props: Props) => {
    return (
        <div className='flex  items-center gap-4 my-6 justify-between w-full'>
            <Button
            size="lg"
            className='w-full'
            variant="outline"
            onClick={() => {}}>
                <FaGoogle className='w-6 h-6' />
            </Button>
            <Button
            size="lg"
            className='w-full'
            variant="outline"
            onClick={() => {}}>
                <FaFacebook className='w-6 h-6' />
            </Button>
            <Button
            size="lg"
            className='w-full'
            variant="outline"
            onClick={() => {}}>
                <FaLinkedin className='w-6 h-6' />
            </Button>
        </div>
    )
}

export default Social