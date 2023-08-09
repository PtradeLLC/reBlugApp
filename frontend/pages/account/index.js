import React from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

const Account = ({ session }) => {
    const { data: session, status } = useSession({ required: true })
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
    if (!session) {
        return {
            redirect: {
                destination: "/sign-in"
            }
        }
    }

    return {
        props: {
            session
        }
    }

}