import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

// const account = new Account(client);

// const result = await account.createVerification(
//     'https://example.com'
// );

export async function POST() {
    console.log("Hello from Post route");
    // const res = await fetch('https://appwrite.io/v1/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'API-Key': process.env.DATA_API_KEY,
    //     },
    //     body: JSON.stringify({ time: new Date().toISOString() }),
    // })

    // const data = await res.json()

    // return Response.json(data)
}




