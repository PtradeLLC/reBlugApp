import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from './Loading';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [provider, setProvider] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState('');
    const [redirect, setRedirect] = useState('');

    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                if (provider !== '') {
                    const baseUrl = "/api/email/emailLogic";

                    const response = await fetch(baseUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ brandName, firstName, lastName, email, password, provider })
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch data from the server");
                    }

                    const data = await response.json();
                    if (isMounted && data) {
                        console.log("There is Data - Data from SignUp", data);
                        setIsSuccess(true);
                        if (data.user) {
                            setRedirect(data.message);
                            setTimeout(() => router.push("/api/auth/signin"), 4000);
                        } else {
                            setRedirect('Account successfully created. Please check your email to verify. Redirecting to login...');
                            setTimeout(() => router.push("/api/auth/signin"), 4000);
                        }
                    }
                }
            } catch (error) {
                if (error instanceof TypeError && error.message === 'Failed to fetch') {
                    setIsError('Network error. Please check your internet connection.');
                } else {
                    setIsError(`An error occurred. Please try again. ${error.message}`);
                }
                setIsError(`An error occurred. Please try again. ${error.message}`);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [provider]);



    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (confirmPassword !== password) {
            setIsError("Password entered doesn't match, please re-enter password");
            return;
        }
        // Set the type before making the API request
        setProvider("Email");

        // The API call is handled in the useEffect
    };

    if (isSuccess) {
        // Render a success message or redirect as needed
        return (
            <div>
                <p>{redirect}</p>
            </div>
        );
    }

    return (
        <div className="">
            <div className="">
                <form onSubmit={handleOnSubmit} method='post' className="">
                    <div className="">
                        <label htmlFor="brandName" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                            Brand Name <span className=' text-xs'>(Optional)</span>
                        </label>
                        <input
                            label="Brand Name"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <label htmlFor="firstName" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <input
                            label="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
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
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <label htmlFor="confirmPassword" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                        Re-Enter your Password
                    </label>
                    <input
                        type="password"
                        label="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                            Create account
                        </button>
                    )}


                    {isError ? <p className="bg-red-200 rounded text-center m-auto px-2">{isError}</p> : null}
                </form>
            </div>

            <p className="text-right mt-3">
                <Link href="/login">
                    Already have an account?{' '}
                    Sign in
                </Link>
            </p>
        </div>
    )
}

export default SignUp;