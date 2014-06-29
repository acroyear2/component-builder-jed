# component-builder-jed

[jed](http://slexaxton.github.io/Jed/) plugin for [component-builder](https://www.npmjs.org/package/component-builder).

## Installation

```sh
npm install component-builder-jed
```

## Usage

Add your `.po` files to the `translations` array in your `component.json`:

```js
{
  "translations": [
    "tr_TR.po"
  ]
}
```

Use the plugin during your build process:

```js
var fs = require('fs-extra');
var path = require('path');
var resolve = require('component-resolver');
var build = require('component-builder');
var jed = require('component-builder-jed');

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
```

## License

The MIT License (MIT)

Copyright (c) 2014 Onur Gunduz ogunduz@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.