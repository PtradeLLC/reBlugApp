// pages/api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import { NextResponse } from 'next/server';

export async function POST(req) {
    if (req.method === 'POST') {
        const { priceId } = req.body;

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/cancel`,
            });

            return NextResponse.json({ id: session.id }, { status: 200 });
        } catch (err) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    } else {
        return new NextResponse('Method Not Allowed', { status: 405, headers: { 'Allow': 'POST' } });
    }
}
