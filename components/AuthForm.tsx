"use client"
import React from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"


import {z} from "zod"


import {Button} from "@/components/ui/button"

import Image from "next/image";
import {Form} from "@/components/ui/form";
import Link from "next/link";
import {toast} from "sonner";   
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/client"
import {signUp} from "@/lib/actions/auth.action";

type FormType = "sign-in" | "sign-up";

// const formSchema = z.object({
//     username: z.string().min(2).max(50),
// })



const authFormSchema = (type: FormType) =>{
    return z.object({
        name: type === 'sign-up' ? z.string().min(3): z.string().optional(),
        email: z.string().email(),
        password: z.string().min(5),
    })
}

const AuthForm = ({type}: { type: FormType }) => {
    const formSchema = authFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const router = useRouter()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if(type === 'sign-up'){
                //creating a new user on sign up page

                const {name, email, password} = values;

                const userCredentials = await createUserWithEmailAndPassword(auth,
                    email, password);

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                })

                if(!result?.success){
                    toast.error(result?.message)
                }

                toast.success("Account created successfully, Please SignIn")
                router.push('/sign-in')
            }
            //sign in
            else{
                const {email, password} = values;

                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                const idToken = await userCredential.user.getIdToken();

                if(!idToken){
                    toast.error('Sign in failed')
                    return;
                }

                toast.success('Sign In success')
                router.push('/')
            }
        }
        catch (error){
            console.log(error)
            toast.error(`there was an , ${error}`)
        }
    }


    const isSignIn = type === 'sign-in';

    return (
        <div className="card-border lg:min-w-[556px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src={"/logo.svg"} alt={"logo"} height={32} width={38} />
                    <h2 className="text-primary-100">SpeedPrep</h2>
                </div>


                <h3>Practice job interview with AI</h3>

                <Form  {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">

                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your Email"
                            type="email"
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Your Password"
                            type="password"
                        />

                        <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? 'No Account Yet?' : 'Have an account already?'}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
                        {!isSignIn ? "Sign in" : "Sign up"}
                    </Link>

                </p>
            </div>
        </div>
    )
}
export default AuthForm
