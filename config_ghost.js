var path = require('path'),
    config;

config = {
  development: {
            // scheme and server should match configuration of parent Express app
            // path portion should match base path in use() call for Ghost instance
    url: 'http://localhost:2360/blog/',  // matching values are hard-coded in index.js for this example

    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/ghost/data/ghost-dev.db')
      },
      debug: false
    },
    middleware: true,
    generate404s: true,
    paths: {
      contentPath: path.join(__dirname, '/content/ghost/')
    }
  }
};

// Export config
module.exports = config;
