var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

gulp.task('default', function() {
  return 
});

gulp.task('vue', function(){
	gulp.src(['src/js/interface.js'])
				.pipe(named())
				.pipe(webpack({
					module: {
						loaders: [
					      { test: /\.vue$/, loader: 'vue'},
					      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
					    ],
					    plugins: [
								    new ExtractTextPlugin("[name].css")
								    // new webpack.optimize.UglifyJsPlugin()
								  ]
					}
				}))
				.pipe(gulp.dest('dist/'));

				console.log(test)

})