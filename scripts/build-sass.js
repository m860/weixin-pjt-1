/**
 * Created by jean.h.ma on 12/5/16.
 */
var watch = require("node-watch");
var path = require("path");
var sass = require("node-sass");
var fs=require("fs");

watchFolder = path.normalize(path.join(__dirname, '../styles/'));

buildDir = path.normalize(path.join(__dirname, '../build/'));

var filter = function (pattern, fn) {
	return function (filename) {
		if (pattern.test(filename)) {
			fn(filename);
		}
	}
}

watch(watchFolder, filter(/\.sass$/i, function (filename) {

	newFilename = path.join(buildDir, path.basename(filename).replace('sass', 'css'));

	sass.render({
		file: filename,
		outFile: newFilename,
		outputStyle: 'compressed'
	},function(err,result){
		if(!err){
			fs.writeFile(newFilename,result.css,function(err2){
				if(!err2){
					console.log(filename + 'is builded');
				}
			});
		}
	});

}));