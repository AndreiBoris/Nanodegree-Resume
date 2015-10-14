module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	// This takes the .css file from the css directory and minifies it
	cssmin: {
	  options: {
	    shorthandCompacting: false,
	    roundingPrecision: -1
	  },
	  target: {
	    files: {
        'css/build/style.min.css': ['css/style.css'],
	    },
	  },
	},
	concat:{
	  dist: {
	    src: [
	      'js/jQuery.js', 'js/helper.js'
	       // has to take these in this order otherwise it won't work properly
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
	// Works as long as you are running 'grunt my-watch' in the directory
	watch: {
    css: {
      files: ['css/style.css'],
  	  tasks: ['cssmin']
    },
    scripts: {
      files: ['js/*.js', 'gruntfile.js'],
      tasks: ['jshint', 'concat', 'uglify']
      }
    }

});

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['jshint', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('my-jshint', ['jshint']);
    grunt.registerTask('my-watch', ['watch']);


};
