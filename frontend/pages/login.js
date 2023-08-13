import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Client, Account } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const { logIn } = useAuth();
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

        const promise = account.createEmailSession(email, password);
        promise.then(function (response) {
            if (response.userId) {
                const userId = `${response.userId}`
                logIn();
                router.push(`/dashboard/${userId}`)
            }
        }, function (error) {
            console.log(error.message);
            setErrors(error.message)
        });

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
                                Log In
                            </button>
                            <span className='text-sm mt-4'><Link href="/register">No account? Register here</Link></span>
                        </div>
                        {errors &&
                            <div className='bg-red-200'>
                                <p>{errors}</p>
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
                            <button onClick={handleOAuth} className="flex w-full items-center justify-center gap-3 rounded-md bg-red-600 px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]">Sign in with Google</button>
                            <button onClick={handleOAuth} className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]" >Sign in with Facebook</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}