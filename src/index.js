const express = require('express');
require('./database');

const app = express();
app.use(express.json());

app.listen(3333);