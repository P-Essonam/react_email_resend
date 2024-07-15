"use client"

import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { EmailSchema } from '@/schema'
import { Textarea } from '@/components/ui/textarea'
import { SendEmail } from '@/actions'



const page = () => {

    const router = useRouter()
    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        mode: "onChange",
        defaultValues: {
          name: "",
          email: "",
          message: "",
        }
    })


    const onSubmit = async (data: z.infer<typeof EmailSchema>) => {
      try {
         await SendEmail(data)

        toast.success('Email envoyé avec succès')
        router.refresh()
      } catch (error) {
        toast.error('Erreur lors de l\'envoi de l\'email')
      }
    }

    return (
      <main className='w-full h-screen flex flex-col p-8'>
          <div className='w-full h-full justify-center items-center'>
              <Card className='w-full max-w-sm'>
                  <Form {...form}>
                      <CardHeader>
                          <CardTitle>Email</CardTitle>
                          <CardDescription>Envoyer un email en un click</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <form
                          className='space-y-6'
                          onSubmit={form.handleSubmit(onSubmit)}
                        >
                          <FormField 
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                          />
                          <FormField 
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                          />
                          <FormField 
                            name='message'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                          />

                          <Button type='submit'>Envoyer</Button>

                        </form>
                      </CardContent>
                  </Form>
              </Card>
          </div>
      </main>
    )
}

export default page