import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSignInEmailPassword } from '@nhost/nextjs';
import Link from 'next/link';
import Loading from './Loading';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const { signInEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
        useSignInEmailPassword()

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await signInEmailPassword(email, password)
    }

    if (isSuccess) {
        router.push('/dashboard')
        return null
    }

    const disableForm = isLoading || needsEmailVerification

    return (
        <div className="">
            <div className="">
                {needsEmailVerification ? (
                    <p className="">
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

                            {isError ? <p className="">{error?.message}</p> : null}
                        </form>
                    </>
                )}
            </div>

            <p className="text-right mt-3">
                No account yet?{' '}
                <Link href="/register">
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default SignIn