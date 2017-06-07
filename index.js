'use strict';

const utils = require('loader-utils');
const diamond = require('diamondpkg');

module.exports = function loader(content) {
  const callback = this.async();

  if (!callback || typeof callback !== 'function') throw new Error('synchronous operation not supported');

  const options = utils.getOptions(this);
  options.filename = this.resourcePath;

  diamond.compile[options.lang || 'sass'](content, options)
    .then((css) => {
      callback(null, css);
    })
    .catch((err) => {
      callback(err);
    });
};
