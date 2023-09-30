export default function PassReset() {
    return (
        <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-red-600">
            <label htmlFor="email" className="block text-xs font-medium text-gray-900">
                Enter your email
            </label>
            <input
                type="text"
                name="email"
                id="email"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="me@myemail.com"
            />
        </div>
    )
}
