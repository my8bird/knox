
/**
 * Module dependencies.
 */

var knox = require('../index.js'),
    utils = knox.utils,
    assert = require('assert');

describe('Knox utils', function() {
  it('test .base64.encode()', function(done) {
    assert.equal('aGV5', utils.base64.encode('hey'));
    done()
  })
  
  it('test .base64.decode()', function(done) {
    assert.equal('hey', utils.base64.decode('aGV5'));
    done();
  })
});

