// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { browser } from '$app/environment';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDjQs85_4unkYFRZuZKg8nNb-0lQ-noBew',
	authDomain: 'bankd-and-budgetd.firebaseapp.com',
	projectId: 'bankd-and-budgetd',
	storageBucket: 'bankd-and-budgetd.firebasestorage.app',
	messagingSenderId: '1046678297149',
	appId: '1:1046678297149:web:2caa14f2b03ed27de7a854',
	measurementId: 'G-GG2YMGDQNY'
};

// Initialize Firebase
const app = browser ? initializeApp(firebaseConfig) : initializeApp(firebaseConfig);
const analytics = browser ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
