var xml2js = require('xml2js');


/**
 * LISTs the contents of the bucket.  Wraps the base funcationality so we can work at 
 * a higher level.
 *
 * @param {Function} fn
 * @api public
 */
exports.listBucket = function(client, callback) {
   client.get("/").on('response', function(res) {
      // Holder for the data as it comes in
      var xml_str = "";

      // As data is recieved store it on the xml_str
      res.on('data', function(buf) {
         xml_str += buf;
      });

      res.on('end', function() {
         var parser = new xml2js.Parser();
         parser.parseString(xml_str, function(err, json_data) {
            // Now that the data has been returned and processed into JSON return 
            // it to the caller.
            var list = json_data.Contents || [];

            // If there is only one thing in the list then it is parsed as an object.
            if (! (list instanceof Array)) {
               list = [list];
            }

            // Send the data back to the caller.
            callback(err, list, json_data, xml_str);
         });
      });

   }).end();
};

