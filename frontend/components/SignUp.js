import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from './Loading';

const SignUp = ({ handleRadioChange }) => {
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
    const [userType, setUserType] = useState('');
    let ref = useRef(null);

    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                if (provider !== '') {
                    const baseUrl = "/api/email/emailLogic";

                    const response = await fetch(baseUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userType, brandName, firstName, lastName, email, password, provider })
                    });
                    setLoading(false);

                    if (!response.ok) {
                        throw new Error("Failed to fetch data from the server");
                    }

                    const data = await response.json();

                    if (isMounted && data) {
                        setIsSuccess(true);
                        if (data.user) {
                            if (isMounted) {
                                setRedirect(data.message);
                                setTimeout(() => {
                                    if (isMounted) {
                                        router.push("/api/auth/signin");
                                    }
                                }, 4000);
                            }
                        } else {
                            if (isMounted) {
                                setRedirect('Account successfully created. Please check your email to verify. Redirecting to login...');
                                setTimeout(() => {
                                    if (isMounted) {
                                        router.push("/api/auth/signin");
                                    }
                                }, 4000);
                            }
                        }
                    }
                }
            } catch (error) {
                if (isMounted) {
                    if (error instanceof TypeError && error.message === 'Failed to fetch') {
                        setIsError('Network error. Please check your internet connection.');
                    } else {
                        setIsError(`An error occurred. Please try again. ${error.message}`);
                    }
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [provider, router]);


    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (confirmPassword !== password) {
            setIsError("Password entered doesn't match, please re-enter password");
            return;
        }
        // Set the type before making the API request
        setProvider("Email");

    };

    if (isSuccess) {
        // Render a success message
        return (
            <div>
                <p>{redirect}</p>
            </div>
        );
    }

    const setRadioCheck = (e, id) => {
        ref.current = e.target;

        const targetRadio = e.target.value;

        if (id === "bordered-radio-1" && targetRadio === 'brand') {
            setUserType(targetRadio);
        } else if (id = "bordered-radio-2" && targetRadio === 'Blogger') {
            setUserType(targetRadio);
        }
    }

    return (
        <div className="">
            <div className="">
                <form onSubmit={handleOnSubmit} className="">
                    <div className="flex items-center ps-4 border border-gray-200 rounded-md dark:border-gray-700">
                        <input onChange={(e) => {
                            handleRadioChange(e);
                            setRadioCheck(e, "bordered-radio-1");
                        }} checked={userType === 'brand'} required id="bordered-radio-1" type="radio" value="brand" name="bordered-radio" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I'm a Brand</label>
                    </div>
                    <div className="flex mt-3 items-center ps-4 border border-gray-200 rounded-md dark:border-gray-700">
                        <input onChange={(e) => {
                            handleRadioChange(e);
                            setRadioCheck(e, "bordered-radio-2");
                        }} checked={userType === 'Blogger'} required id="bordered-radio-2" type="radio" value="Blogger" name="bordered-radio" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I'm a Blogger</label>
                    </div>
                    <span className="form-input2">
                        <div className="">
                            <label htmlFor="brandName" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                Brand Name
                            </label>
                            <input
                                label="Brand Name"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            />
                            <label htmlFor="firstName" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <input
                                label="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            />
                            <label htmlFor="lastName" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                            <input
                                label="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
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
                    </span>
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