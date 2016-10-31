module.exports = function(grunt) {
  var baseRoot = "../../../../";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // COPY ASSETS TO THE webapp FOLDER
    copy: {
      assets: {
        files: [
            {expand: true, src: ['assets/**'], dest: '../webapp'}
        ]
      },
      be: {
        files: [
            {expand: true, src: ['reports.html'], dest: '../webapp'}
        ]
      } 
    },

    // ADD VERSION TO THE PACKAGE
    version: {
      major: {
            options: {
                release: 'major'
            },
            src: ['package.json']
      },
      minor: {
          options: {
              release: 'minor'
          },
          src: ['package.json']
      },
      patch: {
          options: {
              release: 'patch'
          },
          src: ['package.json']
      }
    },

    // VAMOS A CONCATENAR LOS FILES PARA SU USO
    concat: {
      js: {
        src:  ['assets/libraries/jquery/jquery-3.1.1.min.js','assets/libraries/jquery/jquery-ui.min.js','assets/libraries/Autolinker.min.js','assets/libraries/timepicker/moment-with-locales.js','assets/libraries/timepicker/bootstrap-datetimepicker.min.js','assets/libraries/addresspicker/jquery.ui.addresspicker.js','assets/libraries/lightSlider/js/lightslider.min.js','js/lang.js','js/init.js','js/common.js','js/dataCheckConversion.js','js/markerclusterer.js','js/map.js','js/form.js','js/imageUpload.js'],
        dest: '.tempjs/js.js',
      },
      style: {
        src:  ['assets/libraries/jquery/jquery-ui.min.css','css/bootstrap.min.css','assets/libraries/timepicker/bootstrap-datetimepicker.min.css','css/style.css','assets/libraries/lightSlider/css/lightslider.css','assets/libraries/lightGallery/css/lightGallery.css','assets/libraries/pickadate/themes/default.css'],
        dest: '.tempcss/style.css',
      }
    },

    // UTILIZAMOS UGLIFY PARA MINIMIZAR LOS FILES JS
    uglify: {
      combined: {
        files: [
          {
            expand: true,     
            cwd: '.tempjs/',
            src: ['*.js'],
            dest: '../webapp/js/',  
            ext: '.min.js'
          }]
      },
    },
    // UTILIZAMOS CSSMIN PARA MINIMIZAR TODOS LOS CSS

    cssmin: {
      style: {
        files: [{
          src: ['.tempcss/style.css'],
          dest: '../webapp/css/style.min.css'
        }]
      }
    },

    // EDITAMOS EL HTML PARA QUE MUESTRE LOS NUEVOS LINKS
    processhtml: {
      deploy:{
        options: {
          process: true,
        },
        files: [
          {
            expand: true,     
            cwd: '.',
            src: ['*.html'],
            dest: '../webapp',  
            ext: '.html'
          },
        ],
      }
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      images: {
        src: 'img/**/*.{jpg,jpeg,gif,png,webp}'
      }
    },
    'string-replace': {
        webapp: {
          files: [{
            expand: true,
            cwd: '../webapp/',
            src: ['*.html'],
            dest: '../webapp/',  
            ext: '.html'
          }],
          options: {
            replacements: [{
              pattern: '-versioname-',
              replacement: '?<%= pkg.version %>'
            }]
          }
        }
      }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-version');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-string-replace');


  // Default task(s).
  grunt.registerTask('default', ['version:patch','concat','uglify','cssmin','processhtml','string-replace']);
  grunt.registerTask('string', ['string-replace']);

  grunt.registerTask('css', ['concat','cssmin','processhtml']);
  grunt.registerTask('bump_version_minor', ['version:minor']);
  grunt.registerTask('bump_version_major', ['version:major']);
  grunt.registerTask('imagemin', ['newer:imagemin']);
  grunt.registerTask('files', ['newer:copy']); 
};
