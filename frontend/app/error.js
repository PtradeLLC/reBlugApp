'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                    Sorry, an unexpected error has occurred.
                </p>
                <button
                    onClick={reset}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}