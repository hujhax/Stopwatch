module.exports = (grunt) ->
    grunt.initConfig
        jshint:
            all: []
        uglify:
            options:
                mangle: true #shorten variable names
                compressed: true #remove whitespace
                sourcemap: "minified/application.map" # add a sourcemap
                banner: "/* Stopwatch 2014/*\n" # add a message at the top of file
            someTarget:
                # this is an example of a single target task, ie targets 1 file
                src: "concated/application.js" # the file that concat takes
                dest: "minified/application.min.js"
        concat:
            options:
                separator: ";"
            concatTarget: 
                src: ["src/application.js", "src/util.js"] # takes these two files and concats them into 1 file. places this file in dest
                dest: "concated/application.js"
        watch:
            options:
                livereload: true
            scripts:
                files: ["js/*.js"]
                tasks: ["concat"]
            css:
                files: ["scss/*.scss"] # watched files
                tasks: ["compass"] # task to run on them
            haml:
                files: ["./*.haml"] # watched files
                tasks: ["haml"] # task to run on them
        haml:
            dist:
                files:
                    'index.html': 'index.haml' # 'destination': 'source'
        autoprefixer:
            options:
                browsers: ['last 2 version', 'ie 8', 'ie 9']
        compass:
            dist:
                options:
                    config: 'config.rb'
                    sourcemap: false
                    noLineComments: true
        coffee:
            options:
                bare: false # wrapper function?
                join: false 
                separator: ";"
                sourcemap: false
            coffeeTarget:
                # since we want to compile all files in a directory, we don't know what all thier names are so we won't know what the destination file name will be, so we use this format to dynamically name them
                expand: true #expand the file path
                cwd: 'coffee/' #Current Working Directory(source of files to compile)
                src: '*.coffee' # actual files we are targeting
                dest: "caffinatedjs/" # destination for compiled .js files
                ext: ".js" # the extension to add to every compiled file
        nodeunit: # unit testing, since all it's doing is running our tests, there really aren't any options that need to be passed so we just have the target, but, there's no destination file either so no need to make an object so just set it directly
            nodeunitTarget: 'test/*_test.js' # run on all files with the format name_test.js
        clean:
            cleanTarget: ['minified', 'caffinatedjs'] # these are files that we might want to delete everytime


    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-nodeunit'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-compass'
    grunt.loadNpmTasks 'grunt-contrib-haml'
    grunt.loadNpmTasks 'grunt-autoprefixer'

    # when called "default", will only run "grunt" on the command line. so what we do is chain a bunch of tasks together in an array. If one fails, the process stops
    grunt.registerTask "default", ['concat', 'uglify', 'compass', 'autoprefixer', 'haml', 'jshint']
    # "reboot" is arbitrary name, we run clean first, then run default (above).
    grunt.registerTask "reboot", ['clean', 'default']