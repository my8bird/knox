
/**
 * Module dependencies.
 */

var knox = require('../index.js'),
    auth = knox.auth,
    assert = require('assert');

describe('Knox auth pacakge', function() {
  it('test .stringToSign()', function(done) {
    var str = auth.stringToSign({
        verb: 'PUT'
      , md5: '09c68b914d66457508f6ad727d860d5b'
      , contentType: 'text/plain'
      , resource: '/learnboost'
      , date: new Date('Mon, May 25 1987 00:00:00 GMT')
    });
    
    var expected = [
        'PUT'
      , '09c68b914d66457508f6ad727d860d5b'
      , 'text/plain'
      , new Date('Mon, May 25 1987 00:00:00 GMT').toUTCString()
      , '/learnboost'
    ].join('\n');
    
    assert.equal(expected, str);
    done();
  })
  
  it('test .sign()', function(done) {
    var str = auth.sign({
        verb: 'PUT'
      , secret: 'test'
      , md5: '09c68b914d66457508f6ad727d860d5b'
      , contentType: 'text/plain'
      , resource: '/learnboost'
      , date: new Date('Mon, May 25 1987 00:00:00 GMT')
    });

    assert.equal('7xIdjyy+W17/k0le5kwBnfrZTiM=', str);
    done();
  })
  
  it('test .canonicalizeHeaders()', function(done) {
    var str = auth.canonicalizeHeaders({
        'X-Amz-Date': 'some date'
      , 'X-Amz-Acl': 'private'
      , 'X-Foo': 'bar'
    });
    
    var expected = [
        'x-amz-acl:private'
      , 'x-amz-date:some date'
    ].join('\n');

    assert.equal(expected, str);
    
    assert.equal('', auth.canonicalizeHeaders({}));
    done();
  })
});
