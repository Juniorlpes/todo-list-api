/*
This archive is just to test
*/
const express = require('express');
require('dotenv/config');
const uploadFileRoutes = express.Router();

const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');

const multerConfig = { storage: multer.memoryStorage() };
// Configurações do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

uploadFileRoutes.post('/upload', multer(multerConfig).single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo foi enviado.');
        }

        const { originalname, buffer } = req.file;
        const path = `images/${Date.now()}-${originalname}`;

        // Faz upload do arquivo no Supabase Storage
        const { data, error } = await supabase.storage
            .from('images')
            .upload(path, buffer, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        // Recupera a URL pública do arquivo
        const { publicURL } = supabase.storage
            .from('images')
            .getPublicUrl(path);

        console.log(publicURL);

        res.status(200).json({
            message: 'Arquivo enviado com sucesso!',
            url: publicURL,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar o arquivo.');
    }
});

module.exports = uploadFileRoutes;