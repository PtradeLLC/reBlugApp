//SignIn
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSignInEmailPassword } from '@nhost/nextjs';
import Link from 'next/link';
import Loading from './Loading';
import PasswordReset from './PassReset';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const { signInEmailPassword, isSuccess, isLoading, needsEmailVerification, isError, error } = useSignInEmailPassword();


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signInEmailPassword(email, password);

            if (isSuccess) {
                router.push('/dashboard');
                console.log("yay!");
                return null

                // const baseUrl = `/api/userLogin`;
                // const response = await fetch(baseUrl, {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify(data)
                // });

            } else {
                // console.error(`Error: ${response.statusText}`);
                // setErrors(`Error: ${response.statusText}`);
                console.log("There is an error", error);
            }
        } catch (error) {
            console.error(error.message);
            setErrors(error.message);
        }
    };

    const setErrors = (error) => {
        return error.message
    };

    const disableForm = isLoading || needsEmailVerification;

    const openModal = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    return (
        <div className="">
            <div className="">
                {needsEmailVerification ? (
                    <p className="bg-green-200 rounded text-center m-auto px-2">
                        Please check your mailbox and follow the verification link to verify your email.
                    </p>
                ) : (
                    <>
                        <form onSubmit={handleOnSubmit} className="">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={disableForm}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <label htmlFor="password" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={disableForm}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            <button type="submit" disabled={disableForm} className="flex w-full mt-3 items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-1.5 text-black border shadow-md outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]">
                                {isLoading ? <Loading size="sm" /> : 'Sign in'}
                            </button>

                            {isError ? <p className="bg-red-200 rounded text-center m-auto px-2">{error?.message}</p> : null}
                        </form>
                        <div className='mt-2 text-right'>
                            <button type='button' onClick={openModal} >Reset password</button>
                        </div>
                    </>
                )}
            </div>
            <div>
                <p className="text-right mt-3">
                    <Link href="/register">
                        No account yet?{' '}
                        Sign up
                    </Link>
                </p>
            </div>
            <div>
                <PasswordReset open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default SignIn;
