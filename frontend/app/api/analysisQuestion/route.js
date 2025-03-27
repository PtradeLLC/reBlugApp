export async function POST() {
    return new Response(JSON.stringify({ message: 'Analysis endpoint' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}