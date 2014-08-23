module.exports = function(grunt) {
	
	grunt.initConfig({
		clean: {
			compile: ['build/script/test.js', 'build/style/style.css']
		},
		less: {
			compile: {
				files: {
					'build/style/style.css': 'test/test2/_style.less'
				}
			}
		},
		typescript: {
			compile: {
				files: {
					'build/script/test.js': 'test/test2/Main.ts'
				}
			}
		},
		sas: {
			update: {}
		},
		shell: {
			update: {
				command: [
					'bower prune',
					'bower install',
					'bower update'
				].join('&&')
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-sas');

	grunt.registerTask('update', ['shell:update','sas:update']);
	grunt.registerTask('compile', ['clean:compile','typescript:compile','less:compile']);
	grunt.registerTask('default', ['compile']);
};