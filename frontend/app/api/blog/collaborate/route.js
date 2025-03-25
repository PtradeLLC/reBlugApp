
export async function POST(req) {
    try {
        const body = await req.json();

        const { firstName, lastName, email, product, reason, prodDesc, brandName, website, message } = body;

        try {
            // To do
            //1. Save data to database.
            console.log(firstName, lastName, email, product, reason, prodDesc, brandName, website, message);


            //2. Send email to blogger.
            return new Response(JSON.stringify({ message: "hello" }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error with GROQ API:', error);
            return new Response(JSON.stringify({ error: 'Error processing request with GROQ API' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error parsing request:', error);
        return new Response(JSON.stringify({ error: 'Error parsing request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
