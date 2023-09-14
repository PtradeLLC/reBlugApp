import React, { useState } from 'react';
import { getProviders, signIn } from "next-auth/react";
import Image from 'next/image';

export default function Login({ providers }) {
    const [errors, setErrors] = useState('');
    const [email, setEmail] = useState('');
    const [providerId, setProviderId] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');

    const isProduction = process.env.NODE_ENV === 'production';

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'name':
                setName(value);
                break;
        }
    };

    const callbackUrl = isProduction
        ? "https://forgedmart.com/login?callbackUrl=/dashboard"
        : "http://localhost:3000/login?callbackUrl=/dashboard";

    const handleClick = async (e, provider) => {
        e.preventDefault();
        try {
            const baseUrl = `/api/userLogin`;
            const emailData = JSON.stringify({ email });

            if (!email) {
                setErrors("Please enter email")
            } else if (email) {
                console.log("email is sent");
            } else {
                console.log("There is an issue");
            }

            const requestBody = {
                // providerId: provider.id,
                callbackUrl: callbackUrl,
                email: email,
            };
            const emailRequestBody = {
                callbackUrl: callbackUrl,
                email: email,
            };

            if (provider) {
                await signIn(provider.id, {
                    callbackUrl: callbackUrl,
                });

                setProviderId(provider);

                const response = await fetch(baseUrl, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json",
                    },
                    body: JSON.stringify({ provider }),
                })
                const data = await response.json();
            } else if (email) {
                const res = await fetch(baseUrl, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json",
                    },
                    body: emailData
                })
                const data = await res.json();
                setRegisterMessage("📨 Please check your email to continue.");
                setEmail("");
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
                    <div className="space-y-6">
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
                                    required
                                    value={email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-end">
                            <button onClick={handleClick} className="flex w-full items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-1.5 text-black border shadow-md outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]" type='submit'>
                                <Image src="/images/OtherVar.png" width={30} height={30} alt='Login with ForgedMart' />  Get Access
                            </button>
                        </div>
                        {errors ?
                            (<div className='bg-red-200 rounded text-center m-auto px-2'>
                                <p>{errors}</p>
                            </div>) : registerMessage ? (<div className='bg-green-200 rounded text-center m-auto px-2'>
                                <p>{registerMessage}</p>
                            </div>) : null
                        }
                    </div>

                    {/* Continue with social buttons */}
                    <div>
                        <div className="relative mt-10">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-6 text-gray-900">or continue with these providers</span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {Object.values(providers)
                                .filter((provider) =>
                                    ['Facebook', 'Twitch', 'Google', 'Zoho'].includes(provider.name)
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
                                                        : provider.name === 'Zoho'
                                                            ? 'bg-[#E42527]'
                                                            : !provider.name
                                                                ? null
                                                                : ''
                                            }`}
                                    >
                                        <button
                                            name={providerId}
                                            className='flex px-4 justify-center items-center'
                                            onClick={(e) => { handleClick(e, provider) }}
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
    // const session = await getServerSession(context.req, context.res, authOptions);

    const providers = await getProviders();

    return {
        props: {
            providers: providers ?? []
        },
    }
};