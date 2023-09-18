
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSignUpEmailPassword } from '@nhost/nextjs';
import Link from 'next/link';
import Loading from './Loading';

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const { signUpEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
        useSignUpEmailPassword()

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        await signUpEmailPassword(email, password, {
            displayName: `${firstName} ${lastName}`.trim(),
            metadata: {
                firstName,
                lastName
            }
        })
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
                    <p className='bg-green-200 rounded text-center m-auto px-2'>
                        Please check your mailbox and follow the verification link to verify your email.
                    </p>
                ) : (
                    <form onSubmit={handleOnSubmit} className="">
                        <div className="">
                            <label htmlFor="firstName" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <input
                                label="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={disableForm}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <label htmlFor="lastName" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                            <input
                                label="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={disableForm}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <label htmlFor="email" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                            Email
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
                            label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={disableForm}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                        <button type="submit" disabled={disableForm} className="flex w-full mt-3 items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-1.5 text-black border shadow-md outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]">
                            {isLoading ? <Loading size="sm" /> : 'Create account'}
                        </button>

                        {isError ? <p className="bg-red-200 rounded text-center m-auto px-2">{error?.message}</p> : null}
                    </form>
                )}
            </div>

            <p className="text-right mt-3">
                Already have an account?{' '}
                <Link href="/login">
                    Sign in
                </Link>
            </p>
        </div>
    )
}

export default SignUp