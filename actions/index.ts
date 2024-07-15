"use server"

import { EmailSchema } from "@/schema"
import { Resend } from "resend"
import { z } from "zod"
import { StripeWelcomeEmail } from "@/email/stripe-email"
import React from "react"


const resend = new Resend(process.env.RESEND_API_KEY)


export const SendEmail = async (values: z.infer<typeof EmailSchema>) => {
    try {
        
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: values.email,
            subject: 'Hello world',
            reply_to: 'text@gmail.com',
            react: React.createElement(StripeWelcomeEmail, {
                message: values.message,
                name: values.name
            }),
            // html: `<h1>Hello ${values.name}</h1><p>${values.message}</p>`,
          });
        
          if (error) {
            console.error(error);
            throw new Error('Error sending email')
          }

          return data
    } catch (error) {
        console.log(error)
        throw new Error('Error sending email')
    }
}