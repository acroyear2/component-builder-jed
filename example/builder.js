var fs = require('fs-extra');
var path = require('path');
var resolve = require('component-resolver');
var build = require('component-builder');
var jed = require('..');

function req(string, tree) {
  return build.scripts.require + jed.runtime + string;
}

resolve(__dirname, {}, function(err, tree) {
  build.scripts(tree)
    .use('scripts', build.plugins.js())
    .use('translations', jed())
    .end(function(err, string) {
      fs.outputFileSync(path.resolve(__dirname, 'build/build.js'), 
        req(string, tree));
    });
});