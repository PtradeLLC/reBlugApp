import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getProviders, signIn, useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from 'next/image';
import LinkedIn from 'next-auth/providers/linkedin';

export default function Login({ providers }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [emailVerification, setEmailVerification] = useState(false)
    const { data: session } = useSession;
    const router = useRouter();

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
            if (!session) {
                router.push("/login");
            } else {
                console.log("Login code lives here")
            }
        } catch (error) {
            console.error(error.message);
            setErrors(error.message);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up or sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email input */}
                        <div>
                            <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                                Brands & Marketers
                            </label>
                            <p>Access with these CRMs</p>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {Object.values(providers)
                                    .filter((provider) =>
                                        ['Zoho', 'Salesforce', 'HubSpot', "Google"].includes(provider.name)
                                    )
                                    .map((provider) => (
                                        <div
                                            key={provider.name}
                                            className={`flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a] ${provider.name === 'Zoho'
                                                ? 'bg-[#E42527]'
                                                : provider.name === 'Salesforce'
                                                    ? 'bg-[#21A0DF]'
                                                    : provider.name === 'HubSpot'
                                                        ? 'bg-[#fa7820]'
                                                        : provider.name === 'Google'
                                                            ? 'bg-[#DB4437]'
                                                            : !provider.name
                                                                ? null
                                                                : ''
                                                }`}
                                        >
                                            <button
                                                className='flex px-4 justify-center items-center'
                                                onClick={() =>
                                                    signIn(provider.id, {
                                                        callbackUrl: `http://localhost:3000/dashboard || https://forgedmart.com/dashboard`,
                                                    })
                                                }
                                            >
                                                <Image src={`/images/${provider.name.toLowerCase()}.png`} width={28} height={28} alt={`Login with ${provider.name}`} />
                                                {provider.name}
                                            </button>
                                        </div>
                                    ))}
                            </div>
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
                                <span className="bg-white px-6 text-gray-900">or continue as Creator or Influencer</span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {Object.values(providers)
                                .filter((provider) =>
                                    ['Facebook', 'Twitch', 'Google', 'LinkedIn'].includes(provider.name)
                                )
                                .map((provider) => (
                                    <div
                                        key={provider.name}
                                        className={`flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a] ${provider.name === 'Facebook'
                                            ? 'bg-[#4267B2]'
                                            : provider.name === 'Twitch'
                                                ? 'bg-[#9146FF]'
                                                : provider.name === 'Google'
                                                    ? 'bg-[#DB4437]'
                                                    : provider.name === 'LinkedIn'
                                                        ? 'bg-[#0A66C2]'
                                                        : !provider.name
                                                            ? null
                                                            : ''
                                            }`}
                                    >
                                        <button
                                            className='flex px-4 justify-center items-center'
                                            onClick={() =>
                                                signIn(provider.id, {
                                                    callbackUrl: `http://localhost:3000/dashboard || https://forgedmart.com/dashboard`,
                                                })
                                            }
                                        >
                                            <Image src={`/images/${provider.name.toLowerCase()}.png`} width={28} height={28} alt={`Login with ${provider.name}`} />
                                            {provider.name}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
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