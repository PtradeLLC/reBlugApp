import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SignUp from '../components/SignUp';
import Image from 'next/image';
import { NhostClient, } from '@nhost/nhost-js';
import { useProviderLink } from '@nhost/nextjs'

const providers = ['Facebook', 'Twitch', 'Google', 'LinkedIn']

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const router = useRouter();
    const [registerMessage, setRegisterMessage] = useState("");

    const { provider } = useProviderLink();
    const nhost = new NhostClient({
        subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
        region: process.env.NEXT_PUBLIC_NHOST_REGION
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = "./api/email/emailLogic";
        try {
            if (!provider) {
                console.log("No provider");
            } else {
                nhost.auth.signIn({
                    provider: 'google'
                })
            }
        } catch (error) {
            console.log("Error creating user account:", error);
            setErrors("An error occurred while creating your account.");
            setRegisterMessage("");
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
                    <SignUp />
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Continue with social buttons */}
                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex providers-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {providers.map((provider) => (
                                    <div key={provider} className={`flex w-full providers-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a] ${provider === 'Facebook' ? 'bg-[#4267B2]' : provider === 'Google' ? 'bg-[#DB4437]' : provider === 'LinkedIn' ? 'bg-[#0A66C2]' : provider === 'Twitch' ? 'bg-[#9146FF]' : ""}`}>
                                        <button className='flex px-4 justify-center providers-center' onClick={(e) => { handleSubmit(e) }}>
                                            <Image src={`/images/${provider.toLowerCase()}.png`} width={28} height={28} alt={`Login with ${provider}`} />
                                            {provider}
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