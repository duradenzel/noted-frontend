"use client"
 
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import pen from '../assets/pen-and-ink.svg'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const formSchema = z.object({
    username: z.string().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
      }),
    
  })

  
const LoginForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username: "",
        password: "",
        },
    })
    async function postLoginData(baseUrl: string, endpoint: string, data: Object){
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {'Accept': 'application/json', 'Content-type': 'application/json'},
        body: JSON.stringify(data)
      });

      return response.json();
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const baseUrl = "http://localhost:5225/auth/";
        postLoginData(baseUrl, "login", values).then(response => console.log(response))
    }

    return (
      <div className='h-screen flex items-center justify-center w-3/5'>
       
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/5 ">
          <div className='flex flex-row justify-items-center'>
            <h1 className='text-5xl'>Noted</h1>
            <img className='h-[36px] w-[36px]' src={pen}></img>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=''>Submit</Button>
        </form>
      </Form>
      </div>
    )
}
  
export default LoginForm