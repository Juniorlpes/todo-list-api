const express = require('express');

const todoRoutes = express.Router();

todoRoutes.post('/', (req, res) => { });
todoRoutes.get('/', (req, res) => { });

module.exports = todoRoutes;