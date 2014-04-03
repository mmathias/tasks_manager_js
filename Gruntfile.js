var config = require("grunt-settings");

module.exports = function(grunt) {
  // Initialize the configuration block.
  config.init(grunt);

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

  // Compress JavaScript
  config.set("uglify.dist", {
      options: {
          sourceMap: true
        , sourceMapIncludeSources: true
      }
    , src: ["assets/javascripts/**/*.js"]
    , dest: "public/javascripts/todo.js"
  });

  // Watch for updates.
  config.set("watch.js", {
      files: ["assets/javascripts/**/*.js", "assets/components/**/*"]
    , tasks: ["uglify"]
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

  // Register the default task.
  config.registerTask("default", ["cssmin", "imagemin", "uglify"]);
};
