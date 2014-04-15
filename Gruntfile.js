var config = require("grunt-settings");

module.exports = function(grunt) {
  // Initialize the configuration block.
  config.init(grunt);

  // Configure the Handlebars.
  config.set("handlebars.dist",{
      options:{
          namespace: "Todo.templates"
        , processName: function(path){
            return path.replace(/^.*?\/([^\/]+).hbs$/, "$1");
          }
      }
    , src: "assets/handlebars/**/*.hbs"
    , dest: "assets/javascripts/todo/templates.js"
  });

  // Configure JSHint.
  config.set("jshint.dist", {
      options: {
          jshintrc: true
        , ignores: "assets/javascripts/todo/templates.js"
      }
    , src: [
          "Gruntfile.js"
        , "assets/javascripts/todo/**/*.js"
        , "spec/**/*.js"
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
    , "assets/components/handlebars/handlebars.runtime.js"
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
          report: "gzip"
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
      files: ["Gruntfile.js", "assets/handlebars/**/*.hbs","spec/todo/**/*.js","assets/javascripts/**/*.js", "assets/components/**/*", "spec/**/*.js"]
    , tasks: ["jshint", "handlebars", "jasmine", "uglify:dev"]
  });

  config.set("watch.css", {
      files: ["assets/stylesheets/**/*.css", "assets/components/**/*"]
    , tasks: ["cssmin"]
  });

  config.set("watch.images", {
      files: ["assets/images/**/*"]
    , tasks: ["imagemin"]
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
            , "assets/components/handlebars/handlebars.runtime.js"
          ]
      }
  });

  // Register the dev task, which skips minification.
  config.registerTask("dev", ["jshint", "cssmin", "imagemin", "handlebars", "uglify:dev"]);
  // Register the default task.
  config.registerTask("default", ["jshint", "cssmin", "imagemin", "handlebars", "uglify:dist"]);
};
