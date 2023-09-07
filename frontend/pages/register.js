import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getProviders, signIn, useSession } from "next-auth/react"

export default function Register({ providers }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const router = useRouter();
    const [registerMessage, setRegisterMessage] = useState("");
    const { data: session } = useSession();

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'name':
                setName(value);
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = "./api/email/emailLogic";
        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });
            if (response.status === 400) {
                setErrors("This user already exists, please login to continue.");
                setRegisterMessage(""); // Clear registerMessage when there is an error
            } else if (response.status === 201) {
                setRegisterMessage("Please check your email to proceed.");
                setName("");
                setEmail("");
                setPassword("");
                setErrors(""); // Clear errors when registration is successful
            } else {
                console.log("Please register");
            }
        } catch (error) {
            console.log("Error creating user account:", error);
            setErrors("An error occurred while creating your account.");
            setRegisterMessage(""); // Clear registerMessage on error
        } finally {
            console.log("See you soon");
        }
    };


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up for an account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Registration */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Brand | Agency Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Password input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Sign-in button */}
                        <div className="flex flex-col items-end justify-end">
                            <button className="flex w-full items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-1.5 text-black border shadow-md outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]" type='submit'>
                                <Image src="/images/OtherVar.png" width={30} height={30} alt='Login with ForgedMart' />  Sign Up
                            </button>
                            <span className='text-sm mt-4'><Link href="/login">Got an account? Login here</Link></span>
                        </div>
                        {errors ?
                            (<div className='bg-red-200 rounded text-center m-auto px-2'>
                                <p>{errors}</p>
                            </div>) : registerMessage ? (<div className='bg-green-200 rounded text-center m-auto px-2'>
                                <p>{registerMessage}</p>
                            </div>) : null
                        }

                        {/* Continue with social buttons */}
                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {/* <Image src="/images/twitch.png" width={28} height={28} alt='Login with Twitch' /> */}
                                {/* <Image src="/images/icons8-linkedin-logo-48.png" width={28} height={28} alt='Login with LinkedIn' /> */}
                                {/* <Image src="/images/icons8-facebook-48.png" width={28} height={28} alt='Login with Facebook' /> */}
                                {/* <Image src="/images/icons8-google-48.png" width={28} height={28} alt='Login with Google' /> */}
                                {Object.values(providers).map((provider) => (
                                    <div key={provider.name} className={`flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a] ${provider.name === 'Facebook' ? 'bg-blue-500' : provider.name === 'Google' ? 'bg-red-500' : provider.name === 'Salesforce' ? 'bg-blue-900' : provider.name === 'Email' ? 'bg-blue-700' : provider.name === 'HubSpot' ? 'bg-blue-200' : provider.name === 'Twitch' ? 'bg-blue-500' : ""}`}>
                                        <button onClick={() => signIn(provider.id, { callbackUrl: `http://localhost:3000/dashboard || https://forgedmart.com/dashboard` })}>
                                            {provider.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    // If the user is already logged in, redirect.
    // Note: Do not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return { redirect: { destination: "/dashboard" } };
    }
    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    }
}