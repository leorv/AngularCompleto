const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:8000/',
        secure: false,
        logLevel: 'debug', // info, debug, error, etc...
        pathRewrite: { '^/api': '' } // Para omitir o /api, por vezes trabalhando com sistemas legados.
    }
];

module.exports = PROXY_CONFIG;