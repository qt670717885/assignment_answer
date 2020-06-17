const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass
      },
      main: {
        files: {
          'dist/assets/styles/_icons.css': 'src/assets/styles/_icons.scss',
          'dist/assets/styles/_variables.css': 'src/assets/styles/_variables.scss',
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss',
        }
      }
    },
    babel: {
      main: {
        options: {
          sourceMap: true,
          presets: ['@babel/preset-env'] //转换最新特性
        },
        files: {
          'dist/assets/scripts/main.js': 'src/assets/scripts/main.js',
        }
      }
    },
    watch: {
      js: {
        files: ["src/assets/scripts/*.js"],
        tasks: ['babel']
      },
      css: {
        files: ["src/assets/styles/*.scss"],
        tasks: ['babel']
      }
    },


  })
  loadGruntTasks(grunt) //会自动加载所有的grunt插件中的任务
  grunt.registerTask('default', ['sass', 'babel','watch'])
}
