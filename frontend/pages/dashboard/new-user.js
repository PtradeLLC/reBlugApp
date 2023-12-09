import React, { useState, useEffect } from 'react';
import WelcomeModal from '../../components/verfication-mod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const NewUser = () => {
    const [openModal, setOpenModal] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();

    console.log("Session from NU");

    // const isUserVerified = session?.user?.isVerified;
    // DELETE FILE IF NOT NEEDED...If the user is verified, redirect to the dashboard
    // useEffect(() => {
    //     if (isUserVerified) {
    //         router.push('/dashboard');
    //     }
    // }, [isUserVerified]);

    return (
        <div>
            {/* <WelcomeModal openModal={openModal} setOpenModal={setOpenModal} /> */}
        </div>
    );
}

export default NewUser;
