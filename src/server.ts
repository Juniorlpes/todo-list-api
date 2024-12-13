import app from './app';
import admin from "firebase-admin";

import 'dotenv/config'; // ou import dotenv from 'dotenv'; e dotenv.config();
import serviceAccount from "../secretKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

app.listen(process.env.PORT, () => console.log("No ar"));
