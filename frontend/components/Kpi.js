import React from 'react'

const Kpi = ({ title }) => {
    console.log("KPIII", title);
    const kpi = (title) => {
        if (title === "Email Conversational") {
            console.log("EC", title);
            console.log("SEC", selectedKpi);
            emailAction.map((action, actionIdx) => (
                <div
                    key={action.id}
                    className={classNames(
                        actionIdx === 0
                            ? "rounded-tl-lg col-span-2 rounded-tr-lg sm:rounded-tr-none"
                            : "",
                        actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                        actionIdx === emailAction.length - 2
                            ? "sm:rounded-bl-lg"
                            : "",
                        actionIdx === emailAction.length - 1
                            ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                            : "",
                        "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500"
                    )}
                >
                    <div className="mt-8 gap-4">
                        <h3 className="text-lg font-medium">
                            <a
                                href={action.href}
                                className="focus:outline-none"
                            >

                                <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                />
                                {action.name}
                            </a>
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Doloribus dolores nostrum quia qui natus officia
                            quod et dolorem. Sit repellendus qui ut at
                            blanditiis et quo et molestiae.
                        </p>
                    </div>
                    <span
                        className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                    </span>
                </div>
            ))
        } else if (title === "Campaign Automation") {
            console.log("CA", title);
            console.log("SCA", selectedKpi);
            automationAction.map((action, actionIdx) => (
                <div
                    key={action.id}
                    className={classNames(
                        actionIdx === 0
                            ? "rounded-tl-lg col-span-2 rounded-tr-lg sm:rounded-tr-none"
                            : "",
                        actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                        actionIdx === automationAction.length - 2
                            ? "sm:rounded-bl-lg"
                            : "",
                        actionIdx === automationAction.length - 1
                            ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                            : "",
                        "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500"
                    )}
                >
                    <div className="mt-8 gap-4">
                        <h3 className="text-lg font-medium">
                            <a
                                href={action.href}
                                className="focus:outline-none"
                            >

                                <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                />
                                {action.name}
                            </a>
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Doloribus dolores nostrum quia qui natus officia
                            quod et dolorem. Sit repellendus qui ut at
                            blanditiis et quo et molestiae.
                        </p>
                    </div>
                    <span
                        className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                    </span>
                </div>
            ))
        } else if (title === "Messaging Platform") {
            console.log("MP", title);
            console.log("SMP", selectedKpi);
            marketingAction.map((action, actionIdx) => (
                <div
                    key={action.id}
                    className={classNames(
                        actionIdx === 0
                            ? "rounded-tl-lg col-span-2 rounded-tr-lg sm:rounded-tr-none"
                            : "",
                        actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                        actionIdx === marketingAction.length - 2
                            ? "sm:rounded-bl-lg"
                            : "",
                        actionIdx === marketingAction.length - 1
                            ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                            : "",
                        "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500"
                    )}
                >
                    <div className="mt-8 gap-4">
                        <h3 className="text-lg font-medium">
                            <a
                                href={action.href}
                                className="focus:outline-none"
                            >

                                <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                />
                                {action.name}
                            </a>
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Doloribus dolores nostrum quia qui natus officia
                            quod et dolorem. Sit repellendus qui ut at
                            blanditiis et quo et molestiae.
                        </p>
                    </div>
                    <span
                        className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                    </span>
                </div>
            ))

        } else {
            return null;
        }
    };
    return (
        <>{kpi}</>
    )
}

export default Kpi