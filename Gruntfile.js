var config = require("grunt-settings");

module.exports = function(grunt) {
  // Initialize the configuration block.
  config.init(grunt);

  // Configure JSHint.
  config.set("jshint.dist", {
      options: {
        jshintrc: true
      }
    , src: [
        "Gruntfile.js", "assets/javascripts/todo/**/*.js", "spec/**/*.js"
      ]
  });

  // Compress the CSS.
  config.set("cssmin.dist", {
      src: "assets/stylesheets/todo.css"
    , dest: "public/stylesheets/todo.css"
  });

  // Compress images.
  config.set("imagemin.dist", {
    files: [{
        expand: true
      , cwd: "assets/images/"
      , src: ["**/*.{png,jpg,gif}"]
      , dest: "public/images/"
    }]
  });

  var jsFiles = [
      "assets/components/jquery/dist/jquery.js"
    , "assets/javascripts/boot.js"
    , "assets/javascripts/todo/**/*.js"
  ];

  //Concatenate JavaScript files
  config.set("concat.dist", {
      src: jsFiles
    , dest: "public/javascripts/todo.js"
  });

  // Compress JavaScript
  config.set("uglify.dist", {
      options: {
          sourceMap: true
        , sourceMapIncludeSources: true
      }
    , src: jsFiles
    , dest: "public/javascripts/todo.js"
  });

  // Compress JavaScript
  config.set("uglify.dev", {
      options: {
          sourceMap: true
        , sourceMapIncludeSources: true
        , beautify: true
        , mangle: false
      }
    , src: jsFiles
    , dest: "public/javascripts/todo.js"
  });

  // Watch for updates.
  config.set("watch.js", {
      files: ["assets/javascripts/**/*.js", "assets/components/**/*"]
    , tasks: ["jshint", "uglify:dev"]
  });

  config.set("watch.css", {
      files: ["assets/stylesheets/**/*.css", "assets/components/**/*"]
    , tasks: ["cssmin"]
  });

  config.set("watch.images", {
      files: ["assets/images/**/*"]
    , tasks: ["imagemin"]
  });

  config.set("watch.jasmine", {
      files: ["assets/javascripts/todo/**/*.js", "spec/**/*.js"]
    , tasks: ["jasmine"]
  });

  // Jasmine specs.
  config.set("jasmine.specs", {
      src: "assets/javascripts/todo/**/*.js"
    , options: {
          keepRunner: true
        , specs: "spec/todo/**/*.js"
        , helpers: "spec/spec_helper.js"
        , outfile: "spec/spec_runner.html"
        , version: "2.0.0"
        , vendor: [
            "assets/components/jquery/dist/jquery.js"
          ]
      }
  });

  // Register the dev task, which skips minification.
  config.registerTask("dev", ["jshint", "cssmin", "imagemin", "uglify:dev"]);
  // Register the default task.
  config.registerTask("default", ["jshint", "cssmin", "imagemin", "uglify:dist"]);
};
