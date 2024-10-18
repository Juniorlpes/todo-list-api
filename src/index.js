const express = require('express');
require('./database');
require('dotenv/config');

const cors = require('cors');
const appRoutes = require('./routes');
const corsOptions = require('./cors-options');

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(appRoutes);

app.listen(process.env.PORT, () => console.log("No ar"));
