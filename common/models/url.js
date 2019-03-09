'use strict';
const urlExists = require('url-exists');

function myCustom(err, done) {
  let original = this.original;
  let exists = false;
  urlExists(original, function(err, exists) {
    exists = exists;
  });
  console.log(exists);
  if (!exists) {
    err();
  }
  done();
}
module.exports = function(Url) {
  Url.validateAsync('original', myCustom, {message: 'Dont like'});
};
