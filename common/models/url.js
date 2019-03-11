'use strict';
const urlExists = require('url-exists');
const shortid = require('shortid');

const isValidUrl = function(err, done) {
  let url = this.original;
  let reUrl = new RegExp(
    '\\b((http|https):\\/\\/?)[^\\s()<>]+(?:\\([\\w\\d]+\\)|([^[:punct:]\\s]|\\/?))',
    'i'
  );
  if (!reUrl.test(url)) {
    urlExists(url, function(error, exists) {
      if (!exists) err();
    });
  }
  done();
};
const isValidText = function(err, done) {
  let short = this.short;
  let reText = new RegExp('\\b[a-zA-Z0-9_]{7}\\b|\\b[a-zA-Z0-9_]{1,12}\\b');
  if (!reText.test(short) && short.length !== 0) err();
  done();
};

module.exports = function(Url) {
  Url.observe('before save', function(ctx, next) {
    if (!ctx.instance.short) {
      ctx.instance.short = shortid.generate();
    }
    next();
  });
  Url.validateAsync('original', isValidUrl, {
    message: 'Original url must be valid link',
  });
  Url.validateAsync('short', isValidText, {
    message:
      'Short name must be beetwen 1,12 chars. Allows only alpha numerical characters',
  });
};
