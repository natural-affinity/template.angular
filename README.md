template.angular
=================

Template to bootstrap the angular.js application development process.

Prerequisites
-------------
* Node.js (v5.5.x)
* Livereload (Browser Plugin)

Defaults
--------
* Build: Gulp
* Icons: Font-Awesome
* Styles: Bootstrap, Sass
* Framework: Angular (1.x)
* Templates: Jade

Features
--------
* Application Setup Scripts
* Suggested Directory Layout
* Sample View Namespaced-Mixins

* Quick Watch-Livereload Refactor Cycle

Usage and Documentation
-----------------------
Please ensure all dependencies have been installed prior to usage.

### Setup

Switch to the project root directory and run the `setup.sh` script (`setup.bat` for Windows):
```bash
$ cd application.name
$ ./bin/setup.sh
```

### Workflow
The `grunt serve` (watch, livereload) loop is designed to accelerate development workflow:
```bash
$ grunt serve:dev
```

Alternatively, to simply run the application in standalone-mode, invoke:
```bash
$ grunt serve
```

Environment-based parameters are stored in `conf`, to switch between them invoke:
```bash
$ grunt --env=conf\dev.json serve
```

Directory Structure
-------------------
<pre>
/
|-- bower.json: runtime dependencies (angular, bootstrap)
|-- package.json: development dependencies (gulp plugins)
|-- Gulpfile.js: all gulp build, deploy, compile, serve tasks
|-- dist: deployment-ready application assets
|-- test: test-ready assets
|-- src: application source code
    |-- index.jade
    |-- app.js (application setup)
    |-- images (image assets)
    |-- components (javascript assets)
        |-- [component name]
            |-- [component template].html
            |-- [component logic].js

</pre>

Future Considerations
---------------------
* [ ] Gulp Tasks Separated into folders
* [ ] Environment-based JSON Configurations
* [ ] Testing Frameworks

License
-------
Released under the MIT License.  See the LICENSE file for further details.
