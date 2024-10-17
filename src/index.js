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

//TODO:
//1 - cadastro de usuário, Login, refresh token, authmiddleware
//2 - CRUD de TODO
//
//Extra pós entrega: (?) [Extra]
//  - Fazer o mesmo usando Supabase?
//  - Versão do app com Flutter Flow
//  - Fazer um endpoint de envio de arquivo p/ bucket
//  - Pensar se faz algo usando socket