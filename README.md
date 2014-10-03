example-express-with-ghost-middleware
=====================================

Minimal Express server, intended solely as an example of using Ghost as a middleware component in a larger web app.

To use:

 * Have `node`, `npm`, and `grunt` installed
 * Clone this repo onto your local system
 * In repo, `npm install` to load dependencies
 * Do some manual setup of Ghost.  (Only necessary because we're temporarily installing from a git URL and not a package.)
    * `cd node_modules/ghost`
    * `npm install`
    * `grunt init`
    * `cd ../..`
 * `node index.js` to start the example server locally
 * navigate a browser to `http://localhost:2360/` and see a page served by the example Express app
 * navigate to `http://localhost:2360/blog` and see the embedded Ghost's home page

The configuration for whether Ghost serves 404 pages for bad URLs under `/blog` can be changed using the
`generate404s:` key in Ghost's configuration file.  In this example app, that's `config_ghost.js`.  The
default if the key is not included in Ghost's configuration is for Ghost to serve 404s, same as `generate404s`
equal to `true`.

As this app is "just an example," the scheme, host, and port at which the server runs are hard-coded.
If you wish to change them, you'll need to edit `index.js`.
