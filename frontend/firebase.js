import { getApp, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = getApp().length ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

// Create a child reference for profile storage
const profilesRef = ref(storage, 'profile');

// Create a child reference for images storage
const imagesRef = ref(storage, 'images/brand');

// Create file metadata including the content type
const metadata = {
    contentType: 'image/jpeg',
};

// Sample usage of uploadBytes
const file = new Blob(['Hello, world!'], { type: 'text/plain' });

// Update storage reference based on the type of image being uploaded
let storageRef;

if (fileToUpdate === 'profileImage') {
    storageRef = ref(profilesRef);
} else if (fileToUpdate === 'brandLogo') {
    storageRef = ref(imagesRef, 'brand');
}

const uploadTask = uploadBytes(storageRef, file, metadata);

export { storage, profilesRef, imagesRef, uploadTask };
