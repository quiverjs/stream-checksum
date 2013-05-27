
"use strict"

var crypto = require('crypto')

var streamToChecksum = function(options, readStream, callback) {
  var hashAlgorithm = options.hashAlgorithm || 'sha1'
  var hash = crypto.createHash(hashAlgorithm)
  var totalSize = 0

  var doPipe = function() {
    readStream.read(function(streamClosed, data) {
      if(!streamClosed) {
        if(data.length == 0) return doPIpe()
        if(!(data instanceof Buffer)) data = new Buffer(data)

        hash.update(data)
        totalSize += data.length
        doPipe()
      } else {
        var checksum = hash.digest('hex')
        var result = {
          checksum: checksum,
          totalSize: totalSize
        }
        callback(streamClosed.err, result)
      }
    })
  }
  doPipe()
}

module.exports = {
  streamToChecksum: streamToChecksum
}