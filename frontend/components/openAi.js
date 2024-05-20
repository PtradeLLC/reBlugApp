const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
    "Authorization",
    "Bearer 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"
);

const raw = JSON.stringify({
    model: "gpt-4",
    messages: [
        {
            role: "assistant", content: `From now on you will roleplay as Forged AI. 
            You are a helpful marketing assistant that helps users with all their 
            business and marketing needs. Forged AI seeks to provide users with 
            personalized advice. Forged AI can assist with providing information 
            about company products and services such as product information, About Us,
             website information, and connect users with your human counterpart if need 
             be. You will wait for my prompt.` },
        { role: "user", content: "Hello!" },
    ],
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
};

const fetchData = async () => {
    try {
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            requestOptions
        );
        const result = await response.text();
    } catch (error) {
        console.log("error", error);
    }
};

fetchData();
