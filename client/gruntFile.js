module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean','html2js','concat','recess:build','copy:assets']);


    grunt.initConfig({
        distdir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        banner:
            '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        src: {
            js: ['src/**/*.js', '<%= distdir %>/templates/**/*.js'],
            tpl: {
                app: ['src/app/**/*.tpl.html'],
                common: ['src/common/**/*.tpl.html']
            }
        },
        clean: ['<%= distdir %>/*'],
        copy: {
            assets: {
                files: [{ dest: '<%= distdir %>/assets', src : '**', expand: true, cwd: 'src/assets/' },
                {expand: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: '<%= distdir %>/fonts/',
                        flatten: true}],
            }
        },
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= distdir %>/templates/app.js',
                module: 'templates.app'
            },
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= src.tpl.common %>'],
                dest: '<%= distdir %>/templates/common.js',
                module: 'templates.common'
            }
        },
        concat:{
            dist:{
                options: {
                    banner: "<%= banner %>"
                },
                src:['<%= src.js %>'],
                dest:'<%= distdir %>/<%= pkg.name %>.js'
            },
            angular: {
                src:['bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js'],
                dest: '<%= distdir %>/angular.js'
            },
            angularUi: {
                src:['bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angular-bootstrap/ui-bootstrap.js',
                    'bower_components/angular-wizard/dist/angular-wizard.js'],
                dest: '<%= distdir %>/angular-ui.js'
            },
            jquery: {
                src:['bower_components/jquery/dist/jquery.js'],
                dest: '<%= distdir %>/jquery.js'
            },
            ngTable: {
                src:['bower_components/ng-table/ng-table.js'],
                dest: '<%= distdir %>/ng-table.js'
            },
            utils : {
                src:['bower_components/lodash/dist/lodash.js',
                    'bower_components/add-to-homescreen/src/addtohomescreen.min.js'],
                dest: '<%= distdir %>/utils.js'
            }
        },
        recess: {
            build: {
                files: {
                    '<%= distdir %>/<%= pkg.name %>.css':
                        ['bower_components/bootswatch/cosmo/bootstrap.css', 
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css', 
                        'bower_components/ng-table/ng-table.css',
                        'bower_components/add-to-homescreen/style/addtohomescreen.css',
                        'src/css/app.css'] },
                        options: {
                            compile: true
                        }                
            }
        }
    });

};
