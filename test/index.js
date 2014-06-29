
var resolve = require('component-resolver');
var build = require('component-builder');
var path = require('path');
var vm = require('vm');
var jed = require('..');

function fixture(name) {
  return path.join(__dirname, 'fixtures', name);
}

function req(string, tree) {
  return build.scripts.require + jed.runtime + string
    + 'require("' + build.scripts.canonical(tree).canonical + '")';
}

function buildScripts (tree, options, cb) {
  build.scripts(tree)
    .use('scripts', build.plugins.js())
    .use('translations', jed(options))
    .end(function (err, string) {
      if (err) throw err;
      cb(string);
    });
}

describe('jed', function () {

  it('should work', function (done) {
    resolve(fixture('simple'), {}, function (err, tree) {
      if (err) throw err;
      buildScripts(tree, {}, function (string) {
        var fn = vm.runInNewContext(req(string, tree));
        fn().trim().should.eql('Merhaba, dünya!');
        done();
      });
    });
  });

});
