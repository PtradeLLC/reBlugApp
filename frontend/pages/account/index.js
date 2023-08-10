import React from 'react'
import { signOut, getSession } from "next-auth/react"

const Account = ({ session }) => {
    // TBD
    if (session) {
        return (
            <>
                <div>
                    <img src={session.user.image} alt="profile image" />
                    <p>Hello {session.user.name},</p>
                </div>
            </>
        )
    } else {
        <div><button onClick={() => signOut()}>Sign out</button></div>

    }
}

export default Account;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: "/login"
    //         }
    //     }
    // }

    return {
        props: {
            session
        }
    }

}