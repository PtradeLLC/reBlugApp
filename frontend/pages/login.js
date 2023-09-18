import React, { useState } from 'react';
import Image from 'next/image';
import SignIn from '../components/SignIn';
import { NhostClient } from '@nhost/nhost-js';
import Loading from '../components/Loading';
import { useSignInEmailPassword } from '@nhost/nextjs';

export default function Login() {
    const [errors, setErrors] = useState('');
    const [email, setEmail] = useState('');
    const [providerId, setProviderId] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const providers = ['Facebook', 'Twitch', 'Google', 'LinkedIn'];
    const { isLoading, isSuccess, isError, error } = useSignInEmailPassword();
    const [Loading, setLoading] = useState(false);

    const nhost = new NhostClient({
        subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
        region: process.env.NEXT_PUBLIC_NHOST_REGION
    });

    const handleClick = async (e, provider) => {
        e.preventDefault();
        try {
            const baseUrl = `/api/userLogin`;
            if (provider) {
                nhost.auth.signIn({
                    provider: provider
                });
            }
        } catch (error) {
            console.error(error.message);
            setErrors(error.message);
        }
    };

    if (isLoading) {
        setLoading(true)
    };

    if (isSuccess) {
        router.push('/dashboard')
        return null
    }

    if (isError) console.log("ERR from LogIn", error);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className='flex justify-center items-center'>
                {isLoading ? <span className="bg-green-200 rounded text-center m-auto px-2"><Loading size="lg" />Loading...</span> : null}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <SignIn />
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
                            {providers.map((provider) => (
                                <div
                                    key={provider}
                                    className={`flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a] ${provider === 'Facebook'
                                        ? 'bg-[#4267B2]'
                                        : provider === 'Twitch'
                                            ? 'bg-[#9146FF]'
                                            : provider === 'Google'
                                                ? 'bg-[#DB4437]'
                                                : provider === 'LinkedIn'
                                                    ? 'bg-[#0A66C2]'
                                                    : ''
                                        }`}
                                >
                                    <button
                                        name={provider}
                                        className='flex px-4 justify-center items-center'
                                        onClick={(e) => { handleClick(e, provider) }}
                                    >
                                        <Image src={`/images/${provider.toLowerCase()}.png`} width={28} height={28} alt={`Login with ${provider}`} />
                                        {provider}
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