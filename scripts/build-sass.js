/**
 * Created by jean.h.ma on 12/5/16.
 */
var watch = require("node-watch");
var path = require("path");
var sass = require("node-sass");
var fs = require("fs");
var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');

watchFolder = path.normalize(path.join(__dirname, '../styles/'));

buildDir = path.normalize(path.join(__dirname, '../build/'));

var filter = function (pattern, fn) {
	return function (filename) {
		if (pattern.test(filename)) {
			fn(filename);
		}
	}
}

console.log('watching ' + watchFolder);
watch(watchFolder, filter(/\.sass$/i, function (filename) {

	newFilename = path.join(buildDir, path.basename(filename).replace('sass', 'css'));

	sass.render({
		file: filename,
		outFile: newFilename
		//,outputStyle: 'compressed'
	}, function (err, result) {
		if (!err) {
			postcss([autoprefixer]).process(result.css).then(function (result2) {
				result2.warnings().forEach(function (warn) {
					console.warn(warn.toString());
				});
				fs.writeFile(newFilename, result2.css, function (err2) {
					if (!err2) {
						console.log(filename + ' is builded');
					}
				});
			})

		}
		else {
			console.error(err);
		}
	});

}));