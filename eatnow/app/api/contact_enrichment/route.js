import { NextResponse } from "next/server";
import axios from 'axios';

const APOLLO_API_KEY = process.env.APOLLO_API_KEY;
const APOLLO_API_URL = "https://api.apollo.io/v1/people/search";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { details } = req.body;

        const ageRange = {
            "The Silent Generation": "Born 1928–1945",
            "Baby Boom Generation": "Born 1946–1964",
            "Generation X": "Born 1965–1980",
            "Millennial Generation or Generation Y": "Born 1981–1996",
            "Generation Z or iGen": "Born 1997–2010",
        };

        const apolloPayload = {
            api_key: APOLLO_API_KEY,
            person_titles: [],
            person_locations: [],
            contact_email_status: ["verified"],
            reveal_personal_emails: true,
            reveal_phone_number: true
        };

        // Map the details to Apollo API parameters
        if (details.first_name) apolloPayload.first_name = details.first_name;
        if (details.last_name) apolloPayload.last_name = details.last_name;
        if (details.email) apolloPayload.email = details.email;
        if (details.income) apolloPayload.income = details.income;

        // Handle age range based on generation
        if (details.generation) {
            const generationRange = ageRange[details.generation];
            if (generationRange) {
                const [startYear, endYear] = generationRange.match(/\d+/g);
                const currentYear = new Date().getFullYear();
                apolloPayload.person_age_range = [
                    currentYear - parseInt(endYear),
                    currentYear - parseInt(startYear)
                ];
            }
        } else if (details.age) {
            apolloPayload.person_age_range = [details.age, details.age];
        }

        if (details.country || details.state || details.city) {
            apolloPayload.person_locations.push({
                country: details.country,
                state: details.state,
                city: details.city
            });
        }
        if (details.gender) apolloPayload.person_genders = [details.gender];
        if (details.investor) apolloPayload.investor = details.investor;

        const response = await axios.post(APOLLO_API_URL, apolloPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Api-Key': APOLLO_API_KEY
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Apollo API Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}