var express = require('express'),
    path = require('path'),
    when = require('when');

var ghost_promise = require('ghost')({
  config: path.join(__dirname, 'config_ghost.js')
});
var app = express();


ghost_promise
    .then(function(ghost_server) {
      // we can have middleware that examines requests before Ghost looks at them
      app.get('/', function(req, res){
        res.send(
            '<h1>Index Page</h1><p>Example web app home page served by top-level Express server instance.</p><ul>' +
                '<li><a href="/blog/">Go to encapsulated Ghost blog\'s home page</a></li>' +
                '<li><a href="/blog/ghost/">Go to encapsulated Ghost blog\'s Admin page</a></li>' +
                '<li><a href="/not-a-page">See a 404 page from the parent web app</a></li>' +
                '<li><a href="/blog/not-a-blog-post">See Ghost handle a 404</a>' +
                '<p style="margin-top: 0; padding-left: 8px; font-size: 80%">' +
                  '(Whether Ghost serves its 404 or lets it fall through to the parent is determined ' +
                  'by the "generate404s" entry in its configuration file, <code>config_ghost.js</code> ' +
                  'in this example application.)</p>' +
                '</li>' +
                '</ul>'
        );
      });

      // then add Ghost in as a middleware component
      ghost_server.start().then(function(ghost_express){
        // express mountpath should match path portion of Ghost's 'url' configuration
        app.use('/blog', ghost_express);

        // we could have more middleware after Ghost as long as Ghost is configured not to generate 404s

        // serve a 404 if neither Ghost nor the other middleware handled the request
        // we won't get here unless there's "generate404s: false" in Ghost's config file
        app.use(function(req, res, next){
          res.send(404, 'Sorry cant find that!');
        });

        // and now actually start the server
        var portNumber = 2360;
        app.listen(portNumber);
        console.log('Test application is listening on port ' + portNumber);
        console.log('Ctrl+C to shut down');
      });

      // Any middleware here doesn't "execute" in file text order, because it would be loaded into
      // Express before the middleware contained in the body of the deferred, above.
    })
    .catch(function(failureMessage) {
      console.log(failureMessage);
      process.exit(1);
    });
