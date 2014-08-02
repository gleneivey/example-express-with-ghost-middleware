var path = require('path'),
    config;

config = {
    development: {
        url: 'http://localhost/blog',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/ghost/data/ghost-dev.db')
            },
            debug: false
        },
        middleware: true,
        generate404s: false,
        paths: {
            contentPath: path.join(__dirname, '/content/ghost/')
        }
    }
};

// Export config
module.exports = config;
