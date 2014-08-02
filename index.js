var express = require('express'),
    path = require('path'),
    when = require('when');

var ghost_promise = require('ghost')({
  config: path.join(__dirname, 'config_ghost.js')
});
var app = express();


ghost_promise
    .then(function(ghost) {
      // we can have middleware that examines requests before Ghost looks at them
      app.get('/', function(req, res){
        res.send(
            '<h1>Index Page</h1><p>Example web app home page served by top-level Express server instance.</p><ul>' +
                '<li><a href="/blog">Go to encapsulated Ghost blog\'s home page</a></li>' +
                '<li><a href="/blog/ghost">Go to encapsulated Ghost blog\'s Admin page</a></li>' +
                '<li><a href="/not-a-page">See a 404 page</a></li>' +
                '</ul>'
        );
      });

      // then add Ghost in as a middleware component
      app.use(ghost);

      // we could have more middleware after Ghost as long as Ghost is configured not to generate 404s

      // serve a 404 if neither Ghost nor the other middleware handled the request
      // we won't get here unless there's "generate404s: false" in Ghost's config file
      app.use(function(req, res, next){
        res.send(404, 'Sorry cant find that!');
      });

      // and now actually start the server
      app.listen(2360);
    })
    .catch(function(failureMessage) {
      console.log(failureMessage);
      process.exit(1);
    });
