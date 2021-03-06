module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		novaConfig: grunt.file.readJSON('nova.config.json'),

		jekyll: {                             // Task
			options: {                          // Universal options
				bundleExec: false,
				src : '<%= app %>'
			},
			dist: {                             // Target
				options: {                        // Target options
					dest: '<%= dist %>',
					config: '_config.yml'
				}
			}
		},

		// bower: {
		// 	install: {
		// 		options: {
		// 			targetDir: './site',
		// 			layout: function(type, component, source) { return source; }, 
		// 			install: true,
		// 			verbose: false,
		// 			cleanTargetDir: false,
		// 			cleanBowerDir: true,
		// 			bowerOptions: {}
		// 		}
		// 	}
		// },


		jshint: {
			files: ['Gruntfile.js', 
				// 'site/assets/js/src/*.js'
			],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		},

		shell: {
			novaInit: {
				command: function() {
					var api = 'https://api.paas.uninett.no';
					grunt.log.writeln('Setting cf API to ' + api);
					return 'cf api <%= novaConfig.api %>';
				}
			},
			novaPush: {
				command: function() {
					grunt.log.writeln('Pushing to Nova PaaS');
					return 'cd dist; cf push <%= novaConfig.name %> -b https://github.com/cloudfoundry-community/nginx-buildpack.git';
				}
			}
		}



	});


	grunt.loadNpmTasks('grunt-contrib-jshint');	
	// grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-jekyll');

	// grunt.registerTask('test', ['jshint', 'qunit']);

	
	grunt.registerTask('default', ['jshint', 'jekyll']);
	grunt.registerTask('travis', ['jshint', 'jekyll']);
	grunt.registerTask('publish', ['jshint', 'jekyll', 'shell:novaPush']);

};