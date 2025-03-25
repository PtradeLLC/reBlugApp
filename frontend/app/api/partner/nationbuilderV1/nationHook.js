// In nationHook.js
import { useState } from 'react';

export function useNationBuild() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    const makeRequest = async (payload) => {
        setIsLoading(true);
        try {

            const response = await fetch("/api/partner/nationbuilderV1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            setApiResponse(data);

            return data;
        } catch (error) {
            console.error("Error in makeRequest:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { makeRequest, isLoading, apiResponse };
}


