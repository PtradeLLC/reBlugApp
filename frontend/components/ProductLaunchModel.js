import axios from 'axios';

export default function ProductLaunchModel() {
    const postData = {
        "model": "togethercomputer/llama-2-70b-chat",
        "max_tokens": 2480,
        "prompt": `You are a seasoned marketing strategist for a business-to-business software company. 
            Your objectives are to:
            1. Analyze the ${productInfo}:           
            2. Task: Based on the information ${productInfo}, Create a detailed profile of the 
            25 "ideal customers" based on market research, customer personas, and past customer data. 
            Identify key characteristics, define pain points, and needs that the product addresses.    
            3. Task: Refine the above 'Ideal customer' list to include only ones that are likely to 
            purchase the product based on the above ${productFeatures}.
            4. Task: Refine the above list of 'Ideal customer' to include ONLY ones that are likely 
            to purchase the product based on ${productpainPoint} and the ${productclientType}.
            Task: Refine the above list of 'Ideal customer' to include ONLY ones that are likely to 
            purchase the product based on its ${productUnique}.
            5. * Based on 'REFINED LIST',  Write a code to generate email list of qualified contacts for the 
            product - for leads using Apollo API by following these tasks:
            1. Identify the job titles, industries, and locations of your ideal customers based on the refined list above.
            2. Use Apollo.io's search filters to look for contacts that match your ideal customer profile. Filter by job title, company, location, industry, and other relevant criteria.
            3. Export the contact information of the qualified leads into a spreadsheet, and save it to a variable with the name 'productLaunchEmailList'.
            `,
        "request_type": "language-model-inference",
        "temperature": 0.7,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "stream_tokens": true,
        "stop": [
            "[/INST]",
            "</s>"
        ],
        "repetitive_penalty": 1,
        "update_at": "2024-01-28T09:53:54.133Z",
        "promptObj": {
            "prompt": "“You are a seasoned marketing strategist for a business-to-business software company. Your objectives are to:* Analyzes the provided product information below.About the productThe product is 'A platform for brands, bloggers, and marketers to connect in a unified ecosystem. ForgedMart offers AI-powered tools and agency-level solutions tailored for brands and marketers    \"ForgedMart's flagship solutions include:    '1. **Email Marketing Tool:**  This unique AI-powered tool enables brands to send both transactional and marketing emails, and recipients to engage in inquiries about the email content, brand products, or services by interacting with an AI-powered Email ChatBot embedded within the email body.    \"2. **Article Assistant:** Also powered by AI, this tool allows bloggers to integrate a conversational Email ChatBot into every published article. It provides readers with a trusted companion to interact with, whether it's for fact-checking or inquiring about specific details while digesting the article content.\",Task: Based on the information about the product, Create a detailed profile of the 25 ideal customers based on market research, customer personas, and past customer data. Identify key characteristics, pain points, and needs that the product addresses.The product has the following  features:\u2028 feature01: 'Email Marketing tool',  feature02: 'Bloggers Article Helper',  feature03: 'Marketing automation',Task: Refine the above `Ideal customer` list to include only ones that are likely to purchase the product based on the above features.The product solves the following problems for 'B2B`(clientType): pain_point01: 'It improves open and click rates in email marketing', pain_point02: 'AI Powered marketing tool generates qualified email contact for brands and marketers', pain_point03: 'Provide a platform for marketing', pain_point04: 'Help brands and marketers launch successful email campaign, marketing campaign.', Task: Refine the above list of `Ideal customer` to include ONLY ones that are likely to purchase the product based on the problems it solves.The product is different from any other product in the market with these unique  features: unique01: 'The first of its kind to launch AI in the email body', unique02: 'It injects AI conversational Email ChatBot in the email'Task: Refine the above list of `Ideal customer` to include ONLY ones that are likely to purchase the product based on its unique application.* Based on REFINED LIST, Generate an email list of qualified contacts for the product - leads using`Apollo.io` API.* Divide the email list into segments based on various criteria such as demographics, purchase history, engagement level, or preferences. * Create a detailed profile of the ideal customer based on market research, customer personas, and past customer data. Identify key characteristics, pain points, and needs that the product addresses.\" "
        }
    };

    const headers = {
        Authorization: 'Bearer 208747a05763f1f4750eef08e65f1beac5dbad8e434629e3d7bf4858beb07184'
    };

    const handleResponse = (response) => {
        console.log(response);
    };

    const handleError = (error) => {
        console.log(error);
    };

    axios.post('https://api.together.xyz/v1/chat/completions', postData, { headers })
        .then(handleResponse)
        .catch(handleError);

    return <div>Check console for response</div>;
}
