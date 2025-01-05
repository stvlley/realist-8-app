
"use client";

import * as z from 'zod';
import React, { useState } from 'react';
import { useTransition } from 'react';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/../schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
}
  from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { register } from '../../../actions/register';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { signIn } from '@/../auth';
import { DEFAULT_LOGIN_REDIRECT } from '../../../routes';



const RegisterForm = () => {

  const roles = [
    {
      value: 'agent',
      label: 'Agent'
    },
    {
      value: 'contractor',
      label: 'Contractor'
    },
    {
      value: 'inspector',
      label: 'Inspector'
    },
    {
      value: 'systems',
      label: 'Systems'
    }
  ];

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {

    console.log("hello from client", values);

    setError('');
    setSuccess('');

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.message);
        })
        
    });
  }

  return (
    <CardWrapper
      headerLabel='Register now to get started!'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account?'
      // showSocial
      register
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 '>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='John Doe'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={isPending}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='******'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type='submit'
            className='w-full'
            disabled={isPending}
          >
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm