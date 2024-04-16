// SignIn.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loading from './Loading';
import PasswordReset from './PassReset';
import { useSession, signIn } from 'next-auth/react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const { user } = session || {};
    const [error, setError] = useState(null);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const baseUrl = "/api/userSignin";

            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            setLoading(false);

            if (!response.ok) {
                console.log(response.error);
                const data = await response.json();

                if (response.status === 401 && data.message === "Hm, something went wrong") {
                    setError("Please review your login credentials or reset your password");
                } else {
                    console.log(data.message);
                    setError(`Authentication failed: ${data.message}`);
                }

                return;
            }

            const data = await response.json();

            if (data.user) {
                console.log("Data User", data.user);

                await signIn('credentials', {
                    email: data.user.email,
                    password: data.user.password,
                    redirect: false,
                });

                router.push(data.redirect);
            } else if (data.message === "Hm, something went wrong") {
                setErrors("User already exists. Please login.");
            } else {
                setErrors(`Authentication failed: ${data.message}`);
            }
        } catch (error) {
            setLoading(false);
            setErrors(`Authentication error: ${error}`);
        }
    };

    const setErrors = (error) => {
        if (error.includes("401 Unauthorized")) {
            setError("Please try again.");
        } else {
            setError(error);
        }
    };

    const openModal = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    return (
        <div className="">
            <div className="">
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
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                        {loading && (
                            <button type="submit" className="flex w-full mt-3 items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-1.5 text-black border shadow-md outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]">
                                <Loading size="sm" />
                            </button>
                        )}
                        {!loading && (
                            <button type="submit" className="flex w-full mt-3 items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-1.5 text-black border shadow-md outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]">
                                Sign In
                            </button>
                        )}

                        {error && <p className="bg-red-200 rounded text-center m-auto px-2">{error}</p>}
                    </form>
                    <div className='mt-2 text-right'>
                        <button type='button' onClick={openModal} >Reset password</button>
                    </div>
                </>
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
