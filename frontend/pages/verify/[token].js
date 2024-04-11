import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

export default function Verify({ }) {
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get(`https://www.reblug.com/api/verify/${token}`);
                // Assuming the verification endpoint returns a success message
                if (response.data.message === "Verification successful.") {
                    router.push('/login'); // Redirect to login page
                }
            } catch (error) {
                console.error("Error verifying user:", error);
                // Handle error
            }
        };

        if (token) {
            verifyUser();
        }
    }, [token, router]);

    return <div>Verifying...</div>;
}
