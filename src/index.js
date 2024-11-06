const express = require('express');
const morgan = require("morgan");
require('./database');
require('dotenv/config');

const admin = require("firebase-admin");
var serviceAccount = require("../secretKey.json");

const cors = require('cors');
const appRoutes = require('./routes');
const corsOptions = require('./cors-options');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(appRoutes);

app.listen(process.env.PORT, () => console.log("No ar"));

//TODO:
// * Remove deprecated code in UserController