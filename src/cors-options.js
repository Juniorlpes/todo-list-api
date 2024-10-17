const allowedOrigins = [
    // 'https://',
];

const corsOptions = {
    origin: function (origin, callback) {
        // Verifica se a origem da requisição está na lista de origens permitidas
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

module.exports = corsOptions;