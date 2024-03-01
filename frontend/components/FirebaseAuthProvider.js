import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { signInWithCustomToken } from "firebase/auth";
import { auth } from 'firebase/auth'

async function syncFirebaseAuth(Session) {
    let session = Session
    if (session && session.firebaseToken) {
        try {
            await signInWithCustomToken(auth, session.firebaseToken);

        } catch (error) {
            console.log(error);
        }
    } else { auth.signOut() }
}


function FirebaseAuthProvider({ children }) {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) return;

        syncFirebaseAuth(session)
    }, [session]);
    return (
        <>{children}</>
    )
}

export default FirebaseAuthProvider