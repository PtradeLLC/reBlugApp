import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import admin, { credential } from "firebase-admin";

let app;

// Initialize Firebase
if (!admin.apps.length) {
    app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
    });
}


const admnDb = initFirestore({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
});

const adminAuth = admin.auth(app);

export { adminAuth, admnDb };