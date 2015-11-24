fis.match("public/js/**/*.js", {
	optimizer: fis.plugin("uglify-js")
});
fis.match("public/js/*.js", {
	optimizer: fis.plugin("uglify-js")
});
fis.match("public/css/**/*.css", {
	optimizer: fis.plugin("clean-css")
});
fis.match("public/css/*.css", {
	optimizer: fis.plugin("clean-css")
});
/*暂时不用fis3*/