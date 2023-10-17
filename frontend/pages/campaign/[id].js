// import { Client, Databases } from 'appwrite';
import Head from 'next/head';

const Campaign = ({ campaign }) => {
    return (
        <>
            <Head>
                <title>{campaign.title}</title>
                <link rel="icon" href='/images/favicon.ico' />
            </Head>
            <div>
                <p>{campaign.title}</p>
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
        const campaign = await databases.getDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_COLLECTION_ID,
            id
        );

        return {
            props: {
                campaign,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true, // Or any other error handling
        };
    }
}

export default Campaign;
