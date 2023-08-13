import { Client, Databases } from 'appwrite';
import Head from 'next/head';

const User = ({ User }) => {
    return (
        <>
            <Head>
                <title>{User.title}</title>
                <link rel="icon" href='/images/favicon.ico' />
            </Head>
            <div>
                <p>{User.title}</p>
                {/* other information */}
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query; // Destructure directly

    const client = new Client();
    const databases = new Databases(client);

    client
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    try {
        const User = await databases.getDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_COLLECTION_ID,
            id
        );

        return {
            props: {
                User,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true, // Or any other error handling
        };
    }
}

export default User;
