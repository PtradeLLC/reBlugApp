import Portkey from 'portkey-ai'

const portkey = new Portkey({
    apiKey: `${process.env.PORTKEY_API_KEY}`, // defaults to process.env["PORTKEY_API_KEY"]
    virtualKey: `${process.env.PORTKEY_GOOGLE_VIRTUAL_KEY}` // Your Google Virtual Key
})

async function main() {
    const chatCompletion = await portkey.chat.completions.create({
        messages: [{ role: 'user', content: 'Who are you?' }],
        model: 'gemini-1.5-pro',
        config: 'cf-***'
    });
}

main()