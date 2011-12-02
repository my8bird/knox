var knox = require('../index.js'),
    fs   = require('fs'),
    path = require('path'),
    assert = require('assert');

try {
  var auth = JSON.parse(fs.readFileSync(path.join(__dirname, 'auth'), 'ascii'));
  var client = knox.createClient(auth);
} catch (err) {
  console.log(err);
  console.error('`make test` requires ./auth to contain a JSON string with');
  console.error('`key, secret, and bucket in order to run tests.');
  process.exit(1);
}

var jsonFixture = path.join(__dirname, 'fixtures', 'user.json');

describe('Knox Helpers', function() {
  it('can list the contents of an empty bucket', function(done) {
     knox.helpers.listBucket(client, function(err, contents, fullRes, xmlStr) {
        // There is nothing in the bucket so that Contents were empty
        assert.equal(undefined, fullRes.Contents);
        // There were no contents so the list should be empty
        assert.equal(0, contents.length);
        done();
     });
  });

  it('can list the contents of a bucket', function(done) {
     // Add something to the bucket so that we can find it in the contents
     client.putFile(jsonFixture, '/test/to_del.json', function(err, res) {
       assert.ok(!err, 'putFile() got an error!');

       // Read the bucket list
       knox.helpers.listBucket(client, function(err, contents, fullRes, xmlStr) {
          // Yeah, we found one item
          assert.equal(1, contents.length);

          client.deleteFile('/test/to_del.json', function(err, res) {
            assert.ok(!err, 'Unable to remove test file');
            done();
          });
       });

     });
  });

});

