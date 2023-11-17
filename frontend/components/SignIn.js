//SignIn
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from './Loading';
import PasswordReset from './PassReset';
import { signIn } from 'next-auth/react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const baseUrl = "/api/email/emailLogic";

            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data from the server");
            }

            const data = await response.json();

            if (data.user) {
                console.log(data.user);
                // User exists or has been created
                router.push("/dashboard"); // Redirect to the dashboard
            } else if (data.message === "User already exists, please login.") {
                // User already exists, display a meaningful message to the user
                setErrors("User already exists. Please login.");
            } else {
                // Handle other scenarios as needed
                console.error("Authentication failed:", data.message);
                setErrors(`Authentication failed: ${data.message}`);
            }

        } catch (error) {
            console.error('Authentication error:', error.message);
            setErrors(`Authentication error: ${error.message}`);
        }
    };

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();
    //     let provider = 'credentials';

    //     try {
    //         if (provider) {
    //             const baseUrl = "/api/email/emailLogic";

    //             const response = await fetch(baseUrl, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ email, password }),
    //             });

    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch data from the server");
    //             }

    //             const data = await response.json();

    //             if (data.user) {
    //                 router.push("/dashboard"); // Redirect to the dashboard
    //             } else if (data.message === "User already exists, please login.") {
    //                 setErrors("User already exists. Please login."); // Display a meaningful message to the user
    //             } else {
    //                 console.error("Authentication failed:", data.message);
    //                 setErrors(`Authentication failed: ${data.message}`);
    //             }



    //             // Assuming the authentication was successful and you have a user object in data
    //             if (data.user) {
    //                 router.push("/dashboard"); // Redirect to the dashboard
    //             } else {
    //                 // Handle other scenarios as needed
    //                 console.error("Authentication failed:", data.message);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Authentication error:', error.message);
    //         setErrors(`Authentication error: ${error.message}`);
    //     }
    // };


    const setErrors = (error) => {
        return error.message
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


                        {/* {isError ? <p className="bg-red-200 rounded text-center m-auto px-2">{error?.message}</p> : null} */}
                    </form>
                    <div className='mt-2 text-right'>
                        <button type='button' onClick={openModal} >Reset password</button>
                    </div>
                </>
                {/* {needsEmailVerification ? (
                    <p className="bg-green-200 rounded text-center m-auto px-2">
                        Please check your mailbox and follow the verification link to verify your email.
                    </p>
                ) : (
                    
                )} */}
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
