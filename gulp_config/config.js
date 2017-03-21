"use strict"

var __src = 'src';
var __build = 'build';

module.exports = {
    src: __src, 
    dest: __build, 
    browsersync: {
       
        ui: {
            port: 1985
        }, 
        server: {
            baseDir: [__build], 
            index: 'index.html'
        }, 
        
        /* proxy: "localhost:3000", */
        files: [
            __build +'/css/**/*.css', 
            __build +'/images/**/*', 
            __build +'/js/**/*.js', 
            __build +'/*.html'
        ]
    }, 
    del: {
        src: __build +'/**/*'
    }, 
    styles: {
        src: __src +'/css',
		sass_src:__src +'/sass/**/*.scss',
		index_source:[
			__src +'/sass/index/index.scss'//index scss
		],
		sassoptions:{
			outputStyle:'compressde',
			precision: 8
		},
		index_file:'index.css',
		comn_safe_source:[
			__src +'/sass/safe/g.safe.scss'//安全公共功能scss
		],
		a_safe_source:[
			__src +'/sass/safe/a.safe.scss'//黄人版安全功能scss
		],
		b_safe_source:[
			__src +'/sass/safe/b.safe.scss'//蓝人版安全功能scss
		],
		c_safe_source:[
			__src +'/sass/safe/c.safe.scss'//绿人版安全功能scss
		],
		comn_safe_file:'g.safe.css',
		a_safe_file:'a.safe.css',
		b_safe_file:'b.safe.css',
		c_safe_file:'c.safe.css',
        general_source: [__src +'/sass/global/global.scss' ],
        general_file: 'global.css',  
        subpage_file: 'subpage.css', 
        dest: __build +'/css', 
        cssMinOptions: {
            advanced: false, 
            aggressiveMerging: false, 
            compatibility: 'ie7', 
            keepBreaks: false, 
            keepSpecialComments: '*', 
            mediaMerging: true, 
            processImport: false
        }
    }, 
    images: {
        src:  __src +'/images', 
        dest: __build +'/images'
    }, 
    scripts: {
        src:  __src +'/js', 
        dest: __build +'/js', 
        uglifyOptions: {
            mangle: {
                toplevel: true, 
                except: [
                    'define', 
                    'require', 
                    'exports', 
                    'module', 
                    'moudles', 
                    '$'
                ]
            },  
            compress: {
                sequences: true, 
                properties: false, 
                dead_code: true, 
                drop_debugger: true, 
                unsafe: false, 
                conditionals: true, 
                comparisons: true, 
                evaluate: true, 
                booleans: true, 
                loops: true, 
                unused: true, 
                hoist_funs: true, 
                hoist_vars: true, 
                if_return: true, 
                join_vars: true, 
                cascade: true, 
                side_effects: true, 
                warnings: true, 
                global_defs: {}
            }, 
            preserveComments: 'some'
        }
    }, 
    html: {
        src: __src +'', 
        dest: __build +''
    }, 
    watch: {
        styles: [__src +'/sass/**/*.scss'],
        images: __src +'/images/**/*', 
        scripts: __src +'/js/**/*.js', 
        html: __src +'/*.html',
			
    }
};