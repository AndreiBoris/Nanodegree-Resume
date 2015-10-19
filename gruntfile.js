module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	       cssmin: {
	          options: {
	             shorthandCompacting: false,
	              roundingPrecision: -1
	          },
	          target: {
	             files: {
                 'css/build/style.min.css': ['css/stylesheets/screen.css'],
	              },
	          },
	      },
	      concat:{
	         dist: {
	            src: [
	               'js/jQuery.js', 'js/helper.js'
	            ],
	            dest: 'js/jQueryAndHelper.js',
	         },
	      },
	      uglify: {
          my_target: {
            files: {
              'js/build/resumeBuilder.min.js': ['js/resumeBuilder.js'],
              'js/build/jQueryAndHelper.min.js': ['js/jQueryAndHelper.js']
            }
          }
	       },
         jshint: {
           all: ['gruntfile.js', 'js/helper.js', 'js/resumeBuilder.js'],
         },
         compass: {
           dist: {
             options: {
               sassDir: 'css/sass',
               cssDir: 'css/stylesheets',
               environment: 'development'
             }
           }
         },
	        watch: {
            css: {
              files: ['css/sass/*.scss'],
  	          tasks: ['compass', 'cssmin']
            },
            scripts: {
              files: ['js/*.js', 'gruntfile.js'],
              tasks: ['jshint', 'concat', 'uglify']
            }
          }

});

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['jshint', 'compass', 'cssmin', 'concat', 'uglify']);
};
