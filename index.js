var gUtil = require('gulp-util');
var PluginError = gUtil.PluginError;
var File = gUtil.File;
var through = require('through');
var printf = require('util').format;
var path = require("path");
var fs = require("fs");
var _ = require("underscore");
var colors = require("colors");


/*
 * Takes the output from gulp-jade and transforms the names of the functions and
 * concatinates json data files and returns a string with all template data
 *
 */


function pluginError (message) {
  return new PluginError('gulp-jade-jst-concat', message);
}


module.exports = function processFiles(fileName, _opts) {
  if (!fileName) throw pluginError('Missing fileName');

  console.log(this);


  var defaults = {
      basepath: path.dirname(fileName)
    },
    opts = _.extend({}, defaults, _opts),
    data = {};

  function write (file) {
    if (file.isNull()) return;
    if (file.isStream()) return this.emit('error', pluginError('Streaming not supported'));
    
      //do stuff


    var basename = path.relative(opts.basepath, file.path).split(".js")[0];
    // Change the function name to the basename for the template
    file.contents = new Buffer(file.contents.toString().replace("function template", "\"" + basename + "\": function"));
    
    data[basename] = file.contents;
  }

  function end () {
    var concatedData = "var jade = require('jade/runtime'); module.exports = {\n";
    var templateList = [];
    _.each(data, function(fn, name){
      concatedData += fn.toString() + ",\n";
    });
    concatedData += "}";


    this.queue(new File({
      path: fileName,
      contents: new Buffer(concatedData)
    }));

    this.queue(null);
  }

  return through(write, end);
};