example-express-with-ghost-middleware
=====================================

Minimal Express server, intended solely as an example of using Ghost as a middleware component in a larger web app.

To use:

 * Have `node`, `npm`, and `grunt` installed
 * Clone this repo onto your local system
 * In repo, `npm install` to load dependencies
 * Do some manual setup of Ghost.  Only necessary while we're installing from a git URL and not a package.
    * `cd node_modules/ghost`
    * `npm install`
    * `grunt init`
    * `cd ../..`
 * `node index.js` to start the example server locally
 * navigate a browser to `http://localhost:2360/` and see a page served by the example Express app
 * navigate to `http://localhost:2360/` and see the embedded Ghost's home page
 * navigate to `http://localhost:2360/not-a-page` and see a 404 page served by the example Express app

The configuration can be changed to have Ghost serve the 404 page by changing the value of
`generate404s:` from `false` to `true` in `config_ghost.js`.  The default if the key is not
included in Ghost's configuration is for Ghost to serve 404s.
