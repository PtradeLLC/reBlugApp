import React, { useState, useEffect } from 'react';
import WelcomeModal from '../../components/verfication-mod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const NewUser = () => {
    const [openModal, setOpenModal] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();

    const isUserVerified = session?.user?.isVerified;

    // If the user is verified, redirect to the dashboard
    useEffect(() => {
        if (isUserVerified) {
            router.push('/dashboard');
        }
    }, [isUserVerified]);

    return (
        <div>
            <WelcomeModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}

export default NewUser;
