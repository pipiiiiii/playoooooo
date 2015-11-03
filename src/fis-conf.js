fis.match("public/js/*.js", {
	optimizer: fis.plugin("uglify-js")
});
fis.match("public/css/*.css", {
	optimizer: fis.plugin("clean-css")
});
