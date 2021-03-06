gulp-jade-jst-concat
====================

Takes client-side generated Jade templates and concatinates them into a common js module that contains javascript template functions.

## install

````bash

$ npm install gulp-jade-jst-concat --save-dev
$ npm install gulp-jade --save-dev
$ npm install jade --save

````

## Usage

in your gulpfile.js

````js

var concatJST = require('gulp-jade-jst-concat');
var jade = require('gulp-jade');

function processDynamicTemplates(){
	var src = [settings.templates + '/dynamic/*.jade', "!" + settings.templates + '/dynamic/_*.jade'];
	var dest = settings.dist;
	gulp.src(src)
		.pipe(jade({
			client: true
		}))
		.pipe(concatJST('templates.js'))
		.pipe(gulp.dest(settings[role].src + "/js"))
}

gulp.task("dynamic-templates", processDynamicTemplates);

````
