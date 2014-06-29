
var fs = require('fs');
var path = require('path');
var po2json = require('po2json');

var EXTNAME = /\.(po)$/;

exports = module.exports = function () {
  return function jed (file, done) {
    if (!EXTNAME.test(file.path)) return done();

    file.read(function (err, string) {
      var json = po2json.parse(string, { format: 'jed' });
      file.extension = 'js';
      file.string = JSON.stringify(json);
      file.string = 'var Jed = require(\'jed\'); module.exports = new Jed(' + 
          JSON.stringify(json) +');';
    
      done();
    });
  };
};

exports.runtime = 'require.register("jed", function (exports, module) {\n'
  + fs.readFileSync(require.resolve('jed'), 'utf8')
  + '\n});\n\n';
