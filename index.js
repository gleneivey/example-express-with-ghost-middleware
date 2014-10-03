if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

var express = require('express'),
    ghost = require('ghost/core/server/middleware'),
    path = require('path');

var ghostConfig = {
  database: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '/content/ghost/data/ghost-dev.db')
    },
    debug: false
  },
  generate404s: true,
  generate500s: true,
  paths: {
    contentPath: path.join(__dirname, '/content/ghost/')
  }
};

function serveHomePage(req, res){
  res.send(
      '<h1>Index Page</h1><p>Example web app home page served by top-level Express server instance.</p><ul>' +
      '<li><a href="/blog">Go to encapsulated Ghost blog\'s home page</a></li>' +
      '<li><a href="/blog/ghost">Go to encapsulated Ghost blog\'s Admin page</a></li>' +
      '<li><a href="/not-a-page">See a 404 page from the parent web app</a></li>' +
      '<li><a href="/blog/not-a-blog-post">See Ghost handle a 404</a>' +
      '<p style="margin-top: 0; padding-left: 8px; font-size: 80%">' +
      '(Whether Ghost serves its 404 or lets it fall through to the parent is determined ' +
      'by the "generate404s" entry in its configuration file, <code>config_ghost.js</code> ' +
      'in this example application.)</p>' +
      '</li>' +
      '</ul>'
  );
}

var app = express();
app.get('/', serveHomePage);
app.use('/blog', ghost(ghostConfig));
app.use(function(req, res){
  res.status(404).send("Sorry, can't find that.");
});

var portNumber = 2360;
app.listen(portNumber);
console.log('Test application is listening on port ' + portNumber);
console.log('Ctrl+C to shut down');
