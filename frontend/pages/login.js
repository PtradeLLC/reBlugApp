import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Client, Account } from 'appwrite';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import Image from 'next/image';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const { logIn } = useAuth();
    const [emailVerification, setEmailVerification] = useState(false)
    const router = useRouter();

    const client = new Client();
    const account = new Account(client);

    client
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const baseUrl = `/api/userVerification`;
            const response = await account.createEmailSession(email, password);
            const appWrite_Key = process.env.NEXT_PUBLIC_CLIENT_APPWRITE_API_KEY;

            if (response.userId) {
                const userId = response.userId;
                //Create emailVerification
                if (!emailVerification) {
                    const res = await fetch(baseUrl, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${appWrite_Key}`
                        },
                        body: JSON.stringify({ emailVerification: true, userId: userId })
                    });
                    const data = await res.json();
                }

                logIn();
                router.push(`/dashboard/${userId}`);
            }
        } catch (error) {
            console.error(error.message);
            setErrors(error.message);
        }
    };

    const handleOAuth = async (e) => {
        e.preventDefault();
        try {
            if ("google") {
                account.createOAuth2Session('google');
                logIn();
            } else if ("facebook") {
                account.createOAuth2Session('facebook');
                logIn();
            } else if ("facebook") {
                account.createOAuth2Session('linkedin');
                logIn();
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email input */}
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
                                    // required
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
                                    // required
                                    value={password}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Remember me and Forgot password */}
                        <div className="flex items-center justify-end">
                            {/* Implement SSO here */}
                            {/* ... (remember me checkbox) */}
                            {/* ... (forgot password link) */}
                        </div>

                        {/* Sign-in button */}
                        <div className="flex flex-col items-end justify-end">
                            <button className="flex w-full items-center justify-center gap-3 rounded-md bg-red-600 px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]" type='submit'>
                                <Image src="/images/OtherVar.png" width={30} height={30} alt='Login with ForgedMart' />  Log In
                            </button>
                            <span className='text-sm mt-4'><Link href="/register">No account? Register here</Link></span>
                        </div>
                        {errors &&
                            <div className='bg-red-200 text-center'>
                                <p className='p-'>{errors}</p>
                            </div>
                        }
                    </form>

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
                            <button onClick={handleOAuth} className="flex w-full items-center justify-center gap-3 rounded-md bg-[#bdbdbd] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]">
                                <Image src="/images/icons8-google-48.png" width={28} height={28} alt='Login with Google' />Google
                            </button>
                            <button onClick={handleOAuth} className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]" >
                                <Image src="/images/icons8-facebook-48.png" width={28} height={28} alt='Login with Facebook' /> Facebook
                            </button>
                            <button onClick={handleOAuth} className="flex w-full items-center justify-center gap-3 rounded-md bg-[#7cc4fa] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]" >
                                <Image src="/images/icons8-linkedin-logo-48.png" width={28} height={28} alt='Login with LinkedIn' />LinkedIn
                            </button>
                            <button onClick={handleOAuth} className="flex w-full items-center justify-center gap-3 rounded-md bg-[#ffeade] px-3 py-1.5 text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#585858]" >
                                <Image src="/images/hubspot.png" width={28} height={28} alt='Login with HubSpot' /> HubSpot
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}