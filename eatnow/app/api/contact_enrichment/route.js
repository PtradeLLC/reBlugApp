import { NextResponse } from "next/server";
import axios from 'axios'

const APOLLO_API_KEY = process.env.APOLLO_API_KEY
const APOLLO_API_URL = 'https://api.apollo.io/api/v1/people/bulk_match'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const { details } = req.body

        const apolloPayload = {
            api_key: APOLLO_API_KEY,
            reveal_personal_emails: true,
            reveal_phone_number: true,
            details: details
        }

        const response = await axios.post(APOLLO_API_URL, apolloPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Api-Key': APOLLO_API_KEY
            }
        })

        return res.status(200).json(response.data)
    } catch (error) {
        console.error('Apollo API Error:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}