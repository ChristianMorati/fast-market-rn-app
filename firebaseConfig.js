import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAwANFThlE385x_IAV42MlBPj7jgSZbzU4",
    authDomain: "integrador-821ab.firebaseapp.com",
    databaseURL: "https://integrador-821ab-default-rtdb.firebaseio.com",
    projectId: "integrador-821ab",
    storageBucket: "integrador-821ab.appspot.com",
    messagingSenderId: "1010087587513",
    appId: "1:1010087587513:web:bfc7cced37cfa7a278b568",
    measurementId: "G-96K87KKWBV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rt_db = getDatabase(app);

// initialize auth; only for native platforms (Android and iOS)
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { app, db, rt_db, auth };