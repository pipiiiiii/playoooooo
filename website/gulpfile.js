var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var watchPath = require('gulp-watch-path');
//css,js 压缩
var uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css');
//异常处理
var notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

gulp.task('default', function() {
	return
});

gulp.task('vue', function(){

	gulp.watch('src/component/**/*.js', function (event){
		var path = watchPath(event, 'src/component', 'src/packs');

		gulp.src(path.srcPath)
			.pipe(named())
			.pipe(webpack({
				module: {
					loaders: [
				      { test: /\.vue$/, loader: 'vue'},
				      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
				    ]
				},
			    plugins: [
					new ExtractTextPlugin(path.distFilename.split('.')[0] + '.css')
					// new webpack.optimize.UglifyJsPlugin()
				],
				devtool: 'source-map',
				babel: {
				    presets: ['es2015'],
				    plugins: ['transform-runtime']
				}
			}))
			.pipe(gulp.dest(path.distDir));
	})
	
	gulp.watch(['src/packs/**/*.js','src/packs/**/*.css'], function (event){
		var arr = event.path.split('/');

        arr.some(function(value,index){
            if (/.css$/.test(value)){
                var cssPath = watchPath(event,'src/packs','dist/packs');
                gulp.src(cssPath.srcPath)
                    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
                    .pipe(minifycss())
                    .pipe(gulp.dest(cssPath.distDir))

                console.log( '\033[33m' + cssPath.srcPath + '/\033[39m'+ '文件已经压缩')
                return true
            }
            if (/.js$/.test(value)){
                var path = watchPath(event, 'src/packs', 'dist/packs');
                gulp.src(path.srcPath)
                    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
                    .pipe(uglify())
                    .pipe(gulp.dest(path.distDir))
                console.log( '\033[33m' + path.srcPath + '/\033[39m'+ '文件已经压缩')
                return true
            }
        })
	})
})

gulp.task('minis', function (){
	gulp.watch(['src/css/**/*.css','src/js/**/*.js'], function (event){
        var arr = event.path.split('/');

        arr.some(function(value,index){
            if (/.css$/.test(value)){
                var cssPath = watchPath(event,'src/css','dist/css');
                gulp.src(cssPath.srcPath)
                    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
                    .pipe(minifycss())
                    .pipe(gulp.dest(cssPath.distDir))

                console.log( '\033[33m' + cssPath.srcPath + '/\033[39m'+ '文件已经压缩')
                return true
            }
            if (/.js$/.test(value)){
                var path = watchPath(event, 'src/js', 'dist/js');
                gulp.src(path.srcPath)
                    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
                    .pipe(uglify())
                    .pipe(gulp.dest(path.distDir))
                console.log( '\033[33m' + path.srcPath + '/\033[39m'+ '文件已经压缩')
                return true
            }
        })
        
    })
})